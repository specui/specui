'use client';

import { FC } from 'react';

import { CodeSnippet } from '@/components/CodeSnippet';
import { Install } from '@/components/Install';
import Link from 'next/link';

const spec1 = `
app:
  name: my-app
  title: My App
  version: 1.0.0
pages:
  index:
    elements:
      - tag: section
        style:
          alignItems: center
          display: flex
          flexDirection: column
          justifyContent: center
          height: 100dvh
        elements:
          - tag: h1
            text: Hello World
          - tag: button
            text: Click me
            onClick:
              alert: 🎉
styles:
  body:
    backgroundColor: black
    color: white
    fontFamily: sans-serif
    margin: 0
  button:
    backgroundColor: '#3b82f6'
    border: none
    borderRadius: 1rem
    color: white
    cursor: pointer
    padding: 1rem
  h1:
    fontSize: 1.5rem
`;

export const Hero: FC = () => {
  return (
    <div className="flex flex-col gap-8 py-8">
      <h1 className="flex flex-col font-bold gap-2 text-center text-4xl md:text-7xl sm:text-6xl">
        <div>Build UIs with Specs.</div>
      </h1>
      <div className="flex justify-center gap-4">
        <Link
          className="bg-white border border-white flex items-center justify-center px-4 py-2 rounded-xl text-black text-xs md:text-base sm:text-sm"
          href="/playground"
        >
          Try It Online
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
