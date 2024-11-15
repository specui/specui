import type { BaseElement, ElementArrayOrRef } from './BaseElement';

export interface SkeletonComponent extends BaseElement {
  component:
    | AccordionComponent['component']
    | AccordionItemComponent['component']
    | AppBarComponent['component']
    | AppRailComponent['component']
    | AppRailTileComponent['component']
    | AppRailAnchorComponent['component']
    | AutocompleteComponent['component']
    | AvatarComponent['component']
    | ConicGradientComponent['component']
    | FileButtonComponent['component']
    | FileDropzoneComponent['component']
    | InputChipComponent['component']
    | ListBoxComponent['component']
    | ListBoxItemComponent['component']
    | PaginatorComponent['component']
    | ProgressBarComponent['component']
    | ProgressRadialComponent['component']
    | RatingsComponent['component']
    | RadioGroupComponent['component']
    | RadioItemComponent['component']
    | RangeSliderComponent['component']
    | SlideToggleComponent['component']
    | TabGroupComponent['component']
    | TabComponent['component']
    | TabAnchorComponent['component']
    | TreeViewComponent['component']
    | TreeViewItemComponent['component']
    | RecursiveTreeViewComponent['component'];
}

interface AccordionComponent extends BaseElement {
  component: 'accordion';
  autocollapse?: boolean;
  width?: string;
  spacing?: string;
  disabled?: boolean;
  padding?: string;
  hover?: string;
  rounded?: string;
  caretOpen?: string;
  caretClosed?: string;
  regionControl?: string;
  regionPanel?: string;
  regionCaret?: string;
  transitions?: boolean;
  slots?: {
    default?: ElementArrayOrRef;
  };
}

interface AccordionItemComponent {
  component: 'accordion-item';
  open?: boolean;
  id?: string;
  slots?: {
    content?: ElementArrayOrRef;
    iconClosed?: ElementArrayOrRef;
    iconOpen?: ElementArrayOrRef;
    lead?: ElementArrayOrRef;
    summary?: ElementArrayOrRef;
  };
}

interface AppBarComponent {
  component: 'app-bar';
  background?: string;
  border?: string;
  padding?: string;
  shadow?: string;
  spacing?: string;
  gridColumns?: string;
  gap?: string;
  regionRowMain?: string;
  regionRowHeadline?: string;
  slotLead?: string;
  slotDefault?: string;
  slotTrail?: string;
  label?: string;
  labelledby?: string;
  slots?: {
    default?: ElementArrayOrRef;
    headline?: ElementArrayOrRef;
    lead?: ElementArrayOrRef;
    trail?: ElementArrayOrRef;
  };
}

interface AppRailComponent {
  component: 'app-rail';
  background?: string;
  border?: string;
  width?: string;
  height?: string;
  gap?: string;
  regionLead?: string;
  regionDefault?: string;
  regionTrail?: string;
  hover?: string;
  active?: string;
  spacing?: string;
  aspectRatio?: string;
  slots?: {
    default?: ElementArrayOrRef;
    lead?: ElementArrayOrRef;
    trail?: ElementArrayOrRef;
  };
}

interface AppRailTileComponent {
  component: 'app-rail-tile';
  group?: any;
  name?: string;
  value?: any;
  title?: string;
  regionLead?: string;
  regionLabel?: string;
  hover?: string;
  active?: string;
  spacing?: string;
  width?: string;
  aspectRatio?: string;
  slots?: {
    default?: ElementArrayOrRef;
    lead?: ElementArrayOrRef;
  };
}

interface AppRailAnchorComponent {
  component: 'app-rail-anchor';
  selected?: boolean;
  regionLead?: string;
  regionLabel?: string;
  hover?: string;
  active?: string;
  spacing?: string;
  width?: string;
  aspectRatio?: string;
  slots?: {
    default?: ElementArrayOrRef;
    lead?: ElementArrayOrRef;
  };
}

