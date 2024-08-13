import type { BaseElement } from './BaseElement';
import type {
  AccordionComponent,
  AccordionItemComponent,
  AccordionTriggerComponent,
  AccordionContentComponent,
  AlertComponent,
  AlertTitleComponent,
  AlertDescriptionComponent,
  AlertDialogComponent,
  AlertDialogContentComponent,
  AlertDialogOverlayComponent,
  AlertDialogPortalComponent,
  AlertDialogTriggerComponent,
  AspectRatioComponent,
  AvatarComponent,
  AvatarFallbackComponent,
  AvatarImageComponent,
  BadgeComponent,
  BreadcrumbComponent,
  BreadcrumbEllipsisComponent,
  BreadcrumbItemComponent,
  BreadcrumbLinkComponent,
  BreadcrumbListComponent,
  BreadcrumbPageComponent,
  BreadcrumbSeparatorComponent,
  ButtonComponent,
} from './shadcn';

type Provider = 'facebook' | 'github' | 'google';

export interface Page {
  dataSources?: Record<
    string,
    {
      type: 'model';
      model?: string;
    }
  >;
  elements?: ElementArrayOrRef;
}

export type Element =
  | BaseElement
  | AElement
  | IframeElement
  | ImgElement
  | InputElement
  | AccordionComponent
  | AccordionItemComponent
  | AccordionTriggerComponent
  | AccordionContentComponent
  | AlertComponent
  | AlertTitleComponent
  | AlertDescriptionComponent
  | AlertDialogComponent
  | AlertDialogContentComponent
  | AlertDialogOverlayComponent
  | AlertDialogPortalComponent
  | AlertDialogTriggerComponent
  | AspectRatioComponent
  | AvatarComponent
  | AvatarFallbackComponent
  | AvatarImageComponent
  | BadgeComponent
  | BreadcrumbComponent
  | BreadcrumbEllipsisComponent
  | BreadcrumbItemComponent
  | BreadcrumbLinkComponent
  | BreadcrumbListComponent
  | BreadcrumbPageComponent
  | BreadcrumbSeparatorComponent
  | ButtonComponent;

export interface AElement extends BaseElement {
  tag: 'a';
  href?: string;
  target?: string;
}

export interface IframeElement extends BaseElement {
  tag: 'iframe';
  src?: string;
}

export interface ImgElement extends BaseElement {
  tag: 'img';
  alt?: string;
  src?: string;
}

export interface InputElement extends BaseElement {
  tag: 'input';
  placeholder?: string;
  type?: string;
  value?: string;
}

export type ElementArrayOrRef =
  | Array<Element>
  | {
      $ref: Element;
    };

export interface ISpec {
  title?: string;
  name?: string;
  version?: string;
  license: 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT';
  description?: string;
  actions?: {
    [name: string]: {
      props: {
        [name: string]: {
          required?: boolean;
          type: 'boolean' | 'number' | 'string';
        };
      };
      operations: {
        type: 'delete' | 'insert' | 'update' | 'revalidate' | 'redirect';
        model?: string;
        data?: {
          [name: string]: any;
        };
        path?: string;
        where?: {
          [name: string]: any;
        };
      }[];
    };
  };
  author?: {
    name?: string;
    email?: string;
    url?: string;
  };
  auth?: {
    providers: Provider[];
  };
  calls?: {
    [name: string]: {
      request: {
        [name: string]: {
          required?: boolean;
          type: 'boolean' | 'number' | 'string';
        };
      };
      response: {
        [name: string]: {
          required?: boolean;
          type: 'boolean' | 'number' | 'string';
        };
      };
    };
  };
  components?: {
    [name: string]: {
      props?: Record<
        string,
        {
          required?: boolean;
          type: string;
        }
      >;
      elements?: ElementArrayOrRef;
    };
  };
  models?: {
    [name: string]: {
      attributes: {
        [name: string]: {
          key?: 'primary';
          type: 'boolean' | 'number' | 'string';
          unique?: boolean;
        };
      };
    };
  };
  pages?: {
    [name: string]: Page;
  };
}
