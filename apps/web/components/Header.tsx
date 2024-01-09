import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Menu } from '@/components/Menu';
import { GitHubIcon } from '@/icons/GitHubIcon';

export const Header: FC = () => (
  <header className="backdrop-blur-lg bg-black bg-opacity-50 border-b border-b-gray-900 sticky top-0">
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <h1 className="font-bold">
          <Link className="flex items-center gap-1" href="/" aria-label="Go back to homepage">
            <Image alt="ZappJS Logo" height="32" width="32" src="/logo.png" />
            <span>ZappJS</span>
          </Link>
        </h1>
      </div>
      <div className="flex gap-8 items-center">
        <Menu />
        <Link href="https://github.com/zappjs/zappjs" rel="noreferrer noopener" target="_blank">
          <GitHubIcon size={24} />
        </Link>
      </div>
    </div>
  </header>
);
