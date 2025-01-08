import React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  value: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
}

export function Slider({ value, max, step = 1, onChange, className }: SliderProps) {
  return (
    <input
      type="range"
      value={value}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      className={cn(
        'w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer',
        'range-sm dark:bg-gray-700',
        '[&::-webkit-slider-thumb]:appearance-none',
        '[&::-webkit-slider-thumb]:w-3',
        '[&::-webkit-slider-thumb]:h-3',
        '[&::-webkit-slider-thumb]:rounded-full',
        '[&::-webkit-slider-thumb]:bg-white',
        '[&::-webkit-slider-thumb]:cursor-pointer',
        className
      )}
    />
  );
}