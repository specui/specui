'use client';

import { DocsMenu } from '@/components/DocsMenu';

import styles from './layout.module.css';
import { useState } from 'react';

export interface DocsLayoutProps {
  children?: JSX.Element;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col mx-auto max-w-6xl md:flex-row">
      <div className="backdrop-blur-md bg-black bg-opacity-50 p-4 sticky top-[64px] md:hidden">
        <button onClick={() => setShow(!show)}>Table of Contents</button>
      </div>
      {show && (
        <div className="bg-black bottom-0 fixed h-dvh left-0 overflow-scroll right-0 top-0 md:hidden">
          <DocsMenu onSelect={() => setShow(false)} />
        </div>
      )}
      <div className="hidden md:block">
        <DocsMenu />
      </div>
      <div className="p-4 w-full md:w-3/4">
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
