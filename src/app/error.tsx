'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home, Compass } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log non-sensitive client error digest safely
    if (process.env.NODE_ENV !== 'production') {
      console.error('Client Error Caught:', error);
    }
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center space-y-6 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 mx-auto flex items-center justify-center">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            Application State Notice
          </span>
          <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
            Temporary Display Error
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            An unexpected error occurred while rendering this page view. Your comparison deck and saved preferences are preserved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/colleges"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Colleges Directory</span>
          </Link>
        </div>

        {error.digest && (
          <p className="text-[10px] text-slate-400 font-mono">
            Reference code: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
