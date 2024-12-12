import React from 'react';

interface TimelineCursorProps {
  currentTime: number;
  duration: number;
}

export function TimelineCursor({ currentTime, duration }: TimelineCursorProps) {
  const position = (currentTime / duration) * 100;
  
  return (
    <div
      className="absolute top-0 bottom-0 w-px bg-red-500 pointer-events-none"
      style={{ left: `${position}%` }}
    >
      <div className="w-3 h-3 -ml-1.5 bg-red-500 transform rotate-45" />
    </div>
  );
}