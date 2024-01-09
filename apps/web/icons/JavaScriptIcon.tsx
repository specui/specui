import { IIcon } from '@/interfaces/IIcon';
import { FC } from 'react';

export const JavaScriptIcon: FC<IIcon> = ({ color = 'white', size = 16 }) => (
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
      d="M0,185.5l29.7-18c5.7,10.2,10.9,18.8,23.5,18.8c12,0,19.6-4.7,19.6-22.9V39.2h36.5v124.6
	c0,37.8-22.2,55-54.5,55C25.5,218.8,8.6,203.7,0,185.5"
    />
    <path
      fill={color}
      d="M129,181.6l29.7-17.2c7.8,12.8,18,22.2,36,22.2c15.1,0,24.8-7.6,24.8-18c0-12.5-9.9-16.9-26.6-24.2l-9.1-3.9
	c-26.3-11.2-43.8-25.3-43.8-55c0-27.4,20.9-48.2,53.4-48.2c23.2,0,39.9,8.1,51.9,29.2l-28.4,18.2c-6.3-11.2-13-15.6-23.5-15.6
	c-10.7,0-17.5,6.8-17.5,15.6c0,10.9,6.8,15.4,22.4,22.2l9.1,3.9c31,13.3,48.5,26.8,48.5,57.3c0,32.8-25.8,50.8-60.5,50.8
	C161.6,218.8,139.7,202.7,129,181.6"
    />
  </svg>
);
