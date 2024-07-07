import Link from 'next/link';
import { FeatureTitle } from './FeatureTitle';

export const MoreFeature = () => {
  return (
    <div className="pb-32 px-4 mx-auto max-w-6xl">
      <FeatureTitle>Want to learn more?</FeatureTitle>
      <p className="mb-8 text-gray-500 text-xl w-full md:w-2/3">
        Check out the{' '}
        <Link
          className="text-white hover:text-blue-600"
          href="https://github.com/specui/specui"
          rel="noreferrer noopener"
          target="_blank"
        >
          source code
        </Link>
        .
      </p>
    </div>
  );
};
