'use client';

import { Check, ContentCopy, CopyAll } from '@mui/icons-material';
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    setIsCopied(true);

    await navigator.clipboard.writeText('npx create-zapp-app@latest');

    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <SessionProvider>
      <main
        className="flex flex-col gap-4 align-middle justify-center mx-auto p-4 md:gap-8 sm:gap-7"
        style={{ minHeight: 'calc(100vh - 65px)' }}
      >
        <h1 className="flex flex-col font-bold gap-2 text-center text-4xl md:text-7xl sm:text-6xl">
          <div>Lightning-fast</div>
          <div>code generation</div>
        </h1>
        <h2 className="text-center text-gray-400 text-xs md:text-base sm:text-sm">
          ZappJS is a continuous, spec-driven code generator.
        </h2>
        <div className="flex justify-center gap-4">
          <Link
            className="bg-white border border-white px-8 py-2 rounded-xl text-black text-xs md:text-base sm:text-sm"
            href="/playground"
          >
            Try It Online
          </Link>
          <Link
            className="bg-black border border-white px-8 py-2 rounded-xl text-xs md:text-base sm:text-sm"
            href="/docs"
          >
            Learn Zapp
          </Link>
        </div>
        <button
          className="cursor-pointer flex gap-2 justify-center text-gray-600 mt-4"
          onClick={handleCopy}
        >
          npx create-zapp-app@latest
          {isCopied ? <Check /> : <ContentCopy />}
        </button>
      </main>
    </SessionProvider>
  );
}
