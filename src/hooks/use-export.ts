import { useState, useCallback } from 'react';
import { getFFmpeg } from '@/lib/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

export function useExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const exportVideo = useCallback(async () => {
    setIsExporting(true);
    setProgress(0);

    try {
      const ffmpeg = await getFFmpeg();

      // Set up progress handling
      ffmpeg.on('progress', ({ progress }) => {
        setProgress(Math.round(progress * 100));
      });

      // Example export command - this should be customized based on your needs
      await ffmpeg.exec([
        '-i', 'input.mp4',
        // Add text overlays, filters, etc. here
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', '23',
        '-c:a', 'aac',
        '-b:a', '128k',
        'output.mp4'
      ]);

      // Read the output file
      const data = await ffmpeg.readFile('output.mp4');
      const blob = new Blob([data], { type: 'video/mp4' });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'edited-video.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setProgress(100);
    } catch (error) {
      console.error('Error exporting video:', error);
    } finally {
      setIsExporting(false);
    }
  }, []);

  return {
    exportVideo,
    isExporting,
    progress,
  };
}