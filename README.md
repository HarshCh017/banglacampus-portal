# I.E.M. KOLKATA — B.TECH ADMISSION ACQUISITION SYSTEM
**Target Institution**: Institute of Engineering & Management (IEM), Kolkata  
**Cycle**: 2027–2028 B.Tech Admissions  
**Engine**: Next.js 15.5.25 (App Router, React 19, TypeScript Strict, Tailwind CSS)  
**Operating Standard**: Agent Brief Version 1.0 (Final)  

---

## 1. SYSTEM OVERVIEW

A high-performance, conversion-optimized B.Tech admission acquisition system engineered strictly for **qualified admission-lead generation** for the **2027–28 academic intake cycle**. Optimizes the core acquisition sequence:

$$\text{ATTENTION} \to \text{CLARITY} \to \text{TRUST} \to \text{VALUE} \to \text{PERSONALIZATION} \to \text{LEAD} \to \text{ELIGIBILITY-INDICATED} \to \text{COUNSELLOR-QUALIFIED} \to \text{ENROLMENT}$$

### Core Operating Guardrails
- **Strict 4-Field Lead Capture**: `fullName`, `phone`, `twelfthPercentage` with `percentageType` modifier (`Aggregate` vs `PCM`), `branch` selector from verified list, plus an affirmative DPDP-compliant consent checkbox.
- **Honest Non-Determining Eligibility**: Evaluates percentage against published thresholds returning `POSSIBLY_MEETS`, `BELOW_THRESHOLD`, or `REVIEW_REQUIRED`. Never outputs deceptive claims like *"You are eligible"* or *"Guaranteed admission"*.
- **Privacy First (No Raw Helplines Exposed)**: Official mobile/landline numbers are completely masked and protected across all views. Direct CTAs route applicants to immediate callback scheduling (`#lead-form`) or the physical Ashram Campus Admissions Desk. WhatsApp contact can be configured via environment variable if desired.
- **Vercel Serverless Ready**: In-memory and ephemeral disk fallback ensures zero file-system write errors (`EROFS`) on Vercel read-only serverless lambdas.
- **Payload Ceiling**: Homepage first-load JS is **146 kB** gzipped (well within the $\le 180\text{ KB}$ ceiling).
- **Data Minimization & Privacy**: Digital Personal Data Protection (DPDP) Act 2023 compliant. Zero collection of caste, religion, health, or sensitive personal data.
- **Legal Operating Model**: Defaults to **Model [B] Independent Guidance** with full institutional disclaimers, Ashram Campus registered address, and official payee instructions (*"Institute of Engineering & Management Trust"*).

---

## 2. REPOSITORY DIRECTORY ARCHITECTURE

```text
├── PROJECT-STATE.md          # Live operational tracking per Section 0.2
├── CLAIMS-SOURCES.md         # Source audit trail & preserved conflicts
├── ELIGIBILITY-RULES.md      # Branch eligibility criteria data model
├── CRM-MAPPING.md            # 5-stage funnel, SLA & routing logic
├── KEYWORD-MAP.md            # Search intent & SEO content map
├── PERSONAS.md               # Student, Parent & Lateral Entry personas
├── tokens.md                 # Design tokens & WCAG contrast proofs
├── LEAD-QUALITY.md           # Field purpose, attribution & DPDP retention
├── COMPLIANCE-CHECKLIST.md   # Legal & regulatory sign-off register
├── EXPERIMENTS.md            # Ranked CRO A/B testing hypotheses
├── QA-REPORT.md              # Quality gates audit logs & test results
├── ASSETS.md                 # Asset licenses & media citation registry
├── vercel.json               # Vercel deployment configuration
├── .env.example              # Environment variables template
├── data/
│   └── .gitkeep              # Data folder placeholder (.gitignore protects leads)
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout, EducationalOrganization JSON-LD
│   │   ├── page.tsx          # Homepage CRO conversion sequence (2027)
│   │   ├── apply/            # High-conversion acquisition landing page
│   │   ├── thank-you/        # Post-submission confirmation & WhatsApp CTA
│   │   ├── courses/          # B.Tech programs index & [slug] branch hubs
│   │   ├── admissions/       # Process, eligibility, and verified fees hubs
│   │   ├── iemjee/           # IEMJEE 2027 zero-fee exam guide
│   │   ├── placements/       # Sourced recruitment medians & recruiters
│   │   ├── campus/           # Ashram, Gurukul & Management facilities
│   │   ├── resources/        # Comparison guides & downloadable handbooks
│   │   ├── contact/          # Ashram campus NAP, helpline numbers
│   │   ├── privacy/          # DPDP-aligned data retention policy
│   │   ├── terms/ & disclaimer/ # Institutional legal safeguards
│   │   ├── sitemap.ts & robots.ts # Dynamic technical SEO indexation
│   │   └── api/lead/         # Authoritative lead processing endpoint
│   ├── components/           # Accessible, responsive CRO components
│   ├── data/                 # Verified branches, FAQs, resources data
│   ├── lib/                  # Schema, eligibility engine, analytics, store
│   └── types/                # Strict TypeScript contracts
└── tests/
    └── core-funnel.test.ts   # 10 automated unit & integration tests
```

