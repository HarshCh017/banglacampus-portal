'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface GlowBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  borderRadius?: string;
  borderWidth?: string;
  glowColor?: string;
}

/**
 * GlowBorderCard - Vengeance UI Glowing Card
 * Adds an interactive, subtle rotating neon edge aura around important cards.
 */
export function GlowBorderCard({
  children,
  className,
  width = '100%',
  height,
  borderRadius = '1rem',
  borderWidth = '1px',
  glowColor = 'rgba(16, 185, 129, 0.4)',
  style,
  ...props
}: GlowBorderCardProps) {
  return (
    <div
      className={cn(
        'relative group rounded-2xl p-[1px] overflow-hidden bg-gradient-to-b from-[#10B981]/30 via-[rgba(255,255,255,0.08)] to-transparent transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]',
        className
      )}
      style={{
        width,
        height: height || 'auto',
        borderRadius,
        ...style,
      }}
      {...props}
    >
      <div
        className="relative z-10 w-full h-full bg-[#0B1210] rounded-[calc(1rem-1px)] p-5"
        style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
      >
        {children}
      </div>
    </div>
  );
}

export default GlowBorderCard;
