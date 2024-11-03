import { pascalCase } from 'change-case';
import type { ElementArrayOrRef } from '../interfaces/BaseElement';

export function renderImports(
  elements: ElementArrayOrRef,
  predefinedComponents: Record<string, string>,
): string {
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

      if (element.header) {
        if (!imports['@/components/Sidebar']) {
          imports['@/components/Sidebar'] = [];
        }
        (imports['@/components/Sidebar'] as string[]).push('SidebarHeader');
      }

      if (element.groups) {
        if (!imports['@/components/Sidebar']) {
          imports['@/components/Sidebar'] = [];
        }
        (imports['@/components/Sidebar'] as string[]).push('SidebarGroup');
        element.groups.forEach((group) => {
          if (group.label) {
            (imports['@/components/Sidebar'] as string[]).push('SidebarGroupLabel');
          }
          if (group.menu) {
            (imports['@/components/Sidebar'] as string[]).push('SidebarMenu');
            if (group.menu.items) {
              (imports['@/components/Sidebar'] as string[]).push('SidebarMenuItem');
              (imports['@/components/Sidebar'] as string[]).push('SidebarMenuButton');

              group.menu.items.forEach((item) => {
                if (item.icon) {
                  if (!imports['lucide-react']) {
                    imports['lucide-react'] = [];
                  }
                  if (
                    Array.isArray(imports['lucide-react']) &&
                    !imports['lucide-react'].includes(item.icon)
                  ) {
                    (imports['lucide-react'] as string[]).push(
                      pascalCase(item.icon, undefined, true),
                    );
                  }
                }
                if (item.url) {
                  if (!imports['next/link']) {
                    imports['next/link'] = 'Link';
                  }
                }
              });
            }
          }
        });
      }

      if (element.icon) {
        if (!imports['lucide-react']) {
          imports['lucide-react'] = [];
        }
        if (
          Array.isArray(imports['lucide-react']) &&
          !imports['lucide-react'].includes(element.icon)
        ) {
          (imports['lucide-react'] as string[]).push(pascalCase(element.icon, undefined, true));
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
