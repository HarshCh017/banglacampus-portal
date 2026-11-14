'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Award, ShieldCheck, ArrowRight, ExternalLink, Scale, Check } from 'lucide-react';
import { VERIFIED_COLLEGES } from '@/data/colleges';
import { formatLocation, formatNirfRank } from '@/lib/utils';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

type CategoryFilter = 'All' | 'State University Faculty' | 'Government Engineering College' | 'Autonomous Private Institute';

export function VerifiedProfilesCompactGrid() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>('All');
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const filteredColleges = useMemo(() => {
    if (activeTab === 'All') {
      return VERIFIED_COLLEGES.slice(0, 6);
    }
    return VERIFIED_COLLEGES.filter((c) => c.category === activeTab);
  }, [activeTab]);

  const toggleCompare = (slug: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, slug];
    });
  };

  const tabs: { label: string; value: CategoryFilter; count: number }[] = [
    { label: 'All Verified', value: 'All', count: VERIFIED_COLLEGES.length },
    {
      label: 'State Universities',
      value: 'State University Faculty',
      count: VERIFIED_COLLEGES.filter((c) => c.category === 'State University Faculty').length,
    },
    {
      label: 'Government GECs',
      value: 'Government Engineering College',
      count: VERIFIED_COLLEGES.filter((c) => c.category === 'Government Engineering College').length,
    },
    {
      label: 'Autonomous Private',
      value: 'Autonomous Private Institute',
      count: VERIFIED_COLLEGES.filter((c) => c.category === 'Autonomous Private Institute').length,
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Audited Institutional Profiles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#ECF4F0] tracking-tight">
            Curated College Profiles
          </h2>
          <p className="text-xs sm:text-sm text-[#9DB0A8] mt-1 max-w-xl leading-relaxed">
            Direct regulatory citations, NAAC grades, seat matrices, and transparent tuition structures for West Bengal engineering colleges.
          </p>
        </div>

        {/* Category Tabs with Animated Pill */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#0B1210] border border-[rgba(255,255,255,0.08)]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive ? 'text-slate-950 font-bold' : 'text-[#9DB0A8] hover:text-[#ECF4F0]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="compact-filter-pill"
                    className="absolute inset-0 bg-[#10B981] rounded-lg shadow-sm"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-[#111C18] text-[#9DB0A8]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* College Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredColleges.map((college) => {
            const isCompared = selectedForCompare.includes(college.slug);
            const nirfFormatted = formatNirfRank(college.nirfRankEngineering2024);
            const locationFormatted = formatLocation(college.city, college.district);
            const feeMin = college.feeStructure.annualTuitionMin;
            const feeMax = college.feeStructure.annualTuitionMax;

            return (
              <motion.div
                key={college.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <SpotlightCard className="h-full bg-[#0B1210] border-[rgba(255,255,255,0.08)] hover:border-[#10B981]/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300">
                  <div className="space-y-3.5">
                    {/* Header Row: Category Badge + NIRF Chip */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-[#111C18] text-[#9DB0A8] border border-[rgba(255,255,255,0.06)] truncate">
                        {college.category === 'State University Faculty'
                          ? 'State University'
                          : college.category === 'Government Engineering College'
                          ? 'Government GEC'
                          : 'Autonomous Pvt'}
                      </span>
                      {nirfFormatted && (
                        <span className="text-[10px] font-mono font-bold text-[#F5B942] bg-[rgba(245,185,66,0.12)] border border-[rgba(245,185,66,0.25)] px-2 py-0.5 rounded-md shrink-0">
                          {nirfFormatted}
                        </span>
                      )}
                    </div>

                    {/* College Title & Location */}
                    <div>
                      <Link
                        href={`/colleges/${college.slug}`}
                        className="text-base font-serif font-bold text-[#ECF4F0] hover:text-[#10B981] transition-colors line-clamp-1"
                      >
                        {college.name}
                      </Link>
                      <p className="text-xs text-[#9DB0A8] mt-0.5 font-medium">
                        {locationFormatted} · Est. {college.established}
                      </p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[rgba(255,255,255,0.06)] text-xs">
                      <div className="p-2 rounded-xl bg-[#05080A] border border-[rgba(255,255,255,0.04)]">
                        <span className="text-[10px] text-[#9DB0A8] block">Tuition Band</span>
                        <span className="font-mono font-bold text-[#ECF4F0] truncate block">
                          {feeMin !== null
                            ? `₹${(feeMin / 1000).toFixed(1)}k${feeMax && feeMax !== feeMin ? `–₹${(feeMax / 1000).toFixed(1)}k` : ''}/yr`
                            : 'Govt Nominal'}
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-[#05080A] border border-[rgba(255,255,255,0.04)]">
                        <span className="text-[10px] text-[#9DB0A8] block">Accreditation</span>
                        <span className="font-mono font-bold text-[#10B981] truncate block">
                          {college.naacGrade ? `NAAC ${college.naacGrade}` : 'AICTE Approved'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-4 mt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => toggleCompare(college.slug)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                        isCompared
                          ? 'bg-[#10B981] text-slate-950 font-bold'
                          : 'bg-[#111C18] text-[#9DB0A8] hover:text-[#ECF4F0] border border-[rgba(255,255,255,0.06)]'
                      }`}
                    >
                      {isCompared ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Scale className="w-3.5 h-3.5" />
                          <span>Compare</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/colleges/${college.slug}`}
                      className="text-xs font-semibold text-[#10B981] hover:text-[#34D399] flex items-center gap-1 group/link"
                    >
                      <span>Full Profile</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Floating Compare Drawer Bar if items are selected */}
      {selectedForCompare.length > 0 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0B1210]/95 backdrop-blur-xl border border-[#10B981]/40 shadow-2xl shadow-black p-3.5 rounded-2xl flex items-center gap-4 max-w-lg w-[90%]"
        >
          <div className="flex items-center gap-2 text-xs font-medium text-[#ECF4F0] flex-1">
            <Scale className="w-4 h-4 text-[#10B981]" />
            <span>
              {selectedForCompare.length} college{selectedForCompare.length > 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedForCompare([])}
              className="text-xs text-[#9DB0A8] hover:text-[#ECF4F0] px-2 py-1 cursor-pointer"
            >
              Clear
            </button>
            <Link
              href={`/compare?colleges=${selectedForCompare.join(',')}`}
              className="px-4 py-1.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md"
            >
              <span>Compare Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      )}

      {/* View Full Directory Link */}
      <div className="mt-8 text-center">
        <Link
          href="/colleges"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#10B981] hover:text-[#34D399] transition-colors group"
        >
          <span>Explore All 20 Verified Engineering Colleges in Directory</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
