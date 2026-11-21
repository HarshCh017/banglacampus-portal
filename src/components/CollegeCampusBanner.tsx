'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { College } from '@/types/college';
import { useComparison } from '@/context/ComparisonContext';
import {
  MapPin,
  Check,
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
      {/* 1. Authentic Campus Photo Banner */}
      <div className="relative h-44 sm:h-72 md:h-96 w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#dddddd] shadow-sm bg-slate-900 group">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Verified Caption on Bottom-Right */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium border border-white/20">
          📍 {college.city}, West Bengal • WBJEE #{college.wbjeebCode}
        </div>
      </div>

      {/* 2. College Profile Header Card */}
      <div
        style={{ borderRadius: '14px', border: '1px solid #dddddd' }}
        className="bg-white p-5 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5"
      >
        {/* Left: Eyebrow, Title, Description & Badges */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1455B8] block">
            By BengalCampus — Independent Education Resource
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#102A56] tracking-tight leading-tight">
            {college.slug === 'iem-kolkata'
              ? 'IEM Kolkata (Institute of Engineering & Management), Kolkata'
              : college.slug === 'haldia-institute-of-technology'
              ? 'Haldia Institute of Technology (HIT Haldia)'
              : `${college.name} Review: Fees, Placements & Admission Guidance`}
          </h1>
          <p className="text-xs sm:text-sm text-[#6a6a6a] max-w-2xl leading-relaxed">
            {college.slug === 'iem-kolkata'
              ? 'Explore Institute of Engineering & Management (IEM Kolkata) in Salt Lake Sector V: B.Tech programmes, official IEMJEE 2027 entrance route, verified ₹9.45L semester fee schedule, and audited NIRF placement records. BengalCampus is an independent research guide.'
              : college.slug === 'haldia-institute-of-technology'
              ? 'Explore Haldia Institute of Technology (HIT Haldia) in Hatiberia, Purba Medinipur: 14 B.Tech programmes, official 2026–27 fee schedule (₹6.12L without hostel / ₹7.61L with hostel), WBJEE & JEE Main closing cutoffs, and NIRF placement benchmarks. BengalCampus provides independent research guidance.'
              : `Considering ${college.shortName}? Check which campus and branch your rank qualifies for, verified 4-year tuition fees, and audited placement benchmarks. BengalCampus provides independent guidance while you compare your options.`}
          </p>

          {/* Location & Badges Row */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 pt-1">
            <span className="flex items-center gap-1 font-medium text-slate-500 mr-1">
              <MapPin className="w-4 h-4 text-[#102A56] shrink-0" />
              <span>{college.city}, West Bengal</span>
            </span>

            <span
              style={{
                borderRadius: 9999,
                background: isGovt ? '#E6F6F2' : '#F3F0FB',
                color: isGovt ? '#0F8B70' : '#7864C8',
                border: isGovt ? '1px solid #A7E3D4' : '1px solid #D9D1F2',
              }}
              className="text-[11px] font-bold px-2.5 py-0.5"
            >
              {isGovt ? 'Government' : 'Private Autonomous'}
            </span>

            {college.slug === 'iem-kolkata' ? (
              <>
                <Link
                  href="/iemjee"
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAF2FF] text-[#1455B8] border border-[#BFDBFE] hover:bg-[#D8E7FF] transition-colors"
                >
                  IEMJEE 2027 (Current Route)
                </Link>

                <span
                  style={{
                    borderRadius: 9999,
                    background: '#f7f7f7',
                    color: '#475569',
                    border: '1px solid #dddddd',
                  }}
                  className="text-[11px] font-medium px-2 py-0.5"
                >
                  Historical WBJEE #{college.wbjeebCode}
                </span>

                <span
                  style={{
                    borderRadius: 9999,
                    background: '#FEF8EB',
                    color: '#B45309',
                    border: '1px solid #FDE4B0',
                  }}
                  className="text-[11px] font-bold px-2.5 py-0.5"
                  title="Previous NAAC Grade A cycle concluded Dec 31, 2024; renewal in progress"
                >
                  NAAC Grade A (Historical Cycle)
                </span>

                <span
                  style={{
                    borderRadius: 9999,
                    background: '#FAF5FF',
                    color: '#6B21A8',
                    border: '1px solid #E9D5FF',
                  }}
                  className="text-[11px] font-semibold px-2 py-0.5"
                >
                  Affiliated to UEM Kolkata
                </span>
              </>
            ) : college.slug === 'haldia-institute-of-technology' ? (
              <>
                <span
                  style={{
                    borderRadius: 9999,
                    background: '#EAF2FF',
                    color: '#1455B8',
                    border: '1px solid #BFDBFE',
                  }}
                  className="text-[11px] font-bold px-2.5 py-0.5"
                >
                  WBJEE Code #106
                </span>

                <span
                  style={{
                    borderRadius: 9999,
                    background: '#f7f7f7',
                    color: '#475569',
                    border: '1px solid #dddddd',
                  }}
                  className="text-[11px] font-semibold px-2 py-0.5"
                >
                  MAKAUT Code #103
                </span>

                <span
                  style={{
                    borderRadius: 9999,
                    background: '#FEF8EB',
                    color: '#B45309',
                    border: '1px solid #FDE4B0',
                  }}
                  className="text-[11px] font-bold px-2.5 py-0.5"
                  title="Awarded 2018; certificate validity stated through Dec 31, 2025; renewal in progress"
                >
                  NAAC Grade A (Historical Cycle)
                </span>

                <span
                  style={{
                    borderRadius: 9999,
                    background: '#FAF5FF',
                    color: '#6B21A8',
                    border: '1px solid #E9D5FF',
                  }}
                  className="text-[11px] font-semibold px-2 py-0.5"
                >
                  NIRF 201–300 Rank Band
                </span>
              </>
            ) : (
              <>
                <span
                  style={{
                    borderRadius: 9999,
                    background: '#EAF2FF',
                    color: '#1455B8',
                    border: '1px solid #BFDBFE',
                  }}
                  className="text-[11px] font-bold px-2.5 py-0.5"
                >
                  WBJEE Code #{college.wbjeebCode}
                </span>

                {college.naacGrade && (
                  <span
                    style={{
                      borderRadius: 9999,
                      background: '#f7f7f7',
                      color: '#222222',
                      border: '1px solid #dddddd',
                    }}
                    className="text-[11px] font-bold px-2.5 py-0.5"
                  >
                    NAAC {college.naacGrade}
                  </span>
                )}
              </>
            )}

            <span
              style={{
                borderRadius: 9999,
                background: '#f7f7f7',
                color: '#6a6a6a',
                border: '1px solid #dddddd',
              }}
              className="text-[11px] font-semibold px-2 py-0.5"
            >
              AICTE Approved
            </span>
          </div>
        </div>

        {/* Right Actions: Compare & Check Rank */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
          {/* Compare Button */}
          <button
            type="button"
            onClick={handleToggleCompare}
            style={{
              borderRadius: '9999px',
              border: '1px solid #102A56',
              background: selected ? '#102A56' : '#ffffff',
              color: selected ? '#ffffff' : '#102A56',
            }}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center ${
                selected
                  ? 'bg-white border-white text-[#102A56]'
                  : 'border-[#102A56]'
              }`}
            >
              {selected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <span>{selected ? 'In Compare Deck' : 'Compare'}</span>
          </button>

          {/* Primary CTA */}
          <Link
            href={college.slug === 'iem-kolkata' ? '/iemjee' : `/wbjee-predictor?preselect=${college.slug}`}
            style={{
              borderRadius: '9999px',
              background: '#102A56',
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-white font-bold text-xs sm:text-sm transition-all hover:bg-[#0a1c38] shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>{college.slug === 'iem-kolkata' ? 'IEMJEE 2027 Admission Desk' : 'Check My Rank Match'}</span>
          </Link>

          {/* Official Portal Link */}
          {college.officialWebsite && (
            <a
              href={college.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                borderRadius: '9999px',
                border: '1px solid #dddddd',
              }}
              className="p-2.5 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors"
              title="Visit official college website"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default CollegeCampusBanner;
