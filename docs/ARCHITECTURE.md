# BengalCampus Architecture & Component Plan

## 1. Directory Structure

```
src/
├── app/
│   ├── layout.tsx                     # Root layout with Plus Jakarta Sans & Inter fonts
│   ├── page.tsx                       # Page 1: Homepage (Sapphire Blue, Hero + Predictor Card)
│   ├── colleges/
│   │   ├── page.tsx                   # Page 2: College Discovery (Left filter panel + cards)
│   │   └── [slug]/
│   │       └── page.tsx               # Page 3: College Profile (Photo banner, tabs, verified data)
│   ├── wbjee-predictor/
│   │   └── page.tsx                   # Page 4: Dedicated WBJEE Predictor (Grouped matches)
│   ├── counselling-simulator/
│   │   └── page.tsx                   # Unified redirect / alias to /wbjee-predictor
│   ├── compare/
│   │   └── page.tsx                   # Page 5: Compare Colleges (Side-by-side 3-college table)
│   ├── fee-calculator/
│   │   └── page.tsx                   # Page 6: Engineering Fee Calculator (4-year cost projection)
│   ├── guides/
│   │   ├── page.tsx                   # Page 7: Admission Guides Library (Category pills & cards)
│   │   └── [slug]/
│   │       └── page.tsx               # Page 8: Guide Article Detail (Sticky TOC & Key Highlights)
│   ├── counselling/
│   │   └── page.tsx                   # Page 9: Admission Guidance (4 Value pillars + Inquiry form)
│   ├── about/page.tsx                 # Trust & Independence
│   ├── methodology/page.tsx           # Cutoff & Ranking Methodology
│   ├── sources/page.tsx               # Primary Regulatory Sourcing
│   ├── contact/page.tsx               # Editorial Desk & Inquiries
│   ├── privacy/page.tsx               # Privacy Policy (DPDP Act 2023)
│   ├── terms/page.tsx                 # Terms of Service
│   └── disclaimer/page.tsx            # Regulatory Non-Affiliation Disclaimer
├── components/
│   ├── layout/Header.tsx              # Sapphire-Blue Navbar with Dropdowns & Search
│   ├── layout/Footer.tsx              # Deep Navy Footer with Sitemaps & Compliance Notes
│   ├── home/HeroPredictor.tsx         # Spacious hero with photography & predictor overlay
│   ├── home/TrustMetricsStrip.tsx     # Audited numbers only (20 colleges, 29 cutoffs)
│   ├── home/CategoryCards.tsx         # State Univs, Govt Colleges, Autonomous/Private
│   ├── home/FeaturedColleges.tsx      # 4 Spacious high-fidelity cards
│   ├── CollegeCard.tsx                # Horizontal card matching Mockup 2
│   └── StudentEnquiryModal.tsx        # User-initiated DPDP inquiry modal
└── data/
    ├── colleges.ts                    # 20 verified institutions with official data
    ├── cutoffs.ts                     # 29 verified WBJEE closing cutoffs
    └── guides.ts                      # Educational admission guides & articles
```

## 2. Shared State & Context
- `ComparisonContext`: Manages up to 3 selected colleges across routes with browser `localStorage` persistence.
- `AuthContext`: Strictly restricted to Admin and Counsellor staff. Student login is disabled.
- URL query parameters: Enable bookmarking and sharing of prediction results (e.g. `/wbjee-predictor?rank=4500&category=General`).

## 3. Data Methodology & Regulatory Provenance
1. **Accreditation & Approvals**: Verified from AICTE Mandatory Disclosures, NAAC Public Registry, and NIRF Engineering category listings.
2. **Tuition Fees**: Verified from West Bengal Fee Structure Committee (WBFSC) orders and official institution circulars.
3. **WBJEE Historical Cutoffs**: Sourced from official WBJEEB Centralized Counseling round archives (Round 1, Round 2, Decentralized Mop-up).
4. **Predictor Classification Logic**:
   - **Safe (Teal Green `#0F8B70`, Text `#0B7A62`)**: Historical closing rank $\ge 1.25\times$ student GMR. High historical alignment.
   - **Realistic (Bright Blue `#2563EB`)**: Historical closing rank within $0.90\times$ to $1.24\times$ student GMR. Competitive target.
   - **Ambitious (Warm Amber `#F4B740`)**: Historical closing rank between $0.70\times$ and $0.89\times$ student GMR. Reach option.
   - **Deterministic Rule**: All matches include factual sub-labels. Zero "chance" percentages.

## 4. Security & Privacy Architecture
- **DPDP Act 2023 Alignment**: Strict data minimization. Zero third-party tracker cookies without explicit opt-in.
- **Google Analytics**: Gated behind `bengalcampus_consent_v1`. Student rank and PII are scrubbed from event labels.
- **Email Security**: All student inputs are HTML-escaped before alert dispatch.
- **Sheets Webhook**: Dispatches authenticate via `x-webhook-secret` and require positive JSON confirmation.
