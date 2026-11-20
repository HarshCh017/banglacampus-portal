'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { VERIFIED_CUTOFFS, CollegeCutoffRecord } from '@/data/cutoffs';
import { getCollegeBySlug } from '@/data/colleges';
import {
  Compass,
  Printer,
  Sparkles,
  AlertTriangle,
  ListOrdered,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronRight,
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
    ambitiousOptions.slice(0, 3).forEach((item) => list.push(item));
    targetOptions.slice(0, 5).forEach((item) => list.push(item));
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
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6a6a6a] mb-4">
        <Link href="/" className="hover:text-[#102A56] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#222222]">Counselling Simulator</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#dddddd]">
        <div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: '#222222',
              letterSpacing: '-0.02em',
            }}
          >
            Interactive Choice-Filling Simulator
          </h1>
          <p style={{ fontSize: 14, color: '#6a6a6a', marginTop: 4, maxWidth: 640 }}>
            Simulate your WBJEE e-counselling preference sequence using verified historical allotment archives. Order safe, target, and reach choices to minimize seat forfeiture risks.
          </p>
        </div>

        {choiceList.length > 0 && (
          <div className="flex items-center gap-2 shrink-0 no-print">
            <button
              type="button"
              onClick={() => window.print()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 9999,
                background: '#ffffff',
                border: '1px solid #dddddd',
                fontSize: 13,
                fontWeight: 500,
                color: '#222222',
                cursor: 'pointer',
              }}
            >
              <Printer style={{ width: 14, height: 14 }} />
              <span>Print Choice Sheet ({choiceList.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setChoiceList([])}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 9999,
                background: '#ffffff',
                border: '1px solid #dddddd',
                fontSize: 13,
                fontWeight: 500,
                color: '#E11D48',
                cursor: 'pointer',
              }}
            >
              <Trash2 style={{ width: 14, height: 14 }} />
              <span>Reset List</span>
            </button>
          </div>
        )}
      </div>

      {/* Mandatory Statutory Notice */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 14,
          border: '1px solid #dddddd',
          padding: '16px 20px',
        }}
        className="space-y-1 text-xs"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#222222' }}>
          <AlertTriangle style={{ width: 14, height: 14, color: '#F4B740', flexShrink: 0 }} />
          <span>Statutory Counselling Guidance Notice</span>
        </div>
        <p style={{ color: '#6a6a6a', lineHeight: 1.5 }}>
          This simulator is an educational planning aid based on official archived closing ranks from WBJEEB centralized counselling rounds. Actual seat allotments depend on annual candidate preferences, reservation rosters, and seat matrices on{' '}
          <a href="https://wbjeeb.nic.in" target="_blank" rel="noopener noreferrer" style={{ color: '#102A56', textDecoration: 'underline' }}>
            wbjeeb.nic.in
          </a>
          . No outcome is guaranteed.
        </p>
      </div>

      {/* Simulator Inputs Grid */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 14,
          border: '1px solid #dddddd',
          padding: 24,
        }}
        className="space-y-6 no-print"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {/* GMR Input */}
          <div className="space-y-2 md:col-span-1">
            <label htmlFor="simGmr" style={{ fontSize: 12, fontWeight: 600, color: '#222222', display: 'block' }}>
              Your WBJEE GMR Rank
            </label>
            <input
              id="simGmr"
              type="number"
              min={1}
              max={100000}
              value={gmrRank}
              onChange={(e) => setGmrRank(Math.max(1, Number(e.target.value) || 1))}
              style={{
                width: '100%',
                height: 44,
                padding: '0 12px',
                borderRadius: 8,
                border: '1px solid #dddddd',
                fontSize: 15,
                fontWeight: 600,
                color: '#222222',
                outline: 'none',
              }}
            />
            <div className="flex items-center gap-1.5 text-xs text-[#6a6a6a]">
              <span>Presets:</span>
              <button type="button" onClick={() => setGmrRank(1500)} style={{ color: '#102A56', fontWeight: 600, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>1.5k</button>
              <button type="button" onClick={() => setGmrRank(4500)} style={{ color: '#102A56', fontWeight: 600, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>4.5k</button>
              <button type="button" onClick={() => setGmrRank(8500)} style={{ color: '#102A56', fontWeight: 600, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>8.5k</button>
              <button type="button" onClick={() => setGmrRank(15000)} style={{ color: '#102A56', fontWeight: 600, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>15k</button>
            </div>
          </div>

          {/* Preferred Branches */}
          <div className="space-y-2 md:col-span-2">
            <span style={{ fontSize: 12, fontWeight: 600, color: '#222222', display: 'block' }}>
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
                    style={{
                      padding: '6px 14px',
                      borderRadius: 9999,
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: active ? '1px solid #102A56' : '1px solid #dddddd',
                      background: active ? '#102A56' : '#ffffff',
                      color: active ? '#ffffff' : '#6a6a6a',
                      transition: 'all 0.15s',
                    }}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Max Annual Fee Filter */}
          <div className="space-y-2 md:col-span-1">
            <label htmlFor="feeBudget" style={{ fontSize: 12, fontWeight: 600, color: '#222222', display: 'block' }}>
              Annual Fee Budget
            </label>
            <select
              id="feeBudget"
              value={maxAnnualFee ?? 'any'}
              onChange={(e) => setMaxAnnualFee(e.target.value === 'any' ? null : Number(e.target.value))}
              style={{
                width: '100%',
                height: 44,
                padding: '0 12px',
                borderRadius: 8,
                border: '1px solid #dddddd',
                fontSize: 13,
                fontWeight: 500,
                color: '#222222',
                outline: 'none',
                background: '#ffffff',
              }}
            >
              <option value="any">Any Fee Band</option>
              <option value="30000">Subsidized (&lt; ₹30,000/yr)</option>
              <option value="60000">Moderate (&lt; ₹60,000/yr)</option>
              <option value="130000">Private Standard (&lt; ₹1.3 Lakh/yr)</option>
            </select>
          </div>
        </div>

        {/* Categories Selector */}
        <div className="pt-4 border-t border-[#ebebeb] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span style={{ color: '#6a6a6a', fontWeight: 500 }}>Categories:</span>
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
                  style={{
                    padding: '4px 10px',
                    borderRadius: 9999,
                    fontSize: 11,
                    fontWeight: 500,
                    cursor: 'pointer',
                    border: active ? '1px solid #102A56' : '1px solid #dddddd',
                    background: active ? '#f7f7f7' : '#ffffff',
                    color: active ? '#102A56' : '#6a6a6a',
                    transition: 'all 0.15s',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={autoGenerateBalancedList}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 8,
              background: '#102A56',
              color: '#ffffff',
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Sparkles style={{ width: 14, height: 14 }} />
            <span>Auto-Generate 3-Tier Sequence</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Interface: Choice Basket & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Personalized Choice Order */}
        <div className="lg:col-span-5 space-y-4">
          <div
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #dddddd',
              padding: 20,
            }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#ebebeb] pb-3">
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: '#222222', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ListOrdered style={{ width: 18, height: 18, color: '#102A56' }} />
                  <span>My Preferred Choice List</span>
                </h2>
                <p style={{ fontSize: 12, color: '#6a6a6a' }}>
                  {choiceList.length} choices locked · Sequential priority order
                </p>
              </div>

              {choiceList.length > 0 && (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 9999,
                    background: '#E6F6F2',
                    color: '#0F8B70',
                    border: '1px solid #A7E3D4',
                  }}
                >
                  Ready
                </span>
              )}
            </div>

            {choiceList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '36px 16px' }} className="space-y-2">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 9999,
                    background: '#f7f7f7',
                    border: '1px solid #dddddd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    color: '#6a6a6a',
                  }}
                >
                  <ListOrdered style={{ width: 22, height: 22 }} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#222222' }}>Your choice list is empty</p>
                <p style={{ fontSize: 12, color: '#6a6a6a', maxWidth: 280, margin: '0 auto' }}>
                  Click &ldquo;+ Add&rdquo; on recommended programs, or click &ldquo;Auto-Generate&rdquo; above.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {choiceList.map((item, idx) => {
                  return (
                    <div
                      key={`${item.collegeSlug}-${item.branchSlug}-${idx}`}
                      style={{
                        padding: 12,
                        borderRadius: 10,
                        border: '1px solid #dddddd',
                        background: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        fontSize: 13,
                      }}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            background: '#f7f7f7',
                            border: '1px solid #dddddd',
                            fontFamily: 'monospace',
                            fontWeight: 600,
                            fontSize: 11,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#102A56',
                            flexShrink: 0,
                          }}
                        >
                          {idx + 1}
                        </span>
                        <div className="truncate">
                          <span style={{ fontWeight: 600, color: '#222222', display: 'block' }} className="truncate">
                            {item.collegeShortName}
                          </span>
                          <span style={{ fontSize: 11, color: '#6a6a6a', display: 'block' }} className="truncate">
                            {item.branchName} · Code {item.wbjeebCode}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 no-print">
                        <button
                          type="button"
                          onClick={() => moveUp(idx)}
                          disabled={idx === 0}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#6a6a6a',
                            cursor: idx === 0 ? 'not-allowed' : 'pointer',
                            opacity: idx === 0 ? 0.3 : 1,
                          }}
                          title="Move up"
                        >
                          <ChevronUp style={{ width: 16, height: 16 }} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveDown(idx)}
                          disabled={idx === choiceList.length - 1}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#6a6a6a',
                            cursor: idx === choiceList.length - 1 ? 'not-allowed' : 'pointer',
                            opacity: idx === choiceList.length - 1 ? 0.3 : 1,
                          }}
                          title="Move down"
                        >
                          <ChevronDown style={{ width: 16, height: 16 }} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeChoice(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#E11D48',
                            cursor: 'pointer',
                          }}
                          title="Remove"
                        >
                          <Trash2 style={{ width: 14, height: 14 }} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {choiceList.length > 0 && (
              <div className="pt-3 border-t border-[#ebebeb] flex items-center justify-between text-xs text-[#6a6a6a]">
                <span>Total: {choiceList.length} Option(s)</span>
                <span style={{ fontWeight: 600, color: '#102A56' }}>
                  {choiceList.filter((c) => c.tier === 'SAFE').length} Safe · {choiceList.filter((c) => c.tier === 'TARGET').length} Target · {choiceList.filter((c) => c.tier === 'AMBITIOUS').length} Ambitious
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recommendations Grouped by Tier */}
        <div className="lg:col-span-7 space-y-4">
          {/* Ambitious Tier */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #dddddd',
              padding: 20,
            }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#ebebeb] pb-2.5">
              <div className="flex items-center gap-2">
                <span style={{ width: 8, height: 8, borderRadius: 9999, background: '#F4B740', display: 'inline-block' }} />
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#222222' }}>
                  Ambitious Choices ({ambitiousOptions.length})
                </h3>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 9999, background: '#FEF8EB', color: '#B45309', border: '1px solid #FDE4B0' }}>
                Reach Target
              </span>
            </div>
            <p style={{ fontSize: 12, color: '#6a6a6a', lineHeight: 1.5 }}>
              Closing ranks are higher than GMR #{gmrRank.toLocaleString('en-IN')}. Prioritize in your top choices for potential seat vacancy upgradation.
            </p>

            <div className="space-y-2 pt-1">
              {ambitiousOptions.slice(0, 5).map((opt, i) => {
                const added = choiceList.some(
                  (c) => c.collegeSlug === opt.collegeSlug && c.branchSlug === opt.branchSlug
                );
                return (
                  <div
                    key={`amb-${i}`}
                    style={{
                      padding: 12,
                      borderRadius: 10,
                      border: '1px solid #dddddd',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                    }}
                  >
                    <div className="truncate">
                      <span style={{ fontWeight: 600, color: '#222222', fontSize: 13, display: 'block' }} className="truncate">
                        {opt.collegeShortName} · {opt.branchName}
                      </span>
                      <span style={{ fontSize: 11, color: '#6a6a6a', display: 'block' }}>
                        Code: {opt.wbjeebCode} · R1 Cutoff: ~#{opt.approxClosingRankRound1.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addChoice(opt)}
                      disabled={added}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 9999,
                        fontSize: 12,
                        fontWeight: 500,
                        border: added ? '1px solid #dddddd' : '1px solid #102A56',
                        background: added ? '#f7f7f7' : '#ffffff',
                        color: added ? '#929292' : '#102A56',
                        cursor: added ? 'default' : 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      {added ? 'Added' : '+ Add'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Realistic Target Tier */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #dddddd',
              padding: 20,
            }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#ebebeb] pb-2.5">
              <div className="flex items-center gap-2">
                <span style={{ width: 8, height: 8, borderRadius: 9999, background: '#1455B8', display: 'inline-block' }} />
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#222222' }}>
                  Realistic Target Choices ({targetOptions.length})
                </h3>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 9999, background: '#EAF2FF', color: '#1455B8', border: '1px solid #BFDBFE' }}>
                High Probability
              </span>
            </div>
            <p style={{ fontSize: 12, color: '#6a6a6a', lineHeight: 1.5 }}>
              Your rank closely matches historical closing ranks. These programs represent high probability of allotment.
            </p>

            <div className="space-y-2 pt-1">
              {targetOptions.slice(0, 6).map((opt, i) => {
                const added = choiceList.some(
                  (c) => c.collegeSlug === opt.collegeSlug && c.branchSlug === opt.branchSlug
                );
                return (
                  <div
                    key={`tgt-${i}`}
                    style={{
                      padding: 12,
                      borderRadius: 10,
                      border: '1px solid #dddddd',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                    }}
                  >
                    <div className="truncate">
                      <span style={{ fontWeight: 600, color: '#222222', fontSize: 13, display: 'block' }} className="truncate">
                        {opt.collegeShortName} · {opt.branchName}
                      </span>
                      <span style={{ fontSize: 11, color: '#6a6a6a', display: 'block' }}>
                        Code: {opt.wbjeebCode} · Final Cutoff: ~#{opt.approxClosingRankFinalRound.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addChoice(opt)}
                      disabled={added}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 9999,
                        fontSize: 12,
                        fontWeight: 500,
                        border: added ? '1px solid #dddddd' : '1px solid #102A56',
                        background: added ? '#f7f7f7' : '#ffffff',
                        color: added ? '#929292' : '#102A56',
                        cursor: added ? 'default' : 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      {added ? 'Added' : '+ Add'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Safe Tier */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #dddddd',
              padding: 20,
            }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#ebebeb] pb-2.5">
              <div className="flex items-center gap-2">
                <span style={{ width: 8, height: 8, borderRadius: 9999, background: '#0F8B70', display: 'inline-block' }} />
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#222222' }}>
                  Safe Anchor Choices ({safeOptions.length})
                </h3>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 9999, background: '#E6F6F2', color: '#0F8B70', border: '1px solid #A7E3D4' }}>
                Safe Anchor
              </span>
            </div>
            <p style={{ fontSize: 12, color: '#6a6a6a', lineHeight: 1.5 }}>
              Your rank is comfortably ahead of closing ranks. Add 3–4 safe anchors to eliminate risk of remaining unallotted.
            </p>

            <div className="space-y-2 pt-1">
              {safeOptions.slice(0, 6).map((opt, i) => {
                const added = choiceList.some(
                  (c) => c.collegeSlug === opt.collegeSlug && c.branchSlug === opt.branchSlug
                );
                return (
                  <div
                    key={`saf-${i}`}
                    style={{
                      padding: 12,
                      borderRadius: 10,
                      border: '1px solid #dddddd',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                    }}
                  >
                    <div className="truncate">
                      <span style={{ fontWeight: 600, color: '#222222', fontSize: 13, display: 'block' }} className="truncate">
                        {opt.collegeShortName} · {opt.branchName}
                      </span>
                      <span style={{ fontSize: 11, color: '#6a6a6a', display: 'block' }}>
                        Code: {opt.wbjeebCode} · R1 Cutoff: ~#{opt.approxClosingRankRound1.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addChoice(opt)}
                      disabled={added}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 9999,
                        fontSize: 12,
                        fontWeight: 500,
                        border: added ? '1px solid #dddddd' : '1px solid #102A56',
                        background: added ? '#f7f7f7' : '#ffffff',
                        color: added ? '#929292' : '#102A56',
                        cursor: added ? 'default' : 'pointer',
                        flexShrink: 0,
                      }}
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

export default CounsellingSimulatorClient;
