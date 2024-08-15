import type { Metadata } from 'next';
import { readFile } from 'fs/promises';
import { join } from 'path';
import ReactMarkdown from 'react-markdown';

export const metadata: Metadata = {
  title: 'Docs - SpecUI',
  description: 'Build UIs with Specs',
  openGraph: {
    images: ['https://specui.org/api/og?path=/docs'],
    title: 'Docs - SpecUI',
    url: 'https://specui.org/docs',
  },
};

async function getData() {
  const content = await readFile(join(process.cwd(), './docs/overview.md'), 'utf8');
  return content;
}

export default async function Home() {
  const content = await getData();

  return (
    <main className="prose">
      <ReactMarkdown className="flex flex-col gap-4">{content}</ReactMarkdown>
    </main>
  );
}
