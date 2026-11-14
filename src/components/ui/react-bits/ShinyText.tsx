'use client';

import React from 'react';

export interface ShinyTextProps {
  text?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  speed?: number;
  className?: string;
  shimmerColor?: string;
}

export function ShinyText({
  text,
  children,
  disabled = false,
  speed = 3,
  className = '',
  shimmerColor = 'rgba(255, 255, 255, 0.85)',
}: ShinyTextProps) {
  const content = children ?? text;

  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block relative overflow-hidden bg-clip-text text-transparent ${
        disabled
          ? 'text-current'
          : 'bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 animate-shimmer'
      } ${className}`}
      style={{
        backgroundImage: disabled
          ? undefined
          : `linear-gradient(120deg, currentColor 0%, currentColor 35%, ${shimmerColor} 50%, currentColor 65%, currentColor 100%)`,
        backgroundSize: '200% 100%',
        animation: disabled ? 'none' : `shine ${animationDuration} ease-in-out infinite`,
      }}
    >
      {content}
    </span>
  );
}

export default ShinyText;
