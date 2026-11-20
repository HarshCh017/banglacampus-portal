'use client';

import React from 'react';
import { Building2, Layers, ShieldCheck, Clock, Tag } from 'lucide-react';

const metrics = [
  {
    icon: Building2,
    number: '20 Verified',
    label: 'Top Institutions',
  },
  {
    icon: Layers,
    number: '50+',
    label: 'Branches Covered',
  },
  {
    icon: ShieldCheck,
    number: 'Verified',
    label: 'Official Sources',
  },
  {
    icon: Clock,
    number: 'WBJEE 2027',
    label: 'Data Updated',
  },
  {
    icon: Tag,
    number: '100% Free',
    label: 'Predictor & Compare',
  },
];

export function TrustMetricsStrip() {
  return (
    <section className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-[1240px] mx-auto"
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #dddddd',
            borderRadius: '9999px',
            padding: '0 32px',
          }}
          className="hidden lg:grid grid-cols-5 divide-x divide-[#dddddd] items-center"
        >
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="flex items-center gap-3 py-5 px-6">
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#EAF2FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon style={{ width: '18px', height: '18px', color: '#1455B8' }} />
                </div>
                <div>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#102A56', display: 'block', lineHeight: 1.2 }}>
                    {m.number}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 400, color: '#6a6a6a', display: 'block', marginTop: '2px' }}>
                    {m.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile/tablet: grid card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #dddddd',
            borderRadius: '16px',
          }}
          className="lg:hidden grid grid-cols-2 sm:grid-cols-3 divide-y divide-x divide-[#dddddd]"
        >
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-4"
                style={i === metrics.length - 1 && metrics.length % 2 !== 0 ? { gridColumn: 'span 2' } : {}}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#EAF2FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon style={{ width: '18px', height: '18px', color: '#1455B8' }} />
                </div>
                <div>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#102A56', display: 'block', lineHeight: 1.2 }}>
                    {m.number}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 400, color: '#6a6a6a', display: 'block', marginTop: '2px' }}>
                    {m.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustMetricsStrip;
