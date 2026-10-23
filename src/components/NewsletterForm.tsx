'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [providerConfigured, setProviderConfigured] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setStatus('error');
      setMessage('Please provide affirmative consent to receive newsletter emails.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          consent,
          hp_field: honeypot,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message);
        setProviderConfigured(data.providerConfigured);
      } else {
        setStatus('error');
        setMessage(data.message || data.errors?.email?.[0] || 'Unable to subscribe.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-800 text-white shadow-xl relative overflow-hidden">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-semibold mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Admission Deadlines & Counselling Alerts</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
          Stay Ahead of WBJEE & Cutoff Notifications
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          Get a factual monthly summary of official seat matrix releases, decentralized counselling dates, and fee changes across West Bengal engineering colleges. Zero spam or promotional blasts.
        </p>

        {status === 'success' ? (
          <div className="mt-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-200 text-xs sm:text-sm space-y-2">
            <div className="flex items-center gap-2 font-bold text-white">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Subscription Registered</span>
            </div>
            <p className="text-slate-300">{message}</p>
            {providerConfigured === false && (
              <p className="text-[11px] text-amber-300 bg-amber-950/60 p-2 rounded border border-amber-800/60">
                Notice: Live outbound SMTP/Resend API is unconfigured in this environment. Subscription recorded in local queue.
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white font-bold text-sm rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400 shrink-0 flex items-center justify-center gap-2"
              >
                {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Subscribe</span>
              </button>
            </div>

            <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer pt-1">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-emerald-600 rounded bg-slate-800 border-slate-700 focus:ring-emerald-500"
              />
              <span>
                I affirmatively consent to receive the BanglaCampus monthly admission digest per the{' '}
                <a href="/privacy-policy" className="text-emerald-400 underline hover:text-emerald-300">
                  DPDP Privacy Policy
                </a>. I can unsubscribe at any time.
              </span>
            </label>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-xs text-rose-400 p-2.5 rounded-lg bg-rose-950/60 border border-rose-800/60">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
