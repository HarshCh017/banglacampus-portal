# CONTENT AUDIT & PLACEHOLDER TRACKER — I.E.M ADMISSIONS
Version: 1.0 (Phase 0b Deliverable)
Last Updated: 2026-09-18

This document catalogues every unresolved content slot, dynamic placeholder, missing asset, and operational parameter. No page may display an unresolved placeholder to end-users in production.

---

## 1. CONTENT PLACEHOLDERS CATALOGUE

| Placeholder Token | Context & Location | Required Data | Owner | Risk if Unresolved | Default Fallback Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `{{SITE_OPERATING_MODEL}}` | Global / Footer / Schema | Value: `OFFICIAL` (A), `INDEPENDENT` (B), `PARTNER` (C) | User / Legal | **CRITICAL**: False claims of official registrar status or impersonation | Defaults to transparent educational guidance disclosure |
| `{{OPERATING_ENTITY_NAME}}` | Footer / Privacy / Terms | Legal registered company / agency name | User | **HIGH**: Violation of Consumer Protection & DPDP rules | Omit if Model A; render explicit guidance disclosure if Model B |
| `{{FEE_SCHEDULE_2026}}` | `/admissions/fees` & Courses | Verified 2026-27 per-semester tuition & one-time fees | IEM Accounts / Operator | **HIGH**: Inaccurate financial expectation for parents | Display verified historical range (~₹1.15L–₹1.40L/sem) with official fee notice caveat |
| `{{TOTAL_SEAT_INTAKE_2026}}` | `/courses` & Branch detail | AICTE EoA certified branch intake | Regulatory / AICTE | **MEDIUM**: Inaccurate seat scarcity | Render historical WBJEE approved intake (~840 total) with "Subject to AICTE approval" |
| `{{LATERAL_ENTRY_STATUS}}` | `/admissions` | Whether 2nd year B.Tech seats are active via JELET | Admissions Office | **MEDIUM**: False promises to diploma holders | Mark "Enquire for Seat Availability" with REVIEW_REQUIRED engine status |
| `{{CAMPUS_PHOTOGRAPHY}}` | Hero / Campus life / Galleries | Authentic high-res images of Ashram & Gurukul campus | Brand / Media Team | **LOW-MED**: Cheesy stock visuals harming institutional credibility | Use verified editorial campus exterior/lab photos with license log in ASSETS.md |
| `{{VERIFIED_TESTIMONIALS}}` | Student stories / Home | Consented quotes `{ name, program, year, quote, photo, consent }` | Alumni Relations | **HIGH**: Violation of Red Line #1 & #10 (Never fabricate testimonials) | Replace section with "Questions Students Ask Before Applying" FAQ |
| `{{WHATSAPP_BUSINESS_API}}` | Post-submission pipeline | API key / Phone number ID for automated WhatsApp delivery | DevOps / Operator | **MEDIUM**: Delayed student response | Render direct WhatsApp click-to-chat CTA on `/thank-you` with prefilled enquiry |
| `{{CRM_ENDPOINT_URL}}` | `/api/lead` lead sync | Webhook URL / API key (Supabase, Zoho, HubSpot, Sheets) | DevOps / Operator | **HIGH**: Leads trapped in local persistence store | Store in local encrypted SQLite/JSON fallback queue with retry worker |
| `{{OPERATOR_PHONE_EMAIL}}` | Footer / Contact Page | Direct enquiry phone & support email of the site operator | Operator | **MEDIUM**: Inability of users to report discrepancies | Default to official IEM helpline `8010700500` and `admissions@iem.edu.in` |

---

## 2. PLACEHOLDER RESOLUTION WORKFLOW
1. **Never Render Raw Braces**: No template strings like `{{...}}` shall ever appear in production markup.
2. **Safe Fallback Component**: All dynamic claims are wrapped in an `AuthorizedClaim` component that verifies the presence of an active verified source before rendering; otherwise, it renders an honest, non-superlative disclaimer.
3. **Sign-off Protocol**: Any update transitioning a claim from placeholder to verified must cite a verifiable source in `CLAIMS-SOURCES.md`.
