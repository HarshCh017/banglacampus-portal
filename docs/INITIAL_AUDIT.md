# BengalCampus Repository & Architectural Audit
**Date:** November 2026  
**Auditor:** Senior Product & Engineering Team  
**Scope:** Frontend Architecture, Design Tokens, Routing, Performance, and Compliance  

---

## 1. Executive Summary
BengalCampus is an independent engineering college discovery and admission intelligence platform focused on West Bengal (WBJEE aspirants and parents). Prior iterations introduced high-tech dark themes and particle shaders that diverged from the approved EdTech brand identity.

This audit establishes the baseline for transforming the platform into the approved **Sapphire-Blue, Navy, Ivory & Amber** high-trust design system depicted in the approved 9-page product specification.

---

## 2. Technology Stack Baseline
- **Framework:** Next.js 15.2+ (App Router)
- **Runtime:** React 19, Node.js 20+
- **Language:** TypeScript 5.x (Strict mode enabled)
- **Styling:** Tailwind CSS 3.4+
- **Component Primitives:** Radix UI primitives, Lucide React icons
- **Motion:** Framer Motion 12.x, GSAP 3.12+ (restrained, accessibility-first)
- **Testing:** Native Node test runner / `tsx` (`tests/**/*.test.ts`, 43 tests passing)
- **Data Integrity:** Provenance auditor (`scripts/audit-provenance.ts`, 20 institutions & 29 cutoffs validated)

---

## 3. Route Inventory & Redesign Alignment

| Route | Current State | Target Redesign (Approved Mockups) |
| :--- | :--- | :--- |
| `/` | Dark mode with aurora mesh & 3D net | **Spacious Sapphire-Blue Hero**, prominent white predictor card, campus photography, category cards, featured colleges |
| `/colleges` | Dark grid layout | **Spacious horizontal college cards**, left filter sidebar (Govt/Pvt, Location, Fee slider, Accreditation), clear search |
| `/colleges/[slug]` | Dark profile with dense tabs | **Editorial campus profile**, hero photography banner, sticky navigation, quick facts sidebar, verified fee & cutoff tables |
| `/wbjee-predictor` | Redirected/partial | **Dedicated Signature Product Page** (Mockup 4): Input recap card, Safe/Realistic/Ambitious match grouping, shortlist actions |
| `/counselling-simulator`| Simulator engine | Linked/mirrored to `/wbjee-predictor` with unified calculation logic |
| `/compare` | Comparison matrix | **Clean 3-college comparison table** (Mockup 5) with sticky headers, photo headers, blue fees, and rank rows |
| `/fee-calculator` | Missing / scattered | **New Dedicated Fee Calculator Tool** (Mockup 6) with interactive sliders, breakdown, and 4-year projection |
| `/guides` | Blog alias | **Clean Educational Content Library** (Mockup 7) with category pills and reading-time cards |
| `/guides/[slug]` | Blog slug | **Editorial Guide Article** (Mockup 8) with sticky Table of Contents and Key Highlights callout |
| `/counselling` | Contact redirect | **Dedicated Admission Guidance Page** (Mockup 9) with 4 value pillars and clean non-intrusive inquiry form |
| `/about`, `/methodology`, `/sources` | Basic pages | **Refined Trust & Methodology Pages** documenting provenance, editorial guidelines, and zero-brokerage policy |

---

## 4. Key UX & Design Deficits to Resolve
1. **Color Scheme Inversion:** Current dark aesthetic is replaced with a calming, trustworthy `#FAFBFD` soft ivory background with `#FFFFFF` cards, `#102A56` deep navy headings, `#1455B8` sapphire blue CTAs, and `#0F8B70` teal green indicators.
2. **Typography Standardization:** Headings set to **Plus Jakarta Sans**, body text to **Inter**, eliminating cramped line heights and awkward font sizes.
3. **Data Clarity:** All fees, ranks, and numerical values styled in calm sapphire blue and navy; red strictly reserved for system errors.
4. **Spacing & Information Density:** Generous 8px grid system, maximum container width of 1200px, 72–88px section spacing, eliminating cluttered marketing banners.
