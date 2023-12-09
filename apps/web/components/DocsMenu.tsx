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
        <li key={page.url}>
          {page.children ? (
            <>
              <button
                className="flex justify-between p-2 w-full whitespace-nowrap"
                onClick={() => toggleSection(page.text)}
              >
                {page.text}
                <ChevronRightIcon
                  className="transition-transform"
                  style={{ transform: collapsed.includes(page.text) ? 'rotate(90deg)' : undefined }}
                />
              </button>
              {!collapsed.includes(page.text) && (
                <ul className="ml-4">
                  {page.children?.map((child) => (
                    <li key={child.url}>
                      <Link
                        className={classNames('block p-2 rounded-md whitespace-nowrap', {
                          'bg-slate-800': pathname === child.url,
                          'font-bold': pathname === child.url,
                        })}
                        href={child.url}
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
              className={classNames('block p-2 rounded-md whitespace-nowrap', {
                'bg-slate-800': pathname === page.url,
                'font-bold': pathname === page.url,
              })}
              href={page.url}
            >
              {page.text}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
