import type { Properties } from 'csstype';

export interface ISpec {
  app: {
    title: string;
    name: string;
    version: string;
    license: 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT';
    description: string;
    author?: {
      name?: string;
      email?: string;
      url?: string;
    };
  };
  components: {
    [name: string]: {
      type?: string;
      text?: string;
      style?: Properties;
    };
  };
  pages: {
    [name: string]: {
      elements: Array<{
        type?: string;
        component?: string;
        text?: string;
        style?: Properties;
      }>;
    };
  };
  styles: Record<string, Properties>;
}
