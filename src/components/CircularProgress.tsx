// src/components/CircularProgress.tsx
import React, { useState, useEffect } from "react";

interface CircularProgressProps {
  percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = () => {
      start += 1;
      if (start <= percentage) {
        setProgress(start);
        requestAnimationFrame(step);
      }
    };
    step();
  }, [percentage]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width="120" height="120">
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#e5e5e5"
        strokeWidth="20"
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
