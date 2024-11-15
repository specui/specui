import { pascalCase } from '@specui/utils';

import { ElementArrayOrRef } from '../interfaces/BaseElement';
import { renderPropValue } from './renderPropValue';

export function renderElements(
  elements?: ElementArrayOrRef,
  map?: Record<'src', (value: string) => string>,
) {
  if (!elements || !Array.isArray(elements)) {
    if (typeof elements === 'string') {
      return elements;
    }
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
      ? ` class="${Array.isArray(element.class) ? element.class.join(' ') : element.class}"`
      : '';
    const srcValue = renderPropValue(element.src);
    const src = srcValue
      ? ` src=${map?.src ? map.src(renderPropValue(element.src)) : renderPropValue(element.src)}`
      : '';
    const props = Object.entries(element)
      .filter(
        ([propName]) =>
          !['class', 'component', 'elements', 'slots', 'src', 'style', 'tag', 'text'].includes(
            propName,
          ),
      )
      .map(([propName, propValue]) => {
        return ` ${propName}=${renderPropValue(propValue)}`;
      })
      .join(' ');

    let children = '';
    if (element.elements) {
      children += renderElements(element.elements);
    }
    if (element.slots) {
      children += Object.entries(element.slots)
        .map(
          ([name, value]) =>
            `<svelte:fragment slot="${name}">${renderElements(value)}</svelte:fragment>`,
        )
        .join('\n');
    }

    if (children) {
      results.push(`<${tag}${className}${src}${props}>${children}</${tag}>`);
    } else if (text) {
      results.push(`<${tag}${className}${src}${props}>${text}</${tag}>`);
    } else if (tag === 'input') {
      results.push(`<${tag}${className}${src}${props} />`);
    } else {
      results.push(`<${tag}${className}${src}${props}></${tag}>`);
    }
  });

  return results.join('\n');
}
