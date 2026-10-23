export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    title: string;
  };
  readTimeMinutes: number;
  tags: string[];
  content: string; // Markdown or rich formatted text
}

export const VERIFIED_ARTICLES: Article[] = [
  {
    slug: 'wbjee-2026-counselling-choice-filling-guide',
    title: 'WBJEE Choice-Filling Strategy: General vs TFW Quota and Decentralized Rounds',
    description:
      'A practical, step-by-step framework for ordering West Bengal engineering colleges in the WBJEE e-counselling portal without falling into common cutoff traps.',
    publishedAt: '2026-08-15T09:00:00Z',
    updatedAt: '2026-10-18T10:00:00Z',
    author: {
      name: 'BanglaCampus Editorial Desk',
      title: 'Higher Education Research Cell',
    },
    readTimeMinutes: 7,
    tags: ['WBJEE', 'Counselling', 'Admissions', 'TFW Quota'],
    content: `## The Strategic Significance of the Choice Order

In the West Bengal Joint Entrance Examinations (WBJEE) centralized e-counselling system, candidate choices are processed strictly sequentially from Option 1 downwards. If you are allotted Option 4 in Round 1, choices 5 and lower are automatically locked out for subsequent rounds. Therefore, your choice sheet must always reflect **true preference order**, rather than an arbitrary guess of what your rank can attain.

### 1. Understanding the Tuition Fee Waiver (TFW) Scheme
Under the AICTE TFW scheme, up to 5% supernumerary seats are allocated in each branch where the tuition fee is waived 100% for domiciled West Bengal candidates whose gross family annual income is below ₹2.5 Lakhs.
- Always place **TFW options above non-TFW options** of the same college and branch if you hold an authorized TFW certificate issued by a SDO, BDO, or designated officer.
- Example: Place *Jadavpur University CSE (TFW)* before *Jadavpur University CSE (General)*.

### 2. Tiered College Structuring
Group your selections into three distinct categories:
- **Reach Choices (Top 20%)**: Colleges and branches whose previous year Closing Ranks (GMR) were slightly higher than your rank (e.g., Jadavpur University FET, KGEC core branches).
- **Realistic Matches (Middle 50%)**: Programs where your General Merit Rank (GMR) falls comfortably within the Round 2/Mop-Up closing rank bands.
- **Safe Fallbacks (Bottom 30%)**: Established autonomous or government colleges where your rank is well ahead of previous closing records.

### 3. The Role of Decentralized Counselling
After official WBJEE centralized rounds conclude, government and private colleges announce institutional decentralized counselling rounds for vacant seats. Keep original domicile, rank cards, and class 12 marksheets verified in advance, as decentralized rounds often have short notice windows of 48 to 72 hours.
`,
  },
  {
    slug: 'autonomous-vs-makaut-affiliated-colleges',
    title: 'Autonomous vs Non-Autonomous Engineering Colleges in West Bengal: What It Means for Syllabus and Degree',
    description:
      'An objective breakdown of UGC autonomous status in West Bengal engineering colleges, how question papers are set, and who awards your final B.Tech degree.',
    publishedAt: '2026-07-22T08:30:00Z',
    updatedAt: '2026-10-14T11:00:00Z',
    author: {
      name: 'BanglaCampus Editorial Desk',
      title: 'Academic Accreditation Watch',
    },
    readTimeMinutes: 6,
    tags: ['MAKAUT', 'Autonomous Colleges', 'Academic Regulation', 'Curriculum'],
    content: `## What Does UGC Autonomous Status Entail?

When an engineering college in West Bengal is granted **Autonomous Status** by the University Grants Commission (UGC) with approval from the state government and MAKAUT, it gains the academic freedom to design its own curriculum and conduct internal examinations.

### Crucial Fact: Who Awards the Degree?
A common misconception among parents is that an autonomous private college awards its own independent degree. This is incorrect:
- An autonomous college (such as IEM Kolkata, Heritage Institute of Technology, or Haldia Institute of Technology) **remains affiliated with MAKAUT** (Maulana Abul Kalam Azad University of Technology, formerly WBUT).
- The final degree certificate is officially conferred by **MAKAUT**, bearing the university seal and noting the college of study.

### Key Differences at a Glance

| Feature | Autonomous College | Non-Autonomous Affiliated College |
| :--- | :--- | :--- |
| **Syllabus Design** | Formulated by internal Board of Studies; updated frequently | Standardized centralized MAKAUT curriculum |
| **Examination Papers** | Drafted and evaluated internally by department faculty & external examiners | Centralized semester papers issued by MAKAUT controller |
| **Academic Calendar** | Institutional semester schedule; less vulnerable to centralized delays | Governed strictly by centralized university notifications |
| **Degree Awarded By** | MAKAUT, West Bengal | MAKAUT, West Bengal |

### Is Autonomy an Indicator of Quality?
While autonomy allows colleges to integrate modern computing modules (such as cloud architectures, generative AI, or specialized robotics tracks) faster than a centralized university syllabus, candidates should still verify:
1. **NBA Accreditation** for specific branches.
2. **AICTE Extension of Approval (EoA)** for the current admission year.
3. Laboratory facilities and permanent faculty-to-student ratios.
`,
  },
  {
    slug: 'how-to-verify-aicte-naac-nba-accreditation',
    title: 'How to Audit College Claims: Verifying AICTE Extension of Approval, NBA, and NAAC Reports',
    description:
      'Avoid marketing traps by learning how to independently verify regulatory approvals, validity periods, and mandatory disclosures from central databases.',
    publishedAt: '2026-06-10T10:00:00Z',
    updatedAt: '2026-10-12T16:00:00Z',
    author: {
      name: 'BanglaCampus Editorial Desk',
      title: 'Regulatory & Compliance Team',
    },
    readTimeMinutes: 8,
    tags: ['AICTE', 'NBA', 'NAAC', 'Accreditation', 'Student Consumer Rights'],
    content: `## Why Independent Verification is Essential

Prospectuses and digital campaigns frequently display badges like "NAAC Accredited", "NBA Approved", or "AICTE Recognized". However, accreditations expire, and some apply only to specific branches rather than the entire campus. Here is how any applicant can audit these claims in five minutes.

### 1. Auditing AICTE Approval (Extension of Approval - EoA)
Every technical institution in India must renew its Extension of Approval annually with AICTE.
- Go to the official portal: \`aicte-india.org\` $\\to$ **Approved Institutes**.
- Select State (*West Bengal*) and District.
- Download the annual **Extension of Approval (EoA) Letter**.
- Check the approved intake column for each specific B.Tech program. If a branch is advertised with 180 seats but the EoA lists 120, only 120 are legally valid.

### 2. Checking NBA Accreditation (Program-Specific)
The National Board of Accreditation (NBA) evaluates **individual academic programs**, not the overall institution.
- Visit: \`nbaind.org\` $\\to$ **Accredited Programs**.
- Search for the college name.
- Check the **Validity Period** and the exact branch. For example, a college may have NBA accreditation for B.Tech CSE, while newly launched branches (such as AI or IoT) may not yet be eligible for NBA review because graduating batches are required first.

### 3. Checking NAAC Grade (Institutional)
The National Assessment and Accreditation Council (NAAC) assesses the entire university or college.
- Visit: \`naac.gov.in\`.
- Check the institutional grade (A++, A+, A, B++, etc.) and the validity expiration date.
- Review the CGPA on the 4-point scale (e.g., 3.25 or above corresponds to Grade A).

### 4. Mandatory Disclosure Documents
Under AICTE regulations, every approved engineering institution must publish a standard **Mandatory Disclosure** PDF on its official website homepage, detailing:
- Faculty profiles, qualifications, and designations.
- Exact fee breakdown approved by the state fee committee.
- Campus land area, laboratory equipment, and library holdings.
- Anti-ragging committee contacts and Ombudsman details.
`,
  },
  {
    slug: 'wb-scholarships-svmcm-credit-card-guide',
    title: 'West Bengal Engineering Scholarships & Credit Card: SVMCM, TFW, and WBSCC Guide',
    description:
      'Complete eligibility criteria, required documents, and application steps for the ₹60,000/yr Swami Vivekananda scholarship, 100% Tuition Fee Waiver, and the ₹10 Lakh student credit card.',
    publishedAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-10-20T14:30:00Z',
    author: {
      name: 'BanglaCampus Editorial Desk',
      title: 'State Financial Aid & Welfare Desk',
    },
    readTimeMinutes: 9,
    tags: ['Scholarships', 'SVMCM', 'Student Credit Card', 'TFW Quota', 'West Bengal'],
    content: `## Financing Engineering Education in West Bengal

Pursuing a four-year B.Tech degree involves tuition fees ranging from ₹12,000 (at government universities like Jadavpur) to ₹4,50,000 – ₹6,50,000 (at private autonomous colleges). The Government of West Bengal and central agencies run multiple financial aid mechanisms to ensure no deserving student is turned away due to financial constraints.

### 1. Swami Vivekananda Merit-cum-Means Scholarship (SVMCM)
The SVMCM is the premier merit-means scholarship program funded by the Higher Education Department, Government of West Bengal.
- **Disbursement Amount**: **₹60,000 per year** (₹5,000 per month) for undergraduate engineering (B.Tech / B.E.) students.
- **Academic Eligibility**: Minimum **60% aggregate marks** in Class 12 (Higher Secondary / CBSE / ISC) examination.
- **Family Income Ceiling**: Gross annual family income from all sources must not exceed **₹2,50,000 per annum**.
- **Official Application Portal**: \`svmcm.wbhed.gov.in\`.
- **Key Documents**: Family income certificate issued by an officer not below the rank of BDO / SDO / Joint BDO / Executive Officer of Municipality, Class 10 admit card, Class 12 marksheet, and institutional admission receipt.

### 2. AICTE Tuition Fee Waiver (TFW) Quota
- **Scope**: 5% supernumerary seats in every AICTE-approved engineering branch in West Bengal.
- **Benefit**: **100% waiver of tuition fee component** for all 4 years (8 semesters). Caution deposit and examination fees remain payable.
- **Eligibility**: Candidates must be permanent residents of West Bengal with family income strictly below **₹2.50 Lakhs per annum**.
- **Important Rule**: TFW is claimed **during the WBJEE application form filling** and verified during physical e-counselling document verification. TFW seats cannot be applied for post-admission.

### 3. West Bengal Student Credit Card (WBSCC)
- **Maximum Limit**: Up to **₹10,00,000 (Ten Lakhs)** collateral-free education loan.
- **Interest Rate**: Fixed **4% simple interest per annum** (concession available for female students and timely payers).
- **Repayment Moratorium**: Repayment begins **1 year after course completion** or after securing employment (whichever is earlier), with an extended repayment window of up to **15 years**.
- **Covered Expenses**: College tuition, hostel accommodation, laptop/computer purchases, and examination books.
- **Application Portal**: \`wbscc.wb.gov.in\`.

### 4. AICTE Pragati Scholarship for Girls
- **Benefit**: **₹50,000 per year** for every year of technical degree study.
- **Eligibility**: Up to two girl children per family admitted to first-year B.Tech through centralized state counselling, family income under ₹8 Lakhs/year.
- **Portal**: National Scholarship Portal (\`scholarships.gov.in\`).
`,
  },
  {
    slug: 'wbjee-domicile-rules-proforma-explained',
    title: 'WBJEE Domicile Rules: Proforma a1, a2, and b Explained with Certifying Authorities',
    description:
      'Understanding West Bengal residential eligibility criteria, which proforma to download, and who is legally empowered to sign your domicile certificate.',
    publishedAt: '2026-08-05T11:00:00Z',
    updatedAt: '2026-10-16T12:00:00Z',
    author: {
      name: 'BanglaCampus Editorial Desk',
      title: 'Admissions & Statutory Regulatory Cell',
    },
    readTimeMinutes: 7,
    tags: ['WBJEE', 'Domicile', 'Proforma', 'Counselling Verification', 'Eligibility'],
    content: `## Why West Bengal Domicile is Critical in WBJEE

In West Bengal engineering admissions, **100% of seats in state government engineering colleges and universities** (such as Jadavpur University FET, KGEC Kalyani, JGEC Jalpaiguri, and Government College of Engineering and Ceramic Technology) and **90% of seats in private colleges** are strictly reserved for candidates with confirmed West Bengal domicile. Furthermore, Tuition Fee Waiver (TFW) and caste reservation quotas (SC, ST, OBC-A, OBC-B, EWS) require state domicile verification without exception.

### The Three Official Proformas

The West Bengal Joint Entrance Examinations Board (WBJEEB) prescribes three distinct proformas in the official Information Bulletin:

#### 1. Proforma a1 (Resident of West Bengal for at least 10 continuous years)
- **Who uses it**: Candidates who have resided in West Bengal continuously for at least 10 years as of December 31 of the examination qualifying year.
- **Who can sign**:
  - District Magistrate, Additional DM, SDO, or Joint BDO.
  - Collector, Additional Collector, or Deputy Collector.
  - Commissioner, Additional Commissioner, or Joint Commissioner of Police.
  - Deputy Director of Youth Services or Executive Officer of Municipality.
- *Note: Gram Panchayat Pradhans, Ward Councillors, and Notaries are NOT authorized to sign Proforma a1.*

#### 2. Proforma a2 (10-Year Resident who passed 10+2 from a West Bengal School)
- **Who uses it**: Candidates residing in West Bengal continuously for 10 years who have also passed or are appearing in their 10+2 examination from an institution located in West Bengal.
- **Who can sign**: The **Head of the Institution** (Headmaster / Principal / Teacher-in-Charge) of the school from which the candidate passed or is appearing in Class 12.
- *Tip: Proforma a2 is generally the easiest and fastest to secure because it is certified directly by your school principal.*

#### 3. Proforma b (Candidate residing outside WB, but parents are permanent WB residents)
- **Who uses it**: Candidates who did NOT reside in West Bengal continuously for 10 years, but whose parent(s) are permanent residents of West Bengal having a permanent residence in the state for at least 10 continuous years.
- **Who can sign**: Must be certified by the authorized government officials listed under Proforma a1 (DM, SDO, BDO, etc.). Parent's voter ID, land deeds (porcha), or residential proof must be produced.

### Essential Verification Checkpoints
1. Photograph on the domicile proforma must match your WBJEE admit card and must be attested/stamped by the issuing authority.
2. Ensure the seal includes the officer's designation, office address, and contact number.
3. Keep at least 4 self-attested photocopies of the certified proforma along with the original for Reporting Centre verification.
`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return VERIFIED_ARTICLES.find((a) => a.slug === slug);
}
