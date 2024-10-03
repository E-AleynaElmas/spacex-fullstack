import React from "react";

export const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className = "",
  ...props
}) => (
  <svg
    className={className}
    width="9"
    height="14"
    viewBox="0 0 9 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.908809 6.56998L7.03911 0.441714C7.3081 0.1734 7.74391 0.1734 8.01359 0.441714C8.28258 0.710028 8.28258 1.14584 8.01359 1.41415L2.36954 7.05617L8.01291 12.6982C8.2819 12.9665 8.2819 13.4023 8.01291 13.6713C7.74391 13.9396 7.30742 13.9396 7.03843 13.6713L0.908129 7.54304C0.643211 7.2775 0.643212 6.83484 0.908809 6.56998Z"
      fill={props.color}
    />
  </svg>
);
