interface Author {
  name?: string;
  email?: string;
  url?: string;
}

type License = 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT';
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

export type Element =
  | AElement
  | DivElement
  | IframeElement
  | ImgElement
  | InputElement
  | LiElement
  | SectionElement
  | SpanElement
  | UlElement;

export interface BaseElement {
  tag: string;
  class?: string | string[];
  elements?: Element[];
}

interface AElement extends BaseElement {
  tag: 'a';
  href?: string;
}

interface DivElement extends BaseElement {
  tag: 'div';
}

interface IframeElement extends BaseElement {
  tag: 'iframe';
  src?: string;
}

interface ImgElement extends BaseElement {
  tag: 'img';
  src?: string;
}

interface InputElement extends BaseElement {
  tag: 'input';
  placeholder?: string;
  type?: string;
}

interface LiElement extends BaseElement {
  tag: 'li';
}

interface SectionElement extends BaseElement {
  tag: 'section';
  src?: string;
}

interface SpanElement extends BaseElement {
  tag: 'span';
}

interface UlElement extends BaseElement {
  tag: 'ul';
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
