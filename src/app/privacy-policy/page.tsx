import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, AlertCircle, Lock, Database, Clock, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy (DPDP Act 2023 Alignment) | BanglaCampus',
  description:
    'Draft privacy policy and data protection disclosure for BanglaCampus under India Digital Personal Data Protection Act 2023.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Statutory Data Protection Disclosure</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last Updated: October 2026 · Version 1.0 (Pre-Launch Legal Draft)
        </p>
      </div>

      {/* Pre-launch Legal Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-950">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Notice of Draft Status & Unresolved Entity Incorporation</span>
        </div>
        <p className="leading-relaxed">
          This Privacy Policy is a draft operational standard prepared for the pre-launch phase of BanglaCampus. It reflects our actual data processing practices aligned with India&apos;s Digital Personal Data Protection (DPDP) Act 2023. Formal corporate registration details and designated Grievance Officer appointments will be updated upon final institutional incorporation prior to full commercial rollout.
        </p>
      </div>

      {/* Policy Content */}
      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold font-heading text-slate-900">1. Data Minimization & Collection Scope</h2>
          <p>
            BanglaCampus operates on a strict data-minimization philosophy. You can browse our complete West Bengal engineering college directory, search cutoffs, inspect field citations, and compare institutions without creating an account or providing any personal identifying data.
          </p>
          <p>We collect personal information only when you affirmatively provide it through voluntary actions:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>General Enquiries & Error Reports:</strong> Full name, email address, topic, and message details submitted via our contact form.
            </li>
            <li>
              <strong>Student College Preference Enquiry:</strong> When you submit the &ldquo;Find the Right Engineering College for You&rdquo; enquiry modal, we collect your full name, Class 10 percentage, Class 12 percentage, State / Union Territory, preferred engineering college, and preferred engineering branch.
            </li>
            <li>
              <strong>Admission Digest / Newsletter:</strong> Email address and affirmative opt-in consent record.
            </li>
            <li>
              <strong>IEM Direct Lead Pathway:</strong> In cases where a student specifically requests an acquisition callback for the Institute of Engineering & Management (IEM), Kolkata, four fields (name, phone, class 12 percentage, preferred branch) are processed through the authorized IEM intake engine.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-heading text-slate-900">2. Local Browser Storage vs Cookies</h2>
          <p>
            BanglaCampus does not use third-party behavioral advertising cookies. We use browser <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">localStorage</code> exclusively for client-side utility:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <code className="bg-slate-100 px-1 py-0.5 rounded">banglacampus_compare_v1</code>: Stores up to three college slugs to power your side-by-side comparison matrix across page visits.
            </li>
            <li>
              <code className="bg-slate-100 px-1 py-0.5 rounded">banglacampus_consent_v1</code>: Stores your cookie and telemetry consent decision.
            </li>
          </ul>
          <p>
            You can clear these items at any time through your browser settings or via our <Link href="/cookie-policy" className="text-emerald-700 underline">Cookie Policy</Link>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-heading text-slate-900">3. Purpose of Processing & Legal Basis</h2>
          <p>
            Under the DPDP Act 2023, data is processed strictly based on your **affirmative consent** for specified legitimate purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Responding directly to factual error reports and admission queries.</li>
            <li>Delivering the requested monthly admission alerts.</li>
            <li>Mitigating spam, DDoS attacks, and unauthorized automated scraping via IP rate limiting and bot honeypots.</li>
          </ul>
          <p>
            We strictly do not sell, rent, or trade applicant lists to third-party commercial tutoring centers, non-accredited private colleges, or lead aggregators.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-heading text-slate-900">4. Data Retention, Google Sheets Integration &amp; Security Safeguards</h2>
          <p>
            In accordance with data security standards, student enquiry preferences are transmitted over encrypted HTTPS to our dedicated Google Sheets integration (<code className="bg-slate-100 px-1 py-0.5 rounded">Student Enquiries</code> worksheet) and verified against our local server store. Spreadsheet cells undergo rigorous formula-injection sanitization to prevent unauthorized formula execution. Access to the connected spreadsheet is strictly limited to authorized academic research and counselling personnel.
          </p>
          <p>
            Contact queries are retained for no longer than 180 days to resolve questions, after which they are purged. Furthermore, our server architecture deliberately suppresses raw message bodies and personal percentages from public operational logs to protect privacy.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-heading text-slate-900">5. Your Statutory Rights</h2>
          <p>
            Under applicable data protection frameworks including the DPDP Act 2023, you have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Request a summary of personal data processed by BanglaCampus.</li>
            <li>Request correction of inaccurate or outdated contact information.</li>
            <li>Withdraw consent and request erasure of your subscription or enquiry record.</li>
            <li>Nominate another individual in the event of death or incapacity.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-heading text-slate-900">6. Privacy Inquiries & Grievance Contact</h2>
          <p>
            To exercise your data protection rights or request record removal, please email:
          </p>
          <p className="p-3 rounded-xl bg-slate-100 font-mono text-xs text-slate-900">
            Email: privacy@banglacampus.in / contact@banglacampus.in<br />
            Attention: Data Protection Review Desk<br />
            Desk Location: Salt Lake Sector V, Kolkata - 700091, West Bengal
          </p>
        </section>
      </div>
    </div>
  );
}
