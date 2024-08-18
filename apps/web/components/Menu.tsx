'use client';

import { GitHub, MenuRounded } from '@mui/icons-material';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Stargazers } from './Stargazers';

const pages = [
  {
    text: 'Features',
    url: '/features',
  },
  {
    text: 'Specs',
    url: '/specs',
  },
  {
    text: 'Generators',
    url: '/generators',
  },
];

export function Menu() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="md:hidden" onClick={() => setShow(!show)}>
        <MenuRounded className="text-4xl xs:text-3xl sm:text-2xl" />
      </button>
      <ul className="gap-4 hidden md:flex">
        <MenuContent />
      </ul>
      <MobileMenu onSelect={() => setShow(!show)} show={show} />
    </>
  );
}

function MenuContent({ onSelect }: { onSelect?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {pages.map((page) => (
        <li
          className={clsx(
            'text-center',
            pathname === page.url
              ? 'text-black dark:text-white'
              : 'text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white',
          )}
          key={page.url}
        >
          <Link href={page.url} onClick={onSelect}>
            {page.text}
          </Link>
        </li>
      ))}
    </>
  );
}

function MobileMenu({ onSelect, show }: { onSelect?: () => void; show: boolean }) {
  const pathname = usePathname();

  if (!show) {
    return null;
  }

  return createPortal(
    <>
      <ul className="backdrop-blur-2xl bg-white bg-opacity-50 bottom-0 flex flex-col fixed gap-4 justify-center items-center left-0 right-0 text-4xl text-white top-0 md:hidden z-10 dark:bg-black dark:text-white">
        <Link
          className={clsx(
            'text-center',
            pathname === '/'
              ? 'text-black dark:text-white'
              : 'text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white',
          )}
          href="/"
          onClick={onSelect}
        >
          Home
        </Link>
        <MenuContent onSelect={onSelect} />
        <Link
          className={clsx(
            'text-center',
            pathname === '/docs'
              ? 'text-black dark:text-white'
              : 'text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white',
          )}
          href="/docs"
          onClick={onSelect}
        >
          Docs
        </Link>
        <Link
          className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded-md"
          href="/playground"
          onClick={onSelect}
        >
          Playground
        </Link>
        <Stargazers owner="specui" repo="specui" />
      </ul>
    </>,
    document.body,
  );
}
