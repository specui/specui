import { FC } from 'react';

import { Install } from '@/components/Install';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Hero: FC = () => {
  return (
    <div
      className="flex flex-col gap-4 align-middle items-center justify-center mx-auto p-4 md:gap-8 sm:gap-7"
      style={{ minHeight: 'calc(100vh - 97px)' }}
    >
      <h1 className="flex flex-col font-bold gap-2 text-center text-4xl md:text-7xl sm:text-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
        >
          Stop writing
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.15 }}
        >
          redundant code.
        </motion.div>
      </h1>
      <motion.h2
        className="text-center text-gray-500 w-3/4 lg:w-1/2 md:w-2/3 text-md md:text-xl sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.15 }}
      >
        A spec-driven code generator that keeps your codebase consistent and{' '}
        <span className="whitespace-nowrap">up-to-date</span>, so you can focus writing the code
        that sets your app apart.
      </motion.h2>
      <motion.div
        className="flex justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Link
          className="bg-white border border-white px-8 py-2 rounded-sm text-black text-xs md:text-base sm:text-sm"
          href="/docs"
        >
          Get Started
        </Link>
        <Link
          className="border border-white px-8 py-2 rounded-sm text-white text-xs md:text-base sm:text-sm"
          href="https://github.com/zappjs/zappjs"
          rel="noreferrer noopener"
          target="_blank"
        >
          GitHub
        </Link>
      </motion.div>
      <Install />
    </div>
  );
};
