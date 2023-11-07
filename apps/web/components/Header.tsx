import { FC } from 'react';
import Link from 'next/link';

import { ExternalLink } from '@/components/ExternalLink';
import { Menu } from '@/components/Menu';
import { GitHubIcon } from '@/icons/GitHubIcon';
import { XIcon } from '@/icons/XIcon';

export const Header: FC = () => {
  return (
    <header className="bg-slate-950 border-b border-b-slate-900 sticky p-4 top-0">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">
          <Link className="flex items-center gap-1" href="/">
            <img height="32" width="32" src="/logo.png" />
            ZappJS
          </Link>
        </h1>
        <div className="flex gap-4 items-center">
          <Menu />
          <ExternalLink href="https://github.com/zappjs/zappjs">
            <GitHubIcon />
          </ExternalLink>
          <ExternalLink href="https://x.com/zappjs">
            <XIcon />
          </ExternalLink>
        </div>
      </div>
    </header>
  );
};
