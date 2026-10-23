import test from 'node:test';
import assert from 'node:assert/strict';
import {
  studentEnquirySchema,
  sanitizeForSpreadsheet,
  validateCollegeBranchCompatibility,
  generateSubmissionId,
} from '@/lib/enquiryValidation';
import { buildGoogleSheetsRow } from '@/lib/googleSheetsService';
import { ALL_STATE_NAMES } from '@/data/indianStates';
import { VERIFIED_COLLEGES, getCollegeBySlug } from '@/data/colleges';
import { ENQUIRY_CONFIG } from '@/config/enquiry';

test('1. Enquiry Modal Configuration & Trigger Timing', () => {
  assert.equal(
    ENQUIRY_CONFIG.TRIGGER_DELAY_MS,
    5000,
    'Enquiry popup trigger delay must be exactly 5000ms (5 seconds)'
  );
  assert.equal(
    ENQUIRY_CONFIG.DISMISSAL_POLICY,
    'per_route',
    'Dismissal policy must be per_route to allow newly opened college pages to trigger'
  );
  assert.ok(ENQUIRY_CONFIG.STORAGE_KEYS.DISMISSED_ROUTES, 'Storage key must be defined');
});

test('2. Indian States & UTs Dataset Integrity', () => {
  // 28 States + 8 Union Territories = 36 total entities
  assert.equal(ALL_STATE_NAMES.length, 36, 'Must include all 28 states and 8 union territories of India');
  assert.ok(ALL_STATE_NAMES.includes('West Bengal'));
  assert.ok(ALL_STATE_NAMES.includes('Delhi (NCT)'));
  assert.ok(ALL_STATE_NAMES.includes('Bihar'));
  assert.ok(ALL_STATE_NAMES.includes('Jharkhand'));
  assert.ok(ALL_STATE_NAMES.includes('Odisha'));
});

test('3. Schema Validation - Valid Submission', () => {
  const validPayload = {
    fullName: 'Ananya Mukherjee',
    class10Percentage: 88.5,
    class12Percentage: 84.2,
    state: 'West Bengal',
    preferredCollege: 'jadavpur-university-engineering',
    preferredBranch: 'cse',
    consent: true,
  };

  const result = studentEnquirySchema.safeParse(validPayload);
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.fullName, 'Ananya Mukherjee');
    assert.equal(result.data.class10Percentage, 88.5);
    assert.equal(result.data.class12Percentage, 84.2);
    assert.equal(result.data.state, 'West Bengal');
  }
});

test('4. Schema Validation - Rejects Invalid & Out-of-Bound Percentages', () => {
  const base = {
    fullName: 'Rahul Sen',
    state: 'West Bengal',
    preferredCollege: 'iem-kolkata',
    preferredBranch: 'cse',
    consent: true,
  };

  // Negative percentage
  const negResult = studentEnquirySchema.safeParse({
    ...base,
    class10Percentage: -5.0,
    class12Percentage: 80.0,
  });
  assert.equal(negResult.success, false);

  // Percentage > 100
  const overResult = studentEnquirySchema.safeParse({
    ...base,
    class10Percentage: 92.0,
    class12Percentage: 105.0,
  });
  assert.equal(overResult.success, false);

  // String / NaN percentage
  const nanResult = studentEnquirySchema.safeParse({
    ...base,
    class10Percentage: 'eighty-eight' as any,
    class12Percentage: 80.0,
  });
  assert.equal(nanResult.success, false);
});

test('5. Schema Validation - Rejects Empty / Whitespace-Only Name & Missing Consent', () => {
  const base = {
    class10Percentage: 85.0,
    class12Percentage: 82.0,
    state: 'West Bengal',
    preferredCollege: 'heritage-institute-of-technology',
    preferredBranch: 'cse',
  };

  // Empty Name
  const emptyName = studentEnquirySchema.safeParse({
    ...base,
    fullName: '   ',
    consent: true,
  });
  assert.equal(emptyName.success, false);

  // Unchecked Consent
  const noConsent = studentEnquirySchema.safeParse({
    ...base,
    fullName: 'Debolina Ghosh',
    consent: false,
  });
  assert.equal(noConsent.success, false);
});

