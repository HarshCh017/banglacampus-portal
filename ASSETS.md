# ASSET LOG, LICENSING & MEDIA CITATIONS
**System**: I.E.M B.Tech Admission Acquisition System  
**Academic Cycle**: 2026–2027  
**Compliance Standard**: Section 11.2 Imagery & Section 18 Documentation Contract  
**Document Version**: 1.0 (Final)  
**Last Updated**: 2026-09-18  

---

## 1. DESIGN ASSET & IMAGERY POLICY

In strict accordance with **Section 0.0 Red Line #1** and **Section 11.2 (Imagery)**:
1. **No Fabricated AI Campus Imagery**: The system does NOT render synthetic AI-generated photos of mock classrooms, labs, or students that could mislead candidates into believing they represent the physical Ashram or Gurukul campuses.
2. **Lightweight Vector & CSS Textures**: Background depth and visual appeal are engineered via pure CSS mathematics (`.engineering-grid` linear gradients), ensuring zero external image payload and instant first-contentful paint.
3. **Verified Primary Media Directory**: All brand symbols, logos, and campus blueprints reference audited official channels or licensed vector packages.

---

## 2. ASSET INVENTORY & LICENSING REGISTER

| Asset Name | Asset Type | File Path / Implementation | License | Source / Provenance | Descriptive Accessibility Alt Text |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **IEM Institutional Emblem** | SVG / CSS Component | `src/components/Header.tsx`, `Footer.tsx` | Permitted Fair Use / Institutional Identification | Official IEM Emblem representation | "Institute of Engineering & Management (IEM) Kolkata Official Seal & Logo" |
| **Lucide Icon Library** | Vector SVG Icons (Tree-shaken) | `node_modules/lucide-react` | MIT License | Lucide Open Source Project (lucide.dev) | Decorative / Functional icon labels via aria-hidden and enclosing text |
| **Plus Jakarta Sans** | Display Font Family | `next/font/google` (Self-hosted SSR) | SIL Open Font License 1.1 | Tokotype / Google Fonts repository | N/A (Typography) |
| **Inter** | Body Typography Family | `next/font/google` (Self-hosted SSR) | SIL Open Font License 1.1 | Rasmus Andersson / Google Fonts | N/A (Typography) |
| **JetBrains Mono** | Code & Metadata Font | `next/font/google` (Self-hosted SSR) | SIL Open Font License 1.1 | JetBrains s.r.o. | N/A (Typography) |
| **Engineering Grid Texture** | Pure CSS Vector Mathematics | `src/app/globals.css` (`.engineering-grid`) | Proprietary Implementation | Custom linear-gradient CSS grid | N/A (Pure CSS visual background) |
| **NAAC 'A' Grade Badge** | Vector Icon + Text Badge | `src/components/TrustStrip.tsx` | Informational Public Domain | NAAC Accreditation Records | "NAAC Grade A Accreditation Verification Badge" |
| **AICTE Approval Seal** | Vector Shield + Caption | `src/components/TrustStrip.tsx` | Informational Public Domain | AICTE New Delhi Regulatory Charter | "AICTE Approved Engineering Institute Emblem" |

---

## 3. OPERATOR REAL PHOTOGRAPHY UPLOAD GUIDE

When the site operator or IEM admission team supplies authentic, authorized high-resolution photography from the Ashram and Gurukul campuses:

1. **Storage Location**: Place optimized WebP / AVIF files in `public/images/campus/`.
2. **Required Dimensions**:
   - Campus Hero: $1920 \times 1080\text{px}$, quality 80, target file size $\le 95\text{KB}$.
   - Department Labs: $800 \times 600\text{px}$, target file size $\le 45\text{KB}$.
   - Classrooms: $800 \times 600\text{px}$, target file size $\le 45\text{KB}$.
3. **Mandatory Metadata**:
   - Building name (Ashram / Gurukul / Management House).
   - Room number or specific laboratory name (e.g. *CSE Cloud Computing Lab 304*).
   - Year photographed (e.g. *2025*).
   - Photographer consent / Institutional copyright clearance.
