'use client';

import { Check, ContentCopy, CopyAll } from '@mui/icons-material';
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
    <main
      className="flex flex-col align-middle justify-center mx-auto"
      style={{ minHeight: 'calc(100vh - 65px)' }}
    >
      <h1 className="flex flex-col font-bold gap-4 text-center mb-12 text-2xl sm:text-4xl md:text-6xl">
        <div>The best way to</div>
        <div>keep your code consistent</div>
        <div>and up-to-date</div>
      </h1>
      <h2 className="text-center text-gray-400 mb-12 text-md sm:text-lg md:text-xl">
        ZappJS is the most robust code generator in the world
      </h2>
      <div className="flex justify-center gap-4">
        <Link
          className="bg-white border border-white px-8 py-2 rounded-xl text-black"
          href="/playground"
        >
          Try It Online
        </Link>
        <Link className="bg-black border border-white px-8 py-2 rounded-xl" href="/docs">
          Learn Zapp
        </Link>
      </div>
      <button
        className="cursor-pointer flex gap-2 justify-center text-gray-600 mt-4"
        onClick={handleCopy}
      >
        {/* npx create-zapp-app@latest
        {isCopied ? <Check /> : <ContentCopy />} */}
        License: MIT
      </button>
    </main>
  );
}
