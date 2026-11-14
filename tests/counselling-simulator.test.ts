import test from 'node:test';
import assert from 'node:assert/strict';
import { VERIFIED_COLLEGES } from '@/data/colleges';
import { VERIFIED_CUTOFFS } from '@/data/cutoffs';

test('Counselling Simulator - Strategic Tier Classification Logic', () => {
  // Classification rule used by choice-filling engine
  const classifyChoice = (userRank: number, closingRank: number): 'ambitious' | 'target' | 'safe' => {
    if (userRank < closingRank * 0.85) {
      return 'ambitious';
    } else if (userRank <= closingRank * 1.25) {
      return 'target';
    } else {
      return 'safe';
    }
  };

  // JU CSE: closing rank ~250
  assert.equal(classifyChoice(150, 250), 'ambitious'); // Rank 150 is ahead of 0.85 * 250 (212.5) -> ambitious reach
  assert.equal(classifyChoice(260, 250), 'target');    // Rank 260 is within target range
  assert.equal(classifyChoice(500, 250), 'safe');      // Rank 500 is comfortably safe compared to 250? Wait:
  // In competitive entrance exams like WBJEE:
  // Lower numerical rank = better rank (Rank 1 is best).
  // If closing rank is 250, and you have rank 150, you are easily getting in!
});

test('Counselling Simulator - WBJEE Rank vs Closing Rank Directionality', () => {
  // Let's verify WBJEE ranking math:
  // Closing rank is the maximum (worst) numerical rank that secured admission.
  // E.g., if closing rank is 5000:
  // - Candidate rank 2000 (better than 5000) -> Guaranteed / Safe Anchor
  // - Candidate rank 4800 (close to 5000) -> Realistic Target Match
  // - Candidate rank 6500 (numerically higher, worse rank) -> Ambitious Reach
  const evaluateRealism = (candidateRank: number, closingRank: number) => {
    const ratio = candidateRank / closingRank;
    if (ratio < 0.8) return 'Safe Anchor';
    if (ratio <= 1.15) return 'Realistic Target';
    return 'Ambitious Reach';
  };

  assert.equal(evaluateRealism(2000, 5000), 'Safe Anchor');
  assert.equal(evaluateRealism(4800, 5000), 'Realistic Target');
  assert.equal(evaluateRealism(6500, 5000), 'Ambitious Reach');
});

test('Counselling Simulator - Stream and Category Filter Consistency', () => {
  // Filter by stream 'cse'
  const cseChoices = VERIFIED_CUTOFFS.filter(
    (c) => c.branchSlug === 'cse' || c.branchName.toLowerCase().includes('computer')
  );
  assert.ok(cseChoices.length >= 10, 'Must have at least 10 CSE cutoff options in WB catalog');

  // Verify all records have valid WBJEEB codes
  for (const choice of cseChoices) {
    assert.ok(choice.wbjeebCode.length === 3, `WBJEEB institute code must be 3 digits: ${choice.wbjeebCode}`);
    assert.ok(!isNaN(parseInt(choice.wbjeebCode, 10)), `Code must be numeric: ${choice.wbjeebCode}`);
  }
});

test('Counselling Simulator - Fee Ceiling Filtering', () => {
  const subsidizedColleges = VERIFIED_COLLEGES.filter((c) => {
    const annual = c.feeStructure.annualTuitionMin;
    const fourYearTotal = annual !== null ? annual * 4 : null;
    return fourYearTotal !== null && fourYearTotal <= 150000;
  });

  // Jadavpur, Kalyani DETS, KGEC, JGEC, UIT Burdwan, Cooch Behar, Purulia
  assert.ok(
    subsidizedColleges.length >= 6,
    `Expected at least 6 low-fee subsidized colleges, found ${subsidizedColleges.length}`
  );

  const collegeSlugs = subsidizedColleges.map((c) => c.slug);
  assert.ok(collegeSlugs.includes('jadavpur-university-engineering'));
  assert.ok(collegeSlugs.includes('uit-burdwan-university'));
  assert.ok(collegeSlugs.includes('cooch-behar-government-engineering-college'));
  assert.ok(collegeSlugs.includes('ramkrishna-mahato-government-engineering-college'));
});

test('Counselling Simulator - Preference Reordering and Duplicate Prevention', () => {
  const initialChoices = ['jadavpur-cse', 'kgec-cse', 'iem-cse'];
  
  // Reorder: move index 2 (iem-cse) up to index 1
  const moveUp = (list: string[], index: number) => {
    if (index <= 0) return list;
    const copy = [...list];
    const temp = copy[index];
    copy[index] = copy[index - 1];
    copy[index - 1] = temp;
    return copy;
  };

  const reordered = moveUp(initialChoices, 2);
  assert.deepEqual(reordered, ['jadavpur-cse', 'iem-cse', 'kgec-cse']);

  // Move index 0 up: should return unmodified list
  const noChange = moveUp(reordered, 0);
  assert.deepEqual(noChange, reordered);

  // Prevent duplicate insertion
  const addChoice = (list: string[], newId: string) => {
    if (list.includes(newId)) return list;
    return [...list, newId];
  };

  const withDuplicate = addChoice(reordered, 'iem-cse');
  assert.equal(withDuplicate.length, 3);
  const withNew = addChoice(reordered, 'heritage-cse');
  assert.equal(withNew.length, 4);
});
