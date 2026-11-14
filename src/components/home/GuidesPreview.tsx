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
    <section id="guides-section" className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#1455B8] rounded-full"></span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#102A56] tracking-tight">
              Admission Guides &amp; Insights
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 font-medium">
            Step-by-step guides, college comparisons, cutoff trends and regulatory insights for WBJEE candidates.
          </p>
        </div>

        <Link
          href={`/guides${activeCategory !== 'All' ? `?category=${encodeURIComponent(activeCategory)}` : ''}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1455B8] hover:text-[#0E4496] transition-colors shrink-0 group"
        >
          <span>View all guides</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Interactive Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                isActive
                  ? 'bg-[#1455B8] text-white border-[#1455B8] shadow-md shadow-blue-500/20 scale-[1.02]'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#1455B8]/50 hover:text-[#1455B8] hover:bg-slate-50'
              }`}
              aria-pressed={isActive}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3-Column Image-Led Editorial Grid with Instant Response */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
        {displayedGuides.map((guide) => (
          <article
            key={guide.slug}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group p-4"
          >
            <div>
              {/* Thumbnail Image */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900 mb-4 select-none">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#1455B8] font-bold text-[11px] shadow-xs border border-white/80">
                  {guide.tag}
                </span>
              </div>

              {/* Publication Date & Read Time */}
              <div className="flex items-center gap-3 text-xs text-slate-500 px-1 mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
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
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{guide.readTimeMinutes} min read</span>
                </span>
              </div>

              {/* Guide Title */}
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#102A56] group-hover:text-[#1455B8] transition-colors leading-snug px-1 line-clamp-2">
                <Link href={guide.href}>
                  {guide.title}
                </Link>
              </h3>

              {/* Guide Excerpt */}
              <p className="text-xs text-[#64748B] mt-2 px-1 line-clamp-2 leading-relaxed">
                {guide.description}
              </p>
            </div>

            {/* Read Article Link */}
            <div className="pt-4 mt-3 px-1 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={guide.href}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1455B8] hover:text-[#0E4496] transition-colors group/link"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}

        {/* If Branches category is chosen, surface a dedicated Course Explorer card */}
        {activeCategory === 'Branches' && (
          <div className="bg-gradient-to-br from-[#0F2850] to-[#1455B8] text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                <Compass className="w-5 h-5 text-blue-200" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
                Engineering Specializations
              </span>
              <h3 className="text-lg font-heading font-extrabold text-white leading-tight">
                Explore 50+ WBJEE Engineering Branches
              </h3>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Compare Computer Science, Electronics, Mechanical, Civil, and AI/Data Science across colleges with approved intake seats.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white text-[#102A56] font-bold text-xs hover:bg-blue-50 transition-colors shadow-xs"
              >
                <span>Browse All Branches</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Action Bar Directing to Guides Library */}
      <div className="mt-8 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <Sparkles className="w-4 h-4 text-[#1455B8] shrink-0" />
          <span>
            Viewing {displayedGuides.length} curated articles in <strong className="text-[#102A56]">{activeCategory}</strong>
          </span>
        </div>

        <Link
          href={`/guides${activeCategory !== 'All' ? `?category=${encodeURIComponent(activeCategory)}` : ''}`}
          className="inline-flex items-center gap-1.5 font-bold text-[#1455B8] hover:text-[#0E4496] transition-colors"
        >
          <span>Open all {activeCategory === 'All' ? 'admission' : activeCategory} guides in Library</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}

export default GuidesPreview;
