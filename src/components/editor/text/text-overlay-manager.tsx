import React, { useState } from 'react';
import { TextEditor, type TextOverlay } from './text-editor';
import { useTimelineState } from '@/hooks/use-timeline-state';

export function TextOverlayManager() {
  const [overlays, setOverlays] = useState<TextOverlay[]>([]);
  const { currentTime } = useTimelineState();

  const addTextOverlay = () => {
    const newOverlay: TextOverlay = {
      id: crypto.randomUUID(),
      text: 'New Text',
      position: { x: 100, y: 100 },
      style: {
        fontFamily: 'Inter',
        fontSize: 24,
        color: '#ffffff',
        bold: false,
        italic: false,
      },
      startTime: currentTime,
      duration: 5, // Default duration of 5 seconds
    };

    setOverlays(prev => [...prev, newOverlay]);
  };

  const updateOverlay = (id: string, updates: Partial<TextOverlay>) => {
    setOverlays(prev =>
      prev.map(overlay =>
        overlay.id === id ? { ...overlay, ...updates } : overlay
      )
    );
  };

  const removeOverlay = (id: string) => {
    setOverlays(prev => prev.filter(overlay => overlay.id !== id));
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {overlays
        .filter(overlay =>
          currentTime >= overlay.startTime &&
          currentTime <= overlay.startTime + overlay.duration
        )
        .map(overlay => (
          <TextEditor
            key={overlay.id}
            id={overlay.id}
            initialText={overlay.text}
            position={overlay.position}
            style={overlay.style}
            onUpdate={updateOverlay}
          />
        ))}
    </div>
  );
}