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
