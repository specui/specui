import { FC } from 'react';

export const CssIcon: FC<{ size?: number }> = ({ size = 16 }) => {
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
      <polygon
        fill="#2196F3"
        points="237.4,45.2 233.3,91.5 220.8,230.3 128,256 127.9,256 35.1,230.3 28.7,157.7 74.1,157.7 77.5,195.4 
	127.9,209 128,209 178.5,195.3 185.4,132.6 26.5,133 22,90.1 189.2,88.2 192.6,42.2 17.5,42.7 14.6,0 128,0 241.4,0 "
      />
    </svg>
  );
};
