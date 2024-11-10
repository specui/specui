export interface Model {
  attributes?: Record<string, ModelAttribute>;
}

export interface ModelAttribute {
  primaryKey?: boolean;
  required?: boolean;
  type?: ModelAttributeType;
  unique?: boolean;
  association?: ModelAttributeAssociation;
}

export interface ModelAttributeAssociation {
  model?: string;
  type?: 'belongsTo';
}

export type ModelAttributeType = 'number' | 'string';

export interface Spec {
  name?: string;
  version?: string;
  models?: Record<string, Model>;
}
