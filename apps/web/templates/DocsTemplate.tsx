import { DocsMenu } from '@/components/DocsMenu';
import { FC, ReactNode } from 'react';

export const DocsTemplate: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-1/3">
        <DocsMenu />
      </div>
      <div className="p-4 w-2/3">{children}</div>
    </div>
  );
};
