import { DocsMenu } from '@/components/DocsMenu';

import styles from './layout.module.css';

export interface DocsLayoutProps {
  children?: JSX.Element;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex mx-auto max-w-6xl">
      <div className="w-1/4">
        <DocsMenu />
      </div>
      <div className="p-4 w-3/4">
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
