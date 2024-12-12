import React from 'react';
import type { Clip } from './timeline';
import { useDraggable } from '@/hooks/use-draggable';

interface TrackClipProps {
  clip: Clip;
  zoom: number;
  onUpdate: (updates: Partial<Clip>) => void;
}

export function TrackClip({ clip, zoom, onUpdate }: TrackClipProps) {
  const { startTime, duration } = clip;
  const pixelsPerSecond = 100 * zoom;
  
  const { isDragging, handleMouseDown } = useDraggable({
    onDrag: (dx) => {
      const timeDelta = dx / pixelsPerSecond;
      onUpdate({ startTime: Math.max(0, startTime + timeDelta) });
    },
  });

  return (
    <div
      className={cn(
        "absolute top-1 bottom-1 bg-blue-600 rounded cursor-move",
        "hover:brightness-110 transition-all",
        isDragging && "opacity-75"
      )}
      style={{
        left: `${startTime * pixelsPerSecond}px`,
        width: `${duration * pixelsPerSecond}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="p-1 text-xs text-white truncate">
        {clip.content.name || 'Clip'}
      </div>
    </div>
  );
}