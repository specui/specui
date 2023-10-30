import { FC } from "react";

export const XIcon: FC<{ color?: string; size?: number }> = ({
  color = "white",
  size = 16,
}) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 300 300.2"
      enableBackground="new 0 0 300 300.2"
      xmlSpace="preserve"
      width={size}
      height={size}
    >
      <path
        fill={color}
        d="M236,14.6h46l-101,115l118,156h-92.6l-72.5-94.8l-83,94.8h-46l107-123l-113-148h94.9l65.5,86.6L236,14.6z
	 M219.9,258.6h25.5l-165-218H53L219.9,258.6z"
      />
    </svg>
  );
};
