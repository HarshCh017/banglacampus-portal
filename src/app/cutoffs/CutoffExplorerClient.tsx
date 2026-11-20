'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { VERIFIED_CUTOFFS } from '@/data/cutoffs';
import { CollegeCounsellingCard } from '@/components/college/CollegeCounsellingCard';
import { useComparison } from '@/context/ComparisonContext';
import {
  Search,
  Scale,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export function CutoffExplorerClient() {
  const { isInCompare, addToCompare, removeFromCompare, selectedSlugs, maxLimit } = useComparison();

  const [inputRank, setInputRank] = useState<number>(3500);
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [collegeSearch, setCollegeSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'probable' | 'competitive_above'>('all');

  const matches = useMemo(() => {
    const searchLower = collegeSearch.trim().toLowerCase();
    return VERIFIED_CUTOFFS.filter((record) => {
      if (
        searchLower &&
        !record.collegeName.toLowerCase().includes(searchLower) &&
        !record.wbjeebCode.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
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
    }).filter((record) => {
      if (statusFilter === 'probable') return record.status === 'PROBABLE';
      if (statusFilter === 'competitive_above') {
        return record.status === 'PROBABLE' || record.status === 'COMPETITIVE';
      }
      return true;
    }).sort((a, b) => {
      const order = { PROBABLE: 1, COMPETITIVE: 2, ASPIRATIONAL: 3, OUT_OF_RANGE: 4 };
      if (order[a.status] !== order[b.status]) {
        return order[a.status] - order[b.status];
      }
      return a.approxClosingRankRound1 - b.approxClosingRankRound1;
    });
  }, [inputRank, selectedStream, selectedCategory, collegeSearch, statusFilter]);

  const targetCount = matches.filter((m) => m.status === 'PROBABLE').length;
  const competitiveCount = matches.filter((m) => m.status === 'COMPETITIVE').length;

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      {/* Header */}
      <div>
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6a6a6a] mb-4">
          <Link href="/" className="hover:text-[#102A56] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#222222]">Cutoff Explorer</span>
        </nav>

        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: '#222222',
            letterSpacing: '-0.02em',
          }}
        >
          WBJEE Rank &amp; Cutoff Explorer
        </h1>
        <p style={{ fontSize: 14, color: '#6a6a6a', marginTop: 4, maxWidth: 640 }}>
          Explore historical closing rank archives from official WBJEE centralized counselling rounds. Enter your General Merit Rank (GMR) to see which engineering programs historically aligned with your score.
        </p>
      </div>

      {/* Official WBJEE Schedule & Benchmarks Card */}
      <div
        style={{
          background: '#f7f7f7',
          borderRadius: 14,
          border: '1px solid #dddddd',
          padding: 24,
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
              Official WBJEE Schedule &amp; Examination Benchmarks
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
          The closing ranks below reflect official multi-round allotments audited from WBJEEB centralized counseling. Use these verified distributions as calibrated benchmarks.
        </p>
      </div>

      {/* Mandatory Regulatory Disclosure */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #dddddd',
          borderRadius: 14,
          padding: '16px 20px',
        }}
        className="space-y-1 text-xs"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#222222' }}>
          <AlertTriangle style={{ width: 14, height: 14, color: '#F4B740', flexShrink: 0 }} />
          <span>Historical Guidance Only · Not a Guarantee of Seat Allotment</span>
        </div>
        <p style={{ color: '#6a6a6a', lineHeight: 1.5 }}>
          Cutoffs shown on BengalCampus are referenced from official WBJEEB archived closing ranks. Seat matrices, reservation quotas, and candidate preferences fluctuate every year. This tool provides comparative context and does not guarantee admission.
        </p>
      </div>

      {/* Rank Input & Filter Controls Card */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 14,
          border: '1px solid #dddddd',
          padding: 24,
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* Rank Input */}
          <div className="space-y-2">
            <label htmlFor="gmrRank" style={{ fontSize: 12, fontWeight: 600, color: '#222222', display: 'block' }}>
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
                style={{
                  width: '100%',
                  height: 44,
                  padding: '0 40px 0 14px',
                  borderRadius: 8,
                  border: '1px solid #dddddd',
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#222222',
                  outline: 'none',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#929292',
                }}
              >
                GMR
              </span>
            </div>
            <span style={{ fontSize: 11, color: '#6a6a6a', display: 'block' }}>
              Quick presets:{' '}
              <button
                type="button"
                onClick={() => setInputRank(350)}
                style={{ color: '#102A56', fontWeight: 600, textDecoration: 'underline', marginRight: 6, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                350
              </button>
              <button
                type="button"
                onClick={() => setInputRank(2500)}
                style={{ color: '#102A56', fontWeight: 600, textDecoration: 'underline', marginRight: 6, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                2,500
              </button>
              <button
                type="button"
                onClick={() => setInputRank(6500)}
                style={{ color: '#102A56', fontWeight: 600, textDecoration: 'underline', marginRight: 6, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                6,500
              </button>
              <button
                type="button"
                onClick={() => setInputRank(12000)}
                style={{ color: '#102A56', fontWeight: 600, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                12,000
              </button>
            </span>
          </div>

          {/* Stream Selector */}
          <div className="space-y-2">
            <label htmlFor="streamSelect" style={{ fontSize: 12, fontWeight: 600, color: '#222222', display: 'block' }}>
              Engineering Stream
            </label>
            <select
              id="streamSelect"
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
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
              <option value="all">All Available Streams</option>
              <option value="cse">Computer Science & Engineering (CSE)</option>
              <option value="it">Information Technology (IT)</option>
              <option value="ece">Electronics & Communication (ECE)</option>
              <option value="me">Mechanical Engineering (ME)</option>
            </select>
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <label htmlFor="catSelect" style={{ fontSize: 12, fontWeight: 600, color: '#222222', display: 'block' }}>
              Institution Category
            </label>
            <select
              id="catSelect"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
              <option value="all">All Institution Types</option>
              <option value="State University Faculty">State University Faculty</option>
              <option value="Government Engineering College">Government Engineering College</option>
              <option value="Autonomous Private Institute">Autonomous Private Institute</option>
              <option value="Private Engineering College">Private Engineering College</option>
            </select>
          </div>
        </div>

        {/* Search & Status Filter Row */}
        <div className="pt-4 border-t border-[#ebebeb] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
                color: '#929292',
              }}
            />
            <input
              type="text"
              value={collegeSearch}
              onChange={(e) => setCollegeSearch(e.target.value)}
              placeholder="Filter by college name or code (e.g. Jadavpur, 104)..."
              style={{
                width: '100%',
                height: 40,
                paddingLeft: 38,
                paddingRight: 14,
                borderRadius: 9999,
                border: '1px solid #dddddd',
                background: '#ffffff',
                fontSize: 13,
                color: '#222222',
                outline: 'none',
              }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span style={{ color: '#6a6a6a', fontWeight: 500, marginRight: 4 }}>Filter:</span>
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              style={{
                padding: '6px 14px',
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                border: statusFilter === 'all' ? '1px solid #102A56' : '1px solid #dddddd',
                background: statusFilter === 'all' ? '#102A56' : '#ffffff',
                color: statusFilter === 'all' ? '#ffffff' : '#6a6a6a',
              }}
            >
              All Matches
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('probable')}
              style={{
                padding: '6px 14px',
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                border: statusFilter === 'probable' ? '1px solid #0F8B70' : '1px solid #dddddd',
                background: statusFilter === 'probable' ? '#E6F6F2' : '#ffffff',
                color: '#0F8B70',
              }}
            >
              Probable Only (Round 1)
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('competitive_above')}
              style={{
                padding: '6px 14px',
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                border: statusFilter === 'competitive_above' ? '1px solid #1455B8' : '1px solid #dddddd',
                background: statusFilter === 'competitive_above' ? '#EAF2FF' : '#ffffff',
                color: '#1455B8',
              }}
            >
              Probable &amp; Competitive
            </button>
          </div>
        </div>

        {/* Quick Summary Pill Row */}
        <div className="pt-4 border-t border-[#ebebeb] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span style={{ color: '#6a6a6a' }}>Analysis for GMR #{inputRank.toLocaleString('en-IN')}:</span>
            <span
              style={{
                padding: '3px 10px',
                borderRadius: 9999,
                background: '#E6F6F2',
                color: '#0F8B70',
                fontWeight: 600,
                border: '1px solid #A7E3D4',
              }}
            >
              {targetCount} Round-1 Matches
            </span>
            <span
              style={{
                padding: '3px 10px',
                borderRadius: 9999,
                background: '#EAF2FF',
                color: '#1455B8',
                fontWeight: 600,
                border: '1px solid #BFDBFE',
              }}
            >
              {competitiveCount} Later Round Possibilities
            </span>
          </div>

          <span style={{ color: '#929292' }}>Source: WBJEE Centralized Allotment Archives</span>
        </div>
      </div>

      {/* Results Matrix */}
      <div className="space-y-4">
        <h2 style={{ fontSize: 20, fontWeight: 600, color: '#222222' }}>
          Historical Closing Rank Comparisons ({matches.length} programs)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((record, idx) => {
            const inCompare = isInCompare(record.collegeSlug);
            const canAdd = selectedSlugs.length < maxLimit;

            return (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: 14,
                  border: '1px solid #dddddd',
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'box-shadow 0.2s',
                }}
                className="hover:shadow-airbnb"
              >
                <div className="space-y-3">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 9999,
                        background: '#f7f7f7',
                        color: '#6a6a6a',
                        border: '1px solid #dddddd',
                      }}
                    >
                      Code: {record.wbjeebCode}
                    </span>

                    {record.status === 'PROBABLE' && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 9999,
                          background: '#E6F6F2',
                          color: '#0F8B70',
                          border: '1px solid #A7E3D4',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <CheckCircle2 style={{ width: 12, height: 12 }} />
                        <span>Probable Match</span>
                      </span>
                    )}
                    {record.status === 'COMPETITIVE' && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 9999,
                          background: '#EAF2FF',
                          color: '#1455B8',
                          border: '1px solid #BFDBFE',
                        }}
                      >
                        Competitive Target
                      </span>
                    )}
                    {record.status === 'ASPIRATIONAL' && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 9999,
                          background: '#FEF8EB',
                          color: '#B45309',
                          border: '1px solid #FDE4B0',
                        }}
                      >
                        Aspirational
                      </span>
                    )}
                    {record.status === 'OUT_OF_RANGE' && (
                      <span
                        style={{
                          fontSize: 11,
                          padding: '2px 8px',
                          borderRadius: 9999,
                          background: '#f7f7f7',
                          color: '#929292',
                        }}
                      >
                        Higher Cutoff Band
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#222222', lineHeight: 1.3 }}>
                      <Link
                        href={`/colleges/${record.collegeSlug}`}
                        className="hover:text-[#102A56] transition-colors"
                      >
                        {record.collegeName}
                      </Link>
                    </h3>
                    <span style={{ fontSize: 12, color: '#6a6a6a', display: 'block', marginTop: 2 }}>
                      {record.category}
                    </span>
                  </div>

                  {/* Branch & Rank Thresholds */}
                  <div
                    style={{
                      background: '#f7f7f7',
                      borderRadius: 10,
                      padding: 12,
                      border: '1px solid #ebebeb',
                    }}
                    className="space-y-1 text-xs"
                  >
                    <span style={{ fontWeight: 600, color: '#102A56', display: 'block' }}>
                      {record.branchName}
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 4,
                        fontSize: 11,
                        color: '#6a6a6a',
                      }}
                    >
                      <span>Round 1: <strong>~#{record.approxClosingRankRound1.toLocaleString('en-IN')}</strong></span>
                      <span>Final Round: <strong>~#{record.approxClosingRankFinalRound.toLocaleString('en-IN')}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div
                  style={{
                    paddingTop: 12,
                    marginTop: 14,
                    borderTop: '1px solid #ebebeb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
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
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      padding: '4px 12px',
                      borderRadius: 9999,
                      border: inCompare ? '1px solid #102A56' : '1px solid #dddddd',
                      background: inCompare ? '#102A56' : '#ffffff',
                      color: inCompare ? '#ffffff' : '#222222',
                      cursor: !inCompare && !canAdd ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      transition: 'all 0.15s',
                    }}
                  >
                    <Scale style={{ width: 13, height: 13 }} />
                    <span>{inCompare ? 'Added' : 'Compare'}</span>
                  </button>

                  <Link
                    href={`/colleges/${record.collegeSlug}`}
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: '#102A56',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <span>Full Profile</span>
                    <ChevronRight style={{ width: 14, height: 14 }} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strategic Counselling Banner */}
        <div className="pt-8">
          <CollegeCounsellingCard
            variant="banner"
            id="cutoffs-bottom-counselling"
            title="Need 1-on-1 Guidance on Your WBJEE Rank & Choice Filling?"
            subtitle="Our senior West Bengal admission advisors evaluate your rank against Round 1, Round 2, and decentralized cutoffs."
          />
        </div>
      </div>
    </div>
  );
}

export default CutoffExplorerClient;
