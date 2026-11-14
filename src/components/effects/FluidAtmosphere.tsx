'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FluidAtmosphereProps {
  className?: string;
  variant?: 'dark' | 'emerald' | 'subtle';
  interactive?: boolean;
}

interface OrbConfig {
  bg: string;
  size: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  parallaxMultiplier: number;
  anim: string;
}

export function FluidAtmosphere({
  className = '',
  variant = 'dark',
  interactive = true,
}: FluidAtmosphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    if (!interactive || motionQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Gentle parallax normalization (-20px to +20px)
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive]);

  // Color schemes based on variant
  const orbs: OrbConfig[] = {
    dark: [
      {
        bg: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.04) 50%, transparent 70%)',
        size: 'w-[450px] h-[450px] sm:w-[650px] sm:h-[650px]',
        top: '-15%',
        left: '10%',
        parallaxMultiplier: 1.0,
        anim: prefersReducedMotion ? '' : 'animate-pulse',
      },
      {
        bg: 'radial-gradient(circle, rgba(14, 165, 233, 0.14) 0%, rgba(2, 132, 199, 0.03) 50%, transparent 70%)',
        size: 'w-[400px] h-[400px] sm:w-[550px] sm:h-[550px]',
        top: '30%',
        right: '5%',
        parallaxMultiplier: -0.7,
        anim: prefersReducedMotion ? '' : 'animate-pulse delay-700',
      },
      {
        bg: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 65%)',
        size: 'w-[350px] h-[350px] sm:w-[480px] sm:h-[480px]',
        bottom: '-10%',
        left: '25%',
        parallaxMultiplier: 0.5,
        anim: prefersReducedMotion ? '' : 'animate-pulse delay-1000',
      },
    ],
    emerald: [
      {
        bg: 'radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, transparent 70%)',
        size: 'w-[500px] h-[500px]',
        top: '-10%',
        right: '15%',
        parallaxMultiplier: 0.8,
        anim: prefersReducedMotion ? '' : 'animate-pulse',
      },
      {
        bg: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
        size: 'w-[450px] h-[450px]',
        bottom: '10%',
        left: '10%',
        parallaxMultiplier: -0.6,
        anim: prefersReducedMotion ? '' : 'animate-pulse delay-1000',
      },
    ],
    subtle: [
      {
        bg: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
        size: 'w-[400px] h-[400px]',
        top: '10%',
        left: '50%',
        parallaxMultiplier: 0.5,
        anim: '',
      },
    ],
  }[variant];

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
    >
      {/* Subtle Noise / Grain Overlay for editorial texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Atmospheric Luminous Orbs */}
      {orbs.map((orb, idx) => (
        <div
          key={idx}
          className={`absolute rounded-full filter blur-[70px] sm:blur-[95px] will-change-transform transition-transform duration-700 ease-out ${orb.size} ${orb.anim}`}
          style={{
            background: orb.bg,
            top: orb.top,
            bottom: orb.bottom,
            left: orb.left,
            right: orb.right,
            transform: `translate3d(${mouseOffset.x * orb.parallaxMultiplier}px, ${
              mouseOffset.y * orb.parallaxMultiplier
            }px, 0)`,
          }}
        />
      ))}
    </div>
  );
}
