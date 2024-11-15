import { pascalCase } from '@specui/utils';
import { ElementArrayOrRef } from '../interfaces/BaseElement';

export function renderImports(elements?: ElementArrayOrRef) {
  if (!elements || !Array.isArray(elements)) {
    return [];
  }

  let results: string[] = [];

  elements.forEach((element) => {
    if (element.component) {
      results.push(pascalCase(element.component));
    }

    if (element.elements) {
      results = results.concat(renderImports(element.elements));
    }

    if (element.slots) {
      Object.values(element.slots).forEach((value) => {
        results = results.concat(renderImports(value));
      });
    }
  });

  return [...new Set(results)];
}
