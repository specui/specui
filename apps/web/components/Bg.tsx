import React from 'react';

const GeometricBackground = () => {
  const generateLines = (count = 0, isLeft = true) => {
    return Array.from({ length: count }, (_, i) => (
      <line
        key={`line-${isLeft ? 'left' : 'right'}-${i}`}
        x1={isLeft ? '0' : '1000'}
        y1="1000"
        x2="500"
        y2="0"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        className="animate-grid-line opacity-0"
        style={{
          animation: `
            gridLineMove 12s linear infinite,
            gridLineFade 12s linear infinite
          `,
          animationDelay: `${-i * 0.6}s`,
        }}
      />
    ));
  };

  return (
    <div className="fixed opacity-25 inset-0 -z-10 bg-white overflow-hidden dark:bg-black">
      <style>
        {`
          @keyframes gridLineMove {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(-100%);
            }
          }

          @keyframes gridLineFade {
            0% {
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }

          .animate-grid-line {
            transform-origin: top center;
          }
        `}
      </style>
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#00ffff', stopOpacity: 0 }} />
            <stop offset="50%" style={{ stopColor: '#00ffff', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: '#ff00ff', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* Left side lines */}
        <g>{generateLines(30, true)}</g>
        {/* Right side lines */}
        <g>{generateLines(30, false)}</g>
        {/* Horizontal cross lines */}
        <g>
          {Array.from({ length: 15 }, (_, i) => (
            <line
              key={`cross-${i}`}
              x1="0"
              y1="1000"
              x2="1000"
              y2="1000"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-grid-line opacity-0"
              style={{
                animation: `
                  gridLineMove 12s linear infinite,
                  gridLineFade 12s linear infinite
                `,
                animationDelay: `${-i * 0.75}s`,
              }}
            />
          ))}
        </g>
        {/* Center point */}
        <circle
          cx="500"
          cy="0"
          r="4"
          fill="#00ffff"
          style={{
            animation: 'pulse 6s ease-in-out infinite',
          }}
        />
      </svg>
    </div>
  );
};

export default GeometricBackground;
