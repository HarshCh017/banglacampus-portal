'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [providerConfigured, setProviderConfigured] = useState<boolean | null>(null);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10B981', '#F5B942', '#34D399', '#60A5FA'],
      });
    } catch {
      // Graceful fallback if canvas is disabled or unsupported
    }
  };

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
        triggerCelebration();
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
    <div className="bg-[#0B1210] rounded-3xl p-8 sm:p-10 border border-[rgba(255,255,255,0.08)] text-[#ECF4F0] shadow-2xl shadow-black/80 relative overflow-hidden">
      {/* Subtle Aurora Ambient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-xs font-semibold mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Admission Deadlines &amp; Counselling Alerts</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#ECF4F0]">
          Stay Ahead of WBJEE &amp; Cutoff Notifications
        </h3>
        <p className="text-xs sm:text-sm text-[#9DB0A8] mt-2 leading-relaxed">
          Get a factual monthly summary of official seat matrix releases, decentralized counselling dates, and fee changes across West Bengal engineering colleges. Zero spam or commercial promotional blasts.
        </p>

        {status === 'success' ? (
          <div className="mt-6 p-4 rounded-xl bg-[#111C18] border border-[#10B981]/40 text-[#ECF4F0] text-xs sm:text-sm space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#10B981]">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
              <span>Subscription Registered</span>
            </div>
            <p className="text-[#9DB0A8]">{message}</p>
            {providerConfigured === false && (
              <p className="text-[11px] text-[#F5B942] bg-[rgba(245,185,66,0.12)] p-2 rounded-lg border border-[#F5B942]/30">
                Notice: Outbound Resend API unconfigured in this dev environment. Subscription recorded in local audit queue.
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
                className="flex-1 px-4 py-3 bg-[#05080A] border border-[rgba(255,255,255,0.08)] rounded-xl text-sm text-[#ECF4F0] placeholder:text-[#60726A] focus:outline-none focus:border-[#10B981]"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-gradient-to-r from-[#F5B942] to-[#F59E0B] hover:brightness-105 active:scale-98 text-slate-950 font-bold text-xs uppercase tracking-wide rounded-xl transition-all shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  </>
                )}
              </button>
            </div>

            {/* DPDP Act 2023 Compliant Affirmative Consent Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="newsletter-consent"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded border-[rgba(255,255,255,0.12)] bg-[#05080A] text-[#10B981] focus:ring-[#10B981] cursor-pointer"
              />
              <label htmlFor="newsletter-consent" className="text-[11px] text-[#9DB0A8] leading-tight cursor-pointer">
                I give consent to receive educational cutoff alerts and counseling schedule notifications as per the Indian DPDP Act 2023. Unsubscribe at any time.
              </label>
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-1.5 text-xs text-rose-400 pt-1">
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
