import { readFile } from 'fs/promises';
import { join } from 'path';
import ReactMarkdown from 'react-markdown';

import { DocsTemplate } from '@/templates/DocsTemplate';

async function getData() {
  const content = await readFile(join(process.cwd(), './docs/components/index.md'), 'utf8');
  return content;
}

export default async function Home() {
  const content = await getData();

  return (
    <DocsTemplate>
      <main className="prose">
        <ReactMarkdown className="flex flex-col gap-4">{content}</ReactMarkdown>
      </main>
    </DocsTemplate>
  );
}
