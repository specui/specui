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

type BezierDefinition = [number, number, number, number];
type Easing =
  | BezierDefinition
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'circIn'
  | 'circOut'
  | 'circInOut'
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  | 'anticipate';

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

interface Orchestration {
  delay?: number;
  when?: false | 'beforeChildren' | 'afterChildren' | string;
  delayChildren?: number;
  staggerChildren?: number;
  staggerDirection?: number;
}

interface Repeat {
  repeat?: number;
  repeatType?: 'loop' | 'reverse' | 'mirror';
  repeatDelay?: number;
}

interface Tween extends Repeat {
  type?: 'tween';
  duration?: number;
  ease?: Easing | Easing[];
  times?: number[];
  easings?: Easing[];
  from?: number | string;
}

interface Spring extends Repeat {
  type: 'spring';
  stiffness?: number;
  damping?: number;
  mass?: number;
  duration?: number;
  bounce?: number;
  restSpeed?: number;
  restDelta?: number;
  from?: number | string;
  velocity?: number;
}

interface Keyframes {
  type: 'keyframes';
  times?: number[];
  ease?: Easing | Easing[];
  duration?: number;
  repeatDelay?: number;
}

interface Inertia {
  type: 'inertia';
  modifyTarget?(v: number): number;
  bounceStiffness?: number;
  bounceDamping?: number;
  power?: number;
  timeConstant?: number;
  restDelta?: number;
  min?: number;
  max?: number;
  from?: number | string;
  velocity?: number;
}

interface Just {
  type: 'just';
}

interface None {
  type: false;
}

type TransitionDefinition = Tween | Spring | Keyframes | Inertia | Just | None;

type Transition = Orchestration & Repeat & TransitionDefinition;

type Component = 'accordion' | 'accordion-item' | 'accordion-trigger';

export interface Element {
  action?: string;
  alt?: string;
  animate?: Properties & TransformProperties;
  component?: string | Component;
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
  transition?: Transition;
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
