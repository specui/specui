import { ElementArrayOrRef } from './BaseElement';
import type { PrimitiveType } from './Spec';

export interface Component {
  props?: Record<string, ComponentProp>;
  elements?: ElementArrayOrRef;
}

export interface ComponentProp {
  required?: boolean;
  type?: PrimitiveType;
}
