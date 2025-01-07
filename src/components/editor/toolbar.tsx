import React from 'react';
import { Button } from '@/components/ui/button';
import { Type, Image, Music, Download } from 'lucide-react';

export function Toolbar() {
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
        <Button size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}