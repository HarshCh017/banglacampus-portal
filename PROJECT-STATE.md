# PROJECT STATE — I.E.M B.TECH ADMISSION ACQUISITION SYSTEM
Last Updated: 2026-09-18
Current Phase: PRODUCTION-READY FOR 2027 (GitHub & Vercel Deploy Ready)
Completed Phases: PHASE 0a (Discovery), PHASE 0b (Strategy), PHASE 1 (Design & UI), PHASE 2 (Core Funnel), PHASE 3 (Content & SEO Hubs), PHASE 4 (Analytics Wiring), PHASE 5 (Full QA & Hard Quality Gates), PHASE 6 (2027 Cycle Upgrade, Phone Masking & Vercel Packaging)
Approval Status: USER_APPROVED_EXECUTION (All requirements completed, tests passing, builds clean)

---

## 1. COMPLETED PHASES & DELIVERABLES

- **Phase 0a — Discovery**: COMPLETED & APPROVED
  - Node.js LTS v24.19.0 & npm 11.17.0 runtime environment configured.
  - Primary source research on `iem.edu.in`, `exam.iem.edu.in`, AICTE EoA records, and WBJEE portals.
- **Phase 0b — Strategy**: COMPLETED & APPROVED
  - Delivered `PERSONAS.md`, `KEYWORD-MAP.md`, `tokens.md`, `CONTENT-TODO.md`, `CLAIMS-SOURCES.md`, `ELIGIBILITY-RULES.md`, `CRM-MAPPING.md`, `SITEMAP.md`.
- **Phase 1 — Design & UI Foundations**: COMPLETED & APPROVED
  - Built design tokens, typography scale, responsive navigation, accessible color contrast (WCAG AA/AAA verified), engineering grid texture, and mobile quick contact bar.
- **Phase 2 — Core Funnel**: COMPLETED & APPROVED
  - Authoritative `/api/lead` endpoint with Zod validation, bot honeypot, IP rate limiting (5 req/min), eligibility evaluation, and local fallback persistence (`data/leads.json` and Vercel `os.tmpdir()` support).
  - High-conversion `/apply` and `/thank-you` confirmation page with dynamic WhatsApp CTA and physical document checklist.
  - `src/lib/analytics.ts` with in-memory deduplication for conversion events.
- **Phase 3 — Content & SEO Hubs**: COMPLETED
  - Built 35 production routes: `/courses`, dynamic `/courses/[slug]` covering 11 verified branches, `/admissions`, `/admissions/fees`, `/admissions/eligibility`, `/iemjee`, `/placements`, `/campus`, `/resources`, dynamic `/resources/[slug]`, `/contact`, `/privacy`, `/terms`, `/disclaimer`.
  - Implemented dynamic `sitemap.ts` and `robots.ts`.
- **Phase 4 — Analytics Wiring**: COMPLETED
  - Instrumented `lead_submitted`, `eligibility_indicated`, `counsellor_contact_clicked`, `whatsapp_enquiry_clicked`, and `brochure_download_clicked` across all buttons, header, mobile bar, and thank-you page with one-time deduplication.
- **Phase 5 — Full QA & Hard Quality Gates**: COMPLETED
  - Full 10-test automated test suite passing in 453ms via `tsx --test`.
  - Next.js 15.5.25 production build compiled 35/35 static pages with 0 errors.
  - First Load JS payload on homepage measured at **146 kB** ($\le 180\text{ kB}$ target).
  - Delivered `README.md`, `LEAD-QUALITY.md`, `COMPLIANCE-CHECKLIST.md`, `EXPERIMENTS.md`, `QA-REPORT.md`, `ASSETS.md`.
- **Phase 6 — 2027 Cycle Upgrade, Phone Masking & Vercel Packaging**: COMPLETED
  - Entire application updated for the **2027–28 Academic Intake Cycle** and **IEMJEE 2027**.
  - All public telephone/mobile numbers (8010700500, 8069795500, etc.) completely hidden and masked across UI components, headers, footers, sticky bars, and body copy.
  - Direct actions route to the high-converting callback form (`#lead-form`) or official Ashram campus email/physical address.
  - Vercel read-only serverless filesystem compatibility added to `leadStore.ts`.
  - `.gitignore`, `vercel.json`, and `.env.example` created.

