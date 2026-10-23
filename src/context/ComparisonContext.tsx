'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'banglacampus_compare_v1';
const MAX_COMPARISON_COLLEGES = 3;

interface ComparisonContextType {
  selectedSlugs: string[];
  addToCompare: (slug: string) => boolean;
  removeFromCompare: (slug: string) => void;
  clearCompare: () => void;
  isInCompare: (slug: string) => boolean;
  maxLimit: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage safely on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Sanitize: ensure strings, max 3 items
          const validSlugs = parsed
            .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
            .slice(0, MAX_COMPARISON_COLLEGES);
          setSelectedSlugs(validSlugs);
        }
      }
    } catch {
      // LocalStorage access may fail in restricted/private modes; fallback to memory
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage whenever selectedSlugs changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedSlugs));
    } catch {
      // Ignore write errors (e.g. quota exceeded or disabled storage)
    }
  }, [selectedSlugs, isInitialized]);

  const addToCompare = useCallback((slug: string): boolean => {
    if (!slug) return false;
    let added = false;
    setSelectedSlugs((prev) => {
      if (prev.includes(slug)) return prev;
      if (prev.length >= MAX_COMPARISON_COLLEGES) return prev;
      added = true;
      return [...prev, slug];
    });
    return added;
  }, []);

  const removeFromCompare = useCallback((slug: string) => {
    setSelectedSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clearCompare = useCallback(() => {
    setSelectedSlugs([]);
  }, []);

  const isInCompare = useCallback(
    (slug: string) => {
      return selectedSlugs.includes(slug);
    },
    [selectedSlugs]
  );

  return (
    <ComparisonContext.Provider
      value={{
        selectedSlugs,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        maxLimit: MAX_COMPARISON_COLLEGES,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
