'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { College } from '@/types/college';
import { useComparison } from '@/context/ComparisonContext';
import { useAuth } from '@/context/AuthContext';
import {
  MapPin,
  Award,
  CheckCircle2,
  Scale,
  ArrowRight,
  Building2,
  Bookmark,
  Check,
  ShieldCheck,
  Sparkles,
  Camera,
} from 'lucide-react';

interface CollegeCardProps {
  college: College;
}

export function CollegeCard({ college }: CollegeCardProps) {
  const { isInCompare, addToCompare, removeFromCompare, selectedSlugs, maxLimit } = useComparison();
  const { user, toggleBookmark } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);

  const inCompare = isInCompare(college.slug);
  const canAdd = selectedSlugs.length < maxLimit;
  const isBookmarked = user?.bookmarkedColleges?.includes(college.slug);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(college.slug);
    } else {
      addToCompare(college.slug);
    }
  };

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarking(true);
    await toggleBookmark(college.slug);
    setIsBookmarking(false);
  };

  const formatFee = () => {
    const { annualTuitionMin, annualTuitionMax } = college.feeStructure;
    if (annualTuitionMin === null || annualTuitionMax === null) {
      return 'Official fee notice pending';
    }
    if (annualTuitionMin === annualTuitionMax) {
      return `₹${annualTuitionMin.toLocaleString('en-IN')}/yr`;
    }
    return `₹${annualTuitionMin.toLocaleString('en-IN')} - ₹${annualTuitionMax.toLocaleString('en-IN')}/yr`;
  };

  const categoryColor =
    college.category === 'Government Engineering College' || college.category === 'State University Faculty'
      ? 'bg-emerald-600/90 text-white border-emerald-400/40'
      : 'bg-slate-900/90 text-white border-slate-700/60';

  const photoSrc = college.campusImageUrl || `/images/colleges/${college.slug}.jpg`;
  const hasPhoto = Boolean(photoSrc) && !imageError;

  return (
    <article className="group bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between overflow-hidden h-full">
      {/* 1. College Photograph Header */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        {hasPhoto ? (
          <>
            <Image
              src={photoSrc}
              alt={college.campusImageCaption || `${college.name} campus architecture and academic block`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={() => setImageError(true)}
              loading="lazy"
            />
            {/* Subtle Gradient Vignette for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          </>
        ) : (
          /* Graceful Fallback Architectural Banner */
          <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#10b98115_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="relative z-10 flex items-center justify-between text-xs text-emerald-300">
              <span className="font-mono font-bold">WBJEE CODE {college.wbjeebCode}</span>
              <Building2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="relative z-10 text-center py-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-900/80 border border-emerald-600/40 text-emerald-300 font-heading font-black text-xl flex items-center justify-center mx-auto shadow-md">
                {college.shortName.substring(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="relative z-10 text-[10px] text-slate-400 text-center truncate">
              {college.city}, West Bengal
            </div>
          </div>
        )}

        {/* Overlay Badges: Top Row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white border border-white/20 shadow-xs">
              Code: {college.wbjeebCode}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md border shadow-xs ${categoryColor}`}
            >
              {college.category === 'Government Engineering College'
                ? 'Govt. College'
                : college.category === 'State University Faculty'
                ? 'State Univ.'
                : 'Autonomous'}
            </span>
          </div>

          {/* Quick Bookmark Button */}
          <button
            type="button"
            onClick={handleBookmarkClick}
            disabled={isBookmarking}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
              isBookmarked
                ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                : 'bg-slate-950/70 text-white/90 hover:bg-slate-900 hover:text-white border border-white/20'
            }`}
            title={isBookmarked ? 'Saved to Your List' : 'Save for Counselling'}
            aria-label={isBookmarked ? 'Remove saved college' : 'Save college'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-slate-950' : ''}`} />
          </button>
        </div>

        {/* Overlay Badges: Bottom Row */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 text-xs">
          {hasPhoto ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-white/90 bg-slate-950/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 truncate max-w-[190px]">
              <Camera className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">{college.shortName} Campus</span>
            </span>
          ) : (
            <span />
          )}

          {college.nirfRankEngineering2024 && (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 flex items-center gap-1 shadow-md">
              <Award className="w-3 h-3 text-slate-950" />
              <span>
                {typeof college.nirfRankEngineering2024 === 'number'
                  ? `NIRF #${college.nirfRankEngineering2024}`
                  : 'NIRF Band'}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* 2. Card Content & Academic Highlights */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Official College Name */}
          <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
            <Link href={`/colleges/${college.slug}`} className="focus:outline-none focus:underline">
              {college.name}
            </Link>
          </h3>

          {/* Location & Affiliation */}
          <div className="space-y-1 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 font-medium text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                {college.city}, {college.district}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 truncate" title={college.affiliation}>
              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{college.affiliation}</span>
            </div>
          </div>

          {/* Institutional Overview Snippet */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
            {college.overview}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                Annual Tuition
              </span>
              <span className="font-bold text-slate-900 truncate block text-[11px] sm:text-xs">
                {formatFee()}
              </span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                Accreditation
              </span>
              <span className="font-bold text-slate-900 flex items-center gap-1 truncate text-[11px] sm:text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">
                  {college.naacGrade ? `NAAC '${college.naacGrade}'` : 'AICTE Approved'}
                </span>
              </span>
            </div>
          </div>

          {/* Verified Programs Chips */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Approved Engineering Branches ({college.programs.length})
            </span>
            <div className="flex flex-wrap gap-1">
              {college.programs.slice(0, 3).map((p) => (
                <span
                  key={p.slug}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                >
                  {p.name.replace('Engineering', 'Engg.').replace('Computer Science & Engg.', 'CSE')}
                </span>
              ))}
              {college.programs.length > 3 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  +{college.programs.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Card Footer Actions */}
      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleCompareClick}
          disabled={!inCompare && !canAdd}
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
            inCompare
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs hover:bg-emerald-700'
              : canAdd
              ? 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50'
              : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
          }`}
          title={!inCompare && !canAdd ? 'Maximum 3 colleges reached for side-by-side comparison' : undefined}
        >
          {inCompare ? <Check className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
          <span>{inCompare ? 'Compared' : 'Compare'}</span>
        </button>

        <Link
          href={`/colleges/${college.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 group/link py-1.5 px-2.5 rounded-xl hover:bg-emerald-50 transition-colors"
        >
          <span>Explore College</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
