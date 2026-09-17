'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { getBranchBySlug } from '@/data/branches';
import { CheckCircle2, MessageCircle, Phone, FileText, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export function ThankYouContent() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get('leadId') || 'IEM-CONFIRMED';
  const branchSlug = searchParams.get('branch') || 'cse';

  const branch = getBranchBySlug(branchSlug);
  const branchName = branch ? branch.name : 'B.Tech Engineering';

  // Fire deduplicated conversion event ONCE on confirmed server success
  useEffect(() => {
    if (leadId) {
      trackEvent('lead_submitted', {
        lead_id: leadId,
        branch: branchSlug,
        event_id: leadId,
      });
    }
  }, [leadId, branchSlug]);

  const whatsappMessage = encodeURIComponent(
    `Hello, my admission guidance request ID is ${leadId}. I am inquiring about B.Tech admission in ${branchName} at IEM Kolkata.`
  );

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Success Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-md text-center">
          
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Request Successfully Registered
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Your Admission Guidance Request is Received
          </h1>

          <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto">
            Your preliminary details for <strong>{branchName}</strong> have been registered with the IEM Kolkata counselling desk.
          </p>

          {/* Reference ID Pill */}
          <div className="mt-5 p-3.5 rounded-lg bg-slate-50 border border-slate-200 max-w-sm mx-auto">
            <span className="text-xs text-slate-500 uppercase font-mono">Reference Tracking ID</span>
            <div className="text-base font-extrabold text-brandBlue-700 font-mono tracking-wider mt-0.5">
              {leadId}
            </div>
          </div>

          {/* Section 9.9 WhatsApp Channel Integration */}
          <div className="mt-8 p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Fast-Track via Official WhatsApp</span>
                </h2>
                <p className="text-xs text-emerald-800 mt-1">
                  Connect immediately with a verified admission advisor to receive the fee structure and cutoff guide.
                </p>
              </div>

              <a
                href={
                  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
                    ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${whatsappMessage}`
                    : 'mailto:admissions@iem.edu.in?subject=B.Tech%20Admission%20Guidance%20Inquiry'
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('whatsapp_enquiry_clicked', {
                    lead_id: leadId,
                    branch: branchSlug,
                  })
                }
                className="w-full sm:w-auto py-2.5 px-5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Admissions Desk</span>
              </a>
            </div>
          </div>

          {/* SLA Callout */}
          <div className="mt-6 text-xs text-slate-500 flex flex-wrap items-center justify-center gap-4">
            <span>• First-Contact SLA: &lt; 15 minutes during business hours</span>
            <span>• Official Admission Cell: Ashram Building, Sector V, Salt Lake</span>
          </div>

          {/* Documents to Prepare for Physical Counselling */}
          <div className="mt-10 pt-8 border-t border-slate-200 text-left">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brandBlue-600" />
              <span>Documents to Keep Ready for Counselling</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue-600 shrink-0" />
                <span>Class 10 Marksheet &amp; Passing Certificate</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue-600 shrink-0" />
                <span>Class 12 Marksheet (or Hall Ticket if awaiting)</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue-600 shrink-0" />
                <span>IEMJEE / WBJEE / JEE Main Rank Card</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue-600 shrink-0" />
                <span>Valid Government Photo ID (Aadhaar / Passport)</span>
              </div>
            </div>
          </div>

          {/* Venue Notice */}
          <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <strong>Admission Office Location:</strong>
              <p className="mt-0.5">
                Ashram Building, 1st Floor, GN-34/2, Sector – V, Saltlake Electronics Complex, Kolkata – 700091. Open Mon–Sat: 09:30 AM to 05:30 PM.
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <Link href="/" className="text-brandBlue-600 hover:underline font-semibold flex items-center gap-1">
              &larr; Return to Homepage
            </Link>
            <Link href="/courses" className="text-slate-600 hover:text-slate-900 font-medium">
              Explore All Engineering Branches &rarr;
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