---

## 2. DECISIONS & LEGAL MODEL STATUS

- **Active Model**: Defaulted safely to **Model [B] INDEPENDENT GUIDANCE** with prominent institutional disclaimers, operator disclosures, DPDP compliance, and official payee instructions (*"Institute of Engineering & Management Trust"*).

---

## 3. VERIFIED INSTITUTIONAL FACTS

- **Legal Entity**: Institute of Engineering & Management (IEM), Kolkata (`VERIFIED_PRIMARY`)
- **Governing Body**: Institute of Engineering & Management Trust / IEM-UEM Group (`VERIFIED_PRIMARY`)
- **Accreditation**: AICTE Approved, MAKAUT Affiliated, Autonomous status, NAAC 'A' Grade, NBA Accredited programs (`VERIFIED_PRIMARY` / `VERIFIED_REGULATORY`)
- **Registered Office**: Ashram Building, 1st Floor, GN-34/2, Sector – V, Salt Lake Electronics Complex, Kolkata – 700091 (`VERIFIED_PRIMARY`)
- **Official Contact Channel**: Official Email: `admissions@iem.edu.in`; Direct Callback Request System on Ashram Campus (`VERIFIED_PRIMARY`)
- **Entrance Tests**: IEMJEE 2027 (Zero exam fee, online registration), WBJEE, JEE Main (`VERIFIED_PRIMARY`)
- **Verified Branches (11)**: CSE, CSE (AI&ML), CSE (AI), IT, ECE, EE, EEE, ME, CSE (IoT & Cyber Security with Blockchain), CSE (Cyber Security), CSE (Data Science) (`VERIFIED_PRIMARY` / `VERIFIED_SECONDARY`)

---

## 4. CONFLICTED & UNVERIFIED FACTS (PRESERVED)

- **Tuition Fee Schedule**: `CONFLICTED` (Circulars range between ₹98,700 and ₹1,40,000 for 1st semester; ~₹9.45L total for 4 years). Presented as an estimated range with explicit disclaimer to verify final demand letters from Ashram campus for 2027–28.
- **Lateral Entry 2027 Seats**: `DEFERRED` (Subject to WBJEEB JELET notification).
- **Certified Intake 2027-28**: `UNVERIFIED_PRIMARY` (Historical approved intake ~840 across branches; 2027-28 annual AICTE EoA pending publication).

---

## 5. NOT APPLICABLE & DEFERRED ITEMS

- **Multi-factor Complex Eligibility (Caste / Domicile / Board Cutoffs)**: `NOT_APPLICABLE` (Section 8.4 guardrail: data minimization limits form to 4 fields; complex multi-factor profiling avoided to prevent unlawful profiling).
- **Fabricated Testimonials**: `NOT_APPLICABLE` (Replaced with authentic *"Questions Students & Parents Ask"* FAQ section to comply with Red Line #1).
- **Automated WhatsApp Business API Server**: `DEFERRED` (Requires Meta Business verification and API keys; graceful fallback to prefilled WhatsApp direct links deployed).

---

## 6. TOOLS & INTEGRATIONS STATUS

- **Node.js**: v24.19.0 (Verified active)
- **npm**: 11.17.0 (Verified active)
- **Next.js**: 15.5.25 (Production build verified, 35 static/dynamic routes generated)
- **Lead Storage**: Local durable JSON queue active in `data/leads.json` (zero lead drop)
- **Analytics Layer**: Active in `src/lib/analytics.ts` with in-memory deduplication
- **Automated Test Suite**: Node 24 native runner via `tsx` (10/10 tests passing in 453ms)

---

## 7. NEXT REQUIRED ACTION

- System is completely built, validated, and production-ready.
- Deliver the comprehensive Final Report Contract (Section 20) to the user.
