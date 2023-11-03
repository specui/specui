import { generate } from '@zappjs/core';
import { GitignoreGenerator } from '@zappjs/git';
import { HandlebarsEngine } from '@zappjs/handlebars';
import { JsonEngine } from '@zappjs/json';
import { LicenseGenerator } from '@zappjs/license';
import { PrettierProcessor } from '@zappjs/prettier';
import { camelCase, pascalCase, titleCase } from 'change-case';
import { plural } from 'pluralize';

import { ReadmeTemplate } from './templates/ReadmeTemplate';

type Provider = 'facebook' | 'github' | 'google';

export interface ISpec {
  name: string;
  version: string;
  license: 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT';
  description: string;
  author?: {
    name?: string;
    email?: string;
    url?: string;
  };
  auth?: {
    providers: Provider[];
  };
  calls: {
    [name: string]: {
      request: {
        [name: string]: {
          required?: boolean;
          type: 'boolean' | 'number' | 'string';
        };
      };
      response: {
        [name: string]: {
          required?: boolean;
          type: 'boolean' | 'number' | 'string';
        };
      };
    };
  };
  models: {
    [name: string]: {
      attributes: {
        [name: string]: {
          key?: 'primary';
          type: 'number' | 'string';
          unique?: boolean;
        };
      };
    };
  };
}

