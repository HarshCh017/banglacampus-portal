'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
  ArrowRight,
  Search,
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
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#64748B] mb-4">
        <Link href="/" className="hover:text-[#1455B8] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#102A56]">Admission Guides</span>
      </nav>

      {/* 2. Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#102A56] tracking-tight">
          Admission Guides
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] mt-1.5">
          Step-by-step guides, college comparisons and expert insights for WBJEE aspirants.
        </p>
      </div>

      {/* 3. Category Filter Pills matching Mockup 7 */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-[#1455B8] text-white border-[#1455B8]'
                : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#102A56]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. 3-Column Guides Grid matching Mockup 7 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide, idx) => (
          <article
            key={guide.slug}
            className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Thumbnail Image Header */}
              <div className="relative aspect-[16/10] w-full bg-[#FAFBFD] overflow-hidden">
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
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#1455B8] font-bold text-[10px] shadow-2xs border border-white/50">
                    {guide.tags[0] || 'WBJEE'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h2 className="text-base sm:text-lg font-heading font-bold text-[#102A56] group-hover:text-[#1455B8] transition-colors leading-snug">
                  <Link href={`/guides/${guide.slug}`}>
                    {guide.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-[#64748B] mt-2.5 line-clamp-3 leading-relaxed">
                  {guide.description}
                </p>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="px-6 py-4 bg-[#FAFBFD] border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Calendar className="w-3 h-3 text-[#64748B]" />
                <span>
                  {new Date(guide.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </span>

              <span className="flex items-center gap-1 text-[11px] font-medium text-[#1455B8]">
                <Clock className="w-3 h-3 text-[#1455B8]" />
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
