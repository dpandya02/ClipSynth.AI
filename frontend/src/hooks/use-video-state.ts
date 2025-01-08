import { useRef, useState, useCallback, RefObject } from 'react';

export function useVideoState(videoRef: RefObject<HTMLVideoElement>) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration);
  }, []);

  const handleVolumeChange = useCallback((value: number) => {
    if (!videoRef.current) return;
    videoRef.current.volume = value;
    setVolume(value);
  }, []);

  const handleSeek = useCallback((time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    handleTimeUpdate,
    handleVolumeChange,
    handleSeek,
  };
}