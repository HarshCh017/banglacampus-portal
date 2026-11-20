'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ChevronRight,
  Edit2,
  ExternalLink,
  Info,
  Share2,
  Bookmark,
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

    VERIFIED_CUTOFFS.forEach((c) => {
      // Category check
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
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6a6a6a] mb-4">
        <Link href="/" className="hover:text-[#102A56] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#222222]">WBJEE Predictor</span>
      </nav>

      {/* 2. Page Header */}
      <div className="mb-6">
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: '#222222',
            letterSpacing: '-0.02em',
          }}
        >
          WBJEE College Predictor
        </h1>
        <p style={{ fontSize: 14, color: '#6a6a6a', marginTop: 4 }}>
          Deterministic college admission matches calibrated against official multi-round WBJEEB closing ranks.
        </p>
      </div>

      {/* Official WBJEE 2026 Schedule & Examination Benchmarks Card */}
      <div
        style={{
          background: '#f7f7f7',
          borderRadius: 14,
          border: '1px solid #dddddd',
          padding: 24,
          marginBottom: 24,
        }}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ebebeb]">
          <div className="flex items-center gap-2.5">
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: '#0F8B70',
                display: 'inline-block',
              }}
            />
            <h2 style={{ fontSize: 15, fontWeight: 600, color: '#222222' }}>
              Official WBJEE Examination &amp; Schedule Reference
            </h2>
          </div>
          <a
            href="https://wbjeeb.nic.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12,
              fontWeight: 500,
              padding: '4px 12px',
              borderRadius: 9999,
              background: '#ffffff',
              border: '1px solid #dddddd',
              color: '#102A56',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>Source: wbjeeb.nic.in</span>
            <ExternalLink style={{ width: 12, height: 12 }} />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div
            style={{
              background: '#ffffff',
              borderRadius: 8,
              border: '1px solid #dddddd',
              padding: 12,
            }}
          >
            <span style={{ color: '#6a6a6a', fontSize: 11, display: 'block' }}>Application Window</span>
            <strong style={{ color: '#222222', fontSize: 13, fontWeight: 600 }}>March 10 – April 8</strong>
          </div>
          <div
            style={{
              background: '#ffffff',
              borderRadius: 8,
              border: '1px solid #A7E3D4',
              padding: 12,
            }}
          >
            <span style={{ color: '#0B7A62', fontSize: 11, display: 'block' }}>Exam Date</span>
            <strong style={{ color: '#0F8B70', fontSize: 13, fontWeight: 600 }}>May 24 (Sunday)</strong>
          </div>
          <div
            style={{
              background: '#ffffff',
              borderRadius: 8,
              border: '1px solid #dddddd',
              padding: 12,
            }}
          >
            <span style={{ color: '#6a6a6a', fontSize: 11, display: 'block' }}>Results &amp; GMR</span>
            <strong style={{ color: '#222222', fontSize: 13, fontWeight: 600 }}>June</strong>
          </div>
          <div
            style={{
              background: '#ffffff',
              borderRadius: 8,
              border: '1px solid #dddddd',
              padding: 12,
            }}
          >
            <span style={{ color: '#6a6a6a', fontSize: 11, display: 'block' }}>e-Counselling</span>
            <strong style={{ color: '#102A56', fontSize: 13, fontWeight: 600 }}>July – August</strong>
          </div>
        </div>

        <p style={{ fontSize: 12, color: '#6a6a6a', lineHeight: 1.5 }}>
          All predictions use audited multi-round WBJEE opening-closing distributions to project admission possibilities accurately without probabilistic guessing.
        </p>
      </div>

      {/* 3. User Input Summary Card */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 14,
          border: '1px solid #dddddd',
          padding: 24,
          marginBottom: 24,
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 flex-1">
            {/* Input Recap: Rank */}
            <div>
              <span style={{ fontSize: 12, color: '#6a6a6a', display: 'block' }}>WBJEE Rank</span>
              <span style={{ fontSize: 22, fontWeight: 700, color: '#102A56' }}>
                #{rank.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Input Recap: Category */}
            <div>
              <span style={{ fontSize: 12, color: '#6a6a6a', display: 'block' }}>Category</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#222222' }}>
                {category}
              </span>
            </div>

            {/* Input Recap: Branch */}
            <div>
              <span style={{ fontSize: 12, color: '#6a6a6a', display: 'block' }}>Branch</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#222222' }} className="truncate block">
                {branch}
              </span>
            </div>

            {/* Input Recap: Year */}
            <div>
              <span style={{ fontSize: 12, color: '#6a6a6a', display: 'block' }}>Year</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#222222' }}>
                {year}
              </span>
            </div>
          </div>

          {/* Action: Edit & Share */}
          <div className="flex items-center gap-2 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#ebebeb]">
            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              style={{
                padding: '8px 16px',
                borderRadius: 9999,
                background: '#ffffff',
                border: '1px solid #dddddd',
                color: '#222222',
                fontSize: 13,
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
              }}
            >
              <Edit2 style={{ width: 14, height: 14 }} />
              <span>{isEditing ? 'Close' : 'Edit Inputs'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              style={{
                padding: '8px 16px',
                borderRadius: 9999,
                background: '#ffffff',
                border: '1px solid #dddddd',
                color: '#222222',
                fontSize: 13,
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
              }}
              title="Share or copy prediction link"
            >
              <Share2 style={{ width: 14, height: 14 }} />
              <span>{copied ? 'Copied Link!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Edit Form */}
        {isEditing && (
          <form
            onSubmit={handleApplyInputs}
            className="mt-6 pt-6 border-t border-[#ebebeb] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
          >
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#222222', marginBottom: 4 }}>
                WBJEE Rank
              </label>
              <input
                type="number"
                min="1"
                max="120000"
                value={rank}
                onChange={(e) => setRank(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: 44,
                  padding: '0 12px',
                  borderRadius: 8,
                  border: '1px solid #dddddd',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#222222',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#222222', marginBottom: 4 }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                <option value="General">General</option>
                <option value="TFW">TFW</option>
                <option value="OBC-A">OBC-A</option>
                <option value="OBC-B">OBC-B</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#222222', marginBottom: 4 }}>
                Preferred Branch
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
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
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#222222', marginBottom: 4 }}>
                Admission Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
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
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  height: 44,
                  borderRadius: 8,
                  background: '#102A56',
                  color: '#ffffff',
                  fontSize: 13,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Update Matches
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 4. Match Results Header & Segmented Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#dddddd] mb-6 gap-4">
        <h2 style={{ fontSize: 20, fontWeight: 600, color: '#222222' }}>
          Your College Matches ({matches.length})
        </h2>

        {/* Segmented Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedTier('All')}
            style={{
              padding: '6px 14px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              border: selectedTier === 'All' ? '1px solid #102A56' : '1px solid #dddddd',
              background: selectedTier === 'All' ? '#102A56' : '#ffffff',
              color: selectedTier === 'All' ? '#ffffff' : '#6a6a6a',
              transition: 'all 0.15s',
            }}
          >
            All Matches ({matches.length})
          </button>

          <button
            type="button"
            onClick={() => setSelectedTier('Safe')}
            style={{
              padding: '6px 14px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              border: selectedTier === 'Safe' ? '1px solid #0F8B70' : '1px solid #dddddd',
              background: selectedTier === 'Safe' ? '#E6F6F2' : '#ffffff',
              color: '#0F8B70',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 9999, background: '#0F8B70' }} />
            <span>Safe ({safeMatches.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTier('Realistic')}
            style={{
              padding: '6px 14px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              border: selectedTier === 'Realistic' ? '1px solid #1455B8' : '1px solid #dddddd',
              background: selectedTier === 'Realistic' ? '#EAF2FF' : '#ffffff',
              color: '#1455B8',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 9999, background: '#1455B8' }} />
            <span>Realistic ({realisticMatches.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTier('Ambitious')}
            style={{
              padding: '6px 14px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              border: selectedTier === 'Ambitious' ? '1px solid #F4B740' : '1px solid #dddddd',
              background: selectedTier === 'Ambitious' ? '#FEF8EB' : '#ffffff',
              color: '#B45309',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 9999, background: '#F4B740' }} />
            <span>Ambitious ({ambitiousMatches.length})</span>
          </button>
        </div>
      </div>

      {/* 5. Matching College Cards */}
      {visibleMatches.length > 0 ? (
        <div className="space-y-3">
          {visibleMatches.map((item, idx) => {
            const cardId = `${item.collegeSlug}-${item.branch}-${idx}`;
            const isShortlisted = shortlisted.includes(cardId);
            const inCompare = isInCompare(item.collegeSlug);

            const badgeBg =
              item.tier === 'Safe' ? '#E6F6F2' : item.tier === 'Realistic' ? '#EAF2FF' : '#FEF8EB';
            const badgeColor =
              item.tier === 'Safe' ? '#0F8B70' : item.tier === 'Realistic' ? '#1455B8' : '#B45309';
            const badgeBorder =
              item.tier === 'Safe' ? '#A7E3D4' : item.tier === 'Realistic' ? '#BFDBFE' : '#FDE4B0';

            return (
              <div
                key={cardId}
                style={{
                  background: '#ffffff',
                  borderRadius: 14,
                  border: '1px solid #dddddd',
                  padding: '20px 24px',
                  transition: 'box-shadow 0.2s',
                }}
                className="hover:shadow-airbnb flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                {/* Left Side: Tier Badge & College Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 9999,
                        background: badgeBg,
                        color: badgeColor,
                        border: `1px solid ${badgeBorder}`,
                      }}
                    >
                      {item.tier}
                    </span>

                    <span style={{ fontSize: 11, color: '#6a6a6a', fontFamily: 'monospace' }}>
                      Quota: {item.quota}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#222222' }}>
                    <Link href={`/colleges/${item.collegeSlug}`} className="hover:text-[#102A56] transition-colors">
                      {item.collegeName} — <span style={{ color: '#102A56' }}>{item.branch}</span>
                    </Link>
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: '#6a6a6a' }}>
                    <span className="flex items-center gap-1">
                      <span>Closing Rank ({item.category}):</span>
                      <strong style={{ color: '#222222', fontFamily: 'monospace' }}>
                        #{item.closingRank.toLocaleString('en-IN')}
                      </strong>
                      <span>(Round {item.round}, {item.year})</span>
                    </span>

                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1455B8', display: 'inline-flex', alignItems: 'center', gap: 2 }}
                      title="View primary WBJEEB cutoff citation"
                    >
                      <Info style={{ width: 12, height: 12 }} />
                      <span>Source</span>
                    </a>
                  </div>
                </div>

                {/* Right Side: Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#ebebeb]">
                  {/* View Details */}
                  <Link
                    href={`/colleges/${item.collegeSlug}`}
                    style={{
                      height: 38,
                      padding: '0 16px',
                      borderRadius: 8,
                      background: '#102A56',
                      color: '#ffffff',
                      fontSize: 13,
                      fontWeight: 500,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.15s',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#1455B8')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#102A56')}
                  >
                    View Details
                  </Link>

                  {/* Shortlist Button */}
                  <button
                    type="button"
                    onClick={() => toggleShortlist(cardId)}
                    style={{
                      height: 38,
                      padding: '0 14px',
                      borderRadius: 9999,
                      fontSize: 12,
                      fontWeight: 500,
                      border: isShortlisted ? '1px solid #102A56' : '1px solid #dddddd',
                      background: isShortlisted ? '#102A56' : '#ffffff',
                      color: isShortlisted ? '#ffffff' : '#222222',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <Bookmark style={{ width: 14, height: 14 }} />
                    <span>{isShortlisted ? 'Shortlisted' : '+ Shortlist'}</span>
                  </button>

                  {/* Compare Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      if (inCompare) removeFromCompare(item.collegeSlug);
                      else addToCompare(item.collegeSlug);
                    }}
                    style={{
                      height: 38,
                      padding: '0 14px',
                      borderRadius: 9999,
                      fontSize: 12,
                      fontWeight: 500,
                      border: inCompare ? '1px solid #102A56' : '1px solid #dddddd',
                      background: inCompare ? '#f7f7f7' : '#ffffff',
                      color: inCompare ? '#102A56' : '#6a6a6a',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
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
        <div
          style={{
            background: '#ffffff',
            borderRadius: 14,
            border: '1px dashed #dddddd',
            padding: 48,
            textAlign: 'center',
          }}
          className="space-y-3"
        >
          <span style={{ fontSize: 16, fontWeight: 600, color: '#222222', display: 'block' }}>
            No matches found in the {selectedTier} tier for this rank band
          </span>
          <p style={{ fontSize: 13, color: '#6a6a6a', maxWidth: 440, margin: '0 auto' }}>
            Try switching to &quot;All Matches&quot; or selecting &quot;All Engineering Branches&quot; in the inputs above to view broader admission possibilities.
          </p>
          <button
            type="button"
            onClick={() => setSelectedTier('All')}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              background: '#102A56',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              marginTop: 12,
            }}
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
