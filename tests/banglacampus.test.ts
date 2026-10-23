import test from 'node:test';
import assert from 'node:assert/strict';
import { VERIFIED_COLLEGES, getCollegeBySlug, getAllDistricts, getAllCategories } from '@/data/colleges';
import { VERIFIED_ARTICLES, getArticleBySlug } from '@/data/articles';
import { z } from 'zod';

test('1. BanglaCampus College Catalog Integrity & Provenance', () => {
  assert.ok(VERIFIED_COLLEGES.length >= 8, 'Must have at least 8 verified West Bengal colleges');

  for (const college of VERIFIED_COLLEGES) {
    assert.ok(college.id, `College must have id: ${college.name}`);
    assert.ok(college.slug, `College must have slug: ${college.name}`);
    assert.ok(college.wbjeebCode, `College must have WBJEEB code: ${college.name}`);
    assert.ok(college.category, `College must have category: ${college.name}`);
    assert.ok(college.district, `College must have district: ${college.name}`);
    assert.ok(college.programs.length > 0, `College must offer B.Tech programs: ${college.name}`);

    // Verify Field-Level Provenance exists and has valid source URLs and timestamps
    assert.ok(college.provenance.overview.sourceUrl, `Overview source URL missing for ${college.name}`);
    assert.ok(college.provenance.fees.sourceUrl, `Fees source URL missing for ${college.name}`);
    assert.ok(college.provenance.programs.sourceUrl, `Programs source URL missing for ${college.name}`);
    assert.ok(college.provenance.accreditation.sourceUrl, `Accreditation source URL missing for ${college.name}`);

    // Check ISO 8601 date validity
    assert.ok(!isNaN(Date.parse(college.provenance.fees.retrievedAt)), `Invalid retrieval date for ${college.name}`);
    assert.equal(college.provenance.fees.verificationStatus, 'verified', `Fees must be verified for ${college.name}`);

    // Anti-fabrication check: fees cannot be negative or fake zero
    if (college.feeStructure.annualTuitionMin !== null) {
      assert.ok(college.feeStructure.annualTuitionMin > 0, `Annual tuition cannot be zero or negative: ${college.name}`);
    }
  }
});

test('2. College Directory Search & Filter Engine', () => {
  // Query search
  const jadavpur = VERIFIED_COLLEGES.filter((c) =>
    c.name.toLowerCase().includes('jadavpur') || c.shortName.toLowerCase().includes('jadavpur')
  );
  assert.equal(jadavpur.length, 1);
  assert.equal(jadavpur[0].wbjeebCode, '001');

  // Stream/program search
  const cseColleges = VERIFIED_COLLEGES.filter((c) =>
    c.programs.some((p) => p.slug === 'cse')
  );
  assert.ok(cseColleges.length >= 7, 'Most institutions should offer core CSE');

  // District filter
  const kolkataColleges = VERIFIED_COLLEGES.filter((c) => c.district === 'Kolkata');
  assert.ok(kolkataColleges.length >= 4, 'Must have multiple Kolkata colleges');

  // Category filter
  const govtColleges = VERIFIED_COLLEGES.filter((c) => c.category === 'Government Engineering College');
  assert.ok(govtColleges.length >= 3, 'Must have at least 3 Government Engineering Colleges');
});

test('3. Directory Sorting Logic (NIRF, Fees, Alphabetical)', () => {
  // Sort by NIRF Rank
  const sortedNirf = [...VERIFIED_COLLEGES].sort((a, b) => {
    const rankA = typeof a.nirfRankEngineering2024 === 'number' ? a.nirfRankEngineering2024 : 999;
    const rankB = typeof b.nirfRankEngineering2024 === 'number' ? b.nirfRankEngineering2024 : 999;
    return rankA - rankB;
  });
  // Jadavpur University is ranked #10 in NIRF 2024, so it must be first
  assert.equal(sortedNirf[0].slug, 'jadavpur-university-engineering');
  assert.equal(sortedNirf[0].nirfRankEngineering2024, 10);

  // Sort by Tuition Fee Ascending
  const sortedFee = [...VERIFIED_COLLEGES].sort((a, b) => {
    const feeA = a.feeStructure.annualTuitionMin ?? Number.MAX_SAFE_INTEGER;
    const feeB = b.feeStructure.annualTuitionMin ?? Number.MAX_SAFE_INTEGER;
    return feeA - feeB;
  });
  // Subsidized government/university colleges should appear before private institutions
  assert.ok(
    sortedFee[0].feeStructure.annualTuitionMin! <= 15000,
    'Subsidized institutions should lead ascending fee sorting'
  );
});

