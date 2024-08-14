export interface Model {
  attributes: {
    [name: string]: {
      key?: 'primary';
      type: 'boolean' | 'number' | 'string';
      unique?: boolean;
    };
  };
}
