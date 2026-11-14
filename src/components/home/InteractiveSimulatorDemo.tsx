'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Compass, AlertCircle, HelpCircle } from 'lucide-react';
import { VERIFIED_CUTOFFS } from '@/data/cutoffs';
import { VERIFIED_COLLEGES } from '@/data/colleges';
import { ShimmerButton } from '@/components/ui/ShimmerButton';
import { PerspectiveGrid } from '@/components/ui/vengeance-ui/PerspectiveGrid';

interface Recommendation {
  collegeName: string;
  collegeSlug: string;
  branch: string;
  closingRank: number;
  probPercent: number;
  tier: 'Safe' | 'Realistic' | 'Ambitious';
}

export function InteractiveSimulatorDemo() {
  const [userRank, setUserRank] = useState<number>(4500);

  // Compute live recommendations across cutoffs based on selected rank
  const recommendations = useMemo(() => {
    const list: Recommendation[] = [];
    const generalCutoffs = VERIFIED_CUTOFFS.filter((c) => c.quota === 'General');

    generalCutoffs.forEach((cutoff) => {
      const closing = cutoff.approxClosingRankFinalRound;
      if (!closing) return;

      const ratio = closing / userRank;
      let tier: 'Safe' | 'Realistic' | 'Ambitious' | null = null;
      let prob = 50;

      if (ratio >= 1.25) {
        tier = 'Safe';
        prob = Math.min(98, Math.round(75 + (ratio - 1.25) * 20));
      } else if (ratio >= 0.95 && ratio < 1.25) {
        tier = 'Realistic';
        prob = Math.round(50 + (ratio - 0.95) * 80);
      } else if (ratio >= 0.7 && ratio < 0.95) {
        tier = 'Ambitious';
        prob = Math.max(15, Math.round((ratio - 0.7) * 140));
      }

      if (tier) {
        list.push({
          collegeName: cutoff.collegeShortName,
          collegeSlug: cutoff.collegeSlug,
          branch: cutoff.branchName.replace('Engineering', 'Engg.').replace('Computer Science & Engg.', 'CSE'),
          closingRank: closing,
          probPercent: prob,
          tier,
        });
      }
    });

    const safe = list.filter((r) => r.tier === 'Safe').slice(0, 2);
    const realistic = list.filter((r) => r.tier === 'Realistic').slice(0, 2);
    const ambitious = list.filter((r) => r.tier === 'Ambitious').slice(0, 2);

    return { safe, realistic, ambitious };
  }, [userRank]);

  // Dot plot data for closing ranks across institutions (range: 0 to 35,000)
  const rankDots = useMemo(() => {
    const uniquePoints = new Map<string, number>();
    VERIFIED_CUTOFFS.forEach((c) => {
      if (c.approxClosingRankFinalRound && !uniquePoints.has(c.collegeShortName)) {
        uniquePoints.set(c.collegeShortName, c.approxClosingRankFinalRound);
      }
    });
    return Array.from(uniquePoints.entries()).map(([name, closing]) => ({
      name,
      closing,
      percent: Math.min(100, Math.max(0, (closing / 35000) * 100)),
    }));
  }, []);

  const userRankPercent = Math.min(100, Math.max(0, (userRank / 35000) * 100));

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="bg-[#0B1210] rounded-2xl border border-[rgba(255,255,255,0.08)] p-6 sm:p-10 lg:p-12 text-[#ECF4F0] shadow-2xl shadow-black/80 relative overflow-hidden">
        {/* Vengeance UI 3D Perspective Grid */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <PerspectiveGrid gridSize={24} fadeRadius={80} />
        </div>

        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3B82F6]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Interactive Counseling Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-[#ECF4F0]">
            Simulate Your WBJEE Choice List in Real Time
          </h2>
          <p className="text-xs sm:text-base text-[#9DB0A8] max-w-2xl mx-auto leading-relaxed">
            Drag the slider to test your General Merit Rank. See safe, realistic, and ambitious college options instantly calculated against audited closing rounds.
          </p>

          {/* Interactive Rank Slider */}
          <div className="pt-4 max-w-xl mx-auto space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-[#9DB0A8]">Adjust Your General Merit Rank:</span>
              <span className="font-mono font-bold text-lg sm:text-xl text-[#F5B942] bg-[#05080A] px-3.5 py-1 rounded-xl border border-[rgba(255,255,255,0.12)] shadow-sm tabular-nums">
                GMR #{userRank.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={800}
              max={30000}
              step={200}
              value={userRank}
              onChange={(e) => setUserRank(Number(e.target.value))}
              className="w-full h-3 bg-[#111C18] rounded-lg appearance-none cursor-pointer accent-[#10B981] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              aria-label="Adjust General Merit Rank for interactive simulation"
            />
            <div className="flex justify-between text-[11px] text-[#9DB0A8] font-mono">
              <span>Rank #800 (Top Govt)</span>
              <span>Rank #15,000 (Autonomous Core)</span>
              <span>Rank #30,000 (Private)</span>
            </div>
          </div>

          {/* Closing Rank Spectrum / Distribution Dot Plot */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-between text-[11px] text-[#9DB0A8] font-mono mb-1.5">
              <span>Closing Rank Distribution Spectrum (WBJEE 2026 Model)</span>
              <span className="text-[#F5B942] font-semibold">Your Rank Marker: #{userRank}</span>
            </div>
            <div className="relative h-6 bg-[#05080A] rounded-xl border border-[rgba(255,255,255,0.08)] px-2 flex items-center">
              {/* Institution dots */}
              {rankDots.map((dot) => (
                <div
                  key={dot.name}
                  style={{ left: `${dot.percent}%` }}
                  title={`${dot.name}: ~#${dot.closing.toLocaleString('en-IN')}`}
                  className="absolute w-2 h-2 rounded-full bg-[#10B981]/50 hover:bg-[#10B981] hover:scale-150 transition-all -translate-x-1/2 cursor-help"
                />
              ))}

              {/* User Rank Indicator Needle */}
              <motion.div
                animate={{ left: `${userRankPercent}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="absolute top-0 bottom-0 w-0.5 bg-[#F5B942] shadow-[0_0_8px_#F5B942] -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center justify-between"
              >
                <div className="w-2 h-2 rounded-full bg-[#F5B942] -translate-y-1 shadow-md" />
                <div className="w-2 h-2 rounded-full bg-[#F5B942] translate-y-1 shadow-md" />
              </motion.div>
            </div>
            <div className="flex justify-between text-[10px] text-[#9DB0A8]/60 font-mono mt-1">
              <span>#1 (Premier Faculties)</span>
              <span>#17,500</span>
              <span>#35,000+</span>
            </div>
          </div>
        </div>

        {/* 3 Tiers Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
          {/* SAFE TIER */}
          <div className="bg-[#111C18] hover:bg-[#162420] rounded-2xl border border-[#10B981]/30 p-5 flex flex-col justify-between shadow-xl shadow-black/50 hover:scale-[1.01] transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
                    Safe Options
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-md border border-[#10B981]/30 tabular-nums">
                  &gt;85% Chance
                </span>
              </div>
              <p className="text-[11px] text-[#9DB0A8] leading-relaxed">
                Institutions whose historical closing cutoffs are comfortably above your rank.
              </p>

              <div className="space-y-2.5">
                {recommendations.safe.length > 0 ? (
                  recommendations.safe.map((item, idx) => (
                    <motion.div
                      key={`${item.collegeSlug}-${item.branch}-${idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="p-3 rounded-xl bg-[#05080A] border border-[rgba(255,255,255,0.06)] hover:border-[#10B981]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#ECF4F0] truncate max-w-[170px]">
                          {item.collegeName}
                        </span>
                        <span className="text-[11px] font-mono text-[#10B981] font-bold tabular-nums">
                          #{item.closingRank.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#9DB0A8] block truncate mt-0.5">
                        {item.branch}
                      </span>
                      {/* Gradient Progress Bar */}
                      <div className="w-full bg-[#111C18] h-2 rounded-full mt-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#10B981] to-[#34D399] h-full rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: `${item.probPercent}%` }}
                        />
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-4 rounded-xl bg-[#05080A] border border-dashed border-[rgba(255,255,255,0.12)] text-center space-y-1">
                    <span className="text-xs text-[#9DB0A8] block">No colleges in safe band at this rank</span>
                    <span className="text-[10px] text-[#9DB0A8]/70 block">Adjust rank slider above to see safe choices</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[rgba(255,255,255,0.08)]">
              <span className="text-[10px] text-[#9DB0A8] block">Round 1-3 Assured Seat Cushion</span>
            </div>
          </div>

          {/* REALISTIC TIER */}
          <div className="bg-[#111C18] hover:bg-[#162420] rounded-2xl border border-[#3B82F6]/30 p-5 flex flex-col justify-between shadow-xl shadow-black/50 hover:scale-[1.01] transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3B82F6]">
                    Realistic Options
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#3B82F6] bg-[#3B82F6]/15 px-2 py-0.5 rounded-md border border-[#3B82F6]/30 tabular-nums">
                  50%–85% Chance
                </span>
              </div>
              <p className="text-[11px] text-[#9DB0A8] leading-relaxed">
                Highly probable targets matching your exact score tier in round 2 or 3.
              </p>

              <div className="space-y-2.5">
                {recommendations.realistic.length > 0 ? (
                  recommendations.realistic.map((item, idx) => (
                    <motion.div
                      key={`${item.collegeSlug}-${item.branch}-${idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="p-3 rounded-xl bg-[#05080A] border border-[rgba(255,255,255,0.06)] hover:border-[#3B82F6]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#ECF4F0] truncate max-w-[170px]">
                          {item.collegeName}
                        </span>
                        <span className="text-[11px] font-mono text-[#3B82F6] font-bold tabular-nums">
                          #{item.closingRank.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#9DB0A8] block truncate mt-0.5">
                        {item.branch}
                      </span>
                      {/* Gradient Progress Bar */}
                      <div className="w-full bg-[#111C18] h-2 rounded-full mt-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#3B82F6] to-cyan-400 h-full rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: `${item.probPercent}%` }}
                        />
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-4 rounded-xl bg-[#05080A] border border-dashed border-[rgba(255,255,255,0.12)] text-center space-y-1">
                    <span className="text-xs text-[#9DB0A8] block">No colleges in realistic band at this rank</span>
                    <span className="text-[10px] text-[#9DB0A8]/70 block">Widen your rank range to inspect options</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[rgba(255,255,255,0.08)]">
              <span className="text-[10px] text-[#9DB0A8] block">Primary Counseling Sweet Spot</span>
            </div>
          </div>

          {/* AMBITIOUS TIER */}
          <div className="bg-[#111C18] hover:bg-[#162420] rounded-2xl border border-[#F5B942]/30 p-5 flex flex-col justify-between shadow-xl shadow-black/50 hover:scale-[1.01] transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5B942]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F5B942]">
                    Ambitious Options
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#F5B942] bg-[rgba(245,185,66,0.14)] px-2 py-0.5 rounded-md border border-[#F5B942]/30 tabular-nums">
                  &lt;50% Reach
                </span>
              </div>
              <p className="text-[11px] text-[#9DB0A8] leading-relaxed">
                Aspirational branches with slight cutoff variations or mop-up possibilities.
              </p>

              <div className="space-y-2.5">
                {recommendations.ambitious.length > 0 ? (
                  recommendations.ambitious.map((item, idx) => (
                    <motion.div
                      key={`${item.collegeSlug}-${item.branch}-${idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="p-3 rounded-xl bg-[#05080A] border border-[rgba(255,255,255,0.06)] hover:border-[#F5B942]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#ECF4F0] truncate max-w-[170px]">
                          {item.collegeName}
                        </span>
                        <span className="text-[11px] font-mono text-[#F5B942] font-bold tabular-nums">
                          #{item.closingRank.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#9DB0A8] block truncate mt-0.5">
                        {item.branch}
                      </span>
                      {/* Gradient Progress Bar */}
                      <div className="w-full bg-[#111C18] h-2 rounded-full mt-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#F5B942] to-amber-300 h-full rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: `${item.probPercent}%` }}
                        />
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-4 rounded-xl bg-[#05080A] border border-dashed border-[rgba(255,255,255,0.12)] text-center space-y-1">
                    <span className="text-xs text-[#9DB0A8] block">No colleges in reach band at this rank</span>
                    <span className="text-[10px] text-[#9DB0A8]/70 block">Inspect top state universities for reach choices</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[rgba(255,255,255,0.08)]">
              <span className="text-[10px] text-[#9DB0A8] block">High-Value Upward Reach Options</span>
            </div>
          </div>
        </div>

        {/* Bottom Full Simulator Link with ShimmerButton */}
        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)] text-center relative z-10">
          <ShimmerButton
            variant="gold"
            href={`/counselling-simulator?rank=${userRank}`}
            className="px-6 py-3.5"
          >
            <span>Launch Complete 3-Tier WBJEE Preference Simulator</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
}
