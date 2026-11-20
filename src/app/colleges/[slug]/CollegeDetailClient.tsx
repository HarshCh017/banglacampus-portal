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
  X,
  Send,
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
      const el = document.getElementById('college-header-enquiry');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
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
    <div className="flex flex-wrap items-center gap-2 no-print">
      {/* Save / Bookmark Button */}
      <button
        type="button"
        onClick={handleBookmarkToggle}
        disabled={isBookmarking}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 16px',
          borderRadius: 9999,
          fontSize: 13,
          fontWeight: 500,
          border: isBookmarked ? '1px solid #102A56' : '1px solid #dddddd',
          background: isBookmarked ? '#102A56' : '#ffffff',
          color: isBookmarked ? '#ffffff' : '#222222',
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
        title={isBookmarked ? 'Saved to your choice list' : 'Save this college'}
      >
        <Bookmark style={{ width: 14, height: 14 }} className={isBookmarked ? 'fill-white' : ''} />
        <span>{isBookmarked ? 'Saved' : 'Save'}</span>
      </button>

      {/* Instant Enquiry Scroll Trigger */}
      <button
        type="button"
        onClick={handleEnquireTrigger}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 16px',
          borderRadius: 9999,
          fontSize: 13,
          fontWeight: 600,
          background: '#102A56',
          color: '#ffffff',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.15s',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1455B8')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#102A56')}
        title="Check admission eligibility"
      >
        <MessageSquare style={{ width: 14, height: 14 }} />
        <span>Free Guidance</span>
      </button>

      {/* Compare Button */}
      <button
        type="button"
        onClick={handleCompareToggle}
        disabled={!inCompare && !canAdd}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 16px',
          borderRadius: 9999,
          fontSize: 13,
          fontWeight: 500,
          border: inCompare ? '1px solid #102A56' : '1px solid #dddddd',
          background: inCompare ? '#f7f7f7' : '#ffffff',
          color: inCompare ? '#102A56' : '#222222',
          cursor: !inCompare && !canAdd ? 'not-allowed' : 'pointer',
          transition: 'all 0.15s',
        }}
      >
        <Scale style={{ width: 14, height: 14 }} />
        <span>{inCompare ? 'In Comparison' : 'Compare'}</span>
      </button>

      {inCompare && (
        <Link
          href="/compare"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '8px 14px',
            borderRadius: 9999,
            background: '#102A56',
            color: '#ffffff',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <span>View ({selectedSlugs.length}/3)</span>
        </Link>
      )}

      {/* Share Profile Action */}
      <button
        type="button"
        onClick={handleShare}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 14px',
          borderRadius: 9999,
          fontSize: 13,
          fontWeight: 500,
          background: '#ffffff',
          border: '1px solid #dddddd',
          color: '#6a6a6a',
          cursor: 'pointer',
        }}
        title="Copy verified profile link"
      >
        {copiedLink ? <Check style={{ width: 14, height: 14, color: '#0F8B70' }} /> : <Share2 style={{ width: 14, height: 14 }} />}
        <span>{copiedLink ? 'Copied!' : 'Share'}</span>
      </button>

      {/* Print Profile Action */}
      <button
        type="button"
        onClick={() => window.print()}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 14px',
          borderRadius: 9999,
          fontSize: 13,
          fontWeight: 500,
          background: '#ffffff',
          border: '1px solid #dddddd',
          color: '#6a6a6a',
          cursor: 'pointer',
        }}
        title="Print profile report"
      >
        <Printer style={{ width: 14, height: 14 }} />
        <span>Print</span>
      </button>

      {/* Report an Error Action */}
      <button
        type="button"
        onClick={() => setErrorModalOpen(true)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '8px 12px',
          borderRadius: 9999,
          fontSize: 12,
          fontWeight: 500,
          background: 'transparent',
          border: 'none',
          color: '#6a6a6a',
          cursor: 'pointer',
        }}
      >
        <AlertTriangle style={{ width: 13, height: 13, color: '#F4B740' }} />
        <span>Report Data Issue</span>
      </button>

      {/* Report Error Modal */}
      {errorModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #dddddd',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              maxWidth: 480,
              width: '100%',
              padding: 24,
              position: 'relative',
            }}
          >
            <button
              type="button"
              onClick={() => setErrorModalOpen(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'none',
                border: 'none',
                color: '#6a6a6a',
                cursor: 'pointer',
              }}
              aria-label="Close dialog"
            >
              <X style={{ width: 18, height: 18 }} />
            </button>

            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#222222', marginBottom: 4 }}>
              Report Data Correction: {college.shortName}
            </h3>
            <p style={{ fontSize: 12, color: '#6a6a6a', marginBottom: 16 }}>
              Help keep BengalCampus accurate. If you noticed an outdated fee notice or regulatory discrepancy, please let our research desk know.
            </p>

            {errorSubmitted ? (
              <div
                style={{
                  padding: 14,
                  borderRadius: 8,
                  background: '#E6F6F2',
                  border: '1px solid #A7E3D4',
                  color: '#0F8B70',
                  fontSize: 13,
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Check style={{ width: 18, height: 18 }} />
                <span>Thank you. Your feedback has been queued for verification with official sources.</span>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-3.5">
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#222222', marginBottom: 4 }}>
                    Field Needing Review
                  </label>
                  <select
                    value={errorField}
                    onChange={(e) => setErrorField(e.target.value)}
                    style={{
                      width: '100%',
                      height: 40,
                      padding: '0 12px',
                      borderRadius: 8,
                      border: '1px solid #dddddd',
                      fontSize: 13,
                      color: '#222222',
                      outline: 'none',
                      background: '#ffffff',
                    }}
                  >
                    <option value="Tuition Fees">Tuition Fees / Additional Charges</option>
                    <option value="Accreditation">Accreditation (NAAC / NBA / AICTE)</option>
                    <option value="Intake">Seat Intake / Branch Offering</option>
                    <option value="Contact">Contact Details / Address</option>
                    <option value="Other">Other Fact</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#222222', marginBottom: 4 }}>
                    Details or Official Reference URL
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={errorNote}
                    onChange={(e) => setErrorNote(e.target.value)}
                    placeholder="Provide official notification circular URL or describe the discrepancy..."
                    style={{
                      width: '100%',
                      padding: 10,
                      borderRadius: 8,
                      border: '1px solid #dddddd',
                      fontSize: 13,
                      color: '#222222',
                      outline: 'none',
                    }}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setErrorModalOpen(false)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      border: '1px solid #dddddd',
                      background: '#ffffff',
                      color: '#6a6a6a',
                      fontSize: 13,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      background: '#102A56',
                      color: '#ffffff',
                      fontSize: 13,
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Send style={{ width: 14, height: 14 }} />
                    <span>Submit</span>
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

export default CollegeDetailClient;
