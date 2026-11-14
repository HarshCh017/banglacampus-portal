# BengalCampus Design System Specification
**Version:** 3.0 (Sapphire Blue & Navy Edition)  
**Target:** 17–18 year-old West Bengal engineering aspirants & parents  

---

## 1. Color Tokens & Semantic Mappings

### Primary Palette
- **Deep Navy (`#102A56`):** Primary headings, header navigation links, footer surface, high-priority emphasis.
- **Sapphire Blue (`#1455B8`):** Primary buttons, interactive links, fee and rank numerical highlights.
- **Bright Blue (`#2563EB`):** Hover states, active indicator pills, realistic tier metrics.
- **Light Blue (`#EAF2FF`):** Hero badge backgrounds, table callout surfaces, subtle active selection states.
- **Soft Ivory (`#FAFBFD`):** Global page background (`bg-canvas`).
- **Pristine White (`#FFFFFF`):** Card surfaces, modal surfaces, floating panels (`bg-surface`).
- **Main Text (`#172033`):** Primary body copy, table cell text, card titles.
- **Muted Text (`#64748B`):** Supporting subtitles, dates, captions, metadata labels.
- **Border (`#E2E8F0`):** Card borders, input field borders, horizontal dividers.
- **Teal Green (`#0F8B70`):** "Safe" probability tier, "Government" college tags, "Verified" provenance chips.
- **Amber Gold (`#F4B740`):** "Ambitious" probability tier, fee total highlights, important deadlines.
- **Purple (`#7864C8`):** "Private" college tags, specialized category accents.

### Strict Non-Red Policy
Red is forbidden for normal numbers, tuition fees, cutoffs, ranks, and general statistics. Red is restricted exclusively to form validation errors (`#EF4444`) and genuine destructive actions.

---

## 2. Typography

- **Headings Font:** `Plus Jakarta Sans`, sans-serif (Weights: 600 SemiBold, 700 Bold, 800 ExtraBold)
- **Body & UI Font:** `Inter`, sans-serif (Weights: 400 Regular, 500 Medium, 600 SemiBold)
- **Numerical / Cutoff Ranks:** `Inter` with tabular figures (`tabular-nums`) or `JetBrains Mono`

### Type Scale
| Level | Desktop | Mobile | Line Height | Weight |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | 56px | 36px | 1.15 | 800 |
| **H1** | 42px | 32px | 1.20 | 700 |
| **H2** | 32px | 26px | 1.25 | 700 |
| **H3** | 22px | 20px | 1.30 | 600 |
| **Card Heading** | 18px | 17px | 1.35 | 600 |
| **Body Primary** | 16px | 15px | 1.60 | 400 |
| **Caption / Small** | 13px | 12px | 1.50 | 500 |

---

## 3. Spacing & Elevation System
- **Maximum Container Width:** `1200px` (`max-w-6xl` / `max-w-7xl` centered)
- **Desktop Page Horizontal Padding:** `32px` (`px-8`)
- **Mobile Page Horizontal Padding:** `16px` (`px-4`)
- **Desktop Section Gap:** `72px–88px` (`py-16` / `py-20`)
- **Mobile Section Gap:** `44px–56px` (`py-10` / `py-12`)
- **Card Padding:** `24px` desktop (`p-6`), `18px–20px` mobile (`p-4.5`)
- **Card Corner Radius:** `16px` (`rounded-2xl`)
- **Button Corner Radius:** `10px` (`rounded-[10px]`)
- **Input Height:** `48px–52px` (`h-12` / `h-13`)

### Elevation & Shadows
- **Card Base:** `shadow-sm border border-[#E2E8F0]`
- **Card Hover:** `hover:shadow-md hover:border-[#CBD5E1] transition-all duration-200`
- **Predictor Hero Card:** `shadow-xl shadow-slate-200/50 border border-[#E2E8F0]`
