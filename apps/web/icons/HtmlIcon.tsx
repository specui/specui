import { FC } from 'react';

export const HtmlIcon: FC<{ size?: number }> = ({ size = 16 }) => {
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
        fill="#FF7816"
        d="M229.1,42.9H70l3.9,53.7h151.4l-9.2,130L128,256l-88-29.4l-3-43.4h42.9l0.9,11.8l47.2,15.7l47.2-15.7l3.9-55.5
	H33.7L23.9,0h208.3L229.1,42.9z"
      />
    </svg>
  );
};
