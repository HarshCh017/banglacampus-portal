'use client';

import React, { useState } from 'react';
import { College } from '@/types/college';
import { Building2, Camera, ShieldCheck, MapPin, Award } from 'lucide-react';

interface CollegeCampusBannerProps {
  college: College;
}

export function CollegeCampusBanner({ college }: CollegeCampusBannerProps) {
  const [imageError, setImageError] = useState(false);

  // If college has an image and it hasn't errored
  const hasValidImage = Boolean(college.campusImageUrl) && !imageError;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-900 group">
      {hasValidImage ? (
        <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={college.campusImageUrl}
            alt={college.campusImageCaption || `${college.name} Academic Campus & Technical Laboratories`}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {/* Gradient Overlay for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Caption / Provenance Tag */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium truncate max-w-xs sm:max-w-md">
                {college.campusImageCaption || `${college.shortName} Campus & Academic Block`}
              </span>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Verified Campus Media</span>
            </div>
          </div>
        </div>
      ) : (
        /* ELEGANT FALLBACK BANNER (Pure CSS & SVGs - Never breaks layout) */
        <div className="relative h-44 sm:h-56 md:h-64 w-full bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
          {/* Decorative geometric background texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b20_1px,transparent_1px),linear-gradient(to_bottom,#064e3b20_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold backdrop-blur-xs">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>WBJEE Code: {college.wbjeebCode} · Est. {college.established}</span>
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              {college.district}, West Bengal
            </span>
          </div>

          <div className="relative z-10 space-y-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading text-white tracking-tight">
              {college.name}
            </div>
            <div className="text-xs sm:text-sm text-slate-300 flex items-center gap-3">
              <span>{college.category}</span>
              <span>•</span>
              <span>{college.affiliation}</span>
              {college.naacGrade && (
                <>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">NAAC Grade {college.naacGrade}</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
