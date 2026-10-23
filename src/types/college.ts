export type VerificationStatus = 'verified' | 'needs_review' | 'not_verified';

export interface FieldProvenance {
  sourceUrl: string | null;
  sourceName: string;
  retrievedAt: string; // ISO 8601
  academicYear: string;
  verificationStatus: VerificationStatus;
  note?: string;
}

export type InstitutionCategory =
  | 'State University Faculty'
  | 'Government Engineering College'
  | 'Autonomous Private Institute'
  | 'Private Engineering College';

export interface BTechProgram {
  name: string;
  slug: string;
  intakeEst: number | null;
  nbaAccredited?: boolean;
}

export interface FeeStructure {
  annualTuitionMin: number | null;
  annualTuitionMax: number | null;
  oneTimeAdmissionFee?: number | null;
  cautionDeposit?: number | null;
  currency: string;
  disclaimer: string;
}

export interface College {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  wbjeebCode: string; // Official WBJEE counselling code
  category: InstitutionCategory;
  established: number;
  district: string;
  city: string;
  address: string;
  pincode: string;
  affiliation: string; // MAKAUT, Autonomous University, etc.
  regulatoryApproval: string; // AICTE Approved, etc.
  naacGrade: string | null; // 'A++', 'A+', 'A', 'B++', null if unverified
  nirfRankEngineering2024: number | string | null; // e.g., 10 or 'Rank Band 151-200' or null
  officialWebsite: string;
  overview: string;
  programs: BTechProgram[];
  feeStructure: FeeStructure;
  acceptedExams: string[];
  hostelAvailable: boolean | null;
  contact: {
    officialEmail: string;
    helplineMasked: string;
    campusAddress: string;
  };
  provenance: {
    overview: FieldProvenance;
    accreditation: FieldProvenance;
    fees: FieldProvenance;
    programs: FieldProvenance;
  };
  featured?: boolean;
}

export interface CollegeFilterState {
  searchQuery: string;
  category: string;
  district: string;
  maxAnnualFee: number | null;
  naacAccreditedOnly: boolean;
  sortBy: 'name-asc' | 'nirf-asc' | 'fee-asc' | 'fee-desc';
}
