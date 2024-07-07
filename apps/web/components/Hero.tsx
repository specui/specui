'use client';

import { FC } from 'react';

import { CodeSnippet } from '@/components/CodeSnippet';
import { Install } from '@/components/Install';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { JsIcon } from '@/icons/JsIcon';
import { ReactIcon } from '@/icons/ReactIcon';
import { VueIcon } from '@/icons/VueIcon';
import { AngularIcon } from '@/icons/AngularIcon';

const spec1 = `
name: my-app
title: My App
version: 1.0.0
pages:
  home:
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
      size: 2xl
`;

export const Hero: FC = () => {
  return (
    <div className="flex flex-col gap-8 py-8">
      <h1 className="flex flex-col font-bold gap-2 text-center text-4xl md:text-7xl sm:text-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
        >
          Write Specs to build UIs.
        </motion.div>
      </h1>
      <div className="pb-32 px-4 mx-auto max-w-6xl w-full">
        <div className="gap-4 grid grid-cols-2">
          <CodeSnippet className="col-span-2 md:col-span-1" title="spec.yaml">
            {spec1}
          </CodeSnippet>
          <CodeSnippet
            className="col-span-2 md:col-span-1"
            tabs={[
              {
                icon: <ReactIcon />,
                title: 'React',
              },
              {
                icon: <VueIcon />,
                title: 'Vue',
              },
              {
                icon: <AngularIcon />,
                title: 'Angular',
              },
              {
                icon: <JsIcon color="white" />,
                title: 'Vanilla JS',
              },
            ]}
          >
            <div className="h-full">
              <div className="flex flex-col gap-2 h-96 items-center justify-center">
                <h1 className="text-2xl">Hello World</h1>
                <button className="bg-blue-500 p-2 rounded-xl">Click me</button>
              </div>
            </div>
          </CodeSnippet>
        </div>
      </div>
      <motion.div
        className="flex justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Link
          className="bg-white border border-white px-8 py-2 rounded-sm text-black text-xs md:text-base sm:text-sm"
          href="/docs"
        >
          Get Started
        </Link>
        <Link
          className="border border-white px-8 py-2 rounded-sm text-white text-xs md:text-base sm:text-sm"
          href="https://github.com/specui/specui"
          rel="noreferrer noopener"
          target="_blank"
        >
          GitHub
        </Link>
      </motion.div>
      <div className="text-center">
        <Install />
      </div>
    </div>
  );
};
