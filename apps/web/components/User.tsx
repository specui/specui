'use client';

import { ExternalLinkIcon } from 'lucide-react';
import Image from 'next/image';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { ExternalLink } from './ExternalLink';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

function Content() {
  const { data: session } = useSession();
  const image = session?.user?.image;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex gap-4">
        {session ? (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <button className="flex gap-2 text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white">
                {image && (
                  <span>
                    <Image alt="User Avatar" height={24} width={24} src={image} />
                  </span>
                )}
                <span>{session.user?.email}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="flex w-48 flex-col p-0">
              <ExternalLink
                className="flex gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900"
                href={`https://github.com/${session.user?.email}`}
              >
                <span>GitHub Profile</span>
                <ExternalLinkIcon className="h-4 w-4" />
              </ExternalLink>
              <button
                className="border-t px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-900"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </PopoverContent>
          </Popover>
        ) : (
          <button
            className="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white"
            onClick={() => signIn('github')}
          >
            Sign In
          </button>
        )}
      </div>
    </>
  );
}

export function User() {
  return (
    <SessionProvider>
      <Content />
    </SessionProvider>
  );
}
