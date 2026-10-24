'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { College } from '@/types/college';
import {
  Building2,
  Camera,
  ShieldCheck,
  MapPin,
  Award,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  GraduationCap,
  ChevronRight,
  Layers,
  Coins,
} from 'lucide-react';

interface CollegeCampusBannerProps {
  college: College;
}

export function CollegeCampusBanner({ college }: CollegeCampusBannerProps) {
  const [imageError, setImageError] = useState(false);

  // Direct verified photographic path with cache buster for instant refresh
  const primaryPath = college.campusImageUrl || `/images/colleges/${college.slug}.jpg`;
  const photoSrc = primaryPath.startsWith('http') ? primaryPath : `${primaryPath}?v=20261024c`;
  const galleryCount = college.campusImagesGallery?.length || 4;

  const handleOpenConsultation = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('banglacampus:open-enquiry'));
    }
  };

  const formatTuition = () => {
    const { annualTuitionMin, annualTuitionMax } = college.feeStructure;
    if (annualTuitionMin === null || annualTuitionMax === null) return 'Notice pending';
    if (annualTuitionMin === annualTuitionMax) return `₹${annualTuitionMin.toLocaleString('en-IN')}/yr`;
    return `₹${annualTuitionMin.toLocaleString('en-IN')} - ₹${annualTuitionMax.toLocaleString('en-IN')}/yr`;
  };

  return (
    <header className="relative w-full rounded-3xl sm:rounded-4xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-950 group">
      {!imageError ? (
        <div className="relative min-h-[360px] sm:min-h-[440px] md:min-h-[500px] w-full flex flex-col justify-between overflow-hidden">
          {/* 1. Verified Campus Background Photograph */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt={college.campusImageCaption || `${college.name} verified campus photography`}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
            onError={() => setImageError(true)}
            loading="eager"
          />

          {/* 2. Multi-stage Cinematic Vignette Gradients */}
          {/* Top subtle vignette for badge contrast */}
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none" />
          {/* Deep bottom vignette for typography & action readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
          {/* Subtle horizontal tint for ultra-crisp text on all screen sizes */}
          <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />

          {/* 3. Top Status & Regulatory Badges Row */}
          <div className="relative z-10 p-4 sm:p-6 lg:p-8 flex flex-wrap items-center justify-between gap-3">
            {/* Left Status Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold shadow-md">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>WBJEE {college.wbjeebCode}</span>
              </span>

              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md border border-emerald-400/40 text-white text-xs font-semibold shadow-md">
                {college.category === 'State University Faculty'
                  ? 'State University'
                  : college.category === 'Government Engineering College'
                  ? 'Govt College'
                  : 'Autonomous'}
              </span>

              <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-slate-300 text-xs font-medium">
                Est. {college.established}
              </span>
            </div>

            {/* Right Verified Photography & Gallery Jump Button */}
            <div className="flex items-center gap-2">
              <div className="hidden md:inline-flex items-center gap-1.5 bg-emerald-950/80 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-emerald-300 border border-emerald-500/40 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Institutional Photography</span>
              </div>

              <a
                href="#gallery"
                className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border border-white/25 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-amber-300" />
                <span>View Full Gallery ({galleryCount})</span>
              </a>
            </div>
          </div>

          {/* 4. Bottom Main College Showcase Content */}
          <div className="relative z-10 p-4 sm:p-6 lg:p-8 space-y-4">
            <div className="space-y-2 max-w-4xl">
              {/* Category, City & Affiliation Chips */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-200">
                <span className="font-bold uppercase tracking-wider text-emerald-400 font-mono text-[11px] sm:text-xs">
                  {college.category}
                </span>
                <span className="text-slate-400">•</span>
                <span className="flex items-center gap-1 text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{college.city}, West Bengal</span>
                </span>
                <span className="hidden sm:inline text-slate-400">•</span>
                <span className="hidden sm:inline text-slate-300">
                  {college.affiliation}
                </span>
              </div>

              {/* Majestic College Full Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight drop-shadow-md">
                {college.name}
              </h1>

              {/* Photo Caption Pill */}
              <p className="text-xs sm:text-sm text-slate-300 font-medium line-clamp-1 max-w-3xl drop-shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>{college.campusImageCaption || `${college.name} Academic Campus Architecture`}</span>
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 text-xs font-bold">
              {college.nirfRankEngineering2024 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/90 text-slate-950 border border-amber-300 shadow-md backdrop-blur-md">
                  <Award className="w-3.5 h-3.5 text-slate-950" />
                  <span>
                    NIRF #{typeof college.nirfRankEngineering2024 === 'number' ? college.nirfRankEngineering2024 : college.nirfRankEngineering2024}
                  </span>
                </div>
              )}

              {college.naacGrade && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600/90 text-white border border-emerald-400 shadow-md backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>NAAC Grade &apos;{college.naacGrade}&apos;</span>
                </div>
              )}

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/85 text-slate-200 border border-slate-700/80 shadow-md backdrop-blur-md font-mono">
                <Coins className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tuition: {formatTuition()}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/85 text-slate-200 border border-slate-700/80 shadow-md backdrop-blur-md">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>{college.programs.length} B.Tech Disciplines</span>
              </div>
            </div>

            {/* Integrated Action Buttons on Banner */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <Link
                href={`/counselling-simulator?preselect=${college.slug}`}
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-xl transition-all shadow-lg hover:shadow-emerald-400/30 cursor-pointer hover:scale-102 active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Add to Choice Sheet</span>
              </Link>

              <button
                type="button"
                onClick={handleOpenConsultation}
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 rounded-xl transition-all shadow-lg hover:shadow-amber-400/30 cursor-pointer hover:scale-102 active:scale-98"
              >
                <GraduationCap className="w-4 h-4 text-slate-950" />
                <span>Free Consultation</span>
              </button>

              <a
                href={college.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-white/15 hover:bg-white/25 rounded-xl transition-all border border-white/25 backdrop-blur-md shadow-md"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Graceful Architectural Banner Fallback if image unavailable */
        <div className="relative min-h-[340px] sm:min-h-[420px] w-full bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold backdrop-blur-xs">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>WBJEE {college.wbjeebCode} · Est. {college.established}</span>
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              {college.district}, West Bengal
            </span>
          </div>

          <div className="relative z-10 space-y-3 max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
              {college.name}
            </h1>
            <div className="text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-2">
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
    </header>
  );
}
