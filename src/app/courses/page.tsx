import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { VERIFIED_BRANCHES } from '@/data/branches';
import { ProgramsGrid } from '@/components/ProgramsGrid';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { GraduationCap, ShieldCheck, ChevronRight, BookOpen, Cpu, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'B.Tech Programs & Engineering Specializations | IEM Kolkata',
  description:
    'Explore 12 approved B.Tech programs at Institute of Engineering & Management (IEM), Kolkata. NBA accredited CSE, IT & ECE streams, curriculum details & seat intakes.',
  openGraph: {
    title: 'B.Tech Programs & Engineering Specializations | IEM Kolkata',
    description: 'Autonomous curriculum under MAKAUT with AICTE approvals and NBA accreditations.',
  },
};

export default function CoursesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'B.Tech Engineering Programs at IEM Kolkata',
    itemListElement: VERIFIED_BRANCHES.map((branch, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: branch.name,
        description: branch.description,
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Institute of Engineering & Management (IEM), Kolkata',
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="hover:text-brandBlue-600 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">B.Tech Programs</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-14 md:py-18 relative engineering-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-700 text-xs font-semibold text-brandTeal-500">
              <ShieldCheck className="w-4 h-4" />
              <span>AICTE Approved &amp; MAKAUT Autonomous Degrees</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
              Undergraduate B.Tech Engineering Specializations
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore 12 future-ready engineering disciplines with industry-aligned curricula, specialized labs in Salt Lake Sector V, and national NBA accreditations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Grid */}
      <ProgramsGrid />

      {/* Guidance Form Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brandBlue-100 text-brandBlue-700 text-xs font-bold uppercase tracking-wider">
                Unsure Which Branch Fits You?
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                Receive a Personalized Branch Recommendation
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our senior academic counsellors evaluate your Class 12 PCM scores, career interests, and entrance examination percentiles to suggest optimal branch preferences for IEM Kolkata.
              </p>
              <div className="pt-2 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandBlue-600 shrink-0" />
                  <span>Curriculum comparison between Core CSE, AI &amp; ML, Cyber Security, and IT</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandBlue-600 shrink-0" />
                  <span>Historical WBJEE opening and closing cutoff ranks</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandBlue-600 shrink-0" />
                  <span>Direct guidance on zero-fee IEMJEE seat opportunities</span>
                </div>
              </div>
              <div className="pt-4 flex items-center gap-3">
                <a
                  href="#courses-guidance-form"
                  className="inline-flex items-center gap-2 py-2.5 px-4 rounded-md bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors"
                >
                  <Phone className="w-4 h-4 text-brandBlue-600" />
                  <span>Request Admissions Callback</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 w-full max-w-xl mx-auto lg:max-w-none">
              <LeadCaptureForm
                id="courses-guidance-form"
                sourceCtaId="courses-directory-page"
                headline="Inquire About Any Branch"
                subheadline="Select your preferred discipline and check published thresholds."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
