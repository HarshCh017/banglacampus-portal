'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Static Fallback SVG for SSR, loading state, low-power devices, or prefers-reduced-motion
export function HeroCampusFallback() {
  return (
    <div
      role="img"
      aria-label="Interactive 3D Campus Constellation model"
      className="w-full h-full min-h-[320px] flex items-center justify-center relative select-none"
    >
      <div className="absolute inset-0 bg-radial from-emerald-500/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[340px] h-auto drop-shadow-[0_0_25px_rgba(16,185,129,0.3)] animate-pulse"
        style={{ animationDuration: '4s' }}
      >
        <circle cx="200" cy="200" r="160" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
        <ellipse cx="200" cy="200" rx="140" ry="60" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" transform="rotate(-25 200 200)" />
        
        {/* Wireframe Tower Base */}
        <polygon points="120,260 280,260 250,220 150,220" stroke="#059669" strokeWidth="1.5" fill="#064e3b" fillOpacity="0.3" />
        
        {/* Tier 1 Box */}
        <polygon points="140,220 260,220 260,170 140,170" stroke="#10b981" strokeWidth="1.5" fill="#047857" fillOpacity="0.25" />
        <line x1="200" y1="170" x2="200" y2="220" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
        
        {/* Tier 2 Core */}
        <polygon points="165,170 235,170 235,120 165,120" stroke="#38bdf8" strokeWidth="1.5" fill="#0284c7" fillOpacity="0.2" />
        
        {/* Observatory Spire */}
        <polygon points="200,75 230,120 170,120" stroke="#34d399" strokeWidth="1.5" fill="#059669" fillOpacity="0.4" />
        <circle cx="200" cy="75" r="4" fill="#34d399" />

        {/* 20 Orbiting Node Points */}
        <circle cx="90" cy="160" r="3.5" fill="#38bdf8" opacity="0.9" />
        <circle cx="310" cy="220" r="3.5" fill="#34d399" opacity="0.9" />
        <circle cx="280" cy="130" r="3" fill="#38bdf8" opacity="0.8" />
        <circle cx="110" cy="240" r="3" fill="#34d399" opacity="0.8" />
        <circle cx="200" cy="310" r="4" fill="#10b981" opacity="0.8" />
        <circle cx="150" cy="100" r="2.5" fill="#38bdf8" opacity="0.7" />
        <circle cx="250" cy="280" r="3" fill="#34d399" opacity="0.8" />
        
        {/* Constellation Connectors */}
        <line x1="90" y1="160" x2="140" y2="170" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
        <line x1="310" y1="220" x2="260" y2="220" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
        <line x1="280" y1="130" x2="235" y2="120" stroke="#34d399" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
      </svg>
    </div>
  );
}

const DynamicHeroScene = dynamic(() => import('./HeroCampusScene'), {
  ssr: false,
  loading: () => <HeroCampusFallback />,
});

export function HeroCampusSceneWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    // Verify WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }

    // Pause rendering when offscreen to conserve GPU cycles
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      motionQuery.removeEventListener('change', motionListener);
      observer.disconnect();
    };
  }, []);

  if (prefersReducedMotion || !hasWebGL) {
    return (
      <div ref={containerRef} className="w-full h-full min-h-[340px] flex items-center justify-center">
        <HeroCampusFallback />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] flex items-center justify-center"
      aria-label="3D Campus Wireframe and Rank Constellation"
    >
      <DynamicHeroScene isVisible={isVisible} />
    </div>
  );
}
