import { type IProcessor, generate } from '@specui/core';
import { GitignoreGenerator } from '@specui/git';
import { HandlebarsEngine } from '@specui/handlebars';
import { JsonEngine } from '@specui/json';
import { LicenseGenerator } from '@specui/license';
import { TomlEngine } from '@specui/toml';
import { camelCase, pascalCase, titleCase } from 'change-case';
import { plural, singular } from 'pluralize';
import semver from 'semver';

import type { Element, ElementArrayOrRef } from './interfaces/BaseElement';
import type { InputElement } from './interfaces/NativeElement';
import type { Page } from './interfaces/Page';
import type { Spec } from './interfaces/Spec';
import AccordionTemplate from './templates/components/AccordionTemplate';
import AlertTemplate from './templates/components/AlertTemplate';
import AlertDialogTemplate from './templates/components/AlertDialogTemplate';
import AspectRatioTemplate from './templates/components/AspectRatioTemplate';
import AvatarTemplate from './templates/components/AvatarTemplate';
import BadgeTemplate from './templates/components/BadgeTemplate';
import BreadcrumbTemplate from './templates/components/BreadcrumbTemplate';
import ButtonTemplate from './templates/components/ButtonTemplate';
import CalendarTemplate from './templates/components/CalendarTemplate';
import CardTemplate from './templates/components/CardTemplate';
import CarouselTemplate from './templates/components/CarouselTemplate';
import CheckboxTemplate from './templates/components/CheckboxTemplate';
import CollapsableTemplate from './templates/components/CollapsableTemplate';
import CommandTemplate from './templates/components/CommandTemplate';
import ContextMenuTemplate from './templates/components/ContextMenuTemplate';
import DialogTemplate from './templates/components/DialogTemplate';
import DrawerTemplate from './templates/components/DrawerTemplate';
import DropdownTemplate from './templates/components/DropdownTemplate';
import { ReadmeTemplate } from './templates/ReadmeTemplate';

export * from './interfaces/Spec';

