import type { Page } from './Page';

export interface Spec {
  title?: string;
  name?: string;
  version?: string;
  private?: boolean;
  pages?: Record<string, Page>;
  theme?:
    | 'skeleton'
    | 'wintry'
    | 'modern'
    | 'rocket'
    | 'seafoam'
    | 'vintage'
    | 'sahara'
    | 'hamlindigo'
    | 'gold-nouveau'
    | 'crimson';
}
