'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CheckCircle2, ArrowRight, UserCheck, Loader2, Sparkles } from 'lucide-react';

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
    'College shortlisting based on exact GMR rank',
    'Branch selection and transparent fee guidance',
    'Official WBJEE choice-filling assistance',
    'One-on-one independent counselling support',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    if (name.trim().length < 2) {
      setErrorMsg('Please enter your full name');
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
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div
        style={{ background: '#f7f7f7', borderRadius: '20px' }}
        className="p-6 sm:p-10 lg:p-14"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value proposition & 4 checkmark pillars */}
          <div className="lg:col-span-7 space-y-5">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold"
              style={{
                background: '#ffffff',
                border: '1px solid #dddddd',
                borderRadius: '9999px',
                color: '#102A56',
              }}
            >
              <UserCheck className="w-3.5 h-3.5" style={{ color: '#0B7A62' }} />
              <span>Free Academic &amp; Choice Guidance</span>
            </div>

            <h2
              className="text-2xl sm:text-3xl font-heading font-bold tracking-tight leading-tight"
              style={{ color: '#222222', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600 }}
            >
              Get Free 1-on-1 College Guidance
            </h2>

            <p className="text-sm leading-relaxed" style={{ color: '#3f3f3f', maxWidth: '36rem' }}>
              Get personalized, independent guidance from our team. Share your details and we&apos;ll
              help you shortlist verified colleges and branches with zero agency bias.
            </p>

            {/* 4 Value Pillars with Checkmark Icons */}
            <div className="space-y-3 pt-1">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium" style={{ color: '#3f3f3f' }}>
                  <div
                    className="w-5 h-5 flex items-center justify-center shrink-0"
                    style={{
                      borderRadius: '9999px',
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      color: '#0B7A62',
                    }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs" style={{ color: '#6a6a6a' }}>
              <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: '#0B7A62' }} />
              <span>100% Free for all students • Zero marketing spam • No agent commissions</span>
            </div>
          </div>

          {/* Right Column: Clean White Guidance Form */}
          <div className="lg:col-span-5">
            <div
              className="p-6 sm:p-7 space-y-4"
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #dddddd',
              }}
            >
              <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '12px' }}>
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-semibold mb-1"
                  style={{ color: '#102A56' }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>1-on-1 Assistance</span>
                </div>
                <h3 className="font-heading font-semibold text-lg" style={{ color: '#222222' }}>
                  Request Free Guidance
                </h3>
                <p className="text-xs mt-0.5" style={{ color: '#6a6a6a' }}>
                  Talk to an admissions counselor within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div
                    className="w-12 h-12 flex items-center justify-center mx-auto"
                    style={{
                      borderRadius: '9999px',
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      color: '#0B7A62',
                    }}
                  >
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-semibold text-base" style={{ color: '#222222' }}>
                    Request Received!
                  </h4>
                  <p className="text-xs" style={{ color: '#6a6a6a' }}>
                    Redirecting you to next steps...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {errorMsg && (
                    <div
                      className="p-2.5 text-xs"
                      style={{
                        borderRadius: '8px',
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                      }}
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: '#3f3f3f' }}>
                      Full Name <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suman Das"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm transition-all"
                      style={{
                        borderRadius: '8px',
                        border: '1px solid #dddddd',
                        color: '#222222',
                        background: '#ffffff',
                        outline: 'none',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = '#102A56'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#dddddd'; }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: '#3f3f3f' }}>
                      WhatsApp / Mobile Number <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <div className="flex">
                      <span
                        className="inline-flex items-center px-3 text-xs font-medium"
                        style={{
                          borderRadius: '8px 0 0 8px',
                          border: '1px solid #dddddd',
                          borderRight: 'none',
                          background: '#f7f7f7',
                          color: '#6a6a6a',
                        }}
                      >
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full px-3.5 py-2.5 text-sm transition-all"
                        style={{
                          borderRadius: '0 8px 8px 0',
                          border: '1px solid #dddddd',
                          color: '#222222',
                          background: '#ffffff',
                          outline: 'none',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = '#102A56'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#dddddd'; }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: '#3f3f3f' }}>
                        Expected Rank
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 3,500 GMR"
                        value={rank}
                        onChange={(e) => setRank(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm transition-all"
                        style={{
                          borderRadius: '8px',
                          border: '1px solid #dddddd',
                          color: '#222222',
                          background: '#ffffff',
                          outline: 'none',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = '#102A56'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#dddddd'; }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: '#3f3f3f' }}>
                        Target Branch
                      </label>
                      <select
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm transition-all cursor-pointer"
                        style={{
                          borderRadius: '8px',
                          border: '1px solid #dddddd',
                          color: '#222222',
                          background: '#ffffff',
                          outline: 'none',
                        }}
                      >
                        <option value="Computer Science">Computer Science</option>
                        <option value="Information Tech">Information Tech</option>
                        <option value="Electronics (ECE)">Electronics (ECE)</option>
                        <option value="Core Engineering">Core (ME/EE/CE)</option>
                        <option value="Any Branch">Any Branch</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 font-semibold text-sm text-white transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: '#102A56',
                      borderRadius: '8px',
                      height: '48px',
                      border: 'none',
                    }}
                    onMouseEnter={(e) => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = '#0e2347'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#102A56'; }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Free Guidance</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center" style={{ color: '#6a6a6a' }}>
                    By submitting, you agree to our{' '}
                    <a href="/privacy-policy" className="underline" style={{ color: '#102A56' }}>
                      Privacy Policy
                    </a>{' '}
                    (DPDP Act 2023).
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
