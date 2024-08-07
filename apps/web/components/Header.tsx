import { GitHub } from '@mui/icons-material';
import { FC } from 'react';
import Link from 'next/link';

import { Logo } from '@/components/Logo';
import { Menu } from '@/components/Menu';

export const Header: FC = () => (
  <header className="backdrop-blur-md bg-white bg-opacity-50 border-b border-b-gray-100 sticky top-0 dark:bg-black dark:border-b-gray-900">
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <h1 className="font-bold">
          <Link className="flex items-center gap-1" href="/" aria-label="Go back to homepage">
            <Logo size={32} />
            <span>SpecUI</span>
          </Link>
        </h1>
      </div>
      <div className="flex gap-8 items-center">
        <Menu />
        <Link href="https://github.com/specui/specui" rel="noreferrer noopener" target="_blank">
          <GitHub />
        </Link>
      </div>
    </div>
  </header>
);
