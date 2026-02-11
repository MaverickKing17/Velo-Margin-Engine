
import React from 'react';

interface VibeScoreDialProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const VibeScoreDial: React.FC<VibeScoreDialProps> = ({ score, size = 'md' }) => {
  const getColor = () => {
    if (score >= 80) return '#10B981'; // Emerald
    if (score >= 50) return '#FBBF24'; // Amber
    return '#EF4444'; // Red
  };

  const getLabel = () => {
    if (score >= 80) return 'High Opportunity';
    if (score >= 50) return 'Good Opportunity';
    return 'Standard Listing';
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
            className="text-luxury-dark/30"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={getColor()}
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute font-bold font-display" style={{ color: getColor() }}>
          {score}
        </span>
      </div>
      {size === 'lg' && (
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: getColor() }}>
          {getLabel()}
        </span>
      )}
    </div>
  );
};

export default VibeScoreDial;
