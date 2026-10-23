'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  GraduationCap,
  Sparkles,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  Mail,
  Loader2,
  AlertCircle,
} from 'lucide-react';

export function LoginView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  const notice = searchParams.get('notice');
  const roleParam = searchParams.get('role');

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    const role = roleParam === 'counsellor' ? 'counsellor' : 'student';
    const success = await login(email, name, role);
    setIsSubmitting(false);

    if (success) {
      router.push(role === 'counsellor' ? '/admin' : '/dashboard');
    } else {
      setError('Login could not be completed. Please try again.');
    }
  };

  const handleStudentQuickLogin = async () => {
    setIsSubmitting(true);
    const success = await login('ananya.mukherjee@student.wb.in', 'Ananya Mukherjee', 'student');
    setIsSubmitting(false);
    if (success) router.push('/dashboard');
  };

  const handleCounsellorQuickLogin = async () => {
    setIsSubmitting(true);
    const success = await login('counsellor@banglacampus.in', 'Dr. S. K. Banerjee (Counsellor Desk)', 'counsellor');
    setIsSubmitting(false);
    if (success) router.push('/admin');
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-xs">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight">
          Sign In to BanglaCampus
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
          Access your saved engineering colleges, admission preferences, and counsellor tools.
        </p>
      </div>

      {notice === 'google_oauth_pending_client_id' && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            Google Client ID is currently configured with placeholder values. You can use <strong>1-Click Student Login</strong> or <strong>Counsellor Portal</strong> below to test immediately!
          </p>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium text-center">
          {error}
        </div>
      )}

      {/* Google OAuth Button */}
      <div className="space-y-3">
        <a
          href="/api/auth/google"
          className="w-full py-2.5 px-4 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2.5"
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
          <span>Continue with Google</span>
        </a>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-2.5 text-[10px] font-bold uppercase text-slate-400">
            or Quick 1-Click Access
          </span>
        </div>

        {/* 1-Click Access Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleStudentQuickLogin}
            disabled={isSubmitting}
            className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-left transition-all"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Student Login</span>
            </div>
            <div className="text-[10px] text-emerald-700 truncate mt-0.5">
              Saved Choices &amp; Marks
            </div>
          </button>

          <button
            type="button"
            onClick={handleCounsellorQuickLogin}
            disabled={isSubmitting}
            className="p-3 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-left transition-all"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-950">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Counsellor Desk</span>
            </div>
            <div className="text-[10px] text-blue-700 truncate mt-0.5">
              Admin &amp; Leads Portal
            </div>
          </button>
        </div>
      </div>

      {/* Email Form */}
      <form onSubmit={handleCustomSubmit} className="space-y-3.5 pt-3 border-t border-slate-100">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Student / User Name (Optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Suman Sen"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@example.com"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-400 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Sign In with Email</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Secure Session Token · DPDP Act 2023 Aligned</span>
      </div>
    </div>
  );
}
