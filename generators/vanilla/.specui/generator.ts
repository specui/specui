import { generate, IProcessor } from '@specui/core';
import { customAlphabet } from 'nanoid';
import { paramCase } from 'change-case';
import { Element, Spec } from './interfaces/Spec';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);

export default async function generator(spec: Spec, PrettierProcessor: IProcessor<any>) {
  const components: {
    [name: string]: string;
  } = {};
  Object.entries(spec.components ?? {}).forEach(([name, component]) => {
    components[name] = `<${component.tag}>${component.text ?? ''}</${component.tag}>`;
  });

  function renderElements(
    elements: Element[],
    elementTag = 'root_',
  ): Array<{
    css: string;
    html: string;
  }> {
    return elements.map((element, index) => {
      const tag = element.tag ?? 'div';
      const className = `${elementTag}${index}_${tag}`;

      const children = element.elements
        ? renderElements(element.elements, `${className}_`)
        : undefined;

      const attributes = Object.entries({
        alt: element.alt,
        class: className,
        href: element.href,
        src: element.src,
        target: element.target,
        onClick: element.onClick,
      })
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) =>
          key === 'onClick' && typeof value === 'object'
            ? `${key.toLowerCase()}="${Object.keys(value)[0]}('${Object.values(value)}')"`
            : `${key}="${value}"`,
        )
        .join(' ');

      return {
        css:
          `.${className} {${Object.entries(element.style ?? [])
            .map(([key, value]) => `${paramCase(key)}: ${value}`)
            .join(';')}}\n` +
          (children ? '\n' + children.map((child) => child.css).join('\n') : ''),
        html:
          tag === 'component' && element.component
            ? components[element.component]
            : ['img', 'input'].includes(tag ?? '')
            ? `<${tag} ${attributes} />`
            : children
            ? `<${tag} ${attributes}>${children.map((child) => child.html).join('\n')}</${tag}>`
            : `<${tag} ${attributes}>${element.text ?? ''}</${tag}>`,
      };
    });
  }

  const elements = renderElements(spec.pages?.index.elements ?? []);

  return {
    'index.html': await generate({
      processor: PrettierProcessor({
        parser: 'html',
      }),
      engine: async () => /* html */ `
        <!DOCTYPE html>

        <html>
          <head>
            <title>Home | ${spec.app?.title}</title>
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
        ${Object.entries(spec.styles ?? {})
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
