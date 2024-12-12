import { useState, useCallback } from 'react';
import { getFFmpeg } from '@/lib/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

interface VideoUploadState {
  isLoading: boolean;
  progress: number;
  error: string | null;
}

export function useVideoUpload() {
  const [state, setState] = useState<VideoUploadState>({
    isLoading: false,
    progress: 0,
    error: null,
  });

  const processVideo = useCallback(async (file: File): Promise<string> => {
    setState({ isLoading: true, progress: 0, error: null });

    try {
      const ffmpeg = await getFFmpeg();
      
      // Write the input file to FFmpeg's virtual filesystem
      await ffmpeg.writeFile('input.mp4', await fetchFile(file));

      // Set up progress handling
      ffmpeg.on('progress', ({ progress }) => {
        setState(prev => ({ ...prev, progress: Math.round(progress * 100) }));
      });

      // Process the video (example: convert to MP4 with specific settings)
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '22',
        '-c:a', 'aac',
        '-b:a', '128k',
        'output.mp4'
      ]);

      // Read the processed file
      const data = await ffmpeg.readFile('output.mp4');
      const blob = new Blob([data], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);

      setState(prev => ({ ...prev, isLoading: false, progress: 100 }));
      return url;

    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      }));
      throw error;
    }
  }, []);

  return {
    ...state,
    processVideo,
  };
}