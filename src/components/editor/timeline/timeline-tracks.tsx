import React from 'react';
import type { Track, Clip } from './timeline';
import { TrackClip } from './track-clip';

interface TimelineTracksProps {
  tracks: Track[];
  currentTime: number;
  zoom: number;
  onUpdateClip: (trackId: string, clipId: string, updates: Partial<Clip>) => void;
  onRemoveTrack: (trackId: string) => void;
}

export function TimelineTracks({
  tracks,
  currentTime,
  zoom,
  onUpdateClip,
  onRemoveTrack,
}: TimelineTracksProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {tracks.map((track) => (
        <div
          key={track.id}
          className="h-16 border-b border-gray-700 flex items-center relative"
        >
          <div className="w-32 px-2 py-1 border-r border-gray-700 flex items-center justify-between">
            <span className="text-sm text-gray-300">{track.name}</span>
            <button
              onClick={() => onRemoveTrack(track.id)}
              className="text-gray-400 hover:text-red-500"
            >
              ×
            </button>
          </div>
          <div className="flex-1 relative">
            {track.clips.map((clip) => (
              <TrackClip
                key={clip.id}
                clip={clip}
                zoom={zoom}
                onUpdate={(updates) => onUpdateClip(track.id, clip.id, updates)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}