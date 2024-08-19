'use client';

import { OpenInNew } from '@mui/icons-material';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import { Popover } from './Popover';
import { ExternalLink } from './ExternalLink';

function Content() {
  const { data: session } = useSession();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex gap-4">
        {session ? (
          <button
            className="flex gap-2 text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white"
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="User Avatar" height={24} width={24} src={session.user?.image!} />
            </span>
            <span>{session.user?.email}</span>
          </button>
        ) : (
          <button
            className="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white"
            onClick={() => signIn('github')}
          >
            Sign In
          </button>
        )}
      </div>
      <Popover isOpen={isOpen} onClose={() => setIsOpen(false)} target={buttonRef}>
        <ExternalLink
          className="flex gap-2 px-4 py-2"
          href={`https://github.com/${session?.user?.email}`}
        >
          <span>GitHub Profile</span>
          <OpenInNew />
        </ExternalLink>
        <button className="border-t px-4 py-2 text-left" onClick={() => signOut()}>
          Sign Out
        </button>
      </Popover>
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
