import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export const FeatureDescription: FC<Props> = ({ children }) => (
  <p className="mb-8 text-gray-500 text-xl w-full md:w-2/3">{children}</p>
);
