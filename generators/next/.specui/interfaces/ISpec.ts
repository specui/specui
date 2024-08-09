import type { Properties } from 'csstype';
import { TailwindClass } from '../types/TailwindClass';

type Provider = 'facebook' | 'github' | 'google';

export interface Page {
  dataSources?: Record<
    string,
    {
      type: 'model';
      model?: string;
    }
  >;
  elements?: ElementArrayOrRef;
}

export interface Element {
  action?: string;
  component?: string;
  class?: string | string[] | TailwindClass | TailwindClass[];
  data?: any[];
  defaultChecked?: string;
  for?: string;
  icon?: string;
  key?: string;
  model?: string;
  props?: Record<
    string,
    | boolean
    | number
    | string
    | {
        type: string;
      }
  >;
  href?: string;
  htmlType?: string;
  name?: string;
  onClick?: {
    action: string;
    data?: any;
  };
  placeholder?: string;
  style?: Properties;
  tag?: string;
  text?: string;
  type?: string;
  elements?: ElementArrayOrRef;
}

export type ElementArrayOrRef =
  | Array<Element>
  | {
      $ref: Element;
    };

export interface ISpec {
  title?: string;
  name?: string;
  version?: string;
  license: 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT';
  description?: string;
  actions?: {
    [name: string]: {
      props: {
        [name: string]: {
          required?: boolean;
          type: 'boolean' | 'number' | 'string';
        };
      };
      operations: {
        type: 'delete' | 'insert' | 'update' | 'revalidate' | 'redirect';
        model?: string;
        data?: {
          [name: string]: any;
        };
        path?: string;
        where?: {
          [name: string]: any;
        };
      }[];
    };
  };
  author?: {
    name?: string;
    email?: string;
    url?: string;
  };
  auth?: {
    providers: Provider[];
  };
  calls?: {
    [name: string]: {
      request: {
        [name: string]: {
          required?: boolean;
          type: 'boolean' | 'number' | 'string';
        };
      };
      response: {
        [name: string]: {
          required?: boolean;
          type: 'boolean' | 'number' | 'string';
        };
      };
    };
  };
  components?: {
    [name: string]: {
      props?: Record<
        string,
        {
          required?: boolean;
          type: string;
        }
      >;
      elements?: ElementArrayOrRef;
    };
  };
  models?: {
    [name: string]: {
      attributes: {
        [name: string]: {
          key?: 'primary';
          type: 'boolean' | 'number' | 'string';
          unique?: boolean;
        };
      };
    };
  };
  pages?: {
    [name: string]: Page;
  };
}
