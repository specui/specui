'use client';

import cn from '@/utils/cn';
import { FC, ReactNode, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

interface Tab {
  children?: ReactNode | string;
  icon?: ReactNode;
  title?: string;
}

interface Props {
  children?: ReactNode | string;
  className?: string;
  icon?: ReactNode;
  language?: string;
  tabs?: Tab[];
  title?: string;
}

export const CodeSnippet: FC<Props> = ({
  children,
  className,
  icon,
  language = 'yaml',
  title,
  tabs,
}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div
      className={cn('border border-gray-200 rounded-md text-white dark:border-gray-800', className)}
    >
      <div
        className={cn(
          `border-b border-gray-200 flex gap-2 items-center justify-center dark:border-gray-900`,
          {
            'p-x-3 p-t-3': Boolean(tabs),
            'p-3': !tabs,
          },
        )}
      >
        <div className="border border-gray-600 rounded-full w-3 h-3" />
        <div className="border border-gray-600 rounded-full w-3 h-3" />
        <div className="border border-gray-600 rounded-full w-3 h-3" />
        <div className="flex flex-grow gap-2 items-center justify-center text-center text-gray-500">
          {tabs ? (
            tabs.map((tab, i) => (
              <button
                className={cn(
                  'bg-black border-l border-r border-t flex gap-2 items-center rounded-t-md border-gray-600 p-3 -m-[1px]',
                  {
                    'border-b border-b-gray-900 -m-[2px]': selectedTabIndex !== i,
                    'text-white': selectedTabIndex === i,
                  },
                )}
                key={tab.title}
                onClick={() => setSelectedTabIndex(i)}
              >
                {tab.icon}
                {tab.title}
              </button>
            ))
          ) : (
            <>
              {icon}
              {title}
            </>
          )}
        </div>
        <div className="w-12" />
      </div>
      {typeof children === 'string' ? (
        <SyntaxHighlighter
          className="overflow-auto p-3 text-xs w-full"
          language={language}
          style={{
            'hljs-comment': {
              color: '#7e7887',
            },
            'hljs-quote': {
              color: '#7e7887',
            },
            'hljs-variable': {
              color: '#be4678',
            },
            'hljs-template-variable': {
              color: '#be4678',
            },
            'hljs-attribute': {
              color: '#be4678',
            },
            'hljs-regexp': {
              color: '#be4678',
            },
            'hljs-link': {
              color: '#be4678',
            },
            'hljs-tag': {
              color: '#be4678',
            },
            'hljs-name': {
              color: '#be4678',
            },
            'hljs-selector-id': {
              color: '#be4678',
            },
            'hljs-selector-class': {
              color: '#be4678',
            },
            'hljs-number': {
              color: 'rgb(var(--foreground-rgb)',
            },
            'hljs-meta': {
              color: '#aa573c',
            },
            'hljs-built_in': {
              color: '#aa573c',
            },
            'hljs-builtin-name': {
              color: '#aa573c',
            },
            'hljs-literal': {
              color: '#aa573c',
            },
            'hljs-type': {
              color: '#aa573c',
            },
            'hljs-params': {
              color: '#aa573c',
            },
            'hljs-string': {
              color: 'rgb(var(--foreground-rgb)',
            },
            'hljs-symbol': {
              color: '#2a9292',
            },
            'hljs-bullet': {
              color: '#2a9292',
            },
            'hljs-title': {
              color: '#576ddb',
            },
            'hljs-section': {
              color: '#576ddb',
            },
            'hljs-keyword': {
              color: '#955ae7',
            },
            'hljs-selector-tag': {
              color: '#955ae7',
            },
            'hljs-deletion': {
              color: '#19171c',
              display: 'inline-block',
              width: '100%',
              backgroundColor: '#be4678',
            },
            'hljs-addition': {
              color: '#19171c',
              display: 'inline-block',
              width: '100%',
              backgroundColor: '#2a9292',
            },
            hljs: {
              display: 'block',
              overflowX: 'auto',
              // background: 'black',
              color: 'gray',
              padding: '0.5em',
            },
            'hljs-emphasis': {
              fontStyle: 'italic',
            },
            'hljs-strong': {
              fontWeight: 'bold',
            },
          }}
        >
          {children.trim()}
        </SyntaxHighlighter>
      ) : (
        <div className="overflow-auto p-3 text-xs w-full">{children}</div>
      )}
    </div>
  );
};
