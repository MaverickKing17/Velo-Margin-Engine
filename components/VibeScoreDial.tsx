
import React from 'react';

interface VibeScoreDialProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const VibeScoreDial: React.FC<VibeScoreDialProps> = ({ score, size = 'md' }) => {
  const getColor = () => {
    if (score >= 80) return '#FFD700'; // Electric Gold
    if (score >= 50) return '#50C878'; // Emerald Green
    return '#E30613'; // Brembo Red
  };

  const sizes = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-24 h-24 text-lg'
  };

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative flex items-center justify-center ${sizes[size]}`}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-white/10"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={getColor()}
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute font-mono font-black text-white" style={{ fontSize: size === 'sm' ? '10px' : '14px' }}>
          {score}
        </span>
      </div>
    </div>
  );
};

export default VibeScoreDial;