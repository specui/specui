import { TailwindClass } from '../types/TailwindClass';
import type { NativeElement } from './NativeElement';
import type { ShadcnComponent } from './ShadcnComponent';
import type { Style, StyleTransform } from './Style';

export interface Transition {
  delay?: number;
  duration?: number;
}

export type ElementArrayOrRef =
  | Element[]
  | {
      $ref: Element;
    };

export type Element = BaseElement | NativeElement | ShadcnComponent;

export interface BaseElement {
  action?: string;
  animate?: Style;
  alt?: string;
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
  transition?: Transition;
  src?: string;
  style?: Style;
  tag?: string;
  text?: string;
  type?: string;
  value?: string;
  whileHover?: StyleTransform;
  whileTap?: StyleTransform;
}
