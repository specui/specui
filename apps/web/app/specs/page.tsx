import type { Metadata } from 'next';
import Link from 'next/link';

import { NextIcon } from '@/icons/NextIcon';

export const metadata: Metadata = {
  title: 'Specs - SpecUI',
  description: 'Build UIs with Specs',
  openGraph: {
    images: ['https://specui.org/api/og?path=/specs'],
    title: 'Specs - SpecUI',
    url: 'https://specui.org/specs',
  },
};

const specs = [
  {
    name: 'Photography Website Example',
    url: '/playground/next/photography-website-example',
    generator: 'next',
  },
  {
    name: 'shadcn Accordion Example',
    url: '/playground/next/shadcn-accordion-example',
    generator: 'next',
  },
  {
    name: 'Spinning Loader Example',
    url: '/playground/next/spinning-loader-example',
    generator: 'next',
  },
  {
    name: 'Vercel Analytics Example',
    url: '/playground/next/vercel-analytics-example',
    generator: 'next',
  },
];

export default function SpecsPage() {
  return (
    <div className="flex flex-col gap-8 py-8" style={{ minHeight: 'calc(100vh - 97px)' }}>
      <h1 className="flex flex-col font-bold gap-2 text-center text-4xl md:text-7xl sm:text-6xl">
        <div>Specs</div>
      </h1>
      <ul className="grid grid-cols-1 gap-4 justify-center mx-auto max-w-1/2 md:grid-cols-2">
        {specs.map((spec) => (
          <li key={spec.name}>
            <a
              className="border border-gray-200 flex items-center gap-2 p-8 rounded-md dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
              href={spec.url}
            >
              <NextIcon size={64} />
              <div>
                <div>{spec.name}</div>
                <div className="text-gray-500">Next.js generator</div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
