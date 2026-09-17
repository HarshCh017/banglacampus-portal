export type PercentageType = 'Aggregate' | 'PCM';

export type EligibilityOutcome = 
  | 'POSSIBLY_MEETS' 
  | 'BELOW_THRESHOLD' 
  | 'REVIEW_REQUIRED' 
  | 'NOT_APPLICABLE';

export interface IndicationResult {
  status: EligibilityOutcome;
  thresholdChecked: number | null;
  percentageTypeChecked: PercentageType;
  message: string;
  disclaimer: string;
}

export interface LeadFormData {
  fullName: string;
  phone: string;
  twelfthPercentage: number | string;
  percentageType: PercentageType;
  branch: string;
  consent: boolean;
}

export interface BranchInfo {
  slug: string;
  name: string;
  shortName: string;
  department: string;
  intakeEst: string;
  minAggregatePercent: number | null;
  minPcmPercent: number | null;
  status: 'VERIFIED_PRIMARY' | 'VERIFIED_SECONDARY';
  description: string;
  highlights: string[];
  careerPaths: string[];
}

export interface AttributionMetadata {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPage?: string;
  referrer?: string;
  firstTouchSource?: string;
  lastTouchSource?: string;
  sourceCtaId?: string;
  idempotencyKey?: string;
}

export interface StoredLeadRecord {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  twelfthPercentage: number;
  percentageType: PercentageType;
  branch: string;
  branchName: string;
  consentGiven: boolean;
  consentTimestamp: string;
  consentVersion: string;
  eligibilityResult: EligibilityOutcome;
  attribution: AttributionMetadata;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'APPLIED' | 'ENROLLED';
  syncStatus: 'SYNCED' | 'PENDING_RETRY' | 'LOCAL_ONLY';
}
