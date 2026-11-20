'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { VERIFIED_ARTICLES } from '@/data/articles';
import { RESOURCE_ARTICLES } from '@/data/resources';

interface UnifiedGuide {
  slug: string;
  href: string;
  title: string;
  description: string;
  publishedAt: string;
  readTimeMinutes: number;
  tag: string;
  image: string;
  categories: string[];
}

export function GuidesPreview() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'WBJEE Process',
    'Counselling',
    'College Selection',
    'Branches',
    'Fees & Scholarships',
  ];

  // Comprehensive verified guides database mapped with categories & high-resolution imagery
  const allGuides: UnifiedGuide[] = useMemo(() => {
    const articleGuides: UnifiedGuide[] = VERIFIED_ARTICLES.map((article) => {
      const cats = ['All'];
      if (article.tags.includes('WBJEE') || article.slug.includes('wbjee')) {
        cats.push('WBJEE Process');
      }
      if (article.tags.includes('Counselling') || article.slug.includes('counselling') || article.tags.includes('Domicile')) {
        cats.push('Counselling');
      }
      if (article.tags.includes('Autonomous Colleges') || article.tags.includes('NAAC') || article.tags.includes('AICTE')) {
        cats.push('College Selection');
      }
      if (article.tags.includes('Scholarships') || article.tags.includes('TFW Quota')) {
        cats.push('Fees & Scholarships');
      }

      const thumbnails: Record<string, string> = {
        'wbjee-2026-counselling-choice-filling-guide': '/images/colleges/jadavpur-university-engineering-2.jpg',
        'autonomous-vs-makaut-affiliated-colleges': '/images/colleges/kalyani-government-engineering-college.jpg',
        'how-to-verify-aicte-naac-nba-accreditation': '/images/colleges/heritage-institute-of-technology.jpg',
        'wb-scholarships-svmcm-credit-card-guide': '/images/colleges/haldia-institute-of-technology-3.jpg',
        'wbjee-domicile-rules-proforma-explained': '/images/colleges/jalpaiguri-government-engineering-college-4.jpg',
      };

      return {
        slug: article.slug,
        href: `/guides/${article.slug}`,
        title: article.title,
        description: article.description,
        publishedAt: article.publishedAt,
        readTimeMinutes: article.readTimeMinutes,
        tag: article.tags[0] || 'WBJEE',
        image: thumbnails[article.slug] || '/images/colleges/jadavpur-university-engineering.jpg',
        categories: cats,
      };
    });

    // Add branch and strategy guides from resources
    const branchGuide = RESOURCE_ARTICLES.find((r) => r.slug === 'btech-cse-vs-it-vs-aiml-guide');
    if (branchGuide) {
      articleGuides.push({
        slug: branchGuide.slug,
        href: `/resources/${branchGuide.slug}`,
        title: branchGuide.title,
        description: branchGuide.excerpt,
        publishedAt: '2026-02-15',
        readTimeMinutes: 6,
        tag: 'Branch Selection',
        image: '/images/colleges/iem-kolkata.jpg',
        categories: ['All', 'Branches', 'College Selection'],
      });
    }

    const pathwayGuide = RESOURCE_ARTICLES.find((r) => r.slug === 'wbjee-vs-iemjee-admission-pathway');
    if (pathwayGuide) {
      articleGuides.push({
        slug: pathwayGuide.slug,
        href: `/resources/${pathwayGuide.slug}`,
        title: pathwayGuide.title,
        description: pathwayGuide.excerpt,
        publishedAt: '2026-02-10',
        readTimeMinutes: 5,
        tag: 'Admission Pathway',
        image: '/images/colleges/techno-main-salt-lake.jpg',
        categories: ['WBJEE Process', 'Counselling'],
      });
    }

    return articleGuides;
  }, []);

  // Filtered guides based on current category selection
  const displayedGuides = useMemo(() => {
    if (activeCategory === 'All') {
      return allGuides.filter((g) => g.categories.includes('All')).slice(0, 3);
    }
    return allGuides.filter((g) => g.categories.includes(activeCategory)).slice(0, 3);
  }, [allGuides, activeCategory]);

  return (
    <section id="guides-section" className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h2
            className="font-heading"
            style={{ fontSize: '22px', fontWeight: 500, color: '#222222' }}
          >
            Admission Guides &amp; Insights
          </h2>
          <p className="mt-1.5" style={{ fontSize: '14px', color: '#6a6a6a' }}>
            Step-by-step guides, college comparisons, cutoff trends and regulatory insights for
            WBJEE candidates.
          </p>
        </div>

        <Link
          href={`/guides${activeCategory !== 'All' ? `?category=${encodeURIComponent(activeCategory)}` : ''}`}
          className="inline-flex items-center gap-1.5 shrink-0 group"
          style={{ fontSize: '14px', fontWeight: 600, color: '#102A56', textDecoration: 'none' }}
        >
          <span>View all guides</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8" style={{ scrollbarWidth: 'none' }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className="whitespace-nowrap transition-all duration-200 cursor-pointer"
              style={{
                padding: '7px 16px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                border: `1px solid ${isActive ? '#102A56' : '#dddddd'}`,
                background: isActive ? '#102A56' : '#ffffff',
                color: isActive ? '#ffffff' : '#3f3f3f',
              }}
              aria-pressed={isActive}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3-Column Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedGuides.map((guide) => (
          <article
            key={guide.slug}
            className="flex flex-col overflow-hidden group transition-all duration-300"
            style={{
              background: '#ffffff',
              borderRadius: '14px',
              border: '1px solid #dddddd',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                'rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.1) 0 4px 8px';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            {/* Thumbnail Image */}
            <div
              className="relative w-full overflow-hidden select-none"
              style={{ aspectRatio: '16/10', background: '#f7f7f7' }}
            >
              <Image
                src={guide.image}
                alt={guide.title}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Tag Pill */}
              <span
                className="absolute top-3 left-3 font-medium"
                style={{
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  background: '#f7f7f7',
                  fontSize: '11px',
                  color: '#3f3f3f',
                  border: '1px solid #dddddd',
                }}
              >
                {guide.tag}
              </span>
            </div>

            <div className="flex flex-col flex-1 p-4">
              {/* Publication Date & Read Time */}
              <div className="flex items-center gap-3 mb-2" style={{ fontSize: '12px', color: '#6a6a6a' }}>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" style={{ color: '#6a6a6a' }} />
                  <span>
                    {new Date(guide.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" style={{ color: '#6a6a6a' }} />
                  <span>{guide.readTimeMinutes} min read</span>
                </span>
              </div>

              {/* Guide Title */}
              <h3
                className="font-heading font-semibold leading-snug line-clamp-2 mb-2 transition-colors"
                style={{ fontSize: '16px', color: '#222222' }}
              >
                <Link href={guide.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {guide.title}
                </Link>
              </h3>

              {/* Guide Excerpt */}
              <p
                className="line-clamp-2 leading-relaxed flex-1"
                style={{ fontSize: '13px', color: '#6a6a6a' }}
              >
                {guide.description}
              </p>

              {/* Read Article Link */}
              <div
                className="pt-4 mt-3 flex items-center justify-between"
                style={{ borderTop: '1px solid #f0f0f0' }}
              >
                <Link
                  href={guide.href}
                  className="inline-flex items-center gap-1.5 font-semibold group/link"
                  style={{ fontSize: '13px', color: '#102A56', textDecoration: 'none' }}
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </article>
        ))}

        {/* Branches category: dedicated Course Explorer card */}
        {activeCategory === 'Branches' && (
          <div
            className="flex flex-col justify-between p-6"
            style={{
              background: '#102A56',
              borderRadius: '14px',
              border: '1px solid #102A56',
            }}
          >
            <div className="space-y-3">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}
              >
                <Compass className="w-5 h-5" style={{ color: '#93c5fd' }} />
              </div>
              <span
                className="font-mono uppercase tracking-wider block"
                style={{ fontSize: '10px', color: '#93c5fd' }}
              >
                Engineering Specializations
              </span>
              <h3
                className="font-heading font-bold leading-tight"
                style={{ fontSize: '18px', color: '#ffffff' }}
              >
                Explore 50+ WBJEE Engineering Branches
              </h3>
              <p className="leading-relaxed" style={{ fontSize: '13px', color: 'rgba(219,234,254,0.8)' }}>
                Compare Computer Science, Electronics, Mechanical, Civil, and AI/Data Science
                across colleges with approved intake seats.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 w-full font-semibold transition-colors"
                style={{
                  fontSize: '13px',
                  color: '#102A56',
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  textDecoration: 'none',
                }}
              >
                <span>Browse All Branches</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div
        className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{
          background: '#ffffff',
          border: '1px solid #dddddd',
          borderRadius: '12px',
          padding: '14px 20px',
        }}
      >
        <div className="flex items-center gap-2" style={{ fontSize: '13px', color: '#3f3f3f' }}>
          <Sparkles className="w-4 h-4 shrink-0" style={{ color: '#102A56' }} />
          <span>
            Viewing {displayedGuides.length} curated articles in{' '}
            <strong style={{ color: '#222222' }}>{activeCategory}</strong>
          </span>
        </div>

        <Link
          href={`/guides${activeCategory !== 'All' ? `?category=${encodeURIComponent(activeCategory)}` : ''}`}
          className="inline-flex items-center gap-1.5 font-semibold"
          style={{ fontSize: '13px', color: '#102A56', textDecoration: 'none' }}
        >
          <span>Open all {activeCategory === 'All' ? 'admission' : activeCategory} guides in Library</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}

export default GuidesPreview;
