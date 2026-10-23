'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { VERIFIED_CUTOFFS, CollegeCutoffRecord } from '@/data/cutoffs';
import { useComparison } from '@/context/ComparisonContext';
import {
  Compass,
  Search,
  Scale,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Building2,
  Award,
  ChevronRight,
  SlidersHorizontal,
  Info,
} from 'lucide-react';

export function CutoffExplorerClient() {
  const { isInCompare, addToCompare, removeFromCompare, selectedSlugs, maxLimit } = useComparison();

  const [inputRank, setInputRank] = useState<number>(3500);
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const matches = useMemo(() => {
    return VERIFIED_CUTOFFS.filter((record) => {
      if (selectedStream !== 'all' && record.branchSlug !== selectedStream) {
        return false;
      }
      if (selectedCategory !== 'all' && record.category !== selectedCategory) {
        return false;
      }
      return true;
    }).map((record) => {
      let status: 'PROBABLE' | 'COMPETITIVE' | 'ASPIRATIONAL' | 'OUT_OF_RANGE';
      if (inputRank <= record.approxClosingRankRound1) {
        status = 'PROBABLE';
      } else if (inputRank <= record.approxClosingRankFinalRound) {
        status = 'COMPETITIVE';
      } else if (inputRank <= Math.round(record.approxClosingRankFinalRound * 1.25)) {
        status = 'ASPIRATIONAL';
      } else {
        status = 'OUT_OF_RANGE';
      }
      return { ...record, status };
    }).sort((a, b) => {
      const order = { PROBABLE: 1, COMPETITIVE: 2, ASPIRATIONAL: 3, OUT_OF_RANGE: 4 };
      if (order[a.status] !== order[b.status]) {
        return order[a.status] - order[b.status];
      }
      return a.approxClosingRankRound1 - b.approxClosingRankRound1;
    });
  }, [inputRank, selectedStream, selectedCategory]);

  const targetCount = matches.filter((m) => m.status === 'PROBABLE').length;
  const competitiveCount = matches.filter((m) => m.status === 'COMPETITIVE').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <Compass className="w-4 h-4 text-emerald-700" />
          <span>WBJEE Counselling Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
          WBJEE Rank & Cutoff Explorer
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Explore historical closing rank archives from official WBJEE centralized counselling rounds. Enter your General Merit Rank (GMR) to see which engineering programs historically aligned with your score.
        </p>
      </div>

      {/* Mandatory Non-Determining Disclosure */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 text-xs text-amber-950 space-y-1.5 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-amber-950">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Historical Guidance Only · Not a Guarantee of Seat Allotment</span>
        </div>
        <p className="leading-relaxed">
          Cutoffs shown on BanglaCampus are referenced from official WBJEEB archived closing ranks. Seat matrices, reservation quotas, question paper standard, and candidate preferences fluctuate every year. This tool provides comparative context and does NOT promise or guarantee admission into any institution.
        </p>
      </div>

      {/* Rank Input & Filter Controls Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* Rank Input */}
          <div className="space-y-2">
            <label htmlFor="gmrRank" className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
              Enter Your WBJEE GMR Rank
            </label>
            <div className="relative">
              <input
                id="gmrRank"
                type="number"
                min={1}
                max={100000}
                value={inputRank}
                onChange={(e) => setInputRank(Math.max(1, Number(e.target.value) || 1))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                GMR
              </span>
            </div>
            <span className="text-[11px] text-slate-500 block">
              Quick presets:{' '}
              <button
                type="button"
                onClick={() => setInputRank(350)}
                className="text-emerald-700 font-bold underline mr-1.5"
              >
                350
              </button>
              <button
                type="button"
                onClick={() => setInputRank(2500)}
                className="text-emerald-700 font-bold underline mr-1.5"
              >
                2,500
              </button>
              <button
                type="button"
                onClick={() => setInputRank(6500)}
                className="text-emerald-700 font-bold underline mr-1.5"
              >
                6,500
              </button>
              <button
                type="button"
                onClick={() => setInputRank(12000)}
                className="text-emerald-700 font-bold underline"
              >
                12,000
              </button>
            </span>
          </div>

          {/* Stream Selector */}
          <div className="space-y-2">
            <label htmlFor="streamSelect" className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
              Engineering Stream
            </label>
            <select
              id="streamSelect"
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Available Streams</option>
              <option value="cse">Computer Science & Engineering (CSE)</option>
              <option value="it">Information Technology (IT)</option>
              <option value="ece">Electronics & Communication (ECE)</option>
              <option value="me">Mechanical Engineering (ME)</option>
            </select>
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <label htmlFor="catSelect" className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
              Institution Category
            </label>
            <select
              id="catSelect"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Institution Types</option>
              <option value="State University Faculty">State University Faculty</option>
              <option value="Government Engineering College">Government Engineering College</option>
              <option value="Autonomous Private Institute">Autonomous Private Institute</option>
              <option value="Private Engineering College">Private Engineering College</option>
            </select>
          </div>
        </div>

        {/* Quick Summary Pill Row */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-500">Analysis for GMR {inputRank.toLocaleString('en-IN')}:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {targetCount} Round-1 Matches
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
              {competitiveCount} Later Round Possibilities
            </span>
          </div>

          <span className="text-slate-400 font-medium">Source: WBJEE Centralized Allotment Archives</span>
        </div>
      </div>

      {/* Results Matrix */}
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-900">
          Historical Closing Rank Comparisons ({matches.length} programs)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((record, idx) => {
            const inCompare = isInCompare(record.collegeSlug);
            const canAdd = selectedSlugs.length < maxLimit;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Code: {record.wbjeebCode}
                    </span>

                    {record.status === 'PROBABLE' && (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Probable Match</span>
                      </span>
                    )}
                    {record.status === 'COMPETITIVE' && (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                        Competitive Target
                      </span>
                    )}
                    {record.status === 'ASPIRATIONAL' && (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        Aspirational / Reach
                      </span>
                    )}
                    {record.status === 'OUT_OF_RANGE' && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        Historically Stricter Cutoff
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-base text-slate-900">
                      <Link
                        href={`/colleges/${record.collegeSlug}`}
                        className="hover:text-emerald-700 transition-colors"
                      >
                        {record.collegeName}
                      </Link>
                    </h3>
                    <span className="text-xs text-slate-500 block mt-0.5">{record.category}</span>
                  </div>

                  {/* Branch & Rank Thresholds */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
                    <span className="font-bold text-emerald-800 block text-xs sm:text-sm">
                      {record.branchName}
                    </span>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-600">
                      <span>Round 1 Cutoff: <strong>~{record.approxClosingRankRound1.toLocaleString('en-IN')}</strong></span>
                      <span>Final Round: <strong>~{record.approxClosingRankFinalRound.toLocaleString('en-IN')}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (inCompare) {
                        removeFromCompare(record.collegeSlug);
                      } else {
                        addToCompare(record.collegeSlug);
                      }
                    }}
                    disabled={!inCompare && !canAdd}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                      inCompare
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : canAdd
                        ? 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:text-emerald-700'
                        : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>{inCompare ? 'Added' : 'Compare'}</span>
                  </button>

                  <Link
                    href={`/colleges/${record.collegeSlug}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                  >
                    <span>Full Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
