/**
 * BANGLACAMPUS STUDENT ENQUIRY POPUP CONFIGURATION
 *
 * All timing, trigger, and dismissal policies are centralized here.
 */

export const ENQUIRY_CONFIG = {
  /**
   * The delay in milliseconds before the enquiry modal opens after the page
   * becomes interactive. Default: 5000ms (5 seconds).
   */
  TRIGGER_DELAY_MS: 5000,

  /**
   * Storage key used in sessionStorage to track dismissed pages and submissions.
   */
  STORAGE_KEYS: {
    DISMISSED_ROUTES: 'banglacampus_enquiry_dismissed_routes',
    SUBMITTED_FLAG: 'banglacampus_enquiry_submitted',
  },

  /**
   * Dismissal Policy:
   * - 'per_route': If dismissed on `/colleges/jadavpur-university-engineering`,
   *   it will NOT reopen on that same college route in this browser session.
   *   However, if the student navigates to `/colleges/iem-kolkata` or `/`,
   *   the popup WILL trigger after 5 seconds for the newly selected college.
   * - 'session_wide': Dismissing once suppresses it everywhere for the rest of the session.
   *
   * Default: 'per_route' (satisfies: "prevent reopening continuously on the same page session,
   * while preserving the requirement that newly opened college-specific pages can trigger the form").
   */
  DISMISSAL_POLICY: 'per_route' as 'per_route' | 'session_wide',

  /**
   * Rate limiting and Google Sheets submission limits
   */
  SUBMISSION: {
    MAX_REQUESTS_PER_MINUTE_PER_IP: 5,
    IDEMPOTENCY_HEADER: 'x-idempotency-key',
  },
};
