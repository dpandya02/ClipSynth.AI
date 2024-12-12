import { useState, useCallback } from 'react';
import type { Track, Clip } from '@/components/editor/timeline/timeline';

export function useTimelineState() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [duration, setDuration] = useState(0);

  const addTrack = useCallback((type: Track['type']) => {
    setTracks(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} Track ${prev.length + 1}`,
        clips: [],
      },
    ]);
  }, []);

  const removeTrack = useCallback((trackId: string) => {
    setTracks(prev => prev.filter(track => track.id !== trackId));
  }, []);

  const updateClip = useCallback((trackId: string, clipId: string, updates: Partial<Clip>) => {
    setTracks(prev => prev.map(track => {
      if (track.id !== trackId) return track;
      return {
        ...track,
        clips: track.clips.map(clip => {
          if (clip.id !== clipId) return clip;
          return { ...clip, ...updates };
        }),
      };
    }));
  }, []);

  return {
    tracks,
    currentTime,
    zoom,
    duration,
    setCurrentTime,
    setZoom,
    setDuration,
    addTrack,
    removeTrack,
    updateClip,
  };
}