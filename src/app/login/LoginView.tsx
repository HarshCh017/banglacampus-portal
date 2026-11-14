'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
  ShieldCheck,
  UserCheck,
  ArrowRight,
  Loader2,
  AlertCircle,
  Compass,
  Info,
} from 'lucide-react';

export function LoginView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  const notice = searchParams.get('notice');
  const errorParam = searchParams.get('error');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(
    errorParam === 'unauthorized_staff_only'
      ? 'Access restricted: Your Google account is not on the authorized staff allowlist. Student discovery and comparison tools do not require an account.'
      : errorParam
      ? 'Authentication could not be completed. Please verify your credentials.'
      : null
  );

  const handleCounsellorQuickLogin = async () => {
    setIsSubmitting(true);
    setError(null);
    const success = await login('counsellor@bengalcampus.in', 'Dr. S. K. Banerjee (Counsellor Desk)', 'counsellor');
    setIsSubmitting(false);
    if (success) {
      router.push('/admin');
    } else {
      setError('Staff login failed. Check server allowlist.');
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#EAF2FF] text-[#1455B8] flex items-center justify-center mx-auto shadow-xs">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold font-heading text-[#102A56] tracking-tight">
          Staff &amp; Counsellor Portal
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
          Authorized admissions researchers and counselling desk officers sign in here via verified institutional Google accounts.
        </p>
      </div>

      {notice === 'google_oauth_pending_client_id' && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            Google Client ID is currently using placeholder credentials. Use the verified <strong>Counsellor Desk Access</strong> button below to test staff privileges!
          </p>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium leading-relaxed">
          {error}
        </div>
      )}

      {/* Google OAuth Button */}
      <div className="space-y-3">
        <a
          href="/api/auth/google"
          className="w-full py-3 px-4 bg-white border border-slate-300 hover:border-[#1455B8] hover:bg-[#FAFBFD] text-slate-800 font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Sign In with Institutional Google</span>
        </a>

        {/* Development / Testing Shortcut for Counsellor Desk */}
        <button
          type="button"
          onClick={handleCounsellorQuickLogin}
          disabled={isSubmitting}
          className="w-full p-3 rounded-xl border border-[#BFDBFE] bg-[#EAF2FF] hover:bg-[#DBEAFE] text-left transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#102A56]">
              <UserCheck className="w-4 h-4 text-[#1455B8]" />
              <span>Allowlisted Staff Access (Counsellor Desk)</span>
            </div>
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 text-[#1455B8] animate-spin" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5 text-[#1455B8]" />
            )}
          </div>
          <div className="text-[11px] text-[#1455B8] mt-1">
            Tests server-side allowlist: counsellor@bengalcampus.in
          </div>
        </button>
      </div>

      {/* Student Guidance Callout */}
      <div className="pt-4 border-t border-slate-100 bg-[#FAFBFD] -mx-6 -mb-6 p-6 rounded-b-3xl border-t space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#102A56]">
          <Info className="w-4 h-4 text-[#1455B8] shrink-0" />
          <span>Are you an engineering applicant?</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          BengalCampus is completely open and free. You do not need to create an account or sign in to explore cutoffs, calculate fees, compare colleges, or use the WBJEE predictor.
        </p>
        <div className="flex items-center gap-3 pt-1">
          <Link
            href="/wbjee-predictor"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1455B8] hover:underline"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>WBJEE Predictor</span>
          </Link>
          <span className="text-slate-300">·</span>
          <Link
            href="/colleges"
            className="text-xs font-bold text-[#1455B8] hover:underline"
          >
            College Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
