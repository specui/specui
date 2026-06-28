import ReactMarkdown from 'react-markdown';

export function Markdown({ children }: { children: string }) {
  return (
    <div className="flex flex-col gap-4">
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}
