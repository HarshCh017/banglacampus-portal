# LEAD QUALITY, DATA MINIMIZATION & RETENTION POLICY
**System**: I.E.M B.Tech Admission Acquisition System  
**Academic Cycle**: 2026–2027  
**Compliance Standard**: Digital Personal Data Protection Act (DPDP), 2023 & Section 9 Lead Specification  
**Document Version**: 1.0 (Final)  
**Last Updated**: 2026-09-18  

---

## 1. DATA MINIMIZATION CONTRACT

The lead acquisition interface adheres strictly to **Section 9 of the Operating Contract**:
- **Field Limit**: Exactly **four (4)** user-input fields plus **one (1)** disambiguation modifier.
- **No Extraneous Fields**: No collection of email addresses, city, pin code, category/caste, religion, family income, board name, year of passing, or health data.
- **No Inferred Sensitive Attributes**: The system never infers or profiles candidates on financial distress, demographic vulnerability, or religious/social classifications.
- **Pessimistic Storage**: Unvalidated or non-consented submissions are rejected prior to persistence.

---

## 2. FORM FIELDS SPECIFICATION & PURPOSE

| Field Name | Type | UI Label | Mandatory | Validation Regex / Rule | Business & Counselling Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `fullName` | `string` | Full Name | **YES** | `^[a-zA-Z\s\.\-']{2,80}$` | Identifies candidate for counsellor conversation, parent greeting, and cross-matching with exam registration roll. |
| `phone` | `string` | Mobile Number | **YES** | `/^[6-9]\d{9}$/` (stored as `+91XXXXXXXXXX`) | Primary contact channel for scheduled counsellor callback and official WhatsApp handbook dispatch. |
| `twelfthPercentage` | `number` | Class 12th Percentage | **YES** | Float between `0.00` and `100.00` (max 2 decimals) | Evaluated against published AICTE / IEM cutoff guidelines to produce preliminary indication. |
| `percentageType` | `enum` | Percentage Type Modifier | **YES** | `'Aggregate' \| 'PCM'` | Disambiguates whether marks represent total board score or Physics + Chemistry + Maths aggregate. |
| `branch` | `string` | Desired B.Tech Branch | **YES** | Must match verified branch slug in `VERIFIED_BRANCHES` | Routes lead to specialized branch counsellor and delivers branch-specific curriculum syllabus. |
| `consent` | `boolean` | Privacy Checkbox | **YES** | Must be explicitly checked (`true`) | Establishes affirmative legal consent under DPDP Act 2023 for admission-related communications. |

---

## 3. ATTRIBUTION & SESSION METADATA

The system captures technical attribution context silently without increasing user form friction:

| Metadata Field | Source / Origin | Example Value | Utility |
| :--- | :--- | :--- | :--- |
| `idempotencyKey` | Client `sessionStorage` | `iem_1726617600_ab39f1z` | Prevents duplicate records on accidental double-click or network retry. |
| `sourceCtaId` | Component prop | `hero-primary-form` / `branch-finder` | Identifies which section/CTA motivated the visitor to request guidance. |
| `landingPage` | `window.location.pathname` | `/`, `/apply`, `/courses/cse` | Records the page entry point for funnel conversion rate optimization. |
| `referrer` | `document.referrer` | `https://google.com` | Captures organic search vs external portal referral sources. |
| `utm_source` | URL Search Param | `google`, `facebook`, `education-fair` | Identifies acquisition campaign channel. |
| `utm_medium` | URL Search Param | `cpc`, `organic`, `referral` | Distinguishes paid vs organic attribution. |
| `utm_campaign` | URL Search Param | `iemjee_2026_phase1` | Measures specific marketing campaign performance. |
| `consentTimestamp` | Server ISO 8601 | `2026-09-18T00:30:00.000Z` | Audit proof of when consent was provided. |
| `consentVersion` | System Constant | `v1.0-2026-09` | Tracks exact terms & privacy policy version consented to. |
| `eligibilityResult` | Engine Evaluation | `POSSIBLY_MEETS` / `REVIEW_REQUIRED` | Informs counsellor of applicant's preliminary criteria indication before calling. |

---

## 4. DATA RETENTION & PURGE SCHEDULE

In accordance with Indian DPDP Act guidelines and admission cycle timelines:

1. **Active Cycle Retention (180 Days)**:
   - Lead records are maintained in active CRM / fallback storage for the duration of the 2026–27 academic intake (ending October 31, 2026).
   - Used solely for counselling callbacks, document verification reminders, and admission notifications.

2. **Cycle Archival (Post-Admission)**:
   - Non-enrolled applicant records are automatically de-identified (phone and name hashed) after 180 days.
   - Aggregate statistical metrics (percentage distribution, branch demand ratios) are retained for capacity planning without PII.

3. **User Deletion Requests (Right to Erasure)**:
   - Any applicant or parent may request immediate deletion of their data by emailing `admissions@iem.edu.in` with the subject line *"Data Erasure Request"*.
   - Counsellors are obligated to process deletions within 48 business hours and confirm via SMS/email.

4. **Security & Access Control**:
   - Access to `data/leads.json` and CRM webhooks is restricted to authorized admission desk personnel.
   - Lead exports are prohibited from storage on unencrypted external media.
