'use client';

import { GitHub, StarOutline } from '@mui/icons-material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { getStargazersWithCache } from '@/utils/getStargazersWithCache';

export interface StargazersProps {
  owner: string;
  repo: string;
}

export function Stargazers({ owner, repo }: StargazersProps) {
  const [stargazers, setStargazers] = useState<number | null>();

  useEffect(() => {
    const loadStargazers = async () => {
      try {
        const count = await getStargazersWithCache(owner, repo);
        setStargazers(count);
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    loadStargazers();
  }, [owner, repo]);

  return (
    <Link
      className="border border-gray-300 flex gap-2 px-2 py-1 rounded-md hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600"
      href="https://github.com/specui/specui"
      rel="noreferrer noopener"
      target="_blank"
    >
      <div className="border-r border-r-gray-300 flex gap-1 items-center pr-2 dark:border-r-gray-700">
        <StarOutline />
        {stargazers ? (
          <div className="text-sm">{stargazers}</div>
        ) : (
          <div className="animate-pulse bg-gray-300 rounded-2xl text-sm text-transparent dark:bg-gray-700">
            215
          </div>
        )}
      </div>
      <GitHub />
    </Link>
  );
}
