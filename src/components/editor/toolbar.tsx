import React from 'react';
import { Button } from '@/components/ui/button';
import { Type, Image, Music, Download } from 'lucide-react';
import { useExport } from '@/hooks/use-export';

export function Toolbar() {
  const { exportVideo, isExporting, progress } = useExport();

  return (
    <div className="border-b border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Type className="h-4 w-4" />
            Add Text
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Image className="h-4 w-4" />
            Add Media
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Music className="h-4 w-4" />
            Add Audio
          </Button>
        </div>
        <div className="flex items-center gap-4">
          {isExporting && (
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">{progress}%</span>
            </div>
          )}
          <Button
            size="sm"
            className="gap-2"
            onClick={exportVideo}
            disabled={isExporting}
          >
            <Download className="h-4 w-4" />
            {isExporting ? 'Exporting...' : 'Export'}
          </Button>
        </div>
      </div>
    </div>
  );
}