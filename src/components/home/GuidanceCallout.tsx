'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CheckCircle2, ArrowRight, UserCheck, Loader2 } from 'lucide-react';

export function GuidanceCallout() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rank, setRank] = useState('');
  const [branch, setBranch] = useState('Computer Science');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const benefits = [
    'College shortlisting based on rank',
    'Branch and fee guidance',
    'Counseling process support',
    'One-on-one expert advice',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Phone validation (10 digits)
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name.trim(),
          phone: cleanPhone,
          rank: rank ? parseInt(rank.replace(/[^0-9]/g, ''), 10) : undefined,
          targetBranch: branch,
          source: 'Homepage Guidance Banner',
          consentGiven: true,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          router.push('/thank-you');
        }, 1500);
      } else {
        const err = await res.json().catch(() => ({}));
        setErrorMsg(err.message || 'Unable to submit guidance request. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="bg-gradient-to-br from-[#061433] via-[#0A1E4A] to-[#071538] rounded-3xl sm:rounded-4xl p-6 sm:p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl border border-white/10">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1455B8]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column (Mockup 9): Value proposition & 4 checkmark pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold border border-blue-400/30 backdrop-blur-md">
              <UserCheck className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Free Academic Guidance</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold tracking-tight text-white leading-tight">
              Confused about your college choices?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-sans">
              Get personalized guidance from our team. Share your details and we&apos;ll help you shortlist the right colleges and branches with zero agency bias.
            </p>

            {/* 4 Value Pillars with Green Checkmark Icons (Matches Mockup 9) */}
            <div className="space-y-3 pt-2">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-[#34D399] border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Free for all students • Zero marketing spam • No agent commissions</span>
            </div>
          </div>

          {/* Right Column (Mockup 9): Clean Frosted Glass Guidance Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 text-[#102A56] space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-heading font-bold text-lg text-[#102A56]">
                  Request Personalized Guidance
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Talk to our admissions counselors within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#0B7A62] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-[#102A56]">Request Received!</h4>
                  <p className="text-xs text-slate-500">
                    Our verified counselor will connect with you shortly. Redirecting to confirmation...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {errorMsg && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                      {errorMsg}
                    </div>
                  )}

                  {/* Name Input */}
                  <div>
                    <label className="text-xs font-bold text-[#102A56] block mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sen"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1455B8] focus:ring-2 focus:ring-[#1455B8]/20 focus:outline-hidden text-[#102A56]"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="text-xs font-bold text-[#102A56] block mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1455B8] focus:ring-2 focus:ring-[#1455B8]/20 focus:outline-hidden text-[#102A56]"
                    />
                  </div>

                  {/* WBJEE Rank (Optional) */}
                  <div>
                    <label className="text-xs font-bold text-[#102A56] block mb-1">
                      WBJEE Rank <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                      placeholder="e.g. 4500"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1455B8] focus:ring-2 focus:ring-[#1455B8]/20 focus:outline-hidden text-[#102A56]"
                    />
                  </div>

                  {/* Preferred Branch Dropdown */}
                  <div>
                    <label className="text-xs font-bold text-[#102A56] block mb-1">
                      Preferred Branch
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1455B8] focus:ring-2 focus:ring-[#1455B8]/20 focus:outline-hidden text-[#102A56] cursor-pointer"
                    >
                      <option value="Computer Science">Computer Science &amp; Engg.</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Electronics & Communication">Electronics &amp; Comm. (ECE)</option>
                      <option value="Electrical Engineering">Electrical Engineering (EE)</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Not Decided Yet">Not Decided Yet</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#1455B8] to-[#2563EB] hover:from-[#0E4496] hover:to-[#1D4ED8] active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
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

                  <p className="text-[11px] text-slate-400 text-center leading-tight">
                    * This is a 100% free guidance service. Please verify official dates &amp; fees on wbjeeb.nic.in.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default GuidanceCallout;
