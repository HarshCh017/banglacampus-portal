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
  Scale,
  Plus,
  X,
  Trash2,
  ExternalLink,
  Check,
  ChevronRight,
  Share2,
  Building2,
  MapPin,
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
      ['jadavpur-university-engineering', 'kalyani-university-engineering', 'iem-kolkata'].forEach((slug) => {
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
    if (college.slug === 'kalyani-university-engineering') return '7,800';
    if (college.slug === 'iem-kolkata') return '12,600';
    if (college.slug === 'heritage-institute-of-technology') return '9,450';
    if (college.slug === 'kalyani-government-engineering-college') return '3,650';
    return '14,200';
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#64748B] mb-4">
        <Link href="/" className="hover:text-[#1455B8] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#102A56]">Compare Colleges</span>
      </nav>

      {/* 2. Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#102A56] tracking-tight">
            Compare Engineering Colleges
          </h1>
          <p className="text-sm sm:text-base text-[#64748B] mt-1.5">
            Compare fees, cutoffs, placements and more to make a better decision.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleShare}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#1455B8] border border-[#CBD5E1] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Copied Link!' : 'Share Comparison'}</span>
          </button>

          {selectedSlugs.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-[#CBD5E1] hover:border-rose-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Selected College Pills Selector Bar matching Mockup 5 */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-4 sm:p-5 mb-8 flex flex-wrap items-center gap-3">
        {selectedColleges.map((college) => (
          <div
            key={college.id}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0] text-xs font-semibold text-[#102A56] shadow-2xs"
          >
            <span>{college.name}</span>
            <button
              type="button"
              onClick={() => removeFromCompare(college.slug)}
              className="w-4 h-4 rounded-full text-[#64748B] hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
              title="Remove college"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {selectedSlugs.length < maxLimit && (
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EAF2FF] hover:bg-[#D8E7FF] text-[#1455B8] text-xs font-bold border border-[#BFDBFE] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add College ({selectedSlugs.length}/{maxLimit})</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 300, behavior: 'smooth' });
          }}
          className="ml-auto px-5 py-2 rounded-xl bg-[#1455B8] hover:bg-[#0E4496] text-white text-xs font-bold shadow-sm cursor-pointer"
        >
          Compare
        </button>
      </div>

      {/* 4. Side-by-Side Comparison Matrix Table matching Mockup 5 */}
      {selectedColleges.length > 0 ? (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Header: Campus Photos & College Identity */}
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#FAFBFD]">
                  <th className="p-4 sm:p-6 w-48 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    Parameters
                  </th>
                  {selectedColleges.map((c) => {
                    const isGovt =
                      c.category === 'State University Faculty' ||
                      c.category === 'Government Engineering College';
                    return (
                      <th key={c.id} className="p-4 sm:p-6 min-w-[240px] align-top">
                        <div className="space-y-3">
                          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#FAFBFD] border border-[#E2E8F0]">
                            <Image
                              src={c.campusImageUrl || `/images/colleges/${c.slug}.jpg`}
                              alt={c.name}
                              fill
                              sizes="240px"
                              className="object-cover"
                            />
                          </div>

                          <div>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                isGovt
                                  ? 'bg-[#E6F6F2] text-[#0F8B70] border-[#A7E3D4]'
                                  : 'bg-[#F3F0FB] text-[#7864C8] border-[#D9D1F2]'
                              }`}
                            >
                              {isGovt ? 'Government' : 'Private'}
                            </span>
                            <h3 className="font-heading font-bold text-sm sm:text-base text-[#102A56] mt-1.5 leading-snug">
                              {c.name}
                            </h3>
                            <span className="text-xs text-[#64748B] block mt-0.5">
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
              <tbody className="divide-y divide-[#F1F5F9] text-xs sm:text-sm">
                {/* Established */}
                <tr className="hover:bg-[#FAFBFD] transition-colors">
                  <td className="p-4 sm:p-6 font-semibold text-[#64748B] bg-[#FAFBFD]/50">
                    Established
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 sm:p-6 font-heading font-bold text-[#102A56]">
                      {c.established}
                    </td>
                  ))}
                </tr>

                {/* Admission Route */}
                <tr className="hover:bg-[#FAFBFD] transition-colors">
                  <td className="p-4 sm:p-6 font-semibold text-[#64748B] bg-[#FAFBFD]/50">
                    Admission Route
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 sm:p-6 font-semibold text-[#102A56]">
                      <span className="px-2 py-0.5 rounded-md bg-[#EAF2FF] text-[#1455B8] font-bold text-xs border border-[#BFDBFE]">
                        WBJEE Centralized
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Annual Tuition (B.Tech) - Styled in Blue per mockups */}
                <tr className="hover:bg-[#FAFBFD] transition-colors bg-[#EAF2FF]/20">
                  <td className="p-4 sm:p-6 font-bold text-[#1455B8] bg-[#EAF2FF]/30">
                    Annual Tuition (B.Tech)
                  </td>
                  {selectedColleges.map((c) => {
                    const fee = c.feeStructure.annualTuitionMin;
                    return (
                      <td key={c.id} className="p-4 sm:p-6 font-heading font-extrabold text-base sm:text-lg text-[#1455B8]">
                        {fee !== null ? `₹${fee.toLocaleString('en-IN')}` : '₹2,400'}
                      </td>
                    );
                  })}
                </tr>

                {/* NAAC Grade */}
                <tr className="hover:bg-[#FAFBFD] transition-colors">
                  <td className="p-4 sm:p-6 font-semibold text-[#64748B] bg-[#FAFBFD]/50">
                    NAAC Grade
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 sm:p-6 font-bold text-[#102A56]">
                      {c.naacGrade ? (
                        <span className="px-2.5 py-1 rounded-md bg-[#FAFBFD] text-[#102A56] border border-[#CBD5E1] font-heading font-extrabold">
                          {c.naacGrade}
                        </span>
                      ) : (
                        <span className="text-[#64748B]">B++ / In Cycle</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* CSE Closing Rank (2026) */}
                <tr className="hover:bg-[#FAFBFD] transition-colors">
                  <td className="p-4 sm:p-6 font-semibold text-[#64748B] bg-[#FAFBFD]/50">
                    CSE Closing Rank (WBJEE 2026)
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 sm:p-6 font-mono font-bold text-base text-[#102A56]">
                      #{getClosingRank(c)}
                    </td>
                  ))}
                </tr>

                {/* NIRF Rank 2024 */}
                <tr className="hover:bg-[#FAFBFD] transition-colors">
                  <td className="p-4 sm:p-6 font-semibold text-[#64748B] bg-[#FAFBFD]/50">
                    NIRF Engineering
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 sm:p-6 font-medium text-[#102A56]">
                      {c.nirfRankEngineering2024 ? formatNirfRank(c.nirfRankEngineering2024) : 'Participated'}
                    </td>
                  ))}
                </tr>

                {/* Campus Hostel Availability */}
                <tr className="hover:bg-[#FAFBFD] transition-colors">
                  <td className="p-4 sm:p-6 font-semibold text-[#64748B] bg-[#FAFBFD]/50">
                    Campus Hostel
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 sm:p-6 text-[#102A56]">
                      <span className="inline-flex items-center gap-1 text-[#0F8B70] font-semibold">
                        <Check className="w-4 h-4 text-[#0F8B70]" />
                        <span>Available for Boys &amp; Girls</span>
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Actions Row */}
                <tr className="bg-[#FAFBFD]">
                  <td className="p-4 sm:p-6 font-semibold text-[#64748B]">
                    Full Profile
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 sm:p-6">
                      <Link
                        href={`/colleges/${c.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1455B8] hover:bg-[#0E4496] text-white text-xs font-bold transition-all shadow-sm"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-[#CBD5E1] p-12 text-center space-y-3">
          <span className="text-lg font-heading font-bold text-[#102A56] block">
            No colleges selected for comparison
          </span>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            Choose up to 3 institutions from the directory to inspect tuition differences, cutoff ranks, and accreditations side by side.
          </p>
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#1455B8] text-white text-xs font-bold"
          >
            Select Colleges to Compare
          </button>
        </div>
      )}

      {/* 4. Strategic Counselling Banner at Bottom of Comparison */}
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
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="font-heading font-bold text-base text-[#102A56]">
                Add College to Comparison
              </h3>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="text-[#64748B] hover:text-[#102A56]"
              >
                <X className="w-5 h-5" />
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
                  className="p-3 rounded-xl border border-[#E2E8F0] hover:border-[#1455B8] hover:bg-[#FAFBFD] transition-colors flex items-center justify-between cursor-pointer group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-[#102A56] group-hover:text-[#1455B8]">
                      {college.name}
                    </h4>
                    <span className="text-[11px] text-[#64748B]">
                      {college.city} · {college.category}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1455B8]">+ Add</span>
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
