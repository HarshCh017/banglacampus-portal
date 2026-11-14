'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { College } from '@/types/college';
import { useComparison } from '@/context/ComparisonContext';
import {
  MapPin,
  Check,
  Plus,
  Sparkles,
  ExternalLink,
  Building2,
} from 'lucide-react';

interface CollegeCampusBannerProps {
  college: College;
}

export function CollegeCampusBanner({ college }: CollegeCampusBannerProps) {
  const [imageError, setImageError] = useState(false);
  const { isInCompare, addToCompare, removeFromCompare } = useComparison();
  const selected = isInCompare(college.slug);

  const primaryPath = college.campusImageUrl || `/images/colleges/${college.slug}.jpg`;
  const isGovt =
    college.category === 'State University Faculty' ||
    college.category === 'Government Engineering College';

  const handleToggleCompare = () => {
    if (selected) {
      removeFromCompare(college.slug);
    } else {
      addToCompare(college.slug);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 1. Large, Vibrant, Authentic Campus Photo Banner (Matches Mockup 3) */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-900 group">
        {!imageError ? (
          <Image
            src={primaryPath}
            alt={college.campusImageCaption || `${college.name} campus architecture`}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#102A56] to-[#1455B8] text-white">
            <Building2 className="w-12 h-12 text-white/50 mb-2" />
            <h2 className="font-bold text-xl">{college.name}</h2>
            <span className="text-xs text-slate-300">WBJEE Code: {college.wbjeebCode}</span>
          </div>
        )}

        {/* Subtle Bottom Shade for Photo Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Verified Caption on Bottom-Right */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium border border-white/20">
          📍 {college.city}, West Bengal • WBJEE #{college.wbjeebCode}
        </div>
      </div>

      {/* 2. College Profile Header Card (Matches Mockup 3) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left: Name, Location, Badges */}
        <div className="space-y-2.5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#102A56] tracking-tight leading-tight">
            {college.name}
          </h1>

          {/* Location & Badges Row (Matches Mockup 3: Location, Government/Private, WBJEE, NAAC, UGC) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="flex items-center gap-1 font-medium text-slate-500 mr-1">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{college.city}, West Bengal</span>
            </span>

            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                isGovt
                  ? 'bg-[#E6F6F2] text-[#0F8B70] border-[#A7E3D4]'
                  : 'bg-[#F3F0FB] text-[#7864C8] border-[#D9D1F2]'
              }`}
            >
              {isGovt ? 'Government' : 'Private'}
            </span>

            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAF2FF] text-[#1455B8] border border-[#BFDBFE]">
              WBJEE
            </span>

            {college.naacGrade && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAF2FF] text-[#1455B8] border border-[#BFDBFE]">
                NAAC {college.naacGrade}
              </span>
            )}

            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200">
              UGC
            </span>
          </div>
        </div>

        {/* Right Actions: Compare & Check My Rank CTA (Matches Mockup 3) */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Compare Button */}
          <button
            type="button"
            onClick={handleToggleCompare}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center gap-2 cursor-pointer ${
              selected
                ? 'bg-[#EAF2FF] text-[#1455B8] border-[#BFDBFE] font-bold shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:border-[#1455B8] hover:text-[#1455B8]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center ${
                selected
                  ? 'bg-[#1455B8] border-[#1455B8] text-white'
                  : 'border-slate-400'
              }`}
            >
              {selected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <span>{selected ? 'In Compare Deck' : 'Compare'}</span>
          </button>

          {/* Primary CTA: Check My Rank Match */}
          <Link
            href={`/wbjee-predictor?preselect=${college.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1455B8] hover:bg-[#0E4496] active:scale-[0.98] text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Check My Rank Match</span>
          </Link>

          {/* Official Portal Link */}
          <a
            href={college.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors"
            title="Visit official college website"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default CollegeCampusBanner;
