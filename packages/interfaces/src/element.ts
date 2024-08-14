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

interface BaseElement {
  tag: string;
  class?: string;
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
