import type { BaseElement } from './element';

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

export interface ButtonComponent extends BaseElement {
  component: 'button';
  asChild?: boolean;
  disabled?: boolean;
  variant?: 'link' | 'ghost' | 'outline' | 'secondary';
  size?: 'icon';
}

export interface CalendarComponent extends BaseElement {
  component: 'calendar';
}

export interface CardComponent extends BaseElement {
  component: 'card';
}

export interface CardHeaderComponent extends BaseElement {
  component: 'card-header';
}

export interface CardTitleComponent extends BaseElement {
  component: 'card-title';
}

export interface CardDescriptionComponent extends BaseElement {
  component: 'card-description';
}

export interface CardContentComponent extends BaseElement {
  component: 'card-content';
}

export interface CardFooterComponent extends BaseElement {
  component: 'card-footer';
}

export interface CarouselComponent extends BaseElement {
  component: 'carousel';
}

export interface CarouselContentComponent extends BaseElement {
  component: 'carousel-content';
}

export interface CarouselItemComponent extends BaseElement {
  component: 'carousel-item';
}

export interface CarouselNextComponent extends BaseElement {
  component: 'carousel-next';
}

export interface CarouselPreviousComponent extends BaseElement {
  component: 'carousel-previous';
}

export interface CheckboxComponent extends Omit<BaseElement, 'defaultChecked'> {
  component: 'checkbox';
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}

export interface CheckboxIndicatorComponent extends BaseElement {
  component: 'checkbox-indicator';
  forceMount?: boolean;
}

export interface CollapsibleComponent extends BaseElement {
  component: 'collapsible';
  defaultOpen?: boolean;
  disabled?: boolean;
  open?: boolean;
}

export interface CollapsibleTriggerComponent extends BaseElement {
  component: 'collapsible-trigger';
}

export interface CollapsibleContentComponent extends BaseElement {
  component: 'collapsible-content';
  forceMount?: boolean;
}

export interface CommandComponent extends BaseElement {
  component: 'command';
}

export interface CommandInputComponent extends BaseElement {
  component: 'command-input';
  placeholder?: string;
}

export interface CommandListComponent extends BaseElement {
  component: 'command-list';
}

export interface CommandEmptyComponent extends BaseElement {
  component: 'command-empty';
}

export interface CommandGroupComponent extends BaseElement {
  component: 'command-group';
  heading?: string;
}

export interface CommandItemComponent extends BaseElement {
  component: 'command-item';
}

export interface CommandSeparatorComponent extends BaseElement {
  component: 'command-separator';
}

export interface CommandShortcutComponent extends BaseElement {
  component: 'command-shortcut';
}

export interface ContextMenuComponent extends BaseElement {
  component: 'context-menu';
}

export interface ContextMenuCheckboxItemComponent extends BaseElement {
  component: 'context-menu-checkbox-item';
  checked?: boolean;
}

export interface ContextMenuContentComponent extends BaseElement {
  component: 'context-menu-content';
}

export interface ContextMenuItemComponent extends BaseElement {
  component: 'context-menu-item';
  disabled?: boolean;
  inset?: boolean;
}

export interface ContextMenuLabelComponent extends BaseElement {
  component: 'context-menu-label';
}

export interface ContextMenuRadioGroupComponent extends BaseElement {
  component: 'context-menu-radio-group';
  value?: string;
}

export interface ContextMenuRadioItemComponent extends BaseElement {
  component: 'context-menu-radio-item';
}

export interface ContextMenuSeparatorComponent extends BaseElement {
  component: 'context-menu-separator';
}

export interface ContextMenuSubComponent extends BaseElement {
  component: 'context-menu-sub';
}

export interface ContextMenuSubContentComponent extends BaseElement {
  component: 'context-menu-sub-content';
}

export interface ContextMenuSubTriggerComponent extends BaseElement {
  component: 'context-menu-sub-trigger';
}

export interface ContextMenuTriggerComponent extends BaseElement {
  component: 'context-menu-trigger';
}
