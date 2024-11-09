// CircularProgress.tsx
import React, { useState, useEffect } from "react";

interface CircularProgressProps {
  percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < percentage ? prev + 1 : percentage));
    }, 10);
    return () => clearInterval(interval);
  }, [percentage]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width="120" height="120" className="transform -rotate-90">
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#e5e5e5"
        strokeWidth="10"
        fill="none"
      />
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#4CAF50"
        strokeWidth="10"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-500"
      />
      <text
        x="60"
        y="65"
        textAnchor="middle"
        fontSize="18"
        fill="#333"
        fontWeight="bold"
      >
        {progress}%
      </text>
    </svg>
  );
};

export default CircularProgress;
