'use client';

import React from 'react';
import Link from 'next/link';
import { College } from '@/types/college';
import { useComparison } from '@/context/ComparisonContext';
import { MapPin, Award, CheckCircle2, Scale, ArrowRight, Shield, Building2 } from 'lucide-react';

interface CollegeCardProps {
  college: College;
}

export function CollegeCard({ college }: CollegeCardProps) {
  const { isInCompare, addToCompare, removeFromCompare, selectedSlugs, maxLimit } = useComparison();
  const inCompare = isInCompare(college.slug);
  const canAdd = selectedSlugs.length < maxLimit;

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCompare) {
      removeFromCompare(college.slug);
    } else {
      addToCompare(college.slug);
    }
  };

  const formatFee = () => {
    const { annualTuitionMin, annualTuitionMax } = college.feeStructure;
    if (annualTuitionMin === null || annualTuitionMax === null) {
      return 'Official fee notice pending';
    }
    if (annualTuitionMin === annualTuitionMax) {
      return `₹${annualTuitionMin.toLocaleString('en-IN')}/yr`;
    }
    return `₹${annualTuitionMin.toLocaleString('en-IN')} - ₹${annualTuitionMax.toLocaleString('en-IN')}/yr`;
  };

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div className="p-5 sm:p-6">
        {/* Badges strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Code: {college.wbjeebCode}
            </span>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                college.category === 'Government Engineering College' ||
                college.category === 'State University Faculty'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-blue-50 text-blue-800 border-blue-200'
              }`}
            >
              {college.category}
            </span>
          </div>

          {college.nirfRankEngineering2024 && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-600" />
              <span>
                {typeof college.nirfRankEngineering2024 === 'number'
                  ? `NIRF Rank #${college.nirfRankEngineering2024}`
                  : college.nirfRankEngineering2024}
              </span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
          <Link href={`/colleges/${college.slug}`} className="focus:outline-none focus:underline">
            {college.name}
          </Link>
        </h3>

        {/* Location & Affiliation */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mt-2">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              {college.city}, {college.district}
            </span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="truncate max-w-[220px]" title={college.affiliation}>
            {college.affiliation}
          </span>
        </div>

        {/* Overview excerpt */}
        <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
          {college.overview}
        </p>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <span className="text-[11px] text-slate-500 block mb-0.5 font-medium">Annual Tuition</span>
            <span className="font-bold text-slate-900 truncate block">{formatFee()}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <span className="text-[11px] text-slate-500 block mb-0.5 font-medium">NAAC & AICTE</span>
            <span className="font-bold text-slate-900 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{college.naacGrade ? `Grade '${college.naacGrade}'` : 'AICTE Approved'}</span>
            </span>
          </div>
        </div>

        {/* Programs chips */}
        <div className="mt-3.5">
          <span className="text-[11px] font-medium text-slate-400 block mb-1.5">
            Key Programs ({college.programs.length} total)
          </span>
          <div className="flex flex-wrap gap-1">
            {college.programs.slice(0, 4).map((p) => (
              <span
                key={p.slug}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
              >
                {p.name.replace('Engineering', 'Engg.').replace('Computer Science & Engg.', 'CSE')}
              </span>
            ))}
            {college.programs.length > 4 && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-slate-50 text-slate-500">
                +{college.programs.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleCompareClick}
          disabled={!inCompare && !canAdd}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
            inCompare
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : canAdd
              ? 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:text-emerald-700'
              : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
          }`}
          title={!inCompare && !canAdd ? 'Max 3 colleges reached in compare' : undefined}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>{inCompare ? 'Added to Compare' : 'Add to Compare'}</span>
        </button>

        <Link
          href={`/colleges/${college.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 p-1.5 transition-colors"
        >
          <span>Full Profile</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
