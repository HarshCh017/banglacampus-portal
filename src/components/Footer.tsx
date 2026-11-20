'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  ShieldCheck,
  ArrowUp,
  ArrowRight,
} from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sources = [
    { name: 'AICTE Approvals', href: 'https://www.aicte-india.org', badge: 'Apex Technical Body' },
    { name: 'WBJEEB Seat Matrix', href: 'https://wbjeeb.nic.in', badge: 'Official Counselling' },
    { name: 'NIRF Engineering 2024', href: 'https://www.nirfindia.org', badge: 'MoE Ranking' },
    { name: 'NAAC Portal', href: 'https://www.naac.gov.in', badge: 'Institutional Grade' },
    { name: 'WBFSC Fee Circulars', href: '/methodology', badge: 'Audited Gazettes' },
  ];

  const linkStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 400,
    color: '#3f3f3f',
    textDecoration: 'none',
    transition: 'color 0.15s',
    display: 'block',
    lineHeight: '1.6',
  };

  const headStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 500,
    color: '#222222',
    marginBottom: '12px',
  };

  return (
    <footer
      id="site-footer"
      className="font-sans relative z-20"
      style={{
        background: '#ffffff',
        borderTop: '1px solid #dddddd',
        paddingTop: '48px',
        paddingBottom: '32px',
      }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main 4-Column Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          style={{ paddingBottom: '40px', borderBottom: '1px solid #dddddd' }}
        >

          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
              <div
                className="w-10 h-10 flex items-center justify-center transition-colors"
                style={{
                  background: '#102A56',
                  borderRadius: '10px',
                }}
              >
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3
                  className="font-heading leading-tight"
                  style={{ fontSize: '18px', fontWeight: 700, color: '#222222' }}
                >
                  Bengal<span style={{ color: '#102A56' }}>Campus</span>
                </h3>
                <p style={{ fontSize: '11px', color: '#6a6a6a', fontWeight: 400 }}>
                  West Bengal Engineering Intelligence
                </p>
              </div>
            </Link>

            <p style={{ fontSize: '13px', color: '#3f3f3f', lineHeight: '1.6' }}>
              Independent admissions intelligence for West Bengal B.Tech students. Auditing
              AICTE seat matrices, WBJEE cutoffs, and fee schedules from verified regulatory sources.
            </p>

            {/* Monospace Provenance Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'AICTE Audited',
                'WBJEEB Sourced',
                'Zero Commission',
                'DPDP 2023 Compliant',
              ].map((tag) => (
                <span
                  key={tag}
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    color: '#6a6a6a',
                    background: '#f7f7f7',
                    border: '1px solid #dddddd',
                    borderRadius: '6px',
                    padding: '3px 8px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Admissions Tools */}
          <div>
            <h4 style={headStyle}>Admissions Tools</h4>
            <ul className="space-y-2">
              {[
                { href: '/wbjee-predictor', label: 'WBJEE Rank Predictor 2027' },
                { href: '/counselling-simulator', label: 'Choice-Filling Strategy Simulator' },
                { href: '/compare', label: 'Side-by-Side Comparison Engine' },
                { href: '/cutoffs', label: 'WBJEE Opening & Closing Cutoffs' },
                { href: '/fee-calculator', label: 'B.Tech 4-Year Fee Calculator' },
                { href: '/counselling', label: 'Free 1-on-1 Guidance Helpdesk' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={linkStyle}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#102A56'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#3f3f3f'; }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Verified Colleges */}
          <div>
            <h4 style={headStyle}>Verified Colleges</h4>
            <ul className="space-y-2">
              {[
                { href: '/colleges/jadavpur-university-engineering', label: 'Jadavpur University (JU)', rank: '#101' },
                { href: '/colleges/iem-kolkata', label: 'IEM Kolkata (Salt Lake)', rank: '#104' },
                { href: '/colleges/heritage-institute-of-technology', label: 'Heritage Institute (HITK)', rank: '#108' },
                { href: '/colleges/kalyani-government-engineering-college', label: 'Kalyani Govt. Engg. College', rank: '#102' },
                { href: '/colleges/techno-main-salt-lake', label: 'Techno Main Salt Lake', rank: '#110' },
                { href: '/colleges/haldia-institute-of-technology', label: 'Haldia Institute (HIT-Haldia)', rank: '#105' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between"
                    style={linkStyle}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#102A56'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#3f3f3f'; }}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono" style={{ fontSize: '11px', color: '#6a6a6a' }}>{item.rank}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/colleges"
                  className="inline-flex items-center gap-1 font-semibold"
                  style={{ fontSize: '14px', color: '#102A56', textDecoration: 'none' }}
                >
                  <span>View All 20 Verified Colleges</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Regulatory Citations */}
          <div>
            <h4 style={headStyle}>Regulatory Citations</h4>
            <ul className="space-y-2">
              {sources.map((s, idx) => (
                <li key={idx}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-between"
                    style={linkStyle}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#102A56'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#3f3f3f'; }}
                  >
                    <span>{s.name}</span>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '10px',
                        color: '#6a6a6a',
                        background: '#f7f7f7',
                        border: '1px solid #dddddd',
                        borderRadius: '4px',
                        padding: '1px 5px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {s.badge}
                    </span>
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/methodology"
                  className="inline-flex items-center gap-1 font-semibold"
                  style={{ fontSize: '14px', color: '#102A56', textDecoration: 'none' }}
                >
                  <span>Audit Methodology Gazette</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Middle Compliance Notice */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-8"
          style={{
            background: '#f7f7f7',
            border: '1px solid #dddddd',
            borderRadius: '12px',
            padding: '16px 20px',
          }}
        >
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#0B7A62' }} />
            <div>
              <p className="font-semibold" style={{ fontSize: '13px', color: '#222222' }}>
                Independent Editorial Disclaimer &amp; Student Privacy Guarantee
              </p>
              <p className="mt-0.5 leading-relaxed" style={{ fontSize: '12px', color: '#6a6a6a' }}>
                BengalCampus is an independent research platform. We do not participate in college
                admission quotas, collect agent commissions, or operate commercial tie-ups. All student
                records are governed under the Digital Personal Data Protection (DPDP) Act 2023.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="shrink-0 flex items-center gap-1.5 cursor-pointer transition-colors"
            aria-label="Scroll to top of page"
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: '#3f3f3f',
              background: '#ffffff',
              border: '1px solid #dddddd',
              borderRadius: '8px',
              padding: '6px 14px',
            }}
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>

        {/* Bottom Legal Band */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6"
          style={{ borderTop: '1px solid #dddddd' }}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span style={{ fontSize: '13px', fontWeight: 400, color: '#6a6a6a' }}>
              &copy; 2027 BengalCampus. All rights reserved.
            </span>
            {[
              { href: '/privacy-policy', label: 'Privacy Policy' },
              { href: '/terms', label: 'Terms of Service' },
              { href: '/disclaimer', label: 'Disclaimer' },
              { href: '/cookie-policy', label: 'Cookie Policy' },
            ].map((item) => (
              <React.Fragment key={item.href}>
                <span className="hidden sm:inline" style={{ color: '#dddddd' }}>•</span>
                <Link
                  href={item.href}
                  style={{ fontSize: '13px', fontWeight: 400, color: '#6a6a6a', textDecoration: 'none' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#102A56'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#6a6a6a'; }}
                >
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-3" style={{ fontSize: '12px' }}>
            <Link
              href="/login"
              rel="nofollow"
              style={{ color: '#6a6a6a', textDecoration: 'none' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#3f3f3f'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#6a6a6a'; }}
            >
              Staff Portal
            </Link>
            <span style={{ color: '#dddddd' }}>•</span>
            <span style={{ color: '#6a6a6a' }}>WBJEE 2026–2027 Registry</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
