import { FC, ReactNode } from 'react';

export const ExternalLink: FC<{ children?: ReactNode; className?: string; href?: string }> = ({
  children,
  className,
  href,
}) => {
  return (
    <a className={className} href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
};
