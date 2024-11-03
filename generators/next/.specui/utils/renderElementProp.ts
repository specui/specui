import type { InputElement } from '../interfaces/NativeElement';
import { ElementPropType } from '../types/ElementPropType';

export function renderElementProp(name: ElementPropType, element: InputElement) {
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
