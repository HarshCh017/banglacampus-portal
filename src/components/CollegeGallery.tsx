'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { CampusImageItem } from '@/types/college';
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
  Layers,
  Sparkles,
} from 'lucide-react';

interface CollegeGalleryProps {
  collegeName: string;
  collegeShortName: string;
  images: CampusImageItem[];
  sourceName?: string;
}

export function CollegeGallery({
  collegeName,
  collegeShortName,
  images,
  sourceName,
}: CollegeGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Available unique categories
  const categories = ['All', ...Array.from(new Set(images.map((img) => img.category)))];

  const filteredImages =
    selectedCategory === 'All'
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev! + 1) % filteredImages.length));
    }
  }, [lightboxIndex, filteredImages.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev! === 0 ? filteredImages.length - 1 : prev! - 1
      );
    }
  }, [lightboxIndex, filteredImages.length]);

  // Handle keyboard events in lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  if (!images || images.length === 0) {
    return null;
  }

  const currentLightboxImg =
    lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <section id="gallery" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Campus Photography</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 tracking-tight">
            Campus Architecture &amp; Facilities Gallery
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Audited photographic documentation of instructional wings, research laboratories, and student infrastructure.
          </p>
        </div>

        {/* Category Filter Pills */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, idx) => (
          <div
            key={image.url + idx}
            onClick={() => openLightbox(idx)}
            className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 aspect-[4/3] cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300"
          >
            <Image
              src={image.url}
              alt={image.alt || image.caption}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />

            {/* Gradient Overlay for Caption readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Category Tag (Top-Left) */}
            <div className="absolute top-3 left-3 z-10">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                {image.category}
              </span>
            </div>

            {/* Hover Expand Icon (Top-Right) */}
            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                <Maximize2 className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-3 left-3 right-3 z-10">
              <p className="text-xs font-semibold text-white leading-snug line-clamp-2">
                {image.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Attribution Footer */}
      {sourceName && (
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Image Source: {sourceName}</span>
          </div>
          <span className="text-[11px] text-slate-400">
            Click any photo to enlarge &amp; view in high definition
          </span>
        </div>
      )}

      {/* Full-Screen Interactive Lightbox Modal */}
      {lightboxIndex !== null && currentLightboxImg && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery viewer"
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Lightbox Top Control Bar */}
          <div
            className="flex items-center justify-between text-white max-w-6xl mx-auto w-full z-10 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                  {currentLightboxImg.category}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {collegeShortName} Photography Archive
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white max-w-2xl truncate">
                {currentLightboxImg.caption}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">
                {lightboxIndex + 1} of {filteredImages.length}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close image viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image Stage */}
          <div
            className="relative flex-1 max-w-5xl mx-auto w-full flex items-center justify-center my-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            {filteredImages.length > 1 && (
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-2 sm:-left-12 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 transition-all cursor-pointer shadow-lg"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Main Stage Image */}
            <div className="relative w-full h-full max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={currentLightboxImg.url}
                alt={currentLightboxImg.alt || currentLightboxImg.caption}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-contain"
              />
            </div>

            {/* Next Button */}
            {filteredImages.length > 1 && (
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-2 sm:-right-12 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 transition-all cursor-pointer shadow-lg"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Caption Bar */}
          <div
            className="text-center max-w-2xl mx-auto text-xs text-slate-300 z-10 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-medium text-white">{currentLightboxImg.caption}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Press <kbd className="bg-slate-800 px-1 rounded text-white">Left</kbd> / <kbd className="bg-slate-800 px-1 rounded text-white">Right</kbd> to navigate, <kbd className="bg-slate-800 px-1 rounded text-white">Esc</kbd> to exit
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
