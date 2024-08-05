type Provider = 'facebook' | 'github' | 'google';

export interface ISpec {
  name: string;
  version: string;
  license: 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT';
  description: string;
  actions?: {
    [name: string]: {
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
    };
  };
  author?: {
    name?: string;
    email?: string;
    url?: string;
  };
  auth?: {
    providers: Provider[];
  };
  calls?: {
    [name: string]: {
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
    };
  };
  components?: {
    [name: string]: {
      props: Record<
        string,
        {
          required?: boolean;
          type: string;
        }
      >;
      elements: Array<{
        type?: string;
        text?: string;
        class?: string[];
        style?: {
          color?: string;
        };
      }>;
    };
  };
  models?: {
    [name: string]: {
      attributes: {
        [name: string]: {
          key?: 'primary';
          type: 'boolean' | 'number' | 'string';
          unique?: boolean;
        };
      };
    };
  };
  pages?: {
    [name: string]: {
      dataSources: Record<
        string,
        {
          type: 'model';
          model?: string;
        }
      >;
      elements:
        | Array<{
            type?: string;
            text?: string;
            class?: string[];
            style?: {
              color?: string;
            };
          }>
        | {
            $ref: {
              type?: string;
              text?: string;
              class?: string[];
              style?: {
                color?: string;
              };
            };
          };
    };
  };
}
