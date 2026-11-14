'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Compass, Sparkles } from 'lucide-react';
import { VERIFIED_CUTOFFS } from '@/data/cutoffs';
import { BorderBeam } from '@/components/ui/BorderBeam';
import { NumberTicker } from '@/components/ui/NumberTicker';

const DEMO_RANKS = [2800, 6400, 12500, 21000];

export function HeroChoiceCard() {
  const [rank, setRank] = useState<number>(3800);
  const [isInteracting, setIsInteracting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const demoIndexRef = useRef(0);

  // Auto-play demo simulation when user is not actively hovering or touching
  useEffect(() => {
    if (isInteracting) return;

    timerRef.current = setInterval(() => {
      demoIndexRef.current = (demoIndexRef.current + 1) % DEMO_RANKS.length;
      setRank(DEMO_RANKS[demoIndexRef.current]);
    }, 3600);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isInteracting]);

  // Compute matched tiers based on rank
  const matchedTiers = useMemo(() => {
    const generalCutoffs = VERIFIED_CUTOFFS.filter((c) => c.quota === 'General');
    const matches: {
      collegeName: string;
      slug: string;
      branch: string;
      closingRank: number;
      tier: 'Safe' | 'Realistic' | 'Ambitious';
      tierColor: string;
      tierBg: string;
      icon: typeof CheckCircle2;
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
          tierColor: 'text-[#10B981] border-[#10B981]/40',
          tierBg: 'bg-[rgba(16,185,129,0.14)]',
          icon: CheckCircle2,
        });
      } else if (closing >= rank * 0.9 && closing < rank * 1.25) {
        matches.push({
          collegeName: cutoff.collegeShortName,
          slug: cutoff.collegeSlug,
          branch: cutoff.branchName.replace('Engineering', 'Engg.'),
          closingRank: closing,
          tier: 'Realistic',
          tierColor: 'text-[#60A5FA] border-[#60A5FA]/40',
          tierBg: 'bg-[rgba(96,165,250,0.14)]',
          icon: Compass,
        });
      } else if (closing >= rank * 0.7 && closing < rank * 0.9) {
        matches.push({
          collegeName: cutoff.collegeShortName,
          slug: cutoff.collegeSlug,
          branch: cutoff.branchName.replace('Engineering', 'Engg.'),
          closingRank: closing,
          tier: 'Ambitious',
          tierColor: 'text-[#F5B942] border-[#F5B942]/40',
          tierBg: 'bg-[rgba(245,185,66,0.14)]',
          icon: AlertCircle,
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
        tierColor: 'text-[#F5B942] border-[#F5B942]/40',
        tierBg: 'bg-[rgba(245,185,66,0.14)]',
        icon: AlertCircle,
      },
      realisticItem || {
        collegeName: 'KGEC Kalyani',
        slug: 'kalyani-government-engineering-college',
        branch: 'Information Tech',
        closingRank: 4200,
        tier: 'Realistic' as const,
        tierColor: 'text-[#60A5FA] border-[#60A5FA]/40',
        tierBg: 'bg-[rgba(96,165,250,0.14)]',
        icon: Compass,
      },
      safeItem || {
        collegeName: 'Heritage Inst',
        slug: 'heritage-institute-of-technology',
        branch: 'Electronics & Comm',
        closingRank: 9500,
        tier: 'Safe' as const,
        tierColor: 'text-[#10B981] border-[#10B981]/40',
        tierBg: 'bg-[rgba(16,185,129,0.14)]',
        icon: CheckCircle2,
      },
    ];
  }, [rank]);

  return (
    <div
      className="relative w-full max-w-xl mx-auto"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
    >
      {/* Ambient Radial Lighting */}
      <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-[#10B981]/15 via-transparent to-[#F5B942]/15 blur-2xl -z-10 pointer-events-none" />

      {/* Floating Glass Container with BorderBeam */}
      <div className="relative w-full rounded-2xl bg-[#0B1210]/90 backdrop-blur-xl border border-[rgba(255,255,255,0.08)] p-5 sm:p-6 shadow-2xl shadow-black/80 transition-all duration-300 overflow-hidden">
        {/* Conic Border Beam running along edges */}
        <BorderBeam size={220} duration={8} borderWidth={1.5} colorFrom="#10B981" colorTo="#F5B942" />

        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-serif font-bold tracking-wider text-[#ECF4F0]">
                Live Choice Simulation
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#9DB0A8] hidden sm:inline">
                {isInteracting ? '● Interactive' : '◌ Auto Demo'}
              </span>
              <span className="text-[11px] font-mono text-[#F5B942] bg-[rgba(245,185,66,0.1)] border border-[rgba(245,185,66,0.3)] px-2.5 py-0.5 rounded-md">
                WBJEE Cutoffs
              </span>
            </div>
          </div>

          {/* Rank Slider Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="hero-rank-slider" className="font-medium text-[#9DB0A8]">
                General Merit Rank (GMR):
              </label>
              <span className="font-mono font-bold text-sm sm:text-base text-[#F5B942] bg-[#05080A] px-2.5 py-1 rounded-lg border border-[rgba(255,255,255,0.08)] shadow-sm">
                #{rank.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              id="hero-rank-slider"
              type="range"
              min={500}
              max={32000}
              step={250}
              value={rank}
              onChange={(e) => {
                setIsInteracting(true);
                setRank(Number(e.target.value));
              }}
              className="w-full h-2.5 bg-[#111C18] rounded-lg appearance-none cursor-pointer accent-[#F5B942] focus:outline-none focus:ring-2 focus:ring-[#F5B942]"
              aria-label="Adjust General Merit Rank"
            />
            <div className="flex justify-between text-[10px] text-[#60726A] font-mono">
              <span>Top Govt (#500)</span>
              <span>Autonomous (#14,000)</span>
              <span>Private (#32,000)</span>
            </div>
          </div>

          {/* Live Matched Tiers Display (Framer Motion Layout Reordering) */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#60726A] block">
              Probability Classification:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {matchedTiers.map((match) => {
                const Icon = match.icon;
                return (
                  <motion.div
                    key={`${match.tier}-${match.slug}`}
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#05080A]/70 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${match.tierBg} ${match.tierColor}`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{match.tier}</span>
                      </span>
                      <div className="truncate text-left">
                        <span className="text-xs font-serif font-bold text-[#ECF4F0] block truncate">
                          {match.collegeName}
                        </span>
                        <span className="text-[11px] text-[#9DB0A8] block truncate">
                          {match.branch}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 pl-2 font-mono">
                      <span className="text-[10px] text-[#60726A] block">Closing</span>
                      <span className="text-xs font-bold text-[#ECF4F0]">
                        #{match.closingRank.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="pt-2 flex items-center justify-between border-t border-[rgba(255,255,255,0.08)] text-xs">
            <span className="text-[#60726A] text-[11px]">
              Calculated against 3-year historical rounds
            </span>
            <Link
              href={`/counselling-simulator?rank=${rank}`}
              className="inline-flex items-center gap-1.5 font-bold text-[#F5B942] hover:text-[#E5A932] transition-colors"
            >
              <span>Full Choice Simulation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
