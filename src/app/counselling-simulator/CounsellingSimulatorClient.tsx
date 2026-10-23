'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { VERIFIED_CUTOFFS, CollegeCutoffRecord } from '@/data/cutoffs';
import { VERIFIED_COLLEGES, getCollegeBySlug } from '@/data/colleges';
import {
  SlidersHorizontal,
  Compass,
  ArrowRight,
  Printer,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ListOrdered,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Scale,
  Building2,
  ShieldCheck,
  Award,
} from 'lucide-react';

export function CounsellingSimulatorClient() {
  const [gmrRank, setGmrRank] = useState<number>(4500);
  const [selectedBranches, setSelectedBranches] = useState<string[]>(['cse', 'it']);
  const [maxAnnualFee, setMaxAnnualFee] = useState<number | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'State University Faculty',
    'Government Engineering College',
    'Autonomous Private Institute',
  ]);

  // Candidate choice preference list (ordered array of choice items)
  const [choiceList, setChoiceList] = useState<Array<CollegeCutoffRecord & { tier: 'AMBITIOUS' | 'TARGET' | 'SAFE' }>>([]);

  // Compute recommendations
  const recommendations = useMemo(() => {
    return VERIFIED_CUTOFFS.filter((record) => {
      // Branch filter
      if (selectedBranches.length > 0 && !selectedBranches.includes(record.branchSlug)) {
        return false;
      }
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(record.category)) {
        return false;
      }
      // Fee filter
      const college = getCollegeBySlug(record.collegeSlug);
      if (college && maxAnnualFee !== null) {
        const fee = college.feeStructure.annualTuitionMin ?? 0;
        if (fee > maxAnnualFee) return false;
      }
      return true;
    }).map((record) => {
      let tier: 'AMBITIOUS' | 'TARGET' | 'SAFE';
      if (gmrRank <= record.approxClosingRankRound1) {
        tier = 'SAFE';
      } else if (gmrRank <= record.approxClosingRankFinalRound) {
        tier = 'TARGET';
      } else {
        tier = 'AMBITIOUS';
      }
      return { ...record, tier };
    }).sort((a, b) => {
      const tierOrder = { AMBITIOUS: 1, TARGET: 2, SAFE: 3 };
      if (tierOrder[a.tier] !== tierOrder[b.tier]) {
        return tierOrder[a.tier] - tierOrder[b.tier];
      }
      return a.approxClosingRankRound1 - b.approxClosingRankRound1;
    });
  }, [gmrRank, selectedBranches, selectedCategories, maxAnnualFee]);

  const ambitiousOptions = recommendations.filter((r) => r.tier === 'AMBITIOUS');
  const targetOptions = recommendations.filter((r) => r.tier === 'TARGET');
  const safeOptions = recommendations.filter((r) => r.tier === 'SAFE');

  const addChoice = (item: CollegeCutoffRecord & { tier: 'AMBITIOUS' | 'TARGET' | 'SAFE' }) => {
    if (choiceList.some((c) => c.collegeSlug === item.collegeSlug && c.branchSlug === item.branchSlug)) {
      return;
    }
    setChoiceList((prev) => [...prev, item]);
  };

  const removeChoice = (index: number) => {
    setChoiceList((prev) => prev.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setChoiceList((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const moveDown = (index: number) => {
    if (index === choiceList.length - 1) return;
    setChoiceList((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const autoGenerateBalancedList = () => {
    const list: Array<CollegeCutoffRecord & { tier: 'AMBITIOUS' | 'TARGET' | 'SAFE' }> = [];
    // Top 3 ambitious
    ambitiousOptions.slice(0, 3).forEach((item) => list.push(item));
    // Top 5 target
    targetOptions.slice(0, 5).forEach((item) => list.push(item));
    // Top 4 safe
    safeOptions.slice(0, 4).forEach((item) => list.push(item));
    setChoiceList(list);
  };

  const toggleBranch = (b: string) => {
    if (selectedBranches.includes(b)) {
      if (selectedBranches.length > 1) {
        setSelectedBranches(selectedBranches.filter((x) => x !== b));
      }
    } else {
      setSelectedBranches([...selectedBranches, b]);
    }
  };

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((x) => x !== cat));
      }
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>WBJEE Counselling Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Interactive Choice-Filling Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Simulate your WBJEE e-counselling preference sequence using verified historical allotment archives. Order safe, target, and reach choices to minimize seat forfeiture risks.
          </p>
        </div>

        {choiceList.length > 0 && (
          <div className="flex items-center gap-2 shrink-0 no-print">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print Choice Sheet ({choiceList.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setChoiceList([])}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Reset List</span>
            </button>
          </div>
        )}
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 text-xs text-amber-950 space-y-1 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-amber-950">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Statutory Counselling Guidance Notice</span>
        </div>
        <p className="leading-relaxed">
          This simulator is an educational planning aid based on official archived closing ranks from WBJEEB centralized counselling rounds. Actual seat allotments depend on annual candidate preferences, reservation rosters, and seat matrices on <a href="https://wbjeeb.nic.in" target="_blank" rel="noopener noreferrer" className="underline font-bold">wbjeeb.nic.in</a>. No outcome is guaranteed.
        </p>
      </div>

      {/* Simulator Inputs Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 no-print">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {/* GMR Input */}
          <div className="space-y-2 md:col-span-1">
            <label htmlFor="simGmr" className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
              Your WBJEE GMR Rank
            </label>
            <input
              id="simGmr"
              type="number"
              min={1}
              max={100000}
              value={gmrRank}
              onChange={(e) => setGmrRank(Math.max(1, Number(e.target.value) || 1))}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span>Presets:</span>
              <button type="button" onClick={() => setGmrRank(1500)} className="text-emerald-700 font-bold underline">1.5k</button>
              <button type="button" onClick={() => setGmrRank(4500)} className="text-emerald-700 font-bold underline">4.5k</button>
              <button type="button" onClick={() => setGmrRank(8500)} className="text-emerald-700 font-bold underline">8.5k</button>
              <button type="button" onClick={() => setGmrRank(15000)} className="text-emerald-700 font-bold underline">15k</button>
            </div>
          </div>

          {/* Preferred Branches */}
          <div className="space-y-2 md:col-span-2">
            <span className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
              Target Branches (Select multiple)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'CSE', slug: 'cse' },
                { label: 'IT', slug: 'it' },
                { label: 'ECE', slug: 'ece' },
                { label: 'EE', slug: 'ee' },
                { label: 'ME', slug: 'me' },
                { label: 'CE', slug: 'ce' },
              ].map((b) => {
                const active = selectedBranches.includes(b.slug);
                return (
                  <button
                    key={b.slug}
                    type="button"
                    onClick={() => toggleBranch(b.slug)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      active
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Max Annual Fee Filter */}
          <div className="space-y-2 md:col-span-1">
            <label htmlFor="feeBudget" className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
              Annual Fee Budget
            </label>
            <select
              id="feeBudget"
              value={maxAnnualFee ?? 'any'}
              onChange={(e) => setMaxAnnualFee(e.target.value === 'any' ? null : Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="any">Any Fee Band</option>
              <option value="30000">Subsidized (&lt; ₹30,000/yr)</option>
              <option value="60000">Moderate (&lt; ₹60,000/yr)</option>
              <option value="130000">Private Standard (&lt; ₹1.3 Lakh/yr)</option>
            </select>
          </div>
        </div>

        {/* Categories Selector */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-700">Institution Categories:</span>
            {[
              'State University Faculty',
              'Government Engineering College',
              'Autonomous Private Institute',
              'Private Engineering College',
            ].map((cat) => {
              const active = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={autoGenerateBalancedList}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auto-Generate 3-Tier Sequence</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Interface: Choice Basket (Left/Right) & Available Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Personalized Choice Order */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-emerald-700" />
                  <span>My Preferred Choice List</span>
                </h2>
                <p className="text-[11px] text-slate-500">
                  {choiceList.length} choices locked · Sequential priority order
                </p>
              </div>

              {choiceList.length > 0 && (
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Ready for wbjeeb.nic.in
                </span>
              )}
            </div>

            {choiceList.length === 0 ? (
              <div className="text-center py-10 px-4 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <ListOrdered className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800">Your choice list is empty</p>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Click &ldquo;+ Add to Choice List&rdquo; on the recommended programs, or click &ldquo;Auto-Generate&rdquo; above.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {choiceList.map((item, idx) => {
                  return (
                    <div
                      key={`${item.collegeSlug}-${item.branchSlug}-${idx}`}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-all flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="truncate">
                          <span className="font-bold text-slate-900 block truncate">
                            {item.collegeShortName}
                          </span>
                          <span className="text-[11px] text-slate-600 block truncate">
                            {item.branchName} · Code {item.wbjeebCode}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 no-print">
                        <button
                          type="button"
                          onClick={() => moveUp(idx)}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30"
                          title="Move priority up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveDown(idx)}
                          disabled={idx === choiceList.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30"
                          title="Move priority down"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeChoice(idx)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                          title="Remove from choices"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {choiceList.length > 0 && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Total: {choiceList.length} Option(s)</span>
                <span className="font-semibold text-emerald-800">
                  {choiceList.filter((c) => c.tier === 'SAFE').length} Safe · {choiceList.filter((c) => c.tier === 'TARGET').length} Target · {choiceList.filter((c) => c.tier === 'AMBITIOUS').length} Ambitious
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recommended Programs Grouped by Strategic Tier */}
        <div className="lg:col-span-7 space-y-6">
          {/* Ambitious / Upgrade Tier */}
          <div className="bg-white rounded-3xl border border-amber-200 p-5 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-amber-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                  Tier 1: Ambitious / Reach Preferences ({ambitiousOptions.length})
                </h3>
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Round 2 / Mop-up Target
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Historical closing ranks are higher than GMR {gmrRank.toLocaleString('en-IN')}. Prioritize these in your top 1–5 choices so that if vacancy seats open up during centralized upgradation, you automatically qualify.
            </p>

            <div className="space-y-2 pt-1">
              {ambitiousOptions.slice(0, 5).map((opt, i) => {
                const added = choiceList.some(
                  (c) => c.collegeSlug === opt.collegeSlug && c.branchSlug === opt.branchSlug
                );
                return (
                  <div
                    key={`amb-${i}`}
                    className="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs bg-slate-50/40 hover:bg-white transition-colors"
                  >
                    <div className="truncate">
                      <span className="font-bold text-slate-900 block truncate">
                        {opt.collegeShortName} · {opt.branchName}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        Code: {opt.wbjeebCode} · R1 Cutoff: GMR ~{opt.approxClosingRankRound1.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addChoice(opt)}
                      disabled={added}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                        added
                          ? 'bg-slate-100 text-slate-400 cursor-default'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                      }`}
                    >
                      {added ? 'Added' : '+ Add'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Target / Realistic Tier */}
          <div className="bg-white rounded-3xl border border-blue-200 p-5 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-blue-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                  Tier 2: Realistic Target Choices ({targetOptions.length})
                </h3>
              </div>
              <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                Prime Probability
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Your rank closely matches historical closing ranks. These programs represent high probability of allotment in Round 1 or Round 2.
            </p>

            <div className="space-y-2 pt-1">
              {targetOptions.slice(0, 6).map((opt, i) => {
                const added = choiceList.some(
                  (c) => c.collegeSlug === opt.collegeSlug && c.branchSlug === opt.branchSlug
                );
                return (
                  <div
                    key={`tgt-${i}`}
                    className="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs bg-slate-50/40 hover:bg-white transition-colors"
                  >
                    <div className="truncate">
                      <span className="font-bold text-slate-900 block truncate">
                        {opt.collegeShortName} · {opt.branchName}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        Code: {opt.wbjeebCode} · Final Cutoff: GMR ~{opt.approxClosingRankFinalRound.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addChoice(opt)}
                      disabled={added}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                        added
                          ? 'bg-slate-100 text-slate-400 cursor-default'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                      }`}
                    >
                      {added ? 'Added' : '+ Add'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Safe / Anchor Tier */}
          <div className="bg-white rounded-3xl border border-emerald-200 p-5 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                  Tier 3: Safe Anchor Choices ({safeOptions.length})
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                High Security Allotment
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Your rank is comfortably ahead of Round 1 closing ranks. Add at least 3–4 safe anchors near the bottom of your preference list to eliminate any chance of remaining unallotted.
            </p>

            <div className="space-y-2 pt-1">
              {safeOptions.slice(0, 6).map((opt, i) => {
                const added = choiceList.some(
                  (c) => c.collegeSlug === opt.collegeSlug && c.branchSlug === opt.branchSlug
                );
                return (
                  <div
                    key={`saf-${i}`}
                    className="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs bg-slate-50/40 hover:bg-white transition-colors"
                  >
                    <div className="truncate">
                      <span className="font-bold text-slate-900 block truncate">
                        {opt.collegeShortName} · {opt.branchName}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        Code: {opt.wbjeebCode} · R1 Cutoff: GMR ~{opt.approxClosingRankRound1.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addChoice(opt)}
                      disabled={added}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                        added
                          ? 'bg-slate-100 text-slate-400 cursor-default'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                      }`}
                    >
                      {added ? 'Added' : '+ Add'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
