'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AiInputProps {
  placeholder?: string;
  className?: string;
  defaultRank?: string;
}

const PLACEHOLDERS = [
  'Search colleges (e.g. Jadavpur, Kalyani, Heritage)...',
  'Ask: What rank is needed for CSE at IEM Kolkata?',
  'Filter: Government colleges under ₹15,000 annual fee...',
  'Simulate: Which colleges can I get at GMR 5400?',
];

export function SkiperAiInput({
  className,
  defaultRank = '',
}: AiInputProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultRank);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [category, setCategory] = useState('General');

  // Rotate helpful prompts when empty
  useEffect(() => {
    if (value || isFocused) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [value, isFocused]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = value.trim();
    if (!query) return;

    const parsedRank = parseInt(query.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(parsedRank) && parsedRank > 0 && parsedRank < 150000) {
      router.push(`/counselling-simulator?rank=${parsedRank}&category=${encodeURIComponent(category)}`);
    } else {
      router.push(`/colleges?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          'relative rounded-2xl bg-[#0B1210]/95 border transition-all duration-300 shadow-2xl backdrop-blur-xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2',
          isFocused
            ? 'border-[#10B981] shadow-[0_0_25px_-5px_rgba(16,185,129,0.3)]'
            : 'border-[rgba(255,255,255,0.12)] shadow-black/80'
        )}
      >
        {/* Leading Icon & Input */}
        <div className="relative flex-1 w-full flex items-center">
          <div className="w-8 h-8 rounded-xl bg-[#05080A] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#10B981] shrink-0 ml-1">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>

          <div className="relative flex-1 pl-3 pr-2 py-1.5 flex items-center">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-transparent text-[#ECF4F0] placeholder:text-transparent text-sm focus:outline-none font-medium"
            />

            {/* Rotating Animated Placeholder */}
            {!value && (
              <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none overflow-hidden pr-2">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={placeholderIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-xs sm:text-sm text-[#9DB0A8]/80 truncate"
                  >
                    {PLACEHOLDERS[placeholderIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Category Pill Switcher */}
        <div className="w-full sm:w-auto shrink-0 flex items-center gap-1.5">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-28 px-2.5 py-2 bg-[#05080A] text-[#9DB0A8] text-xs font-semibold rounded-xl border border-[rgba(255,255,255,0.08)] focus:outline-none focus:border-[#10B981] cursor-pointer"
          >
            <option value="General">General</option>
            <option value="TFW">TFW</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="OBC-A">OBC-A</option>
            <option value="OBC-B">OBC-B</option>
          </select>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-[#F5B942] to-[#F59E0B] hover:brightness-105 active:scale-98 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-gold-glow flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Ask &amp; Search</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SkiperAiInput;
