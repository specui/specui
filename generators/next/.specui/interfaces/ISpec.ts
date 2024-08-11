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

interface TransformProperties {
  x?: string | number;
  y?: string | number;
  z?: string | number;
  translateX?: string | number;
  translateY?: string | number;
  translateZ?: string | number;
  rotate?: string | number;
  rotateX?: string | number;
  rotateY?: string | number;
  rotateZ?: string | number;
  scale?: string | number;
  scaleX?: string | number;
  scaleY?: string | number;
  scaleZ?: string | number;
  skew?: string | number;
  skewX?: string | number;
  skewY?: string | number;
  originX?: string | number;
  originY?: string | number;
  originZ?: string | number;
  perspective?: string | number;
  transformPerspective?: string | number;
}

export interface Element {
  action?: string;
  alt?: string;
  animate?: Properties & TransformProperties;
  component?: string;
  class?: string | string[] | TailwindClass | TailwindClass[];
  data?: any[];
  defaultChecked?: string;
  for?: string;
  icon?: string;
  id?: string;
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
  initial?: Properties & TransformProperties;
  name?: string;
  onClick?: {
    action: string;
    data?: any;
  };
  placeholder?: string;
  src?: string;
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
