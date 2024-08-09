import { FC } from 'react';

export const NpmIcon: FC<{ color?: string; size?: number }> = ({
  color = '#FFDF00',
  size = 16,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMidYMid"
    >
      <polygon fill="#C12127" points="0 256 0 0 256 0 256 256" />
      <polygon fill="#FFFFFF" points="48 48 208 48 208 208 176 208 176 80 128 80 128 208 48 208" />
    </svg>
  );
};