interface AutocompleteComponent {
  component: 'autocomplete';
  input?: unknown | undefined;
  emptyState?: string;
  regionNav?: string;
  regionList?: string;
  regionItem?: string;
  regionButton?: string;
  regionEmpty?: string;
  transitions?: boolean;
}

interface AvatarComponent {
  component: 'avatar';
  initials?: string;
  fill?: string;
  fontSize?: number;
  src?: string;
  fallback?: string;
  background?: string;
  width?: string;
  border?: string;
  rounded?: string;
  shadow?: string;
  cursor?: string;
  slots?: {
    default?: ElementArrayOrRef;
  };
}

interface ConicGradientComponent {
  component: 'conic-gradient';
  legend?: boolean;
  spin?: boolean;
  width?: string;
  hover?: string;
  digits?: number;
  regionCaption?: string;
  regionCone?: string;
  regionLegend?: string;
  slots?: {
    default?: ElementArrayOrRef;
  };
}

interface FileButtonComponent {
  component: 'file-button';
  name: string;
  width?: string;
  button?: string;
  slots?: {
    default?: ElementArrayOrRef;
  };
}

interface FileDropzoneComponent {
  component: 'file-dropzone';
  name: string;
  border?: string;
  padding?: string;
  rounded?: string;
  regionInterface?: string;
  regionInterfaceText?: string;
  slotLead?: string;
  slotMessage?: string;
  slotMeta?: string;
  slots?: {
    lead?: ElementArrayOrRef;
    message?: ElementArrayOrRef;
    meta?: ElementArrayOrRef;
  };
}

interface InputChipComponent {
  component: 'input-chip';
  input?: string;
  name?: string;
  value?: string[];
  whitelist?: string[];
  max?: number;
  minlength?: number;
  maxlength?: number;
  allowUpperCase?: boolean;
  allowDuplicates?: boolean;
  duration?: number;
  required?: boolean;
  chips?: string;
  invalid?: string;
  padding?: string;
  rounded?: string;
  regionChipWrapper?: string;
  regionChipList?: string;
  regionInput?: string;
  label?: string;
  transitions?: boolean;
}

interface ListBoxComponent {
  component: 'list-box';
  multiple?: boolean;
  disabled?: boolean;
  spacing?: string;
  rounded?: string;
  active?: string;
  hover?: string;
  padding?: string;
  regionLead?: string;
  regionDefault?: string;
  regionTrail?: string;
  labelledby?: string;
  slots?: {
    default?: ElementArrayOrRef;
  };
}

interface ListBoxItemComponent {
  component: 'list-box-item';
  slots?: {
    default?: ElementArrayOrRef;
    lead?: ElementArrayOrRef;
    trail?: ElementArrayOrRef;
  };
}

interface PaginatorComponent {
  component: 'paginator';
  disabled?: boolean;
  showPreviousNextButtons?: boolean;
  showFirstLastButtons?: boolean;
  showNumerals?: boolean;
  maxNumerals?: number;
  justify?: string;
  select?: string;
  amountText?: string;
  regionControl?: string;
  controlVariant?: string;
  controlSeparator?: string;
  active?: string;
  buttonClasses?: string;
  buttonTextPrevious?: string;
  buttonTextNext?: string;
  buttonTextFirst?: string;
  buttonTextLast?: string;
  separatorText?: string;
  labelFirst?: string;
  labelPrevious?: string;
  labelNext?: string;
  labelLast?: string;
}

interface ProgressBarComponent {
  component: 'progress-bar';
  value?: number;
  min?: number;
  max?: number;
  height?: string;
  rounded?: string;
  transition?: string;
  animIndeterminate?: string;
  meter?: string;
  track?: string;
  labelledby?: string;
}

interface ProgressRadialComponent {
  component: 'progress-radial';
  value?: number;
  stroke?: number;
  font?: number;
  strokeLinecap?: string;
  transition?: string;
  width?: string;
  meter?: string;
  track?: string;
  fill?: string;
  labelledby?: string;
  slots?: {
    default?: ElementArrayOrRef;
  };
}

