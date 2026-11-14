'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

interface TaglineRevealProps {
  phrase?: string;
  subtext?: string;
}

export function TaglineReveal({
  phrase = 'Truth in admissions. Every cutoff cited, every fee verified, with zero agent bias.',
  subtext = 'Built for students and parents navigating West Bengal engineering admissions without the guesswork.',
}: TaglineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeWords, setActiveWords] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const words = useMemo(() => phrase.split(' '), [phrase]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveWords(words.length);
      return;
    }

    const timeouts: NodeJS.Timeout[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            words.forEach((_, index) => {
              const timer = setTimeout(() => {
                setActiveWords((prev) => Math.max(prev, index + 1));
              }, index * 60);
              timeouts.push(timer);
            });
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, [words, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      aria-label="Core mission statement"
      className="relative w-full py-20 sm:py-28 bg-[#09090B] border-y border-[#27272A] text-[#FAFAFA] overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-white/10 text-[#10B981] text-xs font-semibold shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span>Independent Educational Standard</span>
        </div>

        {/* Clean Word-Spaced Serif Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight leading-tight max-w-[720px] mx-auto text-balance">
          {words.map((word, index) => {
            const isRevealed = prefersReducedMotion || index < activeWords;
            return (
              <span
                key={`${word}-${index}`}
                className={`inline-block mr-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isRevealed
                    ? 'text-[#FAFAFA] opacity-100 translate-y-0'
                    : 'text-[#71717A] opacity-25 translate-y-1'
                }`}
              >
                {word}
              </span>
            );
          })}
        </h2>

        {/* Comfortable line-height body text */}
        <p className="text-base sm:text-lg text-[#A1A1AA] max-w-[680px] mx-auto leading-relaxed font-sans text-pretty">
          {subtext}
        </p>
      </div>
    </section>
  );
}
