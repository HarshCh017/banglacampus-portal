export interface ResourceArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
  updatedAt?: string;
  content: string[];
}

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    slug: 'iemjee-syllabus-preparation-strategy',
    title: 'IEMJEE 2027 Preparation Strategy & Syllabus Breakdown',
    excerpt: 'Comprehensive guide to mastering the Physics, Chemistry, and Mathematics sections for the zero-fee IEMJEE exam.',
    category: 'Exam Preparation',
    readTime: '4 min read',
    publishedDate: 'Cycle 2027',
    updatedAt: '2026-10-15',
    content: [
      'The IEM Joint Entrance Examination (IEMJEE) is conducted for admission into undergraduate engineering programs across the IEM-UEM Group. Unlike many national entrance examinations, registration and appearance for IEMJEE is 100% free of charge.',
      'The examination tests foundational aptitude and conceptual mastery across Class 11 and Class 12 curricula in Physics, Chemistry, and Mathematics.',
      'Physics Section Focus: Key high-yield topics include Classical Mechanics (Newton\'s Laws, Rotational Motion), Thermodynamics, Optics, and Current Electricity. Focus on solving standard numerical problems with speed.',
      'Chemistry Section Focus: Physical Chemistry formulas, periodic trends in Inorganic Chemistry, and fundamental reaction mechanisms in Organic Chemistry. Accuracy in multiple-choice formats is essential.',
      'Mathematics Section Focus: High-weightage chapters include Differential & Integral Calculus, Coordinate Geometry, Vectors, and Matrices. Regular mock tests under timed conditions are strongly recommended.',
      'Admit Card / Hall Ticket: Once registered on exam.iem.edu.in, candidates receive their digital Hall Ticket with examination timing and center allotment.',
    ],
  },
  {
    slug: 'wbjee-vs-iemjee-admission-pathway',
    title: 'WBJEE vs IEMJEE: Choosing the Right Admission Pathway',
    excerpt: 'Understanding the difference between centralized state-level counselling and institutional entrance tests for IEM Kolkata.',
    category: 'Admission Strategy',
    readTime: '5 min read',
    publishedDate: 'Cycle 2027',
    updatedAt: '2026-10-18',
    content: [
      'Prospective engineering applicants in West Bengal often ask whether they should appear for WBJEE, IEMJEE, or both when aiming for the [Institute of Engineering & Management (IEM), Kolkata](/colleges/iem-kolkata).',
      'WBJEE (Historical Archive & State Benchmark): Conducted by WBJEEB, IEM Kolkata historically participated under College Code #104, allotting seats across General, TFW, and domicile categories based on state ranks. Today, WBJEE cutoffs serve as essential historical benchmarks.',
      'IEMJEE (Current Published Route): Conducted directly by the IEM-UEM Group across rolling phases. Registration carries zero fee (₹0), serving as the primary admission examination followed by institutional counselling at the Salt Lake Ashram campus.',
      'JEE Main All-India Quota: In addition to IEMJEE, a designated proportion of seats are evaluated based on All-India ranks achieved in NTA JEE Main.',
      'Optimal Recommendation: Serious aspirants should appear for both WBJEE and IEMJEE. This maximizes branch choice flexibility during counselling at the Ashram Campus.',
    ],
  },
  {
    slug: 'btech-cse-vs-it-vs-aiml-guide',
    title: 'B.Tech CSE vs IT vs CSE (AI & ML) vs IoT: Curriculum, Scope & Career Comparison',
    excerpt: 'A detailed curriculum and career comparison to help students and parents choose between core computing, enterprise IT, and specialized AI/IoT programs in West Bengal.',
    category: 'Branch Selection',
    readTime: '8 min read',
    publishedDate: 'Cycle 2026-2027',
    updatedAt: '2026-11-21',
    content: [
      'With the rapid introduction of emerging computing specializations in AICTE and MAKAUT affiliated colleges across West Bengal, deciding between [B.Tech in Computer Science & Engineering (Core)](/courses/cse), [Information Technology (IT)](/courses/it), [CSE with Artificial Intelligence & Machine Learning](/courses/cse-aiml), and [CSE with Internet of Things (IoT)](/courses/cse-iot-cs-bt) is one of the most consequential decisions for students and parents during WBJEE counselling.',
      '**1. Core Academic Foundations & Differences:**\n• **Computer Science & Engineering (CSE Core)**: The classical, universally recognized computing degree. Focuses on theoretical computer science, compiler design, discrete mathematics, operating systems, computer architecture, algorithm design, and full-stack software development. It provides the broadest foundation for software engineering and graduate research (GATE/MS).\n• **Information Technology (IT)**: Closely aligned with enterprise software systems, data infrastructure, and network architecture. Emphasizes database management systems (DBMS), enterprise networking, web services, information security, and cloud deployment pipelines. Recruiter acceptance for IT is virtually identical to CSE Core in major corporate drives.\n• **CSE (AI & ML)**: An applied computing degree focusing heavily on statistics, linear algebra, supervised and unsupervised machine learning, deep neural networks, computer vision, natural language processing (NLP), and automated data pipelines.\n• **CSE (IoT & Embedded Systems)**: Focuses on physical computing, microcontrollers (ARM, ESP32), sensor interfacing, IoT networking protocols (MQTT, CoAP), edge AI inference, and cloud telemetry.',
      '**2. Mathematics & Theoretical Depth:**\n• CSE Core requires Discrete Mathematics, Formal Language & Automata Theory (FLAT), and Graph Theory.\n• CSE (AI & ML) requires rigorous multivariate calculus, linear algebra, probability theory, and statistical inference.\n• IT balances discrete structures with relational algebra and applied network mathematics.\n• CSE (IoT) requires signal processing basics, embedded timing mathematics, and sensor data analysis.',
      '**3. Systems, Networking & Cloud Coverage:**\n• IT and CSE (IoT) allocate significant coursework to network layers, client-server models, socket programming, and cloud virtualization.\n• In IoT programs, students build physical prototypes with sensors and wireless sensor networks (WSN) that feed telemetry into cloud services like AWS IoT Core or Microsoft Azure.',
      '**4. College Availability in West Bengal:**\n• CSE Core and IT are available across government colleges ([Jadavpur University](/colleges/jadavpur-university-engineering), [KGEC](/colleges/kalyani-government-engineering-college), [JGEC](/colleges/jalpaiguri-government-engineering-college)) and autonomous private colleges ([IEM Kolkata](/colleges/iem-kolkata), [Heritage](/colleges/heritage-institute-of-technology), [HIT Haldia](/colleges/haldia-institute-of-technology)).\n• CSE (AI & ML) and CSE (IoT) are primarily offered in autonomous private colleges and private university faculties approved by AICTE in recent academic cycles.',
      '**5. Recruiter & Placement Reality:**\n• Major national and multinational IT recruiters (TCS, Cognizant, Wipro, Capgemini, PwC, Infosys, Deloitte) allow students from CSE, IT, CSE (AI & ML), and CSE (IoT) to sit for common campus coding assessments.\n• Core product companies (Google, Amazon, Microsoft) test Data Structures and Algorithms (DSA) and Low-Level/High-Level System Design (LLD/HLD), regardless of whether your degree suffix says Core, IT, or AI/ML.\n• Therefore, choose based on genuine interest in software vs applied data science vs hardware-connected systems, while maintaining strong problem-solving skills in C++, Java, or Python.',
    ],
  },
];

export function getResourceBySlug(slug: string): ResourceArticle | undefined {
  return RESOURCE_ARTICLES.find((r) => r.slug === slug);
}
