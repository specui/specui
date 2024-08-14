import type { Action } from './Action';
import type { Author } from './Author';
import type { Call } from './Call';
import type { Component } from './Component';
import type { Model } from './Model';
import type { NativeElement } from './NativeElement';
import type { Page } from './Page';
import type { ShadcnComponent } from './ShadcnComponent';
import type { Style } from './Style';

export interface Transition {
  delay?: number;
  duration?: number;
}

export type License = 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT';
export type PrimitiveType = 'boolean' | 'number' | 'string';

export type ElementArrayOrRef =
  | Element[]
  | {
      $ref: Element;
    };

export type Element = NativeElement | ShadcnComponent;

export interface BaseElement {
  action?: string;
  animate?: Style;
  class?: string | string[];
  component?: string;
  data?: any[];
  defaultChecked?: string;
  elements?: ElementArrayOrRef;
  for?: string;
  icon?: string;
  id?: string;
  key?: string;
  model?: string;
  name?: string;
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
  style?: Style;
  tag?: string;
  text?: string;
  whileHover?: Style;
  whileTap?: Style;
}

type Provider = 'facebook' | 'github' | 'google';

export interface ISpec {
  title?: string;
  name?: string;
  version?: string;
  description?: string;
  license?: License;
  author?: Author;
  components?: Record<string, Component>;
  pages?: Record<string, Page>;
  actions?: Record<string, Action>;
  auth?: {
    providers: Provider[];
  };
  calls?: Record<string, Call>;
  models?: {
    [name: string]: Model;
  };
}
