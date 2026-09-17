import React from 'react';
import { Briefcase, Building2, TrendingUp, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export function PlacementsSummary() {
  const recruiters = [
    'Tata Consultancy Services (TCS)',
    'Cognizant Technology Solutions',
    'Wipro Technologies',
    'Capgemini India',
    'PricewaterhouseCoopers (PwC)',
    'Infosys',
    'Mindtree',
    'LTI Mindtree',
    'Tech Mahindra',
    'Persistent Systems',
    'Ericsson',
    'Deloitte',
  ];

  return (
    <section id="placements" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-2">
            Career Outcomes &amp; Verification
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Placement Reality &amp; Industry Recruiters
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Verifiable placement records. We present verified domestic medians rather than unverified superlatives.
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase">Typical Median Salary</div>
            <div className="text-3xl font-extrabold text-brandBlue-600 font-heading mt-1">
              ₹5.5 – ₹7.2 LPA
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Based on NIRF verified institutional submissions for engineering cohorts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase">Regular Tech Recruiters</div>
            <div className="text-3xl font-extrabold text-navy-900 font-heading mt-1">
              150+ Companies
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Participating annually across campus drives &amp; pool recruitment drives.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase">Sector V Advantage</div>
            <div className="text-3xl font-extrabold text-emerald-600 font-heading mt-1">
              Kolkata IT Hub
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Located adjacent to major IT parks and corporate delivery centers.
            </p>
          </div>
        </div>

        {/* Recruiters Strip */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 text-center">
            Prominent Companies Recruiting from IEM Engineering Programs
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
            {recruiters.map((r, i) => (
              <div
                key={i}
                className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700 flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-brandBlue-600 shrink-0" />
                <span className="text-[11px] sm:text-xs font-medium text-slate-800 leading-tight line-clamp-2">{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Placement Transparency Callout */}
        <div className="p-4 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Outcome Transparency Policy:</strong>
            <p className="mt-0.5 text-slate-600">
              In strict adherence to consumer protection rules and Red Line standards, I.E.M does not guarantee employment or claim 100% placement. Placement offers depend on individual student academic performance, technical skills, aptitude assessments, and prevailing corporate hiring conditions. Peak individual packages (e.g. specialized international or off-campus product roles) represent individual student achievements and are not typical cohort medians.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
