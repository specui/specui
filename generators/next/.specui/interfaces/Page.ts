import type { ElementArrayOrRef } from './BaseElement';

export interface Page {
  dataSources?: Record<
    string,
    {
      type: 'model';
      model?: string;
    }
  >;
  title?: string;
  elements?: ElementArrayOrRef;
}
