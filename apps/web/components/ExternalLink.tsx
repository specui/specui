import { FC, ReactNode } from 'react';

export const ExternalLink: FC<{ children?: ReactNode; href?: string }> = ({ children, href }) => {
  return (
    <a href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
};
