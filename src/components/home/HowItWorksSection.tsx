'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  Layers,
  Scale,
  ShieldCheck,
} from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Enter WBJEE Rank',
      subtitle: 'General Merit Rank (GMR)',
      desc: 'Input your declared or expected WBJEE GMR score. No phone number or registration required to explore.',
      icon: Sparkles,
    },
    {
      num: '02',
      title: 'Set Category & Stream',
      subtitle: 'Quota & Branch Filters',
      desc: 'Filter by General, TFW, SC, ST, or OBC, and select preferred engineering disciplines like CSE, IT, or ECE.',
      icon: SlidersHorizontal,
    },
    {
      num: '03',
      title: 'Explore Decision Tiers',
      subtitle: 'Safe, Realistic & Ambitious',
      desc: 'Benchmark your rank against verified Round 1, Round 2, and decentralized closing ranks across 3 years.',
      icon: Layers,
    },
    {
      num: '04',
      title: 'Compare & Shortlist',
      subtitle: 'Side-by-Side Matrix',
      desc: 'Pin up to 3 colleges side-by-side to compare audited tuition fees, hostel costs, and NBA accreditations.',
      icon: Scale,
    },
  ];

  const tiers = [
    {
      name: 'Safe Matches',
      rule: 'Historical Closing Rank > 1.25× Your Rank',
      desc: 'Institutions where historical closing ranks have comfortably exceeded your merit score in Round 1 & Round 2.',
      badge: 'High Historical Alignment',
    },
    {
      name: 'Realistic Targets',
      rule: 'Historical Closing Rank Within 10–15% of Your Rank',
      desc: 'Colleges closely matching your rank trajectory across recent admission rounds. High conversion probability.',
      badge: 'Balanced Target',
    },
    {
      name: 'Ambitious Reaches',
      rule: 'Historical Closing Rank < Your Rank',
      desc: 'Aspirational colleges requiring upward rank movement or decentralized mop-up vacancy shifts.',
      badge: 'Upward Reach',
    },
  ];

  return (
    <section
      style={{
        paddingTop: 64,
        paddingBottom: 64,
        background: '#ffffff',
        borderTop: '1px solid #dddddd',
      }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div style={{ maxWidth: 560, marginBottom: 48 }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              color: '#6a6a6a',
              marginBottom: 10,
            }}
          >
            Transparent Methodology
          </span>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: '#222222',
              lineHeight: 1.3,
              marginBottom: 8,
            }}
          >
            How the WBJEE Predictor Works
          </h2>
          <p style={{ fontSize: 14, color: '#6a6a6a', lineHeight: 1.6 }}>
            We trace 3 consecutive years of official WBJEEB centralized counseling data to help you build a structured, realistic choice-filling list.
          </p>
        </div>

        {/* 4 Step Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ marginBottom: 40 }}>
          {steps.map((st, sIdx) => {
            const Icon = st.icon;
            return (
              <div
                key={sIdx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #dddddd',
                  borderRadius: 14,
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    'rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.1) 0 4px 8px';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Step number + icon row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: 48,
                      fontWeight: 700,
                      color: '#dddddd',
                      lineHeight: 1,
                    }}
                  >
                    {st.num}
                  </span>
                  {/* Icon circle */}
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 9999,
                      background: '#f7f7f7',
                      border: '1px solid #dddddd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon style={{ width: 20, height: 20, color: '#102A56' }} />
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#222222', marginBottom: 2 }}>
                    {st.title}
                  </h3>
                  <span style={{ fontSize: 12, fontWeight: 500, color: '#6a6a6a', display: 'block', marginBottom: 6 }}>
                    {st.subtitle}
                  </span>
                  <p style={{ fontSize: 14, fontWeight: 400, color: '#6a6a6a', lineHeight: 1.6 }}>
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Decision Tiers — 3-col white grid */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #dddddd',
            borderRadius: 14,
            padding: '28px 28px',
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#222222', marginBottom: 4 }}>
              Deterministic Choice-Filling Tiers
            </h3>
            <p style={{ fontSize: 14, color: '#6a6a6a' }}>
              Every college is classified using historical cutoff statistics — never arbitrary percentages or speculative &quot;chances&quot;.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tiers.map((t, tIdx) => (
              <div
                key={tIdx}
                style={{
                  background: '#f7f7f7',
                  borderRadius: 10,
                  padding: '18px 16px',
                  border: '1px solid #dddddd',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: '#222222' }}>{t.name}</h4>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: 9999,
                      background: '#ffffff',
                      border: '1px solid #dddddd',
                      color: '#3f3f3f',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {t.badge}
                  </span>
                </div>
                <p style={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 600, color: '#6a6a6a' }}>
                  {t.rule}
                </p>
                <p style={{ fontSize: 13, color: '#6a6a6a', lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: '1px solid #dddddd',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6a6a6a' }}>
              <ShieldCheck style={{ width: 15, height: 15, color: '#0F8B70', flexShrink: 0 }} />
              <span>Sourced directly from WBJEEB e-counselling archives (2024–2026).</span>
            </div>

            <Link
              href="/wbjee-predictor"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 13,
                fontWeight: 500,
                color: '#102A56',
                flexShrink: 0,
              }}
            >
              <span>Test the Predictor with Your Rank</span>
              <ArrowRight style={{ width: 13, height: 13 }} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
