'use client';

import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';

const pages = [
  {
    text: 'Overview',
    url: '/docs',
  },
  {
    text: 'Quickstart',
    url: '/docs/quickstart',
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

export function DocsMenu({ onSelect = () => {} }) {
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleSection = (text: string) => {
    const index = collapsed.indexOf(text);

    const newCollapsed = collapsed.slice();

    if (index > -1) {
      newCollapsed.splice(index, 1);
    } else {
      newCollapsed.push(text);
    }

    setCollapsed(newCollapsed);
  };

  return (
    <ul className="p-4" style={{ maxHeight: 'calc(100vh - 97px)' }}>
      {pages.map((page) => (
        <li key={page.text}>
          {page.children ? (
            <>
              <button
                className="flex font-bold justify-between mt-8 p-2 text-gray-500 text-sm w-full whitespace-nowrap"
                onClick={() => toggleSection(page.text)}
              >
                {page.text}
                <ChevronRightIcon
                  className="transition-transform"
                  style={{ transform: collapsed.includes(page.text) ? 'rotate(90deg)' : undefined }}
                />
              </button>
              {!collapsed.includes(page.text) && (
                <ul>
                  {page.children?.map((child) => (
                    <li key={child.url}>
                      <Link
                        className={classNames(
                          'block p-2 rounded-md text-gray-500 text-sm whitespace-nowrap',
                          {
                            'text-white': pathname === child.url,
                          },
                        )}
                        href={child.url}
                        onClick={onSelect}
                      >
                        {child.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <Link
              className={classNames(
                'block p-2 rounded-md text-gray-500 text-sm whitespace-nowrap',
                {
                  'text-white': pathname === page.url,
                },
              )}
              href={page.url}
              onClick={onSelect}
            >
              {page.text}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
