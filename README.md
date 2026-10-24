# BanglaCampus — Engineering College Discovery & Admissions Platform

**Official Repository**: [https://github.com/HarshCh017/banglacampus-portal](https://github.com/HarshCh017/banglacampus-portal)  
**Live Application**: [https://banglacampus.in](https://banglacampus.in)  
**Technology Stack**: Next.js 15.5.25 (App Router), React 19, TypeScript (Strict), Tailwind CSS, Lucide Icons, Zod  

---

## 1. Overview

**BanglaCampus** is an independent, evidence-backed college discovery, comparison, and student admissions guidance platform for engineering aspirants across West Bengal.

The platform provides complete transparency on WBJEE seat matrices, verified tuition fees, AICTE/NAAC/NIRF regulatory accreditations, historical opening and closing cutoffs, and 1-on-1 counseling consultation for **20 accredited engineering institutions** in West Bengal.

### Key Capabilities

- **Institutional Directory (20 Verified Campuses)**: Filter and search across government engineering colleges, state universities (Jadavpur, Kalyani), and premier autonomous private institutions with verified fee structures and intake capacities.
- **Verified Photographic Campus Registry**: High-resolution, authentic campus building photography and multi-category architectural galleries (Campus, Academic, Labs, Libraries).
- **Interactive Horizontal Campus Reel**: Direct visual showcase on the homepage with smooth horizontal scroll buttons, progress indicator, and 1-click college profile links.
- **Interactive WBJEE Choice Filling Simulator**: Rank-based predictive allocation engine classifying colleges into *Ambitious*, *Competitive*, and *Safe* tiers.
- **Side-by-Side College Comparison Matrix**: Compare up to 3 colleges simultaneously across tuition fees, NIRF rankings, NAAC grades, hostels, and accepted exams.
- **Student Enquiry & Consultation Modal**: Full-screen, mobile-responsive data collection modal appearing after 5 seconds or via 1-click consultation triggers.
- **Floating Sticky "Free Consultation" Action**: Permanently docked to the right edge across every page with warm complementary amber styling, live counselor indicator, and smooth hover effects.
- **Real-Time Data Integration**:
  - Direct sync to **Google Sheets** via Google Apps Script Webhook.
  - Automated transactional email alerts to **`hc8986234943@gmail.com`** on every new lead.
  - Local audit queue fallback ensuring zero data loss during network hiccups.

---

## 2. Quick Start (Local Development)

### Prerequisites

- **Node.js**: v20+ or v22+
- **npm**: v10+ or v11+
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/HarshCh017/banglacampus-portal.git
cd banglacampus-portal

# Install dependencies
npm install
```

### Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verification & Testing

```bash
# Run automated test suite (43/43 passing)
npm test

# Run data provenance audit
npm run audit

# Run TypeScript type check and linter
npx tsc --noEmit && npm run lint

# Build production bundle (82/82 routes)
npm run build
```

---

## 3. Deploying to Vercel (Step-by-Step Guide)

The project is pre-configured for zero-config deployment on **Vercel**.

### Step 1: Import Project into Vercel

1. Log into your Vercel account at [vercel.com](https://vercel.com).
2. Click **"Add New..."** → **"Project"**.
3. Select your GitHub repository: **`HarshCh017/banglacampus-portal`** and click **Import**.
4. Vercel automatically detects the **Next.js** framework.

### Step 2: Configure Environment Variables

In the **Environment Variables** section during project import (or under **Project Settings → Environment Variables**), configure the following values:

| Variable Name | Required | Description | Example Value |
| :--- | :---: | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Your deployed domain | `https://banglacampus-portal.vercel.app` |
| `AUTH_SECRET` | **Yes** | 32+ character signing key | `v9bK3x+M7wZ9Y0qJ6XpLt1u8R4FzQ2mK5hN3cT6vY1s=` |
| `GOOGLE_SHEETS_WEBHOOK_URL` | **Yes** | Google Apps Script Web App URL | `https://script.google.com/macros/s/AKfycb.../exec` |
| `ENQUIRY_NOTIFICATION_EMAIL` | **Yes** | Alert recipient for student leads | `hc8986234943@gmail.com` |
| `GOOGLE_CLIENT_ID` | Optional | Google OAuth 2.0 Client ID | `your-id.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Optional | Google OAuth 2.0 Client Secret | `your-client-secret` |
| `RESEND_API_KEY` | Optional | Direct transactional email API key | `re_123456789...` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`| Optional | Admissions WhatsApp desk | `919876543210` |

### Step 3: Deploy

Click **"Deploy"**. Vercel will build all 82 routes and assign a live production URL.

---

## 4. Google Sheets & Email Alert Setup

To connect submissions directly to your Google Sheet:

1. Create a new Google Sheet named **"BanglaCampus Student Enquiries"**.
2. Go to **Extensions → Apps Script**.
3. Paste the contents of [`scripts/google-apps-script.js`](scripts/google-apps-script.js).
4. Click **Deploy → New deployment → Web app**:
   - **Execute as**: *Me*
   - **Who has access**: *Anyone*
5. Copy the Web App URL and set it as `GOOGLE_SHEETS_WEBHOOK_URL` in Vercel.
6. Every new student entry will automatically append to the sheet and trigger an instant email alert to `hc8986234943@gmail.com`.

For full step-by-step instructions, see [`GOOGLE_SHEETS_SETUP.md`](GOOGLE_SHEETS_SETUP.md).

---

## 5. Repository Structure

```text
banglacampus-portal/
├── public/
│   ├── images/
│   │   └── colleges/          # Verified institutional campus photography (20 colleges)
│   ├── manifest.webmanifest   # Progressive Web App manifest
│   └── robots.txt & sitemap   # Technical SEO specifications
├── src/
│   ├── app/
│   │   ├── page.tsx           # Homepage with hero, carousel & comparison engine
│   │   ├── layout.tsx         # Root layout with floating consultation button
│   │   ├── colleges/          # Directory and dynamic [slug] detail pages
│   │   ├── compare/           # Multi-college comparison matrix
│   │   ├── counselling-simulator/ # Strategic choice filling predictor
│   │   ├── cutoffs/           # Historical WBJEE cutoff archives
│   │   ├── admin/             # Live sync desk & webhook testing console
│   │   └── api/
│   │       ├── enquiry/       # Lead capture & Google Sheets dispatch
│   │       ├── enquiry/sync/  # Offline queue processor
│   │       └── auth/          # JWT session authentication & Google OAuth
│   ├── components/            # Reusable UI component library
│   │   ├── CollegeCampusBanner.tsx     # Cinematic college profile hero banner
│   │   ├── CollegeCard.tsx             # Responsive college card with verified media
│   │   ├── CollegeShowcaseCarousel.tsx # Horizontal campus reel
│   │   ├── FloatingConsultationButton.tsx # Sticky Free Consultation action
│   │   └── StudentEnquiryModal.tsx     # 5-second & on-demand enquiry modal
│   ├── data/                  # Regulatory catalogs & photography registry
│   │   ├── colleges.ts        # 20 verified institutions with proven intake & fees
│   │   ├── collegePhotos.ts   # Authentic photo URLs, captions & attributions
│   │   └── cutoffs.ts         # WBJEE closing rank history
│   └── lib/                   # Core business logic, Google Sheets & auth services
├── tests/                     # 43 automated unit & integration test suites
├── scripts/                   # Provenance auditor & Google Apps Script
├── vercel.json                # Vercel deployment configuration
├── .env.example               # Complete environment variable template
└── package.json
```

---

## 6. License & Provenance

All institutional data conforms to regulatory filings with the **West Bengal Joint Entrance Examinations Board (WBJEEB)**, **All India Council for Technical Education (AICTE)**, and **National Institutional Ranking Framework (NIRF)**.
