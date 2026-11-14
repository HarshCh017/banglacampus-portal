'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { VERIFIED_CUTOFFS } from '@/data/cutoffs';

export function HeroInteractivePreview() {
  const [rank, setRank] = useState<number>(3800);

  // Derive top 3 matched colleges according to rank
  const matchedTiers = useMemo(() => {
    const generalCutoffs = VERIFIED_CUTOFFS.filter((c) => c.quota === 'General');
    const matches: {
      collegeName: string;
      slug: string;
      branch: string;
      closingRank: number;
      tier: 'Safe' | 'Realistic' | 'Ambitious';
      tierColor: string;
    }[] = [];

    generalCutoffs.forEach((cutoff) => {
      const closing = cutoff.approxClosingRankFinalRound;
      if (!closing) return;

      if (closing >= rank * 1.25) {
        matches.push({
          collegeName: cutoff.collegeShortName,
          slug: cutoff.collegeSlug,
          branch: cutoff.branchName.replace('Engineering', 'Engg.'),
          closingRank: closing,
          tier: 'Safe',
          tierColor: 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40',
        });
      } else if (closing >= rank * 0.9 && closing < rank * 1.25) {
        matches.push({
          collegeName: cutoff.collegeShortName,
          slug: cutoff.collegeSlug,
          branch: cutoff.branchName.replace('Engineering', 'Engg.'),
          closingRank: closing,
          tier: 'Realistic',
          tierColor: 'bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/40',
        });
      } else if (closing >= rank * 0.7 && closing < rank * 0.9) {
        matches.push({
          collegeName: cutoff.collegeShortName,
          slug: cutoff.collegeSlug,
          branch: cutoff.branchName.replace('Engineering', 'Engg.'),
          closingRank: closing,
          tier: 'Ambitious',
          tierColor: 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40',
        });
      }
    });

    const safeItem = matches.find((m) => m.tier === 'Safe');
    const realisticItem = matches.find((m) => m.tier === 'Realistic');
    const ambitiousItem = matches.find((m) => m.tier === 'Ambitious');

    return [
      ambitiousItem || {
        collegeName: 'Jadavpur Univ',
        slug: 'jadavpur-university-engineering',
        branch: 'Computer Science',
        closingRank: 240,
        tier: 'Ambitious' as const,
        tierColor: 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40',
      },
      realisticItem || {
        collegeName: 'KGEC Kalyani',
        slug: 'kalyani-government-engineering-college',
        branch: 'Information Tech',
        closingRank: 4200,
        tier: 'Realistic' as const,
        tierColor: 'bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/40',
      },
      safeItem || {
        collegeName: 'Heritage Inst',
        slug: 'heritage-institute-of-technology',
        branch: 'Electronics & Comm',
        closingRank: 9500,
        tier: 'Safe' as const,
        tierColor: 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40',
      },
    ];
  }, [rank]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Subtle Ambient Radial Glow Behind Card */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#10B981]/15 via-transparent to-[#3B82F6]/15 blur-2xl -z-10 pointer-events-none" />

      {/* Floating Glass Panel */}
      <div className="w-full rounded-2xl bg-[#18181B]/80 backdrop-blur-md border border-white/10 p-5 sm:p-6 shadow-xl shadow-black/50 transition-all duration-300">
        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#FAFAFA]">
                Live Choice Simulation Preview
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 px-2.5 py-0.5 rounded-md">
              WBJEE Audited Data
            </span>
          </div>

          {/* Rank Slider Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="hero-rank-slider" className="font-medium text-[#A1A1AA] flex items-center gap-1.5">
                <span>Test General Merit Rank (GMR):</span>
              </label>
              <span className="font-mono font-bold text-sm sm:text-base text-[#10B981] bg-[#09090B] px-2.5 py-1 rounded-lg border border-white/10 tabular-nums shadow-sm">
                #{rank.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              id="hero-rank-slider"
              type="range"
              min={500}
              max={35000}
              step={250}
              value={rank}
              onChange={(e) => setRank(Number(e.target.value))}
              className="w-full h-2 bg-[#27272A] rounded-lg appearance-none cursor-pointer accent-[#10B981] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              aria-label="Adjust General Merit Rank"
            />
            <div className="flex justify-between text-[10px] text-[#71717A] font-mono">
              <span>Rank #500</span>
              <span>Rank #15,000</span>
              <span>Rank #35,000</span>
            </div>
          </div>

          {/* Live Matched Tiers Display */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A] block">
              Instant Match Prediction:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {matchedTiers.map((match) => (
                <motion.div
                  key={`${match.tier}-${match.slug}`}
                  layout
                  initial={{ opacity: 0.8, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#09090B]/60 border border-white/8 hover:border-white/15 transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${match.tierColor}`}
                    >
                      {match.tier}
                    </span>
                    <div className="truncate text-left">
                      <span className="text-xs font-bold text-[#FAFAFA] block truncate">
                        {match.collegeName}
                      </span>
                      <span className="text-[11px] text-[#A1A1AA] block truncate">
                        {match.branch}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-2">
                    <span className="text-[10px] text-[#71717A] block">Closing Cutoff</span>
                    <span className="text-xs font-mono font-bold text-[#A1A1AA] tabular-nums">
                      #{match.closingRank.toLocaleString('en-IN')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
            <span className="text-[#71717A] text-[11px]">
              Statistical probability engine
            </span>
            <Link
              href={`/counselling-simulator?rank=${rank}`}
              className="inline-flex items-center gap-1.5 font-bold text-[#10B981] hover:text-[#059669] transition-colors"
            >
              <span>Run Full 3-Tier Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
