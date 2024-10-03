import React from "react";

export const FilterIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className = "",
  ...props
}) => (
  <svg
    width="17"
    height="18"
    viewBox="0 0 17 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6.6153 8.78506C6.78879 8.97385 6.88403 9.22047 6.88403 9.4756V16.9933C6.88403 17.4457 7.43 17.6753 7.75316 17.3572L9.85028 14.954C10.1309 14.6172 10.2857 14.4505 10.2857 14.1172V9.4773C10.2857 9.22217 10.3826 8.97555 10.5544 8.78674L16.5719 2.25727C17.0227 1.76743 16.6757 0.973145 16.009 0.973145H1.16072C0.493996 0.973145 0.145326 1.76573 0.597747 2.25727L6.6153 8.78506Z"
      fill={props.color}
    />
  </svg>
);
