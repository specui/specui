import type { ElementArrayOrRef } from '../interfaces/BaseElement';

export function renderClsx(elements?: ElementArrayOrRef): string {
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
