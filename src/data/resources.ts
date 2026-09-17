export interface ResourceArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
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
    content: [
      'Prospective engineering applicants in West Bengal often ask whether they should appear for WBJEE, IEMJEE, or both when aiming for the Institute of Engineering & Management (IEM), Kolkata.',
      'WBJEE (West Bengal Joint Entrance Examination): Conducted by WBJEEB, this is the primary centralized state entrance exam. IEM Kolkata participates under College Code 104, allotting seats across General, TFW, and domicile categories based on state ranks.',
      'IEMJEE (IEM Joint Entrance Examination): Conducted directly by the IEM-UEM group. Because registration carries zero fee, it serves as an excellent concurrent pathway for students seeking direct admission counselling.',
      'JEE Main All-India Quota: In addition to WBJEE and IEMJEE, a designated proportion of seats are allotted based on All-India ranks achieved in NTA JEE Main.',
      'Optimal Recommendation: Serious aspirants should appear for both WBJEE and IEMJEE. This maximizes branch choice flexibility during counselling at the Ashram Campus.',
    ],
  },
  {
    slug: 'btech-cse-vs-it-vs-aiml-guide',
    title: 'B.Tech CSE vs IT vs CSE (AI & ML): Which Computing Branch Fits You?',
    excerpt: 'A detailed curriculum and career comparison to help students and parents choose between core computing and specialized AI programs.',
    category: 'Branch Selection',
    readTime: '6 min read',
    publishedDate: 'Cycle 2027',
    content: [
      'With the rapid expansion of specialized computing degrees, deciding between Computer Science & Engineering (Core), Information Technology (IT), and CSE with Artificial Intelligence & Machine Learning (AI & ML) is one of the most critical decisions for applicants.',
      'Computer Science & Engineering (CSE): The classical foundational degree. Focuses on theoretical computer science, operating systems, compilers, computer architecture, and full-stack software development. Accredited by NBA.',
      'Information Technology (IT): Closely aligned with enterprise software infrastructure. Emphasizes database administration, enterprise network architecture, cybersecurity operations, and cloud solutions. Also NBA-accredited at IEM.',
      'CSE (Artificial Intelligence & Machine Learning): An applied specialization focusing on neural networks, statistical inference, natural language processing (NLP), computer vision, and machine learning pipelines.',
      'Recruiter Perspective: Major global employers (TCS, Cognizant, Wipro, Capgemini, PwC) typically evaluate candidates from all three computing branches on equal technical footing, prioritizing core programming and problem-solving skills.',
    ],
  },
];

export function getResourceBySlug(slug: string): ResourceArticle | undefined {
  return RESOURCE_ARTICLES.find((r) => r.slug === slug);
}
