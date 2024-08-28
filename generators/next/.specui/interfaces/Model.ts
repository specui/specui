import type { PrimitiveType } from './Spec';

export interface Model {
  attributes: Record<string, ModelAttribute>;
}

export interface ModelAttribute {
  default?: boolean | number | string;
  key?: 'primary';
  required?: boolean;
  type: PrimitiveType;
  unique?: boolean;
}
