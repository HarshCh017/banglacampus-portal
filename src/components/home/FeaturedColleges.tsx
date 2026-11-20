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
  Building2,
} from 'lucide-react';
import { VERIFIED_COLLEGES } from '@/data/colleges';
import { useComparison } from '@/context/ComparisonContext';

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
    <section
      id="colleges"
      style={{ paddingTop: 64, paddingBottom: 64, background: '#ffffff', borderTop: '1px solid #dddddd' }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-5">
          <div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: '#222222',
                lineHeight: 1.3,
                marginBottom: 6,
              }}
            >
              Featured Engineering Colleges
            </h2>
            <p style={{ fontSize: 14, color: '#6a6a6a', maxWidth: 480 }}>
              Verified B.Tech institutions in West Bengal — ranked by academic standards, cutoffs, and audited fee schedules.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canScrollLeft}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                border: '1px solid #dddddd',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollLeft ? 'pointer' : 'not-allowed',
                opacity: canScrollLeft ? 1 : 0.35,
                transition: 'all 0.15s',
                color: '#3f3f3f',
              }}
              aria-label="Previous colleges"
            >
              <ChevronLeft style={{ width: 18, height: 18 }} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!canScrollRight}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                border: '1px solid #dddddd',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollRight ? 'pointer' : 'not-allowed',
                opacity: canScrollRight ? 1 : 0.35,
                transition: 'all 0.15s',
                color: '#3f3f3f',
              }}
              aria-label="Next colleges"
            >
              <ChevronRight style={{ width: 18, height: 18 }} />
            </button>
          </div>
        </div>

        {/* Carousel / 3-col grid */}
        <div
          ref={scrollContainerRef}
          className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-4 pt-1"
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
                className="snap-start group w-[290px] min-w-[290px] lg:w-full lg:min-w-0 flex-shrink-0 lg:flex-shrink"
                style={{
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: '#ffffff',
                  border: '1px solid #dddddd',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    'rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.1) 0 4px 8px';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                {/* 16:9 Photo */}
                <Link
                  href={`/colleges/${college.slug}`}
                  aria-label={`View ${college.name} profile`}
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 9',
                    width: '100%',
                    overflow: 'hidden',
                    background: '#f7f7f7',
                    display: 'block',
                  }}
                >
                  <Image
                    src={primaryImage}
                    alt={college.name}
                    fill
                    sizes="(max-width: 640px) 290px, (max-width: 1024px) 290px, 380px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Category badge — top-left */}
                  <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: 9999,
                        background: isGovt ? '#0F8B70' : '#102A56',
                        color: '#ffffff',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {isGovt ? 'Government' : 'Autonomous'}
                    </span>
                  </div>

                  {/* NAAC badge */}
                  {college.naacGrade && (
                    <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
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
                        NAAC {college.naacGrade}
                      </span>
                    </div>
                  )}
                </Link>

                {/* Card Body */}
                <div style={{ padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {/* Name + location */}
                  <div>
                    <Link href={`/colleges/${college.slug}`}>
                      <h3
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: '#222222',
                          lineHeight: 1.3,
                          marginBottom: 2,
                        }}
                        className="hover:text-[#102A56] transition-colors truncate"
                      >
                        {college.shortName || college.name}
                      </h3>
                    </Link>
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#6a6a6a', fontSize: 14 }}
                    >
                      <MapPin style={{ width: 13, height: 13, flexShrink: 0 }} />
                      <span className="truncate">{college.city}, West Bengal</span>
                    </div>
                  </div>

                  {/* Metrics row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: 10,
                      background: '#f7f7f7',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: 11, color: '#6a6a6a', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Annual Tuition
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#222222', display: 'block' }}>
                        {college.feeStructure.annualTuitionMin
                          ? `₹${college.feeStructure.annualTuitionMin.toLocaleString('en-IN')}`
                          : 'Notice pending'}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: 11, color: '#6a6a6a', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Branches
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#222222', display: 'block' }}>
                        {college.programs?.length || '—'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 8,
                      borderTop: '1px solid #dddddd',
                    }}
                  >
                    <Link
                      href={`/colleges/${college.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 13,
                        fontWeight: 500,
                        color: '#102A56',
                      }}
                      aria-label={`View profile and cutoffs for ${college.shortName}`}
                    >
                      <span>View Profile</span>
                      <ArrowRight style={{ width: 13, height: 13 }} />
                    </Link>

                    {/* Compare pill button — navy outline */}
                    <button
                      type="button"
                      aria-label={`Compare ${college.shortName} with other colleges`}
                      onClick={() => {
                        if (selected) {
                          removeFromCompare(college.slug);
                        } else {
                          addToCompare(college.slug);
                        }
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '4px 12px',
                        borderRadius: 9999,
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        background: selected ? '#102A56' : 'transparent',
                        color: selected ? '#ffffff' : '#102A56',
                        border: `1px solid #102A56`,
                      }}
                    >
                      {selected ? (
                        <>
                          <Check style={{ width: 11, height: 11 }} />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus style={{ width: 11, height: 11 }} />
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

        {/* View All CTA */}
        <div style={{ textAlign: 'center', paddingTop: 32 }}>
          <Link
            href="/colleges"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 24px',
              borderRadius: 9999,
              border: '1px solid #dddddd',
              background: '#ffffff',
              color: '#222222',
              fontSize: 14,
              fontWeight: 500,
              transition: 'all 0.15s',
            }}
          >
            <span>Explore All 20 Verified Engineering Colleges</span>
            <ArrowRight style={{ width: 15, height: 15, color: '#102A56' }} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedColleges;
