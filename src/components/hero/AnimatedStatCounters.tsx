'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  durationMs?: number;
}

function CounterItem({ end, suffix = '', prefix = '', label, sublabel, durationMs = 1600 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, end, durationMs]);

  return (
    <div
      ref={itemRef}
      className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-canvas-raised border border-glass backdrop-blur-md shadow-elevated-card transition-all hover:border-trust/40 hover:shadow-glow-trust duration-300 group"
    >
      <div className="font-mono font-black text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 tabular-nums">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs sm:text-sm font-semibold text-ink-primary mt-1 text-center font-heading">
        {label}
      </div>
      {sublabel && (
        <div className="text-[11px] text-ink-muted text-center mt-0.5 font-medium">
          {sublabel}
        </div>
      )}
    </div>
  );
}

export function AnimatedStatCounters() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto w-full pt-4">
      <CounterItem
        end={20}
        label="Verified Institutions"
        sublabel="State, Govt & Autonomous"
      />
      <CounterItem
        end={100}
        suffix="%"
        label="Audited Citations"
        sublabel="AICTE & WBJEEB Provenance"
      />
      <CounterItem
        end={12}
        suffix="+"
        label="B.Tech Disciplines"
        sublabel="CSE, IT, ECE, EE & Core"
      />
      <CounterItem
        end={0}
        prefix="₹"
        label="Student Bias / Charge"
        sublabel="100% Free Public Guidance"
      />
    </div>
  );
}