test('6. College-Branch Compatibility Revalidation', () => {
  // JU offers CSE
  assert.equal(validateCollegeBranchCompatibility('jadavpur-university-engineering', 'cse'), true);
  assert.equal(validateCollegeBranchCompatibility('jadavpur-university-engineering', 'Computer Science & Engineering'), true);

  // JU does NOT offer Aeronautical Engineering in our verified programs
  assert.equal(validateCollegeBranchCompatibility('jadavpur-university-engineering', 'aeronautical-fake-branch'), false);

  // Non-existent college
  assert.equal(validateCollegeBranchCompatibility('fake-college-xyz', 'cse'), false);

  // Haldia Institute of Technology compatibility
  assert.equal(validateCollegeBranchCompatibility('haldia-institute-of-technology', 'che'), true);
  assert.equal(validateCollegeBranchCompatibility('haldia-institute-of-technology', 'Chemical Engineering'), true);

  // Narula Institute of Technology compatibility
  assert.equal(validateCollegeBranchCompatibility('narula-institute-of-technology', 'ece'), true);
});

test('7. Spreadsheet Formula Injection Defense (Sanitization)', () => {
  // Equals formula injection
  assert.equal(sanitizeForSpreadsheet('=SUM(A1:A10)'), "'=SUM(A1:A10)");
  assert.equal(sanitizeForSpreadsheet('=cmd|"/C calc"!A0'), "'=cmd|\"/C calc\"!A0");

  // Plus, Minus, At prefixes
  assert.equal(sanitizeForSpreadsheet('+12345'), "'+12345");
  assert.equal(sanitizeForSpreadsheet('-500'), "'-500");
  assert.equal(sanitizeForSpreadsheet('@IMPORTXML("https://attacker.com")'), "'@IMPORTXML(\"https://attacker.com\")");

  // Benign strings remain unmodified
  assert.equal(sanitizeForSpreadsheet('Suman Das'), 'Suman Das');
  assert.equal(sanitizeForSpreadsheet('Jadavpur University'), 'Jadavpur University');
  assert.equal(sanitizeForSpreadsheet(88.5), '88.5');
  assert.equal(sanitizeForSpreadsheet(null), '');
});

test('8. Google Sheets Column Mapping (Column A to J Integrity)', () => {
  const input = {
    fullName: 'Sourav Roy',
    class10Percentage: 91.2,
    class12Percentage: 86.8,
    state: 'West Bengal',
    preferredCollege: 'jadavpur-university-engineering',
    preferredBranch: 'cse',
    consent: true as const,
    sourceUrl: 'https://banglacampus.in/colleges/jadavpur-university-engineering',
  };

  const submissionId = generateSubmissionId();
  const timestamp = '2026-10-24T02:15:00.000Z';
  const row = buildGoogleSheetsRow(input, submissionId, timestamp);

  // Column A: Submission ID
  assert.ok(row.submissionId.startsWith('BC-ENQ-'));
  // Column B: Submission Timestamp
  assert.equal(row.submissionTimestamp, '2026-10-24T02:15:00.000Z');
  // Column C: Student Name
  assert.equal(row.studentName, 'Sourav Roy');
  // Column D: Class 10 Percentage
  assert.equal(row.class10Percentage, 91.2);
  // Column E: Class 12 Percentage
  assert.equal(row.class12Percentage, 86.8);
  // Column F: State / Union Territory
  assert.equal(row.state, 'West Bengal');
  // Column G: Preferred College
  assert.ok(row.preferredCollege.includes('Jadavpur University'));
  assert.ok(row.preferredCollege.includes('Code 001'));
  // Column H: Preferred Branch
  assert.equal(row.preferredBranch, 'Computer Science & Engineering');
  // Column I: Source Page URL
  assert.equal(row.sourceUrl, 'https://banglacampus.in/colleges/jadavpur-university-engineering');
  // Column J: Consent Status
  assert.ok(row.consentStatus.includes('Consent Granted'));
});

test('9. Submission ID Collision Resistance & Format', () => {
  const id1 = generateSubmissionId();
  const id2 = generateSubmissionId();
  assert.notEqual(id1, id2, 'Generated submission IDs must be unique');
  assert.ok(id1.startsWith('BC-ENQ-'), 'ID must use the BC-ENQ- prefix');
});
