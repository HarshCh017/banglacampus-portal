'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, GraduationCap, Award, ArrowRight, Sparkles, Scale, CheckCircle2 } from 'lucide-react';
import { VERIFIED_COLLEGES } from '@/data/colleges';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export function CategoryBentoGrid() {
  const stateUnivs = VERIFIED_COLLEGES.filter((c) => c.category === 'State University Faculty');
  const govtColleges = VERIFIED_COLLEGES.filter((c) => c.category === 'Government Engineering College');
  const autonomousColleges = VERIFIED_COLLEGES.filter((c) => c.category === 'Autonomous Private Institute');

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-80 bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Curated Institutional Categories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#ECF4F0] tracking-tight">
            Browse by Institutional Category
          </h2>
          <p className="text-xs sm:text-sm text-[#9DB0A8] mt-1 max-w-xl leading-relaxed">
            Explore audited fees, regulatory autonomy, and cutoff dynamics tailored to each educational tier in West Bengal.
          </p>
        </div>

        <Link
          href="/colleges"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10B981] hover:text-[#34D399] transition-colors shrink-0 group"
        >
          <span>All 20 Institutions</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* True Bento Grid (Asymmetric layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Bento 1 (Large 2-column feature tile): State University Faculties */}
        <div className="md:col-span-2">
          <SpotlightCard className="h-full bg-[#0B1210] border-[rgba(255,255,255,0.08)] hover:border-[#3B82F6]/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-black/50 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#3B82F6] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30">
                  {stateUnivs.length} Flagship Institutions
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#ECF4F0] group-hover:text-[#3B82F6] transition-colors">
                  State University Faculties
                </h3>
                <p className="text-xs sm:text-sm text-[#9DB0A8] mt-2 leading-relaxed max-w-2xl">
                  Flagship state engineering departments with premier research funding, NIRF national rankings, and heavily subsidized nominal tuition (~₹2.4k – ₹10k/yr). The highest competitive bar in WBJEE.
                </p>
              </div>

              {/* Sample college chips */}
              <div className="space-y-2 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9DB0A8] block">
                  Audited Institutions:
                </span>
                <div className="flex flex-wrap gap-2">
                  {stateUnivs.map((c) => (
                    <Link
                      key={c.id}
                      href={`/colleges/${c.slug}`}
                      className="text-xs font-medium px-3 py-1.5 rounded-xl bg-[#05080A] hover:bg-[#3B82F6]/20 text-[#ECF4F0] hover:text-[#3B82F6] border border-[rgba(255,255,255,0.08)] hover:border-[#3B82F6]/40 transition-colors flex items-center gap-1.5"
                    >
                      <span>{c.shortName}</span>
                      <span className="text-[10px] text-[#9DB0A8] font-mono">({c.city})</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mini Highlights Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
                <div className="p-3 rounded-xl bg-[#05080A] border border-[rgba(255,255,255,0.04)]">
                  <span className="text-[10px] text-[#9DB0A8] block">Tuition Band</span>
                  <span className="font-mono font-bold text-[#10B981] text-xs sm:text-sm">₹2,400 – ₹10,000 / yr</span>
                </div>
                <div className="p-3 rounded-xl bg-[#05080A] border border-[rgba(255,255,255,0.04)]">
                  <span className="text-[10px] text-[#9DB0A8] block">NIRF Ranked</span>
                  <span className="font-mono font-bold text-[#F5B942] text-xs sm:text-sm">Jadavpur (#10 Engg)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#05080A] border border-[rgba(255,255,255,0.04)] col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#9DB0A8] block">Cutoff Profile</span>
                  <span className="font-mono font-bold text-[#3B82F6] text-xs sm:text-sm">WBJEE Top ~1%</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
              <span className="text-xs text-[#9DB0A8]">Direct state research grants</span>
              <Link
                href="/colleges?category=State+University+Faculty"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#3B82F6] hover:text-cyan-300 transition-colors"
              >
                <span>Filter State Universities</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </SpotlightCard>
        </div>

        {/* Bento 2 (1 column tile): Government Engineering Colleges */}
        <div className="md:col-span-1">
          <SpotlightCard className="h-full bg-[#0B1210] border-[rgba(255,255,255,0.08)] hover:border-[#10B981]/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-black/50 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                  {govtColleges.length} Institutions
                </span>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-[#ECF4F0] group-hover:text-[#10B981] transition-colors">
                  Government Engineering Colleges
                </h3>
                <p className="text-xs text-[#9DB0A8] mt-2 leading-relaxed">
                  Established under Dept. of Higher Education (Govt. of WB). Affordable tuition, AICTE accreditation, and competitive WBJEE cutoffs.
                </p>
              </div>

              {/* Sample college chips */}
              <div className="space-y-2 pt-2 border-t border-[rgba(255,255,255,0.06)]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9DB0A8] block">
                  Key Campuses:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {govtColleges.slice(0, 4).map((c) => (
                    <Link
                      key={c.id}
                      href={`/colleges/${c.slug}`}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#05080A] hover:bg-[#10B981]/20 text-[#9DB0A8] hover:text-[#10B981] border border-[rgba(255,255,255,0.06)] hover:border-[#10B981]/40 transition-colors truncate max-w-[200px]"
                    >
                      {c.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.06)]">
              <Link
                href="/colleges?category=Government+Engineering+College"
                className="inline-flex items-center justify-between w-full text-xs font-bold text-[#10B981] group-hover:text-[#34D399] transition-colors"
              >
                <span>Filter Government GECs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </SpotlightCard>
        </div>

        {/* Bento 3 (1 column tile): Autonomous Private Institutions */}
        <div className="md:col-span-1">
          <SpotlightCard className="h-full bg-[#0B1210] border-[rgba(255,255,255,0.08)] hover:border-[#F5B942]/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-black/50 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#F5B942]/15 border border-[#F5B942]/30 text-[#F5B942] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#F5B942]/15 text-[#F5B942] border border-[#F5B942]/30">
                  {autonomousColleges.length} Institutions
                </span>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-[#ECF4F0] group-hover:text-[#F5B942] transition-colors">
                  Autonomous Private Institutes
                </h3>
                <p className="text-xs text-[#9DB0A8] mt-2 leading-relaxed">
                  UGC-autonomous institutions affiliated with MAKAUT. Active placement cells, modern labs, and specialized computer science branches.
                </p>
              </div>

              {/* Sample college chips */}
              <div className="space-y-2 pt-2 border-t border-[rgba(255,255,255,0.06)]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9DB0A8] block">
                  Top Private Picks:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {autonomousColleges.slice(0, 4).map((c) => (
                    <Link
                      key={c.id}
                      href={`/colleges/${c.slug}`}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#05080A] hover:bg-[#F5B942]/20 text-[#9DB0A8] hover:text-[#F5B942] border border-[rgba(255,255,255,0.06)] hover:border-[#F5B942]/40 transition-colors truncate max-w-[200px]"
                    >
                      {c.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.06)]">
              <Link
                href="/colleges?category=Autonomous+Private+Institute"
                className="inline-flex items-center justify-between w-full text-xs font-bold text-[#F5B942] group-hover:text-amber-300 transition-colors"
              >
                <span>Filter Autonomous Institutes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </SpotlightCard>
        </div>

        {/* Bento 4 (Wide 2-column tile): Multi-Dimensional Compare Matrix Feature */}
        <div className="md:col-span-2">
          <SpotlightCard className="h-full bg-gradient-to-r from-[#0B1210] to-[#111C18] border-[rgba(255,255,255,0.08)] hover:border-[#10B981]/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-black/50 transition-all duration-300 group">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-2 max-w-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#10B981]/15 text-[#10B981] flex items-center justify-center">
                    <Scale className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
                    Side-by-Side Comparison Matrix
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-serif font-bold text-[#ECF4F0]">
                  Compare Up to 3 Engineering Colleges Head-to-Head
                </h4>
                <p className="text-xs text-[#9DB0A8] leading-relaxed">
                  Directly align regulatory approvals, tuition fees, branch offerings, and WBJEE cutoffs without commercial sponsor manipulation.
                </p>
              </div>

              <Link
                href="/compare"
                className="px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
              >
                <span>Open Compare Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
