import { generate } from '@zappjs/core';
import { GitignoreGenerator } from '@zappjs/git';
import { HandlebarsEngine } from '@zappjs/handlebars';
import { JsonEngine } from '@zappjs/json';
import { LicenseGenerator } from '@zappjs/license';
import { PrettierProcessor } from '@zappjs/prettier/dist/standalone';
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
  pages: {
    [name: string]: {
      components: Array<{
        type?: string;
        text?: string;
        style?: {
          color?: string;
        };
      }>;
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
        const providers: Record<string, string> = {
          '42-school': `{
            clientId: process.env.FORTY_TWO_CLIENT_ID || '',
            clientSecret: process.env.FORTY_TWO_CLIENT_SECRET || '',
          }`,
          apple: `{
            clientId: process.env.APPLE_ID || '',
            clientSecret: process.env.APPLE_SECRET || '',
          }`,
          atlassian: `{
            clientId: process.env.ATLASSIAN_CLIENT_ID || '',
            clientSecret: process.env.ATLASSIAN_CLIENT_SECRET || '',
            authorization: {
              params: {
                scope: 'write:jira-work read:jira-work read:jira-user offline_access read:me',
              },
            },
          }`,
          auth0: `{
            clientId: process.env.AUTH0_CLIENT_ID || '',
            clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
            issuer: process.env.AUTH0_ISSUER || ''
          }`,
          authentik: `{
            clientId: process.env.AUTHENTIK_ID || '',
            clientSecret: process.env.AUTHENTIK_SECRET || '',
            issuer: process.env.AUTHENTIK_ISSUER || '',
          }`,
          'azure-ad-b2c': `{
            tenantId: process.env.AZURE_AD_B2C_TENANT_NAME || '',
            clientId: process.env.AZURE_AD_B2C_CLIENT_ID || '',
            clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET || '',
            primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW || '',
            authorization: { params: { scope: "offline_access openid" } },
          }`,
          'azure-ad': `{
            clientId: process.env.AZURE_AD_CLIENT_ID || '',
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
            tenantId: process.env.AZURE_AD_TENANT_ID || '',
          }`,
          'battle.net': `{
            clientId: process.env.BATTLENET_CLIENT_ID || '',
            clientSecret: process.env.BATTLENET_CLIENT_SECRET || '',
            issuer: process.env.BATTLENET_ISSUER || ''
          }`,
          box: `{
            clientId: process.env.BOX_CLIENT_ID || '',
            clientSecret: process.env.BOX_CLIENT_SECRET || ''
          }`,
          'boxyhq-saml': `{
            issuer: "http://localhost:5225",
            clientId: "dummy", // The dummy here is necessary since we'll pass tenant and product custom attributes in the client code
            clientSecret: "dummy", // The dummy here is necessary since we'll pass tenant and product custom attributes in the client code
          }`,
          bungie: `{
            clientId: process.env.BUNGIE_CLIENT_ID || '',
            clientSecret: process.env.BUNGIE_SECRET || '',
            headers: {
              "X-API-Key": process.env.BUNGIE_API_KEY || ''
            }
          }`,
          cognito: `{
            clientId: process.env.COGNITO_CLIENT_ID || '',
            clientSecret: process.env.COGNITO_CLIENT_SECRET || '',
            issuer: process.env.COGNITO_ISSUER || '',
          }`,
          coinbase: `{
            clientId: process.env.COINBASE_CLIENT_ID || '',
            clientSecret: process.env.COINBASE_CLIENT_SECRET || ''
          }`,
          credentials: `{
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // \`credentials\` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the \`credentials\` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              // Add logic here to look up the user from the credentials supplied
              const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        
              if (user) {
                // Any object returned will be saved in \`user\` property of the JWT
                return user
              } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null
        
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
            }
          }`,
          discord: `{
            clientId: process.env.DISCORD_CLIENT_ID || '',
            clientSecret: process.env.DISCORD_CLIENT_SECRET || ''
          }`,
          dropbox: `{
            clientId: process.env.DROPBOX_CLIENT_ID || '',
            clientSecret: process.env.DROPBOX_CLIENT_SECRET || ''
          }`,
          'duende-identityserver6': `{
            clientId: process.env.DUENDE_IDS6_ID || '',
            clientSecret: process.env.DUENDE_IDS6_SECRET || '',
            issuer: process.env.DUENDE_IDS6_ISSUER || '',
          }`,
          email: `{
            server: process.env.EMAIL_SERVER || '',
            from: process.env.EMAIL_FROM || ''
          }`,
          eveonline: `{
            clientId: process.env.EVE_CLIENT_ID || '',
            clientSecret: process.env.EVE_CLIENT_SECRET || ''
          }`,
          facebook: `{
            clientId: process.env.FACEBOOK_CLIENT_ID || '',
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
          }`,
          faceit: `{
            clientId: process.env.FACEIT_CLIENT_ID || '',
            clientSecret: process.env.FACEIT_CLIENT_SECRET || ''
          }`,
          foursquare: `{
            clientId: process.env.FOURSQUARE_CLIENT_ID || '',
            clientSecret: process.env.FOURSQUARE_CLIENT_SECRET || '',
            apiVersion: "YYYYMMDD"
          }`,
          freshbooks: `{
            clientId: process.env.FRESHBOOKS_CLIENT_ID || '',
            clientSecret: process.env.FRESHBOOKS_CLIENT_SECRET || '',
          }`,
          fusionauth: `{
            id: "fusionauth",
            name: "FusionAuth",
            issuer:  process.env.FUSIONAUTH_ISSUER || '',
            clientId: process.env.FUSIONAUTH_CLIENT_ID || '',
            clientSecret: process.env.FUSIONAUTH_SECRET || '',
            tenantId: process.env.FUSIONAUTH_TENANT_ID || '' // Only required if you're using multi-tenancy
          }`,
          github: `{
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
          }`,
          gitlab: `{
            clientId: process.env.GITLAB_CLIENT_ID || '',
            clientSecret: process.env.GITLAB_CLIENT_SECRET || ''
          }`,
          google: `{
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
          }`,
          hubspot: `{
            clientId: process.env.HUBSPOT_CLIENT_ID || '',
            clientSecret: process.env.HUBSPOT_CLIENT_SECRET || ''
          }`,
          'identity-server4': `{
            id: "identity-server4",
            name: "IdentityServer4",
            issuer:  process.env.IdentityServer4_Issuer,
            clientId: process.env.IdentityServer4_CLIENT_ID || '',
            clientSecret: process.env.IdentityServer4_CLIENT_SECRET || ''
          }`,
          instagram: `{
            clientId: process.env.INSTAGRAM_CLIENT_ID || '',
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || ''
          }`,
          kakao: `{
            clientId: process.env.KAKAO_CLIENT_ID || '',
            clientSecret: process.env.KAKAO_CLIENT_SECRET || ''
          }`,
          keycloak: `{
            clientId: process.env.KEYCLOAK_ID || '',
            clientSecret: process.env.KEYCLOAK_SECRET || '',
            issuer: process.env.KEYCLOAK_ISSUER || '',
          }`,
          line: `{
            clientId: process.env.LINE_CLIENT_ID || '',
            clientSecret: process.env.LINE_CLIENT_SECRET || ''
          }`,
          linkedin: `{
            clientId: process.env.LINKEDIN_CLIENT_ID || '',
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET || ''
          }`,
          mailchimp: `{
            clientId: process.env.MAILCHIMP_CLIENT_ID || '',
            clientSecret: process.env.MAILCHIMP_CLIENT_SECRET || ''
          }`,
          mailru: `{
            clientId: process.env.MAILRU_CLIENT_ID || '',
            clientSecret: process.env.MAILRU_CLIENT_SECRET || ''
          }`,
          medium: `{
            clientId: process.env.MEDIUM_CLIENT_ID,
            clientSecret: process.env.MEDIUM_CLIENT_SECRET
          }`,
          naver: `{
            clientId: process.env.NAVER_CLIENT_ID,
            clientSecret: process.env.NAVER_CLIENT_SECRET
          }`,
          netlify: `{
            clientId: process.env.NETLIFY_CLIENT_ID,
            clientSecret: process.env.NETLIFY_CLIENT_SECRET
          }`,
          okta: `{
            clientId: process.env.OKTA_CLIENT_ID,
            clientSecret: process.env.OKTA_CLIENT_SECRET,
            issuer: process.env.OKTA_ISSUER
          }`,
          onelogin: `{
            clientId: process.env.ONELOGIN_CLIENT_ID,
            clientSecret: process.env.ONELOGIN_CLIENT_SECRET,
            issuer: process.env.ONELOGIN_ISSUER
          }`,
          osso: `{
            clientId: process.env.OSSO_CLIENT_ID,
            clientSecret: process.env.OSSO_CLIENT_SECRET,
            issuer: process.env.OSSO_ISSUER
          }`,
          osu: `{
            clientId: process.env.OSU_CLIENT_ID,
            clientSecret: process.env.OSU_CLIENT_SECRET
          }`,
          patreon: `{
            clientId: process.env.PATREON_ID,
            clientSecret: process.env.PATREON_SECRET,
          }`,
          pinterest: `{
            clientId: process.env.PINTEREST_ID,
            clientSecret: process.env.PINTEREST_SECRET
          }`,
          pipedrive: `{
            clientId: process.env.PIPEDRIVE_CLIENT_ID,
            clientSecret: process.env.PIPEDRIVE_CLIENT_SECRET,
          }`,
          reddit: `{
            clientId: process.env.REDDIT_CLIENT_ID,
            clientSecret: process.env.REDDIT_CLIENT_SECRET
          }`,
          salesforce: `{
            clientId: process.env.SALESFORCE_CLIENT_ID,
            clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
          }`,
          slack: `{
            clientId: process.env.SLACK_CLIENT_ID,
            clientSecret: process.env.SLACK_CLIENT_SECRET
          }`,
          spotify: `{
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET
          }`,
          strava: `{
            clientId: process.env.STRAVA_CLIENT_ID,
            clientSecret: process.env.STRAVA_CLIENT_SECRET,
          }`,
          todoist: `{
            clientId: process.env.TODOIST_ID,
            clientSecret: process.env.TODOIST_SECRET
          }`,
          trakt: `{
            clientId: process.env.TRAKT_ID,
            clientSecret: process.env.TRAKT_SECRET,
          }`,
          twitch: `{
            clientId: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET
          }`,
          twitter: `{
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET
          }`,
          'united-effects': `{
            clientId: process.env.UNITED_EFFECTS_CLIENT_ID,
            clientSecret: process.env.UNITED_EFFECTS_CLIENT_SECRET,
            issuer: process.env.UNITED_EFFECTS_ISSUER
          }`,
          vk: `{
            clientId: process.env.VK_CLIENT_ID,
            clientSecret: process.env.VK_CLIENT_SECRET
          }`,
          wikimedia: `{
            clientId: process.env.WIKIMEDIA_CLIENT_ID,
            clientSecret: process.env.WIKIMEDIA_CLIENT_SECRET
          }`,
          wordpress: `{
            clientId: process.env.WORDPRESS_CLIENT_ID,
            clientSecret: process.env.WORDPRESS_CLIENT_SECRET
          }`,
          workos: `{
            clientId: process.env.WORKOS_CLIENT_ID,
            clientSecret: process.env.WORKOS_API_KEY,
          }`,
          yandex: `{
            clientId: process.env.YANDEX_CLIENT_ID,
            clientSecret: process.env.YANDEX_CLIENT_SECRET
          }`,
          zitadel: `{
            clientId: process.env.ZITADEL_CLIENT_ID,
            authorization: {
              params: {
                  scope: \`openid email profile urn:zitadel:iam:org:project:id:\${process.env.ZITADEL_PROJECT_ID}:aud\`
              }
            }
          }`,
          zoho: `{
            clientId: process.env.ZOHO_CLIENT_ID,
            clientSecret: process.env.ZOHO_CLIENT_SECRET
          }`,
          zoom: `{
            clientId: process.env.ZOOM_CLIENT_ID,
            clientSecret: process.env.ZOOM_CLIENT_SECRET
          }`,
        };

        const renderProviderImport = (provider: string) => {
          return providers[provider]
            ? `import ${pascalCase(provider)}Provider from 'next-auth/providers/${provider}'`
            : '';
        };

        const renderProviderCode = (provider: string) => {
          return providers[provider]
            ? `${pascalCase(provider)}Provider(${providers[provider]})`
            : '';
        };

        return /*ts*/ `
          import { NextAuthOptions } from 'next-auth'
          ${spec.auth?.providers
            .map((provider) => renderProviderImport(provider))
            .filter((v) => !!v)
            .join(';')}
          
          export const authOptions: NextAuthOptions = {
            providers: [
              ${spec.auth?.providers
                .map((provider) => renderProviderCode(provider))
                .filter((v) => !!v)
                .join(',')}
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
    Object.entries(spec.calls).map(async ([callName, call]) => {
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

  const pages: {
    [name: string]: Buffer | string;
  } = {};
  await Promise.all(
    Object.entries(spec.pages).map(async ([pageName, page]) => {
      pages[`app/${pageName === 'index' ? 'page.tsx' : `${pageName}/page.tsx`}`] = await generate({
        processor: PrettierProcessor(),
        engine: async () => `
          import Image from 'next/image'

          export default function Home() {
            return (
              <main className="flex h-screen flex-col items-center justify-center">
                ${page.components
                  .map(
                    (component) =>
                      `<${component.type} style={${JSON.stringify(component.style)}}>${
                        component.text
                      }</${component.type}>`,
                  )
                  .join('')}
              </main>
            )
          }
        `,
      });
    }),
  );

  const schemas: {
    [file: string]: Buffer | string;
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
    Object.entries(spec.models).map(async ([modelName, model]) => {
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
    ...calls,
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
    'lib/client.ts': await generate({
      processor: PrettierProcessor(),
      engine: () => `
        import axios from "axios";

        ${Object.entries(spec.calls)
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

        ${Object.entries(spec.calls)
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
          ...pkg.scripts,
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
          lint: 'next lint',
        },
        dependencies: {
          ...pkg.dependencies,
          '@vercel/postgres-kysely': '^0.5.0',
          axios: '^1.6.0',
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
