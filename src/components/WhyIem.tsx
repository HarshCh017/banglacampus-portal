import React from 'react';
import { Award, Building2, TrendingUp, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function WhyIem() {
  const differentiators = [
    {
      stat: '1989',
      badge: '35+ Year Legacy',
      title: 'Pioneering Autonomous Engineering',
      description: 'The first self-financed private engineering institute in West Bengal. Autonomous curriculum affiliated with MAKAUT and approved by AICTE, New Delhi.',
      facts: [
        'Autonomous syllabus updated annually with industry councils',
        'NAAC Grade \'A\' Institutional Accreditation',
        'NBA-accredited undergraduate departments (CSE, IT, ECE)',
      ],
      icon: Award,
    },
    {
      stat: '500+',
      badge: 'Sector V Tech Hub',
      title: 'Immersed in Kolkata\'s Silicon Valley',
      description: 'The Ashram Campus is located right in Salt Lake Sector V, adjacent to major multinational IT centers, research labs, and technology parks.',
      facts: [
        'Ashram Building, GN-34/2, Sector V location',
        'Walking proximity to TCS, Cognizant, Wipro, and Webel campuses',
        'Regular industry expert masterclasses and live project internships',
      ],
      icon: Building2,
    },
    {
      stat: '₹5.5–7.2L',
      badge: 'Domestic Median',
      title: 'Consistent Placement Outcomes',
      description: 'Audited campus hiring records show steady median packages between ₹5.50 LPA and ₹7.20 LPA across computer and circuit branches.',
      facts: [
        'Recruitment by top IT employers: TCS, Cognizant, Wipro, Capgemini',
        'Dedicated Career Development Centre (CDC) with soft-skill training',
        'Pre-placement training in data structures, algorithms, and aptitude',
      ],
      icon: TrendingUp,
    },
    {
      stat: '12+',
      badge: 'Cutting-Edge Streams',
      title: 'Future-Ready Specialized Curricula',
      description: 'Comprehensive programs from foundational Computer Science & Engineering to AI, Machine Learning, IoT, Cyber Security, and VLSI systems.',
      facts: [
        'Specialized labs equipped with high-compute GPU nodes',
        'Robotics, embedded systems, and sensor networking laboratories',
        'Active student chapters of ACM, IEEE, and CSI on campus',
      ],
      icon: Cpu,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-900 text-white relative overflow-hidden engineering-grid">
      {/* Radial ambient glow */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-brandBlue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-brandTeal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-navy-700 text-xs text-brandTeal-400 font-semibold mb-3">
            <span>Verified Institutional Differentiators</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading">
            Why Choose I.E.M. Kolkata for Your B.Tech?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Every statistic and credential below is drawn directly from official AICTE EoA records, MAKAUT affiliation circulars, and institutional audits.
          </p>
        </div>

        {/* 4 Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentiators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-navy-950/80 border border-navy-800 rounded-2xl p-6 sm:p-8 hover:border-navy-700 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold font-heading text-sky-400">
                        {item.stat}
                      </span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-navy-800 text-brandTeal-400 flex items-center justify-center shrink-0 border border-navy-700">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 font-heading">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-navy-800/80">
                    {item.facts.map((fact, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-brandTeal-400 shrink-0 mt-0.5" />
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-navy-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Source: Primary Institutional Records</span>
                  <a
                    href="#lead-form"
                    className="text-sky-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Inquire Seats</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Verification Note */}
        <div className="mt-10 p-4 rounded-xl bg-navy-950/60 border border-navy-800 text-center text-xs text-slate-400 max-w-2xl mx-auto">
          Notice: I.E.M. Kolkata does not guarantee 100% placement or direct admission. All admissions are conducted based on merit via IEMJEE, WBJEE, and JEE Main guidelines.
        </div>

      </div>
    </section>
  );
}
