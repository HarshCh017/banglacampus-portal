'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, GraduationCap, X, ChevronRight, CheckCircle2 } from 'lucide-react';

interface FloatingConsultationButtonProps {
  className?: string;
}

export function FloatingConsultationButton({ className = '' }: FloatingConsultationButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('banglacampus:open-enquiry'));
    }
  };

  if (!mounted) return null;

  return (
    <aside
      aria-label="Free Admission & Counseling Consultation"
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-transform duration-300 ease-out ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip Card that peeks out on hover (Desktop & Tablet) */}
      <div
        className={`hidden md:block absolute right-full top-1/2 -translate-y-1/2 mr-3 pointer-events-none transition-all duration-300 ease-out ${
          isHovered
            ? 'opacity-100 translate-x-0 scale-100'
            : 'opacity-0 translate-x-4 scale-95'
        }`}
      >
        <div className="bg-slate-950/95 backdrop-blur-md text-white text-xs rounded-2xl p-3.5 shadow-2xl border border-amber-500/40 w-64 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-amber-400">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>100% Free WBJEE Counseling</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            Get personalized guidance for 20 West Bengal engineering colleges, cutoff predictions & branch recommendations.
          </p>
          <div className="flex items-center gap-2 pt-1 text-[10px] text-emerald-400 font-semibold border-t border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Counselors Available Online Now</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Action Button */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Open Free Consultation Form"
        className="group relative flex items-center gap-2.5 sm:gap-3 pl-3.5 pr-2.5 sm:pl-4 sm:pr-3 py-3 sm:py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:via-amber-500 hover:to-orange-500 text-slate-950 font-extrabold tracking-tight rounded-l-2xl sm:rounded-l-3xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.45)] hover:shadow-[0_15px_35px_-5px_rgba(245,158,11,0.7)] border-l-2 border-y-2 border-amber-300/80 hover:border-amber-200 transition-all duration-300 hover:-translate-x-1.5 active:translate-x-0 cursor-pointer overflow-hidden focus:outline-hidden focus:ring-4 focus:ring-amber-400/50"
      >
        {/* Subtle Sheen / Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* Pulsing Live Dot */}
        <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-40" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-slate-950" />
        </span>

        {/* Icon & Label */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 shrink-0 group-hover:rotate-12 transition-transform duration-300" />
          <div className="flex flex-col items-start text-left leading-tight">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-950/80">
              1-on-1 Guidance
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-950 whitespace-nowrap drop-shadow-xs">
              Free Consultation
            </span>
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-400/60 group-hover:bg-white flex items-center justify-center transition-colors duration-200 shrink-0 shadow-2xs">
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform duration-200" />
        </div>
      </button>
    </aside>
  );
}
