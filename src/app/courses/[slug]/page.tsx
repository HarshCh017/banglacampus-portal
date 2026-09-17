import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { VERIFIED_BRANCHES, getBranchBySlug } from '@/data/branches';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import {
  ChevronRight,
  ShieldCheck,
  Building2,
  Users,
  CheckCircle2,
  Briefcase,
  BookOpen,
  ArrowRight,
  AlertCircle,
  Calendar,
} from 'lucide-react';

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return VERIFIED_BRANCHES.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);

  if (!branch) {
    return { title: 'Program Not Found' };
  }

  return {
    title: `B.Tech in ${branch.name} | IEM Kolkata Admissions`,
    description: `Explore B.Tech in ${branch.name} at IEM Kolkata. Verified syllabus, intake (${branch.intakeEst}), eligibility cutoffs, and top recruiters.`,
    openGraph: {
      title: `B.Tech in ${branch.name} | Institute of Engineering & Management (IEM)`,
      description: branch.description,
    },
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);

  if (!branch) {
    notFound();
  }

  const isNba = branch.highlights.some((h) => h.includes('NBA'));

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: branch.name,
    description: branch.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Institute of Engineering & Management (IEM), Kolkata',
      url: 'https://iem.edu.in',
    },
    educationalCredentialAwarded: 'Bachelor of Technology (B.Tech)',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Full-time',
      duration: 'P4Y',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-brandBlue-600 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/courses" className="hover:text-brandBlue-600 font-medium">B.Tech Programs</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">{branch.shortName}</span>
        </div>
      </div>

      {/* Program Hero */}
      <section className="bg-navy-950 text-white py-12 md:py-16 engineering-grid relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-navy-800 border border-navy-700 text-xs font-semibold text-brandTeal-500 font-mono">
                {branch.department}
              </span>
              {isNba && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  NBA Accredited
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              B.Tech in {branch.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              {branch.description}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-navy-900/90 border border-navy-800 p-3 rounded-lg">
                <span className="text-[11px] text-slate-400 block">Degree Level</span>
                <span className="text-sm font-bold text-white font-heading">Undergraduate</span>
              </div>
              <div className="bg-navy-900/90 border border-navy-800 p-3 rounded-lg">
                <span className="text-[11px] text-slate-400 block">Duration</span>
                <span className="text-sm font-bold text-white font-heading">4 Years (8 Sems)</span>
              </div>
              <div className="bg-navy-900/90 border border-navy-800 p-3 rounded-lg">
                <span className="text-[11px] text-slate-400 block">Seat Intake Est.</span>
                <span className="text-sm font-bold text-sky-400 font-heading">{branch.intakeEst}</span>
              </div>
              <div className="bg-navy-900/90 border border-navy-800 p-3 rounded-lg">
                <span className="text-[11px] text-slate-400 block">Cutoff Guide</span>
                <span className="text-sm font-bold text-emerald-400 font-heading">
                  {branch.minPcmPercent ? `${branch.minPcmPercent}% PCM` : '60% 10+2'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-14 md:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Col: Curriculum, Labs & Career (7 cols) */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Highlights */}
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brandBlue-600" />
                  <span>Program Key Features</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {branch.highlights.map((hl, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Pathways */}
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-brandBlue-600" />
                  <span>Career &amp; Industry Roles</span>
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Graduates of the {branch.name} department are actively recruited across diverse engineering sectors and enterprise roles:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {branch.careerPaths.map((career, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-slate-100 bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-brandBlue-600" />
                      <span>{career}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility & Published Criteria */}
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brandBlue-600" />
                  <span>Published Admission Criteria for {branch.shortName}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="p-3 bg-white rounded border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Class 12th Aggregate:</span>
                    <strong className="text-slate-900 text-sm">
                      {branch.minAggregatePercent ? `${branch.minAggregatePercent}%` : '60.0% Minimum'}
                    </strong>
                  </div>
                  <div className="p-3 bg-white rounded border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Class 12th PCM:</span>
                    <strong className="text-slate-900 text-sm">
                      {branch.minPcmPercent ? `${branch.minPcmPercent}% in PCM` : '50.0% in PCM'}
                    </strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                  *Preliminary criteria only. Final admission depends on WBJEE / JEE Main rank, board passing marks, and seat availability during counselling.
                </p>
              </div>

              {/* Cross-linking to Fees and Admissions */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  href="/admissions/fees"
                  className="w-full sm:w-auto text-center py-2.5 px-4 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  View Semester Fee Structure &rarr;
                </Link>
                <Link
                  href="/iemjee"
                  className="w-full sm:w-auto text-center py-2.5 px-4 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  Free IEMJEE Registration Guide &rarr;
                </Link>
              </div>

            </div>

            {/* Right Col: Embedded Pre-Configured Lead Form (5 cols) */}
            <div className="lg:col-span-5 sticky top-24 w-full max-w-xl mx-auto lg:max-w-none">
              <LeadCaptureForm
                id={`lead-form-${branch.slug}`}
                sourceCtaId={`course-page-${branch.slug}`}
                defaultBranch={branch.slug}
                headline={`Inquire About ${branch.shortName}`}
                subheadline={`Check preliminary percentage cutoffs & receive certified course details for ${branch.name}.`}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
