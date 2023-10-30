import Link from 'next/link';
import { FC } from 'react';

const pages = [
  {
    text: 'Overview',
    url: '/docs',
  },
  {
    text: 'Install Zapp CLI',
    url: '/docs/install',
  },
  {
    text: 'Components',
    children: [
      {
        text: 'Overview',
        url: '/docs/components',
      },
      {
        text: 'Specs',
        url: '/docs/components/specs',
      },
      {
        text: 'Schemas',
        url: '/docs/components/schemas',
      },
      {
        text: 'Generators',
        url: '/docs/components/generators',
      },
      {
        text: 'Templates',
        url: '/docs/components/templates',
      },
      {
        text: 'Engines',
        url: '/docs/components/engines',
      },
      {
        text: 'Processors',
        url: '/docs/components/processors',
      },
      {
        text: 'Zapps',
        url: '/docs/components/zapps',
      },
    ],
  },
  {
    text: 'Plugins',
    children: [
      {
        text: 'Git',
        url: '/docs/plugins/git',
      },
      {
        text: 'Handlebars',
        url: '/docs/plugins/handlebars',
      },
      {
        text: 'JSON',
        url: '/docs/plugins/json',
      },
      {
        text: 'NPM',
        url: '/docs/plugins/npm',
      },
      {
        text: 'Prettier',
        url: '/docs/plugins/prettier',
      },
      {
        text: 'TypeScript',
        url: '/docs/plugins/typescript',
      },
      {
        text: 'YAML',
        url: '/docs/plugins/yaml',
      },
    ],
  },
  {
    text: 'API Reference',
    children: [
      {
        text: 'CLI Usage',
        url: '/docs/reference/cli',
      },
    ],
  },
];

export const DocsMenu: FC = () => {
  return (
    <ul className="p-4">
      {pages.map((page) => (
        <li key={page.url}>
          {page.children ? (
            <>
              {page.text}
              <ul className="ml-4">
                {page.children?.map((child) => (
                  <li key={child.url}>
                    <Link href={child.url}>{child.text}</Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link href={page.url}>{page.text}</Link>
          )}
        </li>
      ))}
    </ul>
  );
};
