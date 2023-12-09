'use client';

import { motion } from 'framer-motion';
import { ArrowRightAlt, Check, ContentCopy, CopyAll } from '@mui/icons-material';
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
      <motion.main
        className="flex flex-col gap-4 align-middle items-center justify-center mx-auto p-4 md:gap-8 sm:gap-7"
        style={{ minHeight: 'calc(100vh - 65px)' }}
        initial={{
          opacity: 0,
          translateX: 200,
        }}
        animate={{
          opacity: 1,
          translateX: 0,
        }}
      >
        <h1 className="flex flex-col font-bold gap-2 text-center text-4xl md:text-7xl sm:text-6xl">
          <div>Explore</div>
        </h1>
        <h2 className="text-center text-gray-400 text-xs w-1/3 md:text-base sm:text-sm">
          Coming Soon
        </h2>
      </motion.main>
    </SessionProvider>
  );
}
