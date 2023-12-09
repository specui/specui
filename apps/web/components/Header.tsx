'use client';

import { motion } from 'framer-motion';
import { FC } from 'react';
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu } from '@/components/Menu';
import { User } from '@/components/User';

export const Header: FC = () => {
  const pathname = usePathname();

  return (
    <header className="bg-slate-950 border-b border-b-slate-900 sticky p-4 top-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-bold">
            <Link className="flex items-center gap-1" href="/">
              <img height="32" width="32" src="/logo.png" />
            </Link>
          </h1>
          <motion.div
            className="overflow-hidden text-yellow-300 whitespace-nowrap"
            initial={{ width: 0 }}
            animate={{ width: pathname.startsWith('/playground') ? 'auto' : 0 }}
            transition={{ duration: .25 }}
          >
            Untitled
          </motion.div>
          <motion.div
            className="overflow-hidden text-gray-500 whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: pathname === '/playground' ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            |
          </motion.div>
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
