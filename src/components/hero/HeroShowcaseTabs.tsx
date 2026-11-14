'use client';

import React, { useState } from 'react';
import { Sparkles, Video, Play } from 'lucide-react';
import { HeroChoiceCard } from './HeroChoiceCard';
import { HeroAtmosphereVideo } from './HeroAtmosphereVideo';

export function HeroShowcaseTabs() {
  const [activeTab, setActiveTab] = useState<'simulation' | 'video'>('simulation');

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Tab Switcher */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0B1210]/90 border border-[rgba(255,255,255,0.08)] mb-3 shadow-lg backdrop-blur-md">
        <button
          type="button"
          onClick={() => setActiveTab('simulation')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'simulation'
              ? 'bg-[#10B981] text-slate-950 shadow-sm font-bold'
              : 'text-[#9DB0A8] hover:text-[#ECF4F0]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Live Simulator Preview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('video')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'video'
              ? 'bg-[#10B981] text-slate-950 shadow-sm font-bold'
              : 'text-[#9DB0A8] hover:text-[#ECF4F0]'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Campus Atmosphere</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="w-full max-w-md">
        {activeTab === 'simulation' ? (
          <HeroChoiceCard />
        ) : (
          <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.12)] shadow-2xl shadow-black/80">
            <HeroAtmosphereVideo />
          </div>
        )}
      </div>
    </div>
  );
}
