'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Sparkles, X, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface FloatingConsultationButtonProps {
  className?: string;
}

export function FloatingConsultationButton({ className = '' }: FloatingConsultationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-hide when the site footer is in view so it NEVER overlaps footer links
  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleOpenConsultation = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bengalcampus:open-enquiry'));
    }
  };

  return (
    <aside
      aria-label="Student guidance and consultation desk"
      className={`fixed bottom-6 right-6 z-40 flex flex-col items-end transition-all duration-300 ${
        isFooterVisible ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      } ${className}`}
    >
      {/* Expanded Quick Action Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-80 rounded-2xl bg-[#0B1210] border border-[rgba(255,255,255,0.12)] p-4 shadow-2xl shadow-black/80 text-[#ECF4F0] space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-xs font-serif font-bold text-[#ECF4F0]">
                  BengalCampus Helpdesk
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close panel"
                className="p-1 rounded-lg text-[#9DB0A8] hover:text-[#ECF4F0] hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-[#9DB0A8] leading-relaxed">
              100% free WBJEE admission and choice preference assistance with zero agent commission or college steering.
            </p>

            <div className="space-y-2 pt-1">
              {/* Option 1: Full Counselling Consultation Modal */}
              <button
                type="button"
                onClick={handleOpenConsultation}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[rgba(16,185,129,0.12)] hover:bg-[rgba(16,185,129,0.20)] border border-[rgba(16,185,129,0.3)] text-[#10B981] text-xs font-semibold transition-colors cursor-pointer group text-left"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F5B942]" />
                  <span>Request 1-on-1 Guidance</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Option 2: Direct Provenance / Contact */}
              <a
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#111C18] hover:bg-[#182722] border border-[rgba(255,255,255,0.08)] text-[#9DB0A8] hover:text-[#ECF4F0] text-xs transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#60A5FA]" />
                  <span>Report Data Error / Audit</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-1.5 text-[10px] text-[#60726A]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              <span>DPDP Act 2023 Compliant · Zero Spam</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Bottom-Right Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Open counseling and support options"
        className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#0B1210] hover:bg-[#111C18] text-[#ECF4F0] border border-[rgba(255,255,255,0.12)] hover:border-[#10B981]/50 shadow-2xl shadow-black/80 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
      >
        {/* Subtle Ambient Mint Hover Glow */}
        <div className="absolute inset-0 rounded-full bg-[#10B981]/15 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Live Active Pill Indicator */}
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-60" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981] border-2 border-[#0B1210]" />
        </span>

        {isOpen ? (
          <X className="w-5 h-5 text-[#ECF4F0]" />
        ) : (
          <MessageSquare className="w-5 h-5 text-[#9DB0A8] group-hover:text-[#10B981] transition-colors" />
        )}
      </button>
    </aside>
  );
}