interface RatingsComponent {
  component: 'ratings';
  value?: number;
  max?: number;
  interactive?: boolean;
  text?: string;
  fill?: string;
  justify?: string;
  spacing?: string;
  regionIcon?: string;
  slots?: {
    empty?: ElementArrayOrRef;
    full?: ElementArrayOrRef;
    half?: ElementArrayOrRef;
  };
}

interface RadioGroupComponent {
  component: 'radio-group';
  display?: string;
  flexDirection?: string;
  gap?: string;
  background?: string;
  border?: string;
  rounded?: string;
  padding?: string;
  active?: string;
  hover?: string;
  color?: string;
  fill?: string;
  regionLabel?: string;
  labelledby?: string;
  slots?: {
    default?: ElementArrayOrRef;
  };
}

interface RadioItemComponent {
  component: 'radio-item';
  group?: any;
  value?: any;
  title?: string;
  label?: string;
  slots?: {
    default?: ElementArrayOrRef;
  };
}

interface RangeSliderComponent {
  component: 'range-slider';
  name: string;
  id?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  ticked?: boolean;
  accent?: string;
  label?: string;
  slots?: {
    default?: ElementArrayOrRef;
    trail?: ElementArrayOrRef;
  };
}

interface SlideToggleComponent {
  component: 'slide-toggle';
  name: string;
  checked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  background?: string;
  active?: string;
  border?: string;
  rounded?: string;
  label?: string;
  slots?: {
    default?: ElementArrayOrRef;
  };
}

interface TabGroupComponent {
  component: 'tab-group';
  justify?: string;
  border?: string;
  active?: string;
  hover?: string;
  flex?: string;
  padding?: string;
  rounded?: string;
  spacing?: string;
  regionList?: string;
  regionPanel?: string;
  labelledby?: string;
  panel?: string;
  slots?: {
    default?: ElementArrayOrRef;
    panel?: ElementArrayOrRef;
  };
}

interface TabComponent {
  component: 'tab';
  group?: any;
  name?: string;
  value?: any;
  title?: string;
  controls?: string;
  regionTab?: string;
  slots?: {
    default?: ElementArrayOrRef;
    lead?: ElementArrayOrRef;
  };
}

interface TabAnchorComponent {
  component: 'tab-anchor';
  selected?: boolean;
  controls?: string;
  slots?: {
    default?: ElementArrayOrRef;
    lead?: ElementArrayOrRef;
  };
}

interface TreeViewComponent {
  component: 'tree-view';
  selection?: boolean;
  multiple?: boolean;
  width?: string;
  spacing?: string;
  open?: boolean;
  disabled?: boolean;
  padding?: string;
  indent?: string;
  hover?: string;
  rounded?: string;
  caretOpen?: string;
  caretClosed?: string;
  hyphenOpacity?: string;
  regionSummary?: string;
  regionSymbol?: string;
  regionChildren?: string;
  labelledby?: string;
  slots?: {
    default?: ElementArrayOrRef;
  };
}

interface TreeViewItemComponent {
  component: 'tree-view-item';
  group?: unknown;
  name?: string;
  value?: unknown;
  checked?: boolean;
  spacing?: string;
  indeterminate?: boolean;
  hideLead?: boolean;
  hideChildren?: boolean;
  slots?: {
    default?: ElementArrayOrRef;
    children?: ElementArrayOrRef;
    lead?: ElementArrayOrRef;
  };
}

interface RecursiveTreeViewComponent {
  component: 'recursive-tree-view';
  selection?: boolean;
  multiple?: boolean;
  relational?: boolean;
  expandedNodes?: string[];
  disabledNodes?: string[];
  checkedNodes?: string[];
  indeterminateNodes?: string[];
  width?: string;
  spacing?: string;
  padding?: string;
  indent?: string;
  hover?: string;
  rounded?: string;
  caretOpen?: string;
  caretClosed?: string;
  hyphenOpacity?: string;
  regionSummary?: string;
  regionSymbol?: string;
  regionChildren?: string;
  labelledby?: string;
}
