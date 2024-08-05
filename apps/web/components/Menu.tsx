'use client';

import { MenuRounded } from '@mui/icons-material';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';

const pages = [
  {
    text: 'Docs',
    url: '/docs',
  },
  {
    text: 'Playground',
    url: '/playground',
  },
];

export const Menu: FC = () => {
  const pathname = usePathname();

  const [show, setShow] = useState(false);

  return (
    <>
      <button className="md:hidden" onClick={() => setShow(!show)}>
        <MenuRounded className="text-4xl xs:text-3xl sm:text-2xl" />
      </button>
      <ul
        className={clsx(
          'bg-slate-900 bottom-0 gap-8 items-center justify-center fixed left-0 right-0 text-6xl top-0 z-10 md:bg-transparent md:flex md:static md:text-base',
          show ? 'flex flex-col md:flex-row' : 'hidden',
        )}
      >
        {pages.map((page) => (
          <li
            className={clsx(
              'text-center',
              pathname.startsWith(page.url) ? 'text-blue-600' : 'text-gray-200 hover:text-white',
            )}
            key={page.url}
          >
            <Link href={page.url} onMouseUp={() => setShow(false)}>
              {page.text}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
