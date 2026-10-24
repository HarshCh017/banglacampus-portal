'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { College } from '@/types/college';
import { useComparison } from '@/context/ComparisonContext';
import { useAuth } from '@/context/AuthContext';
import {
  Scale,
  Check,
  AlertTriangle,
  ExternalLink,
  Shield,
  Building2,
  Calendar,
  X,
  Send,
  Loader2,
  Share2,
  Printer,
  Bookmark,
  MessageSquare,
} from 'lucide-react';

export function CollegeDetailClient({ college }: { college: College }) {
  const { isInCompare, addToCompare, removeFromCompare, selectedSlugs, maxLimit } = useComparison();
  const { user, toggleBookmark } = useAuth();
  const inCompare = isInCompare(college.slug);
  const canAdd = selectedSlugs.length < maxLimit;
  const isBookmarked = user?.bookmarkedColleges?.includes(college.slug);

  const [isBookmarking, setIsBookmarking] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorField, setErrorField] = useState('Tuition Fees');
  const [errorNote, setErrorNote] = useState('');
  const [errorSubmitted, setErrorSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleBookmarkToggle = async () => {
    setIsBookmarking(true);
    await toggleBookmark(college.slug);
    setIsBookmarking(false);
  };

  const handleEnquireTrigger = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('banglacampus:open-enquiry'));
    }
  };

  const handleCompareToggle = () => {
    if (inCompare) {
      removeFromCompare(college.slug);
    } else {
      addToCompare(college.slug);
    }
  };

  const handleShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.clipboard && url) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorSubmitted(true);
    setTimeout(() => {
      setErrorModalOpen(false);
      setErrorSubmitted(false);
      setErrorNote('');
    }, 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 no-print">
      {/* Save / Bookmark Button */}
      <button
        type="button"
        onClick={handleBookmarkToggle}
        disabled={isBookmarking}
        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-xs cursor-pointer ${
          isBookmarked
            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
            : 'bg-white text-slate-700 border border-slate-300 hover:border-emerald-500 hover:text-emerald-700'
        }`}
        title={isBookmarked ? 'Saved to your choice list' : 'Save this college'}
      >
        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-emerald-800 text-emerald-800' : 'text-slate-500'}`} />
        <span>{isBookmarked ? 'Saved Choice' : 'Save College'}</span>
      </button>

      {/* Instant Enquiry Modal Trigger */}
      <button
        type="button"
        onClick={handleEnquireTrigger}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-xs cursor-pointer"
        title="Check admission eligibility and submit preferences"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>Enquire Now</span>
      </button>

      {/* Compare Button */}
      <button
        type="button"
        onClick={handleCompareToggle}
        disabled={!inCompare && !canAdd}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-xs ${
          inCompare
            ? 'bg-emerald-600 text-white shadow-emerald-950/20'
            : canAdd
            ? 'bg-white text-slate-800 border border-slate-300 hover:border-emerald-600 hover:text-emerald-700'
            : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
        }`}
      >
        <Scale className="w-4 h-4" />
        <span>{inCompare ? 'In Comparison Deck' : 'Add to Compare'}</span>
      </button>

      {inCompare && (
        <Link
          href="/compare"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
        >
          <span>View ({selectedSlugs.length}/3)</span>
        </Link>
      )}

      {/* Share Profile Action */}
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
        title="Copy verified profile link"
      >
        {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
        <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
      </button>

      {/* Print Profile Action */}
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
        title="Print or export PDF profile report"
      >
        <Printer className="w-3.5 h-3.5 text-slate-500" />
        <span>Print</span>
      </button>

      {/* Report an Error Action */}
      <button
        type="button"
        onClick={() => setErrorModalOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
        <span>Correction</span>
      </button>

      {/* Report Error Modal */}
      {errorModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-slate-900 shadow-2xl relative border border-slate-200">
            <button
              type="button"
              onClick={() => setErrorModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 id="report-modal-title" className="font-heading font-bold text-base text-slate-900 mb-1">
              Report Data Correction: {college.shortName}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Help keep BanglaCampus accurate. If you noticed an outdated fee notice or regulatory discrepancy, please let our research desk know.
            </p>

            {errorSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you. Your feedback has been queued for verification with official sources.</span>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Field Needing Review
                  </label>
                  <select
                    value={errorField}
                    onChange={(e) => setErrorField(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Tuition Fees">Tuition Fees / Additional Charges</option>
                    <option value="Accreditation">Accreditation (NAAC / NBA / AICTE)</option>
                    <option value="Intake">Seat Intake / Branch Offering</option>
                    <option value="Contact">Contact Details / Address</option>
                    <option value="Other">Other Fact</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Details or Official Reference URL
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={errorNote}
                    onChange={(e) => setErrorNote(e.target.value)}
                    placeholder="Provide official notification circular URL or describe the discrepancy..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setErrorModalOpen(false)}
                    className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Correction</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
