import { TailwindClass } from '../types/TailwindClass';
import type { NativeElement } from './NativeElement';
import type { ShadcnComponent } from './ShadcnComponent';
import type { Style, StyleTransform } from './Style';

export interface Transition {
  delay?: number;
  duration?: number;
}

export type ElementArrayOrRef = Element[] | ElementIterator | string;

export type Element = BaseElement | NativeElement | ShadcnComponent;

export type ElementIterator = {
  data?: any[];
  model?: string;
  component?: string;
  name?: string;
  key?: string;
  tag?: string;
  class?: string;
  elements?: ElementArrayOrRef;
};

export interface BaseElement {
  action?: string;
  animate?: Style;
  alt?: string;
  auth?: 'signedIn' | 'signedOut';
  class?: string | string[] | TailwindClass | TailwindClass[];
  collapsible?: boolean;
  component?: string;
  data?: any[];
  defaultChecked?: string;
  elements?: ElementArrayOrRef;
  for?: string;
  href?: string;
  icon?: string;
  id?: string;
  key?: string;
  model?: string;
  name?: string;
  placeholder?: string;
  props?: Record<
    string,
    | boolean
    | number
    | string
    | {
        type: string;
      }
  >;
  initial?: Style;
  onClick?: {
    action: string;
    data?: any;
  };
  required?: boolean;
  transition?: Transition;
  src?: string;
  style?: Style;
  tag?: string;
  target?: string;
  text?: string;
  type?: string;
  value?: string;
  whileHover?: StyleTransform;
  whileTap?: StyleTransform;
}
