import { DocsMenu } from '@/components/DocsMenu';
import { FC, ReactNode } from 'react';

import styles from './DocsTemplate.module.css';

export const DocsTemplate: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex mx-auto max-w-6xl">
      <div className="w-1/3">
        <DocsMenu />
      </div>
      <div className="p-4 w-2/3">
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
