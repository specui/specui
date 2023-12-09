import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      className="flex flex-col gap-2 items-center justify-center mx-auto"
      style={{ minHeight: 'calc(100vh - 97px)' }}
    >
      <h2 className="text-4xl">Not Found</h2>
      <p className="text-gray-400">
        Go back{' '}
        <Link className="text-yellow-300" href="/">
          home
        </Link>
      </p>
    </main>
  );
}
