'use client';

import { motion } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';

export default function Home() {
  const router = useRouter();

  const [isDone, setIsDone] = useState(false);

  const handleVanilla = (e: MouseEvent) => {
    e.preventDefault();

    setIsDone(true);

    setTimeout(() => {
      router.push('/playground');
    }, 500);
  };

  const handleNext = (e: MouseEvent) => {
    e.preventDefault();

    setIsDone(true);

    setTimeout(() => {
      router.push('/playground/next');
    }, 500);
  };

  const handleExplore = (e: MouseEvent) => {
    e.preventDefault();

    setIsDone(true);

    setTimeout(() => {
      router.push('/explore');
    }, 500);
  };

  return (
    <SessionProvider>
      <motion.main
        className="flex flex-col gap-4 align-middle items-center justify-center mx-auto p-4 md:gap-8 sm:gap-7"
        style={{ minHeight: 'calc(100vh - 97px)' }}
        initial={{
          opacity: 0,
          translateX: 200,
        }}
        animate={{
          opacity: isDone ? 0 : 1,
          translateX: isDone ? -200 : 0,
        }}
      >
        <h1 className="flex flex-col font-bold gap-2 text-center text-4xl md:text-7xl sm:text-6xl">
          <div>Create</div>
        </h1>
        <h2 className="text-center text-gray-400 text-xs w-1/3 md:text-base sm:text-sm">
          Choose a SpecUI code generator
        </h2>
        <div className="flex justify-center gap-4">
          <Link
            className="bg-white border border-white px-8 py-2 rounded-xl text-black text-xs md:text-base sm:text-sm"
            href="/playground"
            onClick={handleVanilla}
          >
            Vanilla
          </Link>
          <Link
            className="bg-black border border-white px-8 py-2 rounded-xl text-xs md:text-base sm:text-sm"
            href="/playground/next"
            onClick={handleNext}
          >
            Next.js
          </Link>
        </div>
        <p>
          Or browse{' '}
          <Link className="text-yellow-400" href="/explore" onClick={handleExplore}>
            existing projects
          </Link>
        </p>
      </motion.main>
    </SessionProvider>
  );
}
