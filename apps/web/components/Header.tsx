import { FC } from 'react';
import Link from 'next/link';

import { ExternalLink } from '@/components/ExternalLink';
import { Menu } from '@/components/Menu';
import { GitHubIcon } from '@/icons/GitHubIcon';
import { XIcon } from '@/icons/XIcon';

export const Header: FC = () => {
  return (
    <header className="bg-slate-800 p-4">
      <div className="flex items-center justify-between">
        <h1>
          <Link href="/">Zapp</Link>
        </h1>
        <div className="flex gap-4 items-center">
          <Menu />
          <ExternalLink href="https://x.com/zappjs">
            <XIcon />
          </ExternalLink>
          <ExternalLink href="https://github.com/zappjs/zappjs">
            <GitHubIcon />
          </ExternalLink>
        </div>
      </div>
    </header>
  );
};
