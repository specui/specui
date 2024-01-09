import { IIcon } from '@/interfaces/IIcon';
import { FC } from 'react';

export const KotlinIcon: FC<IIcon> = ({ color = 'white', size = 16 }) => (
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
    <polygon fill={color} points="256,256 0,256 0,0 256,0 128,127.9 	" />
  </svg>
);
