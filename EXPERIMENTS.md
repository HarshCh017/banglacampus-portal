# CONVERSION RATE OPTIMIZATION (CRO) EXPERIMENTATION PLAN
**System**: I.E.M B.Tech Admission Acquisition System  
**Academic Intake Cycle**: 2026–2027  
**Objective**: Systematically maximize Qualified Lead Volume without violating truth, privacy, or performance constraints.  
**Document Version**: 1.0 (Final)  
**Last Updated**: 2026-09-18  

---

## 1. EXPERIMENTATION PRINCIPLES & GUARDRAILS
1. **Red Line Guarantee**: No experiment may introduce fabricated scarcity ("Only 2 seats left!"), fake countdowns, unverified placement metrics, or guaranteed admission language.
2. **Form Invariance**: The 4-field core structure (`fullName`, `phone`, `twelfthPercentage` + `percentageType`, `branch`, and `consent`) remains invariant across tests unless explicitly approved.
3. **Statistical Rigor**: Minimum sample size of 1,500 unique visitors per variant, evaluated at 95% statistical confidence ($p < 0.05$).
4. **Primary KPI**: Counsellor-Qualified Lead Conversion Rate ($\text{CQLR} = \frac{\text{Qualified Leads}}{\text{Unique Visitors}}$), not merely raw clicks.

---

## 2. RANKED EXPERIMENTS BACKLOG (BY EXPECTED LIFT)

### Experiment 1 (Rank 1): Hero Value Proposition: Academic Autonomy vs Placement Hub
- **Target Page**: `/` (Homepage Hero)
- **Persona Addressed**: Persona 2 (Parent 40–55) vs Persona 1 (Student 17–19)
- **Hypothesis**: For parents evaluating private engineering colleges, leading with *"West Bengal's Pioneer Autonomous Engineering Institution under MAKAUT"* generates 18% higher qualified lead completion than leading with generic placement superlatives, because degree legitimacy and curriculum rigor address their primary anxiety.
- **Variant A (Control)**: Current Hero Headline: *"Secure Your B.Tech Future at I.E.M. Kolkata — West Bengal's premier autonomous engineering institution in Salt Lake Sector V"*.
- **Variant B (Challenger)**: *"Pioneering Autonomous Engineering Since 1989 — Approved by AICTE, NAAC 'A' Grade, and Located in Kolkata's Sector V IT Hub"*.
- **Measurement**:
  - Primary Metric: Lead form completion (`lead_submitted`).
  - Secondary Metric: Phone call clicks (`counsellor_contact_clicked`).
  - Tracking: `trackEvent('lead_submitted', { experiment_id: 'exp_01', variant: 'A' | 'B' })`.

---

### Experiment 2 (Rank 2): Real-Time Indication Visual Affirmation
- **Target Component**: `LeadCaptureForm.tsx`
- **Persona Addressed**: Persona 1 (High School Student with borderline or strong scores)
- **Hypothesis**: Showing an explicit visual green badge (`POSSIBLY_MEETS: Meets Published Baseline`) with transparent disclosure before the submit button reduces abandonment on Field 3 by 14%, because anxious applicants hesitate when they don't know whether their marks are competitive.
- **Variant A (Control)**: Standard indication alert box with text and disclaimer.
- **Variant B (Challenger)**: Enhanced badge with visual meter showing distance from baseline + micro-copy: *"Your score indicates eligibility for review in IEMJEE Phase 1"*.
- **Measurement**:
  - Primary Metric: Field 3 touch $\to$ Form submission completion rate.
  - Guardrail: Must never say "You are eligible" or "Guaranteed admission".

---

### Experiment 3 (Rank 3): Mobile Sticky Bar Primary Action: WhatsApp vs Direct Phone Dialer
- **Target Component**: `MobileStickyBar.tsx` (Mobile devices $\le 768\text{px}$)
- **Persona Addressed**: Persona 1 (Student 17–19, mobile-first)
- **Hypothesis**: Students aged 17–19 overwhelmingly avoid voice phone calls with unknown numbers due to phone anxiety, preferring asynchronous messaging. Emphasizing WhatsApp as the prominent primary button on mobile will increase outbound counsellor contacts by 35%.
- **Variant A (Control)**: Equal button widths (Call, WhatsApp, Get Guidance).
- **Variant B (Challenger)**: WhatsApp button given primary visual weight (emerald green, 50% width), with Call and Guidance sharing 25% each.
- **Measurement**:
  - Primary Metric: Total contact intent (`whatsapp_enquiry_clicked` vs `counsellor_contact_clicked`).
  - Secondary Metric: Inbound WhatsApp conversation start rate.

---

### Experiment 4 (Rank 4): Percentage Disambiguation UX (Pill Switcher vs Native Radios)
- **Target Component**: `LeadCaptureForm.tsx` (Field 3 Modifier)
- **Persona Addressed**: All Personas
- **Hypothesis**: Replacing standard radio buttons with full-width segmented interactive pill buttons (e.g. `[ Overall Aggregate % ]` / `[ PCM Only % ]`) reduces input friction on mobile touchscreens and eliminates accidental miss-clicks by 22%.
- **Variant A (Control)**: Inline radio buttons with small tap targets.
- **Variant B (Challenger)**: High-contrast toggle pill bar with 44px minimum tap target height compliant with WCAG 2.5.5.
- **Measurement**:
  - Primary Metric: Percentage type selection rate before submit.
  - Secondary Metric: Mobile field validation error rate on Field 3.

---

### Experiment 5 (Rank 5): Branch Finder Placement: Above vs Below Programs Grid
- **Target Page**: `/` (Homepage Section Sequencing)
- **Persona Addressed**: Persona 1 (Undecided student comparing CSE specializations)
- **Hypothesis**: Positioning the interactive Branch Finder directly above the static Programs Grid engages undecided visitors earlier in the conversion journey, increasing downstream branch inquiries by 15%.
- **Variant A (Control)**: Branch Finder positioned after Campus Preview (Section 11).
- **Variant B (Challenger)**: Branch Finder positioned before Programs Grid (Section 4).
- **Measurement**:
  - Primary Metric: Branch Finder track interactions.
  - Secondary Metric: Clicks on "Inquire Branch" routing to `#lead-form`.

---

## 3. EXPERIMENTATION ROADMAP

| Phase | Test Window | Target Test | Sample Target | Deployment Method |
| :--- | :--- | :--- | :--- | :--- |
| **Q1 (Pre-Board)** | Jan 15 – Feb 15 | Exp 1 (Hero Value Prop) | 4,000 users | Edge Middleware Split |
| **Q2 (Exam Season)** | Feb 16 – Mar 31 | Exp 3 (Mobile WhatsApp vs Call) | 6,000 users | Client Component Switcher |
| **Q3 (Result Window)**| Apr 01 – May 30 | Exp 2 (Indication Affirmation) | 10,000 users | Server-Driven Experiment Flag |
| **Q4 (Counselling)** | Jun 01 – Jul 15 | Exp 4 & Exp 5 (UX & Sequencing) | 8,000 users | GTM Event Trigger |
