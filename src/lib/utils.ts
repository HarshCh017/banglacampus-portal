import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Robust NIRF rank formatter:
 * Handles numbers (e.g. 10 -> "NIRF #10"),
 * strings with "Rank Band 151-200" -> "NIRF Band 151-200" (preventing "NIRF #Rank Band 151-200"),
 * and already prefixed labels.
 */
export function formatNirfRank(rank: number | string | null | undefined): string | null {
  if (!rank) return null;
  if (typeof rank === 'number') return `NIRF #${rank}`;
  
  const cleaned = String(rank).trim();
  if (/^rank\s+band/i.test(cleaned)) {
    return `NIRF Band ${cleaned.replace(/^rank\s+band\s*/i, '')}`;
  }
  if (/^band/i.test(cleaned)) {
    return `NIRF Band ${cleaned.replace(/^band\s*/i, '')}`;
  }
  if (/^nirf/i.test(cleaned)) {
    return cleaned;
  }
  return `NIRF #${cleaned.replace(/^#/, '')}`;
}

/**
 * Formats city and district safely, preventing duplicate outputs like "Kolkata, Kolkata".
 * E.g. ("Kolkata", "Kolkata") -> "Kolkata, West Bengal"
 *      ("Kalyani", "Nadia") -> "Kalyani, Nadia"
 */
export function formatLocation(city: string, district?: string): string {
  if (!district || city.toLowerCase().trim() === district.toLowerCase().trim()) {
    return `${city}, West Bengal`;
  }
  return `${city}, ${district}`;
}
