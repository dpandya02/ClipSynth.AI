import React, { useRef, useState, useEffect } from 'react';
import { VideoControls } from './video-controls';
import { useVideoState } from '@/hooks/use-video-state';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src?: string;
  className?: string;
  currentTime?: number;
  onTimeUpdate?: (time: number) => void;
}

export function VideoPlayer({
  src,
  className,
  currentTime: externalTime,
  onTimeUpdate,
}: VideoPlayerProps) {
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

  // Sync with external time control (timeline)
  useEffect(() => {
    if (externalTime !== undefined && videoRef.current && Math.abs(videoRef.current.currentTime - externalTime) > 0.1) {
      videoRef.current.currentTime = externalTime;
    }
  }, [externalTime]);

  const handleVideoTimeUpdate = () => {
    handleTimeUpdate();
    if (onTimeUpdate && videoRef.current) {
      onTimeUpdate(videoRef.current.currentTime);
    }
  };

  return (
    <div className={cn('relative group', className)}>
      <video
        ref={videoRef}
        className="w-full h-full rounded-lg bg-black"
        onTimeUpdate={handleVideoTimeUpdate}
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