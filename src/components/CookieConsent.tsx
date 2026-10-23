'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, Check } from 'lucide-react';
import Link from 'next/link';

const CONSENT_KEY = 'banglacampus_consent_v1';

export interface ConsentPreferences {
  essential: boolean; // Always true
  analytics: boolean;
  version: string;
  decidedAt: string;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        setIsVisible(true);
      } else {
        const parsed = JSON.parse(stored) as ConsentPreferences;
        if (parsed.version !== 'v1.0') {
          setIsVisible(true);
        } else {
          setAnalyticsEnabled(parsed.analytics);
        }
      }
    } catch {
      // Local storage disabled or error
    }
  }, []);

  const saveConsent = (allowAnalytics: boolean) => {
    const preferences: ConsentPreferences = {
      essential: true,
      analytics: allowAnalytics,
      version: 'v1.0',
      decidedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences));
    } catch {
      // Ignore
    }
    setAnalyticsEnabled(allowAnalytics);
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent Banner"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-800 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-emerald-900/60 text-emerald-400 mt-1 shrink-0">
            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="text-sm text-slate-300">
            <p className="font-semibold text-white mb-1">
              Your Privacy & Transparent Data Practice
            </p>
            <p>
              BanglaCampus stores your college comparison list locally in your browser and strictly avoids third-party advertising trackers. We require your explicit consent under the Digital Personal Data Protection (DPDP) Act 2023 for any optional performance telemetry.{' '}
              <Link href="/cookie-policy" className="text-emerald-400 underline hover:text-emerald-300">
                Read Cookie & Storage Policy
              </Link>.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={() => setShowPreferences(true)}
            className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            Preferences
          </button>
          <button
            type="button"
            onClick={() => saveConsent(false)}
            className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            Essential Only (Decline Optional)
          </button>
          <button
            type="button"
            onClick={() => saveConsent(true)}
            className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Accept All
          </button>
        </div>
      </div>

      {showPreferences && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pref-dialog-title"
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-lg w-full text-slate-200 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowPreferences(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md"
              aria-label="Close preferences dialog"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 id="pref-dialog-title" className="text-lg font-bold text-white mb-3">
              Consent Preferences
            </h3>
            <div className="space-y-4 text-sm mb-6">
              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white">Strictly Essential Storage</span>
                  <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
                    Always Active
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Required to remember your side-by-side college comparison selections and privacy consent choices. Cannot be turned off.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="analytics-opt" className="font-semibold text-white cursor-pointer">
                    Optional Anonymous Telemetry
                  </label>
                  <input
                    id="analytics-opt"
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded bg-slate-900 border-slate-700 focus:ring-emerald-500"
                  />
                </div>
                <p className="text-xs text-slate-400">
                  Anonymous usage aggregation to identify broken search filters and improve college discovery. No advertising or personal tracking.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => saveConsent(analyticsEnabled)}
                className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
