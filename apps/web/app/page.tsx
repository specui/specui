'use client';

import { ArrowRightAlt, Check, ContentCopy, CopyAll } from '@mui/icons-material';
import { motion } from 'framer-motion';
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
        className="flex flex-col gap-4 align-middle items-center justify-center mx-auto p-4 md:gap-8 sm:gap-7"
        style={{ minHeight: 'calc(100vh - 65px)' }}
      >
        <h1 className="flex flex-col font-bold gap-2 text-center text-4xl md:text-7xl sm:text-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            Lightning-fast
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.15 }}
          >
            code generation
          </motion.div>
        </h1>
        {/* <h2 className="relative text-gray-400 text-xs w-1/3 md:text-base sm:text-sm">
          <input className="px-6 py-2 rounded-full w-full" placeholder="What do you want to build?" type="text" />
          <button className="absolute right-3 top-1.5">
            <ArrowRightAlt />
          </button>
        </h2> */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: .5 }}
        >
          <Link
            className="bg-white border border-white px-8 py-2 rounded-xl text-black text-xs md:text-base sm:text-sm"
            href="/create"
          >
            Create Project
          </Link>
          <Link
            className="bg-black border border-white px-8 py-2 rounded-xl text-xs md:text-base sm:text-sm"
            href="/explore"
          >
            Explore Projects
          </Link>
        </motion.div>
        <motion.button
          className="cursor-pointer flex gap-2 justify-center text-gray-600 mt-4"
          onClick={handleCopy}
          initial={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: .5, duration: .5 }}
        >
          npx create-zapp-app@latest
          {isCopied ? <Check /> : <ContentCopy />}
        </motion.button>
      </main>
    </SessionProvider>
  );
}
