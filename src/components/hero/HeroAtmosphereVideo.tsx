'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';

export function HeroAtmosphereVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Respect accessibility: don't auto-play video if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldPlay(true);
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full">
      {/* Subtle Ambient Glow Behind Card */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#10B981]/15 via-transparent to-[#3B82F6]/15 blur-2xl -z-10 pointer-events-none" />

      {/* Floating Glass Panel */}
      <div className="relative w-full h-[320px] sm:h-[350px] overflow-hidden rounded-2xl bg-[#18181B]/80 backdrop-blur-md border border-white/10 shadow-xl shadow-black/50 group">
        {/* Subtle Canvas Atmospheric Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/10 via-[#18181B] to-[#09090B] pointer-events-none" />

        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        {/* Collegiate Architecture Aerial Video Loop (Lazy + Gated) */}
        {!hasError && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setHasError(true)}
            className={`absolute inset-0 w-full h-full object-cover scale-105 filter saturate-[0.8] contrast-[1.1] transition-opacity duration-1000 ${
              isVideoLoaded && shouldPlay ? 'opacity-35' : 'opacity-0'
            }`}
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-university-building-aerial-view-42211-large.mp4" type="video/mp4" />
          </video>
        )}

        {/* Cinematic Architectural Artwork Fallback */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 pointer-events-none">
          {/* Top Status Header */}
          <div className="flex items-center justify-between z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181B]/90 border border-white/10 backdrop-blur-md text-[11px] font-semibold text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>Kolkata &amp; WB Campus Network</span>
            </div>
            <span className="text-[11px] font-mono text-[#71717A]">
              Phase 2026/27
            </span>
          </div>

          {/* Center Graphic: Architectural Quadrangle Motif */}
          <div className="text-center space-y-2 z-10 my-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center mx-auto shadow-md backdrop-blur-md">
              <Building2 className="w-7 h-7 text-[#10B981]" />
            </div>
            <div className="text-base font-bold text-[#FAFAFA] font-serif tracking-tight">
              20 Approved Engineering Campuses
            </div>
            <p className="text-xs text-[#A1A1AA] max-w-xs mx-auto leading-relaxed">
              AICTE Extensions of Approval, NIRF institutional rank cards, and verified fee demands.
            </p>
          </div>

          {/* Bottom Metric Badges */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center z-10">
            <div className="p-2 rounded-xl bg-[#09090B]/70 border border-white/8">
              <div className="text-[10px] font-mono uppercase text-[#71717A]">State Univ</div>
              <div className="text-xs font-bold text-[#FAFAFA]">Jadavpur &amp; CU</div>
            </div>
            <div className="p-2 rounded-xl bg-[#09090B]/70 border border-white/8">
              <div className="text-[10px] font-mono uppercase text-[#71717A]">Govt Colleges</div>
              <div className="text-xs font-bold text-[#10B981]">KGEC &amp; JGEC</div>
            </div>
            <div className="p-2 rounded-xl bg-[#09090B]/70 border border-white/8">
              <div className="text-[10px] font-mono uppercase text-[#71717A]">Autonomous</div>
              <div className="text-xs font-bold text-[#3B82F6]">IEM &amp; Heritage</div>
            </div>
          </div>
        </div>

        {/* Dark Edge Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
