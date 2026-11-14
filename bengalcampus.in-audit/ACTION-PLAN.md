# Prioritized SEO Action Plan: BengalCampus

This action plan outlines the targeted steps to elevate BengalCampus from **92/100 (A)** to **98/100 (A+)**.

---

## Phase 1: Critical & Quick Wins (Immediate / Day 1)

### 1. Align Vercel Primary Domain with Codebase Canonicals
- **Impact**: Eliminates canonical mismatch warning across 104 indexed pages.
- **Effort**: 2 minutes (no code change required).
- **Steps**:
  1. Open [Vercel Dashboard](https://vercel.com) $\rightarrow$ Your Project $\rightarrow$ **Settings** $\rightarrow$ **Domains**.
  2. Locate `bengalcampus.in` and set it as the **Primary Domain**.
  3. Locate `www.bengalcampus.in` $\rightarrow$ click **Edit** $\rightarrow$ set to **Redirect to bengalcampus.in**.

### 2. Shorten Homepage Meta Title
- **Impact**: Prevents mobile SERP truncation.
- **Effort**: 2 minutes.
- **Action**: Update `src/app/layout.tsx` title default from 71 chars down to 53 chars:
  `BengalCampus | West Bengal Colleges & WBJEE Predictor`

---

## Phase 2: On-Page & Performance Polish (Week 1)

### 3. Tighten College Meta Descriptions
- **Impact**: Optimal snippet display without ellipsis on Google Desktop & Mobile.
- **Effort**: 15 minutes.
- **Action**: In `src/app/colleges/[slug]/page.tsx`, trim description template to 150-155 characters:
  `Verified WBJEE 2026 cutoffs, tuition fees, seats, and NIRF rank for ${college.shortName} (Code #${college.wbjeebCode}). Strategic benchmarks for 2026/27 choice filling.`

### 4. Add Explicit Image Dimensions to College Cards
- **Impact**: Guarantees zero Cumulative Layout Shift (CLS) on dynamic image loads.
- **Effort**: 30 minutes.
- **Action**: Ensure `<Image>` components in `CollegeCard.tsx` include explicit `width={400}` and `height={225}` with `aspect-video`.

---

## Phase 3: Authority & Search Console Indexation (Weeks 2–4)

### 5. Google Search Console & IndexNow Submission
- **Impact**: Accelerates discovery of the 3 newly published WBJEE 2026 guides.
- **Effort**: 15 minutes.
- **Action**:
  1. Submit `https://bengalcampus.in/sitemap.xml` in Google Search Console.
  2. Trigger the built-in IndexNow endpoint `/api/indexnow` to ping Bing and Yandex.

### 6. External Backlink Building & School Partnerships
- **Impact**: Boosts Domain Authority for competitive ranking queries.
- **Action**: Engage with West Bengal higher secondary schools and educational forums for contextual editorial citations.
