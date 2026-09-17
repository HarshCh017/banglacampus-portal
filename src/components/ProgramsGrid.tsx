'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { VERIFIED_BRANCHES } from '@/data/branches';
import { Cpu, Code, Brain, Network, Radio, Zap, Settings, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export function ProgramsGrid() {
  const [filter, setFilter] = useState<'all' | 'computer' | 'circuits' | 'core'>('all');

  const getBranchIcon = (slug: string) => {
    if (slug.includes('aiml') || slug.includes('ai')) return Brain;
    if (slug.includes('cs') || slug === 'it') return Code;
    if (slug === 'ece') return Radio;
    if (slug === 'ee' || slug === 'eee') return Zap;
    if (slug === 'me') return Settings;
    return Cpu;
  };

  const filteredBranches = VERIFIED_BRANCHES.filter((branch) => {
    if (filter === 'all') return true;
    if (filter === 'computer') return branch.slug.startsWith('cs') || branch.slug === 'it';
    if (filter === 'circuits') return branch.slug === 'ece' || branch.slug === 'ee' || branch.slug === 'eee';
    if (filter === 'core') return branch.slug === 'me' || branch.slug === 'ee';
    return true;
  });

  const handleSelectBranch = (slug: string) => {
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      const select = formElement.querySelector('select[name="branch"]') as HTMLSelectElement | null;
      if (select) {
        select.value = slug;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="programs" className="py-16 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">
              Academic Disciplines
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Approved B.Tech Programs &amp; Specializations
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              All undergraduate degrees are approved by AICTE and awarded under the autonomous framework of MAKAUT.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'computer', label: 'Computing & Software' },
              { id: 'circuits', label: 'Electronics & Electrical' },
              { id: 'core', label: 'Core Engineering' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-2 sm:py-1.5 min-h-[38px] rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all active:scale-95 ${
                  filter === tab.id
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => {
            const Icon = getBranchIcon(branch.slug);
            const isNba = branch.highlights.some((h) => h.includes('NBA'));

            return (
              <div
                key={branch.slug}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-brandBlue-300"
              >
                <div>
                  {/* Top Bar: Icon + Accreditations */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-brandBlue-600 flex items-center justify-center group-hover:bg-brandBlue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    {isNba && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700">
                        <ShieldCheck className="w-3 h-3" />
                        NBA Accredited
                      </span>
                    )}
                  </div>

                  {/* Title & Short Details */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-brandBlue-600 transition-colors">
                    {branch.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{branch.intakeEst}</p>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {branch.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    {branch.highlights.slice(0, 2).map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-brandTeal-600 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Published Criteria Preview */}
                  <div className="mt-4 p-2.5 rounded-md bg-slate-50 border border-slate-100 text-[11px] text-slate-600 flex justify-between items-center">
                    <span>Published Cutoff Guide:</span>
                    <span className="font-semibold text-slate-800">
                      {branch.minPcmPercent ? `${branch.minPcmPercent}% PCM` : 'Inquire Criteria'}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-3 flex items-center justify-between gap-2">
                  <Link
                    href={`/courses/${branch.slug}`}
                    className="text-xs font-semibold text-slate-700 hover:text-brandBlue-600 flex items-center gap-1"
                  >
                    <span>View Curriculum</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleSelectBranch(branch.slug)}
                    className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-brandBlue-600 hover:text-white text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                  >
                    Select &amp; Inquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
