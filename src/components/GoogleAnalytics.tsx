'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { GA_MEASUREMENT_ID, pageview } from '@/lib/gtag';

const CONSENT_KEY = 'bengalcampus_consent_v1';

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const url = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
    pageview(url);
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      try {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.analytics === true) {
            setHasConsent(true);
            return;
          }
        }
      } catch {
        // Local storage inaccessible
      }
      setHasConsent(false);
    };

    checkConsent();

    const handleConsentUpdated = () => checkConsent();
    window.addEventListener('bengalcampus:consent-updated', handleConsentUpdated);
    return () => window.removeEventListener('bengalcampus:consent-updated', handleConsentUpdated);
  }, []);

  // Patch v1.1 §P5 (A3): Gate Google Analytics behind explicit DPDP consent
  if (!GA_MEASUREMENT_ID || !hasConsent) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
              anonymize_ip: true
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  );
}
