import { BranchInfo } from '@/types';

export const VERIFIED_BRANCHES: BranchInfo[] = [
  {
    slug: 'cse',
    name: 'Computer Science & Engineering',
    shortName: 'B.Tech CSE',
    department: 'Department of Computer Science & Engineering',
    intakeEst: '~240 seats',
    minAggregatePercent: 80.0,
    minPcmPercent: 60.0,
    status: 'VERIFIED_PRIMARY',
    description: 'Premier computing program accredited by NBA. Focuses on algorithms, cloud architecture, system design, and advanced software engineering.',
    highlights: ['NBA Accredited', 'AICTE Approved & MAKAUT Affiliated', 'Extensive Core & Tech Recruiter Footprint'],
    careerPaths: ['Software Development Engineer', 'Systems Architect', 'Full Stack Developer', 'Cloud Infrastructure Engineer']
  },
  {
    slug: 'cse-aiml',
    name: 'CSE (Artificial Intelligence & Machine Learning)',
    shortName: 'B.Tech CSE (AI & ML)',
    department: 'Department of Computer Science & Engineering',
    intakeEst: '~180 seats',
    minAggregatePercent: 75.0,
    minPcmPercent: 50.0,
    status: 'VERIFIED_PRIMARY',
    description: 'Deep specialization in neural networks, machine learning pipelines, natural language processing, and automated reasoning.',
    highlights: ['GPU Computing Labs', 'Industry Projects in Deep Learning', 'High Recruiter Demand in Analytics & AI'],
    careerPaths: ['Machine Learning Engineer', 'Data Scientist', 'AI Solutions Architect', 'NLP Specialist']
  },
  {
    slug: 'cse-ai',
    name: 'CSE (Artificial Intelligence)',
    shortName: 'B.Tech CSE (AI)',
    department: 'Department of Computer Science & Engineering',
    intakeEst: '~60–120 seats',
    minAggregatePercent: 70.0,
    minPcmPercent: 50.0,
    status: 'VERIFIED_PRIMARY',
    description: 'Specialized curriculum focused on core artificial intelligence, computational modeling, and intelligent agent systems.',
    highlights: ['AI Foundation Curriculum', 'Cognitive Systems Modeling', 'Robotics & Vision Integration'],
    careerPaths: ['AI Research Analyst', 'Computer Vision Engineer', 'Autonomous Systems Developer']
  },
  {
    slug: 'it',
    name: 'Information Technology',
    shortName: 'B.Tech IT',
    department: 'Department of Information Technology',
    intakeEst: '~120–180 seats',
    minAggregatePercent: 70.0,
    minPcmPercent: 50.0,
    status: 'VERIFIED_PRIMARY',
    description: 'NBA accredited engineering program concentrating on enterprise networking, database management, and information security.',
    highlights: ['NBA Accredited', 'Cyber Operations & DevOps Tracks', 'Equivalent IT Placements with CSE'],
    careerPaths: ['DevOps Engineer', 'Database Administrator', 'Network Architect', 'Enterprise Solutions Consultant']
  },
  {
    slug: 'ece',
    name: 'Electronics & Communication Engineering',
    shortName: 'B.Tech ECE',
    department: 'Department of Electronics & Communication',
    intakeEst: '~180 seats',
    minAggregatePercent: 60.0,
    minPcmPercent: 45.0,
    status: 'VERIFIED_PRIMARY',
    description: 'NBA accredited program blending hardware systems, VLSI design, embedded architecture, and wireless telecommunications.',
    highlights: ['NBA Accredited', 'IEEE Student Branch & Microwave Labs', 'Core VLSI & Semiconductor Placements'],
    careerPaths: ['VLSI Design Engineer', 'Embedded Systems Developer', 'Telecom Engineer', 'IoT Hardware Architect']
  },
  {
    slug: 'ee',
    name: 'Electrical Engineering',
    shortName: 'B.Tech EE',
    department: 'Department of Electrical Engineering',
    intakeEst: '~60 seats',
    minAggregatePercent: 60.0,
    minPcmPercent: 45.0,
    status: 'VERIFIED_PRIMARY',
    description: 'Comprehensive core engineering covering power systems, electric vehicles (EV), renewable grids, and industrial automation.',
    highlights: ['Power Electronics Lab', 'EV & Renewable Energy Research', 'Public Sector & Core Industry Placement'],
    careerPaths: ['Power Systems Engineer', 'EV Powertrain Engineer', 'Control & Automation Specialist', 'Grid Analyst']
  },
  {
    slug: 'eee',
    name: 'Electrical & Electronics Engineering',
    shortName: 'B.Tech EEE',
    department: 'Department of Electrical & Electronics',
    intakeEst: '~60 seats',
    minAggregatePercent: 60.0,
    minPcmPercent: 45.0,
    status: 'VERIFIED_PRIMARY',
    description: 'Interdisciplinary domain bridging heavy electrical systems and digital electronic circuitry for modern power tech.',
    highlights: ['Dual Domain Competence', 'Smart Grid & Mechatronics', 'High GATE & Core Recruitment Record'],
    careerPaths: ['Electrical Design Engineer', 'Industrial Automation Engineer', 'Instrumentation Specialist']
  },
  {
    slug: 'me',
    name: 'Mechanical Engineering',
    shortName: 'B.Tech ME',
    department: 'Department of Mechanical Engineering',
    intakeEst: '~60 seats',
    minAggregatePercent: 60.0,
    minPcmPercent: 45.0,
    status: 'VERIFIED_PRIMARY',
    description: 'Core engineering grounded in thermal science, CAD/CAM computational design, robotics, and precision manufacturing.',
    highlights: ['Advanced CAD/CAM & Fluid Mechanics Labs', 'SAE Collegiate Chapter', 'Automotive & Heavy Industry Placements'],
    careerPaths: ['Mechanical Design Engineer', 'Thermal & CFD Analyst', 'Manufacturing Automation Engineer']
  },
  {
    slug: 'cse-iot-cs-bt',
    name: 'CSE (IoT & Cyber Security with Blockchain)',
    shortName: 'B.Tech CSE (IoT/Cyber/Blockchain)',
    department: 'Specialized Computing Group',
    intakeEst: 'Specialized Intake',
    minAggregatePercent: 65.0,
    minPcmPercent: 50.0,
    status: 'VERIFIED_SECONDARY',
    description: 'Cutting-edge tri-specialization addressing connected hardware, threat prevention, and decentralized cryptographic ledgers.',
    highlights: ['Hands-on IoT Prototyping', 'Blockchain Protocols & Smart Contracts', 'Security Operation Center Training'],
    careerPaths: ['Smart Contract Developer', 'Cyber Security Consultant', 'IoT Security Specialist']
  },
  {
    slug: 'cse-cs',
    name: 'CSE (Cyber Security)',
    shortName: 'B.Tech CSE (Cyber Security)',
    department: 'Specialized Computing Group',
    intakeEst: 'Specialized Intake',
    minAggregatePercent: 65.0,
    minPcmPercent: 50.0,
    status: 'VERIFIED_SECONDARY',
    description: 'Defensive and offensive cybersecurity, cryptographic security, vulnerability auditing, and incident response.',
    highlights: ['Vulnerability Assessment Lab', 'Ethical Hacking & Network Defense', 'Rapidly Growing Corporate Demand'],
    careerPaths: ['Information Security Analyst', 'Penetration Tester', 'SOC Analyst', 'Cryptographer']
  },
  {
    slug: 'cse-ds',
    name: 'CSE (Data Science)',
    shortName: 'B.Tech CSE (Data Science)',
    department: 'Specialized Computing Group',
    intakeEst: 'Specialized Intake',
    minAggregatePercent: 65.0,
    minPcmPercent: 50.0,
    status: 'VERIFIED_SECONDARY',
    description: 'Large-scale distributed data processing, business intelligence engineering, statistical inference, and big data architecture.',
    highlights: ['Hadoop & Spark Computing', 'Statistical Modeling & Visualization', 'Enterprise Big Data Projects'],
    careerPaths: ['Big Data Engineer', 'Business Intelligence Developer', 'Data Analytics Consultant']
  }
];

export function getBranchBySlug(slug: string): BranchInfo | undefined {
  return VERIFIED_BRANCHES.find((b) => b.slug === slug);
}