export default async function generator(
  spec: Spec,
  PrettierProcessor: IProcessor<any>,
  // IconGenerator: any,
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
  if (spec.auth?.integration === 'clerk') {
    auth['middleware.ts'] = await generate({
      processor: PrettierProcessor(),
      engine: async () => /* ts */ `
        import { clerkMiddleware } from '@clerk/nextjs/server'

        export default clerkMiddleware()

        export const config = {
          matcher: [
            '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
            '/(api|trpc)(.*)',
          ],
        }
      `,
    });
  }
  if (spec.auth?.integration === 'next-auth') {
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
      const classes = Array.isArray(element.class)
        ? element.class
            .map((className) => {
              if (typeof className === 'object') {
                if ('dark' in className) {
                  if (Array.isArray(className.dark)) {
                    return className.dark.map((dark) => `dark:${dark}`);
                  }
                  return `dark:${className.dark}`;
                }

                if ('hover' in className) {
                  if (Array.isArray(className.hover)) {
                    return className.hover.map((hover) => `hover:${hover}`);
                  }
                  return `hover:${className.hover}`;
                }
              }

              return className;
            })
            .flat()
        : element.class;

      props.className =
        Array.isArray(classes) && classes.some((className) => typeof className !== 'string')
          ? `{clsx(${classes
              .map((className) =>
                className.startsWith('$') ? className.slice(1) : `'${className}'`,
              )
              .join(',')})}`
          : Array.isArray(classes)
          ? `"${classes.join(' ')}"`
          : `"${classes}"`;
    }

    [
      'alt',
      'collapsible',
      'defaultChecked',
      'for',
      'href',
      'name',
      'placeholder',
      'required',
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

    const innerHtml = `<${motionTag} ${props}
      ${children ? `>${children}</${motionTag}>` : ' />'}`;

    return element.auth === 'signedIn'
      ? `<SignedIn>${innerHtml}</SignedIn>`
      : element.auth === 'signedOut'
      ? `<SignedOut>${innerHtml}</SignedOut>`
      : innerHtml;
  }

  const uiComponents: Record<
    string,
    {
      components: string[];
      dependencies?: string[];
      template: string;
    }
  > = {
    accordion: {
      components: ['Accordion', 'AccordionItem', 'AccordionTrigger', 'AccordionContent'],
      dependencies: ['@radix-ui/react-accordion', '@radix-ui/react-icons'],
      template: AccordionTemplate,
    },
    alert: {
      components: ['Alert', 'AlertTitle', 'AlertDescription'],
      dependencies: ['class-variance-authority'],
      template: AlertTemplate,
    },
    alertDialog: {
      components: [
        'AlertDialog',
        'AlertDialogPortal',
        'AlertDialogOverlay',
        'AlertDialogTrigger',
        'AlertDialogContent',
        'AlertDialogHeader',
        'AlertDialogFooter',
        'AlertDialogTitle',
        'AlertDialogDescription',
        'AlertDialogAction',
        'AlertDialogCancel',
      ],
      dependencies: ['@radix-ui/react-alert-dialog'],
      template: AlertDialogTemplate,
    },
    aspectRatio: {
      components: ['AspectRatio'],
      dependencies: ['@radix-ui/react-aspect-ratio'],
      template: AspectRatioTemplate,
    },
    avatar: {
      components: ['Avatar', 'AvatarImage', 'AvatarFallback'],
      dependencies: ['@radix-ui/react-avatar'],
      template: AvatarTemplate,
    },
    badge: {
      components: ['Badge'],
      dependencies: ['class-variance-authority'],
      template: BadgeTemplate,
    },
    breadcrumb: {
      components: [
        'Breadcrumb',
        'BreadcrumbList',
        'BreadcrumbItem',
        'BreadcrumbLink',
        'BreadcrumbPage',
        'BreadcrumbSeparator',
        'BreadcrumbEllipsis',
      ],
      dependencies: ['@radix-ui/react-icons', '@radix-ui/react-slot'],
      template: BreadcrumbTemplate,
    },
    button: {
      components: ['Button'],
      dependencies: ['@radix-ui/react-slot', 'class-variance-authority'],
      template: ButtonTemplate,
    },
    calendar: {
      components: ['Calendar'],
      dependencies: ['@radix-ui/react-icons', 'react-day-picker'],
      template: CalendarTemplate,
    },
    card: {
      components: [
        'Card',
        'CardHeader',
        'CardFooter',
        'CardTitle',
        'CardDescription',
        'CardContent',
      ],
      template: CardTemplate,
    },
    carousel: {
      components: [
        'Carousel',
        'CarouselContent',
        'CarouselItem',
        'CarouselPrevious',
        'CarouselNext',
      ],
      dependencies: ['@radix-ui/react-icons', 'embla-carousel-react'],
      template: CarouselTemplate,
    },
    checkbox: {
      components: ['Checkbox'],
      dependencies: ['@radix-ui/react-checkbox', '@radix-ui/react-icons'],
      template: CheckboxTemplate,
    },
    collapsable: {
      components: ['Collapsible', 'CollapsibleTrigger', 'CollapsibleContent'],
      dependencies: ['@radix-ui/react-collapsible'],
      template: CollapsableTemplate,
    },
    command: {
      components: [
        'Command',
        'CommandDialog',
        'CommandInput',
        'CommandList',
        'CommandEmpty',
        'CommandGroup',
        'CommandItem',
        'CommandShortcut',
        'CommandSeparator',
      ],
      dependencies: ['@radix-ui/react-dialog', '@radix-ui/react-icons', 'cmdk'],
      template: CommandTemplate,
    },
    contextMenu: {
      components: [
        'ContextMenu',
        'ContextMenuTrigger',
        'ContextMenuContent',
        'ContextMenuItem',
        'ContextMenuCheckboxItem',
        'ContextMenuRadioItem',
        'ContextMenuLabel',
        'ContextMenuSeparator',
        'ContextMenuShortcut',
        'ContextMenuGroup',
        'ContextMenuPortal',
        'ContextMenuSub',
        'ContextMenuSubContent',
        'ContextMenuSubTrigger',
        'ContextMenuRadioGroup',
      ],
      dependencies: ['@radix-ui/react-context-menu', '@radix-ui/react-icons'],
      template: ContextMenuTemplate,
    },
    dialog: {
      components: [
        'Dialog',
        'DialogPortal',
        'DialogOverlay',
        'DialogTrigger',
        'DialogClose',
        'DialogContent',
        'DialogHeader',
        'DialogFooter',
        'DialogTitle',
        'DialogDescription',
      ],
      dependencies: ['@radix-ui/react-dialog', '@radix-ui/react-icons'],
      template: DialogTemplate,
    },
    drawer: {
      components: [
        'Drawer',
        'DrawerPortal',
        'DrawerOverlay',
        'DrawerTrigger',
        'DrawerClose',
        'DrawerContent',
        'DrawerHeader',
        'DrawerFooter',
        'DrawerTitle',
        'DrawerDescription',
      ],
      dependencies: ['vaul'],
      template: DrawerTemplate,
    },
    dropdownMenu: {
      components: [
        'DropdownMenu',
        'DropdownMenuTrigger',
        'DropdownMenuContent',
        'DropdownMenuItem',
        'DropdownMenuCheckboxItem',
        'DropdownMenuRadioItem',
        'DropdownMenuLabel',
        'DropdownMenuSeparator',
        'DropdownMenuShortcut',
        'DropdownMenuGroup',
        'DropdownMenuPortal',
        'DropdownMenuSub',
        'DropdownMenuSubContent',
        'DropdownMenuSubTrigger',
        'DropdownMenuRadioGroup',
      ],
      dependencies: ['@radix-ui/react-dropdown-menu', '@radix-ui/react-icons'],
      template: DropdownTemplate,
    },
  };

  const predefinedComponents: Record<string, string> = {};
  for (const [name, uiComponent] of Object.entries(uiComponents)) {
    for (const component of uiComponent.components) {
      predefinedComponents[component] = name;
    }
  }

  function renderImports(elements: ElementArrayOrRef): string {
    let imports: Record<string, string | string[]> = {};

    function collectImports(elements: ElementArrayOrRef) {
      (Array.isArray(elements) ? elements : []).forEach((element) => {
        const component = pascalCase(element.component || '');

        if (element.auth) {
          if (!imports['@clerk/nextjs']) {
            imports['@clerk/nextjs'] = [];
          }
          if (
            element.auth === 'signedIn' &&
            !(imports['@clerk/nextjs'] as string[]).includes('SignedIn')
          ) {
            (imports['@clerk/nextjs'] as string[]).push('SignedIn');
          }
          if (
            element.auth === 'signedOut' &&
            !(imports['@clerk/nextjs'] as string[]).includes('SignedOut')
          ) {
            (imports['@clerk/nextjs'] as string[]).push('SignedOut');
          }
        }

        if (component && !imports[component]) {
          if (predefinedComponents[component]) {
            const ui = pascalCase(predefinedComponents[component]);
            if (!imports[`@/components/${ui}`]) {
              imports[`@/components/${ui}`] = [];
            }
            if (!(imports[`@/components/${ui}`] as string[]).includes(component)) {
              (imports[`@/components/${ui}`] as string[]).push(component);
            }
          } else if (
            imports[`@clerk/nextjs`] &&
            !(imports[`@clerk/nextjs`] as string[]).includes(component) &&
            (component === 'SignInButton' || component === 'UserButton')
          ) {
            (imports[`@clerk/nextjs`] as string[]).push(component);
          } else {
            imports[`@/components/${component}`] = component;
          }
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
            typeof element.elements === 'string'
              ? element.elements
              : Array.isArray(element.elements)
              ? element.elements
              : [element.elements],
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

  function getActionType(
    type: 'delete' | 'insert' | 'update' | 'revalidate' | 'redirect' | 'sendEmail',
  ) {
    if (type === 'delete') {
      return 'deleteFrom';
    }
    if (type === 'insert') {
      return 'insertInto';
    }
    return 'updateTable';
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
              ? spec.database?.type === 'mongodb'
                ? `import { connectToMemoryDB } from '@/lib/mongo';`
                : `import { db } from '@/lib/db';`
              : ''
          }${
            action.operations.some((op) => ['revalidate'].includes(op.type))
              ? `import { revalidatePath } from 'next/cache';`
              : ''
          }${
            action.operations.some((op) => ['redirect'].includes(op.type))
              ? `import { redirect } from 'next/navigation';`
              : ''
          }${
            action.operations.some((op) => ['sendEmail'].includes(op.type))
              ? `import { Resend } from 'resend';\n\nconst resend = new Resend(process.env.RESEND_API_KEY ?? "missing_api_key");`
              : ''
          }
          ${action.operations
            .filter((op) => ['delete', 'insert', 'update'].includes(op.type))
            .map(
              (operation) =>
                `import { ${pascalCase(
                  operation.model ?? '',
                )}Model } from '@/lib/models/${pascalCase(operation.model ?? '')}Model'`,
            )}

          export default async function ${camelCase(actionName)}(
            formData: FormData
          ) {
            ${spec.database?.type === 'mongodb' ? 'await connectToMemoryDB();' : ''}

            const props = {
              ${Object.keys(action.props)
                .map((propName) => `${propName}: formData.get('${propName}') as string,`)
                .join('\n')}
            };

            ${action.operations
              .map((operation) =>
                ['delete', 'insert', 'update'].includes(operation.type) &&
                spec.database?.type === 'mongodb'
                  ? `
                    const ${operation.model} = new ${pascalCase(operation.model ?? '')}Model(${
                      operation.data
                        ? `({
                            ${Object.entries(operation.data)
                              .map(
                                ([name, value]) =>
                                  `${name}: ${
                                    typeof value === 'string' && value.startsWith('$')
                                      ? `${value.slice(1)} as any`
                                      : typeof value === 'string'
                                      ? `'${value}'`
                                      : value
                                  }`,
                              )
                              .join(',')}
                          })`
                        : ''
                    }); 

                    await ${operation.model}.save();
                  `
                  : ['delete', 'insert', 'update'].includes(operation.type) &&
                    spec.database?.type !== 'mongodb'
                  ? `
                await db.${getActionType(operation.type)}('${camelCase(
                  plural(operation.model || ''),
                )}')
                  ${
                    operation.data
                      ? `.${operation.type === 'update' ? 'set' : 'values'}({
                          ${Object.entries(operation.data)
                            .map(
                              ([name, value]) =>
                                `${name}: ${
                                  typeof value === 'string' && value.startsWith('$')
                                    ? `${value.slice(1)} as any`
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
                                  ? `${value.slice(1)} as any`
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
                  : operation.type === 'sendEmail'
                  ? `
                    await resend.emails.send({
                      from: '${operation.data?.from ?? 'Acme <onboarding@resend.dev>'}',
                      to: ['${operation.data?.to}'],
                      ${
                        operation.data?.replyTo
                          ? `replyTo: ${
                              operation.data.replyTo.startsWith('$')
                                ? operation.data.replyTo.slice(1)
                                : `'${operation.data.replyTo}'`
                            },`
                          : ''
                      }
                      subject: '${operation.data?.subject ?? 'Hello'}',
                      html: ${
                        operation.data?.html.startsWith('$')
                          ? operation.data.html.slice(1)
                          : operation.data
                          ? `${operation.data.html}`
                          : '<p>It works!</p>'
                      }
                    });
                  `
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

  async function renderPage(
    pageName: string,
    page: Page,
    pagePath: string,
    type: 'page' | 'layout' = 'page',
  ) {
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
              uiComponents[predefinedComponents[pascalCase(element.component)]].template;
          }
          if (element.elements) {
            renderPageComponents(element.elements);
          }
        }
      }
    }

    renderPageComponents(page.elements);

    const target = type === 'layout' ? layouts : pages;

    target[pagePath] = await generate({
      processor: PrettierProcessor(),
      engine: async () => `
        ${Array.isArray(page.elements) ? renderClient(page.elements) : ''}
        ${Array.isArray(page.elements) ? renderClsx(page.elements) : ''}
        ${Array.isArray(page.elements) ? renderImports(page.elements) : ''}
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

  const externalComponents: Record<string, string> = {};
  const pages: {
    [name: string]: Buffer | string;
  } = {};
  await Promise.all(
    Object.entries(spec.pages || {})
      .filter(([pageName]) => pageName !== 'index' && pageName !== '/')
      .map(async ([pageName, page]) => renderPage(pageName, page, `app/${pageName}/page.tsx`)),
  );
  if (spec.pages?.['/']) {
    await renderPage('index', spec.pages['/'], `app/page.tsx`);
  } else if (spec.pages?.index) {
    await renderPage('index', spec.pages.index, `app/page.tsx`);
  }

  const layouts: {
    [name: string]: Buffer | string;
  } = {};
  await Promise.all(
    Object.entries(spec.layouts || {})
      .filter(([layoutName]) => layoutName !== 'index' && layoutName !== '/')
      .map(
        async ([layoutName, layout]) =>
          renderPage(layoutName, layout, `app/${layoutName}/layout.tsx`, 'layout'),
        'layout',
      ),
  );
  if (spec.layouts?.['/']) {
    await renderPage('index', spec.layouts['/'], `app/layout.tsx`, 'layout');
  } else if (spec.layouts?.index) {
    await renderPage('index', spec.layouts.index, `app/layout.tsx`, 'layout');
  } else {
    layouts['app/layout.tsx'] = await generate({
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

  function mapAttributeTypeToMongoType(type: string) {
    if (type === 'boolean') {
      return 'Boolean';
    }
    return 'String';
  }

  const models: {
    [file: string]: Buffer | string;
  } = {};
  if (spec.database?.type === 'mongodb') {
    await Promise.all(
      Object.entries(spec.models || {}).map(async ([modelName, model]) => {
        const modelNameSingular = singular(modelName);
        const modelNameSingularPascal = pascalCase(modelNameSingular);
        models[`lib/models/${modelNameSingularPascal}Model.ts`] = await generate({
          processor: PrettierProcessor(),
          engine: async () => /* ts */ `
            import { Document, Schema, model, models } from 'mongoose';

            export interface ${modelNameSingularPascal}Document extends Document {
              ${Object.entries(model.attributes)
                .map(
                  ([attributeName, attribute]) =>
                    `${camelCase(attributeName)}: ${
                      attribute.key === 'primary' ? `string` : attribute.type
                    }`,
                )
                .join(';\n')}
              createdAt: Date;
            }
            
            export const ${modelNameSingularPascal}Model = models.${modelNameSingularPascal} || model<${modelNameSingularPascal}Document>(
              '${modelNameSingularPascal}',
              new Schema<${modelNameSingularPascal}Document>({
                ${Object.entries(model.attributes)
                  .map(
                    ([attributeName, attribute]) =>
                      `${camelCase(attributeName)}: ${
                        attribute.key === 'primary'
                          ? `Schema.ObjectId`
                          : mapAttributeTypeToMongoType(attribute.type)
                      }`,
                  )
                  .join(',\n')}
              })
            );
          
          `,
        });
      }),
    );
  }

  const tables: {
    [file: string]: Buffer | string;
  } = {};
  if (spec.database?.type !== 'mongodb') {
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
  }

  const tauri: Record<string, Buffer | string> = {};
  if (spec.platform?.desktop) {
    const icon =
      spec.icon ??
      `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
          <style type="text/css">
            .st0{fill:none;stroke:#FFFFFF;stroke-width:19.6839;stroke-miterlimit:10;}
          </style>
          <polygon class="st0" points="42.8,377.3 43.8,135 255.5,11.5 469.2,135.1 467.6,378.2 255.8,500.5"/>
          <line class="st0" x1="43.8" y1="135" x2="467.6" y2="378.2"/>
          <line class="st0" x1="469.2" y1="135.1" x2="42.8" y2="377.3"/>
          <line class="st0" x1="255.5" y1="11.5" x2="255.5" y2="500.5"/>
          <line class="st0" x1="185.2" y1="52.1" x2="467.6" y2="215.2"/>
          <line class="st0" x1="326.4" y1="52.1" x2="44" y2="215.2"/>
          <line class="st0" x1="185.2" y1="55.8" x2="185.2" y2="459.7"/>
          <line class="st0" x1="326.4" y1="52.1" x2="326.4" y2="459.7"/>
          <line class="st0" x1="115.3" y1="93.3" x2="467.6" y2="296.7"/>
          <line class="st0" x1="397" y1="93.3" x2="44" y2="296.7"/>
          <line class="st0" x1="114.6" y1="93.3" x2="114.6" y2="419"/>
          <line class="st0" x1="397" y1="93.7" x2="397" y2="419"/>
          <line class="st0" x1="44" y1="215.2" x2="397" y2="419"/>
          <line class="st0" x1="467.6" y1="215.2" x2="114.6" y2="419"/>
          <line class="st0" x1="44" y1="296.7" x2="326.4" y2="459.7"/>
          <line class="st0" x1="467.6" y1="296.7" x2="185.2" y2="459.7"/>
        </svg>
      `;

    const iconSizes = {
      '32x32.png': 32,
      '128x128.png': 128,
      '128x128@2x.png': 256,
      'icon.icns': 1024,
      'icon.ico': 32,
      'icon.png': 1024,
      'Square30x30Logo.png': 30,
      'Square44x44Logo.png': 44,
      'Square71x71Logo.png': 71,
      'Square89x89Logo.png': 89,
      'Square107x107Logo.png': 107,
      'Square142x142Logo.png': 142,
      'Square150x150Logo.png': 150,
      'Square284x284Logo.png': 284,
      'Square310x310Logo.png': 310,
      'StoreLogo.png': 48,
    };

    // await Promise.all(
    //   Object.entries(iconSizes).map(async ([file, size]) => {
    //     tauri[`src-tauri/icons/${file}`] = await IconGenerator({
    //       icon,
    //       size,
    //     });
    //   }),
    // );

    tauri['src-tauri/src/main.rs'] = await generate({
      engine: () => `// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}`,
    });
    tauri['src-tauri/Cargo.toml'] = await generate({
      engine: TomlEngine,
      spec: {
        package: {
          name: spec.name,
          version: spec.version,
          description: spec.description,
          authors: spec.author
            ? `${spec.author.name} <${spec.author.name}> (${spec.author.url})`
            : [],
          license: spec.license,
          repository: spec.repository,
          edition: '2021',
          'rust-version': '1.57',
        },
        'build-dependencies': {
          'tauri-build': {
            version: '1.2',
            features: [],
          },
        },
        dependencies: {
          serde_json: '1.0',
          serde: {
            version: '1.0',
            features: ['derive'],
          },
          tauri: {
            version: '1.2',
            features: ['macos-private-api', 'shell-open', 'system-tray'],
          },
          'tauri-plugin-positioner': {
            version: '1.0.4',
            features: ['system-tray'],
          },
        },
        features: {
          default: ['custom-protocol'],
          'custom-protocol': ['tauri/custom-protocol'],
        },
      },
    });
    tauri['src-tauri/tauri.conf.json'] = await generate({
      engine: JsonEngine,
      spec: {
        build: {
          beforeDevCommand: 'pnpm dev',
          beforeBuildCommand: 'pnpm build',
          devPath: spec.platform?.desktop?.url ?? 'http://localhost:3000',
          distDir: '../dist',
          withGlobalTauri: true,
        },
        package: {
          productName: spec.name ?? 'tauri-app',
          version: '0.1.0',
        },
        tauri: {
          allowlist: {
            all: false,
            shell: {
              all: false,
              open: true,
            },
          },
          windows: [
            {
              title: spec.title ?? 'tauri-app',
              height: spec.platform?.desktop?.window?.height ?? 600,
              width: spec.platform?.desktop?.window?.width ?? 800,
            },
          ],
          security: {
            csp: null,
          },
          bundle: {
            active: true,
            targets: 'all',
            identifier: `${spec.platform?.domain ?? 'org.example'}.${spec.name}`,
            icon: [
              'icons/32x32.png',
              'icons/128x128.png',
              'icons/128x128@2x.png',
              'icons/icon.icns',
              'icons/icon.ico',
            ],
          },
        },
      },
    });
    tauri['src-tauri/build.rs'] = await generate({
      engine: () => `fn main() {
    tauri_build::build()
}`,
    });
  }

  const db: Record<string, string | Buffer> = {};
  if (spec.database?.type === 'mongodb') {
    db['lib/client.ts'] = await generate({
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
    });

    db['lib/mongo.ts'] = await generate({
      processor: PrettierProcessor(),
      engine: () => /* ts */ `
        import { MongoMemoryServer } from 'mongodb-memory-server';
        import mongoose from 'mongoose';
        
        let mongoServer: MongoMemoryServer;
        
        export const connectToMemoryDB = async () => {
          if (mongoServer) {
            return;
          }

          mongoServer = await MongoMemoryServer.create();
          const uri = mongoServer.getUri();
        
          await mongoose.connect(uri);
        };
        
        export const disconnectFromMemoryDB = async () => {
          await mongoose.disconnect();
          await mongoServer.stop();
        };
      `,
    });
  } else {
    db['lib/db.ts'] = await generate({
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
    });
  }

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
          tauri: spec.platform?.desktop ? 'tauri' : undefined,
        },
        dependencies: {
          ...pkg.dependencies,
          '@clerk/nextjs': spec.auth?.integration === 'clerk' ? '^5.3.3' : undefined,
          '@radix-ui/react-alert-dialog': '^1.1.1',
          '@radix-ui/react-accordion': '^1.2.0',
          '@radix-ui/react-aspect-ratio': '^1.1.0',
          '@radix-ui/react-checkbox': '^1.1.1',
          '@radix-ui/react-icons': '^1.3.0',
          '@radix-ui/react-slot': '^1.1.0',
          ...(spec.platform?.desktop
            ? {
                '@tauri-apps/api': '^1.2.0',
              }
            : {}),
          ...(spec.vercel?.analytics
            ? {
                '@vercel/analytics': '^1.3.1',
              }
            : {}),
          ...(spec.database?.type === 'mongodb'
            ? {
                'mongodb-memory-server': '^10.0.0',
                mongoose: '^8.5.3',
              }
            : {
                '@vercel/postgres-kysely': '^0.5.0',
                kysely: '^0.26.3',
              }),
          axios: '^1.6.0',
          'class-variance-authority': '^0.7.0',
          clsx: '^2.1.1',
          'embla-carousel-react': '^8.1.8',
          'framer-motion': '^11.3.24',
          next: '15.0.1',
          react: '19.0.0-rc-69d4b800-20241021',
          'react-dom': '19.0.0-rc-69d4b800-20241021',
          'react-icons': '^5.2.1',
          'react-markdown': '^9.0.0',
          resend: Object.values(spec.actions || {}).some((action) =>
            action.operations.some((operation) => operation.type === 'sendEmail'),
          )
            ? '^4.0.0'
            : undefined,
          'tailwind-merge': '^2.5.0',
          'next-auth': spec.auth?.integration === 'next-auth' ? '^4.23.1' : undefined,
          zod: '^3.21.4',
        },
        devDependencies: {
          ...pkg.devDependencies,
          ...(spec.platform?.desktop
            ? {
                '@tauri-apps/cli': '^1.2.2',
              }
            : {}),
          '@types/node': '^20',
          '@types/react': '^18',
          '@types/react-dom': '^18',
          autoprefixer: '^10.4.16',
          eslint: '^8',
          'eslint-config-next': '15.0.1',
          postcss: '^8.4.31',
          tailwindcss: '^3.3.5',
          typescript: '^5',
        },
        engines: spec.package?.manager?.npm
          ? {
              npm: `>=${semver.major(spec.package.manager.npm).toString()} <${(
                semver.major(spec.package.manager.npm) + 1
              ).toString()}`,
            }
          : spec.package?.manager?.pnpm
          ? {
              pnpm: `>=${semver.major(spec.package.manager.pnpm).toString()} <${(
                semver.major(spec.package.manager.pnpm) + 1
              ).toString()}`,
            }
          : spec.package?.manager?.yarn
          ? {
              yarn: `>=${semver.major(spec.package.manager.yarn).toString()} <${(
                semver.major(spec.package.manager.yarn) + 1
              ).toString()}`,
            }
          : undefined,
        packageManager: spec.package?.manager?.pnpm
          ? `pnpm@${spec.package.manager.pnpm}`
          : spec.package?.manager?.yarn
          ? `yarn@${spec.package.manager.yarn}`
          : undefined,
      },
    }),
    'postcss.config.mjs': await generate({
      processor: PrettierProcessor(),
      engine: () => /* ts */ `
        /** @type {import('postcss-load-config').Config} */
        const config = {
          plugins: {
            tailwindcss: {},
          },
        };

        export default config;
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
    'tailwind.config.ts': await generate({
      processor: PrettierProcessor(),
      engine: () => /*ts*/ `
        import type { Config } from "tailwindcss";

        const config: Config = {
          content: [
            "./pages/**/*.{js,ts,jsx,tsx,mdx}",
            "./components/**/*.{js,ts,jsx,tsx,mdx}",
            "./app/**/*.{js,ts,jsx,tsx,mdx}",
          ],
          theme: {
            extend: {
              colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
              },
            },
          },
          plugins: [],
        };

        export default config;
      `,
    }),
    'tsconfig.json': await generate({
      engine: JsonEngine,
      spec: {
        compilerOptions: {
          target: 'ES2017',
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
