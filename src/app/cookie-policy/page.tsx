'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, Check, Trash2, RotateCcw } from 'lucide-react';

export default function CookiePolicyPage() {
  const [cleared, setCleared] = useState(false);

  const handleResetStorage = () => {
    try {
      localStorage.removeItem('banglacampus_compare_v1');
      localStorage.removeItem('banglacampus_consent_v1');
      setCleared(true);
      setTimeout(() => setCleared(false), 3000);
    } catch {
      // Storage access blocked
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <Cookie className="w-4 h-4 text-emerald-600" />
          <span>Local Storage & Cookie Disclosure</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
          Cookie & Local Storage Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last Updated: October 2026 · Transparent Client Storage
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold font-heading text-slate-900">1. How BanglaCampus Uses Storage</h2>
          <p>
            Unlike many commercial education portals that load hundreds of third-party advertising pixels and cross-site trackers, BanglaCampus relies primarily on <strong>HTML5 Local Storage</strong> strictly within your browser. We do not inject third-party marketing cookies or sell retargeting profiles to private coaching or admission agencies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold font-heading text-slate-900">2. Active Storage Keys on This Platform</h2>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-3 font-bold text-slate-900">Key Name</th>
                  <th className="p-3 font-bold text-slate-900">Storage Type</th>
                  <th className="p-3 font-bold text-slate-900">Duration</th>
                  <th className="p-3 font-bold text-slate-900">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-mono font-bold text-emerald-800">banglacampus_compare_v1</td>
                  <td className="p-3">HTML5 localStorage</td>
                  <td className="p-3">Persistent until cleared</td>
                  <td className="p-3 text-slate-600">
                    Saves your chosen college slugs (up to 3) so your comparison table persists as you navigate across directory pages.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-emerald-800">banglacampus_consent_v1</td>
                  <td className="p-3">HTML5 localStorage</td>
                  <td className="p-3">Persistent until cleared</td>
                  <td className="p-3 text-slate-600">
                    Records whether you accepted or declined optional performance telemetry in compliance with DPDP 2023.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-heading text-slate-900">3. Resetting Your Local Data</h2>
          <p>
            You have full control over your client data. Clicking the button below will immediately wipe all comparison slots and consent records stored by BanglaCampus on this browser:
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetStorage}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              {cleared ? <Check className="w-4 h-4 text-emerald-400" /> : <RotateCcw className="w-4 h-4" />}
              <span>{cleared ? 'Storage Reset Successfully' : 'Clear All BanglaCampus Local Data'}</span>
            </button>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold font-heading text-slate-900">4. Browser-Level Controls</h2>
          <p>
            You can also block or purge cookies and local storage through your browser settings:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Google Chrome: Settings $\to$ Privacy and security $\to$ Third-party cookies $\to$ See all site data.</li>
            <li>Mozilla Firefox: Settings $\to$ Privacy & Security $\to$ Cookies and Site Data.</li>
            <li>Apple Safari: Settings $\to$ Privacy $\to$ Manage Website Data.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
