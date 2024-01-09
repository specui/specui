import Link from 'next/link';

export const MoreFeature = () => {
  return (
    <div className="pb-32 px-4 mx-auto max-w-6xl">
      <h2 className="mb-2 text-4xl">Want to learn more?</h2>
      <p className="mb-8 text-gray-500 text-xl w-2/3">
        Check out the{' '}
        <Link
          className="text-white hover:text-blue-600"
          href="https://github.com/zappjs/zappjs"
          rel="noreferrer noopener"
          target="_blank"
        >
          source code
        </Link>{' '}
        and{' '}
        <Link
          className="text-white hover:text-blue-600"
          href="https://x.com/zappjs"
          rel="noreferrer noopener"
          target="_blank"
        >
          follow us on X
        </Link>
        !
      </p>
    </div>
  );
};
