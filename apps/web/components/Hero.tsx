'use client';

import { FC } from 'react';

import { CodeSnippet } from '@/components/CodeSnippet';
import { Install } from '@/components/Install';
import Link from 'next/link';

const spec1 = `
name: my-app
title: My App
version: 1.0.0
pages:
  home:
    title: Home
    elements:
      - tag: div
        style:
          flex:
            direction: column
            items: center
            justify: center
        content:
          - tag: h1
            content: Hello World
          - tag: button
            content: Click me
            onClick:
              alert: 🎉
colors:
  primary: '#3b82f6'
styles:
  button:
    background:
      color: primary
    border:
      radius: 1rem
    padding: 2rem
  h1:
    font:
      size: 1.5rem
`;

export const Hero: FC = () => {
  return (
    <div className="flex flex-col gap-8 py-8">
      <h1 className="flex flex-col font-bold gap-2 text-center text-4xl md:text-7xl sm:text-6xl">
        <div>Build UIs with Specs.</div>
      </h1>
      <div className="flex justify-center gap-4">
        <Link
          className="bg-white border border-white px-4 py-2 rounded-xl text-black text-xs md:text-base sm:text-sm"
          href="/docs"
        >
          Get Started
        </Link>
        <Install />
      </div>
      <div className="px-4 mx-auto max-w-6xl w-full">
        <div className="gap-4 grid grid-cols-2">
          <CodeSnippet className="col-span-2 md:col-span-1" title="spec.yaml">
            {spec1}
          </CodeSnippet>
          <CodeSnippet className="col-span-2 md:col-span-1" title="Home | My App">
            <div className="h-full">
              <div className="flex flex-col gap-2 h-96 items-center justify-center">
                <h1 className="text-2xl">Hello World</h1>
                <button className="bg-blue-500 p-2 rounded-xl" onClick={() => alert('🎉')}>
                  Click me
                </button>
              </div>
            </div>
          </CodeSnippet>
        </div>
      </div>
    </div>
  );
};
