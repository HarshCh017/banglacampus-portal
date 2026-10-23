import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Compass, Scale, Award, Home, Search, HelpCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found (404) | BanglaCampus',
  description: 'The requested college profile or resource could not be found. Explore verified West Bengal engineering institutions on BanglaCampus.',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl w-full text-center space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
        {/* Visual Badge */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 mx-auto flex items-center justify-center">
          <HelpCircle className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Error 404 · Page Not Found
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            We couldn&apos;t find that college or page
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            The page, institution slug, or guide you requested might have been moved or does not exist in our audited registry. Explore verified alternatives below:
          </p>
        </div>

        {/* Quick Recovery Pathways */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
          <Link
            href="/colleges"
            className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-colors group space-y-1.5"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              <Compass className="w-4 h-4" />
            </div>
            <h2 className="font-heading font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
              College Directory
            </h2>
            <p className="text-xs text-slate-500">
              Browse 12 verified engineering institutes in West Bengal.
            </p>
          </Link>

          <Link
            href="/cutoffs"
            className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-colors group space-y-1.5"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              <Award className="w-4 h-4" />
            </div>
            <h2 className="font-heading font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
              Cutoff Explorer
            </h2>
            <p className="text-xs text-slate-500">
              Calculate probable allotment by WBJEE GMR rank.
            </p>
          </Link>

          <Link
            href="/compare"
            className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-colors group space-y-1.5"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              <Scale className="w-4 h-4" />
            </div>
            <h2 className="font-heading font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
              Compare Engine
            </h2>
            <p className="text-xs text-slate-500">
              Side-by-side matrices for up to 3 institutions.
            </p>
          </Link>
        </div>

        {/* Back home CTA */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <span>Report Broken Link</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
