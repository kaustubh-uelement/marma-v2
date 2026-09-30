"use client";

interface DotConfig {
  cx: number;
  cy: number;
  rippleCount?: number;
  rippleBaseDelay?: number;
}

interface DecorativeLineProps {
  viewBox: string;
  points: string;
  dots: DotConfig[];
  strokeColor?: string;
  strokeWidth?: number;
  dotRadius?: number;
  animationDuration?: number;
  className?: string;
}

export default function DecorativeLine({
  viewBox,
  points,
  dots,
  strokeColor = "#D81E2C",
  strokeWidth = 1.5,
  dotRadius = 12,
  animationDuration = 2.5,
  className = "w-full h-auto",
}: DecorativeLineProps) {
  const RIPPLE_INTERVAL = 0.5;

  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
    >
      <defs>
        <style>{`
          @keyframes dl-ripple {
            0%   { transform: scale(1);  opacity: 0.30; }
            100% { transform: scale(5);  opacity: 0; }
          }
          .dl-ripple-ring {
            animation: dl-ripple 2.5s ease-out infinite;
            transform-box: fill-box;
            transform-origin: center;
          }
        `}</style>
      </defs>

      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />

      {dots.map((dot, i) => {
        const count = dot.rippleCount ?? 5;
        const baseDelay = dot.rippleBaseDelay ?? 0;

        return (
          <g key={i}>
            {Array.from({ length: count }).map((_, ringIdx) => (
              <circle
                key={ringIdx}
                cx={dot.cx}
                cy={dot.cy}
                r={dotRadius}
                fill={strokeColor}
                stroke="none"
                className="dl-ripple-ring"
                style={{
                  animationDelay: `${baseDelay + ringIdx * RIPPLE_INTERVAL}s`,
                  animationDuration: `${animationDuration}s`,
                }}
              />
            ))}
            <circle
              cx={dot.cx}
              cy={dot.cy}
              r={dotRadius * 0.75}
              fill={strokeColor}
            />
          </g>
        );
      })}
    </svg>
  );
}
