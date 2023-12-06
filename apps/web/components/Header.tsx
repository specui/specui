'use client';

import { FC } from 'react';
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';

import { Menu } from '@/components/Menu';
import { User } from '@/components/User';

export const Header: FC = () => {
  return (
    <header className="bg-slate-950 border-b border-b-slate-900 sticky p-4 top-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-bold">
            <Link className="flex items-center gap-1" href="/">
              <img height="32" width="32" src="/logo.png" />
            </Link>
          </h1>
          <Menu />
        </div>
        <div className="flex gap-4 items-center">
          <SessionProvider>
            <User />
          </SessionProvider>
        </div>
      </div>
    </header>
  );
};
