'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import NET, { type VantaEffect } from 'vanta/dist/vanta.net.min';

interface VantaBackgroundProps {
  className?: string;
  variant?: 'net' | 'subtle';
  children?: React.ReactNode;
}

export function VantaBackground({
  className = '',
  variant = 'net',
  children,
}: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    // Honor reduced motion or low-end mobile devices (<= 2 cores)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowPower = (navigator.hardwareConcurrency || 4) <= 2;
    if (prefersReduced || isLowPower || !vantaRef.current) return;

    try {
      effectRef.current = NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 0.8,
        color: 0x10b981,
        backgroundColor: 0x030712,
        points: variant === 'net' ? 9.0 : 6.0,
        maxDistance: 22.0,
        spacing: 18.0,
        showDots: true,
      });
    } catch (err) {
      console.warn('Vanta WebGL initialization fallback:', err);
    }

    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, [variant]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        ref={vantaRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: mounted ? 0.38 : 0 }}
      />
      {/* Ambient gradient overlay to maintain strict WCAG 2.2 AA contrast for foreground text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-canvas/60 via-transparent to-canvas"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default VantaBackground;
