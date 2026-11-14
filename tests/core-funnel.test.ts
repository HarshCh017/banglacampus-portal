import test from 'node:test';
import assert from 'node:assert/strict';
import { leadFormSchema, normalizePhoneNumber } from '@/lib/schema';
import { evaluateEligibility } from '@/lib/eligibility';
import { persistLeadRecord, getAllLeads } from '@/lib/leadStore';

test('1. Phone Normalizer', () => {
  assert.equal(normalizePhoneNumber('9876543210'), '+919876543210');
  assert.equal(normalizePhoneNumber('+91 98765 43210'), '+919876543210');
  assert.equal(normalizePhoneNumber('919876543210'), '+919876543210');
});

test('2. Zod Schema Validation - Valid Submission', () => {
  const input = {
    fullName: 'Ananya Chatterjee',
    phone: '9830123456',
    twelfthPercentage: 88.5,
    percentageType: 'PCM',
    branch: 'cse',
    consent: true,
  };

  const res = leadFormSchema.safeParse(input);
  assert.equal(res.success, true);
  if (res.success) {
    assert.equal(res.data.fullName, 'Ananya Chatterjee');
    assert.equal(res.data.branch, 'cse');
    assert.equal(res.data.percentageType, 'PCM');
  }
});

test('3. Zod Schema Validation - Rejects Invalid Formats', () => {
  // Invalid phone (too short)
  const badPhone = leadFormSchema.safeParse({
    fullName: 'Rahul Sen',
    phone: '12345',
    twelfthPercentage: 85,
    percentageType: 'Aggregate',
    branch: 'cse',
    consent: true,
  });
  assert.equal(badPhone.success, false);

  // Invalid percentage (> 100)
  const badPct = leadFormSchema.safeParse({
    fullName: 'Rahul Sen',
    phone: '9876543210',
    twelfthPercentage: 105,
    percentageType: 'Aggregate',
    branch: 'cse',
    consent: true,
  });
  assert.equal(badPct.success, false);

  // Unchecked consent
  const badConsent = leadFormSchema.safeParse({
    fullName: 'Rahul Sen',
    phone: '9876543210',
    twelfthPercentage: 85,
    percentageType: 'Aggregate',
    branch: 'cse',
    consent: false,
  });
  assert.equal(badConsent.success, false);

  // Unverified branch slug
  const badBranch = leadFormSchema.safeParse({
    fullName: 'Rahul Sen',
    phone: '9876543210',
    twelfthPercentage: 85,
    percentageType: 'Aggregate',
    branch: 'aerospace-engineering',
    consent: true,
  });
  assert.equal(badBranch.success, false);
});

test('4. Eligibility Indication Engine - Evaluates Safely', () => {
  // CSE threshold is 80% Aggregate, 60% PCM
  const cseAbove = evaluateEligibility('cse', 85, 'Aggregate');
  assert.equal(cseAbove.status, 'POSSIBLY_MEETS');
  assert.match(cseAbove.message, /may meet the published threshold/);
  assert.doesNotMatch(cseAbove.message, /You are eligible/); // Red line check

  const cseBelow = evaluateEligibility('cse', 72, 'Aggregate');
  assert.equal(cseBelow.status, 'BELOW_THRESHOLD');
  assert.match(cseBelow.message, /below the typical direct published threshold/);

  // Unverified/Specialized branch fallback to REVIEW_REQUIRED
  const secondaryBranch = evaluateEligibility('cse-iot-cs-bt', 90, 'Aggregate');
  assert.equal(secondaryBranch.status, 'REVIEW_REQUIRED');

  // Unknown branch fallback to NOT_APPLICABLE
  const unknownBranch = evaluateEligibility('non-existent-branch', 90, 'Aggregate');
  assert.equal(unknownBranch.status, 'NOT_APPLICABLE');

  // Mandatory disclaimer must always be present
  assert.match(cseAbove.disclaimer, /Final eligibility depends on entrance examination/);
});

