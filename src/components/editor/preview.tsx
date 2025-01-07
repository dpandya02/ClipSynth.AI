import React from 'react';
import { VideoPlayer } from './video/video-player';

export function Preview() {
  return (
    <div className="flex flex-col h-full">
      <VideoPlayer className="flex-1" />
    </div>
  );
}