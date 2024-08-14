export interface Action {
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
}
