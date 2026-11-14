# BengalCampus — Agent Operations & Governance Standard

**Precedence**: Patch v1.1 > Execution Prompt v1.0 > Redesign Prompt.  
Security, student privacy, and regulatory data integrity always outrank visual or growth goals.

---

## 1. Single Source of Truth & Session Scope
- **Work ONE milestone per session**. Read `AGENTS.md` and `docs/PROGRESS.md` before starting.
- Never advance to the next milestone without explicit owner confirmation.
- Keep changes scoped strictly to the current milestone.

---

## 2. Student Privacy & Data Safety (Patch v1.1 §P3 & §P4)
- **Student Accounts**: DISABLED. Students explore, compare, and predict anonymously. Shortlists live in browser `localStorage`.
- **Authentication**: Restricted EXCLUSIVELY to verified staff (admin/counsellors) via Google OAuth with server-side allowlists (`ADMIN_EMAILS`, `COUNSELLOR_EMAILS`).
- **Data Protection**: Never read, print, log, or export real student inquiries from production Sheets or databases. Use synthetic test fixtures only.
- **Email Security**: All user-provided fields in outbound alert emails MUST be HTML-escaped.

---

## 3. Regulatory Data Integrity (Patch v1.1 §P6)
- **Zero Fabrication**: Never invent colleges, cutoff ranks, fees, seat counts, or accreditations.
- Data requires source citation, publication date, and verification status (`official`, `transcribed`, `unavailable`).
- Profiles with unverified data must display "not yet verified" and set `noindex` if below completeness threshold.
- Campus imagery: Owned, licensed, or properly attributed photos only. Never present AI imagery as real campuses.

---

## 4. Design System & Token Standard (Patch v1.1 §P2)
- **Palette**: Navy `#102A56` (nav, headings, numbers), Sapphire `#1455B8` (primary buttons, links), Bright Blue `#2563EB` (active states), Light Blue `#EAF2FF` (highlights), Background `#FAFBFD`, Surface `#FFFFFF`, Border `#E2E8F0`.
- **Verified Badges**: Text `#0B7A62` (passes WCAG AA 4.5:1), Fill `#0F8B70` (for white text).
- **Amber**: `#F4B740` (backgrounds with navy text only; never amber text on white).
- **Red Policy**: Contrast-tested red is strictly for form validation errors and destructive actions. Never use red for normal cutoffs, fees, ranks, stats, or decoration.
- **Typography**: Plus Jakarta Sans (headings), Inter (body/UI).
- **No Scroll Hijacking**: Lenis, smooth-wheel overrides, and heavy WebGL hero effects are prohibited.

---

## 5. Predictor Governance (Patch v1.1 §P7)
- **Tiers**: Safer, Possible, Ambitious (or Safe, Realistic, Ambitious).
- Every group must include a deterministic, factual sub-label (e.g. "Your rank is within the closing rank for this category, round and year"). Never display percentages or "chance" calculations.
- Homepage widget asks for **Rank** and **Category** only. All other parameters live on `/wbjee-predictor`.
- Choice order strictly respects student preference order, never forced risk ordering.

---

## 6. Integrations & Tracking (Patch v1.1 §P5)
- **Analytics**: Google Analytics MUST be gated behind explicit cookie consent (`bengalcampus_consent_v1`). Remove ranks, names, and PII from event payloads.
- **Enquiry Modal**: Auto-triggering popups are forbidden. Modals must be strictly user-initiated.
- **Webhooks**: Sheets webhook dispatches must send authorization secret headers and require positive JSON confirmation to prevent false "synced" status.

---

## 7. Approval Gates
Owner confirmation is mandatory before:
1. Adding major dependencies or external libraries.
2. Enabling any paid cloud service or third-party API.
3. Changing live integration endpoints or schemas.
4. Sending notifications to real students.
