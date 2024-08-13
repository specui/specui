import type { Properties } from 'csstype';
import type { TailwindClass } from '../types/TailwindClass';
import type { ElementArrayOrRef } from './ISpec';

export interface BaseElement {
  action?: string;
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
  htmlType?: string;
  initial?: Properties & TransformProperties;
  name?: string;
  onClick?: {
    action: string;
    data?: any;
  };
  style?: Properties;
  tag?: string;
  text?: string;
  transition?: Transition;
  whileHover?: Properties & TransformProperties;
  whileTap?: Properties & TransformProperties;
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
