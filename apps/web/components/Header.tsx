import { GitHub } from '@mui/icons-material';
import { FC } from 'react';
import Link from 'next/link';

import { Logo } from '@/components/Logo';
import { Menu } from '@/components/Menu';

export const Header: FC = () => (
  <header className="backdrop-blur-md bg-white bg-opacity-50 border-b border-b-gray-100 sticky top-0 z-10 dark:bg-black dark:border-b-gray-900">
    <div className="flex items-center gap-8 px-4 h-[64px]">
      <div className="flex items-center gap-4">
        <h1 className="font-bold">
          <Link className="flex items-center gap-1" href="/" aria-label="Go back to homepage">
            <Logo size={32} />
            <span>SpecUI</span>
          </Link>
        </h1>
      </div>
      <div className="flex flex-grow justify-between gap-4 items-center">
        <Menu />
        <div className="flex gap-4 items-center">
          <Link href="/docs">Docs</Link>
          <Link
            className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded-md"
            href="/playground"
          >
            Playground
          </Link>
          <Link href="https://github.com/specui/specui" rel="noreferrer noopener" target="_blank">
            <GitHub />
          </Link>
        </div>
      </div>
    </div>
  </header>
);
