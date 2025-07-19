import React from 'react';
import { Plane } from 'lucide-react';

interface LogoProps {
  width?: number | string;
  height?: number | string;
  startStopColor?: string;
  endStopColor?: string;
  textFill?: string;
  planeColor?: string;
}

const Logo: React.FC<LogoProps> = ({
  width = 200,
  height = 100,
  startStopColor = "#ffffff94",
  endStopColor = "#FFFFFF",
  textFill = "#FFFFFF",
  planeColor = "#1E3A8A"
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradB" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={startStopColor}/>
          <stop offset="100%" stopColor={endStopColor}/>
        </linearGradient>
      </defs>

      {/* Circle background */}
      <circle cx="60" cy="40" r="30" fill="url(#gradB)" />

      {/* Plane icon on top */}
      <g transform="translate(60 40) rotate(-20)">
        <Plane
          x={-20}
          y={-20}
          width={40}
          height={40}
          stroke={planeColor}
          fill="none"
          strokeWidth={2}
        />
      </g>

      {/* Wordmark */}
      <text
        x="110"
        y="55"
        fontFamily="Montserrat, sans-serif"
        fontSize="36"
        fontWeight="600"
        letterSpacing="0.05em"
        fill={textFill}
      >
        SkyWings
      </text>
    </svg>
  );
};

export default Logo;
