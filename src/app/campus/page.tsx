import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import {
  ChevronRight,
  ShieldCheck,
  Building2,
  BookOpen,
  Wifi,
  Shield,
  MapPin,
  Users,
  Compass,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Campus Facilities, Labs & Student Life | IEM Kolkata',
  description:
    'Explore IEM Kolkata campuses: Ashram Building (Sector V), Gurukul Campus, advanced computing laboratories, central library, hostels, and student life.',
};

export default function CampusPage() {
  const facilities = [
    {
      title: 'Advanced Computing & AI Laboratories',
      campus: 'Ashram & Gurukul Campus',
      desc: 'High-speed computing labs equipped with modern GPU architecture, dedicated Linux workstations, and cloud sandbox environments for software design, cybersecurity, and deep learning research.',
      icon: Wifi,
    },
    {
      title: 'Central Digital & Physical Library',
      campus: 'Ashram Building & Management House',
      desc: 'Comprehensive repository of over 100,000 volumes, national and international journal subscriptions (IEEE Xplore, ScienceDirect, Springer), and quiet study zones.',
      icon: BookOpen,
    },
    {
      title: 'Student Gymkhana & Cultural Life',
      campus: 'Student Bodies & Activity Hubs',
      desc: 'Vibrant co-curricular culture hosting IEM MUN (Model United Nations), annual cultural & tech festivals, hackathons, robotics challenges, and active IEEE Student Chapters.',
      icon: Users,
    },
    {
      title: 'Hostel Facilities for Outstation Students',
      campus: 'Salt Lake Vicinity',
      desc: 'Safe, supervised off-campus residential accommodations for male and female outstation students with dining facilities, high-speed Wi-Fi, and 24/7 security surveillance.',
      icon: Building2,
    },
  ];

  return (
    <>
      {/* Breadcrumb Bar */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="hover:text-brandBlue-600 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Campus &amp; Facilities</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-14 md:py-18 engineering-grid relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-700 text-xs font-semibold text-brandTeal-500">
              <ShieldCheck className="w-4 h-4" />
              <span>Kolkata Sector V IT Corridor</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Campus Infrastructure &amp; Student Experience
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Discover the learning spaces, computing clusters, and campus culture across the Ashram, Gurukul, and Management campuses in Salt Lake, Kolkata.
            </p>
          </div>
        </div>
      </section>

      {/* Campus Locations Strip */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-brandBlue-600 font-bold text-xs uppercase mb-1">
                <MapPin className="w-4 h-4" />
                <span>Primary Admission &amp; Academic Center</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 font-heading">Ashram Campus</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                GN-34/2, 1st Floor, Sector – V, Saltlake Electronics Complex, Kolkata – 700 091. Houses senior admissions, key departments &amp; laboratories.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-navy-900 font-bold text-xs uppercase mb-1">
                <MapPin className="w-4 h-4" />
                <span>Academic &amp; Auditorium Complex</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 font-heading">Management House</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                D-1, Sector – V, Salt Lake Electronics Complex, Kolkata – 700091. Venue for academic conferences, seminars, and corporate marathons.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase mb-1">
                <MapPin className="w-4 h-4" />
                <span>Engineering &amp; Research Facility</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 font-heading">Gurukul Campus</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Y-12, Block EP, Sector V, Salt Lake, Kolkata – 700091. Specialized engineering classrooms, core mechanical workshops, and research guide cells.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Grid & Lead Form */}
      <section className="py-14 md:py-18 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Facilities Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">
                  Verified Academic &amp; Research Infrastructure
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Built to foster academic rigor and technical innovation under the MAKAUT autonomous syllabus.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {facilities.map((fac, i) => {
                  const Icon = fac.icon;
                  return (
                    <div
                      key={i}
                      className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-brandBlue-100 text-brandBlue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          {fac.campus}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 font-heading mt-0.5">
                          {fac.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          {fac.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Anti-Ragging Assurance */}
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Zero-Tolerance Anti-Ragging Compliance:</strong>
                  <p className="mt-0.5 text-emerald-800">
                    IEM strictly implements UGC and AICTE anti-ragging mandates. All enrolling students and parents sign mandatory online undertakings via <code>antiragging.in</code> before class commencement.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Lead Form (5 cols) */}
            <div className="lg:col-span-5 sticky top-24">
              <LeadCaptureForm
                id="campus-lead-form"
                sourceCtaId="campus-facilities-page"
                headline="Inquire for Campus Guidance"
                subheadline="Schedule an official counselling visit at Ashram Campus in Salt Lake."
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
