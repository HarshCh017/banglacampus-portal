import React from 'react';
import type { Metadata } from 'next';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { ShieldCheck, Phone, CheckCircle2, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apply for B.Tech Admission Guidance 2027',
  description:
    'Direct B.Tech admission acquisition & preliminary eligibility guidance for Institute of Engineering & Management (IEM), Kolkata. 4-field form with 15-min counsellor response SLA.',
};

export default function ApplyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brandBlue-100 text-brandBlue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-brandBlue-600" />
            Official Admission Guidance Desk
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-heading">
            B.Tech Admission &amp; Branch Guidance (2027–28)
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">
            Autonomous under MAKAUT · Approved by AICTE · NAAC Grade &apos;A&apos; Accredited. Submit your Class 12 percentage below to check branch cutoffs &amp; fee demand letters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Form Container (7 cols) */}
          <div className="md:col-span-7">
            <LeadCaptureForm
              id="lead-form-apply"
              sourceCtaId="dedicated-apply-page"
              headline="Admission Guidance Form"
              subheadline="Takes under 60 seconds. No spam calls. Official counsellor callback within 15 minutes."
            />
          </div>

          {/* Right Info Box (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-brandBlue-600" />
                <span>What Happens Next?</span>
              </h2>
              <ol className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brandBlue-100 text-brandBlue-700 flex items-center justify-center font-bold shrink-0 text-[11px]">
                    1
                  </span>
                  <span>
                    <strong>Instant Check:</strong> Your percentage is evaluated against published criteria for your desired branch.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brandBlue-100 text-brandBlue-700 flex items-center justify-center font-bold shrink-0 text-[11px]">
                    2
                  </span>
                  <span>
                    <strong>Counsellor Contact:</strong> An academic advisor connects via Call/WhatsApp with certified fee breakdowns.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brandBlue-100 text-brandBlue-700 flex items-center justify-center font-bold shrink-0 text-[11px]">
                    3
                  </span>
                  <span>
                    <strong>Campus Verification:</strong> Schedule document verification at the Ashram Building admission office.
                  </span>
                </li>
              </ol>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3 text-xs text-slate-600">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Admission Counselling Support</span>
              </h2>
              <p>Academic advisors connect promptly upon form submission during business hours (10:00 AM – 5:30 PM IST).</p>
              <div className="p-3 bg-slate-50 rounded-lg text-slate-800 text-xs flex flex-col gap-1 border border-slate-100">
                <span className="font-semibold text-slate-900">Email: admissions@iem.edu.in</span>
                <span className="text-slate-500">Counsellor Callback SLA: Under 15 minutes</span>
              </div>
              <div className="flex items-start gap-2 text-slate-500 pt-1 text-[11px]">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
                <span>Ashram Building, 1st Floor, GN-34/2, Sector V, Salt Lake, Kolkata – 700091</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
