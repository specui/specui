import { BaseElement, Element } from './BaseElement';

export interface ShadcnComponent extends BaseElement {
  component:
    | AccordionComponent['component']
    | AccordionItemComponent['component']
    | AccordionTriggerComponent['component']
    | AccordionContentComponent['component']
    | AlertComponent['component']
    | AlertTitleComponent['component']
    | AlertDescriptionComponent['component']
    | AlertDialogComponent['component']
    | AlertDialogTriggerComponent['component']
    | AlertDialogPortalComponent['component']
    | AlertDialogOverlayComponent['component']
    | AlertDialogContentComponent['component']
    | AspectRatioComponent['component']
    | AvatarComponent['component']
    | AvatarImageComponent['component']
    | AvatarFallbackComponent['component']
    | BadgeComponent['component']
    | BreadcrumbComponent['component']
    | BreadcrumbListComponent['component']
    | BreadcrumbItemComponent['component']
    | BreadcrumbLinkComponent['component']
    | BreadcrumbSeparatorComponent['component']
    | BreadcrumbPageComponent['component']
    | BreadcrumbEllipsisComponent['component']
    | ButtonComponent['component']
    | CalendarComponent['component']
    | CardComponent['component']
    | CardHeaderComponent['component']
    | CardTitleComponent['component']
    | CardDescriptionComponent['component']
    | CardContentComponent['component']
    | CardFooterComponent['component']
    | CarouselComponent['component']
    | CarouselContentComponent['component']
    | CarouselItemComponent['component']
    | CarouselNextComponent['component']
    | CarouselPreviousComponent['component']
    | CheckboxComponent['component']
    | CheckboxIndicatorComponent['component']
    | CollapsibleComponent['component']
    | CollapsibleTriggerComponent['component']
    | CollapsibleContentComponent['component']
    | CommandComponent['component']
    | CommandInputComponent['component']
    | CommandListComponent['component']
    | CommandEmptyComponent['component']
    | CommandGroupComponent['component']
    | CommandItemComponent['component']
    | CommandSeparatorComponent['component']
    | CommandShortcutComponent['component']
    | ContextMenuComponent['component']
    | ContextMenuCheckboxItemComponent['component']
    | ContextMenuContentComponent['component']
    | ContextMenuItemComponent['component']
    | ContextMenuLabelComponent['component']
    | ContextMenuRadioGroupComponent['component']
    | ContextMenuRadioItemComponent['component']
    | ContextMenuSeparatorComponent['component']
    | ContextMenuSubComponent['component']
    | ContextMenuSubContentComponent['component']
    | ContextMenuSubTriggerComponent['component']
    | ContextMenuTriggerComponent['component']
    | Sidebar['component']
    | SidebarContent['component']
    | SidebarFooter['component']
    | SidebarGroup['component']
    | SidebarHeader['component']
    | SidebarProvider['component']
    | SidebarTrigger['component']
    | Skeleton['component'];
}

// export type ShadcnComponent =
//   | AccordionComponent
//   | AccordionItemComponent
//   | AccordionTriggerComponent
//   | AccordionContentComponent
//   | AlertComponent
//   | AlertTitleComponent
//   | AlertDescriptionComponent
//   | AlertDialogComponent
//   | AlertDialogTriggerComponent
//   | AlertDialogPortalComponent
//   | AlertDialogOverlayComponent
//   | AlertDialogContentComponent
//   | AspectRatioComponent
//   | AvatarComponent
//   | AvatarImageComponent
//   | AvatarFallbackComponent
//   | BadgeComponent
//   | BreadcrumbComponent
//   | BreadcrumbListComponent
//   | BreadcrumbItemComponent
//   | BreadcrumbLinkComponent
//   | BreadcrumbSeparatorComponent
//   | BreadcrumbPageComponent
//   | BreadcrumbEllipsisComponent
//   | ButtonComponent
//   | CalendarComponent
//   | CardComponent
//   | CardHeaderComponent
//   | CardTitleComponent
//   | CardDescriptionComponent
//   | CardContentComponent
//   | CardFooterComponent
//   | CarouselComponent
//   | CarouselContentComponent
//   | CarouselItemComponent
//   | CarouselNextComponent
//   | CarouselPreviousComponent
//   | CheckboxComponent
//   | CheckboxIndicatorComponent
//   | CollapsibleComponent
//   | CollapsibleTriggerComponent
//   | CollapsibleContentComponent
//   | CommandComponent
//   | CommandInputComponent
//   | CommandListComponent
//   | CommandEmptyComponent
//   | CommandGroupComponent
//   | CommandItemComponent
//   | CommandSeparatorComponent
//   | CommandShortcutComponent
//   | ContextMenuComponent
//   | ContextMenuCheckboxItemComponent
//   | ContextMenuContentComponent
//   | ContextMenuItemComponent
//   | ContextMenuLabelComponent
//   | ContextMenuRadioGroupComponent
//   | ContextMenuRadioItemComponent
//   | ContextMenuSeparatorComponent
//   | ContextMenuSubComponent
//   | ContextMenuSubContentComponent
//   | ContextMenuSubTriggerComponent
//   | ContextMenuTriggerComponent;

