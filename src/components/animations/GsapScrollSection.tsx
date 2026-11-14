'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, Award, TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { DecryptedText } from '@/components/ui/react-bits/DecryptedText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MILESTONES = [
  {
    step: '01',
    title: 'AICTE & NIRF Verified Provenance',
    tagline: 'Zero Unofficial Data',
    description:
      'Every seat matrix, tuition fee schedule, and accreditation grade is linked directly to official regulatory gazettes with publication dates.',
    icon: ShieldCheck,
    metric: '100% Source Traced',
    color: 'from-emerald-500/20 to-emerald-950/40',
    borderColor: 'border-emerald-500/30',
    accent: 'text-emerald-400',
  },
  {
    step: '02',
    title: 'WBJEE Cutoff Directionality',
    tagline: 'Multi-Year Rank Progression',
    description:
      'Understand closing rank momentum across Round 1, Round 2, and Decentralized mop-ups for General, TFW, OBC, SC, and ST categories.',
    icon: TrendingUp,
    metric: '29 Verified Datasets',
    color: 'from-amber-500/20 to-amber-950/40',
    borderColor: 'border-amber-500/30',
    accent: 'text-amber-400',
  },
  {
    step: '03',
    title: 'Autonomous Institutional Intelligence',
    tagline: 'Affiliation & Governance Matrix',
    description:
      'Separate state-aided universities, MAKAUT-affiliated autonomous private institutes, and self-financed campuses with clear NIRF bands.',
    icon: Award,
    metric: '20 West Bengal Colleges',
    color: 'from-blue-500/20 to-blue-950/40',
    borderColor: 'border-blue-500/30',
    accent: 'text-blue-400',
  },
  {
    step: '04',
    title: 'Zero Brokerage & Zero Bias',
    tagline: 'Student-First Advisory',
    description:
      'Independent discovery engine designed to eliminate admission agency spam, deceptive marketing banners, and unverified placement promises.',
    icon: Sparkles,
    metric: '0 Paid Placements',
    color: 'from-purple-500/20 to-purple-950/40',
    borderColor: 'border-purple-500/30',
    accent: 'text-purple-400',
  },
];

export function GsapScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const cards = cardsRef.current?.querySelectorAll('.gsap-card');
      if (!cards || cards.length === 0) return;

      // Animate Section Heading
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      // Staggered Timeline Animation for Milestone Cards
      gsap.fromTo(
        cards,
        {
          y: 60,
          opacity: 0,
          scale: 0.96,
        },
        {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 0.8,
          },
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/5 bg-gradient-to-b from-canvas via-surface/40 to-canvas"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            GSAP & Lenis Synchronized Intelligence
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Built on Uncompromising <span className="text-emerald-400">Institutional Integrity</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
            Every cutoff rank, fee breakdown, and accreditation record on BengalCampus is audited for absolute
            fidelity against official regulatory repositories.
          </p>
        </div>

        {/* 4 Cards Grid with GSAP Scroll Trigger */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MILESTONES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`gsap-card group relative p-6 rounded-2xl bg-gradient-to-br ${item.color} border ${item.borderColor} backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-ink-faint">
                    {item.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-surface/80 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-5 h-5 ${item.accent}`} />
                  </div>
                </div>

                <div className="mb-2">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${item.accent}`}>
                    {item.tagline}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs font-mono font-medium text-ink-secondary">
                    <DecryptedText
                      text={item.metric}
                      speed={35}
                      animateOn="inViewHover"
                      className="font-semibold text-white"
                      encryptedClassName="text-emerald-400/70"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regulatory Link Callout */}
        <div className="mt-12 text-center">
          <Link
            href="/cutoffs"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors group"
          >
            <span>Explore all 29 official WBJEE cutoff distributions</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GsapScrollSection;
