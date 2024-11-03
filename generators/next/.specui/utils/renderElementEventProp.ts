import type { Element } from '../interfaces/BaseElement';
import { ElementEventPropType } from '../types/ElementEventPropType';

export function renderElementEventProp(name: ElementEventPropType, element: Element) {
  const prop = element[name];

  if (!prop) {
    return;
  }

  const action = prop.action.startsWith('$') ? prop.action.slice(1) : prop.action;

  return `{() => ${action}?.()}`;
}
