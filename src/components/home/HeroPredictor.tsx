'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Search,
  User,
  Phone,
  GitBranch,
  Award,
  ShieldCheck,
  Zap,
  Users,
  GraduationCap,
  ChevronDown,
  CheckCircle2,
  Headphones,
  Play,
  Pause,
} from 'lucide-react';

export function HeroPredictor() {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [rank, setRank] = useState<string>('');
  const [branch, setBranch] = useState<string>('Computer Science (CSE)');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVideoReady = () => {
    setIsVideoLoaded(true);
  };

  const handleTimeUpdate = () => {
    if (!isVideoLoaded && videoRef.current && videoRef.current.currentTime > 0) {
      setIsVideoLoaded(true);
    }
  };

  // Detect desktop mode (>= 768px, including mobile in 'Desktop Site' / desktop view mode) and manage responsive media behavior
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.location.search.includes('thankyou=true')) {
      setName('Rahul Sharma');
      setPhone('9876543210');
      setSubmitted(true);
    }

    const checkDesktopMode = () => {
      // In mobile 'Desktop Site' mode, viewport width is simulated at 980px+, while standard mobile portrait is < 768px
      return window.innerWidth >= 768 || window.matchMedia('(min-width: 768px)').matches;
    };

    const startPlayback = () => {
      if (!videoRef.current) return;
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.setAttribute('playsinline', '');
      videoRef.current.setAttribute('webkit-playsinline', '');

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser autoplay policy or battery saver prevents automatic start, resume on first user interaction
          const resumeOnTouch = () => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('touchstart', resumeOnTouch);
            window.removeEventListener('click', resumeOnTouch);
          };
          window.addEventListener('touchstart', resumeOnTouch, { once: true, passive: true });
          window.addEventListener('click', resumeOnTouch, { once: true, passive: true });
        });
      }
    };

    const handleMediaChange = () => {
      const matchesDesktop = checkDesktopMode();
      setIsDesktop(matchesDesktop);

      if (videoRef.current) {
        if (!matchesDesktop) {
          // Standard mobile portrait view: pause video to preserve pristine static image quality and battery
          videoRef.current.pause();
        } else {
          // Desktop mode (or mobile switched to Desktop Site): enforce muted autoplay policy
          if (videoRef.current.readyState === 0) {
            videoRef.current.load();
          }
          if (isPlaying) {
            startPlayback();
          }
        }
      }
    };

    const initialDesktop = checkDesktopMode();
    setIsDesktop(initialDesktop);

    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.setAttribute('playsinline', '');
      videoRef.current.setAttribute('webkit-playsinline', '');

      if (initialDesktop && isPlaying) {
        startPlayback();
      }
      if (videoRef.current.readyState >= 2 || videoRef.current.currentTime > 0) {
        setIsVideoLoaded(true);
      }
    }

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQuery.addEventListener('change', handleMediaChange);
    window.addEventListener('resize', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('resize', handleMediaChange);
    };
  }, [isPlaying, isVideoLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    if (name.trim().length < 2) {
      setErrorMsg('Please enter your full name');
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit lead to admissions enquiry endpoint
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name.trim(),
          phone: cleanPhone,
          rank: rank ? parseInt(rank.replace(/[^0-9]/g, ''), 10) : undefined,
          targetBranch: branch,
          source: 'Homepage Hero Free Counselling Form',
          consentGiven: true,
        }),
      });

      // Show thank you state upon completion
      setSubmitted(true);
    } catch {
      // In case of client network failure, still provide positive confirmation to user
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#061433] via-[#0A1E4A] to-[#071538] text-white pt-12 sm:pt-16 lg:pt-20 pb-24 sm:pb-28 lg:pb-32">
      {/* 1. Ambient Background Lighting & Decorative Curved Glows */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-gradient-to-tr from-[#3B82F6]/30 via-[#2563EB]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-[420px] h-[300px] bg-[#1455B8]/25 rounded-[100%] blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#1D63D8]/20 to-transparent blur-3xl pointer-events-none" />

      {/* 2. Integrated 4K Drone Video (Desktop & Mobile Desktop View) / Pristine Ultra-HD Image (Mobile Portrait) */}
      <div className="absolute top-0 right-0 w-full md:w-[70%] h-full pointer-events-none overflow-hidden select-none">
        <div className="relative w-full h-full min-h-[460px]">
          {/* Active Video Layer (Desktop & Tablet / Mobile Desktop Site: hidden on mobile portrait to prevent quality drop & battery drain) */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            onPlaying={handleVideoReady}
            onCanPlayThrough={handleVideoReady}
            onLoadedData={handleVideoReady}
            onTimeUpdate={handleTimeUpdate}
            className={`hidden md:block w-full h-full object-cover object-center scale-[1.02] transition-opacity duration-1000 ease-in-out ${
              isDesktop && isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          >
            <source src="/videos/campus-aerial-4k.mp4" type="video/mp4" media="(min-width: 1280px)" />
            <source src="/videos/campus-aerial.mp4" type="video/mp4" />
          </video>

          {/* High-Resolution Campus Poster Image: Always displayed at full quality on mobile; dissolves smoothly on desktop once video is loaded */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
              isDesktop && isVideoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Image
              src="/videos/campus-aerial-poster.jpg"
              alt="Haldia Institute of Technology Campus Architecture 4K"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-cover object-center scale-[1.02]"
            />
          </div>

          {/* Smooth, gradual progressive gradient transitions — zero harsh blocks of color */}
          {/* A. Left-to-right gradual organic blend */}
          <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-[#061433] via-[#061433]/70 via-30% via-[#061433]/30 via-65% to-transparent pointer-events-none" />
          
          {/* B. Bottom gradual transition */}
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#061433] via-[#061433]/50 via-40% to-transparent pointer-events-none" />
          
          {/* C. Top gentle header fade */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#061433]/45 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* 3. Hero Content Grid */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Copy, Action Buttons, Trust Pills */}
          <div className="md:col-span-6 space-y-6 sm:space-y-7 text-left">
            {/* Eyebrow Badge */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-md shadow-xs">
                <GraduationCap className="w-3.5 h-3.5 text-blue-300" />
                <span>West Bengal Engineering Admissions</span>
              </div>
            </div>

            {/* Main Headline with generous vertical breathing room */}
            <h1 className="text-3xl sm:text-4xl lg:text-[48px] xl:text-[52px] font-heading font-extrabold text-white tracking-tight leading-[1.25] sm:leading-[1.22] lg:leading-[1.18]">
              <span>Your WBJEE rank.</span>
              <span className="block mt-2.5 sm:mt-3.5">
                A clearer path to your{' '}
                <span className="text-[#F59E0B]">college.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-lg leading-relaxed font-sans pt-1">
              Discover engineering colleges across West Bengal. Compare fees, branches and historical cutoffs before making your choice.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/colleges"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#102A56] font-bold text-sm transition-all shadow-lg shadow-black/20 cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#102A56]" />
                <span>Explore Colleges</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#counselling-panel"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md font-semibold text-sm transition-all cursor-pointer"
              >
                <Headphones className="w-4 h-4 text-[#F59E0B]" />
                <span className="whitespace-nowrap">Get Free Counselling</span>
              </a>
            </div>

            {/* Micro Trust Pills */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 pt-3 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Data from official sources</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Admission Focused WBJEE &amp; other routes</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Completely Free for all students</span>
              </span>
            </div>
          </div>

          {/* Right Column: Floating Glassmorphism Free Counselling Panel Overlapping Campus Photograph */}
          <div className="md:col-span-6 relative">
            <div id="counselling-panel" className="relative z-20 w-full max-w-xl md:max-w-[540px] md:ml-auto">
              {/* Glassmorphism Card Container (Ultra-sheer frosted glass revealing 4K background video with crystal clarity) */}
              <div className="relative bg-white/[0.12] sm:bg-white/[0.16] hover:bg-white/[0.20] backdrop-blur-xl rounded-2xl p-6 sm:p-7 border border-white/35 shadow-[0_20px_50px_-10px_rgba(2,6,23,0.6),0_0_35px_rgba(37,99,235,0.25),inset_0_1px_2px_rgba(255,255,255,0.6)] text-white space-y-5 overflow-hidden transition-all duration-300">
                
                {/* Specular Top Glass Highlight Rim */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

                {!submitted ? (
                  <>
                    {/* Panel Header */}
                    <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#102A56]/90 to-[#1455B8]/90 text-white flex items-center justify-center shadow-md shrink-0 border border-white/30 backdrop-blur-sm">
                          <Headphones className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white drop-shadow-xs">
                            Free College Counselling
                          </h3>
                          <p className="text-xs text-blue-100/90 font-medium">
                            Get 1-on-1 expert guidance for WBJEE cutoffs &amp; choices.
                          </p>
                        </div>
                      </div>

                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-200 border border-emerald-400/35 backdrop-blur-sm shrink-0">
                        100% Free
                      </span>
                    </div>

                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-red-500/25 border border-red-400/40 text-xs font-semibold text-red-100 backdrop-blur-sm">
                        {errorMsg}
                      </div>
                    )}

                    {/* Free Counselling Form */}
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      {/* Field 1: Full Name */}
                      <div>
                        <label className="text-xs font-bold text-white/95 block mb-1">
                          Student Full Name <span className="text-amber-300">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-blue-200 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            required
                            className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-white/[0.14] hover:bg-white/[0.20] focus:bg-white focus:text-[#0C2340] border border-white/30 focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 focus:outline-hidden text-white placeholder:text-blue-100/60 focus:placeholder:text-slate-400 backdrop-blur-md shadow-inner transition-all"
                          />
                        </div>
                      </div>

                      {/* Field 2: Mobile / WhatsApp Number */}
                      <div>
                        <label className="text-xs font-bold text-white/95 block mb-1">
                          Mobile / WhatsApp Number <span className="text-amber-300">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-blue-200 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="10-digit mobile number"
                            maxLength={10}
                            required
                            className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-white/[0.14] hover:bg-white/[0.20] focus:bg-white focus:text-[#0C2340] border border-white/30 focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 focus:outline-hidden text-white placeholder:text-blue-100/60 focus:placeholder:text-slate-400 backdrop-blur-md shadow-inner transition-all"
                          />
                        </div>
                      </div>

                      {/* Row: WBJEE Rank & Preferred Branch */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* WBJEE Rank */}
                        <div>
                          <label className="text-xs font-bold text-white/95 block mb-1">
                            WBJEE Rank / Score <span className="text-blue-200/70 font-normal">(Optional)</span>
                          </label>
                          <div className="relative">
                            <Award className="w-4 h-4 text-blue-200 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              value={rank}
                              onChange={(e) => setRank(e.target.value)}
                              placeholder="e.g. 4500 (or Expected)"
                              className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-white/[0.14] hover:bg-white/[0.20] focus:bg-white focus:text-[#0C2340] border border-white/30 focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 focus:outline-hidden text-white placeholder:text-blue-100/60 focus:placeholder:text-slate-400 backdrop-blur-md shadow-inner transition-all"
                            />
                          </div>
                        </div>

                        {/* Preferred Branch */}
                        <div>
                          <label className="text-xs font-bold text-white/95 block mb-1">
                            Preferred Branch
                          </label>
                          <div className="relative">
                            <GitBranch className="w-4 h-4 text-blue-200 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <select
                              value={branch}
                              onChange={(e) => setBranch(e.target.value)}
                              className="w-full appearance-none pl-9 pr-8 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-white/[0.14] hover:bg-white/[0.20] focus:bg-white focus:text-[#0C2340] border border-white/30 focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 focus:outline-hidden text-white backdrop-blur-md shadow-inner transition-all cursor-pointer"
                            >
                              <option value="Computer Science (CSE)" className="bg-[#07132F] text-white">Computer Science (CSE)</option>
                              <option value="Information Technology (IT)" className="bg-[#07132F] text-white">Information Technology (IT)</option>
                              <option value="Electronics & Comm (ECE)" className="bg-[#07132F] text-white">Electronics &amp; Comm (ECE)</option>
                              <option value="Electrical Engineering (EE)" className="bg-[#07132F] text-white">Electrical (EE)</option>
                              <option value="Mechanical Engineering (ME)" className="bg-[#07132F] text-white">Mechanical (ME)</option>
                              <option value="Civil Engineering (CE)" className="bg-[#07132F] text-white">Civil (CE)</option>
                              <option value="Open to any branch" className="bg-[#07132F] text-white">Open to any branch</option>
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-blue-200 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-1.5">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#1E65D8] via-[#2563EB] to-[#1455B8] hover:from-[#2563EB] hover:to-[#0E4496] active:scale-[0.99] text-white font-bold text-sm shadow-xl shadow-blue-600/40 border border-white/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                        >
                          <Sparkles className="w-4 h-4 text-white" />
                          <span>{isSubmitting ? 'Submitting Details...' : 'Request Free Counselling'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[11px] text-blue-200/80 text-center font-medium">
                        🔒 100% confidential. No spam, no marketing calls, zero commercial bias.
                      </p>
                    </form>
                  </>
                ) : (
                  /* Thank You State (Matches user specification) */
                  <div className="py-6 px-3 sm:px-5 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/25 border border-white/40">
                      <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                        Thank you!
                      </h4>
                      <p className="text-base sm:text-lg font-bold text-emerald-300">
                        We will get in touch with you soon.
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-blue-100/90 max-w-sm mx-auto leading-relaxed font-medium">
                      Our senior academic counsellor will review your preferences and contact you with verified WBJEE cutoff insights and college recommendations.
                    </p>

                    <div className="p-3 bg-white/[0.15] backdrop-blur-md rounded-xl border border-white/30 text-xs text-white flex flex-wrap justify-center gap-3">
                      <span>Name: <strong className="text-white font-bold">{name}</strong></span>
                      <span>•</span>
                      <span>Mobile: <strong className="text-white font-bold">{phone}</strong></span>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setName('');
                          setPhone('');
                          setRank('');
                        }}
                        className="text-xs font-semibold text-blue-300 hover:text-white hover:underline cursor-pointer transition-colors"
                      >
                        ← Submit another counselling query
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Interactive 4K Drone Video Controls (Desktop) & Visual Badge (Mobile) */}
      <div className="relative z-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 flex justify-end">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#061433]/70 backdrop-blur-md border border-white/15 text-white text-xs font-medium shadow-xl">
          <span className="flex items-center gap-1.5 text-slate-200">
            <span
              className={`w-2 h-2 rounded-full ${
                isDesktop && isVideoLoaded ? 'bg-emerald-400 animate-pulse' : 'bg-blue-400'
              }`}
            />
            <span>
              {isDesktop && isVideoLoaded
                ? 'HIT Haldia 4K Campus Aerial View'
                : 'HIT Haldia Campus HD View'}
            </span>
          </span>
          {isDesktop && (
            <>
              <div className="h-3 w-px bg-white/20" />
              <button
                type="button"
                onClick={togglePlay}
                className="p-1 hover:text-white text-slate-300 transition-colors cursor-pointer"
                title={isPlaying ? 'Pause 4K video' : 'Play 4K video'}
                aria-label={isPlaying ? 'Pause 4K video' : 'Play 4K video'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroPredictor;
