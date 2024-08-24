import { FC } from 'react';
import Link from 'next/link';

import { Logo } from '@/components/Logo';
import { Menu } from '@/components/Menu';
import { Stargazers } from '@/components/Stargazers';
import { User } from './User';

export const Header: FC = () => (
  <header className="backdrop-blur-md bg-white bg-opacity-50 border-b border-b-gray-100 sticky top-0 z-10 dark:bg-black dark:border-b-gray-900">
    <div className="flex justify-between gap-8 px-4 h-[64px] md:items-center">
      <div className="flex items-center gap-4">
        <h1 className="font-bold">
          <Link className="flex items-center gap-1" href="/" aria-label="Go back to homepage">
            <Logo size={32} />
            <span>SpecUI</span>
          </Link>
        </h1>
      </div>
      <div className="flex justify-between gap-4 items-center md:flex-grow">
        <Menu />
        <div className="gap-4 hidden items-center md:flex">
          <Link
            className="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white"
            href="/docs"
          >
            Docs
          </Link>
          <User />
          <Stargazers owner="specui" repo="specui" />
        </div>
      </div>
    </div>
  </header>
);
