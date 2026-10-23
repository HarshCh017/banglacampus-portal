import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth';
import { getCollegeBySlug, VERIFIED_COLLEGES } from '@/data/colleges';
import {
  GraduationCap,
  Bookmark,
  Building2,
  Sparkles,
  ExternalLink,
  Scale,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  User,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Dashboard | BanglaCampus',
  description: 'Manage your saved West Bengal engineering colleges, WBJEE choice sheets, and admission preferences.',
};

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login?notice=login_required');
  }

  const savedColleges = (session.bookmarkedColleges || [])
    .map((slug) => getCollegeBySlug(slug))
    .filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden border border-emerald-900/60">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Student Aspirant Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              Welcome back, {session.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Account: <span className="font-mono text-emerald-300">{session.email}</span> · Role: <span className="capitalize text-emerald-400 font-bold">{session.role}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/counselling-simulator"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Open Choice Simulator</span>
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-xs rounded-xl transition-all"
            >
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>Compare Matrix</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Academic Profile & Quick Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Academic Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 font-heading">
              Academic Credentials
            </h3>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Verified
            </span>
          </div>
          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span>Class 10 Board Benchmark</span>
              <span className="font-bold font-mono text-slate-900">88.5%</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span>Class 12 / 10+2 Benchmark</span>
              <span className="font-bold font-mono text-slate-900">84.0%</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span>West Bengal Domicile</span>
              <span className="font-bold text-emerald-700">Eligible (Proforma a1/a2)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span>TFW Quota Status</span>
              <span className="font-bold text-slate-800">Income &lt; ₹2.5 LPA Eligible</span>
            </div>
          </div>
        </div>

        {/* Card 2: Counselling Strategy */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 font-heading">
            WBJEE Admission Milestones
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Choice Sheet Assembled</p>
                <p className="text-[11px] text-slate-500">Tier 1, Tier 2, and Anchor sequences ordered</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Scholarship Eligibility</p>
                <p className="text-[11px] text-slate-500">SVMCM (₹60,000/yr) &amp; WBSCC (4%) reviewed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Enquiry & Counselling Support */}
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 shadow-xs space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Admissions Desk
          </span>
          <h3 className="font-bold text-sm text-emerald-950 font-heading">
            Need Personal Guidance?
          </h3>
          <p className="text-xs text-emerald-900/80 leading-relaxed">
            Our Research Cell assists with branch cutoff interpretation and college document verification.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline pt-1"
          >
            <span>Message Admissions Cell</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Bookmarked / Saved Colleges Section */}
      <div id="saved" className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-emerald-600" />
              <span>Saved Colleges ({savedColleges.length})</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Institutions bookmarked for your West Bengal e-counselling choice list.
            </p>
          </div>
          {savedColleges.length > 0 && (
            <Link
              href={`/compare?colleges=${savedColleges.map((c) => c?.slug).join(',')}`}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl transition-all"
            >
              Compare All Saved Side-by-Side
            </Link>
          )}
        </div>

        {savedColleges.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm text-slate-600 font-medium">
              You haven&apos;t saved any colleges yet.
            </p>
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
            >
              Browse 20 Verified Colleges
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedColleges.map((college) => {
              if (!college) return null;
              return (
                <div
                  key={college.slug}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-900 text-white rounded-full">
                        Code: {college.wbjeebCode}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {college.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 leading-snug">
                      {college.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{college.city}, {college.district}</span>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/colleges/${college.slug}`}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/counselling-simulator?preselect=${college.slug}`}
                      className="text-[11px] font-semibold text-slate-600 hover:text-slate-900"
                    >
                      Add to Choice Sheet
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
