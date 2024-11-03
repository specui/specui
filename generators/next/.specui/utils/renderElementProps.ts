import type { Element } from '../interfaces/BaseElement';
import type { InputElement } from '../interfaces/NativeElement';
import type { ElementEventPropType } from '../types/ElementEventPropType';
import type { ElementPropType } from '../types/ElementPropType';

import { renderElementEventProp } from './renderElementEventProp';
import { renderElementProp } from './renderElementProp';

export function renderElementProps(element: Element) {
  const props: Record<string, string> = {};

  if (element.action) {
    props.action = `{${element.action}}`;
  }

  if (element.class) {
    const classes = Array.isArray(element.class)
      ? element.class
          .map((className) => {
            if (typeof className === 'object') {
              if ('dark' in className) {
                if (Array.isArray(className.dark)) {
                  return className.dark.map((dark) => `dark:${dark}`);
                }
                return `dark:${className.dark}`;
              }

              if ('hover' in className) {
                if (Array.isArray(className.hover)) {
                  return className.hover.map((hover) => `hover:${hover}`);
                }
                return `hover:${className.hover}`;
              }
            }

            return className;
          })
          .flat()
      : element.class;

    props.className =
      Array.isArray(classes) && classes.some((className) => typeof className !== 'string')
        ? `{clsx(${classes
            .map((className) => (className.startsWith('$') ? className.slice(1) : `'${className}'`))
            .join(',')})}`
        : Array.isArray(classes)
        ? `"${classes.join(' ')}"`
        : `"${classes}"`;
  }

  [
    'alt',
    'collapsible',
    'defaultChecked',
    'for',
    'href',
    'name',
    'placeholder',
    'required',
    'type',
    'src',
    'value',
    'variant',
  ].forEach((name) => {
    const value = renderElementProp(name as ElementPropType, element as InputElement);
    if (value !== undefined) {
      props[name === 'for' ? 'htmlFor' : name] = value;
    }
  });

  ['onClick'].forEach((name) => {
    const value = renderElementEventProp(name as ElementEventPropType, element);
    if (value !== undefined) {
      props[name] = value;
    }
  });

  if (element.props) {
    Object.entries(element.props).forEach(([propName, propValue]) => {
      props[propName] = `"${propValue}"`;
    });
  }

  if (element.animate) {
    props.animate = `{${JSON.stringify(element.animate)}}`;
  }

  if (element.initial) {
    props.initial = `{${JSON.stringify(element.initial)}}`;
  }

  if (element.transition) {
    props.transition = `{${JSON.stringify(element.transition)}}`;
  }

  if (element.whileHover) {
    props.whileHover = `{${JSON.stringify(element.whileHover)}}`;
  }

  if (element.whileTap) {
    props.whileTap = `{${JSON.stringify(element.whileTap)}}`;
  }

  if (element.style) {
    props.style = `{${JSON.stringify(element.style)}}`;
  }

  return Object.entries(props)
    .sort(([aName], [bName]) => aName.localeCompare(bName))
    .map(([name, value]) => `${name}=${value}`)
    .join(' ');
}
