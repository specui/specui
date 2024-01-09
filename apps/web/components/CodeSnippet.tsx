import { FC, ReactNode } from 'react';

interface Props {
  children?: string;
  className?: string;
  title?: string;
}

export const CodeSnippet: FC<Props> = ({ children, className, title }) => {
  return (
    <div className={`border border-gray-800 overflow-auto rounded-md text-white ${className}`}>
      <div className="border-b border-gray-900 flex gap-2 items-center justify-center p-3">
        <div className="border border-gray-600 rounded-full w-3 h-3" />
        <div className="border border-gray-600 rounded-full w-3 h-3" />
        <div className="border border-gray-600 rounded-full w-3 h-3" />
        <div className="flex-grow text-center text-gray-500">{title}</div>
        <div className="w-12" />
      </div>
      <pre className="p-3 text-xs w-full h-full">{children?.trim()}</pre>
    </div>
  );
};
