'use client';

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUpRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show once scrolled past hero (e.g. 350px)
      setIsVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const scrollToForm = () => {
    trackEvent('counsellor_contact_clicked', { source_cta_id: 'mobile-sticky-get-guidance' });
    const el = document.getElementById('lead-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappMessage = encodeURIComponent('Hello, I am interested in B.Tech admission at IEM Kolkata. Please share verified branch and fee details.');

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    : '#lead-form';

  return (
    <aside
      aria-label="Quick contact bar"
      className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-8px_20px_rgba(0,0,0,0.08)] pt-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] px-3 sm:px-4 transition-all duration-200"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Request Callback Button */}
        <button
          type="button"
          onClick={() => {
            trackEvent('counsellor_contact_clicked', { source_cta_id: 'mobile-sticky-callback' });
            scrollToForm();
          }}
          className="flex-1 min-h-[44px] py-2 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 active:scale-[0.97] text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-200/60"
        >
          <Phone className="w-4 h-4 text-brandBlue-600 shrink-0" />
          <span className="truncate">Callback</span>
        </button>

        {/* WhatsApp Enquiry Button */}
        <a
          href={whatsappUrl}
          target={whatsappNumber ? '_blank' : '_self'}
          rel={whatsappNumber ? 'noopener noreferrer' : undefined}
          onClick={(e) => {
            trackEvent('whatsapp_enquiry_clicked', { source_cta_id: 'mobile-sticky-whatsapp' });
            if (!whatsappNumber) {
              e.preventDefault();
              scrollToForm();
            }
          }}
          className="flex-1 min-h-[44px] py-2 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-[0.97] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
        >
          <MessageCircle className="w-4 h-4 text-white shrink-0" />
          <span className="truncate">WhatsApp</span>
        </a>

        {/* Form Quick Scroll Button */}
        <button
          type="button"
          onClick={scrollToForm}
          className="flex-1.5 min-h-[44px] py-2 px-3 rounded-lg bg-brandBlue-600 hover:bg-brandBlue-500 active:scale-[0.97] text-white font-extrabold text-xs flex items-center justify-center gap-1 transition-all shadow-sm"
        >
          <span className="truncate">Get Guidance</span>
          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
        </button>
      </div>
    </aside>
  );
}
