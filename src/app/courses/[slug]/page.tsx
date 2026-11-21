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
  Cpu,
  Layers,
  Network,
  Radio,
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
    return { title: 'Program Not Found | BengalCampus' };
  }

  const pageUrl = `https://bengalcampus.in/courses/${branch.slug}`;

  if (slug === 'cse-iot-cs-bt') {
    return {
      title: 'B.Tech CSE (Internet of Things): Subjects, Scope & Colleges in West Bengal | BengalCampus',
      description:
        'Explore B.Tech Computer Science & Engineering with Internet of Things (IoT) in West Bengal. Comprehensive guide to IoT architecture, embedded systems, curriculum comparison vs Core CSE & ECE, WBJEE participating colleges, and career scope.',
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title: 'B.Tech CSE (Internet of Things): Subjects, Scope & Colleges in West Bengal',
        description:
          'Explore B.Tech CSE (IoT) subjects, syllabus structure, embedded systems, difference vs CSE Core and ECE, colleges in West Bengal, and career scope.',
        url: pageUrl,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'B.Tech CSE (Internet of Things): Subjects, Scope & Colleges | BengalCampus',
        description: 'Comprehensive curriculum analysis and college guide for B.Tech CSE IoT in West Bengal.',
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  return {
    title: `B.Tech in ${branch.name}: Subjects, Scope & Colleges in West Bengal | BengalCampus`,
    description: `Explore B.Tech in ${branch.name} across West Bengal engineering colleges. Sourced syllabus, intake capacity, WBJEE cutoff benchmarks, and career pathways.`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `B.Tech in ${branch.name} | West Bengal Engineering Curriculum`,
      description: branch.description,
      url: pageUrl,
      type: 'article',
    },
    robots: {
      index: true,
      follow: true,
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
  const isIot = slug === 'cse-iot-cs-bt';

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: branch.name,
    description: branch.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'BengalCampus Engineering Directory',
      url: 'https://bengalcampus.in',
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
      <div className="bg-[#FAFBFD] border-b border-[#E2E8F0] py-3 px-4 text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#1455B8] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/courses" className="hover:text-[#1455B8] transition-colors">
            B.Tech Programs
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#102A56] font-semibold">{branch.shortName}</span>
        </div>
      </div>

      {/* Program Hero */}
      <section className="bg-[#102A56] text-white py-12 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-white/10 border border-white/20 text-xs font-semibold text-sky-300 font-mono">
                {branch.department}
              </span>
              {isNba && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  NBA Accredited Discipline
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
              <div className="bg-white/10 border border-white/15 p-3 rounded-xl">
                <span className="text-[11px] text-slate-300 block">Degree Level</span>
                <span className="text-sm font-bold text-white font-heading">Undergraduate</span>
              </div>
              <div className="bg-white/10 border border-white/15 p-3 rounded-xl">
                <span className="text-[11px] text-slate-300 block">Duration</span>
                <span className="text-sm font-bold text-white font-heading">4 Years (8 Sems)</span>
              </div>
              <div className="bg-white/10 border border-white/15 p-3 rounded-xl">
                <span className="text-[11px] text-slate-300 block">Seat Intake Est.</span>
                <span className="text-sm font-bold text-sky-300 font-heading">{branch.intakeEst}</span>
              </div>
              <div className="bg-white/10 border border-white/15 p-3 rounded-xl">
                <span className="text-[11px] text-slate-300 block">Cutoff Eligibility</span>
                <span className="text-sm font-bold text-emerald-300 font-heading">
                  {branch.minPcmPercent ? `${branch.minPcmPercent}% in PCM` : '60% 10+2'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Col: Curriculum, Labs & Career (7 cols) */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Detailed IoT Architecture Breakdown (when viewing cse-iot-cs-bt) */}
              {isIot && (
                <div className="space-y-6 p-6 rounded-2xl bg-[#FAFBFD] border border-[#E2E8F0]">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#102A56] font-heading flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-[#1455B8]" />
                      <span>Understanding B.Tech CSE (Internet of Things)</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-1 leading-relaxed">
                      B.Tech in Computer Science and Engineering with specialization in Internet of Things (IoT) is an interdisciplinary branch designed around the convergence of cloud computing, embedded systems, physical microcontrollers, and communication protocols.
                    </p>
                  </div>

                  {/* Core Subjects Grid */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-[#102A56] font-heading">
                      Key Curriculum Subjects &amp; Practical Modules
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] space-y-1">
                        <strong className="text-[#102A56] block">Microcontrollers &amp; Embedded C</strong>
                        <p className="text-[#64748B] text-[11px]">ARM Cortex, ESP32, Arduino programming, GPIO interfacing, and RTOS fundamentals.</p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] space-y-1">
                        <strong className="text-[#102A56] block">IoT Network Protocols</strong>
                        <p className="text-[#64748B] text-[11px]">MQTT, CoAP, WebSockets, Bluetooth Low Energy (BLE), Zigbee, and LoRaWAN architectures.</p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] space-y-1">
                        <strong className="text-[#102A56] block">Cloud IoT &amp; Edge Analytics</strong>
                        <p className="text-[#64748B] text-[11px]">AWS IoT Core, Azure IoT Hub, Kafka telemetry pipelines, and Edge AI inference.</p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] space-y-1">
                        <strong className="text-[#102A56] block">Cyber Security &amp; Blockchain</strong>
                        <p className="text-[#64748B] text-[11px]">Device authentication, PKI certificates, firmware cryptography, and decentralized ledger audit.</p>
                      </div>
                    </div>
                  </div>

                  {/* Distinction Table: CSE Core vs CSE IoT vs ECE */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-[#102A56] font-heading">
                      How CSE (IoT) Compares to CSE Core and ECE
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#FAFBFD] border-b border-[#E2E8F0] text-[#102A56]">
                            <th className="py-2.5 px-3 font-bold">Parameter</th>
                            <th className="py-2.5 px-3 font-bold">CSE (IoT)</th>
                            <th className="py-2.5 px-3 font-bold">CSE (Core)</th>
                            <th className="py-2.5 px-3 font-bold">ECE</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F1F5F9] bg-white text-[#334155]">
                          <tr>
                            <td className="py-2 px-3 font-semibold text-[#102A56]">Primary Focus</td>
                            <td className="py-2 px-3">Connected smart devices &amp; cloud telemetry</td>
                            <td className="py-2 px-3">General software algorithms, OS &amp; compilers</td>
                            <td className="py-2 px-3">Analog circuits, VLSI &amp; signal propagation</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-semibold text-[#102A56]">Hardware Coding</td>
                            <td className="py-2 px-3 text-[#0F8B70] font-medium">Extensive (Embedded C, Python, MicroPython)</td>
                            <td className="py-2 px-3">Minimal (limited to computer organization)</td>
                            <td className="py-2 px-3">High (Verilog, VHDL, Assembly)</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-semibold text-[#102A56]">Software Depth</td>
                            <td className="py-2 px-3">DSA, Distributed Systems &amp; APIs</td>
                            <td className="py-2 px-3 font-medium text-[#1455B8]">Full Stack, DBMS, Compilers, Theory of Comp</td>
                            <td className="py-2 px-3">Basic C, DSP &amp; MatLab simulations</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Colleges in WB Offering the Branch */}
                  <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
                    <h3 className="text-xs font-bold text-[#102A56] uppercase tracking-wider">
                      Participating Colleges in West Bengal Offering IoT / Specialized Computing:
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Link
                        href="/colleges/haldia-institute-of-technology"
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#1455B8] text-[#102A56] hover:text-[#1455B8] font-semibold transition-colors"
                      >
                        Haldia Institute of Technology (HIT)
                      </Link>
                      <Link
                        href="/colleges/iem-kolkata"
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#1455B8] text-[#102A56] hover:text-[#1455B8] font-semibold transition-colors"
                      >
                        IEM Kolkata (Sector V)
                      </Link>
                      <Link
                        href="/colleges/heritage-institute-of-technology"
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#1455B8] text-[#102A56] hover:text-[#1455B8] font-semibold transition-colors"
                      >
                        Heritage Institute of Technology (HITK)
                      </Link>
                      <Link
                        href="/colleges/techno-main-salt-lake"
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#1455B8] text-[#102A56] hover:text-[#1455B8] font-semibold transition-colors"
                      >
                        Techno Main Salt Lake
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Highlights */}
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#102A56] font-heading flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#1455B8]" />
                  <span>Program Key Features</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {branch.highlights.map((hl, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#E2E8F0] text-xs font-medium text-[#102A56] flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0F8B70] shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Pathways */}
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#102A56] font-heading flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#1455B8]" />
                  <span>Career &amp; Industry Roles</span>
                </h2>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Graduates of the {branch.name} discipline are actively recruited across diverse engineering sectors and enterprise roles:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {branch.careerPaths.map((career, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-[#E2E8F0] bg-[#FAFBFD] text-xs font-semibold text-[#102A56] flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#1455B8]" />
                      <span>{career}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility Criteria */}
              <div className="p-6 rounded-2xl bg-[#FAFBFD] border border-[#E2E8F0] space-y-3">
                <h3 className="text-base font-bold text-[#102A56] font-heading flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#1455B8]" />
                  <span>General Admission Guidelines for {branch.shortName}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="p-3 bg-white rounded-xl border border-[#E2E8F0]">
                    <span className="text-[#64748B] block text-[11px]">Class 12th Aggregate:</span>
                    <strong className="text-[#102A56] text-sm font-heading">
                      {branch.minAggregatePercent ? `${branch.minAggregatePercent}% Minimum` : '60.0% Minimum'}
                    </strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#E2E8F0]">
                    <span className="text-[#64748B] block text-[11px]">Class 12th PCM:</span>
                    <strong className="text-[#102A56] text-sm font-heading">
                      {branch.minPcmPercent ? `${branch.minPcmPercent}% in PCM` : '50.0% in PCM'}
                    </strong>
                  </div>
                </div>
                <p className="text-[11px] text-[#64748B] leading-relaxed pt-1">
                  *Statutory regulatory criteria. Final allotment depends upon WBJEE centralized merit rank, domicile category verification, and round-wise seat matrix.
                </p>
              </div>

              {/* Cross-linking to Predictor & Cutoffs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  href="/wbjee-predictor"
                  className="w-full sm:w-auto text-center py-2.5 px-5 rounded-xl bg-[#1455B8] hover:bg-[#102A56] text-white text-xs font-bold transition-colors"
                >
                  Check WBJEE Rank Predictor &rarr;
                </Link>
                <Link
                  href="/cutoffs"
                  className="w-full sm:w-auto text-center py-2.5 px-5 rounded-xl bg-[#EAF2FF] hover:bg-[#D8E7FF] text-[#1455B8] text-xs font-bold transition-colors"
                >
                  Explore Historical Cutoffs &rarr;
                </Link>
              </div>

            </div>

            {/* Right Col: Embedded Lead Form (5 cols) */}
            <div className="lg:col-span-5 sticky top-24 w-full max-w-xl mx-auto lg:max-w-none">
              <LeadCaptureForm
                id={`lead-form-${branch.slug}`}
                sourceCtaId={`course-page-${branch.slug}`}
                defaultBranch={branch.slug}
                headline={`Inquire About ${branch.shortName}`}
                subheadline={`Check admission criteria, fee estimates & receive certified syllabus details for ${branch.name}.`}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
