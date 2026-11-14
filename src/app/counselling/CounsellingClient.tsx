'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Check,
  ChevronRight,
  ArrowRight,
  UserCheck,
  Phone,
  User,
  GraduationCap,
  Sparkles,
  Loader2,
} from 'lucide-react';

export function CounsellingClient() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [rank, setRank] = useState('');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const benefits = [
    {
      title: 'College shortlisting based on rank',
      desc: 'Realistic evaluation of your WBJEE General Merit Rank across Round 1, 2, and decentralized cutoffs.',
    },
    {
      title: 'Branch and fee guidance',
      desc: 'Compare total tuition and hostel investments across state universities and autonomous colleges.',
    },
    {
      title: 'Counseling process support',
      desc: 'Avoid common choice sheet locking errors and leverage TFW waiver quotas effectively.',
    },
    {
      title: 'One-on-one expert advice',
      desc: 'Free independent academic guidance with zero commercial college sponsorship.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanMobile = mobile.replace(/[^0-9]/g, '');
    if (cleanMobile.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!consent) {
      setErrorMsg('Please confirm your consent to receive admission updates.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: name.trim(),
          mobileNumber: cleanMobile,
          state: 'West Bengal',
          preferredCollegeSlug: 'jadavpur-university-engineering',
          preferredBranch: branch,
          consentGiven: consent,
          notes: rank ? `WBJEE Rank: ${rank}` : undefined,
          hp_field: '',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || 'Unable to submit enquiry. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#64748B] mb-4">
        <Link href="/" className="hover:text-[#1455B8] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#102A56]">Get Guidance</span>
      </nav>

      {/* 2. Main Two-Column Layout (Mockup 9 baseline) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Heading & 4 Benefit Pillars */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F8B70] bg-[#E6F6F2] px-3 py-1 rounded-full border border-[#A7E3D4] inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0F8B70]" />
              <span>Zero Agent Commissions Guaranteed</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-extrabold text-[#102A56] tracking-tight leading-tight">
              Confused about your college choices? <br className="hidden sm:inline" />
              <span className="text-[#1455B8]">Let&apos;s make a plan.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-xl">
              Get personalized guidance from our team. Share your details and we&apos;ll help you shortlist the right colleges and branches based on audited regulatory cutoffs.
            </p>
          </div>

          {/* 4 Benefit Cards matching Mockup 9 */}
          <div className="space-y-4 pt-2">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-xl bg-[#E6F6F2] text-[#0F8B70] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0F8B70]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-[#102A56]">
                    {b.title}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs text-[#64748B]">
            * BengalCampus is an independent research platform. We never charge students, collect admission deposits, or sell student leads to coaching centers.
          </div>
        </div>

        {/* Right Column: Clean Guidance Request Form Card matching Mockup 9 */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="pb-3 border-b border-[#F1F5F9]">
                <h2 className="font-heading font-bold text-lg text-[#102A56]">
                  Request Free Guidance
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  An academic counselor will reach out within 24 hours.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Your Name */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#102A56]">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sourav Mukherjee"
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-[#CBD5E1] bg-[#FAFBFD] focus:bg-white text-sm text-[#102A56] focus:border-[#1455B8]"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#102A56]">
                  Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#64748B]">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="9876543210"
                    className="w-full h-11 pl-12 pr-3 rounded-xl border border-[#CBD5E1] bg-[#FAFBFD] focus:bg-white text-sm text-[#102A56] font-mono focus:border-[#1455B8]"
                  />
                </div>
              </div>

              {/* WBJEE Rank (Optional) */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#102A56]">
                  WBJEE Rank <span className="text-[#64748B] font-normal">(Optional)</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="120000"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  placeholder="e.g. 4500 (if declared)"
                  className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-[#FAFBFD] focus:bg-white text-sm text-[#102A56] focus:border-[#1455B8]"
                />
              </div>

              {/* Preferred Branch */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#102A56]">
                  Preferred Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#CBD5E1] bg-[#FAFBFD] focus:bg-white text-xs font-semibold text-[#102A56] focus:border-[#1455B8]"
                >
                  <option value="Computer Science & Engineering">Computer Science &amp; Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Communication">Electronics &amp; Communication (ECE)</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Undecided / Open to Guidance">Undecided / Open to Guidance</option>
                </select>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-[#64748B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1455B8] focus:ring-[#1455B8] mt-0.5"
                  />
                  <span>
                    I agree to receive independent admission advisory and cutoff notifications from BengalCampus.
                  </span>
                </label>
              </div>

              {/* Submit Button matching Mockup 9 */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-[#1455B8] hover:bg-[#0E4496] active:scale-[0.98] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Request Guidance</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#E6F6F2] text-[#0F8B70] flex items-center justify-center mx-auto">
                <Check className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#102A56]">
                Guidance Request Received!
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] max-w-xs mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Our research counselor will review your rank options and get in touch at <strong>+91 {mobile}</strong> shortly.
              </p>
              <div className="pt-4">
                <Link
                  href="/wbjee-predictor"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EAF2FF] text-[#1455B8] text-xs font-bold"
                >
                  <span>Explore WBJEE Predictor in the meantime</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CounsellingClient;
