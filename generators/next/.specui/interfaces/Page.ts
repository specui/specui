import type { ElementArrayOrRef } from './BaseElement';

export interface Page {
  dataSources?: Record<string, PageDataSource>;
  title?: string;
  elements?: ElementArrayOrRef;
}

export interface PageDataSource {
  type: 'model';
  model?: string;
}
