import React, { useState } from 'react';
import { VideoPlayer } from './video/video-player';
import { VideoUpload } from './upload/video-upload';
import { Timeline } from './timeline/timeline';
import { useTimelineState } from '@/hooks/use-timeline-state';

export function Preview() {
  const [videoSrc, setVideoSrc] = useState<string>();
  const timelineState = useTimelineState();

  const handleVideoProcessed = (url: string) => {
    setVideoSrc(url);
    // Add the video as a clip to the timeline
    timelineState.addTrack('video');
    // Set the video duration
    const video = document.createElement('video');
    video.src = url;
    video.onloadedmetadata = () => {
      timelineState.setDuration(video.duration);
    };
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        {videoSrc ? (
          <VideoPlayer
            src={videoSrc}
            className="flex-1"
            currentTime={timelineState.currentTime}
            onTimeUpdate={timelineState.setCurrentTime}
          />
        ) : (
          <VideoUpload onVideoProcessed={handleVideoProcessed} />
        )}
      </div>
      <Timeline {...timelineState} />
    </div>
  );
}