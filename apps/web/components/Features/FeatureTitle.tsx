import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export const FeatureTitle: FC<Props> = ({ children }) => (
  <h2 className="mb-2 text-4xl">{children}</h2>
);
