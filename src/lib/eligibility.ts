import { getBranchBySlug } from '@/data/branches';
import { IndicationResult, PercentageType } from '@/types';

export const MANDATORY_ELIGIBILITY_DISCLAIMER = 
  'Based on the information you provided, you may meet the published criteria for this branch. Final eligibility depends on entrance examination (IEMJEE / WBJEE / JEE Main), board regulations, subject-wise marks, category, and domicile verification. Verify with official sources.';

export function evaluateEligibility(
  branchSlug: string,
  rawPercentage: number | string,
  percentageType: PercentageType
): IndicationResult {
  const percentage = typeof rawPercentage === 'string' ? parseFloat(rawPercentage) : rawPercentage;

  if (isNaN(percentage) || percentage < 0 || percentage > 100) {
    return {
      status: 'REVIEW_REQUIRED',
      thresholdChecked: null,
      percentageTypeChecked: percentageType,
      message: 'Please provide a valid percentage between 0 and 100.',
      disclaimer: MANDATORY_ELIGIBILITY_DISCLAIMER,
    };
  }

  const branch = getBranchBySlug(branchSlug);

  if (!branch) {
    return {
      status: 'NOT_APPLICABLE',
      thresholdChecked: null,
      percentageTypeChecked: percentageType,
      message: 'Selected branch information is not currently configured in the database.',
      disclaimer: MANDATORY_ELIGIBILITY_DISCLAIMER,
    };
  }

  // If rule is not VERIFIED_PRIMARY, strictly return REVIEW_REQUIRED
  if (branch.status !== 'VERIFIED_PRIMARY') {
    return {
      status: 'REVIEW_REQUIRED',
      thresholdChecked: null,
      percentageTypeChecked: percentageType,
      message: `Published institutional criteria for ${branch.name} require counsellor review. An advisor will review your marks against current seat matrix guidelines.`,
      disclaimer: MANDATORY_ELIGIBILITY_DISCLAIMER,
    };
  }

  const threshold = percentageType === 'PCM' ? branch.minPcmPercent : branch.minAggregatePercent;

  if (threshold === null || threshold === undefined) {
    return {
      status: 'REVIEW_REQUIRED',
      thresholdChecked: null,
      percentageTypeChecked: percentageType,
      message: `Specific published criteria for ${percentageType}% are pending confirmation for ${branch.name}. Counsellor guidance is recommended.`,
      disclaimer: MANDATORY_ELIGIBILITY_DISCLAIMER,
    };
  }

  if (percentage >= threshold) {
    return {
      status: 'POSSIBLY_MEETS',
      thresholdChecked: threshold,
      percentageTypeChecked: percentageType,
      message: `Based on your declared score of ${percentage.toFixed(1)}% (${percentageType}), you may meet the published threshold of ${threshold}% for ${branch.name}.`,
      disclaimer: MANDATORY_ELIGIBILITY_DISCLAIMER,
    };
  } else {
    return {
      status: 'BELOW_THRESHOLD',
      thresholdChecked: threshold,
      percentageTypeChecked: percentageType,
      message: `Your declared score of ${percentage.toFixed(1)}% (${percentageType}) is below the typical direct published threshold of ${threshold}% for ${branch.name}. Admission guidance can help explore alternative branch preferences or entrance examination pathways.`,
      disclaimer: MANDATORY_ELIGIBILITY_DISCLAIMER,
    };
  }
}
