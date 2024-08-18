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

export interface Style {
  background?: string;
  backgroundAttachment?: 'fixed' | 'local' | 'scroll';
  backgroundBlendMod?: BlendMode;
  backgroundClip?: 'border-box' | 'padding-box' | 'content-box' | 'text';
  backgroundColor?: string;
  backgroundImage?: string;
  color?: string;
  fontFamily?: string;
  opacity?: number;
  translateX?: number;
  translateY?: number;
}
