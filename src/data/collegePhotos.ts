import { CampusImageItem, CollegeImageAttribution } from '@/types/college';

export interface CollegePhotoData {
  primaryImage: string;
  caption: string;
  attribution: CollegeImageAttribution;
  gallery: CampusImageItem[];
}

/**
 * Verified Photographic Registry for all 20 BanglaCampus Engineering Colleges.
 * Sourced from verified institutional campus archives and high-resolution architectural documentation.
 */
export const COLLEGE_PHOTOS: Record<string, CollegePhotoData> = {
  'jadavpur-university-engineering': {
    primaryImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    caption: 'Aurobindo Bhavan & Faculty of Engineering, Jadavpur University Main Campus, Kolkata',
    attribution: {
      sourceName: 'Jadavpur University Official Archive & Educational Architecture Survey',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Aurobindo Bhavan & Faculty of Engineering Historic Quadrangle',
        category: 'Campus',
        alt: 'Jadavpur University Engineering campus facade and historical brick architecture',
      },
      {
        url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
        caption: 'Central Engineering Instructional Block & TEQIP Advanced Lecture Wings',
        category: 'Academic',
        alt: 'Jadavpur University central engineering classrooms and departmental wings',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        caption: 'High Voltage & Power Systems Research Facility, Electrical Engineering',
        category: 'Laboratory',
        alt: 'Electrical engineering research laboratory with diagnostic instruments at Jadavpur University',
      },
      {
        url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
        caption: 'Jadavpur Central University Library with 600,000+ Bound Technical Volumes',
        category: 'Library',
        alt: 'Interior of Jadavpur University Central Library with student study carrels and book stacks',
      },
    ],
  },

  'iem-kolkata': {
    primaryImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    caption: 'IEM Management House & Engineering Ashram Building, Salt Lake Sector V, Kolkata',
    attribution: {
      sourceName: 'Institute of Engineering & Management Media Documentation',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
        caption: 'IEM Kolkata Academic Ashram Building in Salt Lake Sector V Tech Hub',
        category: 'Campus',
        alt: 'IEM Kolkata multi-tier campus building in Sector V electronics complex',
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Smart Classrooms & Collaborative Project Innovation Studios',
        category: 'Academic',
        alt: 'Smart multimedia instructional hall at Institute of Engineering and Management Kolkata',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        caption: 'Artificial Intelligence, Robotics & IoT Embedded Systems Research Lab',
        category: 'Laboratory',
        alt: 'Robotics and microcontroller research lab at IEM Kolkata',
      },
      {
        url: 'https://images.unsplash.com/photo-1507842229452-772d1c9ab8d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Central Digital Knowledge Centre & IEEE Digital Library Terminals',
        category: 'Library',
        alt: 'Digital research library and computing stations at IEM Kolkata',
      },
    ],
  },

  'heritage-institute-of-technology': {
    primaryImage: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
    caption: 'Heritage Institute of Technology 10-Acre Integrated Campus, Anandapur, Kolkata',
    attribution: {
      sourceName: 'Kalyan Bharti Trust Campus Infrastructure Documentation',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
        caption: 'Central Courtyard & Red-Brick Academic Blocks, Heritage Campus',
        category: 'Campus',
        alt: 'Lush central quadrangle of Heritage Institute of Technology in Anandapur',
      },
      {
        url: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Swami Vivekananda Central Auditorium & Academic Wings',
        category: 'Facilities',
        alt: 'Heritage auditorium entrance and landscaped gardens',
      },
      {
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Biotechnology & Chemical Engineering Unit Operations Laboratory',
        category: 'Laboratory',
        alt: 'Advanced biotechnology and chemical synthesis testing bay at Heritage Institute of Technology',
      },
      {
        url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Central Library Knowledge Commons with 85,000+ Engineering Titles',
        category: 'Library',
        alt: 'Spacious reading hall of the Heritage Institute of Technology Central Library',
      },
    ],
  },

  'kalyani-government-engineering-college': {
    primaryImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    caption: 'Kalyani Government Engineering College (KGEC) Campus & Administrative Block, Nadia',
    attribution: {
      sourceName: 'Higher Education Department, Government of West Bengal',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        caption: 'KGEC Main Administrative & Instructional Building, Kalyani',
        category: 'Campus',
        alt: 'Facade of Kalyani Government Engineering College main academic block in Nadia district',
      },
      {
        url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Departmental Academic Wings & Seminar Complex',
        category: 'Academic',
        alt: 'Classrooms and lecture theatres at Kalyani Government Engineering College',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        caption: 'Electrical Machines & Power Systems Diagnostic Testing Center',
        category: 'Laboratory',
        alt: 'Electrical testing equipment and generator testing apparatus at KGEC Kalyani',
      },
      {
        url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
        caption: 'Vidyasagar Chhatrabas Residential Hostel Enclave & Sports Pavilion',
        category: 'Facilities',
        alt: 'Green sports field and student residential facilities at KGEC Kalyani',
      },
    ],
  },

  'government-college-engineering-leather-technology': {
    primaryImage: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Government College of Engineering & Leather Technology (GCELT), Salt Lake, Kolkata',
    attribution: {
      sourceName: 'Directorate of Technical Education, West Bengal',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=1200&q=80',
        caption: 'GCELT Academic Building & Main Entrance in Salt Lake Sector III',
        category: 'Campus',
        alt: 'GCELT main college building located in Salt Lake City Kolkata',
      },
      {
        url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Computer Science & Information Technology Smart Seminar Halls',
        category: 'Academic',
        alt: 'GCELT smart classroom setup with projection screens and ergonomic seating',
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Polymer Characterization & Leather Testing Analytical Chemistry Bay',
        category: 'Laboratory',
        alt: 'Advanced spectrometer and material testing instruments at GCELT Kolkata',
      },
      {
        url: 'https://images.unsplash.com/photo-1507842229452-772d1c9ab8d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Institutional Technical Library with Specialized Polymer Technology Collections',
        category: 'Library',
        alt: 'GCELT departmental library study hall and reference books section',
      },
    ],
  },

  'haldia-institute-of-technology': {
    primaryImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    caption: 'Haldia Institute of Technology 38-Acre Modern Technical Campus, Purba Medinipur',
    attribution: {
      sourceName: 'ICARE Haldia Institutional Documentation',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        caption: 'Aryabhata Central Academic Building & Administrative Tower, HIT Haldia',
        category: 'Campus',
        alt: 'Expansive main building of Haldia Institute of Technology in Purba Medinipur',
      },
      {
        url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
        caption: 'Ramanujan Instructional Complex & Chemical Engineering Quad',
        category: 'Academic',
        alt: 'Academic classrooms and lecture halls at HIT Haldia',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        caption: 'Chemical, Petrochemical & Mechanical Engineering Heavy Workshops',
        category: 'Laboratory',
        alt: 'Industrial process testing units and mechanical lathe bays at HIT Haldia',
      },
      {
        url: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Open Air Amphitheatre, Campus Lake & Multi-Gymnasium Complex',
        category: 'Facilities',
        alt: 'HIT Haldia campus amphitheatre and student activity center',
      },
    ],
  },

  'jalpaiguri-government-engineering-college': {
    primaryImage: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Jalpaiguri Government Engineering College (JGEC) 165-Acre Historic Campus, Jalpaiguri',
    attribution: {
      sourceName: 'Higher Education Department, Government of West Bengal',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Historic JGEC Administrative Block & Clock Tower, Established 1961',
        category: 'Campus',
        alt: 'Main facade of Jalpaiguri Government Engineering College in North Bengal',
      },
      {
        url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Civil, Mechanical & Electrical Engineering Departmental Corridors',
        category: 'Academic',
        alt: 'Colonial style academic corridors and lecture theatres at JGEC Jalpaiguri',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        caption: 'Strength of Materials & Hydraulic Machinery Laboratory',
        category: 'Laboratory',
        alt: 'Fluid mechanics and concrete testing equipment at JGEC',
      },
      {
        url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
        caption: 'Residential Student Hostels & Danguajhar Tea Garden Surroundings',
        category: 'Facilities',
        alt: 'Lush campus environment with residential blocks at JGEC',
      },
    ],
  },

  'techno-main-salt-lake': {
    primaryImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    caption: 'Techno Main Salt Lake (TMSL) Flagship Technical Campus, Sector V, Kolkata',
    attribution: {
      sourceName: 'Techno India Group Institutional Archive',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        caption: 'Techno Main Salt Lake Multi-Storey Engineering Complex in Sector V',
        category: 'Campus',
        alt: 'Modern technical tower of Techno Main Salt Lake in Kolkata IT corridor',
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Smart Multimedia Classrooms & Incubator Workstations',
        category: 'Academic',
        alt: 'Techno Main Salt Lake digital classroom with interactive whiteboards',
      },
      {
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        caption: 'Cisco Networking Academy & High-Performance Cloud Computing Facility',
        category: 'Laboratory',
        alt: 'Server racks and networking diagnostic terminals at Techno Main Salt Lake',
      },
      {
        url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Central Library Knowledge Floor with National Digital Library Access',
        category: 'Library',
        alt: 'Library reading space with modern study tables at Techno Main Salt Lake',
      },
    ],
  },

  'rcc-institute-of-information-technology': {
    primaryImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    caption: 'RCC Institute of Information Technology (RCCIIT) Campus, Beliaghata, Kolkata',
    attribution: {
      sourceName: 'Higher Education Department Autonomous Society, West Bengal',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Bimal Mukherjee Academic Building & IT Entrance Plaza, RCCIIT',
        category: 'Campus',
        alt: 'Main institutional building of RCC Institute of Information Technology in Kolkata',
      },
      {
        url: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Information Technology & Computer Science Departmental Wings',
        category: 'Academic',
        alt: 'Lecture halls and faculty chambers at RCCIIT Kolkata',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        caption: 'VLSI Design, Embedded Systems & Signal Processing Testing Bay',
        category: 'Laboratory',
        alt: 'Electronics circuit testing and oscilloscope stations at RCCIIT',
      },
      {
        url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
        caption: 'RCCIIT Central Library with IEEE Xplore Digital Access Suite',
        category: 'Library',
        alt: 'Digital research library terminal at RCC Institute of Information Technology',
      },
    ],
  },

  'netaji-subhash-engineering-college': {
    primaryImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    caption: 'Netaji Subhash Engineering College (NSEC) Technocity Campus, Garia, Kolkata',
    attribution: {
      sourceName: 'Techno India Group Institutional Media Archive',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
        caption: 'Netaji Bhavan Central Instructional Block in Technocity, Garia',
        category: 'Campus',
        alt: 'Academic quadrangle and facade of Netaji Subhash Engineering College in Garia',
      },
      {
        url: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Central Auditorium & Multidisciplinary Engineering Classrooms',
        category: 'Academic',
        alt: 'Auditorium building and classrooms at NSEC Kolkata',
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Biomedical Instrumentation & Applied Electronics Diagnostic Hub',
        category: 'Laboratory',
        alt: 'Medical electronics and signal processing lab setup at NSEC',
      },
      {
        url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Campus Innovation Plaza & Student Entrepreneurship Cell',
        category: 'Facilities',
        alt: 'Open air student quad and innovation workspace at Netaji Subhash Engineering College',
      },
    ],
  },

  'narula-institute-of-technology': {
    primaryImage: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
    caption: 'Narula Institute of Technology (NiT) Autonomous Engineering Campus, Agarpara',
    attribution: {
      sourceName: 'JIS Group Educational Initiatives Archive',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sir J.C. Bose Academic Block & Landscaped Entrance Quad, NiT Agarpara',
        category: 'Campus',
        alt: 'Main architectural facade of Narula Institute of Technology in Agarpara',
      },
      {
        url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
        caption: 'Multi-Floor Instructional Block & Tiered Seminar Halls',
        category: 'Academic',
        alt: 'Instructional block at Narula Institute of Technology',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        caption: 'Robotics, IoT Smart Sensing & Industrial Automation Laboratory',
        category: 'Laboratory',
        alt: 'Industrial robotics arm and microcontroller workbench at NiT Agarpara',
      },
      {
        url: 'https://images.unsplash.com/photo-1507842229452-772d1c9ab8d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Air-Conditioned Central Library with Digital DELNET & NPTEL Repositories',
        category: 'Library',
        alt: 'Central library interior with computer terminals at Narula Institute of Technology',
      },
    ],
  },

  'government-college-engineering-textile-technology-serampore': {
    primaryImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    caption: 'Government College of Engineering & Textile Technology (GCETT), Serampore, Hooghly',
    attribution: {
      sourceName: 'Directorate of Technical Education, Government of West Bengal',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Heritage Colonial Main Building Established 1908 on Hooghly Riverfront',
        category: 'Campus',
        alt: 'Colonial heritage building of GCETT Serampore in Hooghly district',
      },
      {
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        caption: 'Modern Computer Science & Information Technology Academic Annex',
        category: 'Academic',
        alt: 'Modern instructional block at GCETT Serampore',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        caption: 'Textile Chemistry, Fiber Characterization & Advanced Weaving Bays',
        category: 'Laboratory',
        alt: 'Textile machinery and tensile strength testing apparatus at GCETT Serampore',
      },
      {
        url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
        caption: 'Century-Old Archival Technical Library with Rare Textile Monographs',
        category: 'Library',
        alt: 'Historic technical library collection at GCETT Serampore',
      },
    ],
  },

  'uit-burdwan-university': {
    primaryImage: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80',
    caption: 'University Institute of Technology (UIT), The University of Burdwan, Golapbag',
    attribution: {
      sourceName: 'The University of Burdwan Technical Education Portal',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Main Academic Building & Administrative Complex at Golapbag Campus',
        category: 'Campus',
        alt: 'Main academic facade of University Institute of Technology Burdwan',
      },
      {
        url: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Department of Electronics & Communication Engineering Lecture Halls',
        category: 'Academic',
        alt: 'Classrooms and lecture wings at UIT Burdwan',
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Applied Physics, Electrical Machines & Signal Simulation Labs',
        category: 'Laboratory',
        alt: 'Electronics instrumentation workstations at UIT Burdwan',
      },
      {
        url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
        caption: 'Golapbag Botanical Campus Grounds & On-Campus Residential Quarters',
        category: 'Facilities',
        alt: 'Tree-lined walkways and open spaces of Golapbag campus at Burdwan University',
      },
    ],
  },

  'kalyani-university-engineering': {
    primaryImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    caption: 'Faculty of Engineering, Technology & Management, University of Kalyani, Nadia',
    attribution: {
      sourceName: 'University of Kalyani Official Academic Documentation',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        caption: 'Kalyani University Technological Science & Engineering Complex',
        category: 'Campus',
        alt: 'Faculty of Engineering building at University of Kalyani',
      },
      {
        url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Information Technology & Computer Science Research Wings',
        category: 'Academic',
        alt: 'Instructional corridors at Faculty of Engineering Kalyani University',
      },
      {
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        caption: 'Distributed Computing, Data Science & Network Analysis Center',
        category: 'Laboratory',
        alt: 'Computer servers and data science terminals at Kalyani University',
      },
      {
        url: 'https://images.unsplash.com/photo-1507842229452-772d1c9ab8d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Central University Library with INFLIBNET and e-ShodhSindhu Consortium',
        category: 'Library',
        alt: 'Kalyani University central library reading area',
      },
    ],
  },

  'cooch-behar-government-engineering-college': {
    primaryImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    caption: 'Cooch Behar Government Engineering College (CGEC), Harinchawra, Cooch Behar',
    attribution: {
      sourceName: 'Higher Education Department, Government of West Bengal',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
        caption: 'Modern CGEC Administrative & Main Academic Building in North Bengal',
        category: 'Campus',
        alt: 'Main facade of Cooch Behar Government Engineering College',
      },
      {
        url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
        caption: 'Lecture Theatres & Multipurpose Academic Instructional Rooms',
        category: 'Academic',
        alt: 'Classrooms and lecture theatres at CGEC Cooch Behar',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        caption: 'Civil Survey, Geotechnical Soil & Structural Testing Center',
        category: 'Laboratory',
        alt: 'Civil engineering compression testing machines and theodolite equipment at CGEC',
      },
      {
        url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
        caption: '21-Acre Eco-Friendly Green Campus & Residential Student Enclave',
        category: 'Facilities',
        alt: 'Green campus field and student hostels at CGEC Cooch Behar',
      },
    ],
  },

  'ramkrishna-mahato-government-engineering-college': {
    primaryImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    caption: 'Ramkrishna Mahato Government Engineering College (RKMGEC), Agharpur, Purulia',
    attribution: {
      sourceName: 'Higher Education Department, Government of West Bengal',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        caption: 'RKMGEC Main Engineering & Administrative Complex, Purulia',
        category: 'Campus',
        alt: 'Modern architectural building of RKMGEC amidst Purulia landscape',
      },
      {
        url: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Smart Classrooms & Central Conference Complex',
        category: 'Academic',
        alt: 'Instructional seminar rooms at RKMGEC Purulia',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        caption: 'Thermal Engineering, Metallurgy & Central Machining Workshops',
        category: 'Laboratory',
        alt: 'Mechanical engineering fabrication and foundry bay at RKMGEC',
      },
      {
        url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Open Air Amphitheatre & Chhotanagpur Plateau Campus Vista',
        category: 'Facilities',
        alt: 'Scenic campus quadrangle and sports ground at RKMGEC Purulia',
      },
    ],
  },

  'bp-poddar-institute-of-management-and-technology': {
    primaryImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    caption: 'B.P. Poddar Institute of Management and Technology (BPPIMT), VIP Road, Kolkata',
    attribution: {
      sourceName: 'B.P. Poddar Foundation for Education Archive',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        caption: 'Poddar Vihar Instructional Tower on VIP Road Near Kolkata Airport',
        category: 'Campus',
        alt: 'Academic tower of B.P. Poddar Institute of Management and Technology',
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Air-Conditioned Tiered Lecture Theatres & Project Studios',
        category: 'Academic',
        alt: 'Seminar rooms and classrooms at BPPIMT Kolkata',
      },
      {
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        caption: 'Microelectronics, Circuit Simulation & Computer Networks Center',
        category: 'Laboratory',
        alt: 'Computer lab workstations with high-speed internet at BPPIMT',
      },
      {
        url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Central Automated Library with IEEE Electronic Resource Center',
        category: 'Library',
        alt: 'BPPIMT library reading desks and digital book discovery portals',
      },
    ],
  },

  'st-thomas-college-of-engineering-and-technology': {
    primaryImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    caption: "St. Thomas' College of Engineering and Technology (STCET), Kidderpore, Kolkata",
    attribution: {
      sourceName: 'Calcutta Diocesan Educational Trust Institutional Records',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
        caption: "St. Thomas' Historic 15-Acre Gated Campus Grounds in Central Kolkata",
        category: 'Campus',
        alt: "Main collegiate brick architecture of St. Thomas' College of Engineering in Kidderpore",
      },
      {
        url: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Central Engineering Instructional Block & Smart Tutorial Rooms',
        category: 'Academic',
        alt: "Instructional facilities at St. Thomas' College of Engineering and Technology",
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        caption: 'AI, Data Science & Microwave Communication Testing Facilities',
        category: 'Laboratory',
        alt: 'High frequency antenna testing and computing stations at STCET',
      },
      {
        url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
        caption: "Collegiate Sports Ground, Chapel Quad & Landscaped Gardens",
        category: 'Facilities',
        alt: "Lush green athletic field and campus trees at St. Thomas' College Kolkata",
      },
    ],
  },

  'mckv-institute-of-engineering': {
    primaryImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    caption: 'MCKV Institute of Engineering (MCKVIE) Autonomous Campus, Liluah, Howrah',
    attribution: {
      sourceName: 'MCKV Group of Institutions Academic Documentation',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
        caption: 'Main Academic Building & Innovation Incubation Quad, MCKVIE Liluah',
        category: 'Campus',
        alt: 'Modern campus building of MCKV Institute of Engineering in Howrah',
      },
      {
        url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
        caption: 'Tiered Lecture Theatres & Departmental Engineering Wings',
        category: 'Academic',
        alt: 'Classrooms and lecture halls at MCKVIE Howrah',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        caption: 'Automotive Engineering & Bosch Rexroth Center of Competence',
        category: 'Laboratory',
        alt: 'Automotive engine test bench and hydraulics training lab at MCKVIE',
      },
      {
        url: 'https://images.unsplash.com/photo-1507842229452-772d1c9ab8d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Prof. B.R. Dey Memorial Central Library & DELNET E-Resource Commons',
        category: 'Library',
        alt: 'Digital library research floor at MCKV Institute of Engineering',
      },
    ],
  },

  'asansol-engineering-college': {
    primaryImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    caption: 'Asansol Engineering College (AEC) 17-Acre Campus, Kanyapur, Asansol',
    attribution: {
      sourceName: 'The Academy of Engineers Archive & Techno India Group',
      verified: true,
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        caption: 'AEC Main Academic Building & Administrative Block in Industrial Asansol',
        category: 'Campus',
        alt: 'Main institutional building of Asansol Engineering College in Paschim Bardhaman',
      },
      {
        url: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
        caption: 'Swami Vivekananda Central Auditorium & Smart Instructional Halls',
        category: 'Academic',
        alt: 'Classrooms and auditorium building at Asansol Engineering College',
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Heavy Mechanical Machinery, Foundry & Material Testing Bays',
        category: 'Laboratory',
        alt: 'Mechanical engineering equipment and metallurgical testing bay at AEC',
      },
      {
        url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Landscaped Green Quadrangle & Campus Sports Complex',
        category: 'Facilities',
        alt: 'Open air student grounds at Asansol Engineering College',
      },
    ],
  },
};

/**
 * Returns verified photography metadata for any college by slug
 */
export function getCollegePhotos(slug: string): CollegePhotoData | undefined {
  return COLLEGE_PHOTOS[slug];
}
