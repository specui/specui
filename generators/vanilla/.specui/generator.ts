import { generate, IProcessor } from '@specui/core';
import { customAlphabet } from 'nanoid';
import { paramCase } from 'change-case';
import { Element, ISpec } from './interfaces/ISpec';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);

export default async function generator(spec: ISpec, PrettierProcessor: IProcessor<any>) {
  const components: {
    [name: string]: string;
  } = {};
  Object.entries(spec.components).forEach(([name, component]) => {
    components[name] = `<${component.tag}>${component.text || ''}</${component.tag}>`;
  });

  function renderElements(
    elements: Element[],
    elementTag = 'root_',
  ): Array<{
    css: string;
    html: string;
  }> {
    return elements.map((element, index) => {
      const className = `${elementTag}${index}_${element.tag}`;

      const children = element.elements
        ? renderElements(element.elements, `${className}_`)
        : undefined;

      const attributes = {
        class: className,
        href: element.href,
      };

      return {
        css:
          `.${className} {${Object.entries(element.style || [])
            .map(([key, value]) => `${paramCase(key)}: ${value}`)
            .join(';')}}\n` +
          (children ? '\n' + children.map((child) => child.css).join('\n') : ''),
        html:
          element.tag === 'component' && element.component
            ? components[element.component]
            : children
            ? `<${element.tag} ${Object.entries(attributes)
                .map(([key, value]) => `${key}="${value}"`)
                .join(' ')}>${children.map((child) => child.html).join('\n')}</${element.tag}>`
            : `<${element.tag} class=${className}>${element.text || ''}</${element.tag}>`,
      };
    });
  }

  const elements = renderElements(spec.pages.index.elements);

  return {
    'index.html': await generate({
      processor: PrettierProcessor({
        parser: 'html',
      }),
      engine: async () => /* html */ `
        <!DOCTYPE html>

        <html>
          <head>
            <title>Home | ${spec.app.title}</title>
            <link rel="stylesheet" href="style.css" />
          </head>
          <body>
            ${elements.map((element) => element.html).join('')}
          </body>
        </html>
      `,
    }),
    'style.css': await generate({
      processor: PrettierProcessor({
        parser: 'css',
      }),
      engine: async () => /* css */ `
        ${Object.entries(spec.styles)
          .map(
            ([selector, style]) =>
              `${selector} {${Object.entries(style)
                .map(([key, value]) => `${paramCase(key)}: ${value}`)
                .join(';')}}\n`,
          )
          .join('\n')}
          ${elements.map((element) => element.css).join('')}
      `,
    }),
  };
}
