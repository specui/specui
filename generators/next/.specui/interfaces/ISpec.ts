import type { Action } from './Action';
import type { Author } from './Author';
import type { Call } from './Call';
import type { Component } from './Component';
import type { Model } from './Model';
import type { Page } from './Page';

export type License = 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT';
export type PrimitiveType = 'boolean' | 'number' | 'string';

type Provider = 'facebook' | 'github' | 'google';

export interface ISpec {
  title?: string;
  name?: string;
  version?: string;
  description?: string;
  license?: License;
  author?: Author;
  components?: Record<string, Component>;
  pages?: Record<string, Page>;
  actions?: Record<string, Action>;
  auth?: {
    providers: Provider[];
  };
  calls?: Record<string, Call>;
  models?: {
    [name: string]: Model;
  };
}
