import { type IProcessor, generate } from '@specui/core';
import { GitignoreGenerator } from '@specui/git';
import { JsonEngine } from '@specui/json';
import { LicenseGenerator } from '@specui/license';
import { kebabCase, pascalCase } from 'change-case';
import { singular } from 'pluralize';

import { UI_COMPONENTS } from './constants/UI_COMPONENTS';
import { ReadmeGenerator } from './generators/ReadmeGenerator';
import { TailwindConfigGenerator } from './generators/TailwindConfigGenerator';
import { TsConfigGenerator } from './generators/TsConfigGenerator';
import { PostcssConfigGenerator } from './generators/PostcssConfigGenerator';
import { PackageGenerator } from './generators/PackageGenerator';
import type { Element, ElementArrayOrRef } from './interfaces/BaseElement';
import type { Page } from './interfaces/Page';
import type { Spec } from './interfaces/Spec';
import { renderElementProps } from './utils/renderElementProps';
import { renderPropType } from './utils/renderPropType';
import { parseDb } from './utils/parseDb';
import { parseModels } from './utils/parseModels';
import { parseTables } from './utils/parseTables';
import { parseTauri } from './utils/parseTauri';
import { parseSchemas } from './utils/parseSchemas';
import { parseAuth } from './utils/parseAuth';
import { parseCalls } from './utils/parseCalls';
import { renderClient } from './utils/renderClient';
import { renderClsx } from './utils/renderClsx';
import { parseActions } from './utils/parseActions';
import { renderImports } from './utils/renderImports';
import { LaunchGenerator } from './generators/LaunchGenerator';

export * from './interfaces/Spec';

