'use client';

import { Logout as LogoutIcon } from '@mui/icons-material';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { FC } from 'react';

export const User: FC = () => {
  const { data: session } = useSession();

  return (
    <div className="flex gap-4">
      {session ? (
        <>
          <div className="flex gap-2">
            <div>
              <Image alt="User Avatar" height={24} width={24} src={session.user?.image!} />
            </div>
            <div>{session.user?.email}</div>
          </div>
          <button onClick={() => signOut()}>
            <LogoutIcon />
          </button>
        </>
      ) : (
        <button onClick={() => signIn('github')}>Sign In</button>
      )}
    </div>
  );
};