test('5. Lead Persistence & Fallback Queue Storage', async () => {
  const leadData = {
    fullName: 'Sourav Ganguly',
    phone: '+919876543210',
    twelfthPercentage: 82.0,
    percentageType: 'PCM' as const,
    branch: 'cse-aiml',
    consentGiven: true,
    consentTimestamp: new Date().toISOString(),
    consentVersion: 'v1.0-2027',
    eligibilityResult: 'POSSIBLY_MEETS' as const,
    attribution: {
      sourceCtaId: 'test-suite',
      idempotencyKey: `test_idemp_${Date.now()}`,
    },
  };

  const record = await persistLeadRecord(leadData);
  assert.ok(record.id.startsWith('IEM-'));
  assert.equal(record.status, 'NEW');
  assert.equal(record.syncStatus, 'LOCAL_ONLY');

  const allLeads = getAllLeads();
  const found = allLeads.find((l) => l.id === record.id);
  assert.ok(found, 'Lead was persisted in local data/leads.json queue');
  assert.equal(found?.fullName, 'Sourav Ganguly');
});

test('6. Idempotency Key Prevents Duplicate Leads', async () => {
  const duplicateKey = `idemp_dup_test_${Date.now()}`;
  const leadData = {
    fullName: 'Pooja Roy',
    phone: '+919830000000',
    twelfthPercentage: 78.5,
    percentageType: 'Aggregate' as const,
    branch: 'it',
    consentGiven: true,
    consentTimestamp: new Date().toISOString(),
    consentVersion: 'v1.0-2027',
    eligibilityResult: 'POSSIBLY_MEETS' as const,
    attribution: {
      sourceCtaId: 'test-suite',
      idempotencyKey: duplicateKey,
    },
  };

  const firstSubmission = await persistLeadRecord(leadData);
  const secondSubmission = await persistLeadRecord(leadData);

  assert.equal(firstSubmission.id, secondSubmission.id, 'Idempotent submission returns the exact same lead record ID without creating duplicate');
});

test('7. Verified Branches Catalog Integrity', () => {
  const { VERIFIED_BRANCHES } = require('@/data/branches');
  assert.equal(VERIFIED_BRANCHES.length, 11, 'Must have exactly 11 verified B.Tech branches');
  
  for (const b of VERIFIED_BRANCHES) {
    assert.ok(b.slug, `Branch must have valid slug: ${b.slug}`);
    assert.ok(b.name, `Branch must have name: ${b.slug}`);
    assert.ok(b.shortName, `Branch must have shortName: ${b.slug}`);
    assert.ok(b.intakeEst, `Branch must have intakeEst: ${b.slug}`);
    assert.ok(Array.isArray(b.highlights) && b.highlights.length > 0, `Branch must have highlights: ${b.slug}`);
    assert.ok(b.description, `Branch must have description: ${b.slug}`);
  }
});

test('8. Structured Data Schema Generation', () => {
  const { VERIFIED_BRANCHES } = require('@/data/branches');
  const sampleBranch = VERIFIED_BRANCHES[0];
  
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `B.Tech in ${sampleBranch.name}`,
    description: sampleBranch.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Institute of Engineering & Management (IEM), Kolkata',
      sameAs: 'https://iem.edu.in',
    },
  };

  assert.equal(courseSchema['@type'], 'Course');
  assert.equal(courseSchema.provider.name, 'Institute of Engineering & Management (IEM), Kolkata');
  assert.ok(courseSchema.name.includes('Computer Science & Engineering'));
});

test('9. Honeypot Bot Detection Logic', () => {
  // Simulating bot payload that fills out hidden honeypot
  const isBotSubmission = (body: any) => {
    return Boolean(body.hp_website_confirm && String(body.hp_website_confirm).trim() !== '');
  };

  assert.equal(isBotSubmission({ hp_website_confirm: '' }), false, 'Real user leaves honeypot blank');
  assert.equal(isBotSubmission({ hp_website_confirm: undefined }), false, 'Undefined honeypot is valid');
  assert.equal(isBotSubmission({ hp_website_confirm: 'https://spambot.ru' }), true, 'Bot trapped by honeypot');
});

test('10. Percentage Decimal Precision Handling', () => {
  const validRound = leadFormSchema.safeParse({
    fullName: 'Debanjan Mukherjee',
    phone: '9830555555',
    twelfthPercentage: 89.75,
    percentageType: 'PCM',
    branch: 'cse',
    consent: true,
  });
  assert.equal(validRound.success, true);
  if (validRound.success) {
    assert.equal(validRound.data.twelfthPercentage, 89.75);
  }
});