interface AccordionComponent extends BaseElement {
  component: 'accordion';
  collapsible?: boolean;
  dir?: 'ltr' | 'rtl';
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  type?: 'single' | 'multiple';
}

interface AccordionItemComponent extends BaseElement {
  component: 'accordion-item';
  disabled?: boolean;
  value: string;
}

interface AccordionTriggerComponent extends BaseElement {
  component: 'accordion-trigger';
}

interface AccordionContentComponent extends BaseElement {
  component: 'accordion-content';
  forceMount?: boolean;
}

interface AlertComponent extends BaseElement {
  component: 'alert';
}

interface AlertTitleComponent extends BaseElement {
  component: 'alert-title';
}

interface AlertDescriptionComponent extends BaseElement {
  component: 'alert-description';
}

interface AlertDialogComponent extends BaseElement {
  component: 'alert-dialog';
  defaultOpen?: boolean;
  open?: boolean;
}

interface AlertDialogTriggerComponent extends BaseElement {
  component: 'alert-dialog-trigger';
}

interface AlertDialogPortalComponent extends BaseElement {
  component: 'alert-dialog-portal';
  forceMount?: boolean;
  container?: Element;
}

interface AlertDialogOverlayComponent extends BaseElement {
  component: 'alert-dialog-overlay';
  forceMount?: boolean;
}

interface AlertDialogContentComponent extends BaseElement {
  component: 'alert-dialog-content';
  forceMount?: boolean;
}

interface AspectRatioComponent extends BaseElement {
  component: 'aspect-ratio';
  ratio?: number;
}

interface AvatarComponent extends BaseElement {
  component: 'avatar';
}

interface AvatarImageComponent extends BaseElement {
  component: 'avatar-image';
}

interface AvatarFallbackComponent extends BaseElement {
  component: 'avatar-fallback';
  delayMs?: number;
}

interface BadgeComponent extends BaseElement {
  component: 'badge';
}

interface BreadcrumbComponent extends BaseElement {
  component: 'breadcrumb';
}

interface BreadcrumbListComponent extends BaseElement {
  component: 'breadcrumb-list';
}

interface BreadcrumbItemComponent extends BaseElement {
  component: 'breadcrumb-item';
}

interface BreadcrumbLinkComponent extends BaseElement {
  component: 'breadcrumb-link';
  href?: string;
}

interface BreadcrumbSeparatorComponent extends BaseElement {
  component: 'breadcrumb-separator';
}

interface BreadcrumbPageComponent extends BaseElement {
  component: 'breadcrumb-page';
}

interface BreadcrumbEllipsisComponent extends BaseElement {
  component: 'breadcrumb-ellipsis';
}

interface ButtonComponent extends BaseElement {
  component: 'button';
  asChild?: boolean;
  disabled?: boolean;
  variant?: 'link' | 'ghost' | 'outline' | 'secondary';
  size?: 'icon';
}

interface CalendarComponent extends BaseElement {
  component: 'calendar';
}

interface CardComponent extends BaseElement {
  component: 'card';
}

