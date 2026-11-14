'use client';

import React from 'react';
import Link from 'next/link';

interface ShimmerButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'gold' | 'emerald' | 'glass';
}

export function ShimmerButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'gold',
}: ShimmerButtonProps) {
  const variantStyles = {
    gold: 'bg-gradient-to-r from-[#F5B942] via-[#F59E0B] to-[#F5B942] text-slate-950 font-bold shadow-gold-glow hover:brightness-105 active:scale-[0.98]',
    emerald: 'bg-gradient-to-r from-[#10B981] via-[#059669] to-[#10B981] text-slate-950 font-bold shadow-emerald-glow hover:brightness-105 active:scale-[0.98]',
    glass: 'bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.10)] text-[#ECF4F0] border border-[rgba(255,255,255,0.12)] font-semibold active:scale-[0.98]',
  };

  const baseClasses = `relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm transition-all duration-300 shimmer-sweep cursor-pointer overflow-hidden ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
