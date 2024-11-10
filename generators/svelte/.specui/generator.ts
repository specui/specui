import { type IProcessor, generate } from '@specui/core';
import { GitignoreGenerator } from '@specui/git';
import { HandlebarsEngine } from '@specui/handlebars';
import { JsonEngine } from '@specui/json';
import { LicenseGenerator } from '@specui/license';
import { camelCase, pascalCase, titleCase } from 'change-case';
import { plural } from 'pluralize';

import type { Element, ElementArrayOrRef } from './interfaces/BaseElement';
import type { InputElement } from './interfaces/NativeElement';
import type { Page } from './interfaces/Page';
import type { Spec } from './interfaces/Spec';
import { ReadmeTemplate } from './templates/ReadmeTemplate';

export * from './interfaces/Spec';

export default async function generator(
  spec: Spec,
  PrettierProcessor: IProcessor<any>,
  existsSync?: (path: string) => boolean,
) {
  const pkg = existsSync?.(`${process.cwd()}/package.json`)
    ? require(`${process.cwd()}/package.json`)
    : {};

  const modelNamesPluralCamelCase = Object.keys(spec.models || {}).map((model) =>
    camelCase(plural(model)),
  );
  const modelNamesPluralPascal = Object.keys(spec.models || {}).map((model) =>
    pascalCase(plural(model)),
  );

  const auth: {
    [file: string]: Buffer | string;
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
    auth['app/auth.ts'] = await generate({
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

  const calls: {
    [file: string]: Buffer | string;
  } = {};
  await Promise.all(
    Object.entries(spec.calls || {}).map(async ([callName, call]) => {
      calls[`app/api/${callName}/route.ts`] = await generate({
        processor: PrettierProcessor(),
        engine: () => `
          import { NextRequest, NextResponse } from 'next/server'

          import {
            ${pascalCase(callName)}Request,
            ${pascalCase(callName)}Response
          } from '@/lib/schemas/${camelCase(callName)}Schema'

          export async function POST(req: NextRequest) {
            const request = (await req.json()) as ${pascalCase(callName)}Request

            // implement your logic here

            return NextResponse.json({})
          }
        `,
      });
    }),
  );

  type ElementPropType = 'for' | 'name' | 'placeholder' | 'type';
  type ElementEventPropType = 'onClick';

  function renderElementProp(name: ElementPropType, element: InputElement) {
    const prop = element[name];

    if (!prop) {
      return;
    }

    return typeof prop === 'string' && prop.startsWith('$')
      ? `{${prop.slice(1)}}`
      : typeof prop === 'string'
      ? `"${prop}"`
      : `{${prop}}`;
  }

  function renderElementEventProp(name: ElementEventPropType, element: Element) {
    const prop = element[name];

    if (!prop) {
      return;
    }

    const action = prop.action.startsWith('$') ? prop.action.slice(1) : prop.action;

    return `{() => ${action}?.()}`;
  }

  function renderElementProps(element: Element) {
    const props: Record<string, string> = {};

    if (element.action) {
      props.action = `{${element.action}}`;
    }

    if (element.class) {
      props.className =
        Array.isArray(element.class) &&
        element.class.some((className) => typeof className !== 'string')
          ? `{clsx(${element.class
              .map((className) =>
                className.startsWith('$') ? className.slice(1) : `'${className}'`,
              )
              .join(',')})}`
          : Array.isArray(element.class)
          ? `"${element.class.join(' ')}"`
          : `"${element.class}"`;
    }

    [
      'alt',
      'collapsible',
      'defaultChecked',
      'for',
      'href',
      'name',
      'placeholder',
      'type',
      'src',
      'value',
      'variant',
    ].forEach((name) => {
      const value = renderElementProp(name as ElementPropType, element as InputElement);
      if (value !== undefined) {
        props[name === 'for' ? 'htmlFor' : name] = value;
      }
    });

    ['onClick'].forEach((name) => {
      const value = renderElementEventProp(name as ElementEventPropType, element);
      if (value !== undefined) {
        props[name] = value;
      }
    });

    if (element.props) {
      Object.entries(element.props).forEach(([propName, propValue]) => {
        props[propName] = `"${propValue}"`;
      });
    }

    if (element.animate) {
      props.animate = `{${JSON.stringify(element.animate)}}`;
    }

    if (element.initial) {
      props.initial = `{${JSON.stringify(element.initial)}}`;
    }

    if (element.transition) {
      props.transition = `{${JSON.stringify(element.transition)}}`;
    }

    if (element.whileHover) {
      props.whileHover = `{${JSON.stringify(element.whileHover)}}`;
    }

    if (element.whileTap) {
      props.whileTap = `{${JSON.stringify(element.whileTap)}}`;
    }

    if (element.style) {
      props.style = `{${JSON.stringify(element.style)}}`;
    }

    return Object.entries(props)
      .sort(([aName], [bName]) => aName.localeCompare(bName))
      .map(([name, value]) => `${name}=${value}`)
      .join(' ');
  }

  function renderPropType(type?: string) {
    if (!type) {
      return 'unknown';
    }

    if (type === 'function') {
      return '() => {}';
    }

    return type;
  }

  function render(element: Element): string {
    const tag =
      element.icon && element.icon.startsWith('$')
        ? element.icon.slice(1)
        : element.icon
        ? pascalCase(element.icon, undefined, true)
        : element.component
        ? pascalCase(element.component || '', undefined, true)
        : element.tag ?? 'div';
    const props = renderElementProps(element);
    const children = `
      ${
        element.text?.startsWith('$')
          ? `{${element.text.slice(1)}}`
          : element.text
          ? element.text
          : ''
      }${
        Array.isArray(element.elements)
          ? element.elements.map(render).join('')
          : element.elements?.['$ref']
          ? `{${
              element.elements['$ref'].data
                ? JSON.stringify(element.elements['$ref'].data)
                : element.elements['$ref'].model
            }.map(${element.elements['$ref'].name} => (
            <${element.elements['$ref'].tag} className="${
              Array.isArray(element.elements['$ref'].class)
                ? element.elements['$ref'].class.join(' ')
                : element.elements['$ref']
            }" key=${
              element.elements['$ref'].key?.startsWith('$')
                ? `{${element.elements['$ref'].key.slice(1)}}`
                : `'${element.elements['$ref'].key}'`
            }>
              ${
                Array.isArray(element.elements['$ref'].elements)
                  ? element.elements['$ref'].elements?.map(render).join('')
                  : ''
              }
            </${element.elements['$ref'].tag}>
          ))}`
          : ''
      }
    `.trim();

    const motionTag =
      element.initial || element.animate || element.whileHover || element.whileTap
        ? `motion.${tag}`
        : tag;

    return `<${motionTag} ${props}
      ${children ? `>${children}</${motionTag}>` : ' />'}`;
  }

  function renderImports(elements: ElementArrayOrRef): string {
    let imports: Record<string, string | string[]> = {};

    function collectImports(elements: ElementArrayOrRef) {
      (Array.isArray(elements) ? elements : []).forEach((element) => {
        const component = pascalCase(element.component || '');

        if (component && !imports[component]) {
          imports[`@/components/${component}`] = component;
        }

        if (element.action) {
          imports[`@/actions/${element.action}`] = element.action;
        }

        if (element.animate || element.initial || element.whileHover || element.whileTap) {
          imports['framer-motion'] = ['motion'];
        }

        if (element.icon) {
          const importName = `react-icons/${element.icon.split('-')[0]}`;
          if (!imports[importName]) {
            imports[importName] = [];
          }
          if (Array.isArray(imports[importName]) && !imports[importName].includes(element.icon)) {
            (imports[importName] as string[]).push(pascalCase(element.icon, undefined, true));
          }
        }

        if (element.elements) {
          collectImports(
            Array.isArray(element.elements) ? element.elements : [element.elements['$ref']],
          );
        }
      });
    }

    collectImports(elements);

    return Object.entries(imports)
      .map(
        ([pkg, imports]) =>
          `import ${Array.isArray(imports) ? `{ ${imports.join(',')} }` : imports} from '${pkg}'`,
      )
      .join('\n');
  }

  function renderClient(elements?: ElementArrayOrRef): string {
    if (!elements) {
      return '';
    }

    if (
      (Array.isArray(elements) ? elements : []).some(
        (element) =>
          element.animate ||
          element.initial ||
          element.whileHover ||
          element.whileTap ||
          element.onClick !== undefined ||
          renderClient(element.elements || []),
      )
    ) {
      return `'use client';\n`;
    }

    return '';
  }

  function renderClsx(elements?: ElementArrayOrRef): string {
    if (!elements) {
      return '';
    }

    if (
      (Array.isArray(elements) ? elements : []).some(
        (element) => Array.isArray(element.class) || renderClsx(element.elements || []),
      )
    ) {
      return `import { clsx } from 'clsx'`;
    }

    return '';
  }

  function getActionType(type: 'delete' | 'insert' | 'update' | 'revalidate' | 'redirect') {
    if (type === 'delete') {
      return 'deleteFrom';
    }
    if (type === 'insert') {
      return 'insertInto';
    }
    return 'update';
  }

  const actions: {
    [name: string]: Buffer | string;
  } = {};
  await Promise.all(
    Object.entries(spec.actions || {}).map(async ([actionName, action]) => {
      actions[`actions/${camelCase(actionName)}.ts`] = await generate({
        processor: PrettierProcessor(),
        engine: async () => `
          'use server';

          ${
            action.operations.some((op) => ['delete', 'insert', 'update'].includes(op.type))
              ? `import { db } from '@/lib/db';`
              : ''
          }${
            action.operations.some((op) => ['revalidate'].includes(op.type))
              ? `import { revalidatePath } from 'next/cache';`
              : ''
          }
          ${
            action.operations.some((op) => ['redirect'].includes(op.type))
              ? `import { redirect } from 'next/navigation';`
              : ''
          }          

          export default async function ${camelCase(actionName)}(
            formData: FormData
          ) {
            const props = {
              ${Object.entries(action.props)
                .map(([propName, prop]) => `${propName}: formData.get('${propName}') as string,`)
                .join('\n')}
            };

            ${action.operations
              .map((operation) =>
                ['delete', 'insert', 'update'].includes(operation.type)
                  ? `
                await db.${getActionType(operation.type)}('${camelCase(
                  plural(operation.model || ''),
                )}')
                  ${
                    operation.data
                      ? `.values({
                          ${Object.entries(operation.data)
                            .map(
                              ([name, value]) =>
                                `${name}: ${
                                  typeof value === 'string' && value.startsWith('$')
                                    ? value.slice(1)
                                    : typeof value === 'string'
                                    ? `'${value}'`
                                    : value
                                }`,
                            )
                            .join(',')}
                        })`
                      : ''
                  }${
                    operation.where
                      ? `${Object.entries(operation.where)
                          .map(
                            ([name, value]) =>
                              `.where('${name}', '=', ${
                                typeof value === 'string' && value.startsWith('$')
                                  ? value.slice(1)
                                  : typeof value === 'string'
                                  ? `'${value}'`
                                  : value
                              })`,
                          )
                          .join('\n')}
                        `
                      : ''
                  }.execute()
              `
                  : operation.type === 'redirect'
                  ? `redirect('${operation.path}')`
                  : operation.type === 'revalidate'
                  ? `revalidatePath('${operation.path}')`
                  : '',
              )
              .join('\n')}
          }
        `,
      });
    }),
  );

  const components: {
    [name: string]: Buffer | string;
  } = {};
  await Promise.all(
    Object.entries(spec.components || {}).map(async ([componentName, component]) => {
      components[`components/${pascalCase(componentName)}.tsx`] = await generate({
        processor: PrettierProcessor(),
        engine: async () => `
          ${renderClient(component.elements)}
          ${Array.isArray(component.elements) ? renderClsx(component.elements) : ''}
          ${Array.isArray(component.elements) ? renderImports(component.elements) : ''}

          ${
            Boolean(component.props)
              ? `
              export interface ${pascalCase(componentName)}Props {
                ${Object.entries(component.props || {})
                  .map(
                    ([propName, prop]) =>
                      `${propName}${prop.required ? '' : '?'}: ${renderPropType(prop.type)};`,
                  )
                  .join('\n')}
              }
            `
              : ''
          }

          export default function ${pascalCase(componentName)}(
            ${Boolean(component.props) ? `props: ${pascalCase(componentName)}Props` : ''}
          ) {
            return (
              <>
                ${
                  Array.isArray(component.elements)
                    ? (component.elements || []).map(render).join('')
                    : ''
                }
              </>
            )
          }
        `,
      });
    }),
  );

  async function renderPage(page: Page, pagePath: string) {
    function renderPageComponents(elements?: ElementArrayOrRef) {
      if (elements && Array.isArray(elements)) {
        for (let element of elements) {
          if (element.elements) {
            renderPageComponents(element.elements);
          }
        }
      }
    }

    renderPageComponents(page.elements);

    pages[pagePath] = await generate({
      processor: PrettierProcessor(),
      engine: async () => `
        ${Array.isArray(page.elements) ? renderClient(page.elements) : ''}
        ${Array.isArray(page.elements) ? renderClsx(page.elements) : ''}
        ${Array.isArray(page.elements) ? renderImports(page.elements) : ''}
        ${page.dataSources ? `import { db } from '@/lib/db';` : ''}

        export default${page.dataSources ? ' async ' : ' '}function Home() {

          ${Object.entries(page.dataSources || {}).map(
            ([dataSourceName, dataSource]) => `
            const ${dataSourceName} = await db.selectFrom('${dataSource.model}').selectAll().execute();
          `,
          )}

          return (
            <main>
              ${(Array.isArray(page.elements) ? page.elements : []).map(render).join('')}
            </main>
          )
        }
      `,
    });
  }

  const externalComponents: Record<string, string> = {};
  const pages: {
    [name: string]: Buffer | string;
  } = {};
  await Promise.all(
    Object.entries(spec.pages || {})
      .filter(([pageName]) => pageName !== 'index')
      .map(async ([pageName, page]) => renderPage(page, `app/${pageName}/page.tsx`)),
  );
  if (spec.pages?.index) {
    await renderPage(spec.pages.index, `app/page.tsx`);
  }

  const schemas: {
    [file: string]: Buffer | string;
  } = {};
  await Promise.all(
    Object.entries(spec.calls || {}).map(async ([callName, call]) => {
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
          
          export type ${pascalCase(callName)}Request = z.infer<
            typeof ${callName}Schema.request
          >;
          
          export type ${pascalCase(callName)}Response = z.infer<
            typeof ${callName}Schema.response
          >;
        `,
      });
    }),
  );

  const tables: {
    [file: string]: Buffer | string;
  } = {};
  await Promise.all(
    Object.entries(spec.models || {}).map(async ([modelName, model]) => {
      const modelNamePlural = plural(modelName);
      const modelNamePluralPascal = pascalCase(modelNamePlural);
      tables[`lib/tables/${modelNamePluralPascal}Table.ts`] = await generate({
        processor: PrettierProcessor(),
        engine: async () => {
          return `
          import { ColumnType, Generated, sql } from 'kysely'

          import { db } from '@/lib/db'
          
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
                        : attribute.type === 'boolean'
                        ? 'boolean'
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
    ...actions,
    ...auth,
    ...calls,
    ...components,
    ...externalComponents,
    ...pages,
    'app/globals.css': await generate({
      processor: PrettierProcessor({
        parser: 'css',
      }),
      engine: async () => `
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        
        :root {
          --background-rgb: 255, 255, 255;
          --foreground-rgb: 0, 0, 0;
        }
        
        @media (prefers-color-scheme: dark) {
          :root {
            --background-rgb: 0, 0, 0;
            --foreground-rgb: 255, 255, 255;
          }
        }
        
        body {
          color: rgb(var(--foreground-rgb));
          background: rgb(var(--background-rgb));
        }
      `,
    }),
    'app/layout.tsx': await generate({
      processor: PrettierProcessor(),
      engine: async () => /* ts */ `
        ${spec.vercel?.analytics ? `import { Analytics } from '@vercel/analytics/react';` : ''}
        import type { Metadata } from 'next'
        import { Inter } from 'next/font/google'
        import './globals.css'
        
        const inter = Inter({ subsets: ['latin'] })
        
        export const metadata: Metadata = {
          title: '${spec.title ?? 'Create Next App'}',
          description: '${spec.description ?? 'Generated by create next app'}',
        }
        
        export default function RootLayout({
          children,
        }: {
          children: React.ReactNode
        }) {
          return (
            <html lang="en">
              <body className={inter.className}>
                {children}
                ${spec.vercel?.analytics ? '<Analytics />' : ''}
              </body>
            </html>
          )
        }
      `,
    }),
    'lib/errors/BadRequestError.ts': await generate({
      processor: PrettierProcessor(),
      engine: () => /* ts */ `
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
      engine: () => /* ts */ `
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
    'lib/client.ts': await generate({
      processor: PrettierProcessor(),
      engine: () => `
        import axios from "axios";

        ${Object.entries(spec.calls || {})
          .map(
            ([callName]) => `
            import {
              ${pascalCase(callName)}Request,
              ${pascalCase(callName)}Response,
            } from "@/lib/schemas/${camelCase(callName)}Schema";
          `,
          )
          .join('\n')} 

        export type Call = <T>(method: string, data: any) => Promise<T>;
        
        export const call: Call = async (method, data) => {
          const res = await axios({
            method: "POST",
            headers:
              typeof localStorage !== "undefined" && localStorage.getItem("accessToken")
                ? {
                    Authorization: \`Bearer \${localStorage.getItem("accessToken")}\`,
                  }
                : {},
            url: \`/api\${method}\`,
            data: data || {},
          });
        
          return res.data;
        };

        ${Object.entries(spec.calls || {})
          .map(
            ([callName]) => `
            export const ${callName} = async (req?: ${pascalCase(callName)}Request) => {
              return await call<${pascalCase(callName)}Response>("/${callName}", req);
            };
          `,
          )
          .join('\n')} 
      `,
    }),
    'lib/db.ts': await generate({
      processor: PrettierProcessor(),
      engine: async () => {
        return /*ts*/ `
          import { createKysely } from '@vercel/postgres-kysely'
    
          ${modelNamesPluralPascal
            .map(
              (modelName) =>
                `import { ${modelName}Table, create${modelName}Table } from '@/lib/tables/${modelName}Table'`,
            )
            .join('\n')}
          
          export interface Database {
            ${modelNamesPluralPascal
              .map((modelName) => `${camelCase(modelName)}: ${modelName}Table`)
              .join('\n')}
          }
          
          export const db = createKysely<Database>()
          
          export const deinit = async () => {
            const tables: string[] = [
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
    '.gitignore': await GitignoreGenerator([
      'node_modules',
      '# Output',
      '.output',
      '.vercel',
      '/.svelte-kit',
      '/build',
      '# OS',
      '.DS_Store',
      'Thumbs.db',
      '# Env',
      '.env',
      '.env.*',
      '!.env.example',
      '!.env.test',
      '# Vite',
      'vite.config.js.timestamp-*',
      'vite.config.ts.timestamp-*',
    ]),
    '.npmrc': await generate({
      processor: PrettierProcessor(),
      engine: () => `
        engine-strict=true
      `,
    }),
    '.prettierrc': await generate({
      engine: JsonEngine,
      spec: {
        useTabs: true,
        singleQuote: true,
        trailingComma: 'none',
        printWidth: 100,
        plugins: ['prettier-plugin-svelte'],
        overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
      },
    }),
    'eslint.config.js': await generate({
      processor: PrettierProcessor(),
      engine: () => /* ts */ `
        import js from '@eslint/js';
        import ts from 'typescript-eslint';
        import svelte from 'eslint-plugin-svelte';
        import prettier from 'eslint-config-prettier';
        import globals from 'globals';

        /** @type {import('eslint').Linter.Config[]} */
        export default [
          js.configs.recommended,
          ...ts.configs.recommended,
          ...svelte.configs['flat/recommended'],
          prettier,
          ...svelte.configs['flat/prettier'],
          {
            languageOptions: {
              globals: {
                ...globals.browser,
                ...globals.node
              }
            }
          },
          {
            files: ['**/*.svelte'],
            languageOptions: {
              parserOptions: {
                parser: ts.parser
              }
            }
          },
          {
            ignores: ['build/', '.svelte-kit/', 'dist/']
          }
        ];
      `,
    }),
    ...(spec.license
      ? {
          LICENSE: await LicenseGenerator({
            author: spec.author,
            license: spec.license,
          }),
        }
      : {}),
    'svelte.config.js': await generate({
      processor: PrettierProcessor(),
      engine: () => /* ts */ `
        import adapter from '@sveltejs/adapter-auto';
        import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
        
        /** @type {import('@sveltejs/kit').Config} */
        const config = {
          // Consult https://kit.svelte.dev/docs/integrations#preprocessors
          // for more information about preprocessors
          preprocess: vitePreprocess(),
        
          kit: {
            // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
            // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
            // See https://kit.svelte.dev/docs/adapters for more information about adapters.
            adapter: adapter()
          }
        };
        
        export default config;
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
          ...pkg.scripts,
          dev: 'vite dev',
          build: 'vite build',
          preview: 'vite preview',
          check: 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json',
          'check:watch': 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch',
          lint: 'prettier --check . && eslint .',
          format: 'prettier --write .',
        },
        devDependencies: {
          ...pkg.devDependencies,
          '@sveltejs/adapter-auto': '^3.0.0',
          '@sveltejs/kit': '^2.0.0',
          '@sveltejs/vite-plugin-svelte': '^3.0.0',
          '@types/eslint': '^9.6.0',
          eslint: '^9.0.0',
          'eslint-config-prettier': '^9.1.0',
          'eslint-plugin-svelte': '^2.36.0',
          globals: '^15.0.0',
          prettier: '^3.1.1',
          'prettier-plugin-svelte': '^3.1.2',
          svelte: '^4.2.7',
          'svelte-check': '^3.6.0',
          typescript: '^5.0.0',
          'typescript-eslint': '^8.0.0',
          vite: '^5.0.3',
        },
        type: 'module',
      },
    }),
    'README.md': await generate({
      processor: PrettierProcessor({
        parser: 'markdown',
      }),
      engine: HandlebarsEngine,
      spec,
      template: ReadmeTemplate,
    }),
    'tsconfig.json': await generate({
      engine: JsonEngine,
      spec: {
        extends: './.svelte-kit/tsconfig.json',
        compilerOptions: {
          allowJs: true,
          checkJs: true,
          esModuleInterop: true,
          forceConsistentCasingInFileNames: true,
          resolveJsonModule: true,
          skipLibCheck: true,
          sourceMap: true,
          strict: true,
          moduleResolution: 'bundler',
        },
      },
    }),
  };
}
