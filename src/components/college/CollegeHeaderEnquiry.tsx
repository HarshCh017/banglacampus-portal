'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { College } from '@/types/college';
import { INDIAN_STATES_AND_UTS } from '@/data/indianStates';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  ShieldCheck,
  Award,
  GraduationCap,
  MapPin,
} from 'lucide-react';

interface CollegeHeaderEnquiryProps {
  college: College;
}

export function CollegeHeaderEnquiry({ college }: CollegeHeaderEnquiryProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [class10Percentage, setClass10Percentage] = useState('');
  const [class12Percentage, setClass12Percentage] = useState('');
  const [preferredBranch, setPreferredBranch] = useState(
    college.programs[0]?.name || 'Computer Science & Engineering (CSE)'
  );
  const [state, setState] = useState('West Bengal');
  const [consent, setConsent] = useState(true);
  const [hpField, setHpField] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name (minimum 2 characters).');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    const p10 = parseFloat(class10Percentage);
    if (isNaN(p10) || p10 < 30 || p10 > 100) {
      setErrorMsg('Please enter a valid Class 10 percentage between 30 and 100.');
      return;
    }

    const p12 = parseFloat(class12Percentage);
    if (isNaN(p12) || p12 < 30 || p12 > 100) {
      setErrorMsg('Please enter a valid Class 12 percentage between 30 and 100.');
      return;
    }

    if (!consent) {
      setErrorMsg('Please agree to the privacy consent to receive counselling guidance.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-idempotency-key': `hdr-enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: cleanPhone,
          class10Percentage: p10,
          class12Percentage: p12,
          state,
          preferredCollege: college.slug,
          preferredBranch,
          consent: true,
          consentVersion: 'v1.1-header-card',
          hp_field: hpField,
          sourceUrl: `https://bengalcampus.in/colleges/${college.slug}`,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setSubmissionId(data.submissionId || 'BC-CONFIRMED');
      } else {
        setErrorMsg(data.message || 'Unable to submit your details. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Success State ── */
  if (submitted) {
    return (
      <div
        style={{ borderRadius: '14px', border: '1px solid #dddddd' }}
        className="bg-white p-8 text-center space-y-4"
      >
        <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[#0F8B70]" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-bold text-[#102A56]">
            Guidance Request Submitted!
          </h3>
          <p className="text-sm text-[#6a6a6a] mt-1 leading-relaxed">
            Thank you, <span className="font-semibold text-[#222222]">{fullName}</span>. Your
            profile for{' '}
            <span className="font-semibold text-[#1455B8]">{college.name}</span> has been routed
            to our counselling desk.
          </p>
        </div>

        <div
          style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
          className="bg-[#f7f7f7] p-4 text-xs text-[#6a6a6a] max-w-sm mx-auto space-y-1 text-left"
        >
          <div className="flex justify-between">
            <span>College:</span>
            <span className="font-semibold text-[#222222]">{college.shortName}</span>
          </div>
          <div className="flex justify-between">
            <span>Branch:</span>
            <span className="font-semibold text-[#222222]">{preferredBranch}</span>
          </div>
          <div className="flex justify-between">
            <span>Scores:</span>
            <span className="font-semibold text-[#222222]">
              10th: {class10Percentage}% · 12th: {class12Percentage}%
            </span>
          </div>
          {submissionId && (
            <div className="flex justify-between pt-1" style={{ borderTop: '1px solid #dddddd' }}>
              <span>Ref ID:</span>
              <span className="font-mono font-bold text-[#102A56]">{submissionId}</span>
            </div>
          )}
        </div>

        <p className="text-xs text-[#6a6a6a]">
          A counsellor will contact you on WhatsApp/Phone. 100% free, zero agent commission.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-xs text-[#1455B8] font-semibold hover:underline cursor-pointer"
        >
          Submit for another branch or student →
        </button>
      </div>
    );
  }

  /* ── Main Two-Column Layout ── */
  return (
    <div
      style={{ borderRadius: '14px', border: '1px solid #dddddd' }}
      className="bg-white overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ── LEFT: College Info ── */}
        <div className="p-6 sm:p-8 space-y-5 bg-[#f7f7f7] lg:border-r border-b lg:border-b-0"
          style={{ borderColor: '#dddddd' }}
        >
          {/* College identity */}
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1455B8] bg-[#EAF2FF] px-2.5 py-0.5 rounded-full">
              <GraduationCap className="w-3.5 h-3.5" />
              Free Admission Guidance
            </span>
            <h2 className="text-xl font-heading font-extrabold text-[#102A56] leading-tight mt-2">
              {college.name}
            </h2>
            <p className="text-xs text-[#6a6a6a] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              {college.city}, West Bengal · WBJEE Code #{college.wbjeebCode}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div
              style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
              className="bg-white p-3 space-y-0.5"
            >
              <span className="text-[10px] text-[#6a6a6a] font-medium uppercase tracking-wide block">
                Annual Tuition
              </span>
              <span className="text-sm font-extrabold text-[#102A56]">
                {college.feeStructure.annualTuitionMin
                  ? `₹${college.feeStructure.annualTuitionMin.toLocaleString('en-IN')}`
                  : 'Gazette'}
              </span>
            </div>
            <div
              style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
              className="bg-white p-3 space-y-0.5"
            >
              <span className="text-[10px] text-[#6a6a6a] font-medium uppercase tracking-wide block">
                Programs
              </span>
              <span className="text-sm font-extrabold text-[#102A56]">
                {college.programs.length} Branches
              </span>
            </div>
            {college.naacGrade && (
              <div
                style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
                className="bg-white p-3 space-y-0.5"
              >
                <span className="text-[10px] text-[#6a6a6a] font-medium uppercase tracking-wide block">
                  NAAC Grade
                </span>
                <span className="text-sm font-extrabold text-[#0B7A62] flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  {college.naacGrade}
                </span>
              </div>
            )}
            {college.nirfRankEngineering2024 && (
              <div
                style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
                className="bg-white p-3 space-y-0.5"
              >
                <span className="text-[10px] text-[#6a6a6a] font-medium uppercase tracking-wide block">
                  NIRF Rank
                </span>
                <span className="text-sm font-extrabold text-[#102A56]">
                  {typeof college.nirfRankEngineering2024 === 'number'
                    ? `#${college.nirfRankEngineering2024}`
                    : college.nirfRankEngineering2024}
                </span>
              </div>
            )}
          </div>

          {/* Trust bullets */}
          <ul className="space-y-2">
            {[
              'Free 1-on-1 counselling — zero agent commission',
              'Verified WBJEE cutoffs & TFW eligibility check',
              'WhatsApp/Phone response within 24 hours',
            ].map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-xs text-[#3f3f3f]">
                <ShieldCheck className="w-4 h-4 text-[#0F8B70] shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT: Enquiry Form ── */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot */}
            <input
              type="text"
              name="hp_field"
              value={hpField}
              onChange={(e) => setHpField(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <h3 className="text-base font-heading font-bold text-[#222222]">
                Request Free Guidance
              </h3>
              <p className="text-xs text-[#6a6a6a] mt-0.5">
                Get personalised admission advice for {college.shortName} (2027)
              </p>
            </div>

            {/* Error banner */}
            {errorMsg && (
              <div
                style={{ borderRadius: '8px' }}
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label htmlFor="enq-fullName" className="block text-xs font-semibold text-[#222222] mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="enq-fullName"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
                  className="w-full px-3.5 py-2.5 bg-white text-xs text-[#222222] placeholder:text-[#929292] focus:outline-none focus:border-[#1455B8] focus:ring-2 focus:ring-[#1455B8]/10 transition-all"
                />
              </div>

              {/* Phone */}
              <div className="sm:col-span-2">
                <label htmlFor="enq-phone" className="block text-xs font-semibold text-[#222222] mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span
                    style={{ borderRadius: '8px 0 0 8px', border: '1px solid #dddddd', borderRight: 'none' }}
                    className="inline-flex items-center px-3 bg-[#f7f7f7] text-[#6a6a6a] text-xs font-medium"
                  >
                    +91
                  </span>
                  <input
                    id="enq-phone"
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    style={{ borderRadius: '0 8px 8px 0', border: '1px solid #dddddd' }}
                    className="w-full px-3.5 py-2.5 bg-white text-xs text-[#222222] placeholder:text-[#929292] focus:outline-none focus:border-[#1455B8] focus:ring-2 focus:ring-[#1455B8]/10 transition-all"
                  />
                </div>
              </div>

              {/* Class 10 % */}
              <div>
                <label htmlFor="enq-p10" className="block text-xs font-semibold text-[#222222] mb-1">
                  Class 10 Marks (%) <span className="text-red-500">*</span>
                </label>
                <input
                  id="enq-p10"
                  type="number"
                  step="0.1"
                  min="30"
                  max="100"
                  required
                  placeholder="e.g. 85.5"
                  value={class10Percentage}
                  onChange={(e) => setClass10Percentage(e.target.value)}
                  style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
                  className="w-full px-3.5 py-2.5 bg-white text-xs text-[#222222] placeholder:text-[#929292] focus:outline-none focus:border-[#1455B8] focus:ring-2 focus:ring-[#1455B8]/10 transition-all"
                />
              </div>

              {/* Class 12 % */}
              <div>
                <label htmlFor="enq-p12" className="block text-xs font-semibold text-[#222222] mb-1">
                  Class 12 Marks (%) <span className="text-red-500">*</span>
                </label>
                <input
                  id="enq-p12"
                  type="number"
                  step="0.1"
                  min="30"
                  max="100"
                  required
                  placeholder="e.g. 82.0"
                  value={class12Percentage}
                  onChange={(e) => setClass12Percentage(e.target.value)}
                  style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
                  className="w-full px-3.5 py-2.5 bg-white text-xs text-[#222222] placeholder:text-[#929292] focus:outline-none focus:border-[#1455B8] focus:ring-2 focus:ring-[#1455B8]/10 transition-all"
                />
              </div>

              {/* Branch */}
              <div>
                <label htmlFor="enq-branch" className="block text-xs font-semibold text-[#222222] mb-1">
                  Target Branch
                </label>
                <div className="relative">
                  <select
                    id="enq-branch"
                    value={preferredBranch}
                    onChange={(e) => setPreferredBranch(e.target.value)}
                    style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
                    className="w-full px-3.5 py-2.5 bg-white text-xs text-[#222222] focus:outline-none focus:border-[#1455B8] transition-all appearance-none cursor-pointer"
                  >
                    {college.programs.map((p) => (
                      <option key={p.slug} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#6a6a6a] absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* State */}
              <div>
                <label htmlFor="enq-state" className="block text-xs font-semibold text-[#222222] mb-1">
                  Home State / UT
                </label>
                <div className="relative">
                  <select
                    id="enq-state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
                    className="w-full px-3.5 py-2.5 bg-white text-xs text-[#222222] focus:outline-none focus:border-[#1455B8] transition-all appearance-none cursor-pointer"
                  >
                    {INDIAN_STATES_AND_UTS.map((st) => (
                      <option key={st.name} value={st.name}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#6a6a6a] absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Consent */}
            <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[#6a6a6a]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded border-[#dddddd] text-[#1455B8] focus:ring-[#1455B8] cursor-pointer"
              />
              <span>
                I agree to the{' '}
                <Link href="/privacy-policy" className="text-[#1455B8] underline hover:text-[#0E4496]">
                  Privacy Policy
                </Link>{' '}
                (DPDP Act 2023). No marketing spam.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: '#102A56',
                borderRadius: '8px',
                height: '48px',
              }}
              className="w-full flex items-center justify-center gap-2 text-white font-bold text-sm transition-all hover:bg-[#0a1c38] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting…</span>
                </>
              ) : (
                <span>Request Free Guidance</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CollegeHeaderEnquiry;
