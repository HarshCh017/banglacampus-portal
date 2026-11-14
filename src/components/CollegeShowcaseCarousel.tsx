'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { College } from '@/types/college';
import { formatNirfRank, formatLocation } from '@/lib/utils';
import { useComparison } from '@/context/ComparisonContext';
import { useAuth } from '@/context/AuthContext';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  ArrowRight,
  Award,
  Bookmark,
  Check,
  Scale,
  Building2,
  TrendingUp,
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

interface CollegeShowcaseCarouselProps {
  colleges: College[];
}

export function CollegeShowcaseCarousel({ colleges }: CollegeShowcaseCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { isInCompare, addToCompare, removeFromCompare, selectedSlugs, maxLimit } = useComparison();
  const { user, toggleBookmark } = useAuth();

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    onScroll();
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect, onScroll]);

  // Autoplay with pause on hover
  useEffect(() => {
    if (!emblaApi || isHovered) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [emblaApi, isHovered]);

  return (
    <section
      aria-label="Campus Spotlight Carousel"
      className="relative py-16 sm:py-24 bg-[#05080A] border-y border-[rgba(255,255,255,0.06)] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(16,185,129,0.12)] text-[#10B981] border border-[rgba(16,185,129,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Campus Spotlight • Audited Architectural Visuals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#ECF4F0] tracking-tight">
              Explore West Bengal Engineering Campuses
            </h2>
            <p className="text-sm text-[#9DB0A8] leading-relaxed">
              Drag, swipe, or inspect accredited institutions across districts. Compare verified annual fees, WBJEE codes, and program offerings.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono text-[#60726A] mr-2 hidden sm:inline">
              {selectedIndex + 1} / {colleges.length}
            </span>
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous college slide"
              className="w-10 h-10 rounded-xl bg-[#0B1210] hover:bg-[#111C18] border border-[rgba(255,255,255,0.08)] hover:border-[#10B981] text-[#ECF4F0] flex items-center justify-center transition-colors shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next college slide"
              className="w-10 h-10 rounded-xl bg-[#0B1210] hover:bg-[#111C18] border border-[rgba(255,255,255,0.08)] hover:border-[#10B981] text-[#ECF4F0] flex items-center justify-center transition-colors shadow-md cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embla Viewport */}
        <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
          <div className="flex -ml-4 sm:-ml-6 py-4">
            {colleges.map((college, idx) => {
              const isActive = idx === selectedIndex;
              const inCompare = isInCompare(college.slug);
              const canAdd = selectedSlugs.length < maxLimit;
              const isBookmarked = user?.bookmarkedColleges?.includes(college.slug);
              const nirfBadge = formatNirfRank(college.nirfRankEngineering2024);
              const minFee = college.feeStructure.annualTuitionMin;
              const feeFormatted = minFee ? `₹${minFee.toLocaleString('en-IN')}/yr` : 'Notice Pending';
              // Normalized fee bar (scale 0-100% relative to 200k max)
              const feePercent = minFee ? Math.min(100, Math.max(10, Math.round((minFee / 180000) * 100))) : 15;

              const photoSrc = college.campusImageUrl || `/images/colleges/${college.slug}.jpg`;
              // Identify non-campus view to trigger elegant fallback monogram
              const isGenericPhoto = !college.campusImageUrl;

              return (
                <div
                  key={college.id}
                  className="pl-4 sm:pl-6 flex-[0_0_88%] sm:flex-[0_0_55%] lg:flex-[0_0_36%] min-w-0 transition-all duration-500 ease-out"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(0.95)',
                    opacity: isActive ? 1 : 0.65,
                  }}
                >
                  <SpotlightCard className="h-full bg-[#0B1210] rounded-2xl border-[rgba(255,255,255,0.08)] p-0 overflow-hidden shadow-2xl flex flex-col justify-between group">
                    {/* 4:3 Image Header with Ken-Burns Hover Zoom */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#05080A]">
                      {!isGenericPhoto ? (
                        <>
                          <Image
                            src={photoSrc}
                            alt={`${college.name} campus architecture`}
                            fill
                            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 55vw, 36vw"
                            className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1210] via-black/45 to-transparent" />
                        </>
                      ) : (
                        /* Architectural Monogram Fallback */
                        <div className="w-full h-full bg-gradient-to-br from-[#064E3B]/40 via-[#0B1210] to-[#05080A] p-6 flex flex-col justify-between relative alpona-motif">
                          <div className="flex items-center justify-between text-xs text-[#10B981]">
                            <span className="font-mono font-bold">WBJEE {college.wbjeebCode}</span>
                            <Building2 className="w-4 h-4 text-[#10B981]" />
                          </div>
                          <div className="text-center py-4">
                            <div className="w-16 h-16 rounded-2xl bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.3)] text-[#10B981] font-serif font-black text-2xl flex items-center justify-center mx-auto shadow-lg">
                              {college.shortName.substring(0, 2).toUpperCase()}
                            </div>
                          </div>
                          <div className="text-[11px] text-[#9DB0A8] text-center font-medium">
                            {formatLocation(college.city, college.district)}
                          </div>
                        </div>
                      )}

                      {/* Top Chips: WBJEE Code & Category */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#05080A] text-[#10B981] border border-[rgba(255,255,255,0.12)] shadow-md">
                            Code: {college.wbjeebCode}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#111C18] text-[#ECF4F0] border border-[rgba(255,255,255,0.08)] shadow-md">
                            {college.category === 'State University Faculty'
                              ? 'State Univ'
                              : college.category === 'Government Engineering College'
                              ? 'Govt College'
                              : 'Autonomous'}
                          </span>
                        </div>

                        {/* Bookmark Heart Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleBookmark(college.slug);
                          }}
                          aria-label="Bookmark college"
                          className="p-1.5 rounded-full bg-[#05080A]/80 hover:bg-[#111C18] border border-[rgba(255,255,255,0.1)] text-[#ECF4F0] transition-colors cursor-pointer"
                        >
                          <Bookmark
                            className={`w-3.5 h-3.5 ${
                              isBookmarked ? 'fill-[#F5B942] text-[#F5B942]' : 'text-[#ECF4F0]'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Bottom Info: Location & NIRF */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs z-10">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#ECF4F0] drop-shadow-md">
                          <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                          <span className="truncate">{formatLocation(college.city, college.district)}</span>
                        </span>

                        {nirfBadge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#F5B942] text-slate-950 flex items-center gap-1 shadow-sm">
                            <Award className="w-3 h-3 text-slate-950" />
                            <span>{nirfBadge}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content & Stat Tiles */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-serif font-bold text-base sm:text-lg text-[#ECF4F0] group-hover:text-[#10B981] transition-colors line-clamp-2 leading-tight">
                          <Link href={`/colleges/${college.slug}`}>
                            {college.name}
                          </Link>
                        </h3>
                        <p className="text-xs text-[#9DB0A8] line-clamp-2 leading-relaxed mt-1">
                          {college.overview}
                        </p>
                      </div>

                      {/* 3 Stat Tiles */}
                      <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                        <div className="p-2 rounded-xl bg-[#05080A] border border-[rgba(255,255,255,0.06)]">
                          <div className="text-[9px] font-mono uppercase text-[#60726A]">Annual Fee</div>
                          <div className="text-xs font-bold text-[#ECF4F0] truncate mt-0.5">{feeFormatted}</div>
                        </div>
                        <div className="p-2 rounded-xl bg-[#05080A] border border-[rgba(255,255,255,0.06)]">
                          <div className="text-[9px] font-mono uppercase text-[#60726A]">Branches</div>
                          <div className="text-xs font-bold text-[#10B981] truncate mt-0.5">{college.programs.length} B.Tech</div>
                        </div>
                        <div className="p-2 rounded-xl bg-[#05080A] border border-[rgba(255,255,255,0.06)]">
                          <div className="text-[9px] font-mono uppercase text-[#60726A]">NAAC Grade</div>
                          <div className="text-xs font-bold text-[#F5B942] truncate mt-0.5">
                            {college.naacGrade ? `'${college.naacGrade}'` : 'AICTE'}
                          </div>
                        </div>
                      </div>

                      {/* Mini Fee Scale Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-[#60726A] font-mono">
                          <span>Tuition Scale</span>
                          <span>{feePercent}% index</span>
                        </div>
                        <div className="w-full bg-[#05080A] h-1.5 rounded-full overflow-hidden border border-[rgba(255,255,255,0.06)]">
                          <div
                            className="bg-gradient-to-r from-[#10B981] to-[#F5B942] h-full rounded-full transition-all duration-300"
                            style={{ width: `${feePercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Footer Actions: Compare Checkbox + Explore Link */}
                      <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            if (inCompare) removeFromCompare(college.slug);
                            else addToCompare(college.slug);
                          }}
                          disabled={!inCompare && !canAdd}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            inCompare
                              ? 'bg-[#10B981] text-slate-950 border-[#10B981]'
                              : canAdd
                              ? 'bg-[#05080A] text-[#9DB0A8] border-[rgba(255,255,255,0.08)] hover:text-[#ECF4F0]'
                              : 'opacity-40 cursor-not-allowed text-[#60726A]'
                          }`}
                        >
                          <Scale className="w-3.5 h-3.5" />
                          <span>{inCompare ? 'Added' : 'Compare'}</span>
                        </button>

                        <Link
                          href={`/colleges/${college.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#10B981] hover:text-[#34D399] transition-colors"
                        >
                          <span>Explore College</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="w-full bg-[#0B1210] rounded-full h-1.5 overflow-hidden border border-[rgba(255,255,255,0.06)]">
            <div
              className="bg-gradient-to-r from-[#10B981] to-[#F5B942] h-full rounded-full transition-all duration-200"
              style={{ width: `${Math.max(8, scrollProgress)}%` }}
            />
          </div>
          <Link
            href="/colleges"
            className="text-xs font-bold text-[#10B981] hover:text-[#34D399] whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <span>View All 20 Colleges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
