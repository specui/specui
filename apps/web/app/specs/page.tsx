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
      <ul className="flex flex-col justify-center mx-auto max-w-1/2">
        {specs.map((spec) => (
          <li key={spec.name}>
            <Link className="flex items-center gap-2" href={spec.url}>
              <NextIcon size={32} />
              {spec.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
