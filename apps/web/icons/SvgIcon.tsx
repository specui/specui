import { FC } from 'react';

export const SvgIcon: FC<{ size?: number }> = ({ size = 16 }) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      enableBackground="new 0 0 512 512"
      xmlSpace="preserve"
      width={size}
      height={size}
    >
      <g id="SVG" transform="scale(2) translate(20,79)">
        <path
          fill="#FFB13B"
          d="M-7.5,49C-15.2,41.3-20,30.6-20,18.8c0-23.6,19.1-42.7,42.7-42.7c23.6,0,42.7,19.1,42.7,42.7h-25
			c0-9.8-7.9-17.7-17.7-17.7C12.9,1.2,5,9.1,5,18.8c0,4.9,2,9.3,5.2,12.5h0c3.2,3.2,5.9,4.1,12.5,5.2l0,0
			c11.8,1.2,22.4,4.8,30.2,12.5l0,0c7.7,7.7,12.5,18.4,12.5,30.2c0,23.6-19.1,42.7-42.7,42.7c-23.5,0-42.7-19.1-42.7-42.7H5
			c0,9.8,7.9,17.7,17.7,17.7c9.8,0,17.7-7.9,17.7-17.7c0-4.9-2-9.3-5.2-12.5h0c-3.2-3.2-7.8-4.3-12.5-5.2v0
			C11.2,59.7,0.2,56.7-7.5,49L-7.5,49L-7.5,49z"
        />
        <path
          fill="#FFB13B"
          d="M150.7-23.8l-30.2,145.7h-25L65.3-23.8h25L108,61.5l17.7-85.3H150.7z"
        />
        <path
          fill="#FFB13B"
          d="M193.3,36.5H236v42.7h0c0,23.6-19.1,42.7-42.7,42.7c-23.6,0-42.7-19.1-42.7-42.7l0,0V18.8h0
			c0-23.6,19.1-42.7,42.7-42.7c23.5,0,42.7,19.1,42.7,42.7h-25c0-9.7-7.9-17.7-17.7-17.7c-9.8,0-17.7,7.9-17.7,17.7v60.3l0,0
			c0,9.8,7.9,17.7,17.7,17.7c9.7,0,17.7-7.9,17.7-17.7v0V61.5h-17.7V36.5L193.3,36.5z"
        />
      </g>
    </svg>
  );
};
