'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Code, Brain, Cpu, Settings, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';
import { VERIFIED_BRANCHES } from '@/data/branches';

export function BranchFinder() {
  const [selectedTrack, setSelectedTrack] = useState<string>('software');

  const tracks = [
    {
      id: 'software',
      label: 'Software & Cloud',
      icon: Code,
      title: 'Software, Web & Systems Engineering',
      description: 'You enjoy coding, building applications, database systems, networks, and cloud architecture.',
      recommendedSlugs: ['cse', 'it'],
      careerRoles: ['Full-Stack Developer', 'Cloud Engineer', 'Systems Architect', 'DevOps Specialist'],
    },
    {
      id: 'ai',
      label: 'AI & Data Science',
      icon: Brain,
      title: 'Artificial Intelligence & Machine Learning',
      description: 'You want to work with modern neural networks, predictive models, computer vision, NLP, and intelligent data systems.',
      recommendedSlugs: ['cse-aiml', 'cse-ai', 'cse-iot-cs-bt'],
      careerRoles: ['ML Engineer', 'Data Scientist', 'AI Researcher', 'Computer Vision Analyst'],
    },
    {
      id: 'hardware',
      label: 'Electronics & VLSI',
      icon: Cpu,
      title: 'Circuits, Semiconductors & Embedded Systems',
      description: 'You are passionate about microcontrollers, chip design, signal processing, wireless communication, and IoT hardware.',
      recommendedSlugs: ['ece', 'ee', 'eee'],
      careerRoles: ['VLSI Design Engineer', 'Embedded Systems Engineer', 'Telecom Specialist', 'RF Engineer'],
    },
    {
      id: 'robotics',
      label: 'Robotics & Mechanical',
      icon: Settings,
      title: 'Mechatronics, Energy & Core Manufacturing',
      description: 'You are excited by physical design, robotics, thermal systems, CAD/CAM modelling, and industrial automation.',
      recommendedSlugs: ['me', 'cse-iot-cs-bt'],
      careerRoles: ['Robotics Engineer', 'Design Engineer', 'Automation Consultant', 'Industrial Specialist'],
    },
  ];

  const currentTrack = tracks.find((t) => t.id === selectedTrack) || tracks[0];
  const recommendedBranches = VERIFIED_BRANCHES.filter((b) =>
    currentTrack.recommendedSlugs.includes(b.slug)
  );

  const handleSelectBranch = (slug: string) => {
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      const select = formElement.querySelector('select[name="branch"]') as HTMLSelectElement | null;
      if (select) {
        select.value = slug;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        select.dispatchEvent(new Event('input', { bubbles: true }));
      }
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="branch-finder" className="py-16 md:py-20 bg-slate-900 text-white relative overflow-hidden engineering-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandBlue-900/60 border border-brandBlue-700 text-xs text-brandBlue-300 font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Interactive Decision Tool</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading">
            Not Sure Which Branch Suits You Best?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2.5">
            Select what you enjoy building most, and explore the AICTE-approved B.Tech programs aligned with your aspirations.
          </p>
        </div>

        {/* Track Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {tracks.map((track) => {
            const Icon = track.icon;
            const isSelected = selectedTrack === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedTrack(track.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-brandBlue-600 border-brandBlue-400 text-white shadow-lg shadow-brandBlue-900/50 translate-y-[-2px]'
                    : 'bg-navy-950/70 border-navy-800 text-slate-300 hover:bg-navy-900 hover:border-navy-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-sky-400'}`} />
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </div>
                <div className="text-xs font-bold font-heading">{track.label}</div>
              </button>
            );
          })}
        </div>

        {/* Recommendation Showcase Box */}
        <div className="max-w-4xl mx-auto bg-navy-950/90 border border-navy-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Track Info (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Recommended Direction
              </span>
              <h3 className="text-xl font-bold text-white font-heading leading-snug">
                {currentTrack.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentTrack.description}
              </p>

              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-400 block mb-2">
                  Typical Industry Career Roles:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentTrack.careerRoles.map((role, rIdx) => (
                    <span
                      key={rIdx}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-navy-800 border border-navy-700 text-slate-200"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Matched Programs (7 cols) */}
            <div className="lg:col-span-7 space-y-3.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Matching I.E.M. Undergraduate Branches:
              </span>

              {recommendedBranches.map((branch) => (
                <div
                  key={branch.slug}
                  className="bg-navy-900/90 border border-navy-800 hover:border-sky-500/50 rounded-xl p-3.5 sm:p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                        {branch.name}
                      </h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-navy-800 text-slate-300">
                        {branch.shortName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {branch.highlights[0]}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 pt-1 sm:pt-0">
                    <Link
                      href={`/courses/${branch.slug}`}
                      className="p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg bg-navy-800 hover:bg-navy-700 active:scale-95 text-slate-300 hover:text-white transition-all"
                      title="View Detailed Syllabus"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleSelectBranch(branch.slug)}
                      className="px-3.5 py-2 min-h-[38px] rounded-lg bg-brandBlue-600 hover:bg-brandBlue-500 active:scale-95 text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center"
                    >
                      Inquire Branch
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-2 text-right">
                <a
                  href="#lead-form"
                  className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-white font-semibold transition-colors"
                >
                  <span>Talk with an advisor about your branch preference</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
