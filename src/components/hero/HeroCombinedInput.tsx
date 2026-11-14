'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

export function HeroCombinedInput() {
  const router = useRouter();
  const [rank, setRank] = useState<string>('');
  const [category, setCategory] = useState<string>('General');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedRank = parseInt(rank, 10);
    if (!isNaN(parsedRank) && parsedRank > 0) {
      router.push(`/counselling-simulator?rank=${parsedRank}&category=${encodeURIComponent(category)}`);
    } else {
      router.push(`/counselling-simulator?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="space-y-3 max-w-xl mx-auto lg:mx-0">
      <form
        onSubmit={handleSubmit}
        className="p-2 sm:p-2.5 rounded-2xl bg-[#0B1210]/95 border border-[rgba(255,255,255,0.12)] shadow-2xl shadow-black/80 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-2"
      >
        {/* Rank Number Input */}
        <div className="relative flex-1 w-full">
          <input
            type="number"
            min="1"
            max="150000"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            placeholder="Enter your WBJEE Rank (e.g. 4500)"
            className="w-full pl-3.5 pr-3 py-2.5 bg-[#05080A] text-[#ECF4F0] placeholder:text-[#60726A] text-sm rounded-xl border border-[rgba(255,255,255,0.08)] focus:outline-none focus:border-[#10B981] font-mono tabular-nums"
          />
        </div>

        {/* Category Dropdown */}
        <div className="w-full sm:w-32 shrink-0">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2.5 bg-[#05080A] text-[#ECF4F0] text-xs font-semibold rounded-xl border border-[rgba(255,255,255,0.08)] focus:outline-none focus:border-[#10B981] cursor-pointer"
          >
            <option value="General">General</option>
            <option value="TFW">TFW (Tuition Free)</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="OBC-A">OBC-A</option>
            <option value="OBC-B">OBC-B</option>
          </select>
        </div>

        {/* Gold CTA Button */}
        <button
          type="submit"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F5B942] to-[#F59E0B] hover:brightness-105 active:scale-98 text-slate-950 font-bold text-xs uppercase tracking-wide shadow-gold-glow flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
        >
          <span>Show My Colleges</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
        </button>
      </form>

      {/* Secondary Browse Link */}
      <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-[#9DB0A8] pt-1">
        <span>or</span>
        <Link
          href="/colleges"
          className="text-[#10B981] hover:text-[#34D399] font-medium underline underline-offset-4 flex items-center gap-1 transition-colors"
        >
          <span>browse all 20 verified engineering colleges</span>
          <Compass className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
