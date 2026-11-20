'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Calendar,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { VERIFIED_ARTICLES } from '@/data/articles';

const CATEGORIES = [
  'All',
  'WBJEE Process',
  'Counselling',
  'College Selection',
  'Branches',
  'Fees & Scholarships',
];

export function GuidesLibraryClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : 'All'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredGuides = useMemo(() => {
    return VERIFIED_ARTICLES.filter((article) => {
      // Category filter
      if (selectedCategory !== 'All') {
        const matchesCategory =
          article.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase()) ||
          (selectedCategory === 'WBJEE Process' && (article.tags.includes('WBJEE') || article.slug.includes('wbjee'))) ||
          (selectedCategory === 'Counselling' && (article.tags.includes('Counselling') || article.slug.includes('counselling'))) ||
          (selectedCategory === 'Fees & Scholarships' && (article.tags.includes('TFW Quota') || article.tags.includes('Scholarships') || article.slug.includes('scholarship'))) ||
          (selectedCategory === 'College Selection' && (article.slug.includes('autonomous') || article.tags.includes('AICTE') || article.tags.includes('NAAC'))) ||
          (selectedCategory === 'Branches' && (article.tags.includes('Curriculum') || article.tags.includes('Autonomous Colleges')));
        if (!matchesCategory) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          article.title.toLowerCase().includes(q) ||
          article.description.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6a6a6a] mb-4">
        <Link href="/" className="hover:text-[#102A56] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#222222]">Admission Guides</span>
      </nav>

      {/* 2. Page Header */}
      <div className="mb-6">
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: '#222222',
            letterSpacing: '-0.02em',
          }}
        >
          Admission Guides &amp; Regulatory Analysis
        </h1>
        <p style={{ fontSize: 14, color: '#6a6a6a', marginTop: 4 }}>
          Audited editorial guides on WBJEE counseling procedures, accreditation verification, fee structures, and curriculum options.
        </p>
      </div>

      {/* 3. Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: 9999,
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              border: selectedCategory === cat ? '1px solid #102A56' : '1px solid #dddddd',
              background: selectedCategory === cat ? '#102A56' : '#ffffff',
              color: selectedCategory === cat ? '#ffffff' : '#6a6a6a',
              transition: 'all 0.15s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. 3-Column Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide, idx) => (
          <article
            key={guide.slug}
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #dddddd',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'box-shadow 0.2s',
            }}
            className="hover:shadow-airbnb group"
          >
            <div>
              {/* Thumbnail Image Header */}
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16/10',
                  width: '100%',
                  background: '#f7f7f7',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={
                    idx === 0
                      ? '/images/colleges/jadavpur-university-engineering.jpg'
                      : idx === 1
                      ? '/images/colleges/heritage-institute-of-technology.jpg'
                      : '/images/colleges/kalyani-government-engineering-college.jpg'
                  }
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div style={{ position: 'absolute', top: 12, left: 12 }}>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: 9999,
                      background: '#ffffff',
                      color: '#102A56',
                      fontWeight: 600,
                      fontSize: 11,
                      border: '1px solid #dddddd',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    }}
                  >
                    {guide.tags[0] || 'WBJEE'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: 20 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: '#222222', lineHeight: 1.3 }}>
                  <Link href={`/guides/${guide.slug}`} className="hover:text-[#102A56] transition-colors">
                    {guide.title}
                  </Link>
                </h2>

                <p style={{ fontSize: 13, color: '#6a6a6a', marginTop: 8, lineHeight: 1.5 }} className="line-clamp-3">
                  {guide.description}
                </p>
              </div>
            </div>

            {/* Footer Metadata */}
            <div
              style={{
                padding: '12px 20px',
                background: '#f7f7f7',
                borderTop: '1px solid #ebebeb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 12,
                color: '#6a6a6a',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Calendar style={{ width: 13, height: 13 }} />
                <span>
                  {new Date(guide.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </span>

              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 500, color: '#102A56' }}>
                <Clock style={{ width: 13, height: 13 }} />
                <span>{guide.readTimeMinutes} min read</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default GuidesLibraryClient;
