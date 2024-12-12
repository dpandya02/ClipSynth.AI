import React from 'react';
import { TextControls } from './text-controls';
import { useTextEditor } from '@/hooks/use-text-editor';
import { cn } from '@/lib/utils';

interface TextEditorProps {
  id: string;
  initialText?: string;
  position?: { x: number; y: number };
  style?: TextStyle;
  onUpdate: (id: string, updates: Partial<TextOverlay>) => void;
}

export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  color: string;
  bold: boolean;
  italic: boolean;
  animation?: string;
}

export interface TextOverlay {
  id: string;
  text: string;
  position: { x: number; y: number };
  style: TextStyle;
  startTime: number;
  duration: number;
}

export function TextEditor({ id, initialText = '', position, style, onUpdate }: TextEditorProps) {
  const {
    text,
    textStyle,
    isEditing,
    handleTextChange,
    handleStyleChange,
    handlePositionChange,
    toggleEdit,
  } = useTextEditor({
    initialText,
    initialStyle: style,
    initialPosition: position,
    onUpdate: (updates) => onUpdate(id, updates),
  });

  return (
    <div className="absolute" style={{ left: position?.x, top: position?.y }}>
      <div
        className={cn(
          'relative group cursor-move',
          isEditing && 'ring-2 ring-blue-500'
        )}
        onDoubleClick={toggleEdit}
      >
        {isEditing ? (
          <textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            className="min-w-[200px] p-2 bg-transparent outline-none resize-none"
            style={{
              fontFamily: textStyle.fontFamily,
              fontSize: textStyle.fontSize,
              color: textStyle.color,
              fontWeight: textStyle.bold ? 'bold' : 'normal',
              fontStyle: textStyle.italic ? 'italic' : 'normal',
            }}
            autoFocus
          />
        ) : (
          <div
            className={cn(
              'p-2',
              textStyle.animation && `animate-${textStyle.animation}`
            )}
            style={{
              fontFamily: textStyle.fontFamily,
              fontSize: textStyle.fontSize,
              color: textStyle.color,
              fontWeight: textStyle.bold ? 'bold' : 'normal',
              fontStyle: textStyle.italic ? 'italic' : 'normal',
            }}
          >
            {text}
          </div>
        )}

        {isEditing && (
          <TextControls
            style={textStyle}
            onStyleChange={handleStyleChange}
          />
        )}
      </div>
    </div>
  );
}