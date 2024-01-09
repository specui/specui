import { IIcon } from '@/interfaces/IIcon';
import { FC } from 'react';

export const SwiftIcon: FC<IIcon> = ({ color = 'white', size = 16 }) => (
  <svg
    version="1.1"
    id="Layer_1"
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
      d="M157.7,13.7c112.5,76.5,76.1,160.9,76.1,160.9s32,36.1,19.1,67.7c0,0-13.2-22.1-35.3-22.1
	c-21.3,0-33.9,22.1-76.8,22.1C45.2,242.3,0,162.5,0,162.5C86.1,219.1,144.9,179,144.9,179C106.1,156.5,23.6,48.7,23.6,48.7
	c71.9,61.2,102.9,77.3,102.9,77.3C108,110.7,56,35.8,56,35.8c41.6,42.1,124.3,100.9,124.3,100.9C203.7,71.7,157.7,13.7,157.7,13.7z"
    />
  </svg>
);
