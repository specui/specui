import { ElementArrayOrRef } from '../interfaces/BaseElement';
import { renderElementStyle } from './renderElementStyle';

export function renderElements(elements?: ElementArrayOrRef) {
  if (!elements || !Array.isArray(elements)) {
    return '';
  }

  const results: string[] = [];

  elements.forEach((element) => {
    const tag = element.tag ?? 'div';
    const text = element.text?.startsWith('$') ? `{${element.text.slice(1)}}` : element.text;
    const className = element.class
      ? ` className="${Array.isArray(element.class) ? element.class.join(' ') : element.class}"`
      : '';
    const style = renderElementStyle(element.style);
    results.push(`<${tag}${className}${style}>${text}</${tag}>`);
  });

  return results.join('\n');
}
