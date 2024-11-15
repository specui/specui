import { kebabCase, pascalCase } from '@specui/utils';

import { ElementArrayOrRef } from '../interfaces/BaseElement';
import { renderPropValue } from './renderPropValue';

export function renderStyles(
  elements?: ElementArrayOrRef,
  map?: Record<'src', (value: string) => string>,
) {
  if (!elements || !Array.isArray(elements)) {
    return '';
  }

  const results: string[] = [];

  elements.forEach((element) => {
    if (element.style) {
      const styles: string[] = [];

      Object.entries(element.style).forEach(([name, value]) => {
        styles.push(`${kebabCase(name)}: ${value};`);
      });

      results.push(`
        ${element.tag} {
          ${styles.join('\n')}
        }
        
        ${renderStyles(element.elements)}
      `);
    }
  });

  return results.join('\n');
}
