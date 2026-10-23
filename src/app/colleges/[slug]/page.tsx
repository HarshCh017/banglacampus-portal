import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { VERIFIED_COLLEGES, getCollegeBySlug } from '@/data/colleges';
import { CollegeDetailClient } from './CollegeDetailClient';
import { CollegeCard } from '@/components/CollegeCard';
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
              <a
                href={college.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
              >
                <span>Visit Official College Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

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
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
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

            {/* Approved Programs & Intakes Matrix */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="font-heading font-bold text-lg text-slate-900">
                    B.Tech Programs Offered
                  </h2>
                  <p className="text-xs text-slate-500">
                    Approved branches under WBJEE seat allocation matrix
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

              <div className="divide-y divide-slate-100">
                {college.programs.map((program, idx) => (
                  <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                    <div>
                      <span className="font-semibold text-sm text-slate-900 block">
                        {program.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        Estimated Annual Intake: {program.intakeEst ? `${program.intakeEst} seats` : 'Per AICTE EoA'}
                      </span>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {program.nbaAccredited ? (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          NBA Accredited
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          AICTE Approved
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Fee Breakdown & Caution Notice */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Estimated Annual Tuition Range</span>
                  <p className="text-lg font-extrabold text-slate-900">
                    {college.feeStructure.annualTuitionMin && college.feeStructure.annualTuitionMax
                      ? `₹${college.feeStructure.annualTuitionMin.toLocaleString('en-IN')} – ₹${college.feeStructure.annualTuitionMax.toLocaleString('en-IN')}`
                      : 'Consult official circular'}
                  </p>
                  <span className="text-[11px] text-slate-500 block">Excludes voluntary hostel accommodation</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-xs text-slate-500 font-medium">One-Time & Caution Fees</span>
                  <p className="text-lg font-extrabold text-slate-900">
                    {college.feeStructure.oneTimeAdmissionFee
                      ? `~₹${college.feeStructure.oneTimeAdmissionFee.toLocaleString('en-IN')}`
                      : 'Nominal'}
                  </p>
                  <span className="text-[11px] text-slate-500 block">Refundable caution deposits subject to circular</span>
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
          <section className="pt-8 border-t border-slate-200 space-y-6">
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
