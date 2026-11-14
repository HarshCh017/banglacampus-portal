'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface PerspectiveGridProps {
  /** Additional CSS classes for the grid container */
  className?: string;
  /** Number of tiles per row/column (default: 30) */
  gridSize?: number;
  /** Whether to show the gradient overlay (default: true) */
  showOverlay?: boolean;
  /** Fade radius percentage for the gradient overlay (default: 75) */
  fadeRadius?: number;
}

/**
 * PerspectiveGrid - Vengeance UI 3D Perspective Grid
 * Renders an interactive 3D tilted grid plane with radial fade mask.
 */
export function PerspectiveGrid({
  className,
  gridSize = 28,
  showOverlay = true,
  fadeRadius = 75,
}: PerspectiveGridProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tiles = useMemo(() => Array.from({ length: gridSize * gridSize }), [gridSize]);

  return (
    <div
      className={cn(
        'relative w-full h-full overflow-hidden bg-[#05080A]',
        '[--fade-stop:#05080A]',
        className
      )}
      style={{
        perspective: '1400px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="absolute w-[60rem] aspect-square grid origin-center pointer-events-auto"
        style={{
          left: '50%',
          top: '50%',
          transform:
            'translate(-50%, -50%) rotateX(45deg) rotateY(0deg) rotateZ(0deg) scale(1.6)',
          transformStyle: 'preserve-3d',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {mounted &&
          tiles.map((_, i) => (
            <div
              key={i}
              className="tile min-h-[1px] min-w-[1px] border border-[#10B981]/10 bg-transparent transition-colors duration-700 hover:bg-[#10B981]/20 hover:border-[#10B981]/50 hover:duration-0 cursor-crosshair"
            />
          ))}
      </div>

      {/* Radial Gradient Mask (Overlay) */}
      {showOverlay && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle, transparent 20%, var(--fade-stop) ${fadeRadius}%)`,
          }}
        />
      )}
    </div>
  );
}

export default PerspectiveGrid;