interface CardHeaderComponent extends BaseElement {
  component: 'card-header';
}

interface CardTitleComponent extends BaseElement {
  component: 'card-title';
}

interface CardDescriptionComponent extends BaseElement {
  component: 'card-description';
}

interface CardContentComponent extends BaseElement {
  component: 'card-content';
}

interface CardFooterComponent extends BaseElement {
  component: 'card-footer';
}

interface CarouselComponent extends BaseElement {
  component: 'carousel';
}

interface CarouselContentComponent extends BaseElement {
  component: 'carousel-content';
}

interface CarouselItemComponent extends BaseElement {
  component: 'carousel-item';
}

interface CarouselNextComponent extends BaseElement {
  component: 'carousel-next';
}

interface CarouselPreviousComponent extends BaseElement {
  component: 'carousel-previous';
}

interface CheckboxComponent extends Omit<BaseElement, 'defaultChecked'> {
  component: 'checkbox';
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}

interface CheckboxIndicatorComponent extends BaseElement {
  component: 'checkbox-indicator';
  forceMount?: boolean;
}

interface CollapsibleComponent extends BaseElement {
  component: 'collapsible';
  defaultOpen?: boolean;
  disabled?: boolean;
  open?: boolean;
}

interface CollapsibleTriggerComponent extends BaseElement {
  component: 'collapsible-trigger';
}

interface CollapsibleContentComponent extends BaseElement {
  component: 'collapsible-content';
  forceMount?: boolean;
}

interface CommandComponent extends BaseElement {
  component: 'command';
}

interface CommandInputComponent extends BaseElement {
  component: 'command-input';
  placeholder?: string;
}

interface CommandListComponent extends BaseElement {
  component: 'command-list';
}

interface CommandEmptyComponent extends BaseElement {
  component: 'command-empty';
}

interface CommandGroupComponent extends BaseElement {
  component: 'command-group';
  heading?: string;
}

interface CommandItemComponent extends BaseElement {
  component: 'command-item';
}

interface CommandSeparatorComponent extends BaseElement {
  component: 'command-separator';
}

interface CommandShortcutComponent extends BaseElement {
  component: 'command-shortcut';
}

interface ContextMenuComponent extends BaseElement {
  component: 'context-menu';
}

interface ContextMenuCheckboxItemComponent extends BaseElement {
  component: 'context-menu-checkbox-item';
  checked?: boolean;
}

interface ContextMenuContentComponent extends BaseElement {
  component: 'context-menu-content';
}

interface ContextMenuItemComponent extends BaseElement {
  component: 'context-menu-item';
  disabled?: boolean;
  inset?: boolean;
}

interface ContextMenuLabelComponent extends BaseElement {
  component: 'context-menu-label';
}

interface ContextMenuRadioGroupComponent extends BaseElement {
  component: 'context-menu-radio-group';
  value?: string;
}

interface ContextMenuRadioItemComponent extends BaseElement {
  component: 'context-menu-radio-item';
}

interface ContextMenuSeparatorComponent extends BaseElement {
  component: 'context-menu-separator';
}

interface ContextMenuSubComponent extends BaseElement {
  component: 'context-menu-sub';
}

interface ContextMenuSubContentComponent extends BaseElement {
  component: 'context-menu-sub-content';
}

interface ContextMenuSubTriggerComponent extends BaseElement {
  component: 'context-menu-sub-trigger';
}

interface ContextMenuTriggerComponent extends BaseElement {
  component: 'context-menu-trigger';
}

interface Sidebar extends BaseElement {
  component: 'sidebar';
}

interface SidebarContent extends BaseElement {
  component: 'sidebar-content';
}

interface SidebarFooter extends BaseElement {
  component: 'sidebar-footer';
}

interface SidebarGroup extends BaseElement {
  component: 'sidebar-group';
}

interface SidebarHeader extends BaseElement {
  component: 'sidebar-header';
}

interface SidebarProvider extends BaseElement {
  component: 'sidebar-provider';
}

interface SidebarTrigger extends BaseElement {
  component: 'sidebar-trigger';
}

interface Skeleton extends BaseElement {
  component: 'skeleton';
}
