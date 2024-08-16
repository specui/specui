export interface Model {
  attributes: Record<string, ModelAttribute>;
}

export interface ModelAttribute {
  key?: 'primary';
  type: 'boolean' | 'number' | 'string';
  unique?: boolean;
}
