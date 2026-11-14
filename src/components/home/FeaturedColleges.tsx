'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  Sparkles,
  Building2,
  Headphones,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { VERIFIED_COLLEGES } from '@/data/colleges';
import { useComparison } from '@/context/ComparisonContext';

// High-resolution authentic architectural campus photography mapping
const FEATURED_IMAGES: Record<string, string> = {
  'jadavpur-university-engineering': '/images/colleges/jadavpur-university-engineering-2.jpg',
  'kalyani-government-engineering-college': '/images/colleges/kalyani-government-engineering-college.jpg',
  'iem-kolkata': '/images/colleges/iem-kolkata.jpg',
  'techno-main-salt-lake': '/images/colleges/techno-main-salt-lake.jpg',
  'jalpaiguri-government-engineering-college': '/images/colleges/jalpaiguri-government-engineering-college-4.jpg',
  'haldia-institute-of-technology': '/images/colleges/haldia-institute-of-technology-3.jpg',
};

export function FeaturedColleges() {
  const { isInCompare, addToCompare, removeFromCompare } = useComparison();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 6 premier diverse institutions representing State, Govt, and Autonomous Private
  const featured = VERIFIED_COLLEGES.filter((c) =>
    [
      'jadavpur-university-engineering',
      'kalyani-government-engineering-college',
      'iem-kolkata',
      'techno-main-salt-lake',
      'jalpaiguri-government-engineering-college',
      'haldia-institute-of-technology',
    ].includes(c.slug)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);

    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 24
      : 360;
    const newIndex = Math.round(el.scrollLeft / cardWidth);
    setCurrentIndex(Math.min(Math.max(newIndex, 0), featured.length - 1));
  }, [featured.length]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  const scrollToIndex = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 24
      : 360;
    el.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    scrollToIndex(Math.max(currentIndex - 1, 0));
  };

  const handleNext = () => {
    scrollToIndex(Math.min(currentIndex + 1, featured.length - 1));
  };

  return (
    <section id="colleges" className="relative overflow-hidden py-10 sm:py-14 bg-gradient-to-b from-[#071538] via-[#0A1E4A] to-[#0D2255] border-t border-white/10">
      {/* 1. Ambient Glassmorphism Lighting & Atmospheric Glow Orbs */}
      <div className="absolute -top-32 right-1/4 w-[520px] h-[520px] bg-gradient-to-br from-blue-500/20 via-indigo-400/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 left-1/4 w-[460px] h-[460px] bg-gradient-to-tr from-cyan-500/15 via-emerald-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Pill, Typography, and Glass Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold tracking-wide uppercase shadow-xs mb-2.5 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Top Picks for WBJEE 2026</span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="w-2 h-7 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full shadow-xs"></span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight">
                Featured Colleges
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl font-medium">
              Top engineering colleges in West Bengal, based on reputation, academics and placements.
            </p>
          </div>

          {/* Carousel Frosted Glass Desktop Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canScrollLeft}
              className="w-11 h-11 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 hover:border-blue-400/40 hover:text-blue-300 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer active:scale-95"
              aria-label="Previous colleges"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!canScrollRight}
              className="w-11 h-11 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 hover:border-blue-400/40 hover:text-blue-300 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer active:scale-95"
              aria-label="Next colleges"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track with True Glassmorphism Cards */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-5 pt-1.5 px-0.5"
        >
          {featured.map((college) => {
            const selected = isInCompare(college.slug);
            const isGovt =
              college.category === 'State University Faculty' ||
              college.category === 'Government Engineering College';
            const primaryImage =
              FEATURED_IMAGES[college.slug] ||
              college.campusImageUrl ||
              `/images/colleges/${college.slug}.jpg`;

            return (
              <div
                key={college.slug}
                className="w-[290px] sm:w-[330px] md:w-[350px] shrink-0 snap-start rounded-2xl overflow-hidden bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3),0_0_20px_rgba(37,99,235,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_25px_50px_-10px_rgba(37,99,235,0.35),0_0_35px_rgba(37,99,235,0.2),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:-translate-y-1 hover:border-blue-400/40 transition-all duration-500 group flex flex-col justify-between"
              >
                {/* Specular Top Glass Highlight Rim */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20" />

                {/* Upper Campus Photography Section */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900 select-none">
                  <Image
                    src={primaryImage}
                    alt={college.name}
                    fill
                    sizes="(max-width: 640px) 290px, (max-width: 768px) 330px, 350px"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  {/* Multi-stage organic vignette mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071538]/95 via-[#071538]/30 to-transparent pointer-events-none" />

                  {/* Overlaid High-Contrast Institutional Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                    <span
                      className={`text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md tracking-wide ${
                        isGovt
                          ? 'bg-emerald-600 text-white shadow-emerald-950/40 border border-emerald-400/40'
                          : 'bg-violet-600 text-white shadow-violet-950/40 border border-violet-400/40'
                      }`}
                    >
                      {isGovt ? 'Government' : 'Private'}
                    </span>

                    {college.naacGrade && (
                      <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-md shadow-blue-950/40 border border-blue-400/40 tracking-wide">
                        NAAC {college.naacGrade}
                      </span>
                    )}
                  </div>

                  {/* Overlaid Bottom Frosted Glass Strip (Inside Photo) */}
                  <div className="absolute bottom-2.5 inset-x-2.5 px-3 py-1.5 rounded-xl bg-slate-950/65 backdrop-blur-md border border-white/20 flex items-center justify-between text-white text-xs shadow-xs z-10">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                      <span className="font-medium truncate">{college.city}, WB</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 pl-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                      <span className="font-semibold text-slate-200">Estd. {college.established}</span>
                    </div>
                  </div>
                </div>

                {/* Lower Details Glass Container */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3.5 bg-white/5 backdrop-blur-lg">
                  {/* College Name & Affiliation */}
                  <div>
                    <Link href={`/colleges/${college.slug}`}>
                      <h3 className="font-heading font-extrabold text-base sm:text-[17px] text-white group-hover:text-blue-300 transition-colors leading-snug truncate">
                        {college.shortName || college.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-400 font-medium mt-1 truncate">
                      {college.affiliation.replace(/\([^)]*\)/g, '').trim()}
                    </p>
                  </div>

                  {/* Frosted Glass Metrics Surface (Tuition & Programs) */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Annual Tuition
                      </span>
                      <span className="text-base sm:text-lg font-black text-blue-300 block tabular-nums tracking-tight">
                        {college.feeStructure.annualTuitionMin
                          ? `₹${college.feeStructure.annualTuitionMin.toLocaleString('en-IN')}`
                          : 'Notice pending'}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-right">
                        B.Tech Programs
                      </span>
                      <span className="text-base sm:text-lg font-black text-emerald-400 block tabular-nums tracking-tight text-right">
                        {college.programs?.length || '—'}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Actions Row */}
                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/10">
                    <Link
                      href={`/colleges/${college.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-300 hover:text-blue-200 transition-colors group/link cursor-pointer"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        if (selected) {
                          removeFromCompare(college.slug);
                        } else {
                          addToCompare(college.slug);
                        }
                      }}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 ${
                        selected
                          ? 'bg-[#1455B8] text-white shadow-blue-500/25 border border-blue-400/40'
                          : 'bg-white/10 backdrop-blur-sm text-slate-300 hover:bg-white/20 hover:text-blue-300 hover:border-blue-400/40 border border-white/20'
                      }`}
                    >
                      {selected ? (
                        <>
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3 stroke-[2.5]" />
                          <span>Compare</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile Carousel Swipe Hints / Pagination Dots */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 pt-4">
          {featured.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === i ? 'w-6 bg-blue-400' : 'w-1.5 bg-slate-600'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Strategic Glassmorphism Free College Counselling Banner for Featured Colleges */}
        <div className="relative mt-10 rounded-3xl overflow-hidden bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-2xl border border-white/20 p-6 sm:p-8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5),0_0_30px_rgba(37,99,235,0.2),inset_0_1px_2px_rgba(255,255,255,0.3)] transition-all duration-300 text-white">
          {/* Specular Top Glass Highlight Rim */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

          {/* Dual Glow Orbs */}
          <div className="absolute -top-16 -right-16 w-52 h-52 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/35 text-amber-200 text-xs font-bold tracking-wide uppercase shadow-xs backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>100% Free WBJEE Choice Filling Guidance</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight">
                Confused Between These 20 Engineering Colleges?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Don&apos;t risk your 4-year engineering future on rumors. Get a verified 1-on-1 cutoff comparison, tuition fee breakdown, and branch placement analysis tailored to your WBJEE rank.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-1 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Audited 2026 Cutoffs</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Headphones className="w-4 h-4 text-blue-300 shrink-0" />
                  <span>15-Minute Expert Call</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Zero Consultancy Fees</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="#counselling-panel"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/25 transition-all cursor-pointer active:scale-95"
              >
                <Phone className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                <span className="whitespace-nowrap">Get Free Counselling Call</span>
              </a>
              <Link
                href="/colleges"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <span>View All 20 Colleges</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FeaturedColleges;
