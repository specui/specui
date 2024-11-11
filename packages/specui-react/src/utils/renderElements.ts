import { pascalCase } from '@specui/utils';

import { ElementArrayOrRef } from '../interfaces/BaseElement';
import { renderElementStyle } from './renderElementStyle';
import { renderPropValue } from './renderPropValue';

export function renderElements(
  elements?: ElementArrayOrRef,
  map?: Record<'src', (value: string) => string>,
) {
  if (!elements || !Array.isArray(elements)) {
    return '';
  }

  const results: string[] = [];

  elements.forEach((element) => {
    const tag = element.component
      ? pascalCase(element.component)
      : element.tag
      ? element.tag
      : 'div';
    const text =
      typeof element.text === 'string' && element.text.startsWith('$')
        ? `{${element.text.slice(1)}}`
        : element.text;
    const className = element.class
      ? ` className="${Array.isArray(element.class) ? element.class.join(' ') : element.class}"`
      : '';
    const srcValue = renderPropValue(element.src);
    const src = srcValue
      ? ` src=${map?.src ? map.src(renderPropValue(element.src)) : renderPropValue(element.src)}`
      : '';
    const style = renderElementStyle(element.style);

    if (text) {
      results.push(`<${tag}${className}${src}${style}>${text}</${tag}>`);
    } else {
      results.push(`<${tag}${className}${src}${style} />`);
    }
  });

  return results.join('\n');
}
