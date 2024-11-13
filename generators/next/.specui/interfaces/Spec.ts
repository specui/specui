import type { Action, ActionProp } from './Action';
import type { Auth } from './Auth';
import type { Author } from './Author';
import type { Call, CallRequest, CallResponse } from './Call';
import type { Component, ComponentProp } from './Component';
import type { Database } from './Database';
import type { Model, ModelAttribute } from './Model';
import type { Next } from './Next';
import type { Package } from './Package';
import type { Page, PageDataSource } from './Page';
import type { Platform } from './Platform';
import type { Repository } from './Repository';
import type { Vercel } from './Vercel';

export type License = 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT';
export type PrimitiveType = 'boolean' | 'number' | 'string';

export {
  Action,
  ActionProp,
  Author,
  Call,
  CallRequest,
  CallResponse,
  Component,
  ComponentProp,
  Model,
  ModelAttribute,
  Page,
  PageDataSource,
  Vercel,
};

export interface Spec {
  title?: string;
  name?: string;
  version?: string;
  description?: string;
  private?: boolean;
  license?: License;
  icon?: string;
  author?: Author;
  components?: Record<string, Component>;
  layouts?: Record<string, Page>;
  pages?: Record<string, Page>;
  actions?: Record<string, Action>;
  auth?: Auth;
  calls?: Record<string, Call>;
  database?: Database;
  models?: Record<string, Model>;
  next?: Next;
  package?: Package;
  platform?: Platform;
  repository?: Repository;
  vercel?: Vercel;
}
