'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { College } from '@/types/college';
import { useComparison } from '@/context/ComparisonContext';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Check,
  ExternalLink,
  ShieldCheck,
  Award,
  GraduationCap,
  Sparkles,
  MapPin,
  ChevronDown,
} from 'lucide-react';

interface CollegeMobileHeroEnquiryProps {
  college: College;
}

export function CollegeMobileHeroEnquiry({ college }: CollegeMobileHeroEnquiryProps) {
  const { isInCompare, addToCompare, removeFromCompare } = useComparison();
  const selected = isInCompare(college.slug);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [examTaken, setExamTaken] = useState<'yes' | 'no' | null>(null);
  const [examName, setExamName] = useState('WBJEE 2026');
  const [rank, setRank] = useState('');
  const [preferredBranch, setPreferredBranch] = useState(
    college.programs[0]?.name || 'Computer Science & Engineering (CSE)'
  );
  const [state, setState] = useState('West Bengal');
  const [hpField, setHpField] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const primaryPath = college.campusImageUrl || `/images/colleges/${college.slug}.jpg`;
  const isGovt =
    college.category === 'State University Faculty' ||
    college.category === 'Government Engineering College';

  const handleToggleCompare = () => {
    if (selected) {
      removeFromCompare(college.slug);
    } else {
      addToCompare(college.slug);
    }
  };

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

    if (examTaken === null) {
      setErrorMsg('Please select whether you have taken an entrance exam.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-idempotency-key': `mob-enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: cleanPhone,
          email: email.trim(),
          examTaken: examTaken === 'yes' ? `${examName}${rank ? ` (Rank: ${rank})` : ''}` : 'No Exam / Direct',
          rank: rank.trim() || undefined,
          preferredCollege: college.slug,
          preferredBranch,
          state,
          consent: true,
          consentVersion: 'v1.1-mobile-hero',
          hp_field: hpField,
          sourceUrl: `https://bengalcampus.in/colleges/${college.slug}`,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setSubmissionId(data.submissionId || 'BC-MOBILE-CONFIRMED');
      } else {
        setErrorMsg(data.message || 'Unable to submit your details. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* ── 1. UNIFIED MOBILE HERO BANNER (Matches user reference screenshot) ── */}
      <div
        style={{ borderRadius: '20px' }}
        className="relative overflow-hidden shadow-lg border border-[#0d332b] bg-[#071D18]"
      >
        {/* Subtle Campus Photography Background */}
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity">
          <Image
            src={primaryPath}
            alt={`${college.name} campus background`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Gradient Overlay for high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2520]/95 via-[#071F1A]/98 to-[#051713]" />

        {/* Content Container */}
        <div className="relative z-10 p-4 sm:p-6 space-y-4">
          {/* Eyebrow */}
          <span className="text-[11px] font-medium tracking-wide text-slate-300 block">
            By BengalCampus — independent education counsellors
          </span>

          {/* Review Title */}
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white leading-tight tracking-tight">
            {college.name} Review: Fees, Placements &amp; Admission Guidance
          </h1>

          {/* Subtitle / Intro paragraph */}
          <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal">
            Considering {college.shortName}? Check which campus and branch your offer names, what
            you would pay across the degree, and what {college.shortName} has published about
            placements. BengalCampus provides independent guidance while you compare your options.
          </p>

          {/* ── 2. LEAD FORM CARD (Nested on Top on Mobile) ── */}
          <div
            style={{ borderRadius: '16px' }}
            className="p-4 sm:p-5 bg-[#061C17]/95 border border-white/15 backdrop-blur-md shadow-2xl space-y-3.5"
          >
            {submitted ? (
              /* Success State */
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-heading font-bold text-white">
                  Guidance Request Submitted!
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                  Thank you, <span className="font-semibold text-white">{fullName}</span>. Your
                  counselling request for{' '}
                  <span className="font-semibold text-emerald-300">{college.shortName}</span> has
                  been assigned to our desk.
                </p>
                {submissionId && (
                  <div className="inline-block px-3 py-1 bg-white/10 rounded-full font-mono text-[11px] text-emerald-200 border border-white/15">
                    Ref #{submissionId}
                  </div>
                )}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                      setExamTaken(null);
                      setRank('');
                    }}
                    className="text-xs text-emerald-300 underline font-semibold hover:text-emerald-200 cursor-pointer"
                  >
                    Submit for another student or course →
                  </button>
                </div>
              </div>
            ) : (
              /* Form State */
              <form onSubmit={handleSubmit} className="space-y-3.5">
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

                {/* Form Title */}
                <div>
                  <h2 className="text-lg sm:text-xl font-heading font-extrabold text-white leading-snug">
                    Get {college.shortName} counselling
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Independent BengalCampus counselling. Not an official {college.shortName} or WBJEEB
                    form.{' '}
                    {college.officialWebsite && (
                      <a
                        href={college.officialWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-white font-medium hover:text-slate-200 inline-flex items-center gap-0.5"
                      >
                        Official {college.shortName} site.
                        <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                      </a>
                    )}
                  </p>
                </div>

                {/* Disclaimer Callout Box (Matches reference image) */}
                <div
                  style={{ borderRadius: '10px' }}
                  className="p-3 bg-[#eefbf4] border border-[#bbf0d0] text-xs text-[#1e293b] leading-relaxed shadow-2xs"
                >
                  Independent BengalCampus counselling. Not an official college or exam form.{' '}
                  <Link href="/privacy-policy" className="underline font-semibold text-[#1455B8]">
                    Privacy Policy
                  </Link>
                  .
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div
                    style={{ borderRadius: '8px' }}
                    className="flex items-center gap-2 p-2.5 bg-red-500/20 border border-red-400 text-red-200 text-xs"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-300" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="mob-enq-name" className="block text-xs font-semibold text-white">
                    Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="mob-enq-name"
                    type="text"
                    required
                    placeholder="Your Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{ borderRadius: '8px' }}
                    className="w-full h-11 px-3.5 bg-black/40 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 text-xs transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="mob-enq-email" className="block text-xs font-semibold text-white">
                    Email <span className="text-slate-300 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="mob-enq-email"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ borderRadius: '8px' }}
                    className="w-full h-11 px-3.5 bg-black/40 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 text-xs transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label htmlFor="mob-enq-phone" className="block text-xs font-semibold text-white">
                    Phone <span className="text-emerald-400">*</span>
                  </label>
                  <div className="flex">
                    <span
                      style={{ borderRadius: '8px 0 0 8px' }}
                      className="inline-flex items-center px-3.5 bg-black/60 border border-r-0 border-white/20 text-slate-300 text-xs font-semibold h-11"
                    >
                      +91
                    </span>
                    <input
                      id="mob-enq-phone"
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                      style={{ borderRadius: '0 8px 8px 0' }}
                      className="w-full h-11 px-3.5 bg-black/40 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 text-xs transition-all"
                    />
                  </div>
                </div>

                {/* Entrance Exam Question (Matches A / B options in reference image) */}
                <div className="space-y-1.5 pt-1">
                  <label className="block text-xs font-semibold text-white">
                    Have you taken a relevant entrance exam? <span className="text-emerald-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Option A: Yes */}
                    <button
                      type="button"
                      onClick={() => setExamTaken('yes')}
                      style={{ borderRadius: '8px' }}
                      className={`h-11 px-3.5 border transition-all flex items-center gap-2.5 cursor-pointer text-left ${
                        examTaken === 'yes'
                          ? 'bg-emerald-600/30 border-emerald-400 text-white font-bold ring-1 ring-emerald-400/50'
                          : 'bg-black/30 border-white/20 text-slate-300 hover:border-white/40'
                      }`}
                    >
                      <span
                        style={{ borderRadius: '4px' }}
                        className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold ${
                          examTaken === 'yes' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-300'
                        }`}
                      >
                        A
                      </span>
                      <span className="text-xs">Yes</span>
                    </button>

                    {/* Option B: No */}
                    <button
                      type="button"
                      onClick={() => setExamTaken('no')}
                      style={{ borderRadius: '8px' }}
                      className={`h-11 px-3.5 border transition-all flex items-center gap-2.5 cursor-pointer text-left ${
                        examTaken === 'no'
                          ? 'bg-emerald-600/30 border-emerald-400 text-white font-bold ring-1 ring-emerald-400/50'
                          : 'bg-black/30 border-white/20 text-slate-300 hover:border-white/40'
                      }`}
                    >
                      <span
                        style={{ borderRadius: '4px' }}
                        className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold ${
                          examTaken === 'no' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-300'
                        }`}
                      >
                        B
                      </span>
                      <span className="text-xs">No</span>
                    </button>
                  </div>
                </div>

                {/* Conditional Exam & Rank Details when Yes */}
                {examTaken === 'yes' && (
                  <div className="space-y-2.5 p-3 rounded-xl bg-black/40 border border-white/15 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Exam Name
                        </label>
                        <select
                          value={examName}
                          onChange={(e) => setExamName(e.target.value)}
                          style={{ borderRadius: '6px' }}
                          className="w-full h-9 px-2 bg-[#09221C] border border-white/20 text-white text-xs focus:outline-none focus:border-emerald-400"
                        >
                          <option value="WBJEE 2026">WBJEE 2026</option>
                          <option value="JEE Main">JEE Main</option>
                          <option value="WBJEE 2025 (Dropper)">WBJEE 2025</option>
                          <option value="JELET (Lateral)">JELET (Lateral)</option>
                          <option value="Other Entrance">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          GMR / Rank <span className="text-slate-400 font-normal">(if known)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 8450"
                          value={rank}
                          onChange={(e) => setRank(e.target.value)}
                          style={{ borderRadius: '6px' }}
                          className="w-full h-9 px-2.5 bg-[#09221C] border border-white/20 text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Preferred Branch
                      </label>
                      <select
                        value={preferredBranch}
                        onChange={(e) => setPreferredBranch(e.target.value)}
                        style={{ borderRadius: '6px' }}
                        className="w-full h-9 px-2 bg-[#09221C] border border-white/20 text-white text-xs focus:outline-none focus:border-emerald-400"
                      >
                        {college.programs.map((prog) => (
                          <option key={prog.slug} value={prog.name}>
                            {prog.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ borderRadius: '10px' }}
                  className="w-full h-12 bg-gradient-to-r from-[#0F8B70] to-[#0B7A62] hover:from-[#0B7A62] hover:to-[#085E4B] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Request…</span>
                    </>
                  ) : (
                    <span>Request Free Counselling Guidance</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── 3. MOBILE ACTION & METRIC SUMMARY STRIP ── */}
      <div
        style={{ borderRadius: '14px', border: '1px solid #dddddd' }}
        className="bg-white p-4 space-y-3.5 shadow-2xs"
      >
        {/* Badges & Compare Button */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span
              style={{
                borderRadius: 9999,
                background: isGovt ? '#E6F6F2' : '#F3F0FB',
                color: isGovt ? '#0F8B70' : '#7864C8',
                border: isGovt ? '1px solid #A7E3D4' : '1px solid #D9D1F2',
              }}
              className="text-[10px] font-bold px-2 py-0.5"
            >
              {isGovt ? 'Government' : 'Private'}
            </span>
            <span
              style={{
                borderRadius: 9999,
                background: '#EAF2FF',
                color: '#1455B8',
                border: '1px solid #BFDBFE',
              }}
              className="text-[10px] font-bold px-2 py-0.5"
            >
              WBJEE #{college.wbjeebCode}
            </span>
            {college.naacGrade && (
              <span
                style={{
                  borderRadius: 9999,
                  background: '#f7f7f7',
                  color: '#0B7A62',
                  border: '1px solid #dddddd',
                }}
                className="text-[10px] font-bold px-2 py-0.5"
              >
                NAAC {college.naacGrade}
              </span>
            )}
          </div>

          {/* Compare Button */}
          <button
            type="button"
            onClick={handleToggleCompare}
            style={{
              borderRadius: '9999px',
              border: '1px solid #102A56',
              background: selected ? '#102A56' : '#ffffff',
              color: selected ? '#ffffff' : '#102A56',
            }}
            className="px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <div
              className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                selected ? 'bg-[#102A56] border-white text-white' : 'border-[#102A56]'
              }`}
            >
              {selected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <span>{selected ? 'In Compare Deck' : 'Compare'}</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div
            style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
            className="bg-[#fafbfd] p-2.5 space-y-0.5"
          >
            <span className="text-[10px] text-[#6a6a6a] uppercase font-medium block">
              Annual Tuition
            </span>
            <span className="text-xs font-bold text-[#102A56]">
              {college.feeStructure.annualTuitionMin
                ? `₹${college.feeStructure.annualTuitionMin.toLocaleString('en-IN')}`
                : 'Gazette'}
            </span>
          </div>

          <div
            style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
            className="bg-[#fafbfd] p-2.5 space-y-0.5"
          >
            <span className="text-[10px] text-[#6a6a6a] uppercase font-medium block">
              Programs
            </span>
            <span className="text-xs font-bold text-[#102A56]">
              {college.programs.length} Branches
            </span>
          </div>

          {college.naacGrade && (
            <div
              style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
              className="bg-[#fafbfd] p-2.5 space-y-0.5"
            >
              <span className="text-[10px] text-[#6a6a6a] uppercase font-medium block">
                Accreditation
              </span>
              <span className="text-xs font-bold text-[#0B7A62] flex items-center gap-1">
                <Award className="w-3 h-3" />
                NAAC {college.naacGrade}
              </span>
            </div>
          )}

          {college.nirfRankEngineering2024 && (
            <div
              style={{ borderRadius: '8px', border: '1px solid #dddddd' }}
              className="bg-[#fafbfd] p-2.5 space-y-0.5"
            >
              <span className="text-[10px] text-[#6a6a6a] uppercase font-medium block">
                NIRF 2024
              </span>
              <span className="text-xs font-bold text-[#102A56]">
                {typeof college.nirfRankEngineering2024 === 'number'
                  ? `#${college.nirfRankEngineering2024}`
                  : college.nirfRankEngineering2024}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
