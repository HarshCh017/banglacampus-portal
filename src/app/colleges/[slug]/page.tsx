import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { VERIFIED_COLLEGES, getCollegeBySlug } from '@/data/colleges';
import { VERIFIED_CUTOFFS } from '@/data/cutoffs';
import { CollegeDetailClient } from './CollegeDetailClient';
import { CollegeCard } from '@/components/CollegeCard';
import { CollegeCampusBanner } from '@/components/CollegeCampusBanner';
import { CollegeGallery } from '@/components/CollegeGallery';
import {
  MapPin,
  Building,
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Calendar,
  AlertCircle,
  FileText,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Mail,
  Phone,
  Home,
  Check,
  GraduationCap,
  Sparkles,
  Library,
  Wifi,
  Coins,
  FileSpreadsheet,
  Navigation,
  FileCheck2,
  Layers,
  Camera,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return VERIFIED_COLLEGES.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) {
    return { title: 'College Not Found' };
  }

  return {
    title: `${college.name} - B.Tech Fees, Cutoffs, Accreditation & Courses`,
    description: `Verified profile for ${college.name} (${college.shortName}), WBJEE Code ${college.wbjeebCode}. View official tuition fee structure, AICTE & NAAC approvals, and B.Tech branch matrix.`,
    openGraph: {
      title: `${college.name} | BanglaCampus`,
      description: `Official details and field-level citations for ${college.name}.`,
    },
  };
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);

  if (!college) {
    notFound();
  }

  // Related colleges (same category or district, excluding current)
  const relatedColleges = VERIFIED_COLLEGES.filter(
    (c) => c.slug !== college.slug && (c.district === college.district || c.category === college.category)
  ).slice(0, 3);

  // Historical WBJEE Cutoff archives for this institution
  const collegeCutoffs = VERIFIED_CUTOFFS.filter((c) => c.collegeSlug === college.slug);

  // Total verified approved intake
  const totalIntake = college.programs.reduce((acc, p) => acc + (p.intakeEst || 0), 0);

  const jsonLdCollege = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: college.name,
    alternateName: [college.shortName],
    url: college.officialWebsite,
    address: {
      '@type': 'PostalAddress',
      streetAddress: college.address,
      addressLocality: college.city,
      addressRegion: 'West Bengal',
      postalCode: college.pincode,
      addressCountry: 'IN',
    },
    identifier: college.wbjeebCode,
  };

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://banglacampus.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Colleges',
        item: 'https://banglacampus.in/colleges',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: college.shortName,
        item: `https://banglacampus.in/colleges/${college.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollege) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-emerald-700 flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/colleges" className="hover:text-emerald-700">
            Colleges
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-xs">{college.shortName}</span>
        </nav>

        {/* Visual Campus Photography & Architecture Banner */}
        <CollegeCampusBanner college={college} />

        {/* Hero Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                  WBJEE Code: {college.wbjeebCode}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {college.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">Est. {college.established}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
                {college.name}
              </h1>

              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs sm:text-sm text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    {college.address}, {college.city} - {college.pincode}
                  </span>
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="text-slate-600 font-medium">Affiliation: {college.affiliation}</span>
              </div>
            </div>

            {/* Official Website & CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/counselling-simulator?preselect=${college.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>Add to Choice Sheet</span>
                </Link>

                <a
                  href={college.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Client controls (compare toggle & report error) */}
              <CollegeDetailClient college={college} />
            </div>
          </div>

          {/* Quick Accreditation Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[11px] font-medium text-slate-500 block mb-0.5">Regulatory Approval</span>
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{college.regulatoryApproval}</span>
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[11px] font-medium text-slate-500 block mb-0.5">NAAC Grade</span>
              <span className="text-xs font-bold text-slate-900">
                {college.naacGrade ? `Grade '${college.naacGrade}'` : 'Not Publicly Registered'}
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[11px] font-medium text-slate-500 block mb-0.5">NIRF Engineering</span>
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                {college.nirfRankEngineering2024 ? (
                  <>
                    <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>
                      {typeof college.nirfRankEngineering2024 === 'number'
                        ? `#${college.nirfRankEngineering2024} in India`
                        : college.nirfRankEngineering2024}
                    </span>
                  </>
                ) : (
                  <span className="text-slate-500">Unranked / Not Participated</span>
                )}
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[11px] font-medium text-slate-500 block mb-0.5">Annual Tuition</span>
              <span className="text-xs font-bold text-slate-900">
                {college.feeStructure.annualTuitionMin
                  ? `₹${college.feeStructure.annualTuitionMin.toLocaleString('en-IN')}/yr`
                  : 'Notice pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Sticky In-Page Navigation Bar */}
        <div className="sticky top-16 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-2.5 bg-white/95 backdrop-blur-md border-y border-slate-200 shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar text-xs font-semibold text-slate-600">
            <a
              href="#overview"
              className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              Overview
            </a>
            <a
              href="#gallery"
              className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors whitespace-nowrap flex items-center gap-1"
            >
              <span>Campus Photos</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                {college.campusImagesGallery?.length || 4}
              </span>
            </a>
            <a
              href="#programs"
              className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              Programs & Seats
            </a>
            <a
              href="#cutoffs"
              className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              WBJEE Cutoffs
            </a>
            <a
              href="#fees"
              className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              Tuition & Aid
            </a>
            <a
              href="#facilities"
              className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              Facilities
            </a>
            <a
              href="#roadmap"
              className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              Admission Roadmap
            </a>
            {relatedColleges.length > 0 && (
              <a
                href="#related"
                className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors whitespace-nowrap"
              >
                Similar Colleges
              </a>
            )}
          </div>
        </div>

        {/* Provenance Audit Notice */}
        <div className="bg-emerald-950 text-emerald-200 rounded-2xl p-4 sm:p-5 border border-emerald-900 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-white">Verified Data Provenance Statement</p>
              <p className="text-emerald-300/90 leading-relaxed">
                Facts on this profile are referenced from the official university portal, AICTE Extension of Approval records, and WBJEEB centralized seat matrices.
              </p>
            </div>
          </div>
          <div className="text-[11px] text-emerald-300 font-mono shrink-0 bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-800">
            Audit Date: {new Date(college.provenance.fees.retrievedAt).toLocaleDateString('en-IN', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>

        {/* Main Content Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <section id="overview" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="font-heading font-bold text-lg text-slate-900">
                  Institutional Profile & Overview
                </h2>
                <a
                  href={college.provenance.overview.sourceUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1"
                >
                  <span>Source: {college.provenance.overview.sourceName}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{college.overview}</p>
            </section>

            {/* Campus Architecture & Photographic Gallery Section */}
            <section id="gallery" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading font-bold text-lg text-slate-900">
                      Campus Architecture & Photographic Gallery
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Verified Views
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    High-resolution institutional facilities, academic buildings, research laboratories, and student spaces
                  </p>
                </div>
              </div>

              <CollegeGallery
                collegeName={college.name}
                collegeShortName={college.shortName}
                images={college.campusImagesGallery || []}
                sourceName={college.imageAttribution?.sourceName}
              />
            </section>

            {/* Approved Programs & Intakes Matrix */}
            <section id="programs" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="font-heading font-bold text-lg text-slate-900">
                    B.Tech Programs Offered
                  </h2>
                  <p className="text-xs text-slate-500">
                    Approved engineering disciplines under WBJEE centralized seat allocation matrix
                  </p>
                </div>
                <a
                  href={college.provenance.programs.sourceUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1"
                >
                  <span>Source: WBJEEB Seat Matrix</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {college.programs.map((program, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          B.Tech • 4-Year Degree
                        </span>
                        {program.nbaAccredited ? (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-1 shadow-2xs">
                            <Check className="w-2.5 h-2.5" />
                            <span>NBA Accredited</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            AICTE Approved
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {program.name}
                      </h3>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="font-medium">
                        Intake: <strong className="text-slate-800">{program.intakeEst ? `${program.intakeEst} seats` : 'Per AICTE'}</strong>
                      </span>
                      <Link
                        href={`/counselling-simulator?preselect=${college.slug}&branch=${encodeURIComponent(program.name)}`}
                        className="text-emerald-700 hover:text-emerald-900 font-bold inline-flex items-center gap-1 text-[11px] hover:underline"
                      >
                        <span>Simulate Choice</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Historical WBJEE Cutoffs Section */}
            <section id="cutoffs" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading font-bold text-lg text-slate-900">
                      WBJEE Cutoff Ranks (Closing Rank Archives)
                    </h2>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      General / HS Quota
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Official centralized allotment closing ranks across counselling rounds
                  </p>
                </div>
                <Link
                  href="/cutoffs"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 shrink-0"
                >
                  <span>Open Cutoff Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {collegeCutoffs.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="py-2.5">Branch Specialization</th>
                        <th className="py-2.5">Round 1 Cutoff</th>
                        <th className="py-2.5">Final Round Cutoff</th>
                        <th className="py-2.5 text-right">Cycle Source</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {collegeCutoffs.map((co, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 font-semibold text-slate-900">
                            {co.branchName}
                          </td>
                          <td className="py-3">
                            <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-mono text-xs">
                              GMR ~{co.approxClosingRankRound1.toLocaleString('en-IN')}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 font-mono text-xs">
                              GMR ~{co.approxClosingRankFinalRound.toLocaleString('en-IN')}
                            </span>
                          </td>
                          <td className="py-3 text-right text-xs text-slate-400">
                            {co.academicCycle}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 space-y-2 border border-slate-200/80">
                  <p className="font-medium text-slate-800">
                    Detailed branch closing ranks for WBJEE Code {college.wbjeebCode} ({college.shortName}) are currently being synchronized from the WBJEEB allotment reports.
                  </p>
                  <p className="text-slate-500">
                    Admissions are strictly merit-ranked through WBJEE centralized e-counselling. Enter your rank in our Cutoff Explorer to review comparable institutions.
                  </p>
                  <Link
                    href="/cutoffs"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline pt-1"
                  >
                    <span>Check All WBJEE Cutoffs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </section>

            {/* Fee Breakdown & Caution Notice */}
            <section id="fees" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="font-heading font-bold text-lg text-slate-900">
                    Tuition Fees & Regulatory Disclosures
                  </h2>
                  <p className="text-xs text-slate-500">
                    Subsidized state norms vs approved self-financed fees
                  </p>
                </div>
                <a
                  href={college.provenance.fees.sourceUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1"
                >
                  <span>Fee Circular Citation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Annual Tuition Fee</span>
                  <p className="text-lg font-extrabold text-slate-900">
                    {college.feeStructure.annualTuitionMin && college.feeStructure.annualTuitionMax
                      ? `₹${college.feeStructure.annualTuitionMin.toLocaleString('en-IN')}`
                      : 'Consult official circular'}
                  </p>
                  <span className="text-[11px] text-slate-500 block">Per academic year</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Estimated 4-Year Tuition</span>
                  <p className="text-lg font-extrabold text-slate-900">
                    {college.feeStructure.annualTuitionMin
                      ? `₹${(college.feeStructure.annualTuitionMin * 4).toLocaleString('en-IN')}`
                      : 'Subject to gazette'}
                  </p>
                  <span className="text-[11px] text-slate-500 block">Complete 8-semester course</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-xs text-slate-500 font-medium">One-Time & Caution Fees</span>
                  <p className="text-lg font-extrabold text-slate-900">
                    {college.feeStructure.oneTimeAdmissionFee
                      ? `~₹${college.feeStructure.oneTimeAdmissionFee.toLocaleString('en-IN')}`
                      : 'Nominal'}
                  </p>
                  <span className="text-[11px] text-slate-500 block">Refundable caution deposits</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-950">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Applicant Advisory Notice</span>
                </div>
                <p className="leading-relaxed">{college.feeStructure.disclaimer}</p>
              </div>
            </section>

            {/* Government Scholarships & Financial Aid */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="font-heading font-bold text-lg text-slate-900">
                    Government Scholarships & Financial Aid
                  </h2>
                  <p className="text-xs text-slate-500">
                    State and central government schemes applicable to enrolled students
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Coins className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Govt. Subsidized</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">SVMCM Scholarship</span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ₹60,000 / year
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Swami Vivekananda Merit-cum-Means scheme for West Bengal domicile students scoring ≥ 60% in 10+2 with family annual income ≤ ₹2.5 Lakh.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">WB Student Credit Card</span>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Up to ₹10 Lakh
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    West Bengal State Government initiative offering collateral-free education loan at 4% simple interest rate with 15-year repayment window.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">AICTE TFW Quota</span>
                    <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      100% Tuition Waiver
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Tuition Fee Waiver supernumerary seats (up to 5% of intake) allocated through WBJEE centralized merit for parents with annual income &lt; ₹8 Lakh.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">AICTE Pragati for Girls</span>
                    <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      ₹50,000 / year
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    National scholarship scheme specifically supporting meritorious female candidates admitted to first year of AICTE-approved B.Tech programs.
                  </p>
                </div>
              </div>
            </section>

            {/* Admission & Counselling Roadmap */}
            <section id="roadmap" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="font-heading font-bold text-lg text-slate-900">
                  Admission & Counselling Roadmap
                </h2>
                <p className="text-xs text-slate-500">
                  Step-by-step statutory process for seat allotment at {college.shortName}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-900 text-sm">Academic Eligibility Verification</p>
                    <p className="text-slate-600 leading-relaxed">
                      Passed 10+2 Examination with Physics and Mathematics along with Chemistry / Biotechnology / Computer Science with at least 45% aggregate (40% for SC/ST/OBC-A/OBC-B candidates) and passed English with min 30%.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-900 text-sm">Qualify in WBJEE or JEE Main</p>
                    <p className="text-slate-600 leading-relaxed">
                      Secure a valid General Merit Rank (GMR) in West Bengal Joint Entrance Examination. (90% state quota through WBJEE; 10% AI quota in private institutes through JEE Main).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-900 text-sm">Online Choice Filling (wbjeeb.nic.in)</p>
                    <p className="text-slate-600 leading-relaxed">
                      Register during centralized e-counselling. Add <strong className="text-slate-900">{college.name}</strong> using WBJEE Institute Code <strong className="text-emerald-800 font-mono font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">{college.wbjeebCode}</strong> and lock your branch preferences.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-900 text-sm">Seat Allotment & Document Verification</p>
                    <p className="text-slate-600 leading-relaxed">
                      Upon allotment, pay seat acceptance fee and report with originals: WB Domicile Certificate (Proforma A1/A2/B), 10th Admit Card (DOB proof), 12th Marksheet, Rank Card, and Allotment Letter.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-900 text-sm">Physical Campus Admission & Enrollment</p>
                    <p className="text-slate-600 leading-relaxed">
                      Report to the {college.shortName} campus admission desk ({college.city}), complete institutional registration, and collect your university student identity kit.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Campus Amenities & Student Facilities */}
            <section id="facilities" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="font-heading font-bold text-lg text-slate-900">
                  Campus Amenities & Academic Infrastructure
                </h2>
                <p className="text-xs text-slate-500">
                  Verified campus facilities reported in mandatory disclosures
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 flex items-start gap-3 bg-slate-50/40">
                  <Library className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Central Library & Digital Consortium</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      Extensive book bank collection, online journal subscriptions (IEEE, Springer, ScienceDirect) and quiet reading rooms.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 flex items-start gap-3 bg-slate-50/40">
                  <Wifi className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">High-Performance Computing & Wi-Fi</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      Dedicated departmental laboratories, AI/ML computing clusters, and campus-wide high-speed optical fiber connectivity.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 flex items-start gap-3 bg-slate-50/40">
                  <Home className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Hostel & Accommodation</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      {college.hostelAvailable === true
                        ? 'Separate residential hostels for men and women with dining mess and 24/7 security surveillance.'
                        : 'Non-residential campus. Students utilize verified local PGs and apartments in the vicinity.'}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 flex items-start gap-3 bg-slate-50/40">
                  <Award className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Placement & Training Cell</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      Active career development center facilitating pre-placement training, aptitude grooming, hackathons, and corporate recruitment.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Info Column */}
          <div className="space-y-6">
            {/* Admissions Summary Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
                Admissions & Pathways
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-medium text-slate-500 block mb-1">Accepted Entrance Exams</span>
                  <div className="flex flex-wrap gap-1.5">
                    {college.acceptedExams.map((exam) => (
                      <span
                        key={exam}
                        className="font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200"
                      >
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="font-medium text-slate-500 block mb-1">Counselling Quota</span>
                  <p className="text-slate-800 font-semibold">
                    WBJEE Centralized e-Counselling (Code {college.wbjeebCode})
                  </p>
                </div>

                <div className="pt-2">
                  <span className="font-medium text-slate-500 block mb-1">On-Campus Hostel Facilities</span>
                  <p className="text-slate-800 font-semibold">
                    {college.hostelAvailable === true
                      ? 'Available (Separate Men & Women Hostels)'
                      : college.hostelAvailable === false
                      ? 'Day scholar campus / Local accommodation'
                      : 'Information not gazetted'}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-medium text-slate-500">Total Approved Intake:</span>
                  <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded text-xs">
                    {totalIntake > 0 ? `${totalIntake} B.Tech Seats` : 'As per AICTE EoA'}
                  </span>
                </div>
              </div>
            </div>

            {/* Campus Transit & Commute Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
                <Navigation className="w-4 h-4 text-emerald-700" />
                <span>Transit & Directions</span>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <p>
                  Located in <strong className="text-slate-900">{college.city}</strong> ({college.district} district), with transit connections across suburban rail and road routes.
                </p>
                <div className="pt-1">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${college.name} ${college.city} West Bengal`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl border border-emerald-200 transition-colors"
                  >
                    <span>View Campus on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Official Contact & Desk */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
                Contact & Administration
              </h3>
              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <span>{college.contact.campusAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <a
                    href={`mailto:${college.contact.officialEmail}`}
                    className="text-emerald-700 font-medium hover:underline"
                  >
                    {college.contact.officialEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{college.contact.helplineMasked}</span>
                </div>
              </div>
            </div>

            {/* Field Provenance Table */}
            <div className="bg-slate-900 text-slate-200 rounded-2xl p-6 border border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-sm text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Field Provenance Log</span>
              </div>
              <p className="text-xs text-slate-400">
                Audit trail for maintainers and students.
              </p>
              <div className="space-y-2 text-[11px] pt-1">
                <div className="p-2 rounded bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300">Intake / Programs</span>
                  <span className="text-emerald-400 font-mono">WBJEEB Seat Matrix</span>
                </div>
                <div className="p-2 rounded bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300">Tuition Fees</span>
                  <span className="text-emerald-400 font-mono">Accounts Circular</span>
                </div>
                <div className="p-2 rounded bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300">Approvals</span>
                  <span className="text-emerald-400 font-mono">AICTE / UGC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Colleges Section */}
        {relatedColleges.length > 0 && (
          <section id="related" className="pt-8 border-t border-slate-200 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                Explore Similar Institutions in West Bengal
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Colleges in {college.district} or sharing the {college.category} classification.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedColleges.map((rel) => (
                <CollegeCard key={rel.id} college={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
