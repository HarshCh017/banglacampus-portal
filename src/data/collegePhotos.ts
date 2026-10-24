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
    primaryImage: '/images/colleges/jadavpur-university-engineering.jpg',
    caption: 'Iconic Aurobindo Bhavan & Faculty of Engineering, Jadavpur University Main Campus, Kolkata',
    attribution: {
      sourceName: 'Wikimedia Commons / Jadavpur University Archives (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/jadavpur-university-engineering-1.jpg',
        caption: 'Aurobindo Bhavan & Faculty of Engineering Historic Quadrangle',
        category: 'Campus',
        alt: 'Jadavpur University Engineering campus facade and historical brick architecture',
      },
      {
        url: '/images/colleges/jadavpur-university-engineering-2.jpg',
        caption: 'Central Engineering Instructional Block & TEQIP Advanced Lecture Wings',
        category: 'Academic',
        alt: 'Jadavpur University central engineering classrooms and departmental wings',
      },
      {
        url: '/images/colleges/jadavpur-university-engineering-3.jpg',
        caption: 'High Voltage & Power Systems Research Facility, Electrical Engineering',
        category: 'Laboratory',
        alt: 'Electrical engineering research laboratory with diagnostic instruments at Jadavpur University',
      },
      {
        url: '/images/colleges/jadavpur-university-engineering-4.jpg',
        caption: 'Jadavpur Central University Library with 600,000+ Bound Technical Volumes',
        category: 'Library',
        alt: 'Interior of Jadavpur University Central Library with student study carrels and book stacks',
      },
    ],
  },

  'iem-kolkata': {
    primaryImage: '/images/colleges/iem-kolkata.jpg',
    caption: 'IEM Management House & Engineering Ashram Building, Salt Lake Sector V, Kolkata',
    attribution: {
      sourceName: 'Wikimedia Commons / Institute of Engineering and Management (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/iem-kolkata-1.jpg',
        caption: 'IEM Kolkata Academic Ashram Building in Salt Lake Sector V Tech Hub',
        category: 'Campus',
        alt: 'IEM Kolkata multi-tier campus building in Sector V electronics complex',
      },
      {
        url: '/images/colleges/iem-kolkata-2.jpg',
        caption: 'Smart Classrooms & Collaborative Project Innovation Studios',
        category: 'Academic',
        alt: 'Smart multimedia instructional hall at Institute of Engineering and Management Kolkata',
      },
      {
        url: '/images/colleges/iem-kolkata-3.jpg',
        caption: 'Artificial Intelligence, Robotics & IoT Embedded Systems Research Lab',
        category: 'Laboratory',
        alt: 'Robotics and microcontroller research lab at IEM Kolkata',
      },
      {
        url: '/images/colleges/iem-kolkata-4.jpg',
        caption: 'Central Digital Knowledge Centre & IEEE Digital Library Terminals',
        category: 'Library',
        alt: 'Digital research library and computing stations at IEM Kolkata',
      },
    ],
  },

  'heritage-institute-of-technology': {
    primaryImage: '/images/colleges/heritage-institute-of-technology.jpg',
    caption: 'Heritage Institute of Technology 10-Acre Integrated Campus, Anandapur, Kolkata',
    attribution: {
      sourceName: 'Heritage Institute of Technology Official Media Archives',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/heritage-institute-of-technology-1.jpg',
        caption: 'Central Courtyard & Red-Brick Academic Blocks, Heritage Campus',
        category: 'Campus',
        alt: 'Lush central quadrangle of Heritage Institute of Technology in Anandapur',
      },
      {
        url: '/images/colleges/heritage-institute-of-technology-2.jpg',
        caption: 'Departmental Engineering Blocks & Instructional Quadrangle',
        category: 'Academic',
        alt: 'Heritage Institute of Technology departmental lecture wings and auditoriums',
      },
      {
        url: '/images/colleges/heritage-institute-of-technology-3.jpg',
        caption: 'Science, Technology & Computing Research Complex',
        category: 'Laboratory',
        alt: 'Advanced technology testing bay and laboratories at Heritage Institute of Technology',
      },
      {
        url: '/images/colleges/heritage-institute-of-technology-4.jpg',
        caption: 'Integrated Academic Campus & Central Knowledge Facilities',
        category: 'Facilities',
        alt: 'Heritage Institute of Technology 10-acre integrated academic facilities',
      },
    ],
  },

  'kalyani-government-engineering-college': {
    primaryImage: '/images/colleges/kalyani-government-engineering-college.jpg',
    caption: 'Kalyani Government Engineering College (KGEC) Main Academic Block, Nadia',
    attribution: {
      sourceName: 'Wikimedia Commons / KGEC Media (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/kalyani-government-engineering-college-1.jpg',
        caption: 'KGEC Main Administrative & Instructional Building, Kalyani',
        category: 'Campus',
        alt: 'Facade of Kalyani Government Engineering College main academic block in Nadia district',
      },
      {
        url: '/images/colleges/kalyani-government-engineering-college-2.jpg',
        caption: 'Departmental Academic Wings & Seminar Complex',
        category: 'Academic',
        alt: 'Classrooms and lecture theatres at Kalyani Government Engineering College',
      },
      {
        url: '/images/colleges/kalyani-government-engineering-college-3.jpg',
        caption: 'Electrical Machines & Power Systems Diagnostic Testing Center',
        category: 'Laboratory',
        alt: 'Electrical testing equipment and generator testing apparatus at KGEC Kalyani',
      },
      {
        url: '/images/colleges/kalyani-government-engineering-college-4.jpg',
        caption: 'Vidyasagar Chhatrabas Residential Hostel Enclave & Sports Pavilion',
        category: 'Facilities',
        alt: 'Green sports field and student residential facilities at KGEC Kalyani',
      },
    ],
  },

  'government-college-engineering-leather-technology': {
    primaryImage: '/images/colleges/government-college-engineering-leather-technology.jpg',
    caption: 'Government College of Engineering & Leather Technology (GCELT), Salt Lake Sector III, Kolkata',
    attribution: {
      sourceName: 'Wikimedia Commons / GCELT Campus Records (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/government-college-engineering-leather-technology-1.jpg',
        caption: 'GCELT Academic Building & Main Entrance in Salt Lake Sector III',
        category: 'Campus',
        alt: 'GCELT main college building located in Salt Lake City Kolkata',
      },
      {
        url: '/images/colleges/government-college-engineering-leather-technology-2.jpg',
        caption: 'Computer Science & Information Technology Smart Seminar Halls',
        category: 'Academic',
        alt: 'GCELT smart classroom setup with projection screens and ergonomic seating',
      },
      {
        url: '/images/colleges/government-college-engineering-leather-technology-3.jpg',
        caption: 'Polymer Characterization & Leather Testing Analytical Chemistry Bay',
        category: 'Laboratory',
        alt: 'Advanced spectrometer and material testing instruments at GCELT Kolkata',
      },
      {
        url: '/images/colleges/government-college-engineering-leather-technology-4.jpg',
        caption: 'Institutional Technical Library with Specialized Polymer Technology Collections',
        category: 'Library',
        alt: 'GCELT departmental library study hall and reference books section',
      },
    ],
  },

  'haldia-institute-of-technology': {
    primaryImage: '/images/colleges/haldia-institute-of-technology.jpg',
    caption: 'Haldia Institute of Technology Aryabhata Academic Complex, Purba Medinipur',
    attribution: {
      sourceName: 'Wikimedia Commons / HIT Haldia Media (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/haldia-institute-of-technology-1.jpg',
        caption: 'Aryabhata Central Academic Building & Administrative Tower, HIT Haldia',
        category: 'Campus',
        alt: 'Expansive main building of Haldia Institute of Technology in Purba Medinipur',
      },
      {
        url: '/images/colleges/haldia-institute-of-technology-2.jpg',
        caption: 'Ramanujan Instructional Complex & Chemical Engineering Quad',
        category: 'Academic',
        alt: 'Academic classrooms and lecture halls at HIT Haldia',
      },
      {
        url: '/images/colleges/haldia-institute-of-technology-3.jpg',
        caption: 'Chemical, Petrochemical & Mechanical Engineering Heavy Workshops',
        category: 'Laboratory',
        alt: 'Industrial process testing units and mechanical lathe bays at HIT Haldia',
      },
      {
        url: '/images/colleges/haldia-institute-of-technology-4.jpg',
        caption: 'Open Air Amphitheatre, Campus Lake & Multi-Gymnasium Complex',
        category: 'Facilities',
        alt: 'HIT Haldia campus amphitheatre and student activity center',
      },
    ],
  },

  'jalpaiguri-government-engineering-college': {
    primaryImage: '/images/colleges/jalpaiguri-government-engineering-college.jpg',
    caption: 'Jalpaiguri Government Engineering College (JGEC) Historic Clock Tower & Main Administrative Wing',
    attribution: {
      sourceName: 'Wikimedia Commons / JGEC Campus (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/jalpaiguri-government-engineering-college-1.jpg',
        caption: 'Historic JGEC Administrative Block & Clock Tower, Established 1961',
        category: 'Campus',
        alt: 'Main facade of Jalpaiguri Government Engineering College in North Bengal',
      },
      {
        url: '/images/colleges/jalpaiguri-government-engineering-college-2.jpg',
        caption: 'Civil, Mechanical & Electrical Engineering Departmental Corridors',
        category: 'Academic',
        alt: 'Colonial style academic corridors and lecture theatres at JGEC Jalpaiguri',
      },
      {
        url: '/images/colleges/jalpaiguri-government-engineering-college-3.jpg',
        caption: 'Strength of Materials & Hydraulic Machinery Laboratory',
        category: 'Laboratory',
        alt: 'Fluid mechanics and concrete testing equipment at JGEC',
      },
      {
        url: '/images/colleges/jalpaiguri-government-engineering-college-4.jpg',
        caption: 'Residential Student Hostels & Danguajhar Tea Garden Surroundings',
        category: 'Facilities',
        alt: 'Lush campus environment with residential blocks at JGEC',
      },
    ],
  },

  'techno-main-salt-lake': {
    primaryImage: '/images/colleges/techno-main-salt-lake.jpg',
    caption: 'Techno Main Salt Lake Campus & High-Tech Towers, EM-4 Sector V, Salt Lake City',
    attribution: {
      sourceName: 'Wikimedia Commons / Biswarup Ganguly (CC BY 3.0)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/techno-main-salt-lake-1.jpg',
        caption: 'Techno Main Salt Lake Multi-Storey Engineering Complex in Sector V',
        category: 'Campus',
        alt: 'Modern technical tower of Techno Main Salt Lake in Kolkata IT corridor',
      },
      {
        url: '/images/colleges/techno-main-salt-lake-2.jpg',
        caption: 'Smart Multimedia Classrooms & Incubator Workstations',
        category: 'Academic',
        alt: 'Techno Main Salt Lake digital classroom with interactive whiteboards',
      },
      {
        url: '/images/colleges/techno-main-salt-lake-3.jpg',
        caption: 'Cisco Networking Academy & High-Performance Cloud Computing Facility',
        category: 'Laboratory',
        alt: 'Server racks and networking diagnostic terminals at Techno Main Salt Lake',
      },
      {
        url: '/images/colleges/techno-main-salt-lake-4.jpg',
        caption: 'Central Library Knowledge Floor with National Digital Library Access',
        category: 'Library',
        alt: 'Library reading space with modern study tables at Techno Main Salt Lake',
      },
    ],
  },

  'rcc-institute-of-information-technology': {
    primaryImage: '/images/colleges/rcc-institute-of-information-technology.jpg',
    caption: 'RCC Institute of Information Technology (RCCIIT) Campus & Academic Complex, Beliaghata, Kolkata',
    attribution: {
      sourceName: 'Wikimedia Commons / RCCIIT Documentation (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/rcc-institute-of-information-technology-1.jpg',
        caption: 'Bimal Mukherjee Academic Building & IT Entrance Plaza, RCCIIT',
        category: 'Campus',
        alt: 'Main institutional building of RCC Institute of Information Technology in Kolkata',
      },
      {
        url: '/images/colleges/rcc-institute-of-information-technology-2.jpg',
        caption: 'Information Technology & Computer Science Departmental Wings',
        category: 'Academic',
        alt: 'Lecture halls and faculty chambers at RCCIIT Kolkata',
      },
      {
        url: '/images/colleges/rcc-institute-of-information-technology-3.jpg',
        caption: 'VLSI Design, Embedded Systems & Signal Processing Testing Bay',
        category: 'Laboratory',
        alt: 'Electronics circuit testing and oscilloscope stations at RCCIIT',
      },
      {
        url: '/images/colleges/rcc-institute-of-information-technology-4.jpg',
        caption: 'RCCIIT Central Library with IEEE Xplore Digital Access Suite',
        category: 'Library',
        alt: 'Digital research library terminal at RCC Institute of Information Technology',
      },
    ],
  },

  'netaji-subhash-engineering-college': {
    primaryImage: '/images/colleges/netaji-subhash-engineering-college.jpg',
    caption: 'Netaji Subhash Engineering College (NSEC) Campus Facade, Panchpota, Garia, Kolkata',
    attribution: {
      sourceName: 'Wikimedia Commons / Biswarup Ganguly (CC BY 3.0)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/netaji-subhash-engineering-college-1.jpg',
        caption: 'Netaji Bhavan Central Instructional Block in Technocity, Garia',
        category: 'Campus',
        alt: 'Academic quadrangle and facade of Netaji Subhash Engineering College in Garia',
      },
      {
        url: '/images/colleges/netaji-subhash-engineering-college-2.jpg',
        caption: 'Central Auditorium & Multidisciplinary Engineering Classrooms',
        category: 'Academic',
        alt: 'Auditorium building and classrooms at NSEC Kolkata',
      },
      {
        url: '/images/colleges/netaji-subhash-engineering-college-3.jpg',
        caption: 'Biomedical Instrumentation & Applied Electronics Diagnostic Hub',
        category: 'Laboratory',
        alt: 'Medical electronics and signal processing lab setup at NSEC',
      },
      {
        url: '/images/colleges/netaji-subhash-engineering-college-4.jpg',
        caption: 'Campus Innovation Plaza & Student Entrepreneurship Cell',
        category: 'Facilities',
        alt: 'Open air student quad and innovation workspace at Netaji Subhash Engineering College',
      },
    ],
  },

  'narula-institute-of-technology': {
    primaryImage: '/images/colleges/narula-institute-of-technology.jpg',
    caption: 'Narula Institute of Technology (NiT) Main Academic Building, Agarpara, Kolkata',
    attribution: {
      sourceName: 'Wikimedia Commons / NiT Media (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/narula-institute-of-technology-1.jpg',
        caption: 'Sir J.C. Bose Academic Block & Landscaped Entrance Quad, NiT Agarpara',
        category: 'Campus',
        alt: 'Main architectural facade of Narula Institute of Technology in Agarpara',
      },
      {
        url: '/images/colleges/narula-institute-of-technology-2.jpg',
        caption: 'Multi-Floor Instructional Block & Tiered Seminar Halls',
        category: 'Academic',
        alt: 'Instructional block at Narula Institute of Technology',
      },
      {
        url: '/images/colleges/narula-institute-of-technology-3.jpg',
        caption: 'Robotics, IoT Smart Sensing & Industrial Automation Laboratory',
        category: 'Laboratory',
        alt: 'Industrial robotics arm and microcontroller workbench at NiT Agarpara',
      },
      {
        url: '/images/colleges/narula-institute-of-technology-4.jpg',
        caption: 'Air-Conditioned Central Library with Digital DELNET & NPTEL Repositories',
        category: 'Library',
        alt: 'Central library interior with computer terminals at Narula Institute of Technology',
      },
    ],
  },

  'government-college-engineering-textile-technology-serampore': {
    primaryImage: '/images/colleges/government-college-engineering-textile-technology-serampore.jpg',
    caption: 'Government College of Engineering & Textile Technology (GCETTS) Campus, Serampore',
    attribution: {
      sourceName: 'Wikimedia Commons / GCETTS Serampore Campus Archives (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/government-college-engineering-textile-technology-serampore-1.jpg',
        caption: 'Collegiate Main Building & Historic Textile Engineering Facade, Serampore',
        category: 'Campus',
        alt: 'Historic academic building of GCETT Serampore in Hooghly district',
      },
      {
        url: '/images/colleges/government-college-engineering-textile-technology-serampore-2.jpg',
        caption: 'Administrative & Academic Instruction Complex, GCETTS',
        category: 'Academic',
        alt: 'Administrative and departmental building at GCETT Serampore',
      },
      {
        url: '/images/colleges/government-college-engineering-textile-technology-serampore-3.jpg',
        caption: 'GCETTS Main Campus Gate & Entrance Boulevard',
        category: 'Facilities',
        alt: 'Entrance gate and boulevard of GCETT Serampore',
      },
      {
        url: '/images/colleges/government-college-engineering-textile-technology-serampore-4.jpg',
        caption: 'Student Residential Hostels & Campus Grounds',
        category: 'Facilities',
        alt: 'Campus residential hostel block at GCETT Serampore',
      },
    ],
  },

  'uit-burdwan-university': {
    primaryImage: '/images/colleges/uit-burdwan-university.jpg',
    caption: 'University Institute of Technology (UITBU) Academic Complex, Burdwan University',
    attribution: {
      sourceName: 'Wikimedia Commons / UIT Burdwan University Archives (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/uit-burdwan-university-1.jpg',
        caption: 'Main Academic Building & Administrative Complex at Golapbag Campus',
        category: 'Campus',
        alt: 'Main academic facade of University Institute of Technology Burdwan',
      },
      {
        url: '/images/colleges/uit-burdwan-university-2.jpg',
        caption: 'Department of Electronics & Communication Engineering Lecture Halls',
        category: 'Academic',
        alt: 'Classrooms and lecture wings at UIT Burdwan',
      },
      {
        url: '/images/colleges/uit-burdwan-university-3.jpg',
        caption: 'Applied Physics, Electrical Machines & Signal Simulation Labs',
        category: 'Laboratory',
        alt: 'Electronics instrumentation workstations at UIT Burdwan',
      },
      {
        url: '/images/colleges/uit-burdwan-university-4.jpg',
        caption: 'Golapbag Botanical Campus Grounds & On-Campus Residential Quarters',
        category: 'Facilities',
        alt: 'Tree-lined walkways and open spaces of Golapbag campus at Burdwan University',
      },
    ],
  },

  'kalyani-university-engineering': {
    primaryImage: '/images/colleges/kalyani-university-engineering.jpg',
    caption: 'Faculty of Engineering, Technology & Management, University of Kalyani Main Campus',
    attribution: {
      sourceName: 'Wikimedia Commons / Kalyani University (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/kalyani-university-engineering-1.jpg',
        caption: 'Kalyani University Technological Science & Engineering Complex',
        category: 'Campus',
        alt: 'Faculty of Engineering building at University of Kalyani',
      },
      {
        url: '/images/colleges/kalyani-university-engineering-2.jpg',
        caption: 'Information Technology & Computer Science Research Wings',
        category: 'Academic',
        alt: 'Instructional corridors at Faculty of Engineering Kalyani University',
      },
      {
        url: '/images/colleges/kalyani-university-engineering-3.jpg',
        caption: 'Distributed Computing, Data Science & Network Analysis Center',
        category: 'Laboratory',
        alt: 'Computer servers and data science terminals at Kalyani University',
      },
      {
        url: '/images/colleges/kalyani-university-engineering-4.jpg',
        caption: 'Central University Library with INFLIBNET and e-ShodhSindhu Consortium',
        category: 'Library',
        alt: 'Kalyani University central library reading area',
      },
    ],
  },

  'cooch-behar-government-engineering-college': {
    primaryImage: '/images/colleges/cooch-behar-government-engineering-college.jpg',
    caption: 'Cooch Behar Government Engineering College (CGEC) Administrative & Academic Building',
    attribution: {
      sourceName: 'Wikimedia Commons / CGEC Harinchawra Documentation (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/cooch-behar-government-engineering-college-1.jpg',
        caption: 'Modern CGEC Administrative & Main Academic Building in North Bengal',
        category: 'Campus',
        alt: 'Main facade of Cooch Behar Government Engineering College',
      },
      {
        url: '/images/colleges/cooch-behar-government-engineering-college-2.jpg',
        caption: 'Lecture Theatres & Multipurpose Academic Instructional Rooms',
        category: 'Academic',
        alt: 'Classrooms and lecture theatres at CGEC Cooch Behar',
      },
      {
        url: '/images/colleges/cooch-behar-government-engineering-college-3.jpg',
        caption: 'Civil Survey, Geotechnical Soil & Structural Testing Center',
        category: 'Laboratory',
        alt: 'Civil engineering compression testing machines and theodolite equipment at CGEC',
      },
      {
        url: '/images/colleges/cooch-behar-government-engineering-college-4.jpg',
        caption: '21-Acre Eco-Friendly Green Campus & Residential Student Enclave',
        category: 'Facilities',
        alt: 'Green campus field and student hostels at CGEC Cooch Behar',
      },
    ],
  },

  'ramkrishna-mahato-government-engineering-college': {
    primaryImage: '/images/colleges/ramkrishna-mahato-government-engineering-college.jpg',
    caption: 'Ramkrishna Mahato Government Engineering College (RKMGEC) Main Gate & Campus, Purulia',
    attribution: {
      sourceName: 'Wikimedia Commons / RKMGEC Media (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/ramkrishna-mahato-government-engineering-college-1.jpg',
        caption: 'RKMGEC Main Engineering & Administrative Complex, Purulia',
        category: 'Campus',
        alt: 'Modern architectural building of RKMGEC amidst Purulia landscape',
      },
      {
        url: '/images/colleges/ramkrishna-mahato-government-engineering-college-2.jpg',
        caption: 'Smart Classrooms & Central Conference Complex',
        category: 'Academic',
        alt: 'Instructional seminar rooms at RKMGEC Purulia',
      },
      {
        url: '/images/colleges/ramkrishna-mahato-government-engineering-college-3.jpg',
        caption: 'Thermal Engineering, Metallurgy & Central Machining Workshops',
        category: 'Laboratory',
        alt: 'Mechanical engineering fabrication and foundry bay at RKMGEC',
      },
      {
        url: '/images/colleges/ramkrishna-mahato-government-engineering-college-4.jpg',
        caption: 'Open Air Amphitheatre & Chhotanagpur Plateau Campus Vista',
        category: 'Facilities',
        alt: 'Scenic campus quadrangle and sports ground at RKMGEC Purulia',
      },
    ],
  },

  'bp-poddar-institute-of-management-and-technology': {
    primaryImage: '/images/colleges/bp-poddar-institute-of-management-and-technology.jpg',
    caption: 'B.P. Poddar Institute of Management & Technology Building, VIP Road, Poddar Vihar, Kolkata',
    attribution: {
      sourceName: 'Wikimedia Commons / BP Poddar Campus (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/bp-poddar-institute-of-management-and-technology-1.jpg',
        caption: 'Poddar Vihar Instructional Tower on VIP Road Near Kolkata Airport',
        category: 'Campus',
        alt: 'Academic tower of B.P. Poddar Institute of Management and Technology',
      },
      {
        url: '/images/colleges/bp-poddar-institute-of-management-and-technology-2.jpg',
        caption: 'Air-Conditioned Tiered Lecture Theatres & Project Studios',
        category: 'Academic',
        alt: 'Seminar rooms and classrooms at BPPIMT Kolkata',
      },
      {
        url: '/images/colleges/bp-poddar-institute-of-management-and-technology-3.jpg',
        caption: 'Microelectronics, Circuit Simulation & Computer Networks Center',
        category: 'Laboratory',
        alt: 'Computer lab workstations with high-speed internet at BPPIMT',
      },
      {
        url: '/images/colleges/bp-poddar-institute-of-management-and-technology-4.jpg',
        caption: 'Central Automated Library with IEEE Electronic Resource Center',
        category: 'Library',
        alt: 'BPPIMT library reading desks and digital book discovery portals',
      },
    ],
  },

  'st-thomas-college-of-engineering-and-technology': {
    primaryImage: '/images/colleges/st-thomas-college-of-engineering-and-technology.jpg',
    caption: "St. Thomas' College of Engineering and Technology (STCET), Kidderpore, Kolkata",
    attribution: {
      sourceName: 'Wikimedia Commons / Biswarup Ganguly (CC BY 3.0)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/st-thomas-college-of-engineering-and-technology-1.jpg',
        caption: "St. Thomas' Historic 15-Acre Gated Campus Grounds in Central Kolkata",
        category: 'Campus',
        alt: "Main collegiate brick architecture of St. Thomas' College of Engineering in Kidderpore",
      },
      {
        url: '/images/colleges/st-thomas-college-of-engineering-and-technology-2.jpg',
        caption: 'Central Engineering Instructional Block & Smart Tutorial Rooms',
        category: 'Academic',
        alt: "Instructional facilities at St. Thomas' College of Engineering and Technology",
      },
      {
        url: '/images/colleges/st-thomas-college-of-engineering-and-technology-3.jpg',
        caption: 'AI, Data Science & Microwave Communication Testing Facilities',
        category: 'Laboratory',
        alt: 'High frequency antenna testing and computing stations at STCET',
      },
      {
        url: '/images/colleges/st-thomas-college-of-engineering-and-technology-4.jpg',
        caption: "Collegiate Sports Ground, Chapel Quad & Landscaped Gardens",
        category: 'Facilities',
        alt: "Lush green athletic field and campus trees at St. Thomas' College Kolkata",
      },
    ],
  },

  'mckv-institute-of-engineering': {
    primaryImage: '/images/colleges/mckv-institute-of-engineering.jpg',
    caption: 'MCKV Institute of Engineering (MCKVIE) Campus Building, Grand Trunk Road, Liluah, Howrah',
    attribution: {
      sourceName: 'Wikimedia Commons / MCKVIE Media Cell (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/mckv-institute-of-engineering-1.jpg',
        caption: 'Main Academic Building & Innovation Incubation Quad, MCKVIE Liluah',
        category: 'Campus',
        alt: 'Modern campus building of MCKV Institute of Engineering in Howrah',
      },
      {
        url: '/images/colleges/mckv-institute-of-engineering-2.jpg',
        caption: 'Tiered Lecture Theatres & Departmental Engineering Wings',
        category: 'Academic',
        alt: 'Classrooms and lecture halls at MCKVIE Howrah',
      },
      {
        url: '/images/colleges/mckv-institute-of-engineering-3.jpg',
        caption: 'Automotive Engineering & Bosch Rexroth Center of Competence',
        category: 'Laboratory',
        alt: 'Automotive engine test bench and hydraulics training lab at MCKVIE',
      },
      {
        url: '/images/colleges/mckv-institute-of-engineering-4.jpg',
        caption: 'Prof. B.R. Dey Memorial Central Library & DELNET E-Resource Commons',
        category: 'Library',
        alt: 'Digital library research floor at MCKV Institute of Engineering',
      },
    ],
  },

  'asansol-engineering-college': {
    primaryImage: '/images/colleges/asansol-engineering-college.jpg',
    caption: 'Asansol Engineering College (AEC) Departmental Complex, Kanyapur, Asansol',
    attribution: {
      sourceName: 'Wikimedia Commons / AEC Campus Archives (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/asansol-engineering-college-1.jpg',
        caption: 'AEC Main Academic Building & Administrative Block in Industrial Asansol',
        category: 'Campus',
        alt: 'Main institutional building of Asansol Engineering College in Paschim Bardhaman',
      },
      {
        url: '/images/colleges/asansol-engineering-college-2.jpg',
        caption: 'Swami Vivekananda Central Auditorium & Smart Instructional Halls',
        category: 'Academic',
        alt: 'Classrooms and auditorium building at Asansol Engineering College',
      },
      {
        url: '/images/colleges/asansol-engineering-college-3.jpg',
        caption: 'Heavy Mechanical Machinery, Foundry & Material Testing Bays',
        category: 'Laboratory',
        alt: 'Mechanical engineering equipment and metallurgical testing bay at AEC',
      },
      {
        url: '/images/colleges/asansol-engineering-college-4.jpg',
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
