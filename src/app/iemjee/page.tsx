import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { ChevronRight, ShieldCheck, Sparkles, ExternalLink, Calendar, CheckCircle2, AlertCircle, FileText, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'IEMJEE 2027 Registration, Syllabus & Examination Details | IEM Kolkata',
  description:
    'Complete guide to IEMJEE 2027. Zero registration fee, online/offline exam patterns, syllabus breakdown, hall tickets, and direct portal application links.',
};

export default function IemjeePage() {
  const examHighlights = [
    { label: 'Application Fee', value: '₹0 (100% Free)', sub: 'Zero examination charge for all candidates' },
    { label: 'Mode of Exam', value: 'Online & Offline', sub: 'Multiple phases across authorized centers' },
    { label: 'Question Format', value: 'MCQ (Multiple Choice)', sub: 'Physics, Chemistry, Mathematics' },
    { label: 'Duration', value: '2 Hours (120 Mins)', sub: 'Speed and conceptual accuracy tested' },
  ];

  return (
    <>
      {/* Breadcrumb Bar */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="hover:text-brandBlue-600 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">IEMJEE 2027 Guide</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-14 md:py-18 engineering-grid relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-xs font-semibold text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Official 2027 Entrance Examination</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              IEMJEE 2027 Registration &amp; Examination Guide
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              The official Joint Entrance Examination conducted by the IEM-UEM Group for admission into B.Tech engineering programs. Zero application fee for all applicants.
            </p>
            <div className="pt-2">
              <a
                href="https://exam.iem.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-md bg-brandBlue-600 hover:bg-brandBlue-500 text-white text-xs font-bold shadow-md transition-colors"
              >
                <span>Visit Official IEMJEE Exam Portal (exam.iem.edu.in)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {examHighlights.map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">{item.label}</span>
                <div className="text-lg sm:text-xl font-extrabold text-navy-900 font-heading mt-0.5">
                  {item.value}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content & Guidance Form */}
      <section className="py-14 md:py-18 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">
                  About IEMJEE 2027 Examination
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  IEMJEE is conducted by the Institute of Engineering &amp; Management Group to assess conceptual knowledge in secondary science. Successful rank-holders qualify for admission counselling and merit fee waivers.
                </p>
              </div>

              {/* Syllabus Overview */}
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs text-slate-700">
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brandBlue-600" />
                  <span>Subject &amp; Syllabus Distribution</span>
                </h3>
                <p className="text-slate-600">
                  The examination syllabus mirrors the CBSE Class 11 and Class 12 Science curriculum:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded border border-slate-100">
                    <strong className="text-slate-900 block mb-1">Physics</strong>
                    <span className="text-slate-600">Mechanics, Thermodynamics, Electromagnetism, Optics, Modern Physics</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-100">
                    <strong className="text-slate-900 block mb-1">Chemistry</strong>
                    <span className="text-slate-600">Physical Chemistry, Organic Mechanisms, Inorganic Elements &amp; Periodic Trends</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-100">
                    <strong className="text-slate-900 block mb-1">Mathematics</strong>
                    <span className="text-slate-600">Calculus, Vectors &amp; 3D Geometry, Algebra, Coordinate Geometry</span>
                  </div>
                </div>
              </div>

              {/* How to Download Hall Ticket */}
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs text-slate-700">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Hall Ticket &amp; Results Process
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Once registered on <code>exam.iem.edu.in</code>, candidates can download their digital Hall Ticket / Admit Card. Examination results and merit scorecards are issued directly on the exam portal.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://exam.iem.edu.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 py-2 px-4 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors"
                  >
                    <span>Download Hall Ticket</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.iemcrp.com/iemEn/jeeResult304.jsp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 py-2 px-4 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors"
                  >
                    <span>Check IEMJEE Results</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Verified Helpline */}
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <strong>Official IEMJEE Helpdesk:</strong>
                  <p className="mt-0.5 text-blue-800">For exam center inquiries, slot scheduling, or hall ticket support.</p>
                </div>
                <a
                  href="#iemjee-lead-form"
                  className="py-2.5 px-4 rounded-lg bg-brandBlue-600 text-white font-bold text-center shrink-0 hover:bg-brandBlue-700 transition-colors"
                >
                  Request Exam Help
                </a>
              </div>
            </div>

            {/* Right: Embedded Guidance Form (5 cols) */}
            <div className="lg:col-span-5 sticky top-24 w-full max-w-xl mx-auto lg:max-w-none">
              <LeadCaptureForm
                id="iemjee-lead-form"
                sourceCtaId="iemjee-guide-page"
                headline="Get IEMJEE Guidance"
                subheadline="Receive exam updates, sample test pattern &amp; branch cutoff counselling."
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