test('4. Comparison Constraints: Max 3 Colleges & State Integrity', () => {
  const MAX_LIMIT = 3;
  const sampleSlugs = ['jadavpur-university-engineering', 'iem-kolkata', 'heritage-institute-of-technology'];

  // Add 4th college
  const simulateAdd = (current: string[], newSlug: string) => {
    if (current.includes(newSlug)) return current;
    if (current.length >= MAX_LIMIT) return current;
    return [...current, newSlug];
  };

  const atMax = sampleSlugs;
  const afterAttempt = simulateAdd(atMax, 'kalyani-government-engineering-college');
  assert.equal(afterAttempt.length, 3, 'Cannot exceed maximum of 3 colleges');
  assert.deepEqual(afterAttempt, sampleSlugs, 'Comparison selection must remain capped at 3');

  // Verify missing data handling does not fabricate zeroes
  const kgec = getCollegeBySlug('kalyani-government-engineering-college');
  assert.ok(kgec);
  assert.equal(kgec.naacGrade, null, 'KGEC NAAC grade is unverified and must be null');
  assert.equal(kgec.nirfRankEngineering2024, null, 'KGEC NIRF rank must be null, not fake zero');
});

test('5. Contact Form Validation & Honeypot Logic', () => {
  const contactSchema = z.object({
    fullName: z.string().min(2).max(80),
    email: z.string().email(),
    subject: z.string().min(3).max(120),
    message: z.string().min(10).max(2000),
    consent: z.literal(true),
    hp_website: z.string().optional(),
  });

  // Valid submission
  const valid = contactSchema.safeParse({
    fullName: 'Pritam Sarkar',
    email: 'pritam@example.com',
    subject: 'Data Correction for KGEC',
    message: 'The official WBJEEB college code for KGEC is 101 as verified.',
    consent: true,
  });
  assert.equal(valid.success, true);

  // Missing consent must fail
  const noConsent = contactSchema.safeParse({
    fullName: 'Pritam Sarkar',
    email: 'pritam@example.com',
    subject: 'Data Correction for KGEC',
    message: 'The official WBJEEB college code for KGEC is 101 as verified.',
    consent: false,
  });
  assert.equal(noConsent.success, false);

  // Bot honeypot detection
  const isBot = (body: { hp_website?: string }) => {
    return Boolean(body.hp_website && body.hp_website.trim() !== '');
  };
  assert.equal(isBot({ hp_website: '' }), false);
  assert.equal(isBot({ hp_website: 'https://spamlink.com' }), true);
});

test('6. Educational Articles & Editorial Metadata', () => {
  assert.ok(VERIFIED_ARTICLES.length >= 3, 'Must have at least 3 educational articles');

  for (const article of VERIFIED_ARTICLES) {
    assert.ok(article.slug, `Article slug missing`);
    assert.ok(article.title, `Article title missing`);
    assert.ok(article.description, `Article description missing`);
    assert.ok(article.content.length > 200, `Article content too brief: ${article.slug}`);
    assert.ok(article.readTimeMinutes > 0, `Article read time must be positive`);
    assert.ok(article.author.name, `Article author name missing`);
    assert.ok(!isNaN(Date.parse(article.publishedAt)), `Article publish date invalid`);
  }
});

test('7. WBJEE Cutoffs Catalog & Reference Integrity', () => {
  const { VERIFIED_CUTOFFS } = require('@/data/cutoffs');
  assert.ok(VERIFIED_CUTOFFS.length >= 10, 'Must have at least 10 cutoff records');

  for (const c of VERIFIED_CUTOFFS) {
    assert.ok(c.collegeId, 'Cutoff must have collegeId');
    assert.ok(c.collegeSlug, 'Cutoff must have collegeSlug');
    assert.ok(c.wbjeebCode, 'Cutoff must have wbjeebCode');
    assert.ok(c.branchName, 'Cutoff must have branchName');
    assert.ok(c.sourceUrl, 'Cutoff must have sourceUrl');
    assert.ok(c.approxClosingRankRound1 > 0, 'Round 1 cutoff must be positive');
    assert.ok(
      c.approxClosingRankFinalRound >= c.approxClosingRankRound1,
      `Final round cutoff must be >= round 1 cutoff for ${c.collegeShortName} ${c.branchName}`
    );

    // Verify referenced college exists in VERIFIED_COLLEGES
    const matchedCollege = VERIFIED_COLLEGES.find((col) => col.slug === c.collegeSlug);
    assert.ok(matchedCollege, `Cutoff references non-existent college slug: ${c.collegeSlug}`);
  }
});

