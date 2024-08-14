import type { ElementArrayOrRef } from './ISpec';

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
