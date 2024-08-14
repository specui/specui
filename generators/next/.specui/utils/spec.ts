import { Element } from 'interfaces';

interface Author {
  name?: string;
  email?: string;
  url?: string;
}

type License = 'MIT' | 'Apache-2.0';
type PrimitiveType = 'boolean' | 'number' | 'string';

interface Component {
  props?: Record<string, ComponentProp>;
  elements?: Element[];
}

interface ComponentProp {
  required?: boolean;
  type?: PrimitiveType;
}

interface Page {
  title?: string;
  elements?: Element[];
}

export interface ISpec {
  name: string;
  description?: string;
  license?: License;
  author?: Author;
  components?: Record<string, Component>;
  elements?: Element[];
  // pages?: Record<string, Page>;
}
