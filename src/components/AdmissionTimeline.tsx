import React from 'react';
import { Calendar, FileCheck, Award, MapPin, ArrowRight } from 'lucide-react';

export function AdmissionTimeline() {
  const steps = [
    {
      stepNumber: '01',
      title: 'Entrance Examination or Merit Registration',
      duration: 'January – July 2027',
      icon: Calendar,
      description: 'Register for IEMJEE 2027 (100% free of examination fee) on the official portal, or appear for WBJEE or JEE Main.',
      details: [
        'IEMJEE: Conducted in multiple online/offline phases',
        'WBJEE: State-level counselling quota (Code 104)',
        'JEE Main: All-India quota participation',
      ],
    },
    {
      stepNumber: '02',
      title: 'Counselling & Provisional Allotment',
      duration: 'June – August 2027',
      icon: Award,
      description: 'Participate in branch choice filling. Allotment is finalized based on exam merit rank and declared Class 12 PCM scores.',
      details: [
        'Counselling rounds for Core CSE & Allied Streams',
        'Provisional Seat Allotment letter issued',
        'Academic advisor orientation & branch confirmation',
      ],
    },
    {
      stepNumber: '03',
      title: 'Document Verification & Enrollment',
      duration: 'July – August 2027',
      icon: FileCheck,
      description: 'Complete physical document verification at the sole authorized registered admission office in Salt Lake Sector V.',
      details: [
        'Venue: Ashram Building, 1st Floor, GN-34/2, Sector V',
        'DD Payee: "Institute of Engineering & Management Trust"',
        'Submission of Class 10/12 marksheets & anti-ragging affidavit',
      ],
    },
  ];

  return (
    <section id="admissions" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-brandBlue-600 uppercase tracking-wider">
            Clear 3-Step Roadmap
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-heading">
            Official B.Tech Admission Process (2027–28)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            A transparent, merit-based enrollment flow without hidden barriers or unverified agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 sm:p-7 border border-slate-200 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold text-slate-200 font-mono">
                      {step.stepNumber}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-slate-100 text-[11px] font-semibold text-slate-600">
                      {step.duration}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-brandBlue-100 text-brandBlue-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 font-heading leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                    {step.details.map((d, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brandBlue-600 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100">
                  <a
                    href="#lead-form"
                    className="text-xs font-bold text-brandBlue-600 hover:text-brandBlue-700 flex items-center gap-1"
                  >
                    <span>Request Step {step.stepNumber} Guidance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Warning Box */}
        <div className="mt-10 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">Sole Authorized Admission Venue Notice:</strong>
            <p className="mt-0.5 leading-relaxed text-amber-800">
              The IEM-UEM group operates its sole authorized Kolkata admission office at <strong>Ashram Building, 1st Floor, GN-34/2, Sector – V, Salt Lake, Kolkata – 700091</strong>. The institute does not authorize any outside individuals or unauthorized third-party booking agents. Payments are accepted exclusively via official Demand Drafts, NEFT, or official ERP payment links.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
