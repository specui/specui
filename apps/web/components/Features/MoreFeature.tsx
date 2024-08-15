import Link from 'next/link';
import { FeatureTitle } from './FeatureTitle';

export const MoreFeature = () => {
  return (
    <div className="pb-32 px-4 mx-auto max-w-6xl text-center">
      <FeatureTitle>Want to learn more?</FeatureTitle>
      <p className="flex items-center justify-center gap-4 mb-8 text-gray-500 text-xl w-full">
        <Link
          className="border border-black px-2 py-1 bottom-4 rounded-lg right-6 text-black dark:border-white dark:text-white"
          href="/playground"
        >
          Try It Online
        </Link>
        <Link href="/docs">Read the Docs</Link>
      </p>
    </div>
  );
};
