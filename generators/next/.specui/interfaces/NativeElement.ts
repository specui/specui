import type { BaseElement } from './BaseElement';

export type NativeElement =
  | AElement
  | DivElement
  | HeadingElement
  | IframeElement
  | ImgElement
  | InputElement
  | LiElement
  | SectionElement
  | SpanElement
  | UlElement;

interface AElement extends BaseElement {
  tag: 'a';
  href?: string;
}

interface DivElement extends BaseElement {
  tag: 'div';
}

interface HeadingElement extends BaseElement {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  src?: string;
}

interface IframeElement extends BaseElement {
  tag: 'iframe';
  src?: string;
}

interface ImgElement extends BaseElement {
  tag: 'img';
  src?: string;
}

export interface InputElement extends BaseElement {
  tag: 'input';
  name?: string;
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
