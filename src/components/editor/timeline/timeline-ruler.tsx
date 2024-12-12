import React from 'react';

interface TimelineRulerProps {
  duration: number;
  zoom: number;
}

export function TimelineRuler({ duration, zoom }: TimelineRulerProps) {
  const markers = [];
  const step = 1; // 1 second intervals
  const pixelsPerSecond = 100 * zoom;

  for (let time = 0; time <= duration; time += step) {
    const position = time * pixelsPerSecond;
    markers.push(
      <div
        key={time}
        className="absolute top-0 h-4 border-l border-gray-600"
        style={{ left: `${position}px` }}
      >
        <span className="text-xs text-gray-400 ml-1">
          {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
        </span>
      </div>
    );
  }

  return (
    <div className="h-6 bg-gray-800 border-b border-gray-700 relative">
      {markers}
    </div>
  );
}