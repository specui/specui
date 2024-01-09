import { IIcon } from '@/interfaces/IIcon';
import { FC } from 'react';

export const ScalaIcon: FC<IIcon> = ({ color = 'white', size = 16 }) => (
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
      d="M49.2,157.5v19.7c0,3.3,71.6,8.9,118.3,19.7l0,0c22.5-5.2,39.3-11.7,39.3-19.7l0,0v-19.7c0-8-16.7-14.5-39.3-19.7l0,0
		C120.8,148.7,49.2,154.2,49.2,157.5"
    />
    <path
      d="M49.2,78.8v19.7c0,3.3,71.6,8.9,118.3,19.7l0,0c22.5-5.2,39.3-11.7,39.3-19.7l0,0V78.8c0-8-16.7-14.5-39.3-19.7l0,0
		C120.8,69.9,49.2,75.5,49.2,78.8"
    />
    <path
      fill={color}
      d="M49.2,118.2v59.1c0-4.9,157.5-14.8,157.5-39.4l0,0V78.8C206.8,103.4,49.2,113.2,49.2,118.2"
    />
    <path
      fill={color}
      d="M49.2,39.4v59.1c0-4.9,157.5-14.8,157.5-39.4l0,0V0C206.8,24.6,49.2,34.5,49.2,39.4"
    />
    <path
      fill={color}
      d="M49.2,196.9V256c0-4.9,157.5-14.8,157.5-39.4l0,0v-59.1C206.8,182.2,49.2,192,49.2,196.9"
    />
  </svg>
);
