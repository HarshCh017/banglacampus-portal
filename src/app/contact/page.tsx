import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import {
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Building2,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Official Admission Office | IEM Kolkata',
  description:
    'Contact Institute of Engineering & Management (IEM), Kolkata. Registered admission office at Ashram Building (Salt Lake Sector V), helplines, emails, and office hours.',
};

export default function ContactPage() {
  return (
    <>
      {/* Breadcrumb Bar */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="hover:text-brandBlue-600 font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Contact</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-14 md:py-18 engineering-grid relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-700 text-xs font-semibold text-brandTeal-500">
              <ShieldCheck className="w-4 h-4" />
              <span>Registered Admissions Venue</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Contact IEM Kolkata Admissions Desk
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Connect with academic advisors, inquire about B.Tech branch availability, or schedule physical document verification at Ashram Building in Salt Lake Sector V.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Details & Lead Form */}
      <section className="py-14 md:py-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Verified NAP Directory (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-heading">
                  Sole Authorized Admission Office
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  The IEM-UEM Group operates its primary admissions and counselling facilities strictly at the addresses listed below:
                </p>
              </div>

              <div className="space-y-4">
                {/* Ashram Building Card */}
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-brandBlue-600 font-bold text-xs uppercase tracking-wide">
                    <MapPin className="w-4 h-4" />
                    <span>Primary Admission Center (Registered Office)</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    Ashram Building (1st Floor)
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    GN-34/2, 1st Floor, Sector – V, Saltlake Electronics Complex, Kolkata – 700 091, West Bengal, India.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Nearest Landmark: Webel Bhawan / SDF Building, Sector V, Salt Lake.
                  </p>
                </div>

                {/* Additional Campuses Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="text-slate-900 block font-heading mb-1">Management House</strong>
                    <p className="text-slate-600">D-1, Sector – V, Salt Lake Electronics Complex, Kolkata – 700091.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <strong className="text-slate-900 block font-heading mb-1">Gurukul Campus</strong>
                    <p className="text-slate-600">Y-12, Block EP, Sector V, Salt Lake, Kolkata – 700091.</p>
                  </div>
                </div>

                {/* Contact Channels */}
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Admissions Counselling Desk
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="text-[11px] text-slate-500 block">Official Support</span>
                        <span className="font-bold text-slate-900">
                          Ashram Campus Admission Cell
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-brandBlue-600 shrink-0" />
                      <div>
                        <span className="text-[11px] text-slate-500 block">Visiting Hours</span>
                        <span className="font-semibold text-slate-800">
                          Mon–Sat: 09:30 AM – 05:30 PM IST
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 sm:col-span-2">
                      <Mail className="w-4 h-4 text-brandBlue-600 shrink-0" />
                      <div>
                        <span className="text-[11px] text-slate-500 block">Official Admissions Email</span>
                        <a href="mailto:admissions@iem.edu.in" className="font-bold text-brandBlue-600 hover:underline">
                          admissions@iem.edu.in
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="p-4 rounded-lg bg-white border border-slate-200 flex items-center gap-3 text-xs text-slate-700">
                  <Clock className="w-4 h-4 text-brandBlue-600 shrink-0" />
                  <span>
                    <strong>Office Operating Hours:</strong> Monday through Saturday: 09:30 AM to 05:30 PM (Closed on Sundays &amp; Public Holidays).
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Embedded Form (5 cols) */}
            <div className="lg:col-span-5 sticky top-24">
              <LeadCaptureForm
                id="contact-lead-form"
                sourceCtaId="contact-us-page"
                headline="Inquire with an Advisor"
                subheadline="Leave your details for an immediate callback from the Ashram Campus admission team."
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
