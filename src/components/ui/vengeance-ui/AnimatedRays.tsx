'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedRaysProps {
  /** Additional CSS classes */
  className?: string;
  /** Optional children to render over the background */
  children?: React.ReactNode;
}

/**
 * AnimatedRays - Vengeance UI Aurora Ray Component
 * Creates an atmospheric, animated aurora ray backdrop designed for heroes and focal sections.
 */
export function AnimatedRays({ className = '', children }: AnimatedRaysProps) {
  const stripes = `repeating-linear-gradient(
    105deg,
    rgba(16, 185, 129, 0.12) 0%,
    rgba(16, 185, 129, 0.12) 7%,
    transparent 10%,
    transparent 12%,
    rgba(16, 185, 129, 0.12) 16%
  )`;
  const aurora = `repeating-linear-gradient(
    105deg,
    #10B981 10%,
    #059669 15%,
    #F5B942 20%,
    #34D399 25%,
    #10B981 30%
  )`;

  return (
    <div className={cn('relative w-full h-full overflow-hidden pointer-events-none select-none', className)}>
      {/* Aurora Light Rays Base */}
      <div
        className="absolute inset-0 opacity-40 animate-pulse transition-opacity duration-1000"
        style={{
          backgroundImage: `${stripes}, ${aurora}`,
          backgroundSize: '300%, 200%',
          backgroundPosition: '50% 50%, 50% 50%',
          filter: 'blur(28px) saturate(180%)',
          maskImage: 'radial-gradient(ellipse at 50% 0%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 40%, transparent 80%)',
        }}
      />
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-auto">
          {children}
        </div>
      )}
    </div>
  );
}

export default AnimatedRays;
