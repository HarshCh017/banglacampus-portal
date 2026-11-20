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
  Plus,
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
      <article
        style={{
          borderRadius: 14,
          border: '1px solid #dddddd',
          background: '#ffffff',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'box-shadow 0.2s, transform 0.2s',
        }}
        className="group h-full hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
      >
        {/* 1. Full-Width Top Campus Photograph */}
        <Link
          href={`/colleges/${college.slug}`}
          aria-label={`View details for ${college.name}`}
          className="relative w-full h-48 shrink-0 overflow-hidden bg-[#f7f7f7] block cursor-pointer"
        >
          {!imageError ? (
            <Image
              src={photoSrc}
              alt={`${college.name} campus photography`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#f7f7f7] text-[#6a6a6a] p-4 text-center">
              <Building2 className="w-10 h-10 text-[#102A56]/40 mb-1" />
              <span className="text-[11px] font-mono font-bold text-[#102A56]">WBJEE Code #{college.wbjeebCode}</span>
            </div>
          )}

          {/* Top Overlaid Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: 9999,
                background: isGovt ? '#0F8B70' : '#102A56',
                color: '#ffffff',
              }}
            >
              {isGovt ? 'Government' : 'Autonomous'}
            </span>

            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: '3px 8px',
                borderRadius: 9999,
                background: '#ffffff',
                color: '#3f3f3f',
                border: '1px solid #dddddd',
              }}
            >
              WBJEE #{college.wbjeebCode}
            </span>
          </div>
        </Link>

        {/* 2. Card Content Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            {/* Title */}
            <Link href={`/colleges/${college.slug}`} className="block group-hover:text-[#102A56] transition-colors">
              <h3 className="text-base font-heading font-bold text-[#222222] group-hover:text-[#102A56] transition-colors leading-snug line-clamp-2">
                {college.name}
              </h3>
            </Link>

            {/* Location & Established */}
            <div className="flex items-center justify-between text-xs text-[#6a6a6a]">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#102A56] shrink-0" />
                <span className="truncate">{college.city}, West Bengal</span>
              </div>
              <span className="text-[11px] text-[#888888] shrink-0 font-medium">
                Est. {college.established}
              </span>
            </div>

            {/* Micro-Badges Row */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {college.naacGrade && (
                <span
                  style={{ borderRadius: 9999, border: '1px solid #dddddd', background: '#f7f7f7' }}
                  className="text-[10px] font-semibold px-2 py-0.5 text-[#222222]"
                >
                  NAAC {college.naacGrade}
                </span>
              )}
              {formatNirfRank(college.nirfRankEngineering2024) && (
                <span
                  style={{ borderRadius: 9999, border: '1px solid #dddddd', background: '#f7f7f7' }}
                  className="text-[10px] font-semibold px-2 py-0.5 text-[#222222]"
                >
                  {formatNirfRank(college.nirfRankEngineering2024)}
                </span>
              )}
              <span
                style={{ borderRadius: 9999, border: '1px solid #dddddd', background: '#f7f7f7' }}
                className="text-[10px] font-semibold px-2 py-0.5 text-[#6a6a6a]"
              >
                {college.programs.length} Branches
              </span>
            </div>
          </div>

          {/* 3. Fee Display & Action Buttons */}
          <div style={{ borderTop: '1px solid #eeeeee' }} className="pt-3 space-y-3">
            <div className="p-2.5 rounded-xl bg-[#f7f7f7] border border-[#dddddd] flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#6a6a6a] block">
                  Annual Tuition
                </span>
                <span className="text-base font-heading font-extrabold text-[#102A56] block tabular-nums">
                  {formatFee()}
                </span>
              </div>
              <span className="text-[10px] text-[#888888] font-medium">per year</span>
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-2 pt-0.5">
              <Link
                href={`/colleges/${college.slug}`}
                aria-label={`View details and cutoffs for ${college.shortName}`}
                style={{
                  borderRadius: 9999,
                  background: '#102A56',
                }}
                className="flex-1 py-2 px-3 text-white text-xs font-heading font-bold text-center transition-opacity hover:opacity-90 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                aria-label={`Add ${college.shortName} to comparison`}
                onClick={handleCompareClick}
                style={{
                  borderRadius: 9999,
                  border: '1px solid #102A56',
                  background: inCompare ? '#102A56' : '#ffffff',
                  color: inCompare ? '#ffffff' : '#102A56',
                }}
                className="px-3 py-2 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                title="Add to comparison"
              >
                {inCompare ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
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
    <article
      style={{
        borderRadius: 14,
        border: '1px solid #dddddd',
        background: '#ffffff',
        transition: 'box-shadow 0.2s, transform 0.2s',
      }}
      className="p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 group hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
    >
      {/* 1. Authentic Campus Photograph on Left */}
      <Link
        href={`/colleges/${college.slug}`}
        aria-label={`View details for ${college.name}`}
        className="w-full sm:w-52 md:w-60 h-44 sm:h-36 shrink-0 relative rounded-xl overflow-hidden bg-[#f7f7f7] block cursor-pointer border border-[#eeeeee]"
      >
        {!imageError ? (
          <Image
            src={photoSrc}
            alt={`${college.name} verified campus photography`}
            fill
            sizes="(max-width: 640px) 100vw, 260px"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#f7f7f7] text-[#6a6a6a] p-4 text-center">
            <Building2 className="w-8 h-8 text-[#102A56]/40 mb-1" />
            <span className="text-[10px] font-mono font-bold text-[#102A56]">WBJEE Code #{college.wbjeebCode}</span>
          </div>
        )}

        {/* On-Photo Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10 pointer-events-none">
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 9999,
              background: isGovt ? '#0F8B70' : '#102A56',
              color: '#ffffff',
            }}
          >
            {isGovt ? 'Government' : 'Autonomous'}
          </span>
        </div>

        <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 9999,
              background: '#ffffff',
              color: '#3f3f3f',
              border: '1px solid #dddddd',
            }}
          >
            WBJEE #{college.wbjeebCode}
          </span>
        </div>
      </Link>

      {/* 2. Middle Content Column: Name, Location, Badges */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <span
            style={{
              borderRadius: 6,
              background: '#f7f7f7',
              border: '1px solid #dddddd',
              color: '#102A56',
            }}
            className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5"
          >
            {college.shortName}
          </span>
          <div className="flex items-center gap-1 text-xs text-[#6a6a6a] font-medium truncate">
            <MapPin className="w-3.5 h-3.5 text-[#102A56] shrink-0" />
            <span className="truncate">{college.city}, West Bengal</span>
          </div>
        </div>

        <Link href={`/colleges/${college.slug}`} className="block group-hover:text-[#102A56] transition-colors">
          <h3 className="text-base sm:text-lg font-heading font-bold text-[#222222] group-hover:text-[#102A56] transition-colors leading-snug line-clamp-2 sm:line-clamp-1">
            {college.name}
          </h3>
        </Link>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {college.naacGrade && (
            <span
              style={{ borderRadius: 9999, border: '1px solid #dddddd', background: '#f7f7f7' }}
              className="text-[11px] font-semibold px-2.5 py-0.5 text-[#222222]"
            >
              NAAC {college.naacGrade}
            </span>
          )}

          {formatNirfRank(college.nirfRankEngineering2024) && (
            <span
              style={{ borderRadius: 9999, border: '1px solid #dddddd', background: '#f7f7f7' }}
              className="text-[11px] font-semibold px-2.5 py-0.5 text-[#222222]"
            >
              {formatNirfRank(college.nirfRankEngineering2024)}
            </span>
          )}

          <span
            style={{ borderRadius: 9999, border: '1px solid #dddddd', background: '#f7f7f7' }}
            className="text-[11px] font-semibold px-2.5 py-0.5 text-[#6a6a6a]"
          >
            {college.programs.length} Approved Branches
          </span>

          <span className="text-[11px] font-medium text-[#888888] hidden md:inline-block">
            • Est. {college.established}
          </span>
        </div>
      </div>

      {/* 3. Right Column: Annual Tuition & Action Buttons */}
      <div
        style={{ borderLeftColor: '#eeeeee' }}
        className="sm:border-l sm:pl-6 shrink-0 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#eeeeee]"
      >
        <div className="text-left sm:text-right p-2.5 sm:p-0 sm:bg-transparent rounded-xl bg-[#f7f7f7] border sm:border-0 border-[#dddddd]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#6a6a6a] block">
            Annual Tuition
          </span>
          <span className="text-lg sm:text-xl font-heading font-extrabold text-[#102A56] block tabular-nums">
            {formatFee()}
          </span>
          <span className="text-[10px] text-[#888888] font-medium hidden sm:block">
            per academic year
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Details Button */}
          <Link
            href={`/colleges/${college.slug}`}
            aria-label={`View details and cutoffs for ${college.shortName}`}
            style={{
              borderRadius: 9999,
              background: '#102A56',
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-white text-xs font-heading font-bold transition-opacity hover:opacity-90 cursor-pointer shadow-xs"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Compare Button */}
          <button
            type="button"
            aria-label={`Add ${college.shortName} to comparison`}
            onClick={handleCompareClick}
            style={{
              borderRadius: 9999,
              border: '1px solid #102A56',
              background: inCompare ? '#102A56' : '#ffffff',
              color: inCompare ? '#ffffff' : '#102A56',
            }}
            className="px-3.5 py-2 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Add to comparison"
          >
            {inCompare ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
            <span>Compare</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default CollegeCard;
