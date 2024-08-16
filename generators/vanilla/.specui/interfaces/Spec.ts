import type { Properties } from 'csstype';

export interface Element {
  tag?: string;
  component?: string;
  text?: string;
  style?: Properties;
  elements?: Element[];
  href?: string;
  src?: string;
  alt?: string;
  onClick?: Record<string, string>;
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
