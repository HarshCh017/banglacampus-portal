'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { College } from '@/types/college';
import { useComparison } from '@/context/ComparisonContext';
import { formatNirfRank } from '@/lib/utils';
import {
  MapPin,
  Check,
  Building2,
  ArrowRight,
  Award,
  ShieldCheck,
  Sparkles,
  GraduationCap,
} from 'lucide-react';

interface CollegeCardProps {
  college: College;
  layout?: 'horizontal' | 'vertical';
}

export function CollegeCard({ college, layout = 'horizontal' }: CollegeCardProps) {
  const { isInCompare, addToCompare, removeFromCompare } = useComparison();
  const [imageError, setImageError] = useState(false);

  const inCompare = isInCompare(college.slug);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(college.slug);
    } else {
      addToCompare(college.slug);
    }
  };

  const isGovt =
    college.category === 'State University Faculty' ||
    college.category === 'Government Engineering College';

  const formatFee = () => {
    const { annualTuitionMin } = college.feeStructure;
    if (annualTuitionMin === null) {
      return 'Notice pending';
    }
    return `₹${annualTuitionMin.toLocaleString('en-IN')}`;
  };

  const photoSrc = college.campusImageUrl || `/images/colleges/${college.slug}.jpg`;

  // -------------------------------------------------------------
  // VERTICAL LAYOUT (For Grids, e.g. 'Explore Similar Institutions')
  // -------------------------------------------------------------
  if (layout === 'vertical') {
    return (
      <article className="relative bg-gradient-to-br from-white via-[#FAFBFD] to-[#F1F5F9]/80 rounded-2xl sm:rounded-3xl border border-slate-200/80 hover:border-[#1455B8]/40 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_-8px_rgba(20,85,184,0.16)] transition-all duration-300 overflow-hidden flex flex-col group h-full">
        {/* Specular Top Rim Highlight */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:via-[#1455B8]/70 transition-all duration-500 z-10" />

        {/* Ambient Hover Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-500/5 group-hover:bg-blue-500/10 rounded-full blur-2xl pointer-events-none transition-all duration-500" />

        {/* 1. Full-Width Top Campus Photograph */}
        <div className="relative w-full h-48 shrink-0 overflow-hidden bg-slate-900">
          {!imageError ? (
            <Image
              src={photoSrc}
              alt={`${college.name} campus photography`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
              className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-[#0A1E4A] text-slate-300 p-4 text-center">
              <Building2 className="w-10 h-10 text-blue-400/60 mb-1" />
              <span className="text-[11px] font-mono font-bold text-white">WBJEE Code #{college.wbjeebCode}</span>
            </div>
          )}

          {/* Bottom Gradient Scrim for crisp readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-black/20 pointer-events-none" />

          {/* Top Overlaid Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md backdrop-blur-md border ${
                isGovt
                  ? 'bg-emerald-600/90 text-white border-emerald-400/40'
                  : 'bg-[#0E2856]/90 text-blue-100 border-blue-400/30'
              }`}
            >
              {isGovt ? 'Government' : 'Autonomous Private'}
            </span>

            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 border border-white/20 shadow-md">
              WBJEE #{college.wbjeebCode}
            </span>
          </div>

          {/* Bottom Overlaid Short Name & District */}
          <div className="absolute bottom-3 left-3.5 right-3.5 z-10 text-white">
            <span className="text-xs font-mono font-extrabold text-amber-300 uppercase tracking-wider block">
              {college.shortName}
            </span>
          </div>
        </div>

        {/* 2. Card Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            {/* Title */}
            <Link href={`/colleges/${college.slug}`} className="block group-hover:text-[#1455B8] transition-colors">
              <h3 className="text-base font-heading font-extrabold text-[#0B1F44] group-hover:text-[#1455B8] transition-colors leading-snug line-clamp-2">
                {college.name}
              </h3>
            </Link>

            {/* Location & Established */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#1455B8]/80 shrink-0" />
                <span className="truncate">{college.city}, West Bengal</span>
              </div>
              <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                Est. {college.established}
              </span>
            </div>

            {/* Micro-Badges Row */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {college.naacGrade && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/80 flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-600" />
                  <span>NAAC {college.naacGrade}</span>
                </span>
              )}
              {formatNirfRank(college.nirfRankEngineering2024) && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-purple-50 text-purple-900 border border-purple-200/80 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-purple-600" />
                  <span>{formatNirfRank(college.nirfRankEngineering2024)}</span>
                </span>
              )}
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-slate-100/90 text-slate-700 border border-slate-200/70">
                {college.programs.length} Branches
              </span>
            </div>
          </div>

          {/* 3. Fee Display & Action Buttons */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50/60 to-indigo-50/40 border border-blue-100/70 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                  Annual Tuition
                </span>
                <span className="text-base font-heading font-extrabold text-[#0E3E8C] block tabular-nums">
                  {formatFee()}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">per year</span>
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-2 pt-0.5">
              <Link
                href={`/colleges/${college.slug}`}
                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0E2856] via-[#1455B8] to-[#1D4ED8] hover:from-[#091C3E] hover:to-[#1455B8] active:scale-[0.98] text-white text-xs font-heading font-bold text-center transition-all shadow-sm hover:shadow-md hover:shadow-blue-500/20 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={handleCompareClick}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  inCompare
                    ? 'bg-blue-50 text-[#1455B8] border-blue-300 font-bold shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200 hover:border-[#1455B8] hover:text-[#1455B8]'
                }`}
                title="Add to comparison"
              >
                <div
                  className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                    inCompare
                      ? 'bg-[#1455B8] border-[#1455B8] text-white'
                      : 'border-slate-400'
                  }`}
                >
                  {inCompare && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span>Compare</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // -------------------------------------------------------------
  // HORIZONTAL LAYOUT (For Directory Row Stacks)
  // -------------------------------------------------------------
  return (
    <article className="relative bg-gradient-to-br from-white via-[#FAFBFD] to-[#F1F5F9]/80 rounded-2xl sm:rounded-3xl border border-slate-200/80 hover:border-[#1455B8]/40 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_-8px_rgba(20,85,184,0.16)] transition-all duration-300 overflow-hidden p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 group">
      {/* Specular Top Rim Highlight Line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:via-[#1455B8]/70 transition-all duration-500" />

      {/* Subtle Ambient Hover Glow */}
      <div className="absolute -top-20 -right-20 w-44 h-44 bg-blue-500/5 group-hover:bg-blue-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-500" />

      {/* 1. Authentic Campus Photograph on Left */}
      <div className="w-full sm:w-52 md:w-60 h-44 sm:h-36 shrink-0 relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 shadow-xs">
        {!imageError ? (
          <Image
            src={photoSrc}
            alt={`${college.name} verified campus photography`}
            fill
            sizes="(max-width: 640px) 100vw, 260px"
            className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-[#0A1E4A] text-slate-300 p-4 text-center">
            <Building2 className="w-8 h-8 text-blue-400/60 mb-1" />
            <span className="text-[10px] font-mono font-bold text-white">WBJEE Code #{college.wbjeebCode}</span>
          </div>
        )}

        {/* Bottom Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-black/20 pointer-events-none" />

        {/* On-Photo Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md backdrop-blur-md border ${
              isGovt
                ? 'bg-emerald-600/90 text-white border-emerald-400/40'
                : 'bg-[#0E2856]/90 text-blue-100 border-blue-400/30'
            }`}
          >
            {isGovt ? 'Government' : 'Autonomous'}
          </span>
        </div>

        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md text-amber-300 border border-white/20 shadow-md">
            WBJEE #{college.wbjeebCode}
          </span>
        </div>
      </div>

      {/* 2. Middle Content Column: Name, Location, Badges */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-[#1455B8] border border-blue-200/70">
            {college.shortName}
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium truncate">
            <MapPin className="w-3.5 h-3.5 text-[#1455B8]/80 shrink-0" />
            <span className="truncate">{college.city}, West Bengal</span>
          </div>
        </div>

        <Link href={`/colleges/${college.slug}`} className="block group-hover:text-[#1455B8] transition-colors">
          <h3 className="text-base sm:text-lg font-heading font-extrabold text-[#0B1F44] group-hover:text-[#1455B8] transition-colors leading-snug line-clamp-2 sm:line-clamp-1">
            {college.name}
          </h3>
        </Link>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {college.naacGrade && (
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/80 flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-600" />
              <span>NAAC {college.naacGrade}</span>
            </span>
          )}

          {formatNirfRank(college.nirfRankEngineering2024) && (
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-900 border border-purple-200/80 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-purple-600" />
              <span>{formatNirfRank(college.nirfRankEngineering2024)}</span>
            </span>
          )}

          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-slate-100/90 text-slate-700 border border-slate-200/70">
            {college.programs.length} Approved Branches
          </span>

          <span className="text-[11px] font-semibold text-slate-400 hidden md:inline-block">
            • Est. {college.established}
          </span>
        </div>
      </div>

      {/* 3. Right Column: Annual Tuition & Action Buttons */}
      <div className="sm:border-l sm:border-slate-200/80 sm:pl-6 shrink-0 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        <div className="text-left sm:text-right p-2.5 sm:p-0 sm:bg-transparent rounded-xl bg-blue-50/50 border sm:border-0 border-blue-100/60">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
            Annual Tuition
          </span>
          <span className="text-lg sm:text-xl font-heading font-extrabold text-[#0E3E8C] block tabular-nums">
            {formatFee()}
          </span>
          <span className="text-[10px] text-slate-400 font-medium hidden sm:block">
            per academic year
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Details Button */}
          <Link
            href={`/colleges/${college.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0E2856] via-[#1455B8] to-[#1D4ED8] hover:from-[#091C3E] hover:to-[#1455B8] active:scale-[0.98] text-white text-xs font-heading font-bold transition-all shadow-sm hover:shadow-md hover:shadow-blue-500/20 cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Compare Button */}
          <button
            type="button"
            onClick={handleCompareClick}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
              inCompare
                ? 'bg-blue-50 text-[#1455B8] border-blue-300 font-bold shadow-xs'
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200 hover:border-[#1455B8] hover:text-[#1455B8]'
            }`}
            title="Add to comparison"
          >
            <div
              className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                inCompare
                  ? 'bg-[#1455B8] border-[#1455B8] text-white'
                  : 'border-slate-400'
              }`}
            >
              {inCompare && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <span>Compare</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default CollegeCard;
