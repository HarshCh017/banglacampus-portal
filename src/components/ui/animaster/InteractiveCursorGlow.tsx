'use client';

import React, { useEffect, useState } from 'react';

/**
 * InteractiveCursorGlow - Animaster Lib Fluid Ambient Cursor Light
 * Provides a gentle ambient radial glow that follows the pointer on desktop screens without layout thrashing.
 */
export function InteractiveCursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handlePointerMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 overflow-hidden"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="absolute w-72 h-72 rounded-full transform -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, rgba(245,185,66,0.03) 40%, transparent 70%)',
        }}
      />
    </div>
  );
}

export default InteractiveCursorGlow;
