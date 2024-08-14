export interface Call {
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
}
