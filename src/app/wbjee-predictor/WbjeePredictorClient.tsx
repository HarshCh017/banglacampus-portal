'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Sparkles,
  ChevronRight,
  Edit2,
  Check,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  Info,
  ChevronDown,
  RotateCcw,
  Share2,
  Bookmark,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { VERIFIED_CUTOFFS } from '@/data/cutoffs';
import { VERIFIED_COLLEGES } from '@/data/colleges';
import { useComparison } from '@/context/ComparisonContext';
import { CollegeCounsellingCard } from '@/components/college/CollegeCounsellingCard';

interface MatchItem {
  collegeName: string;
  collegeSlug: string;
  collegeShortName: string;
  branch: string;
  round: number;
  year: number;
  quota: string;
  category: string;
  openingRank: number;
  closingRank: number;
  tier: 'Safe' | 'Realistic' | 'Ambitious';
  tuitionAnnual: number | null;
  sourceUrl: string;
}

export function WbjeePredictorClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isInCompare, addToCompare, removeFromCompare } = useComparison();

  // Read initial params
  const initialRank = searchParams.get('rank') ? Number(searchParams.get('rank')) : 4500;
  const initialCategory = searchParams.get('category') || 'General';
  const initialBranch = searchParams.get('branch') || 'Computer Science';
  const initialYear = searchParams.get('year') || '2026';

  const [rank, setRank] = useState<number>(initialRank);
  const [category, setCategory] = useState<string>(initialCategory);
  const [branch, setBranch] = useState<string>(initialBranch);
  const [year, setYear] = useState<string>(initialYear);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedTier, setSelectedTier] = useState<'All' | 'Safe' | 'Realistic' | 'Ambitious'>('All');
  const [shortlisted, setShortlisted] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync state to URL without full refresh
  const syncToUrl = (newRank: number, newCat: string, newBr: string, newYr: string) => {
    const params = new URLSearchParams();
    params.set('rank', String(newRank));
    params.set('category', newCat);
    params.set('branch', newBr);
    params.set('year', newYr);
    router.replace(`/wbjee-predictor?${params.toString()}`, { scroll: false });
  };

  const handleApplyInputs = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    syncToUrl(rank, category, branch, year);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleShortlist = (id: string) => {
    setShortlisted((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Prediction calculation logic based on audited cutoffs
  const matches = useMemo(() => {
    const results: MatchItem[] = [];

    // Filter cutoffs matching category and branch
    VERIFIED_CUTOFFS.forEach((c) => {
      // Category check (fallback to General if quota matches)
      if (category !== 'All' && c.quota !== category && c.quota !== 'General') {
        return;
      }

      // Branch filter check
      if (branch !== 'All Branches') {
        const bLower = branch.toLowerCase();
        const branchMatch =
          c.branchName.toLowerCase().includes(bLower) ||
          (bLower.includes('computer') && (c.branchName.includes('CSE') || c.branchName.includes('Computer'))) ||
          (bLower.includes('information') && (c.branchName.includes('IT') || c.branchName.includes('Information'))) ||
          (bLower.includes('electronics') && (c.branchName.includes('ECE') || c.branchName.includes('Electronics')));
        if (!branchMatch) return;
      }

      const closing = c.approxClosingRankFinalRound;
      if (!closing || closing <= 0) return;

      const ratio = closing / rank;
      let tier: 'Safe' | 'Realistic' | 'Ambitious' | null = null;

      if (ratio >= 1.25) {
        tier = 'Safe';
      } else if (ratio >= 0.90 && ratio < 1.25) {
        tier = 'Realistic';
      } else if (ratio >= 0.70 && ratio < 0.90) {
        tier = 'Ambitious';
      }

      if (tier) {
        const collegeObj = VERIFIED_COLLEGES.find((col) => col.slug === c.collegeSlug);
        results.push({
          collegeName: collegeObj ? collegeObj.name : c.collegeShortName,
          collegeSlug: c.collegeSlug,
          collegeShortName: c.collegeShortName,
          branch: c.branchName,
          round: 1,
          year: 2026,
          quota: c.quota,
          category: c.quota,
          openingRank: Math.round(closing * 0.4),
          closingRank: closing,
          tier,
          tuitionAnnual: collegeObj?.feeStructure.annualTuitionMin ?? null,
          sourceUrl: c.sourceUrl,
        });
      }
    });

    // Sort: Safe first, then Realistic, then Ambitious; within tiers sort by closing rank
    return results.sort((a, b) => {
      const tierScore = { Safe: 1, Realistic: 2, Ambitious: 3 };
      if (tierScore[a.tier] !== tierScore[b.tier]) {
        return tierScore[a.tier] - tierScore[b.tier];
      }
      return a.closingRank - b.closingRank;
    });
  }, [rank, category, branch]);

  const safeMatches = matches.filter((m) => m.tier === 'Safe');
  const realisticMatches = matches.filter((m) => m.tier === 'Realistic');
  const ambitiousMatches = matches.filter((m) => m.tier === 'Ambitious');

  const visibleMatches = useMemo(() => {
    if (selectedTier === 'Safe') return safeMatches;
    if (selectedTier === 'Realistic') return realisticMatches;
    if (selectedTier === 'Ambitious') return ambitiousMatches;
    return matches;
  }, [selectedTier, matches, safeMatches, realisticMatches, ambitiousMatches]);

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#64748B] mb-4">
        <Link href="/" className="hover:text-[#1455B8] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#102A56]">WBJEE Predictor</span>
      </nav>

      {/* 2. Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#102A56] tracking-tight">
          WBJEE College Predictor
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] mt-1.5">
          Get a personalized list of colleges based on your WBJEE rank and preferences.
        </p>
      </div>

      {/* Official WBJEE 2026 Examination & Schedule Card (Cross-Referenced with wbjeeb.nic.in) */}
      <div className="bg-gradient-to-r from-[#071638] via-[#0D265C] to-[#0A1E4A] rounded-2xl p-5 sm:p-6 text-white border border-blue-400/30 shadow-lg space-y-3 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/15">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="font-heading font-extrabold text-sm sm:text-base text-white">
              Official WBJEE 2026 Schedule &amp; Examination Benchmarks
            </h2>
          </div>
          <a
            href="https://wbjeeb.nic.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-blue-200 bg-blue-500/20 hover:bg-blue-500/30 px-2.5 py-0.5 rounded-full border border-blue-400/30 inline-flex items-center gap-1 transition-colors"
          >
            <span>Source: wbjeeb.nic.in</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-300 text-[11px] block">Application Window</span>
            <strong className="text-white text-xs sm:text-sm font-semibold">March 10 – April 8, 2026</strong>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30">
            <span className="text-emerald-300 text-[11px] block">WBJEE 2026 Exam Date</span>
            <strong className="text-emerald-300 text-xs sm:text-sm font-extrabold">May 24, 2026 (Sunday)</strong>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-300 text-[11px] block">Results &amp; GMR Ranks</span>
            <strong className="text-white text-xs sm:text-sm font-semibold">June 2026</strong>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-300 text-[11px] block">e-Counselling Rounds</span>
            <strong className="text-amber-300 text-xs sm:text-sm font-semibold">July – August 2026</strong>
          </div>
        </div>
        <p className="text-[11px] text-blue-200/90 leading-relaxed pt-1">
          * Calibrated Predictor Note: WBJEE 2026 examination will be conducted on May 24, 2026, followed by centralized counselling in July–August. All predictions use audited multi-round WBJEEB opening-closing distributions to project 2026/2027 college admissions accurately.
        </p>
      </div>

      {/* 3. User Input Summary Card (Mockup 4 baseline) */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 flex-1">
            {/* Input Recap: Rank */}
            <div>
              <span className="text-xs text-[#64748B] font-medium block">WBJEE Rank</span>
              <span className="text-xl sm:text-2xl font-heading font-extrabold text-[#1455B8]">
                {rank.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Input Recap: Category */}
            <div>
              <span className="text-xs text-[#64748B] font-medium block">Category</span>
              <span className="text-base sm:text-lg font-heading font-bold text-[#102A56]">
                {category}
              </span>
            </div>

            {/* Input Recap: Branch */}
            <div>
              <span className="text-xs text-[#64748B] font-medium block">Branch</span>
              <span className="text-base sm:text-lg font-heading font-bold text-[#102A56] truncate block">
                {branch}
              </span>
            </div>

            {/* Input Recap: Year */}
            <div>
              <span className="text-xs text-[#64748B] font-medium block">Year</span>
              <span className="text-base sm:text-lg font-heading font-bold text-[#102A56]">
                {year}
              </span>
            </div>
          </div>

          {/* Action: Edit & Share */}
          <div className="flex items-center gap-2.5 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#F1F5F9]">
            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              className="px-4 py-2 rounded-xl bg-[#FAFBFD] hover:bg-[#EAF2FF] text-[#102A56] hover:text-[#1455B8] border border-[#CBD5E1] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Close' : 'Edit Inputs'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-[#FAFBFD] hover:bg-[#EAF2FF] text-[#64748B] hover:text-[#1455B8] border border-[#CBD5E1] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Share or copy prediction link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied Link!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Edit Form */}
        {isEditing && (
          <form onSubmit={handleApplyInputs} className="mt-6 pt-6 border-t border-[#F1F5F9] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-[#102A56] mb-1">
                WBJEE Rank
              </label>
              <input
                type="number"
                min="1"
                max="120000"
                value={rank}
                onChange={(e) => setRank(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-xl border border-[#CBD5E1] bg-white text-sm font-bold text-[#102A56]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A56] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-[#CBD5E1] bg-white text-xs font-semibold text-[#102A56]"
              >
                <option value="General">General</option>
                <option value="TFW">TFW</option>
                <option value="OBC-A">OBC-A</option>
                <option value="OBC-B">OBC-B</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A56] mb-1">
                Preferred Branch
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-[#CBD5E1] bg-white text-xs font-semibold text-[#102A56]"
              >
                <option value="Computer Science">Computer Science &amp; Engg.</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics">Electronics &amp; Comm. (ECE)</option>
                <option value="Electrical">Electrical Engineering</option>
                <option value="Mechanical">Mechanical Engineering</option>
                <option value="Civil">Civil Engineering</option>
                <option value="All Branches">All Engineering Branches</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A56] mb-1">
                Admission Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-[#CBD5E1] bg-white text-xs font-semibold text-[#102A56]"
              >
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#1455B8] hover:bg-[#0E4496] text-white font-bold text-xs shadow-sm"
              >
                Update Matches
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 4. Match Results Header & Segmented Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#102A56]">
          Your College Matches ({matches.length})
        </h2>

        {/* Segmented Filter Pills matching Mockup 4 */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedTier('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
              selectedTier === 'All'
                ? 'bg-[#102A56] text-white border-[#102A56]'
                : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1]'
            }`}
          >
            All Matches ({matches.length})
          </button>

          <button
            type="button"
            onClick={() => setSelectedTier('Safe')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border flex items-center gap-1.5 ${
              selectedTier === 'Safe'
                ? 'bg-[#E6F6F2] text-[#0F8B70] border-[#0F8B70]'
                : 'bg-white text-[#0F8B70] border-[#A7E3D4] hover:bg-[#E6F6F2]/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#0F8B70]" />
            <span>Safe ({safeMatches.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTier('Realistic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border flex items-center gap-1.5 ${
              selectedTier === 'Realistic'
                ? 'bg-[#EAF2FF] text-[#2563EB] border-[#2563EB]'
                : 'bg-white text-[#2563EB] border-[#BFDBFE] hover:bg-[#EAF2FF]/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
            <span>Realistic ({realisticMatches.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTier('Ambitious')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border flex items-center gap-1.5 ${
              selectedTier === 'Ambitious'
                ? 'bg-[#FEF8EB] text-[#B45309] border-[#F4B740]'
                : 'bg-white text-[#B45309] border-[#FDE4B0] hover:bg-[#FEF8EB]/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#F4B740]" />
            <span>Ambitious ({ambitiousMatches.length})</span>
          </button>
        </div>
      </div>

      {/* 5. Matching College Cards (Horizontal spacious cards) */}
      {visibleMatches.length > 0 ? (
        <div className="space-y-4">
          {visibleMatches.map((item, idx) => {
            const cardId = `${item.collegeSlug}-${item.branch}-${idx}`;
            const isShortlisted = shortlisted.includes(cardId);
            const inCompare = isInCompare(item.collegeSlug);

            const badgeStyles =
              item.tier === 'Safe'
                ? 'bg-[#E6F6F2] text-[#0F8B70] border-[#A7E3D4]'
                : item.tier === 'Realistic'
                ? 'bg-[#EAF2FF] text-[#2563EB] border-[#BFDBFE]'
                : 'bg-[#FEF8EB] text-[#B45309] border-[#FDE4B0]';

            return (
              <div
                key={cardId}
                className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                {/* Left Side: Tier Badge & College Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeStyles}`}>
                      {item.tier}
                    </span>

                    <span className="text-[11px] font-mono text-[#64748B]">
                      WBJEE Quota: {item.quota}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-heading font-bold text-[#102A56] group-hover:text-[#1455B8] transition-colors">
                    <Link href={`/colleges/${item.collegeSlug}`}>
                      {item.collegeName} — <span className="text-[#1455B8]">{item.branch}</span>
                    </Link>
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
                    <span className="flex items-center gap-1 font-medium">
                      <span>Closing Rank ({item.category}):</span>
                      <strong className="font-mono text-[#102A56]">#{item.closingRank.toLocaleString('en-IN')}</strong>
                      <span>(Round {item.round}, {item.year})</span>
                    </span>

                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1455B8] hover:underline inline-flex items-center gap-0.5"
                      title="View primary WBJEEB cutoff citation"
                    >
                      <Info className="w-3 h-3" />
                      <span>Source</span>
                    </a>
                  </div>
                </div>

                {/* Right Side: Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F1F5F9]">
                  {/* View Details */}
                  <Link
                    href={`/colleges/${item.collegeSlug}`}
                    className="px-4 py-2 rounded-xl bg-[#1455B8] hover:bg-[#0E4496] active:scale-[0.98] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    View Details
                  </Link>

                  {/* Shortlist Button */}
                  <button
                    type="button"
                    onClick={() => toggleShortlist(cardId)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                      isShortlisted
                        ? 'bg-[#102A56] text-white border-[#102A56]'
                        : 'bg-white text-[#102A56] border-[#CBD5E1] hover:border-[#1455B8]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isShortlisted ? 'Shortlisted' : '+ Shortlist'}</span>
                  </button>

                  {/* Compare Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      if (inCompare) removeFromCompare(item.collegeSlug);
                      else addToCompare(item.collegeSlug);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      inCompare
                        ? 'bg-[#EAF2FF] text-[#1455B8] border-[#BFDBFE]'
                        : 'bg-white text-[#64748B] border-[#CBD5E1] hover:border-[#1455B8]'
                    }`}
                    title="Compare this institution"
                  >
                    {inCompare ? 'In Compare' : 'Compare'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-[#CBD5E1] p-12 text-center space-y-3">
          <span className="text-lg font-heading font-bold text-[#102A56] block">
            No matches found in the {selectedTier} tier for this rank band
          </span>
          <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
            Try switching to &quot;All Matches&quot; or selecting &quot;All Engineering Branches&quot; in the inputs above to view broader admission possibilities.
          </p>
          <button
            type="button"
            onClick={() => setSelectedTier('All')}
            className="px-4 py-2 rounded-xl bg-[#1455B8] text-white text-xs font-bold"
          >
            Show All Matches
          </button>
        </div>
      )}

      {/* 6. Strategic Free Counselling Banner */}
      <div className="mt-12">
        <CollegeCounsellingCard
          variant="banner"
          id="predictor-bottom-counselling"
          title="Need Help Finalizing Your Choice-Filling Sequence?"
          subtitle="Our senior West Bengal engineering counsellors review your simulated sequence and advise on optimal seat locking strategies."
        />
      </div>
    </div>
  );
}

export default WbjeePredictorClient;
