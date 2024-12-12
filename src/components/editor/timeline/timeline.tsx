import React, { useRef, useState } from 'react';
import { TimelineRuler } from './timeline-ruler';
import { TimelineTracks } from './timeline-tracks';
import { TimelineCursor } from './timeline-cursor';
import { useTimelineState } from '@/hooks/use-timeline-state';
import { cn } from '@/lib/utils';

export interface Track {
  id: string;
  type: 'video' | 'text' | 'audio';
  name: string;
  clips: Clip[];
}

export interface Clip {
  id: string;
  startTime: number;
  duration: number;
  content: any; // Type depends on track type
}

export function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const {
    tracks,
    currentTime,
    zoom,
    duration,
    setCurrentTime,
    addTrack,
    removeTrack,
    updateClip,
  } = useTimelineState();

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    setCurrentTime(Math.max(0, Math.min(newTime, duration)));
  };

  return (
    <div className="h-48 bg-gray-900 border-t border-gray-700">
      <div className="flex flex-col h-full">
        <div className="p-2 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-200">Timeline</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => addTrack('video')}
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Track
            </button>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-24"
            />
          </div>
        </div>
        
        <div 
          ref={timelineRef}
          className="relative flex-1 overflow-hidden"
          onClick={handleTimelineClick}
        >
          <TimelineRuler duration={duration} zoom={zoom} />
          <TimelineTracks
            tracks={tracks}
            currentTime={currentTime}
            zoom={zoom}
            onUpdateClip={updateClip}
            onRemoveTrack={removeTrack}
          />
          <TimelineCursor currentTime={currentTime} duration={duration} />
        </div>
      </div>
    </div>
  );
}