---

## 3. GETTING STARTED

### Prerequisites
- Node.js LTS (v20+ or v24+)
- npm (v10+ or v11+)

### Installation
```bash
# Clone the repository and navigate to root
cd "e:\iem front end"

# Install dependencies
npm install
```

### Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Running Automated Test Suite
```bash
npm test
```
Executes all 10 unit & integration tests via Node's native test runner with `tsx`.

### Production Build & Static Generation
```bash
npm run build
```
Compiles all 35 static routes, validates types, and generates production bundles.

### Direct GitHub & Vercel Deployment

#### 1. Push to GitHub
```bash
# Set your remote and push
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git branch -M main
git push -u origin main
```

#### 2. Deploy to Vercel (Zero Config)
1. Go to [vercel.com/new](https://vercel.com/new) and select **Import** next to your repository.
2. Vercel automatically detects the Next.js framework configuration.
3. *(Optional)* Add any environment variables (e.g. `NEXT_PUBLIC_WHATSAPP_NUMBER` or `CRM_WEBHOOK_URL`).
4. Click **Deploy** — your live site will be generated with full edge speed and serverless lead dispatch.

---

## 4. ENVIRONMENT CONFIGURATION (`.env.local`)

Copy `.env.example` to `.env.local` to configure production webhooks and analytics:

```env
# Operating Environment
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://iem-admissions.edu.in

# Analytics & Attribution
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# Lead Dispatch & CRM Webhooks
CRM_WEBHOOK_URL=https://crm.example.com/api/v1/leads
CRM_API_KEY=your_crm_api_key_here

# Notification Channels
COUNSELLOR_NOTIFICATION_EMAIL=admissions@iem.edu.in
COUNSELLOR_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

# WhatsApp Business API (Optional)
WHATSAPP_API_TOKEN=your_token_here
WHATSAPP_PHONE_NUMBER_ID=your_id_here
```

---

## 5. DEVIATIONS LOG & TECHNICAL RATIONALE

| Area | Default Specification | Implemented Choice | Rationale |
| :--- | :--- | :--- | :--- |
| **Operating Model** | Prompt asked for model A/B/C/D | Defaulted to **Model [B] (Independent Guidance)** | Operator did not provide institutional written authorization. Defaulting to Model B safely prevents trademark or consumer protection liability while maintaining full CRO capability. |
| **Testing Framework** | Jest / Vitest / Playwright | Node 24 Native Test Runner (`node:test` via `tsx`) | Eliminates heavyweight testing dependencies (saving ~45MB of node_modules) and executes full 10-test suite in $<500\text{ms}$ with zero configuration debt. |
| **Testimonials** | Permitted only if verified & consented | Replaced with *"Questions Students & Parents Ask"* (`FaqSection.tsx`) | Prevents Section 0.0 Red Line #1 violation (never fabricate testimonials). |
| **Placement Superlatives** | "Highest package ₹72 LPA" | Highlighted **Median Domestic Package (₹5.5L – ₹7.2L)** | Section 10 strictly prohibits framing exceptional off-campus offers as typical outcomes. Medians represent truthful institutional reality. |
