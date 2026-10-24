'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { College } from '@/types/college';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  ArrowRight,
  Building2,
  Award,
  CheckCircle2,
  Coins,
} from 'lucide-react';

interface CollegeShowcaseCarouselProps {
  colleges: College[];
}

export function CollegeShowcaseCarousel({ colleges }: CollegeShowcaseCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    const maxScroll = scrollWidth - clientWidth;
    setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
  };

  useEffect(() => {
    updateScrollState();
    const current = scrollRef.current;
    if (current) {
      current.addEventListener('scroll', updateScrollState, { passive: true });
      window.addEventListener('resize', updateScrollState);
    }
    return () => {
      if (current) current.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [colleges]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = Math.min(scrollRef.current.clientWidth * 0.8, 420);
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative py-12 sm:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/80 overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Subsection Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Campus Spotlight • Verified Photography</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Explore Engineering Campuses
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Browse through accredited engineering institutions across West Bengal. Inspect verified campus photos, official WBJEE codes, tuition structures, and available disciplines.
            </p>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center text-xs font-semibold text-slate-500 mr-2">
              <span>Scroll to explore</span>
              <span className="mx-2">•</span>
              <span className="font-mono text-emerald-700 font-bold">{colleges.length} Institutions</span>
            </div>

            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all duration-200 ${
                canScrollLeft
                  ? 'bg-white text-slate-800 border-slate-300 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 shadow-sm hover:shadow cursor-pointer'
                  : 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-60'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all duration-200 ${
                canScrollRight
                  ? 'bg-white text-slate-800 border-slate-300 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 shadow-sm hover:shadow cursor-pointer'
                  : 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-60'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Track */}
        <div
          ref={scrollRef}
          tabIndex={0}
          aria-label="Engineering colleges horizontal carousel"
          className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pt-2 pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 no-scrollbar focus:outline-none focus:ring-2 focus:ring-emerald-500/20 rounded-3xl"
        >
          {colleges.map((college) => {
            const tuition = college.feeStructure.annualTuitionMin
              ? `₹${college.feeStructure.annualTuitionMin.toLocaleString('en-IN')}/yr`
              : 'Notice pending';

            const photoUrl = college.campusImageUrl || `/images/colleges/${college.slug}.jpg`;

            return (
              <Link
                key={college.id}
                href={`/colleges/${college.slug}`}
                className="group w-[285px] sm:w-[325px] md:w-[350px] shrink-0 snap-start bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* 1. College Photograph Header */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <Image
                    src={photoUrl}
                    alt={college.campusImageCaption || `${college.name} campus architecture`}
                    fill
                    sizes="(max-width: 640px) 285px, (max-width: 768px) 325px, 350px"
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                  {/* Overlays: Top Left WBJEE Code & Category */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                    <span className="text-[10px] font-black tracking-wider px-2 py-0.5 rounded-full bg-slate-950/85 text-emerald-400 border border-slate-700/60 font-mono shadow-xs backdrop-blur-xs">
                      WBJEE {college.wbjeebCode}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-600/90 text-white border border-emerald-400/40 shadow-xs backdrop-blur-xs">
                      {college.category === 'State University Faculty'
                        ? 'State Univ'
                        : college.category === 'Government Engineering College'
                        ? 'Govt College'
                        : 'Autonomous'}
                    </span>
                  </div>

                  {/* Overlays: Bottom Left Location */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
                    <span className="text-[11px] font-medium flex items-center gap-1 drop-shadow-sm text-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{college.city}, West Bengal</span>
                    </span>

                    {college.nirfRankEngineering2024 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/90 text-slate-950 border border-amber-300 shadow-xs backdrop-blur-xs flex items-center gap-1">
                        <Award className="w-3 h-3 text-slate-950" />
                        <span>NIRF #{college.nirfRankEngineering2024}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. College Content: 2-3 Line Heading with College Name & Overview */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                      {college.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {college.overview}
                    </p>
                  </div>

                  {/* Key Stats Chips */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Tuition
                      </span>
                      <span className="font-extrabold text-slate-900 font-mono text-xs sm:text-sm">
                        {tuition}
                      </span>
                    </div>

                    <div className="space-y-0.5 text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Programs
                      </span>
                      <span className="font-bold text-slate-700 text-xs">
                        {college.programs.length} B.Tech Disciplines
                      </span>
                    </div>
                  </div>

                  {/* 3. Interactive Action Indicator */}
                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors">
                    <span className="group-hover:underline flex items-center gap-1">
                      <span>Explore Campus & Cutoffs</span>
                    </span>
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-all flex items-center justify-center shrink-0">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Progress Bar & Mobile indicator */}
        <div className="flex items-center justify-between gap-4 pt-1">
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-150"
              style={{ width: `${Math.max(10, scrollProgress)}%` }}
            />
          </div>
          <Link
            href="/colleges"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 whitespace-nowrap shrink-0 flex items-center gap-1 hover:underline"
          >
            <span>View All Colleges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
