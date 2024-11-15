export type Alignment =
  | 'center'
  | 'end'
  | 'flex-end'
  | 'flex-start'
  | 'left'
  | 'normal'
  | 'right'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
  | 'start'
  | 'stretch';

export type BlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

export type Display =
  | 'block'
  | 'contents'
  | 'flex'
  | 'flow-root'
  | 'grid'
  | 'inline-block'
  | 'inline-flex'
  | 'inline-grid'
  | 'inline'
  | 'list-item'
  | 'none'
  | 'table'
  | 'table-row';

export type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

export interface Style {
  alignItems?: Alignment;
  background?: string;
  backgroundAttachment?: 'fixed' | 'local' | 'scroll';
  backgroundBlendMod?: BlendMode;
  backgroundClip?: 'border-box' | 'padding-box' | 'content-box' | 'text';
  backgroundColor?: string;
  backgroundImage?: string;
  borderRadius?: string;
  bottom?: number | string;
  color?: string;
  display?: Display;
  fontFamily?: string;
  fontSize?: string;
  height?: number | string;
  justifyContent?: Alignment;
  left?: number | string;
  opacity?: number;
  objectFit?: ObjectFit;
  position?: Position;
  right?: number | string;
  top?: number | string;
  translateX?: number;
  translateY?: number;
  width?: number | string;
}

export interface StyleTransform extends Style {
  rotate?: number;
  scale?: number;
}
