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
];

export function getArticleBySlug(slug: string): Article | undefined {
  return VERIFIED_ARTICLES.find((a) => a.slug === slug);
}
