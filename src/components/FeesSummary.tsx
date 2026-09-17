import React from 'react';
import { CreditCard, Landmark, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

export function FeesSummary() {
  return (
    <section id="fees" className="py-16 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brandBlue-100 text-brandBlue-700 text-xs font-semibold uppercase tracking-wider mb-2">
            Financial Transparency
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            B.Tech Fee Structure &amp; Education Loan Assistance
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Clear financial estimates based on verified circulars, with institutional bank loan documentation support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Fee Structure Breakdown (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-xl p-4 sm:p-6 sm:p-7 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1 font-heading">
              Estimated 4-Year B.Tech Tuition Schedule
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Autonomous curriculum under MAKAUT · Tuition fees payable semester-wise.
            </p>

            <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[460px] text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100 text-slate-700 font-semibold">
                    <th className="py-2.5 px-3">Component / Installment</th>
                    <th className="py-2.5 px-3 text-right">Published Estimated Range</th>
                    <th className="py-2.5 px-3">Payment Window</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="py-2.5 px-3 font-medium">1st Semester (Admission &amp; Course Fee)</td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-900">
                      ₹98,700 – ₹1,40,000*
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">At time of admission</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">2nd to 8th Semester (Per Semester)</td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-900">
                      ₹75,000 – ₹1,15,000*
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">Before semester start</td>
                  </tr>
                  <tr className="bg-slate-100/70 font-bold text-slate-900">
                    <td className="py-2.5 px-3">Total Estimated 4-Year Tuition</td>
                    <td className="py-2.5 px-3 text-right font-mono text-brandBlue-700 font-extrabold text-sm">
                      ~₹6.23L – ₹9.45L*
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">8 Semesters</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Preserved Conflict Disclaimer */}
            <div className="mt-4 p-3 rounded-md bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>*Source &amp; Demand Notice Qualification:</strong>
                <p className="mt-0.5">
                  Semester fee circulars vary between historical MAKAUT approvals and autonomous specializations. Specific fee challans are generated individually via the official portal (<code>iemcrp.com</code>). Contact our counselling team for the official 2027 demand letter.
                </p>
              </div>
            </div>

            {/* Miscellaneous One-Time items */}
            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-1">
              <p>• <strong>Uniform &amp; Kit:</strong> ₹6,500 (one-time upon entry)</p>
              <p>• <strong>Medical Fitness Record:</strong> ₹1,000 (one-time)</p>
              <p>• <strong>Hostel Facilities:</strong> Available separately for outstation students (optional).</p>
            </div>
          </div>

          {/* Right: Education Loans & Merit Scholarships (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Bank Loan Assistance */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    Education Loan Demand Letters
                  </h3>
                  <p className="text-xs text-slate-500">Institutional Bank Documentation</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The Accounts Department issues formal Demand Estimate Letters to facilitate education loans with nationalized and private banks (SBI, IOB, HDFC, Punjab National Bank).
              </p>
              <div className="mt-3 p-2.5 bg-slate-50 rounded text-[11px] text-slate-600 font-mono space-y-0.5">
                <div>Bank Partner: Indian Overseas Bank</div>
                <div>Payee: Institute of Engineering &amp; Management Trust</div>
                <div>IFSC: IOBA0001642</div>
              </div>
            </div>

            {/* Merit Scholarships */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-md bg-brandBlue-100 text-brandBlue-700 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    Merit Scholarships &amp; Fee Waivers
                  </h3>
                  <p className="text-xs text-slate-500">Subject to Verification</p>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-brandBlue-600 shrink-0 mt-0.5" />
                  <span><strong>WBJEE Rank 1–1000:</strong> 100% Tuition Fee Waiver</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-brandBlue-600 shrink-0 mt-0.5" />
                  <span><strong>JEE Main Rank 1–10,000:</strong> 100% Tuition Fee Waiver</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-brandBlue-600 shrink-0 mt-0.5" />
                  <span><strong>Board Merit:</strong> Partial waivers for high 10+2 percentile</span>
                </li>
              </ul>
            </div>

            {/* CTA Trigger */}
            <a
              href="#lead-form"
              className="w-full py-3 px-4 rounded-md bg-brandBlue-600 hover:bg-brandBlue-500 text-white font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Get Fee &amp; Scholarship Guidance</span>
              <ArrowRight className="w-4 h-4" />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
