'use client';

import React, { useState } from 'react';
import { Languages } from 'lucide-react';

export function BengaliToggle() {
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'bn' : 'en';
    setLang(nextLang);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bengalcampus:language-change', { detail: { lang: nextLang } }));
    }
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label="Toggle language between English and Bengali"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.08)] text-[#9DB0A8] hover:text-[#ECF4F0] transition-colors cursor-pointer"
      title="Scaffolding for English / বাংলা translation"
    >
      <Languages className="w-3.5 h-3.5 text-[#10B981]" />
      <span className="font-mono text-[11px] font-semibold">
        {lang === 'en' ? 'EN' : 'বাং'}
      </span>
    </button>
  );
}
