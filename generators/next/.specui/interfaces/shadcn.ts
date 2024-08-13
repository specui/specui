import type { BaseElement } from './BaseElement';

export interface AccordionComponent extends BaseElement {
  component: 'accordion';
  collapsible?: boolean;
  type?: string;
}

export interface AccordionItemComponent extends BaseElement {
  component: 'accordion-item';
  value: string;
}

export interface AccordionTriggerComponent extends BaseElement {
  component: 'accordion-trigger';
}

export interface AccordionContentComponent extends BaseElement {
  component: 'accordion-content';
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
