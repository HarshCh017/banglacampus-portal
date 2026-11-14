'use client';

/**
 * Analytics abstraction layer.
 * Single entry point for all tracking events across GA4, GTM, and custom webhooks.
 * Enforces deduplication via unique event_id / leadId.
 */

// Window augmentation for dataLayer & gtag
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export type ConversionEventName =
  | 'lead_submitted'
  | 'eligibility_indicated'
  | 'counsellor_contact_clicked'
  | 'whatsapp_enquiry_clicked'
  | 'brochure_download_clicked';

export interface TrackingProperties {
  event_id?: string;
  lead_id?: string;
  branch?: string;
  percentage_type?: 'Aggregate' | 'PCM';
  percentage_score?: number;
  eligibility_status?: string;
  source_cta_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  [key: string]: any;
}

// In-memory set to prevent duplicate event firing within the same browser session
const firedEvents = new Set<string>();

export function trackEvent(eventName: ConversionEventName, properties: TrackingProperties = {}) {
  try {
    const dedupeKey = properties.event_id || properties.lead_id
      ? `${eventName}_${properties.event_id || properties.lead_id}`
      : undefined;

    if (dedupeKey && firedEvents.has(dedupeKey)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[Analytics] Deduplicated event skipped: ${dedupeKey}`);
      }
      return;
    }

    if (dedupeKey) {
      firedEvents.add(dedupeKey);
    }

    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...properties,
    };

    if (typeof window !== 'undefined') {
      // 1. Push to Google Tag Manager dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);

      // 2. Push to gtag if present
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, properties);
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics Event] ${eventName}:`, payload);
      }
    }
  } catch (err) {
    console.error('[Analytics Error] Failed to track event:', err);
  }
}
