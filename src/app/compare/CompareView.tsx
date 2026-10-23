'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useComparison } from '@/context/ComparisonContext';
import { VERIFIED_COLLEGES, getCollegeBySlug } from '@/data/colleges';
import { College } from '@/types/college';
import {
  Scale,
  Plus,
  X,
  Trash2,
  ExternalLink,
  Check,
  AlertCircle,
  Building2,
  Award,
  MapPin,
  ChevronRight,
  Share2,
  Printer,
  Sliders,
} from 'lucide-react';

export function CompareView() {
  const { selectedSlugs, addToCompare, removeFromCompare, clearCompare, maxLimit } = useComparison();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Read URL query parameter for shared links: ?colleges=slug1,slug2,slug3
  useEffect(() => {
    const param = searchParams.get('colleges');
    if (param) {
      const slugsFromUrl = param.split(',').filter(Boolean);
      slugsFromUrl.slice(0, maxLimit).forEach((slug) => {
        if (!selectedSlugs.includes(slug)) {
          addToCompare(slug);
        }
      });
    }
  }, [searchParams, addToCompare, selectedSlugs, maxLimit]);

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
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const formatFee = (c: College) => {
    const { annualTuitionMin, annualTuitionMax } = c.feeStructure;
    if (annualTuitionMin === null || annualTuitionMax === null) {
      return 'Not verified in official gazette';
    }
    if (annualTuitionMin === annualTuitionMax) {
      return `₹${annualTuitionMin.toLocaleString('en-IN')} / year`;
    }
    return `₹${annualTuitionMin.toLocaleString('en-IN')} – ₹${annualTuitionMax.toLocaleString('en-IN')} / year`;
  };

  const hasDiff = (extractor: (c: College) => any) => {
    if (selectedColleges.length <= 1) return false;
    const values = selectedColleges.map((c) => JSON.stringify(extractor(c)));
    return new Set(values).size > 1;
  };

  const rowDiffClass = (extractor: (c: College) => any) => {
    return highlightDifferences && hasDiff(extractor)
      ? 'bg-amber-50/70 border-l-4 border-l-amber-500'
      : '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>Comparative Assessment Engine</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Side-by-Side College Comparison
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Compare up to three West Bengal engineering institutions with normalized fields, traceable fee bands, and zero invented statistics.
          </p>
        </div>

        {selectedColleges.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 no-print">
            <button
              type="button"
              onClick={() => setHighlightDifferences(!highlightDifferences)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                highlightDifferences
                  ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Sliders className="w-4 h-4 text-amber-600" />
              <span>{highlightDifferences ? 'Highlighting Contrasts' : 'Highlight Differences'}</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
              title="Print or Save PDF of comparison"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Comparison'}</span>
            </button>

            <button
              type="button"
              onClick={clearCompare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Comparison Grid Table */}
      {selectedColleges.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 sm:p-16 text-center space-y-5 shadow-xs max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 mx-auto flex items-center justify-center">
            <Scale className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
              No Colleges Selected for Comparison
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Select up to three institutions from our verified directory to view side-by-side fees, cutoffs, and regulatory approvals.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add College to Compare</span>
            </button>
            <Link
              href="/colleges"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
            >
              Browse Directory
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Responsive Horizontal Scroll Container */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full min-w-[700px] border-collapse text-left text-xs sm:text-sm">
              {/* College Header Row */}
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th scope="col" className="p-4 sm:p-5 w-1/4 font-bold text-slate-700 align-top">
                    <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">
                      Institutions ({selectedColleges.length}/3)
                    </span>
                    {selectedColleges.length < maxLimit && (
                      <button
                        type="button"
                        onClick={() => setAddModalOpen(true)}
                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Slot ({maxLimit - selectedColleges.length} left)</span>
                      </button>
                    )}
                  </th>

                  {selectedColleges.map((college) => (
                    <th key={college.id} scope="col" className="p-4 sm:p-5 w-1/4 align-top">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                            Code: {college.wbjeebCode}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFromCompare(college.slug)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title={`Remove ${college.shortName} from comparison`}
                            aria-label={`Remove ${college.shortName} from comparison`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <Link
                          href={`/colleges/${college.slug}`}
                          className="font-heading font-bold text-sm sm:text-base text-slate-900 hover:text-emerald-700 transition-colors block line-clamp-2"
                        >
                          {college.name}
                        </Link>
                        <span className="text-xs text-slate-500 block">
                          {college.city}, {college.district}
                        </span>
                      </div>
                    </th>
                  ))}

                  {/* Empty Slot Placeholder */}
                  {Array.from({ length: maxLimit - selectedColleges.length }).map((_, idx) => (
                    <th
                      key={`empty-${idx}`}
                      scope="col"
                      className="p-4 sm:p-5 w-1/4 align-middle text-center bg-slate-50/40 border-l border-slate-100"
                    >
                      <button
                        type="button"
                        onClick={() => setAddModalOpen(true)}
                        className="w-full py-8 border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-emerald-700 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-emerald-50 flex items-center justify-center">
                          <Plus className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold">Add College</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Metrics Rows */}
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {/* Category */}
                <tr className={rowDiffClass((c) => c.category)}>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/40">
                    <div className="flex items-center justify-between">
                      <span>Category / Type</span>
                      {highlightDifferences && hasDiff((c) => c.category) && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Differs
                        </span>
                      )}
                    </div>
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 font-medium">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">
                        {c.category}
                      </span>
                    </td>
                  ))}
                  {Array.from({ length: maxLimit - selectedColleges.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-slate-50/20 text-slate-400 text-center">—</td>
                  ))}
                </tr>

                {/* Affiliation */}
                <tr className={rowDiffClass((c) => c.affiliation)}>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/40">
                    <div className="flex items-center justify-between">
                      <span>Affiliation / Autonomy</span>
                      {highlightDifferences && hasDiff((c) => c.affiliation) && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Differs
                        </span>
                      )}
                    </div>
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4">{c.affiliation}</td>
                  ))}
                  {Array.from({ length: maxLimit - selectedColleges.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-slate-50/20 text-slate-400 text-center">—</td>
                  ))}
                </tr>

                {/* Regulatory Approval */}
                <tr className={rowDiffClass((c) => c.regulatoryApproval)}>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/40">
                    <div className="flex items-center justify-between">
                      <span>Regulatory Approval</span>
                      {highlightDifferences && hasDiff((c) => c.regulatoryApproval) && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Differs
                        </span>
                      )}
                    </div>
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 flex items-center gap-1.5 font-medium">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{c.regulatoryApproval}</span>
                    </td>
                  ))}
                  {Array.from({ length: maxLimit - selectedColleges.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-slate-50/20 text-slate-400 text-center">—</td>
                  ))}
                </tr>

                {/* NAAC Grade */}
                <tr className={rowDiffClass((c) => c.naacGrade)}>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/40">
                    <div className="flex items-center justify-between">
                      <span>NAAC Accreditation</span>
                      {highlightDifferences && hasDiff((c) => c.naacGrade) && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Differs
                        </span>
                      )}
                    </div>
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4">
                      {c.naacGrade ? (
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Grade &apos;{c.naacGrade}&apos;
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Not registered / Not publicly reported</span>
                      )}
                    </td>
                  ))}
                  {Array.from({ length: maxLimit - selectedColleges.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-slate-50/20 text-slate-400 text-center">—</td>
                  ))}
                </tr>

                {/* NIRF Rank */}
                <tr className={rowDiffClass((c) => c.nirfRankEngineering2024)}>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/40">
                    <div className="flex items-center justify-between">
                      <span>NIRF Engineering 2024</span>
                      {highlightDifferences && hasDiff((c) => c.nirfRankEngineering2024) && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Differs
                        </span>
                      )}
                    </div>
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 font-bold text-slate-900">
                      {c.nirfRankEngineering2024 ? (
                        <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          <span>
                            {typeof c.nirfRankEngineering2024 === 'number'
                              ? `Rank #${c.nirfRankEngineering2024}`
                              : c.nirfRankEngineering2024}
                          </span>
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal italic">Unranked / Not in Top 200</span>
                      )}
                    </td>
                  ))}
                  {Array.from({ length: maxLimit - selectedColleges.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-slate-50/20 text-slate-400 text-center">—</td>
                  ))}
                </tr>

                {/* Annual Tuition Fees */}
                <tr className={rowDiffClass((c) => c.feeStructure.annualTuitionMin)}>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/40">
                    <div className="flex items-center justify-between">
                      <span>Annual Tuition Fee</span>
                      {highlightDifferences && hasDiff((c) => c.feeStructure.annualTuitionMin) && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Differs
                        </span>
                      )}
                    </div>
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4">
                      <strong className="text-slate-900 block font-bold">{formatFee(c)}</strong>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {c.feeStructure.annualTuitionMin !== null && c.feeStructure.annualTuitionMin <= 30000
                          ? 'State subsidized fee scale'
                          : 'Higher Education Fee Committee band'}
                      </span>
                    </td>
                  ))}
                  {Array.from({ length: maxLimit - selectedColleges.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-slate-50/20 text-slate-400 text-center">—</td>
                  ))}
                </tr>

                {/* Accepted Exams */}
                <tr className={rowDiffClass((c) => c.acceptedExams.slice().sort().join(','))}>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/40">
                    <div className="flex items-center justify-between">
                      <span>Entrance Exams</span>
                      {highlightDifferences && hasDiff((c) => c.acceptedExams.slice().sort().join(',')) && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Differs
                        </span>
                      )}
                    </div>
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {c.acceptedExams.map((e) => (
                          <span
                            key={e}
                            className="px-2 py-0.5 text-xs font-semibold rounded bg-slate-100 text-slate-700"
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: maxLimit - selectedColleges.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-slate-50/20 text-slate-400 text-center">—</td>
                  ))}
                </tr>

                {/* Key B.Tech Branches */}
                <tr className={rowDiffClass((c) => c.programs.length)}>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/40">
                    <div className="flex items-center justify-between">
                      <span>
                        B.Tech Programs ({' '}
                        <span className="text-[11px] text-slate-500 font-normal">Approved count</span> )
                      </span>
                      {highlightDifferences && hasDiff((c) => c.programs.length) && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Differs
                        </span>
                      )}
                    </div>
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4">
                      <span className="font-bold text-slate-900 block mb-1">
                        {c.programs.length} Approved Branches
                      </span>
                      <div className="flex flex-wrap gap-1 text-[11px] text-slate-600">
                        {c.programs.slice(0, 5).map((p) => (
                          <span key={p.slug} className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                            {p.slug.toUpperCase()}
                          </span>
                        ))}
                        {c.programs.length > 5 && (
                          <span className="text-slate-400">+{c.programs.length - 5} more</span>
                        )}
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: maxLimit - selectedColleges.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-slate-50/20 text-slate-400 text-center">—</td>
                  ))}
                </tr>

                {/* On-Campus Hostel */}
                <tr className={rowDiffClass((c) => c.hostelAvailable)}>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/40">
                    <div className="flex items-center justify-between">
                      <span>Hostel Availability</span>
                      {highlightDifferences && hasDiff((c) => c.hostelAvailable) && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Differs
                        </span>
                      )}
                    </div>
                  </td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4">
                      {c.hostelAvailable === true ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="w-4 h-4" /> Available On-Campus
                        </span>
                      ) : c.hostelAvailable === false ? (
                        <span className="text-slate-500 font-medium">Day Scholar / External Accommodation</span>
                      ) : (
                        <span className="text-slate-400 italic">Not gazetted</span>
                      )}
                    </td>
                  ))}
                  {Array.from({ length: maxLimit - selectedColleges.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-slate-50/20 text-slate-400 text-center">—</td>
                  ))}
                </tr>

                {/* Provenance Audit Citation */}
                <tr>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/40">Data Provenance</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4 text-xs text-slate-500 space-y-1">
                      <span className="block font-medium text-slate-700">
                        {c.provenance.fees.sourceName}
                      </span>
                      <span className="block text-[11px] text-slate-400">
                        Retrieved: {new Date(c.provenance.fees.retrievedAt).toLocaleDateString('en-IN')}
                      </span>
                    </td>
                  ))}
                  {Array.from({ length: maxLimit - selectedColleges.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-slate-50/20 text-slate-400 text-center">—</td>
                  ))}
                </tr>

                {/* Actions Row */}
                <tr className="no-print">
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/40">Action</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-4">
                      <Link
                        href={`/colleges/${c.slug}`}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
                      >
                        <span>Full Profile</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  ))}
                  {Array.from({ length: maxLimit - selectedColleges.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-slate-50/20 text-slate-400 text-center">—</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add College Modal Dialog */}
      {addModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-modal-title"
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 text-slate-900 shadow-2xl relative border border-slate-200 space-y-5">
            <button
              type="button"
              onClick={() => setAddModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 id="add-modal-title" className="font-heading font-bold text-xl text-slate-900">
                Add College to Comparison
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select from verified West Bengal institutions (up to {maxLimit} total).
              </p>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 pr-1">
              {availableColleges.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">
                  All available verified institutions are already in your comparison table.
                </p>
              ) : (
                availableColleges.map((college) => (
                  <div
                    key={college.id}
                    className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 p-2 rounded-xl transition-colors"
                  >
                    <div>
                      <span className="font-bold text-sm text-slate-900 block">
                        {college.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {college.city} · {college.category}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        addToCompare(college.slug);
                        setAddModalOpen(false);
                      }}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-colors shrink-0"
                    >
                      Select
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
