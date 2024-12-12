import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVideoUpload } from '@/hooks/use-video-upload';

interface VideoUploadProps {
  onVideoProcessed: (url: string) => void;
}

export function VideoUpload({ onVideoProcessed }: VideoUploadProps) {
  const { isLoading, progress, error, processVideo } = useVideoUpload();

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const videoUrl = await processVideo(file);
      onVideoProcessed(videoUrl);
    } catch (error) {
      console.error('Error processing video:', error);
    }
  }, [processVideo, onVideoProcessed]);

  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
        id="video-upload"
        disabled={isLoading}
      />
      
      <label
        htmlFor="video-upload"
        className="cursor-pointer flex flex-col items-center"
      >
        <Upload className="h-12 w-12 text-gray-400 mb-4" />
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">
            {isLoading ? 'Processing...' : 'Upload Video'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Drag and drop or click to select
          </p>
        </div>
      </label>

      {isLoading && (
        <div className="mt-4 w-full max-w-xs">
          <div className="bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 text-center mt-2">
            {progress}% processed
          </p>
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-600">
          Error: {error}
        </p>
      )}
    </div>
  );
}