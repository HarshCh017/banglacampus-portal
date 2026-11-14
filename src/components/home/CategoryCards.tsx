'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, Building2, Layers, ArrowRight, IndianRupee } from 'lucide-react';

export function CategoryCards() {
  const categories = [
    {
      title: 'State Universities',
      description: 'Government-funded universities with diverse engineering programs.',
      examples: 'e.g. Jadavpur, Kalyani',
      feeRange: '₹10,000 – ₹60,000 / year',
      href: '/colleges?type=university',
      image: '/images/colleges/jadavpur-university-engineering.jpg',
      icon: GraduationCap,
      bgGradient: 'bg-gradient-to-br from-[#EAF2FE] to-[#DCEBFE] border-[#BFDBFE]',
      iconColor: 'text-[#1455B8]',
      badgeColor: 'text-[#1455B8] bg-white/90 border-[#BFDBFE]',
      btnHover: 'hover:bg-[#1455B8] hover:text-white',
    },
    {
      title: 'Government Colleges',
      description: 'Premier government institutions with affordable fees and strong reputation.',
      examples: 'e.g. Kalyani Govt., Jalpaiguri Govt.',
      feeRange: '₹9,000 – ₹70,000 / year',
      href: '/colleges?type=government',
      image: '/images/colleges/kalyani-government-engineering-college.jpg',
      icon: Building2,
      bgGradient: 'bg-gradient-to-br from-[#FFF9EE] to-[#FEF0D5] border-[#FDE68A]',
      iconColor: 'text-[#D97706]',
      badgeColor: 'text-[#D97706] bg-white/90 border-[#FDE68A]',
      btnHover: 'hover:bg-[#D97706] hover:text-white',
    },
    {
      title: 'Autonomous / Private Colleges',
      description: 'Industry-focused programs with modern infrastructure and wider branch options.',
      examples: 'e.g. IEM, Techno, Heritage',
      feeRange: '₹1,00,000 – ₹2,50,000 / year',
      href: '/colleges?type=private',
      image: '/images/colleges/iem-kolkata.jpg',
      icon: Layers,
      bgGradient: 'bg-gradient-to-br from-[#F5F1FD] to-[#ECE5FA] border-[#DDD6FE]',
      iconColor: 'text-[#7C3AED]',
      badgeColor: 'text-[#7C3AED] bg-white/90 border-[#DDD6FE]',
      btnHover: 'hover:bg-[#7C3AED] hover:text-white',
    },
  ];

  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8">
      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#102A56] tracking-tight">
          Explore Engineering Colleges in <span className="text-[#1455B8]">West Bengal</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-2 leading-relaxed">
          Find the right type of institution based on your goals, budget and preferences.
        </p>
      </div>

      {/* 3 Distinct Image-Led Colored Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className={`rounded-3xl border ${cat.bgGradient} p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group`}
            >
              {/* Upper Portion: Campus Thumbnail + Details */}
              <div className="flex items-start gap-4">
                {/* Rounded Campus Thumbnail */}
                <div className="relative w-24 sm:w-28 h-32 sm:h-36 rounded-2xl overflow-hidden shrink-0 shadow-xs border border-white/60">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 112px, 128px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Right Details */}
                <div className="flex-1 min-w-0">
                  {/* Category Icon */}
                  <div className="w-9 h-9 rounded-xl bg-white/90 text-slate-800 flex items-center justify-center shadow-xs">
                    <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-heading font-bold text-[#102A56] mt-2 group-hover:text-[#1455B8] transition-colors leading-tight">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#64748B] mt-1 line-clamp-2 leading-relaxed font-sans">
                    {cat.description}
                  </p>

                  {/* Examples */}
                  <p className="text-[11px] font-medium text-slate-500 mt-2">
                    {cat.examples}
                  </p>
                </div>
              </div>

              {/* Lower Portion: Fee Pill + Circular Action Arrow */}
              <div className="flex items-center justify-between pt-4 mt-3 border-t border-black/5">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold shadow-xs ${cat.badgeColor}`}>
                  <IndianRupee className="w-3 h-3" />
                  <span>{cat.feeRange}</span>
                </span>

                <Link
                  href={cat.href}
                  className={`w-9 h-9 rounded-full bg-white text-[#102A56] flex items-center justify-center transition-all duration-200 shadow-xs ${cat.btnHover}`}
                  aria-label={`Browse ${cat.title}`}
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryCards;
