import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';
import { paramCase } from 'change-case';
import { ISpec } from './interfaces/ISpec';

export default async function zapp(spec: ISpec) {
  const components: {
    [name: string]: string;
  } = {};
  Object.entries(spec.components).forEach(([name, component]) => {
    components[name] = `<${component.type}>${component.text || ''}</${component.type}>`;
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
                .map(
                  (element) =>
                    `${element.type} {${Object.entries(element.style || [])
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
                  ? components[element.component]
                  : `<${element.type}>${element.text || ''}</${element.type}>`,
              )
              .join('')}
          </body>
        </html>
      `,
    }),
  };
}
