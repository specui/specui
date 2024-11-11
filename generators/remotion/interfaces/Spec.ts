import type { ElementArrayOrRef } from '@specui/react';

export type PrimitiveType = 'boolean' | 'number' | 'string';

export interface AbsoluteFill {
  style?: {
    alignItems?: string;
    backgroundColor?: string;
    fontSize?: number;
    justifyContent?: string;
  };
}

export interface Component {
  props?: Record<string, ComponentProp>;
  elements?: ElementArrayOrRef;
}

export interface ComponentProp {
  required?: boolean;
  type?: PrimitiveType;
}

export interface Composition {
  id?: string;
  absoluteFill?: AbsoluteFill;
  durationInFrames?: number;
  fps?: number;
  width?: number;
  height?: number;
  sequences?: Sequence[];
}

export interface Sequence {
  durationInFrames?: number;
  from?: number;
  text?: string;
  component?: string;
  props?: Record<string, boolean | number | string>;
}

export interface Spec {
  title?: string;
  name?: string;
  version?: string;
  description?: string;
  private?: boolean;
  components?: Record<string, Component>;
  compositions?: Record<string, Composition>;
}