test('8. Cutoff Matcher Classification Logic', () => {
  const { VERIFIED_CUTOFFS } = require('@/data/cutoffs');
  const juCse = VERIFIED_CUTOFFS.find((c: any) => c.collegeId === 'ju-fet' && c.branchSlug === 'cse');
  assert.ok(juCse);

  // Helper matching function
  const classify = (rank: number, record: any) => {
    if (rank <= record.approxClosingRankRound1) return 'PROBABLE';
    if (rank <= record.approxClosingRankFinalRound) return 'COMPETITIVE';
    if (rank <= Math.round(record.approxClosingRankFinalRound * 1.25)) return 'ASPIRATIONAL';
    return 'OUT_OF_RANGE';
  };

  // Rank 50 is strictly <= 110 (Round 1 cutoff)
  assert.equal(classify(50, juCse), 'PROBABLE');
  // Rank 130 is between 110 and 155
  assert.equal(classify(130, juCse), 'COMPETITIVE');
  // Rank 180 is within 155 * 1.25
  assert.equal(classify(180, juCse), 'ASPIRATIONAL');
  // Rank 5000 is way beyond JU CSE
  assert.equal(classify(5000, juCse), 'OUT_OF_RANGE');
});

test('9. QuickSearch Query Resolution & Index Integrity', () => {
  const querySearch = (q: string) => {
    const trimmed = q.trim().toLowerCase();
    return VERIFIED_COLLEGES.filter((c) => {
      return (
        c.name.toLowerCase().includes(trimmed) ||
        c.shortName.toLowerCase().includes(trimmed) ||
        c.city.toLowerCase().includes(trimmed) ||
        c.district.toLowerCase().includes(trimmed) ||
        c.wbjeebCode.toLowerCase().includes(trimmed) ||
        c.category.toLowerCase().includes(trimmed) ||
        c.programs.some((p) => p.name.toLowerCase().includes(trimmed) || p.slug.toLowerCase().includes(trimmed))
      );
    });
  };

  // Code search
  const results104 = querySearch('104');
  assert.equal(results104.length, 1);
  assert.equal(results104[0].shortName, 'IEM Kolkata');

  // City search
  const kolkataMatches = querySearch('Kolkata');
  assert.ok(kolkataMatches.length >= 5);

  // Non-existent search
  const zeroMatches = querySearch('xyznonexistentquery999');
  assert.equal(zeroMatches.length, 0);
});

test('10. Comparison Matrix Difference Detection Engine', () => {
  const hasDiff = (colleges: any[], extractor: (c: any) => any) => {
    if (colleges.length <= 1) return false;
    const values = colleges.map((c) => JSON.stringify(extractor(c)));
    return new Set(values).size > 1;
  };

  const c1 = getCollegeBySlug('jadavpur-university-engineering')!;
  const c2 = getCollegeBySlug('iem-kolkata')!;

  assert.ok(c1 && c2);

  // Categories differ: State University vs Autonomous Private
  assert.equal(hasDiff([c1, c2], (c) => c.category), true);

  // Fees differ: ~₹10,000 vs ~₹1,85,000
  assert.equal(hasDiff([c1, c2], (c) => c.feeStructure.annualTuitionMin), true);

  // Identical comparison of college with itself should never flag difference
  assert.equal(hasDiff([c1, c1], (c) => c.category), false);
  assert.equal(hasDiff([c1, c1], (c) => c.regulatoryApproval), false);
});

test('11. Web App Manifest Standards & Schema Conformance', () => {
  const manifestFn = require('@/app/manifest').default;
  const manifestObj = manifestFn();

  assert.equal(typeof manifestObj.name, 'string');
  assert.ok(manifestObj.name.includes('BanglaCampus'));
  assert.equal(manifestObj.start_url, '/');
  assert.equal(manifestObj.display, 'standalone');
  assert.ok(manifestObj.theme_color);
  assert.ok(Array.isArray(manifestObj.icons) && manifestObj.icons.length > 0);
});

test('12. West Bengal Admissions Knowledge Base Integrity', () => {
  assert.ok(VERIFIED_ARTICLES.length >= 5, 'Knowledge base must contain at least 5 in-depth guides');

  // Verify scholarships article
  const scholarshipGuide = VERIFIED_ARTICLES.find(
    (a) => a.slug === 'wb-scholarships-svmcm-credit-card-guide'
  );
  assert.ok(scholarshipGuide, 'Scholarships guide must exist');
  assert.ok(scholarshipGuide.content.includes('SVMCM'));
  assert.ok(scholarshipGuide.content.includes('₹60,000'));
  assert.ok(scholarshipGuide.content.includes('₹10,00,000'));

  // Verify domicile article
  const domicileGuide = VERIFIED_ARTICLES.find(
    (a) => a.slug === 'wbjee-domicile-rules-proforma-explained'
  );
  assert.ok(domicileGuide, 'Domicile guide must exist');
  assert.ok(domicileGuide.content.includes('Proforma a1'));
  assert.ok(domicileGuide.content.includes('Proforma a2'));
  assert.ok(domicileGuide.content.includes('Proforma b'));
});

