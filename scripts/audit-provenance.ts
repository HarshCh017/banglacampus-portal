/**
 * BanglaCampus - Automated Regulatory Provenance & Data Integrity Auditor
 * Validates all institutions, field citations, ISO 8601 timestamps, fee bounds, and cutoff consistency.
 */

import { VERIFIED_COLLEGES } from '../src/data/colleges';
import { VERIFIED_CUTOFFS } from '../src/data/cutoffs';

function runAudit() {
  console.log('====================================================');
  console.log('🔍 BANGLACAMPUS REGULATORY DATA INTEGRITY AUDITOR');
  console.log('====================================================\n');

  let passed = 0;
  let errors: string[] = [];

  console.log(`Checking ${VERIFIED_COLLEGES.length} institutions in verified catalog...`);

  const seenCodes = new Set<string>();
  const seenSlugs = new Set<string>();

  for (const college of VERIFIED_COLLEGES) {
    // Unique slug check
    if (seenSlugs.has(college.slug)) {
      errors.push(`Duplicate college slug found: ${college.slug}`);
    }
    seenSlugs.add(college.slug);

    // Unique WBJEEB code check
    if (seenCodes.has(college.wbjeebCode)) {
      errors.push(`Duplicate WBJEEB code found: ${college.wbjeebCode} (${college.shortName})`);
    }
    seenCodes.add(college.wbjeebCode);

    // Provenance URLs check
    const p = college.provenance;
    if (!p.overview.sourceUrl || !p.overview.sourceUrl.startsWith('http')) {
      errors.push(`Invalid overview source URL for ${college.shortName}`);
    }
    if (!p.fees.sourceUrl || !p.fees.sourceUrl.startsWith('http')) {
      errors.push(`Invalid fees source URL for ${college.shortName}`);
    }
    if (!p.programs.sourceUrl || !p.programs.sourceUrl.startsWith('http')) {
      errors.push(`Invalid programs source URL for ${college.shortName}`);
    }
    if (!p.accreditation.sourceUrl || !p.accreditation.sourceUrl.startsWith('http')) {
      errors.push(`Invalid accreditation source URL for ${college.shortName}`);
    }

    // Provenance timestamps check (valid ISO 8601)
    if (isNaN(Date.parse(p.overview.retrievedAt))) {
      errors.push(`Invalid overview retrievedAt ISO date for ${college.shortName}`);
    }
    if (isNaN(Date.parse(p.fees.retrievedAt))) {
      errors.push(`Invalid fees retrievedAt ISO date for ${college.shortName}`);
    }

    // Anti-fabrication check: fees cannot be negative or fake 0
    if (college.feeStructure.annualTuitionMin !== null) {
      if (college.feeStructure.annualTuitionMin <= 0) {
        errors.push(`Invalid zero or negative tuition for ${college.shortName}: ${college.feeStructure.annualTuitionMin}`);
      }
      if (
        college.feeStructure.annualTuitionMax !== null &&
        college.feeStructure.annualTuitionMax < college.feeStructure.annualTuitionMin
      ) {
        errors.push(`Annual max tuition < min tuition for ${college.shortName}`);
      }
    }

    // Program seat matrix
    if (college.programs.length === 0) {
      errors.push(`Zero approved programs listed for ${college.shortName}`);
    }

    passed++;
  }

  console.log(`\nChecking ${VERIFIED_CUTOFFS.length} historical cutoff records...`);
  for (const cutoff of VERIFIED_CUTOFFS) {
    // References valid college
    const college = VERIFIED_COLLEGES.find((c) => c.slug === cutoff.collegeSlug);
    if (!college) {
      errors.push(`Cutoff references unknown college slug: ${cutoff.collegeSlug}`);
    }

    // Cutoff rank sanity: final round rank must be >= round 1 rank
    if (cutoff.approxClosingRankFinalRound < cutoff.approxClosingRankRound1) {
      errors.push(
        `Final round closing rank (${cutoff.approxClosingRankFinalRound}) < Round 1 rank (${cutoff.approxClosingRankRound1}) for ${cutoff.collegeShortName} ${cutoff.branchName}`
      );
    }
  }

  console.log('\n----------------------------------------------------');
  if (errors.length > 0) {
    console.error(`❌ AUDIT FAILED with ${errors.length} integrity violation(s):`);
    errors.forEach((err, idx) => console.error(`  ${idx + 1}. ${err}`));
    process.exit(1);
  } else {
    console.log(`✅ AUDIT PASSED: All ${VERIFIED_COLLEGES.length} colleges and ${VERIFIED_CUTOFFS.length} cutoff records conform to strict regulatory provenance rules.`);
    console.log('----------------------------------------------------\n');
  }
}

runAudit();
