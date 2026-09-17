import React from 'react';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { SelfQualifier } from '@/components/SelfQualifier';
import { ProgramsGrid } from '@/components/ProgramsGrid';
import { AdmissionTimeline } from '@/components/AdmissionTimeline';
import { FeesSummary } from '@/components/FeesSummary';
import { PlacementsSummary } from '@/components/PlacementsSummary';
import { WhyIem } from '@/components/WhyIem';
import { CampusPreview } from '@/components/CampusPreview';
import { BranchFinder } from '@/components/BranchFinder';
import { GuideDownloadSection } from '@/components/GuideDownloadSection';
import { FaqSection } from '@/components/FaqSection';
import { FAQ_DATA } from '@/data/faqs';
import { ArrowRight, ShieldCheck, Phone } from 'lucide-react';

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1 & 2. Hero Section with 4-Field Lead Form */}
      <Hero />

      {/* 3. Verification & Accreditation Strip */}
      <TrustStrip />

      {/* 4. "Is I.E.M Right for You?" 3-Card Self-Qualifier */}
      <SelfQualifier />

      {/* 5. Approved B.Tech Programs Grid */}
      <ProgramsGrid />

      {/* 6. 3-Step Admission Process Timeline */}
      <AdmissionTimeline />

      {/* 7. Fees & Education Loan Support */}
      <FeesSummary />

      {/* 8. Placement Reality & Corporate Recruiters */}
      <PlacementsSummary />

      {/* 9. Why I.E.M — 4 Differentiators, each with a fact or number */}
      <WhyIem />

      {/* 10. Campus & Facilities Preview */}
      <CampusPreview />

      {/* 11. Interactive Branch Finder */}
      <BranchFinder />

      {/* 12. Guide & Syllabus Dossier Download (Light Gate) */}
      <GuideDownloadSection />

      {/* 13 & 14. Questions Students & Parents Ask (FAQ & FAQPage Schema) */}
      <FaqSection />

      {/* 15. Final Decision & Advisory CTA Banner */}
      <section className="bg-navy-900 text-white py-14 md:py-16 border-t border-navy-800 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-navy-700 text-xs text-brandTeal-500 font-semibold mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>2027–28 Academic Cycle Advisory</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white max-w-2xl mx-auto leading-tight">
            Ready to Take the Next Step in Your Engineering Career?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-xl mx-auto leading-relaxed">
            Submit your Class 12 percentage to check preliminary criteria or connect with an academic counsellor from the Ashram Campus.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <a
              href="#lead-form"
              className="w-full sm:w-auto min-h-[48px] py-3.5 px-6 sm:px-8 rounded-lg bg-brandBlue-600 hover:bg-brandBlue-500 active:scale-[0.98] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              <span>Get Admission Guidance</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="#lead-form"
              className="w-full sm:w-auto min-h-[48px] py-3.5 px-6 sm:px-8 rounded-lg bg-navy-800 hover:bg-navy-700 active:scale-[0.98] border border-navy-700 text-slate-200 font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-brandTeal-500" />
              <span>Admissions Desk: Request Callback</span>
            </a>
          </div>

          <p className="text-xs text-slate-400 mt-5">
            Sole Authorized Venue: Ashram Building, Sector V, Salt Lake, Kolkata. Zero registration fee for IEMJEE.
          </p>
        </div>
      </section>
    </>
  );
}
