'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { College } from '@/types/college';
import { Building2, Camera, ShieldCheck, MapPin, Award } from 'lucide-react';

interface CollegeCampusBannerProps {
  college: College;
}

export function CollegeCampusBanner({ college }: CollegeCampusBannerProps) {
  const [imageError, setImageError] = useState(false);

  // Check if college has a valid campus photo and hasn't errored
  const hasValidImage = Boolean(college.campusImageUrl) && !imageError;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-950 group">
      {hasValidImage ? (
        <div className="relative h-60 sm:h-80 md:h-96 w-full overflow-hidden">
          <Image
            src={college.campusImageUrl!}
            alt={college.campusImageCaption || `${college.name} Academic Campus Architecture`}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={() => setImageError(true)}
          />

          {/* Dynamic Gradient Vignette for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top Overlays */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-md">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>WBJEE Code: {college.wbjeebCode} · Est. {college.established}</span>
            </span>

            <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-300 border border-emerald-500/40 shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Institutional Media</span>
            </div>
          </div>

          {/* Bottom Captions & Title */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 z-10 text-white">
            <div className="space-y-1 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block font-mono">
                {college.category} · {college.city}, West Bengal
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading text-white tracking-tight drop-shadow-md">
                {college.shortName}
              </h2>
              <p className="text-xs text-slate-300 font-medium truncate max-w-xl">
                {college.campusImageCaption || `${college.name} Campus & Departmental Blocks`}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-end">
              <a
                href="#gallery"
                className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors border border-white/20"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-300" />
                <span>View Full Gallery ({college.campusImagesGallery?.length || 4} Photos)</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Graceful Pure-CSS Architectural Fallback Banner */
        <div className="relative h-56 sm:h-72 w-full bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
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
