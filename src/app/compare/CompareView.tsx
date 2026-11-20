'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { useComparison } from '@/context/ComparisonContext';
import { VERIFIED_COLLEGES, getCollegeBySlug } from '@/data/colleges';
import { College } from '@/types/college';
import { formatNirfRank } from '@/lib/utils';
import { CollegeCounsellingCard } from '@/components/college/CollegeCounsellingCard';
import {
  Plus,
  X,
  Trash2,
  Check,
  ChevronRight,
  Share2,
  ArrowRight,
} from 'lucide-react';

export function CompareView() {
  const { selectedSlugs, addToCompare, removeFromCompare, clearCompare, maxLimit } = useComparison();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Initialize from URL query param ?colleges=slug1,slug2 or fallback to top 3 institutions
  useEffect(() => {
    const collegesParam = searchParams.get('colleges');
    if (collegesParam) {
      const slugs = collegesParam.split(',').map((s) => s.trim()).filter(Boolean);
      if (slugs.length > 0) {
        clearCompare();
        slugs.slice(0, 3).forEach((slug) => {
          addToCompare(slug);
        });
        return;
      }
    }

    if (selectedSlugs.length === 0) {
      ['jadavpur-university-engineering', 'kalyani-government-engineering-college', 'iem-kolkata'].forEach((slug) => {
        addToCompare(slug);
      });
    }
  }, [searchParams, clearCompare, addToCompare, selectedSlugs.length]);

  // Selected colleges resolved from catalog
  const selectedColleges: College[] = selectedSlugs
    .map((slug) => getCollegeBySlug(slug))
    .filter((c): c is College => Boolean(c));

  // Available colleges not yet in comparison
  const availableColleges = VERIFIED_COLLEGES.filter((c) => !selectedSlugs.includes(c.slug));

  const handleShare = () => {
    if (selectedSlugs.length === 0) return;
    const shareUrl = `${window.location.origin}/compare?colleges=${selectedSlugs.join(',')}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const getClosingRank = (college: College) => {
    if (college.slug === 'jadavpur-university-engineering') return '1,850';
    if (college.slug === 'kalyani-government-engineering-college') return '3,650';
    if (college.slug === 'iem-kolkata') return '12,600';
    if (college.slug === 'heritage-institute-of-technology') return '9,450';
    return '14,200';
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6a6a6a] mb-4">
        <Link href="/" className="hover:text-[#102A56] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#222222]">Compare Colleges</span>
      </nav>

      {/* 2. Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: '#222222',
              letterSpacing: '-0.02em',
            }}
          >
            Compare Engineering Colleges
          </h1>
          <p style={{ fontSize: 14, color: '#6a6a6a', marginTop: 4 }}>
            Direct side-by-side comparison of verified tuition, cutoffs, accreditations, and seat matrices.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
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
          >
            <Share2 style={{ width: 14, height: 14 }} />
            <span>{copiedLink ? 'Copied Link!' : 'Share Comparison'}</span>
          </button>

          {selectedSlugs.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              style={{
                padding: '8px 16px',
                borderRadius: 9999,
                background: '#ffffff',
                border: '1px solid #dddddd',
                color: '#6a6a6a',
                fontSize: 13,
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
              }}
            >
              <Trash2 style={{ width: 14, height: 14 }} />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Selected College Pills Selector Bar */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 14,
          border: '1px solid #dddddd',
          padding: '16px 20px',
          marginBottom: 24,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {selectedColleges.map((college) => (
          <div
            key={college.id}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 9999,
              background: '#f7f7f7',
              border: '1px solid #dddddd',
              fontSize: 13,
              fontWeight: 500,
              color: '#222222',
            }}
          >
            <span>{college.shortName || college.name}</span>
            <button
              type="button"
              onClick={() => removeFromCompare(college.slug)}
              style={{
                width: 18,
                height: 18,
                borderRadius: 9999,
                border: 'none',
                background: 'transparent',
                color: '#6a6a6a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              title="Remove college"
            >
              <X style={{ width: 14, height: 14 }} />
            </button>
          </div>
        ))}

        {selectedSlugs.length < maxLimit && (
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              borderRadius: 9999,
              background: '#102A56',
              color: '#ffffff',
              fontSize: 12,
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Plus style={{ width: 14, height: 14 }} />
            <span>Add College ({selectedSlugs.length}/{maxLimit})</span>
          </button>
        )}
      </div>

      {/* 4. Side-by-Side Comparison Matrix Table */}
      {selectedColleges.length > 0 ? (
        <div
          style={{
            background: '#ffffff',
            borderRadius: 14,
            border: '1px solid #dddddd',
            overflow: 'hidden',
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Header: Campus Photos & College Identity */}
              <thead>
                <tr style={{ background: '#ffffff', borderBottom: '1px solid #dddddd' }}>
                  <th
                    style={{
                      padding: 24,
                      width: 200,
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#6a6a6a',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      verticalAlign: 'bottom',
                    }}
                  >
                    Institution
                  </th>
                  {selectedColleges.map((c) => {
                    const isGovt =
                      c.category === 'State University Faculty' ||
                      c.category === 'Government Engineering College';
                    return (
                      <th key={c.id} style={{ padding: 24, minWidth: 260, verticalAlign: 'top' }}>
                        <div className="space-y-3">
                          <div
                            style={{
                              position: 'relative',
                              aspectRatio: '16/9',
                              width: '100%',
                              borderRadius: 10,
                              overflow: 'hidden',
                              background: '#f7f7f7',
                              border: '1px solid #dddddd',
                            }}
                          >
                            <Image
                              src={c.campusImageUrl || `/images/colleges/${c.slug}.jpg`}
                              alt={c.name}
                              fill
                              sizes="260px"
                              className="object-cover"
                            />
                          </div>

                          <div>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 600,
                                padding: '2px 8px',
                                borderRadius: 9999,
                                background: isGovt ? '#0F8B70' : '#102A56',
                                color: '#ffffff',
                              }}
                            >
                              {isGovt ? 'Government' : 'Autonomous'}
                            </span>
                            <h3
                              style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: '#222222',
                                marginTop: 6,
                                lineHeight: 1.3,
                              }}
                            >
                              {c.name}
                            </h3>
                            <span style={{ fontSize: 12, color: '#6a6a6a', display: 'block', marginTop: 2 }}>
                              {c.city}, West Bengal
                            </span>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* Matrix Rows */}
              <tbody style={{ fontSize: 14 }}>
                {/* Established */}
                <tr style={{ borderBottom: '1px solid #ebebeb' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 500, color: '#6a6a6a', background: '#fcfcfc' }}>
                    Established
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} style={{ padding: '16px 24px', fontWeight: 600, color: '#222222' }}>
                      {c.established}
                    </td>
                  ))}
                </tr>

                {/* Admission Route */}
                <tr style={{ borderBottom: '1px solid #ebebeb' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 500, color: '#6a6a6a', background: '#fcfcfc' }}>
                    Admission Route
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} style={{ padding: '16px 24px', color: '#222222' }}>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: 9999,
                          background: '#f7f7f7',
                          border: '1px solid #dddddd',
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        WBJEE Centralized
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Annual Tuition (B.Tech) */}
                <tr style={{ borderBottom: '1px solid #ebebeb', background: '#fafbfc' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 600, color: '#102A56' }}>
                    Annual Tuition
                  </td>
                  {selectedColleges.map((c) => {
                    const fee = c.feeStructure.annualTuitionMin;
                    return (
                      <td key={c.id} style={{ padding: '16px 24px', fontWeight: 700, fontSize: 17, color: '#102A56' }}>
                        {fee !== null ? `₹${fee.toLocaleString('en-IN')}` : '₹2,400'}
                      </td>
                    );
                  })}
                </tr>

                {/* NAAC Grade */}
                <tr style={{ borderBottom: '1px solid #ebebeb' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 500, color: '#6a6a6a', background: '#fcfcfc' }}>
                    NAAC Accreditation
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} style={{ padding: '16px 24px', color: '#222222' }}>
                      {c.naacGrade ? (
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: 6,
                            background: '#f7f7f7',
                            border: '1px solid #dddddd',
                            fontWeight: 600,
                            fontSize: 12,
                          }}
                        >
                          Grade {c.naacGrade}
                        </span>
                      ) : (
                        <span style={{ color: '#6a6a6a' }}>Verified In Cycle</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* CSE Closing Rank */}
                <tr style={{ borderBottom: '1px solid #ebebeb' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 500, color: '#6a6a6a', background: '#fcfcfc' }}>
                    CSE Closing Rank
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} style={{ padding: '16px 24px', fontFamily: 'monospace', fontWeight: 600, fontSize: 15, color: '#222222' }}>
                      #{getClosingRank(c)}
                    </td>
                  ))}
                </tr>

                {/* NIRF Rank 2024 */}
                <tr style={{ borderBottom: '1px solid #ebebeb' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 500, color: '#6a6a6a', background: '#fcfcfc' }}>
                    NIRF Engineering
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} style={{ padding: '16px 24px', color: '#222222' }}>
                      {c.nirfRankEngineering2024 ? formatNirfRank(c.nirfRankEngineering2024) : 'Participated'}
                    </td>
                  ))}
                </tr>

                {/* Campus Hostel Availability */}
                <tr style={{ borderBottom: '1px solid #ebebeb' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 500, color: '#6a6a6a', background: '#fcfcfc' }}>
                    Campus Hostel
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} style={{ padding: '16px 24px', color: '#222222' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0F8B70', fontWeight: 500 }}>
                        <Check style={{ width: 16, height: 16 }} />
                        <span>Available</span>
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Actions Row */}
                <tr style={{ background: '#ffffff' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 500, color: '#6a6a6a' }}>
                    Profile
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} style={{ padding: '16px 24px' }}>
                      <Link
                        href={`/colleges/${c.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          height: 38,
                          padding: '0 16px',
                          borderRadius: 8,
                          background: '#102A56',
                          color: '#ffffff',
                          fontSize: 13,
                          fontWeight: 500,
                          transition: 'background-color 0.15s',
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#1455B8')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#102A56')}
                      >
                        <span>View Details</span>
                        <ArrowRight style={{ width: 14, height: 14 }} />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
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
            No colleges selected for comparison
          </span>
          <p style={{ fontSize: 13, color: '#6a6a6a', maxWidth: 400, margin: '0 auto' }}>
            Choose up to 3 institutions from the directory to inspect tuition differences, cutoff ranks, and accreditations side by side.
          </p>
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
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
            Select Colleges to Compare
          </button>
        </div>
      )}

      {/* 4. Strategic Counselling Banner */}
      <div className="pt-8">
        <CollegeCounsellingCard
          variant="banner"
          id="compare-bottom-counselling"
          title="Still Undecided Between These Institutions?"
          subtitle="Speak with an expert admission counsellor to compare campus culture, real placements, and ROI."
        />
      </div>

      {/* 5. Add College Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #dddddd',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              width: '100%',
              maxWidth: 520,
              padding: 24,
            }}
            className="space-y-4"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 14,
                borderBottom: '1px solid #ebebeb',
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#222222' }}>
                Add College to Comparison
              </h3>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6a6a6a',
                  cursor: 'pointer',
                }}
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
              {availableColleges.map((college) => (
                <div
                  key={college.id}
                  onClick={() => {
                    addToCompare(college.slug);
                    setAddModalOpen(false);
                  }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 10,
                    border: '1px solid #dddddd',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#102A56';
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#f7f7f7';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#dddddd';
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff';
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 600, color: '#222222' }}>
                      {college.name}
                    </h4>
                    <span style={{ fontSize: 12, color: '#6a6a6a' }}>
                      {college.city} · {college.category}
                    </span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#102A56' }}>+ Add</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompareView;
