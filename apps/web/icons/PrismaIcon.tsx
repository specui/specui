import { FC } from 'react';

export const PrismaIcon: FC<{ color?: string; size?: number }> = ({
  color = 'white',
  size = 16,
}) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 256 256"
      enableBackground="new 0 0 256 256"
      xmlSpace="preserve"
      width={size}
      height={size}
    >
      <path
        fill={color}
        d="M232.6,195l-88-187c-2.2-4.7-6.8-7.8-12-8c-5.2-0.3-10.2,2.2-12.9,6.7L24.2,161.4c-3,4.8-2.9,10.8,0.2,15.5
     L71,249.2c3.6,5.6,10.5,8.1,16.9,6.2l135.5-40.1c4.1-1.2,7.5-4.1,9.3-8.1C234.5,203.4,234.4,198.9,232.6,195L232.6,195z
      M212.9,203.1l-115,34c-3.5,1-6.9-2-6.1-5.5l41.1-196.7c0.8-3.7,5.8-4.3,7.5-0.9l76,161.5c0.7,1.5,0.7,3.1,0,4.6
     C215.7,201.5,214.4,202.6,212.9,203.1L212.9,203.1z"
      />
    </svg>
  );
};
