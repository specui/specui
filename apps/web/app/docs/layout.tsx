import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import DocsLayoutClient from './client';

export interface DocsLayoutProps {
  children?: ReactNode;
}

export const metadata: Metadata = {
  title: 'Docs - SpecUI',
  description: 'Build UIs with Specs',
  openGraph: {
    images: ['https://specui.org/api/og?path=/docs'],
    title: 'Docs - SpecUI',
    url: 'https://specui.org/docs',
  },
};

export default function DocsLayout({ children }: DocsLayoutProps) {
  return <DocsLayoutClient>{children}</DocsLayoutClient>;
}
