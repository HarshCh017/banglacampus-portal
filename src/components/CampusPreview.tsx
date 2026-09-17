import React from 'react';
import Link from 'next/link';
import { Building2, MapPin, Shield, BookOpen, Wifi, Users, ArrowRight } from 'lucide-react';

export function CampusPreview() {
  const campuses = [
    {
      name: 'Ashram Building (Main Academic Campus)',
      address: 'GN-34/2, Sector V, Salt Lake Electronics Complex, Kolkata – 700091',
      role: 'Primary Admissions Office & Undergraduate Computing Blocks',
      features: [
        'Central B.Tech Admission Cell & Counselling Chambers',
        'Advanced Computing, Cloud & AI Labs',
        'Central Auditorium & Seminar Halls',
        'Executive Conference Facilities',
      ],
      tag: 'Headquarters',
    },
    {
      name: 'Gurukul Campus (Engineering Hub)',
      address: 'Y-12, Block EP, Sector V, Salt Lake Electronics Complex, Kolkata – 700091',
      role: 'Core Engineering Laboratories & Central Workshops',
      features: [
        'Mechanical Engineering Workshops & CAD/CAM Labs',
        'Electrical Machines, Power Systems & Circuits Labs',
        'Robotics & Embedded Systems Research Center',
        'Student Innovation & Project Hub',
      ],
      tag: 'Labs & Workshops',
    },
    {
      name: 'Management House Campus',
      address: 'D-1, Sector V, Salt Lake Electronics Complex, Kolkata – 700091',
      role: 'Interdisciplinary Studies & Research Library',
      features: [
        'Extensive Central Library with IEEE/ACM Subscriptions',
        'Digital Learning Studio & Lecture Theatres',
        'Career Development Centre (CDC) Training Suites',
        'Cafeteria & Student Recreation Space',
      ],
      tag: 'Learning & Career',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-brandBlue-600" />
              Salt Lake Sector V Facilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Campuses &amp; Infrastructure
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Located directly in Kolkata&apos;s primary technology corridor, offering seamless access to public transport, Metro connectivity, and corporate neighbors.
            </p>
          </div>

          <Link
            href="/campus"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brandBlue-600 hover:text-brandBlue-700 transition-colors"
          >
            <span>Explore Full Campus Facilities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Campuses 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campuses.map((campus, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brandBlue-50 text-brandBlue-700 border border-brandBlue-200">
                    {campus.tag}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Verified Address</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1 font-heading">
                  {campus.name}
                </h3>

                <p className="text-xs text-slate-500 mb-4 flex items-start gap-1.5 leading-snug">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{campus.address}</span>
                </p>

                <p className="text-xs font-semibold text-slate-700 mb-3">
                  {campus.role}
                </p>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  {campus.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-brandTeal-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Public Transport / Metro Accessible</span>
                <a
                  href="#lead-form"
                  className="text-xs font-bold text-brandBlue-600 hover:text-brandBlue-700"
                >
                  Schedule Visit / Inquire
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Safety & Anti-Ragging Regulatory Strip */}
        <div className="mt-8 p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Disciplined, Safe &amp; Ragging-Free Campus
              </h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Strict adherence to Supreme Court directives and AICTE/UGC Anti-Ragging regulations with active surveillance.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="text-xs font-bold text-slate-700 hover:text-brandBlue-600 shrink-0"
          >
            Anti-Ragging Helpline &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}