export default async function zapp(spec: ISpec) {
  const pkg = process?.versions?.node ? require(`${process.cwd()}/package.json`) : {};

  const modelNamesPluralCamelCase = Object.keys(spec.models).map((model) =>
    camelCase(plural(model)),
  );
  const modelNamesPluralPascal = Object.keys(spec.models).map((model) => pascalCase(plural(model)));

  const auth: {
    [file: string]: string;
  } = {};
  if (spec.auth) {
    auth['app/api/auth/[...nextauth]/route.ts'] = await generate({
      processor: PrettierProcessor(),
      engine: async () => {
        return /*ts*/ `
          import { authOptions } from '@/app/auth'
          import NextAuth from 'next-auth'
          
          const handler = NextAuth(authOptions)
          
          export { handler as GET, handler as POST }        
        `;
      },
    });
    auth['app/api/auth.ts'] = await generate({
      processor: PrettierProcessor(),
      engine: async () => {
        return /*ts*/ `
          import { NextAuthOptions } from 'next-auth'
          ${
            spec.auth?.providers?.includes('facebook')
              ? `import FacebookProvider from 'next-auth/providers/facebook'`
              : ''
          }
          ${
            spec.auth?.providers?.includes('github')
              ? `import GithubProvider, { GithubProfile } from 'next-auth/providers/github'`
              : ''
          }
          ${
            spec.auth?.providers?.includes('google')
              ? `import GoogleProvider from 'next-auth/providers/google'`
              : ''
          }
          
          export const authOptions: NextAuthOptions = {
            providers: [
              ${
                spec.auth?.providers?.includes('facebook')
                  ? /*ts*/ `
                FacebookProvider({
                  clientId: process.env.FACEBOOK_ID || '',
                  clientSecret: process.env.FACEBOOK_SECRET || '',
                }),
              `
                  : ''
              }
              ${
                spec.auth?.providers?.includes('github')
                  ? /*ts*/ `
                GithubProvider({
                  clientId: process.env.GITHUB_ID || '',
                  clientSecret: process.env.GITHUB_SECRET || '',
                  authorization: {
                    params: {
                      scope: undefined,
                    },
                  },
                  profile(profile: GithubProfile) {
                    return {
                      id: profile.id.toString(),
                      name: profile.name,
                      image: profile.avatar_url,
                      email: profile.login,
                    }
                  },
                }),
              `
                  : ''
              }
              ${
                spec.auth?.providers?.includes('google')
                  ? /*ts*/ `
                GoogleProvider({
                  clientId: process.env.GOOGLE_ID || '',
                  clientSecret: process.env.GOOGLE_SECRET || '',
                }),
              `
                  : ''
              }
            ],
          }        
        `;
      },
    });
  }

  const schemas: {
    [file: string]: string;
  } = {};
  await Promise.all(
    Object.entries(spec.calls).map(async ([callName, call]) => {
      schemas[`lib/schemas/${callName}Schema.ts`] = await generate({
        processor: PrettierProcessor(),
        engine: () => `
          import { z } from "zod";

          export const ${callName}Schema = {
            request: z.object({
              ${Object.entries(call.request || {})
                .map(
                  ([propName, prop]) =>
                    `${propName}: z.string(${
                      prop.required
                        ? `{ required_error: "${titleCase(propName)} is required." }`
                        : ''
                    }),`,
                )
                .join('\n')}
            }),
          
            response: z.object({
              ${Object.entries(call.response || {})
                .map(
                  ([propName, prop]) =>
                    `${propName}: z.string(${
                      prop.required
                        ? `{ required_error: "${titleCase(propName)} is missing." }`
                        : ''
                    }),`,
                )
                .join('\n')}
            }),
          };
          
          export type ${callName}Request = z.infer<
            typeof ${callName}Schema.request
          >;
          
          export type ${callName}Response = z.infer<
            typeof ${callName}Schema.response
          >;
        `,
      });
    }),
  );

  const tables: {
    [file: string]: string;
  } = {};
  await Promise.all(
    Object.entries(spec.models).map(async ([modelName, model]) => {
      const modelNamePlural = plural(modelName);
      const modelNamePluralPascal = pascalCase(modelNamePlural);
      tables[`lib/tables/${modelNamePluralPascal}Table.ts`] = await generate({
        processor: PrettierProcessor(),
        engine: async () => {
          return `
          import { ColumnType, Generated, sql } from 'kysely'

          import { db } from '../lib/db'
          
          export interface ${modelNamePluralPascal}Table {
            ${Object.entries(model.attributes)
              .map(
                ([attributeName, attribute]) =>
                  `${camelCase(attributeName)}: ${
                    attribute.key === 'primary' ? `Generated<${attribute.type}>` : attribute.type
                  }`,
              )
              .join('\n')}
            createdAt: ColumnType<Date, string | undefined, never>
          }
          
          export const create${modelNamePluralPascal}Table = async () => {
            await db.schema
              .createTable('${modelNamePlural}')
              .ifNotExists()
              ${Object.entries(model.attributes)
                .map(
                  ([attributeName, attribute]) =>
                    `.addColumn('${camelCase(attributeName)}', '${
                      attribute.key === 'primary'
                        ? 'serial'
                        : attribute.type === 'number'
                        ? 'integer'
                        : 'varchar(255)'
                    }', (cb) => cb.${attribute.key === 'primary' ? 'primaryKey()' : 'notNull()'}${
                      attribute.unique ? '.unique()' : ''
                    })`,
                )
                .join('\n')}
              .execute()
          }
        
        `;
        },
      });
    }),
  );

  return {
    ...auth,

    'app/globals.css': await generate({
      processor: PrettierProcessor({
        parser: 'css',
      }),
      engine: async () => `
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        
        :root {
          --foreground-rgb: 0, 0, 0;
          --background-start-rgb: 214, 219, 220;
          --background-end-rgb: 255, 255, 255;
        }
        
        @media (prefers-color-scheme: dark) {
          :root {
            --foreground-rgb: 255, 255, 255;
            --background-start-rgb: 0, 0, 0;
            --background-end-rgb: 0, 0, 0;
          }
        }
        
        body {
          color: rgb(var(--foreground-rgb));
          background: linear-gradient(
              to bottom,
              transparent,
              rgb(var(--background-end-rgb))
            )
            rgb(var(--background-start-rgb));
        }
      `,
    }),
    'app/layout.tsx': await generate({
      processor: PrettierProcessor(),
      engine: async () => /* ts */ `
        import type { Metadata } from 'next'
        import { Inter } from 'next/font/google'
        import './globals.css'
        
        const inter = Inter({ subsets: ['latin'] })
        
        export const metadata: Metadata = {
          title: 'Create Next App',
          description: 'Generated by create next app',
        }
        
        export default function RootLayout({
          children,
        }: {
          children: React.ReactNode
        }) {
          return (
            <html lang="en">
              <body className={inter.className}>{children}</body>
            </html>
          )
        }
      `,
    }),
    'app/page.tsx': await generate({
      processor: PrettierProcessor(),
      engine: async () => `
        import Image from 'next/image'

        export default function Home() {
          return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
              <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                  Get started by editing&nbsp;
                  <code className="font-mono font-bold">app/page.tsx</code>
                </p>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                  <a
                    className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    By{' '}
                    <Image
                      src="/vercel.svg"
                      alt="Vercel Logo"
                      className="dark:invert"
                      width={100}
                      height={24}
                      priority
                    />
                  </a>
                </div>
              </div>
        
              <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <Image
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                  src="/next.svg"
                  alt="Next.js Logo"
                  width={180}
                  height={37}
                  priority
                />
              </div>
        
              <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                <a
                  href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={\`mb-3 text-2xl font-semibold\`}>
                    Docs{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p className={\`m-0 max-w-[30ch] text-sm opacity-50\`}>
                    Find in-depth information about Next.js features and API.
                  </p>
                </a>
        
                <a
                  href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={\`mb-3 text-2xl font-semibold\`}>
                    Learn{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p className={\`m-0 max-w-[30ch] text-sm opacity-50\`}>
                    Learn about Next.js in an interactive course with&nbsp;quizzes!
                  </p>
                </a>
        
                <a
                  href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={\`mb-3 text-2xl font-semibold\`}>
                    Templates{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p className={\`m-0 max-w-[30ch] text-sm opacity-50\`}>
                    Explore the Next.js 13 playground.
                  </p>
                </a>
        
                <a
                  href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={\`mb-3 text-2xl font-semibold\`}>
                    Deploy{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p className={\`m-0 max-w-[30ch] text-sm opacity-50\`}>
                    Instantly deploy your Next.js site to a shareable URL with Vercel.
                  </p>
                </a>
              </div>
            </main>
          )
        }
      `,
    }),
    'lib/errors/BadRequestError.ts': await generate({
      processor: PrettierProcessor(),
      engine: () => `
        import { HttpError } from "./HttpError";

        export class BadRequestError extends HttpError {
          code = 400;
        
          constructor(message?: string) {
            super(message || "Bad request");
        
            this.name = "BadRequestError";
          }
        }
      `,
    }),
    'lib/errors/ConflictError.ts': await generate({
      processor: PrettierProcessor(),
      engine: () => `
        import { HttpError } from "./HttpError";

        export class ConflictError extends HttpError {
          code = 409;
        
          constructor(message?: string) {
            super(message || "Conflict error");
        
            this.name = "ConflictError";
          }
        }
      `,
    }),
    'lib/errors/ForbiddenError.ts': await generate({
      processor: PrettierProcessor(),
      engine: () => `
        import { HttpError } from "./HttpError";

        export class ForbiddenError extends HttpError {
          code = 403;
        
          constructor(message?: string) {
            super(message || "Forbidden");
        
            this.name = "ForbiddenError";
          }
        }
      `,
    }),
    'lib/errors/HttpError.ts': await generate({
      processor: PrettierProcessor(),
      engine: () => `
        export class HttpError extends Error {
          code = 0;
        
          constructor(message?: string) {
            super(message);
          }
        }
      `,
    }),
    'lib/errors/MethodNotAllowedError.ts': await generate({
      processor: PrettierProcessor(),
      engine: () => `
        import { HttpError } from "./HttpError";

        export class MethodNotAllowedError extends HttpError {
          code = 405;
        
          constructor(message?: string) {
            super(message || "Method not allowed");
        
            this.name = "MethodNotAllowedError";
          }
        }
      `,
    }),
    'lib/errors/NotFoundError.ts': await generate({
      processor: PrettierProcessor(),
      engine: () => `
        import { HttpError } from "./HttpError";

        export class NotFoundError extends HttpError {
          code = 404;
        
          constructor(message?: string) {
            super(message || "Not found");
        
            this.name = "NotFoundError";
          }
        }
      `,
    }),
    'lib/errors/UnauthorizedError.ts': await generate({
      processor: PrettierProcessor(),
      engine: () => `
        import { HttpError } from "./HttpError";

        export class UnauthorizedError extends HttpError {
          code = 401;
        
          constructor(message?: string) {
            super(message || "Unauthorized");
        
            this.name = "UnauthorizedError";
          }
        }      
      `,
    }),
    'lib/errors/UnprocessableContentError.ts': await generate({
      processor: PrettierProcessor(),
      engine: () => `
        import { HttpError } from "./HttpError";

        export class UnprocessableContentError extends HttpError {
          code = 422;
        
          constructor(message?: string) {
            super(message || "Unprocessable content");
        
            this.name = "UnprocessableContentError";
          }
        }      
      `,
    }),
    ...schemas,
    ...tables,
    'lib/db.ts': await generate({
      processor: PrettierProcessor(),
      engine: async () => {
        return /*ts*/ `
          import { createKysely } from '@vercel/postgres-kysely'
    
          ${modelNamesPluralPascal
            .map(
              (modelName) =>
                `import { ${modelName}Table, create${modelName}Table } from '../tables/${modelName}Table'`,
            )
            .join('\n')}
          
          export interface Database {
            ${modelNamesPluralPascal
              .map((modelName) => `${modelName}: ${modelName}Table`)
              .join('\n')}
          }
          
          export const db = createKysely<Database>()
          
          export const deinit = async () => {
            const tables = [
              ${modelNamesPluralCamelCase.map((modelName) => `'${modelName}'`).join(',')}
            ]
          
            for (let i = 0; i < tables.length; i++) {
              await db.schema.dropTable(tables[i]).ifExists().execute()
            }
          }
          
          export const init = async () => {
            ${modelNamesPluralPascal
              .map((modelName) => `await create${modelName}Table()`)
              .join('\n')}
          }
          
          export const seed = async () => {}
        `;
      },
    }),
    'public/next.svg': await generate({
      processor: PrettierProcessor({
        parser: 'html',
      }),
      engine: () => `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80">
          <path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/>
          <path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/>
        </svg>
      `,
    }),
    'public/vercel.svg': await generate({
      processor: PrettierProcessor({
        parser: 'html',
      }),
      engine: () => `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 283 64">
          <path fill="black" d="M141 16c-11 0-19 7-19 18s9 18 20 18c7 0 13-3 16-7l-7-5c-2 3-6 4-9 4-5 0-9-3-10-7h28v-3c0-11-8-18-19-18zm-9 15c1-4 4-7 9-7s8 3 9 7h-18zm117-15c-11 0-19 7-19 18s9 18 20 18c6 0 12-3 16-7l-8-5c-2 3-5 4-8 4-5 0-9-3-11-7h28l1-3c0-11-8-18-19-18zm-10 15c2-4 5-7 10-7s8 3 9 7h-19zm-39 3c0 6 4 10 10 10 4 0 7-2 9-5l8 5c-3 5-9 8-17 8-11 0-19-7-19-18s8-18 19-18c8 0 14 3 17 8l-8 5c-2-3-5-5-9-5-6 0-10 4-10 10zm83-29v46h-9V5h9zM37 0l37 64H0L37 0zm92 5-27 48L74 5h10l18 30 17-30h10zm59 12v10l-3-1c-6 0-10 4-10 10v15h-9V17h9v9c0-5 6-9 13-9z"/>
        </svg>
      `,
    }),
    '.eslintrc.json': await generate({
      engine: JsonEngine,
      spec: {
        extends: 'next/core-web-vitals',
      },
    }),
    '.gitignore': await GitignoreGenerator([
      '# dependencies',
      '/node_modules',
      '/.pnp',
      '.pnp.js',
      '.yarn/install-state.gz',
      '',
      '# testing',
      '/coverage',
      '',
      '# next.js',
      '/.next/',
      '/out/',
      '',
      '# production',
      '/build',
      '',
      '# misc',
      '.DS_Store',
      '*.pem',
      '',
      '# debug',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '',
      '# local env files',
      '.env*.local',
      '',
      '# vercel',
      '.vercel',
      '',
      '# typescript',
      '*.tsbuildinfo',
      'next-env.d.ts',
    ]),
    LICENSE: await LicenseGenerator(spec),
    'next.config.js': await generate({
      processor: PrettierProcessor(),
      engine: () => /*ts*/ `
        /** @type {import('next').NextConfig} */
        const nextConfig = {}

        module.exports = nextConfig
      `,
    }),
    'package.json': await generate({
      engine: JsonEngine,
      spec: {
        ...pkg,
        name: spec.name,
        version: spec.version,
        description: spec.description,
        license: spec.license,
        author: spec.author
          ? {
              name: spec.author.name,
              email: spec.author.email,
              url: spec.author.url,
            }
          : undefined,
        scripts: {
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
          lint: 'next lint',
        },
        dependencies: {
          ...pkg.dependencies,
          '@vercel/postgres-kysely': '^0.5.0',
          kysely: '^0.26.3',
          next: '14.0.0',
          react: '^18',
          'react-dom': '^18',
          'react-markdown': '^9.0.0',
          'next-auth': '^4.23.1',
          zod: '^3.21.4',
        },
        devDependencies: {
          ...pkg.devDependencies,
          '@types/node': '^20',
          '@types/react': '^18',
          '@types/react-dom': '^18',
          autoprefixer: '^10.4.16',
          eslint: '^8',
          'eslint-config-next': '14.0.0',
          postcss: '^8.4.31',
          tailwindcss: '^3.3.5',
          typescript: '^5',
        },
      },
    }),
    'postcss.config.js': await generate({
      processor: PrettierProcessor(),
      engine: () => /* ts */ `
        module.exports = {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        }      
      `,
    }),
    'README.md': await generate({
      processor: PrettierProcessor({
        parser: 'markdown',
      }),
      engine: HandlebarsEngine,
      spec,
      template: ReadmeTemplate,
    }),
    'tailwind.config.js': await generate({
      processor: PrettierProcessor(),
      engine: () => /*ts*/ `
        /** @type {import('tailwindcss').Config} */
        module.exports = {
          content: [
            "./app/**/*.{js,ts,jsx,tsx,mdx}",
            "./pages/**/*.{js,ts,jsx,tsx,mdx}",
            "./components/**/*.{js,ts,jsx,tsx,mdx}",
        
            // Or if using \`src\` directory:
            "./src/**/*.{js,ts,jsx,tsx,mdx}",
          ],
          theme: {
            extend: {},
          },
          plugins: [],
        }
      `,
    }),
    'tsconfig.json': await generate({
      engine: JsonEngine,
      spec: {
        compilerOptions: {
          target: 'es5',
          lib: ['dom', 'dom.iterable', 'esnext'],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: 'esnext',
          moduleResolution: 'bundler',
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: 'preserve',
          incremental: true,
          plugins: [
            {
              name: 'next',
            },
          ],
          paths: {
            '@/*': ['./*'],
          },
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
        exclude: ['node_modules'],
      },
    }),
  };
}