export default async function generator(
  spec: Spec,
  PrettierProcessor: IProcessor<any>,
  // IconGenerator: any,
  existsSync?: (path: string) => boolean,
) {
  const routerFolder = spec.next?.routing ?? 'app';

  const auth = await parseAuth({ PrettierProcessor, routerFolder, spec });

  const calls = await parseCalls({ PrettierProcessor, spec });

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
        typeof element.elements === 'string' && element.elements.startsWith('$')
          ? `{${element.elements.slice(1)}}`
          : typeof element.elements === 'string'
          ? element.elements
          : Array.isArray(element.elements)
          ? element.elements.map(render).join('')
          : element.elements
          ? `{${
              element.elements.data ? JSON.stringify(element.elements.data) : element.elements.model
            }.map(${element.elements.name} => (
            <${element.elements.tag} className="${
              Array.isArray(element.elements.class)
                ? element.elements.class.join(' ')
                : element.elements.class
            }" key=${
              element.elements.key?.startsWith('$')
                ? `{${element.elements.key.slice(1)}}`
                : `'${element.elements.key}'`
            }>
              ${
                Array.isArray(element.elements.elements)
                  ? element.elements.elements?.map(render).join('')
                  : ''
              }
            </${element.elements.tag}>
          ))}`
          : ''
      }
    `.trim();

    const motionTag =
      element.initial || element.animate || element.whileHover || element.whileTap
        ? `motion.${tag}`
        : tag;

    const allChildren = [
      element.header ? `<SidebarHeader>${element.header}</SidebarHeader>` : undefined,
      element.groups
        ? `<SidebarGroup>${element.groups.map(
            (group) =>
              `<SidebarGroupLabel>${group.label}</SidebarGroupLabel>${
                group.menu
                  ? `<SidebarMenu>${group.menu.items
                      ?.map(
                        (item) =>
                          `<SidebarMenuItem><SidebarMenuButton asChild><Link href="${
                            item.url
                          }"><${pascalCase(item.icon ?? '')} /><span>${
                            item.title
                          }</span></Link></SidebarMenuButton></SidebarMenuItem>`,
                      )
                      .join('\n')}</SidebarMenu>`
                  : ''
              }`,
          )}</SidebarGroup>`
        : undefined,
      children,
    ].filter((child) => !!child);

    const innerHtml = `<${motionTag} ${props}
      ${allChildren.length ? `>${allChildren.join('\n')}</${motionTag}>` : ' />'}`;

    return element.auth === 'signedIn'
      ? `<SignedIn>${innerHtml}</SignedIn>`
      : element.auth === 'signedOut'
      ? `<SignedOut>${innerHtml}</SignedOut>`
      : innerHtml;
  }

  const predefinedComponents: Record<string, string> = {};
  for (const [name, uiComponent] of Object.entries(UI_COMPONENTS)) {
    for (const component of uiComponent.components) {
      predefinedComponents[component] = name;
    }
  }
  const externalComponents: Record<string, string> = {};

  const actions = await parseActions({ PrettierProcessor, spec });

  const components: {
    [name: string]: Buffer | string;
  } = {};
  await Promise.all(
    Object.entries(spec.components || {}).map(async ([componentName, component]) => {
      renderPageComponents(component.elements);

      components[`components/${pascalCase(componentName)}.tsx`] = await generate({
        processor: PrettierProcessor(),
        engine: async () => `
          ${renderClient(component.elements)}
          ${Array.isArray(component.elements) ? renderClsx(component.elements) : ''}
          ${
            Array.isArray(component.elements)
              ? renderImports(component.elements, predefinedComponents)
              : ''
          }

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

  function renderPageComponents(elementsArrayOrRef?: ElementArrayOrRef) {
    if (elementsArrayOrRef) {
      if (typeof elementsArrayOrRef === 'string') {
        return;
      }
      const elements = Array.isArray(elementsArrayOrRef)
        ? elementsArrayOrRef
        : [elementsArrayOrRef];
      for (let element of elements) {
        if (
          typeof element.component === 'string' &&
          predefinedComponents[pascalCase(element.component)] &&
          !externalComponents[`components/${pascalCase(element.component)}.tsx`]
        ) {
          externalComponents[`components/${pascalCase(element.component)}.tsx`] =
            UI_COMPONENTS[predefinedComponents[pascalCase(element.component)]].template;

          const uiName = kebabCase(element.component);
          const deps = UI_COMPONENTS[uiName]?.dependencies
            ?.filter((dep) => dep.startsWith('@/components/ui/'))
            .map((dep) => {
              return {
                component: dep.slice('@/components/ui/'.length),
              };
            });
          if (deps) {
            renderPageComponents(deps);
          }
        }
        if (element.elements) {
          renderPageComponents(element.elements);
        }
      }
    }
  }

  async function renderPage(
    pageName: string,
    page: Page,
    pagePath: string,
    type: 'page' | 'layout' = 'page',
  ) {
    renderPageComponents(page.elements);

    const target = type === 'layout' ? layouts : pages;

    target[pagePath] = await generate({
      processor: PrettierProcessor(),
      engine: async () => `
        ${Array.isArray(page.elements) ? renderClient(page.elements) : ''}
        ${Array.isArray(page.elements) ? renderClsx(page.elements) : ''}
        ${Array.isArray(page.elements) ? renderImports(page.elements, predefinedComponents) : ''}
        ${
          page.dataSources
            ? spec.database?.type === 'mongodb'
              ? `import { connectToMemoryDB } from "@/lib/mongo";`
              : `import { db } from '@/lib/db';`
            : ''
        }
        ${Object.entries(page.dataSources || {}).map(([dataSourceName, dataSource]) =>
          spec.database?.type === 'mongodb'
            ? `import { ${pascalCase(
                singular(dataSource.model ?? ''),
              )}Model } from "@/lib/models/${pascalCase(singular(dataSource.model ?? ''))}Model";`
            : '',
        )}

        export default${page.dataSources ? ' async ' : ' '}function ${pascalCase(pageName)}${
          type === 'layout' ? 'Layout' : 'Page'
        }(${type === 'layout' ? 'props: { children: React.ReactNode }' : ''}) {

          ${
            page.dataSources && spec.database?.type === 'mongodb'
              ? 'await connectToMemoryDB();'
              : ''
          }

          ${Object.entries(page.dataSources || {}).map(([dataSourceName, dataSource]) =>
            spec.database?.type === 'mongodb'
              ? `const ${dataSourceName} = await ${pascalCase(
                  singular(dataSource.model ?? ''),
                )}Model.find();`
              : `const ${dataSourceName} = await db.selectFrom('${dataSource.model}').selectAll().execute();`,
          )}

          return (
            <>
              ${(Array.isArray(page.elements) ? page.elements : []).map(render).join('')}
            </>
          )
        }
      `,
    });
  }

  const pages: {
    [name: string]: Buffer | string;
  } = {};
  await Promise.all(
    Object.entries(spec.pages || {})
      .filter(([pageName]) => pageName !== 'index' && pageName !== '/')
      .map(async ([pageName, page]) =>
        renderPage(
          pageName,
          page,
          routerFolder === 'pages' ? `pages/${pageName}.tsx` : `app/${pageName}/page.tsx`,
        ),
      ),
  );
  if (spec.pages?.['/']) {
    await renderPage(
      'index',
      spec.pages['/'],
      routerFolder === 'pages' ? 'pages/index.tsx' : 'app/page.tsx',
    );
  } else if (spec.pages?.index) {
    await renderPage(
      'index',
      spec.pages.index,
      routerFolder === 'pages' ? 'pages/index.tsx' : 'app/page.tsx',
    );
  }

  const layouts: {
    [name: string]: Buffer | string;
  } = {};
  await Promise.all(
    Object.entries(spec.layouts || {})
      .filter(([layoutName]) => layoutName !== 'index' && layoutName !== '/')
      .map(
        async ([layoutName, layout]) =>
          renderPage(
            layoutName,
            layout,
            routerFolder === 'pages'
              ? `components/layouts/${layoutName}.tsx`
              : `app/${layoutName}/layout.tsx`,
            'layout',
          ),
        'layout',
      ),
  );
  if (spec.layouts?.['/']) {
    await renderPage(
      'index',
      spec.layouts['/'],
      routerFolder === 'pages' ? 'components/layouts/main.tsx' : 'app/layout.tsx',
      'layout',
    );
  } else if (spec.layouts?.index) {
    await renderPage(
      'index',
      spec.layouts.index,
      routerFolder === 'pages' ? 'components/layouts/main.tsx' : 'app/layout.tsx',
      'layout',
    );
  } else {
    layouts[routerFolder === 'pages' ? 'components/layouts/main.tsx' : 'app/layout.tsx'] =
      await generate({
        processor: PrettierProcessor(),
        engine: async () => /* ts */ `
        ${
          spec.auth?.integration === 'clerk' ? `import { ClerkProvider } from '@clerk/nextjs';` : ''
        }
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
            ${spec.auth?.integration === 'clerk' ? '<ClerkProvider>' : ''}
              <html lang="en">
                <body className={inter.className}>
                  <main>{children}</main>
                  ${spec.vercel?.analytics ? '<Analytics />' : ''}
                </body>
              </html>
            ${spec.auth?.integration === 'clerk' ? '</ClerkProvider>' : ''}
          )
        }
      `,
      });
  }

  const schemas = await parseSchemas({ PrettierProcessor, spec });
  const models = await parseModels({ PrettierProcessor, spec });
  const tables = await parseTables({ PrettierProcessor, spec });
  const tauri = await parseTauri({ spec });
  const db = await parseDb({ PrettierProcessor, spec });

  return {
    ...actions,
    ...auth,
    ...calls,
    ...components,
    ...db,
    ...externalComponents,
    ...layouts,
    ...pages,
    ...tauri,
    [routerFolder === 'pages' ? 'styles/globals.css' : 'app/globals.css']: await generate({
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
    'hooks/use-mobile.tsx': await generate({
      processor: PrettierProcessor(),
      engine: () => `
        import * as React from "react"

        const MOBILE_BREAKPOINT = 768

        export function useIsMobile() {
          const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

          React.useEffect(() => {
            const mql = window.matchMedia(\`(max-width: \${MOBILE_BREAKPOINT - 1}px)\`)
            const onChange = () => {
              setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
            }
            mql.addEventListener("change", onChange)
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
            return () => mql.removeEventListener("change", onChange)
          }, [])

          return !!isMobile
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
    ...models,
    ...tables,
    'lib/utils.ts': await generate({
      processor: PrettierProcessor(),
      engine: () => /* ts */ `
        import clsx, { ClassValue } from 'clsx';
        import { extendTailwindMerge, mergeConfigs } from 'tailwind-merge';

        const twMerge = extendTailwindMerge((baseConfig) =>
          mergeConfigs(baseConfig, {
            extend: {
              classGroups: {
                'text-shadow': ['text-shadow', 'text-shadow-sm', 'text-shadow-lg'],
              },
              conflictingClassGroups: {
                'text-color': ['text-shadow'],
              },
            },
          }),
        );

        export function cn(...args: ClassValue[]) {
          return twMerge(clsx(...args));
        }
      `,
    }),
    '.vscode/launch.json': await LaunchGenerator({ spec }),
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
    ...(spec.license
      ? {
          LICENSE: await LicenseGenerator({
            author: spec.author,
            license: spec.license,
          }),
        }
      : {}),
    '.npmrc': await generate({
      engine: () => `engine-strict=true`,
    }),
    'next.config.ts': await generate({
      processor: PrettierProcessor(),
      engine: () => /*ts*/ `
        import type { NextConfig } from "next";

        const nextConfig: NextConfig = {};
        
        export default nextConfig;
      `,
    }),
    'package.json': await PackageGenerator({
      existsSync,
      spec,
    }),
    'postcss.config.mjs': await PostcssConfigGenerator({ PrettierProcessor }),
    'README.md': await ReadmeGenerator({ PrettierProcessor, spec }),
    'tailwind.config.ts': await TailwindConfigGenerator({ PrettierProcessor }),
    'tsconfig.json': await TsConfigGenerator(),
  };
}
