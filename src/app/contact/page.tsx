'use client';

import React, { useState } from 'react';
import { Mail, MapPin, CheckCircle2, AlertCircle, Loader2, Send, ShieldCheck, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Data Correction / Error Report');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrorMsg('Please confirm consent to submit your enquiry.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setFieldErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          subject,
          message,
          consent,
          hp_website: honeypot,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setResponseMsg(data.message);
      } else {
        setErrorMsg(data.message || 'Unable to submit your enquiry. Please verify the form.');
        if (data.errors) {
          setFieldErrors(data.errors);
        }
      }
    } catch {
      setErrorMsg('Network connectivity failure. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2FF] text-[#1455B8] border border-[#BFDBFE] text-xs font-semibold">
          <Mail className="w-4 h-4 text-[#1455B8]" />
          <span>Research &amp; Editorial Desk</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#102A56] tracking-tight leading-tight">
          Contact BengalCampus
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
          Have an updated fee circular, accreditation correction, or query regarding our West Bengal engineering directory? Send a message to our verification team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Information & Disclaimers */}
        <div className="space-y-6 md:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
              Editorial Desk
            </h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1455B8] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#102A56] block font-semibold">Research Desk</strong>
                  <span>Salt Lake Sector V, Kolkata – 700091, West Bengal</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#1455B8] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#102A56] block font-semibold">Editorial &amp; Verification Desk</strong>
                  <span className="font-mono text-[#1455B8]">editorial@bengalcampus.in</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FAFBFD] rounded-2xl p-5 border border-[#E2E8F0] text-xs text-[#64748B] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#102A56]">
              <ShieldCheck className="w-4 h-4 text-[#0F8B70]" />
              <span>Independent Platform Notice</span>
            </div>
            <p className="leading-relaxed">
              BengalCampus is an independent publishing platform. We do not process college tuition payments or sell application forms. If you wish to reach a specific college administration, please use the official contact links on their respective profile page.
            </p>
          </div>

          <div className="bg-[#FAFBFD] rounded-2xl p-5 border border-[#E2E8F0] text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#102A56]">
              <Building2 className="w-4 h-4 text-[#1455B8]" />
              <span>Looking for IEM Kolkata Admissions Desk?</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              If your enquiry specifically concerns the 2027 intake or direct callback from the IEM Ashram Campus, visit the{' '}
              <Link href="/colleges/iem-kolkata" className="font-bold underline text-[#1455B8]">
                IEM Kolkata Hub
              </Link>{' '}
              or the{' '}
              <Link href="/apply" className="font-bold underline text-[#1455B8]">
                IEM B.Tech Application Form
              </Link>.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm md:col-span-2">
          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#EAF2FF] text-[#1455B8] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="font-heading font-bold text-xl text-[#102A56]">
                Message Successfully Submitted
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {responseMsg}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFullName('');
                  setEmail('');
                  setMessage('');
                  setConsent(false);
                }}
                className="mt-4 px-5 py-2.5 bg-[#1455B8] hover:bg-[#0F4291] text-white font-bold text-xs rounded-xl transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Bot Honeypot */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="fullName" className="text-xs font-bold text-slate-700 block mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Debojyoti Banerjee"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1455B8]"
                />
                {fieldErrors.fullName && (
                  <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.fullName[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="text-xs font-bold text-slate-700 block mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1455B8]"
                />
                {fieldErrors.email && (
                  <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.email[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="text-xs font-bold text-slate-700 block mb-1">
                  Topic / Subject <span className="text-rose-500">*</span>
                </label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1455B8]"
                >
                  <option value="Data Correction / Error Report">Data Correction / Discrepancy Report</option>
                  <option value="Suggestion for New College Listing">Suggestion for New College Profile</option>
                  <option value="Editorial & Partnership Query">Editorial & Research Collaboration</option>
                  <option value="Privacy / DPDP Request">Data Privacy & Grievance Request</option>
                  <option value="General Query">General Question</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="text-xs font-bold text-slate-700 block mb-1">
                  Message Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please specify college name, notification citation, or question..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1455B8]"
                />
                {fieldErrors.message && (
                  <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.message[0]}</p>
                )}
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-[#1455B8] rounded bg-slate-50 border-slate-300 focus:ring-[#1455B8]"
                  />
                  <span>
                    I understand that BengalCampus will use this information strictly to respond to my enquiry in accordance with the{' '}
                    <Link href="/privacy-policy" className="text-[#1455B8] underline">
                      DPDP Privacy Policy
                    </Link>. No personal data is sold or shared with commercial agents.
                  </span>
                </label>
                {fieldErrors.consent && (
                  <p className="text-[11px] text-rose-500 mt-1">{fieldErrors.consent[0]}</p>
                )}
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#1455B8] hover:bg-[#0F4291] disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#1455B8]"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>{loading ? 'Submitting Enquiry...' : 'Submit Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
