import type { ElementArrayOrRef } from '../interfaces/BaseElement';

export function renderClient(elements?: ElementArrayOrRef): string {
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
