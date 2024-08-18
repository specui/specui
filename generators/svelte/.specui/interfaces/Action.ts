export interface Action {
  props: Record<string, ActionProp>;
  operations: {
    type: 'delete' | 'insert' | 'update' | 'revalidate' | 'redirect';
    model?: string;
    data?: Record<string, any>;
    path?: string;
    where?: Record<string, any>;
  }[];
}

export interface ActionProp {
  required?: boolean;
  type: 'boolean' | 'number' | 'string';
}
