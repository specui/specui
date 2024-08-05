import { readFile } from 'fs/promises';
import { join } from 'path';
import ReactMarkdown from 'react-markdown';

async function getData() {
  const content = await readFile(join(process.cwd(), './docs/plugins/npm.md'), 'utf8');
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
