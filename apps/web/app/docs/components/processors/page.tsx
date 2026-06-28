import { readFile } from 'fs/promises';
import { join } from 'path';
import { Markdown } from '@/components/Markdown';

async function getData() {
  const content = await readFile(join(process.cwd(), './docs/components/processors.md'), 'utf8');
  return content;
}

export default async function Home() {
  const content = await getData();

  return (
    <main className="prose">
      <Markdown>{content}</Markdown>
    </main>
  );
}
