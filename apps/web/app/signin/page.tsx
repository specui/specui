'use client';

import { signIn } from 'next-auth/react';

export default function SignInPage() {
  return (
    <main
      className="flex flex-col gap-4 items-center justify-center mx-auto"
      style={{ minHeight: 'calc(100vh - 97px)' }}
    >
      <h1 className="text-center text-7xl">
        Sign in to
        <br />
        SpecUI
      </h1>
      <p className="text-gray-400">Sign in or create an account to start generating code now.</p>
      <button
        className="bg-yellow-300 px-8 py-4 rounded text-black"
        onClick={() => signIn('github')}
      >
        Sign in with GitHub
      </button>
    </main>
  );
}
