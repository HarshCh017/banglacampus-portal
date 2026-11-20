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
    },
    {
      title: 'Government Colleges',
      description: 'Premier government institutions with affordable fees and strong reputation.',
      examples: 'e.g. Kalyani Govt., Jalpaiguri Govt.',
      feeRange: '₹9,000 – ₹70,000 / year',
      href: '/colleges?type=government',
      image: '/images/colleges/kalyani-government-engineering-college.jpg',
      icon: Building2,
    },
    {
      title: 'Autonomous / Private Colleges',
      description: 'Industry-focused programs with modern infrastructure and wider branch options.',
      examples: 'e.g. IEM, Techno, Heritage',
      feeRange: '₹1,00,000 – ₹2,50,000 / year',
      href: '/colleges?type=private',
      image: '/images/colleges/iem-kolkata.jpg',
      icon: Layers,
    },
  ];

  return (
    <section
      style={{
        maxWidth: 1240,
        margin: '0 auto',
        padding: '64px 24px 32px',
      }}
      className="px-4 sm:px-6 lg:px-8"
    >
      {/* Section Heading */}
      <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 40px' }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: '#222222',
            lineHeight: 1.3,
            marginBottom: 8,
          }}
        >
          Explore Engineering Colleges in West Bengal
        </h2>
        <p style={{ fontSize: 14, color: '#6a6a6a', lineHeight: 1.6 }}>
          Find the right type of institution based on your goals, budget and preferences.
        </p>
      </div>

      {/* 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <Link
              key={idx}
              href={cat.href}
              aria-label={`Browse ${cat.title}`}
              style={{
                borderRadius: 14,
                border: '1px solid #dddddd',
                background: '#f7f7f7',
                padding: '20px 20px 16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'box-shadow 0.2s, transform 0.2s',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              className="group hover:border-[#102A56]/30"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  'rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.1) 0 4px 8px';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Upper: thumbnail + text */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                {/* Thumbnail */}
                <div
                  style={{
                    position: 'relative',
                    width: 96,
                    height: 128,
                    borderRadius: 10,
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid #dddddd',
                  }}
                >
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="96px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Icon circle */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9999,
                      background: '#ffffff',
                      border: '1px solid #dddddd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 10,
                    }}
                  >
                    <Icon style={{ width: 18, height: 18, color: '#102A56' }} />
                  </div>

                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#222222',
                      lineHeight: 1.3,
                      marginBottom: 4,
                    }}
                    className="group-hover:text-[#102A56] transition-colors"
                  >
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: 13, color: '#6a6a6a', lineHeight: 1.5, marginBottom: 4 }}>
                    {cat.description}
                  </p>
                  <p style={{ fontSize: 12, color: '#6a6a6a' }}>{cat.examples}</p>
                </div>
              </div>

              {/* Lower: fee pill + arrow */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 14,
                  marginTop: 14,
                  borderTop: '1px solid #dddddd',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '4px 12px',
                    borderRadius: 9999,
                    background: '#ffffff',
                    border: '1px solid #dddddd',
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#3f3f3f',
                  }}
                >
                  <IndianRupee style={{ width: 11, height: 11 }} />
                  <span>{cat.feeRange}</span>
                </span>

                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9999,
                    background: '#102A56',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'opacity 0.15s, transform 0.15s',
                  }}
                  className="group-hover:scale-105"
                >
                  <ArrowRight style={{ width: 15, height: 15 }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryCards;
