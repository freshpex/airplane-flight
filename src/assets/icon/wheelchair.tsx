import * as React from "react";

export interface WheelchairIconProps extends React.SVGProps<SVGSVGElement> {}

export const WheelchairIcon = React.forwardRef<
  SVGSVGElement,
  WheelchairIconProps
>(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-accessibility-icon lucide-accessibility ${className ?? ""}`}
    {...props}
  >
    <circle cx={16} cy={4} r={1} />
    <path d="m18 19 1-7-6 1" />
    <path d="m5 8 3-3 5.5 3-2.36 3.5" />
    <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
    <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
  </svg>
));

WheelchairIcon.displayName = "WheelchairIcon";
