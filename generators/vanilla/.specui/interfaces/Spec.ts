import type { Properties } from 'csstype';

export interface Element {
  alt?: string;
  component?: string;
  elements?: Element[];
  href?: string;
  onClick?: Record<string, string>;
  src?: string;
  style?: Properties;
  tag?: string;
  target?: string;
  text?: string;
}

export interface Spec {
  app?: {
    title?: string;
    name?: string;
    version?: string;
    license?: 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT';
    description?: string;
    author?: {
      name?: string;
      email?: string;
      url?: string;
    };
  };
  components?: {
    [name: string]: Element;
  };
  pages?: {
    [name: string]: {
      elements: Array<Element>;
    };
  };
  styles?: Record<string, Properties>;
}
