import { CampusImageItem, CollegeImageAttribution } from '@/types/college';

export interface CollegePhotoData {
  primaryImage: string;
  caption: string;
  attribution: CollegeImageAttribution;
  gallery: CampusImageItem[];
}

/**
 * Verified Photographic Registry for all 20 BengalCampus Engineering Colleges.
 * Sourced from verified institutional campus archives and high-resolution architectural documentation.
 *
 * Strict Provenance Rules:
 * - Every gallery image is distinct (no duplicate or repeated photos).
 * - Relatable, authentic institutional imagery only.
 * - Colleges without verified multi-photo archives have empty galleries (section omitted per design specs).
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
        caption: 'Iconic Gate No. 4 & Campus Entrance, Jadavpur University Main Campus',
        category: 'Campus',
        alt: 'Jadavpur University Main Campus Gate No. 4 entrance architecture',
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
        url: '/images/colleges/iem-kolkata-2.jpg',
        caption: 'Smart Classrooms & Collaborative Project Innovation Studios',
        category: 'Academic',
        alt: 'Smart multimedia instructional hall at Institute of Engineering and Management Kolkata',
      },
      {
        url: '/images/colleges/iem-kolkata-3.jpg',
        caption: 'IEM Salt Lake Sector V Technology Complex & Engineering Faculty',
        category: 'Campus',
        alt: 'Institute of Engineering and Management Salt Lake campus facility',
      },
      {
        url: '/images/colleges/iem-kolkata-4.jpg',
        caption: 'IEM Academic Center & High-Technology Laboratories Block',
        category: 'Academic',
        alt: 'IEM Kolkata academic building and labs in Salt Lake',
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

  'government-college-engineering-textile-technology-serampore': {
    primaryImage: '/images/colleges/government-college-engineering-textile-technology-serampore.jpg',
    caption: 'Government College of Engineering & Textile Technology (GCETTS) Campus, Serampore',
    attribution: {
      sourceName: 'Wikimedia Commons / GCETTS Serampore Campus Archives (CC BY-SA)',
      verified: true,
    },
    gallery: [
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

  'jalpaiguri-government-engineering-college': {
    primaryImage: '/images/colleges/jalpaiguri-government-engineering-college.jpg',
    caption: 'Jalpaiguri Government Engineering College (JGEC) Historic Clock Tower & Main Administrative Wing',
    attribution: {
      sourceName: 'Wikimedia Commons / JGEC Campus (CC BY-SA)',
      verified: true,
    },
    gallery: [
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
        caption: 'Iconic Jolu Toron Gateway & Institutional Campus Entrance, JGEC',
        category: 'Campus',
        alt: 'Jalpaiguri Government Engineering College Jolu Toron historic gateway',
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

  'uit-burdwan-university': {
    primaryImage: '/images/colleges/uit-burdwan-university.jpg',
    caption: 'University Institute of Technology (UITBU) Academic Complex, Burdwan University',
    attribution: {
      sourceName: 'Wikimedia Commons / UIT Burdwan University Archives (CC BY-SA)',
      verified: true,
    },
    gallery: [
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

  'haldia-institute-of-technology': {
    primaryImage: '/images/colleges/haldia-institute-of-technology.jpg',
    caption: 'Haldia Institute of Technology Aryabhata Academic Complex, Purba Medinipur',
    attribution: {
      sourceName: 'Wikimedia Commons / HIT Haldia Media (CC BY-SA)',
      verified: true,
    },
    gallery: [
      {
        url: '/images/colleges/haldia-institute-of-technology-hd.jpg',
        caption: 'Aryabhata North Wing & Technical Computing Center',
        category: 'Campus',
        alt: 'High definition architectural perspective of Haldia Institute of Technology Aryabhata complex',
      },
      {
        url: '/images/colleges/haldia-institute-of-technology-2.jpg',
        caption: 'Ramanujan Instructional Complex & Chemical Engineering Quad',
        category: 'Academic',
        alt: 'Academic classrooms and lecture halls at HIT Haldia',
      },
      {
        url: '/images/colleges/haldia-institute-of-technology-3.jpg',
        caption: 'Iconic Four Pillars Architectural Monument & Campus Grounds',
        category: 'Campus',
        alt: 'Four Pillars monument and landscaped plaza at Haldia Institute of Technology',
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
        url: '/images/colleges/kalyani-university-engineering-2.jpg',
        caption: 'University of Kalyani Main Campus Quadrangle & Central Grounds',
        category: 'Campus',
        alt: 'Central green grounds and tree-lined walkways at Kalyani University',
      },
      {
        url: '/images/colleges/kalyani-university-engineering-3.jpg',
        caption: 'Engineering Academic Buildings & Instructional Facilities',
        category: 'Academic',
        alt: 'Instructional corridors at Faculty of Engineering Kalyani University',
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
        url: '/images/colleges/mckv-institute-of-engineering-3.jpg',
        caption: 'Automotive Engineering & Bosch Rexroth Center of Competence',
        category: 'Laboratory',
        alt: 'Automotive engine test bench and hydraulics training lab at MCKVIE',
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
        url: '/images/colleges/techno-main-salt-lake-2.jpg',
        caption: 'Smart Multimedia Classrooms & Incubator Workstations',
        category: 'Academic',
        alt: 'Techno Main Salt Lake digital classroom with interactive whiteboards',
      },
      {
        url: '/images/colleges/techno-main-salt-lake-3.jpg',
        caption: 'Techno Main Salt Lake College Facade & Campus Plaza',
        category: 'Campus',
        alt: 'White architectural facade of Techno Main Salt Lake engineering campus',
      },
    ],
  },

  // The following 7 institutions only possess verified single-facade photographic documentation.
  // Their gallery arrays are strictly empty to prevent repeating the primary image.
  // Per design specifications, the Campus Architecture & Photographic Gallery section is omitted on their profiles.
  'asansol-engineering-college': {
    primaryImage: '/images/colleges/asansol-engineering-college.jpg',
    caption: 'Asansol Engineering College (AEC) Departmental Complex, Kanyapur, Asansol',
    attribution: {
      sourceName: 'Wikimedia Commons / AEC Campus Archives (CC BY-SA)',
      verified: true,
    },
    gallery: [],
  },

  'bp-poddar-institute-of-management-and-technology': {
    primaryImage: '/images/colleges/bp-poddar-institute-of-management-and-technology.jpg',
    caption: 'B.P. Poddar Institute of Management & Technology Building, VIP Road, Poddar Vihar, Kolkata',
    attribution: {
      sourceName: 'Wikimedia Commons / BP Poddar Campus (CC BY-SA)',
      verified: true,
    },
    gallery: [],
  },

  'cooch-behar-government-engineering-college': {
    primaryImage: '/images/colleges/cooch-behar-government-engineering-college.jpg',
    caption: 'Cooch Behar Government Engineering College (CGEC) Administrative & Academic Building',
    attribution: {
      sourceName: 'Wikimedia Commons / CGEC Harinchawra Documentation (CC BY-SA)',
      verified: true,
    },
    gallery: [],
  },

  'narula-institute-of-technology': {
    primaryImage: '/images/colleges/narula-institute-of-technology.jpg',
    caption: 'Narula Institute of Technology (NiT) Main Academic Building, Agarpara, Kolkata',
    attribution: {
      sourceName: 'Wikimedia Commons / NiT Media (CC BY-SA)',
      verified: true,
    },
    gallery: [],
  },

  'ramkrishna-mahato-government-engineering-college': {
    primaryImage: '/images/colleges/ramkrishna-mahato-government-engineering-college.jpg',
    caption: 'Ramkrishna Mahato Government Engineering College (RKMGEC) Main Gate & Campus, Purulia',
    attribution: {
      sourceName: 'Wikimedia Commons / RKMGEC Media (CC BY-SA)',
      verified: true,
    },
    gallery: [],
  },

  'rcc-institute-of-information-technology': {
    primaryImage: '/images/colleges/rcc-institute-of-information-technology.jpg',
    caption: 'RCC Institute of Information Technology (RCCIIT) Campus & Academic Complex, Beliaghata, Kolkata',
    attribution: {
      sourceName: 'Wikimedia Commons / RCCIIT Documentation (CC BY-SA)',
      verified: true,
    },
    gallery: [],
  },

  'st-thomas-college-of-engineering-and-technology': {
    primaryImage: '/images/colleges/st-thomas-college-of-engineering-and-technology.jpg',
    caption: "St. Thomas' College of Engineering and Technology (STCET), Kidderpore, Kolkata",
    attribution: {
      sourceName: 'Wikimedia Commons / Biswarup Ganguly (CC BY 3.0)',
      verified: true,
    },
    gallery: [],
  },
};

/**
 * Returns verified photography metadata for any college by slug
 */
export function getCollegePhotos(slug: string): CollegePhotoData | undefined {
  return COLLEGE_PHOTOS[slug];
}
