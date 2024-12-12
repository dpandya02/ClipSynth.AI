import React from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Type, Move } from 'lucide-react';
import type { TextStyle } from './text-editor';

interface TextControlsProps {
  style: TextStyle;
  onStyleChange: (updates: Partial<TextStyle>) => void;
}

const FONT_FAMILIES = [
  'Inter',
  'Arial',
  'Times New Roman',
  'Courier New',
];

const ANIMATIONS = [
  { value: '', label: 'None' },
  { value: 'fade-in', label: 'Fade In' },
  { value: 'slide-up', label: 'Slide Up' },
  { value: 'bounce', label: 'Bounce' },
];

export function TextControls({ style, onStyleChange }: TextControlsProps) {
  return (
    <div className="absolute -top-12 left-0 bg-white rounded-lg shadow-lg p-2 flex items-center space-x-2">
      <select
        value={style.fontFamily}
        onChange={(e) => onStyleChange({ fontFamily: e.target.value })}
        className="text-sm border rounded px-2 py-1"
      >
        {FONT_FAMILIES.map((font) => (
          <option key={font} value={font}>{font}</option>
        ))}
      </select>

      <input
        type="number"
        value={style.fontSize}
        onChange={(e) => onStyleChange({ fontSize: Number(e.target.value) })}
        className="w-16 text-sm border rounded px-2 py-1"
      />

      <input
        type="color"
        value={style.color}
        onChange={(e) => onStyleChange({ color: e.target.value })}
        className="w-8 h-8 p-1 border rounded"
      />

      <Button
        size="sm"
        variant={style.bold ? 'primary' : 'outline'}
        onClick={() => onStyleChange({ bold: !style.bold })}
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant={style.italic ? 'primary' : 'outline'}
        onClick={() => onStyleChange({ italic: !style.italic })}
      >
        <Italic className="h-4 w-4" />
      </Button>

      <select
        value={style.animation}
        onChange={(e) => onStyleChange({ animation: e.target.value })}
        className="text-sm border rounded px-2 py-1"
      >
        {ANIMATIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}