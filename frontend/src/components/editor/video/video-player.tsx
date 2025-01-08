import React, { useRef, useState } from 'react';
import { VideoControls } from './video-controls';
import { useVideoState } from '@/hooks/use-video-state';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src?: string;
  className?: string;
}

export function VideoPlayer({ src, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    handleTimeUpdate,
    handleVolumeChange,
    handleSeek,
  } = useVideoState(videoRef);

  return (
    <div className={cn('relative group', className)}>
      <video
        ref={videoRef}
        className="w-full h-full rounded-lg bg-black"
        onTimeUpdate={handleTimeUpdate}
      >
        {src && <source src={src} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>
      
      <VideoControls
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        onPlayPause={togglePlay}
        onVolumeChange={handleVolumeChange}
        onSeek={handleSeek}
      />
    </div>
  );
}