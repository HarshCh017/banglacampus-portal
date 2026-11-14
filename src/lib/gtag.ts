export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID || '';

// Log page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag && GA_MEASUREMENT_ID) {
    (window as unknown as { gtag: Function }).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
};

// Log specific custom events
export const event = ({ action, category, label, value, ...rest }: GTagEvent) => {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
    (window as unknown as { gtag: Function }).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    });
  }
};

// BengalCampus Specialized Event Helpers
export const trackCollegeView = (collegeSlug: string, collegeName: string) => {
  event({
    action: 'view_college_profile',
    category: 'engagement',
    label: `${collegeName} (${collegeSlug})`,
  });
};

export const trackComparison = (collegeSlugs: string[]) => {
  event({
    action: 'compare_colleges',
    category: 'tools',
    label: collegeSlugs.join(' vs '),
    value: collegeSlugs.length,
  });
};

export const trackEnquirySubmitted = (enquiryId: string, collegeCode?: string) => {
  event({
    action: 'submit_enquiry',
    category: 'conversion',
    label: collegeCode || 'General Counselling',
    enquiry_id: enquiryId,
  });
};

// Patch v1.1 §P5 (A3): Never log student rank, marks, or PII into Google Analytics
export const trackSimulatorRun = (category: string) => {
  event({
    action: 'run_counselling_simulator',
    category: 'tools',
    label: `Category: ${category}`,
  });
};
