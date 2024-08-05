import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier/dist/standalone';
import { paramCase } from 'change-case';

export interface ISpec {
  app: {
    title: string;
    name: string;
    version: string;
    license: 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT';
    description: string;
    author?: {
      name?: string;
      email?: string;
      url?: string;
    };
  };
  components: {
    [name: string]: {
      type?: string;
      text?: string;
      style?: {
        color?: string;
      };
    };
  };
  pages: {
    [name: string]: {
      elements: Array<{
        type?: string;
        component?: string;
        text?: string;
        style?: {
          color?: string;
        };
      }>;
    };
  };
  styles: Record<
    string,
    {
      backgroundColor: string;
    }
  >;
}

export default async function zapp(spec: ISpec) {
  const components: {
    [name: string]: {
      html: string;
      css: string;
    };
  } = {};
  Object.entries(spec.components).forEach(([name, component]) => {
    components[name] = {
      css: `${component.type} {${Object.entries(component.style || [])
        .map(([key, value]) => `${paramCase(key)}: ${value}`)
        .join(';')}}`,
      html: `<${component.type}>${component.text || ''}</${component.type}>`,
    };
  });

  return {
    'index.html': await generate({
      processor: PrettierProcessor({
        parser: 'html',
      }),
      engine: async () => `
        <!DOCTYPE html>

        <html>
          <head>
            <title>Home | ${spec.app.title}</title>
            <style type="text/css">
              ${Object.entries(spec.styles)
                .map(
                  ([selector, style]) =>
                    `${selector} {${Object.entries(style)
                      .map(([key, value]) => `${paramCase(key)}: ${value}`)
                      .join(';')}}`,
                )
                .join('\n')}
              ${spec.pages.index.elements
                .map((element) =>
                  element.type === 'component' && element.component
                    ? components[element.component].css
                    : `${element.type} {${Object.entries(element.style || [])
                        .map(([key, value]) => `${paramCase(key)}: ${value}`)
                        .join(';')}}`,
                )
                .join('')}
            </style>
          </head>
          <body>
            ${spec.pages.index.elements
              .map((element) =>
                element.type === 'component' && element.component
                  ? components[element.component].html
                  : `<${element.type}>${element.text || ''}</${element.type}>`,
              )
              .join('')}
          </body>
        </html>
      `,
    }),
  };
}
