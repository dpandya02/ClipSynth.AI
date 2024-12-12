import { useState, useCallback } from 'react';
import type { TextStyle, TextOverlay } from '@/components/editor/text/text-editor';

interface TextEditorOptions {
  initialText: string;
  initialStyle?: TextStyle;
  initialPosition?: { x: number; y: number };
  onUpdate: (updates: Partial<TextOverlay>) => void;
}

const DEFAULT_STYLE: TextStyle = {
  fontFamily: 'Inter',
  fontSize: 24,
  color: '#ffffff',
  bold: false,
  italic: false,
};

export function useTextEditor({
  initialText,
  initialStyle = DEFAULT_STYLE,
  initialPosition = { x: 0, y: 0 },
  onUpdate,
}: TextEditorOptions) {
  const [text, setText] = useState(initialText);
  const [textStyle, setTextStyle] = useState(initialStyle);
  const [position, setPosition] = useState(initialPosition);
  const [isEditing, setIsEditing] = useState(false);

  const handleTextChange = useCallback((newText: string) => {
    setText(newText);
    onUpdate({ text: newText });
  }, [onUpdate]);

  const handleStyleChange = useCallback((updates: Partial<TextStyle>) => {
    setTextStyle(prev => {
      const newStyle = { ...prev, ...updates };
      onUpdate({ style: newStyle });
      return newStyle;
    });
  }, [onUpdate]);

  const handlePositionChange = useCallback((newPosition: { x: number; y: number }) => {
    setPosition(newPosition);
    onUpdate({ position: newPosition });
  }, [onUpdate]);

  const toggleEdit = useCallback(() => {
    setIsEditing(prev => !prev);
  }, []);

  return {
    text,
    textStyle,
    position,
    isEditing,
    handleTextChange,
    handleStyleChange,
    handlePositionChange,
    toggleEdit,
  };
}