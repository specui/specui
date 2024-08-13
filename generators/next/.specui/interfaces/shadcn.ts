import type { BaseElement } from './BaseElement';

export interface AccordionComponent extends BaseElement {
  component: 'accordion';
  collapsible?: boolean;
  dir?: 'ltr' | 'rtl';
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  type?: 'single' | 'multiple';
}

export interface AccordionItemComponent extends BaseElement {
  component: 'accordion-item';
  disabled?: boolean;
  value: string;
}

export interface AccordionTriggerComponent extends BaseElement {
  component: 'accordion-trigger';
}

export interface AccordionContentComponent extends BaseElement {
  component: 'accordion-content';
  forceMount?: boolean;
}

export interface AlertComponent extends BaseElement {
  component: 'alert';
}

export interface AlertTitleComponent extends BaseElement {
  component: 'alert-title';
}

export interface AlertDescriptionComponent extends BaseElement {
  component: 'alert-description';
}

export interface AlertDialogComponent extends BaseElement {
  component: 'alert-dialog';
  defaultOpen?: boolean;
  open?: boolean;
}

export interface AlertDialogTriggerComponent extends BaseElement {
  component: 'alert-dialog-trigger';
}

export interface AlertDialogPortalComponent extends BaseElement {
  component: 'alert-dialog-portal';
  forceMount?: boolean;
  container?: Element;
}

export interface AlertDialogOverlayComponent extends BaseElement {
  component: 'alert-dialog-overlay';
  forceMount?: boolean;
}

export interface AlertDialogContentComponent extends BaseElement {
  component: 'alert-dialog-content';
  forceMount?: boolean;
}

export interface AspectRatioComponent extends BaseElement {
  component: 'aspect-ratio';
  ratio?: number;
}

export interface AvatarComponent extends BaseElement {
  component: 'avatar';
}

export interface AvatarImageComponent extends BaseElement {
  component: 'avatar-image';
}

export interface AvatarFallbackComponent extends BaseElement {
  component: 'avatar-fallback';
  delayMs?: number;
}

export interface BadgeComponent extends BaseElement {
  component: 'badge';
}

export interface BreadcrumbComponent extends BaseElement {
  component: 'breadcrumb';
}

export interface BreadcrumbListComponent extends BaseElement {
  component: 'breadcrumb-list';
}

export interface BreadcrumbItemComponent extends BaseElement {
  component: 'breadcrumb-item';
}

export interface BreadcrumbLinkComponent extends BaseElement {
  component: 'breadcrumb-link';
  href?: string;
}

export interface BreadcrumbSeparatorComponent extends BaseElement {
  component: 'breadcrumb-separator';
}

export interface BreadcrumbPageComponent extends BaseElement {
  component: 'breadcrumb-page';
}

export interface BreadcrumbEllipsisComponent extends BaseElement {
  component: 'breadcrumb-ellipsis';
}
