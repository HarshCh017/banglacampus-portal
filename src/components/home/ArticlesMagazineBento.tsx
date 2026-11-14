'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles } from 'lucide-react';
import { VERIFIED_ARTICLES } from '@/data/articles';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export function ArticlesMagazineBento() {
  const featured = VERIFIED_ARTICLES[0];
  const secondary = VERIFIED_ARTICLES.slice(1, 3);

  return (
    <section className="bg-[#05080A] py-16 px-4 sm:px-6 lg:px-8 border-y border-[rgba(255,255,255,0.08)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Independent Editorial Research</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#ECF4F0] tracking-tight">
              Essential Admission &amp; Counseling Guides
            </h2>
            <p className="text-xs sm:text-sm text-[#9DB0A8] mt-1 max-w-xl leading-relaxed">
              Objective breakdowns of WBJEE choice ordering, UGC autonomy vs affiliated status, and regulatory verification.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10B981] hover:text-[#34D399] transition-colors group shrink-0"
          >
            <span>All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Magazine Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured Large Article (7 cols) */}
          {featured && (
            <div className="lg:col-span-7">
              <SpotlightCard className="h-full bg-[#0B1210] border-[rgba(255,255,255,0.08)] hover:border-[#10B981]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-black/60 group">
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                      Featured Guide
                    </span>
                    <span className="text-xs text-[#9DB0A8] flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featured.readTimeMinutes} min read</span>
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#ECF4F0] group-hover:text-[#10B981] transition-colors leading-snug">
                    <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-[#9DB0A8] leading-relaxed">
                    {featured.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#05080A] text-[#9DB0A8] border border-[rgba(255,255,255,0.06)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                  <span className="text-xs text-[#9DB0A8] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(featured.publishedAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </span>

                  <Link
                    href={`/blog/${featured.slug}`}
                    className="text-xs font-bold text-[#10B981] hover:text-[#34D399] inline-flex items-center gap-1.5 group/btn"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </SpotlightCard>
            </div>
          )}

          {/* Secondary Stacked Articles (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondary.map((article) => (
              <SpotlightCard
                key={article.slug}
                className="flex-1 bg-[#0B1210] border-[rgba(255,255,255,0.08)] hover:border-[#10B981]/40 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl shadow-black/60 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#9DB0A8]">
                    <span className="font-semibold text-[#10B981]">{article.tags[0]}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTimeMinutes} min</span>
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-base text-[#ECF4F0] group-hover:text-[#10B981] transition-colors leading-snug">
                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                  </h4>

                  <p className="text-xs text-[#9DB0A8] line-clamp-2 leading-relaxed">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                  <span className="text-[11px] text-[#9DB0A8] font-mono">
                    {new Date(article.publishedAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>

                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-xs font-semibold text-[#10B981] hover:text-[#34D399] inline-flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
