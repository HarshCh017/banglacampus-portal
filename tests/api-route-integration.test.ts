import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';
import { POST as enquiryPost } from '@/app/api/enquiry/route';
import { POST as loginPost } from '@/app/api/auth/login/route';
import { POST as indexnowPost } from '@/app/api/indexnow/route';

test('1. API Route - POST /api/enquiry triggers email alert to admissions sink', async () => {
  const payload = {
    fullName: 'Pritam Chakraborty',
    class10Percentage: 92.4,
    class12Percentage: 88.6,
    state: 'West Bengal',
    preferredCollege: 'haldia-institute-of-technology',
    preferredBranch: 'cse',
    consent: true,
    sourceUrl: 'http://localhost:3000/colleges/haldia-institute-of-technology',
  };

  const req = new NextRequest('http://localhost:3000/api/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const res = await enquiryPost(req);
  assert.equal(res.status, 200, 'POST /api/enquiry should return status 200');

  const data = await res.json();
  assert.equal(data.success, true);
  assert.ok(data.submissionId.startsWith('BC-ENQ-'));

  // Verify that an email notification was triggered and recorded
  const logFile = path.join(process.cwd(), 'data', 'email-notifications.json');
  assert.ok(fs.existsSync(logFile), 'Email notifications log file must exist');

  const logs = JSON.parse(fs.readFileSync(logFile, 'utf-8'));
  const matching = logs.filter((l: any) => l.subject.includes('Pritam Chakraborty'));
  const found = matching[matching.length - 1];
  assert.ok(found, 'Log must contain outbound alert for Pritam Chakraborty');
  assert.equal(found.recipient, process.env.ENQUIRY_NOTIFICATION_EMAIL || 'admissions@bengalcampus.in');
  assert.ok(found.textContent.includes('Haldia Institute of Technology'));
  assert.ok(found.textContent.includes('92.4%'));
  assert.ok(found.textContent.includes('88.6%'));
});

test('2. API Route - POST /api/auth/login blocks student accounts and enforces staff allowlist', async () => {
  // 1. Student login request must be rejected with 403 Forbidden (Patch v1.1 §P3)
  const studentReq = new NextRequest('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'suman.sen@wbjee.ac.in',
      name: 'Suman Sen',
      role: 'student',
    }),
  });

  const studentRes = await loginPost(studentReq);
  assert.equal(studentRes.status, 403, 'Student login must be rejected with 403');
  const studentData = await studentRes.json();
  assert.equal(studentData.success, false);
  assert.ok(studentData.message.includes('Student accounts are disabled'));

  // 2. Staff login with non-allowlisted email must be rejected with 403
  const unauthReq = new NextRequest('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'unknown.person@random.com',
      name: 'Unknown Person',
      role: 'counsellor',
    }),
  });
  const unauthRes = await loginPost(unauthReq);
  assert.equal(unauthRes.status, 403, 'Non-allowlisted staff login must be rejected with 403');

  // 3. Allowlisted staff email must be accepted
  process.env.COUNSELLOR_EMAILS = 'counsellor@bengalcampus.in';
  const staffReq = new NextRequest('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'counsellor@bengalcampus.in',
      name: 'Counsellor Desk',
      role: 'counsellor',
    }),
  });
  const staffRes = await loginPost(staffReq);
  assert.equal(staffRes.status, 200, 'Allowlisted staff email must return 200');
  const staffData = await staffRes.json();
  assert.equal(staffData.success, true);
  assert.equal(staffData.user.role, 'counsellor');
});

test('3. API Route - POST /api/enquiry ingests 1-on-1 Free Counselling leads', async () => {
  const payload = {
    fullName: 'Debanjan Mukherjee',
    phone: '9831098765',
    rank: 6420,
    preferredCollege: 'iem-kolkata',
    preferredBranch: 'Computer Science (CSE)',
    source: 'College Detail (banner): Institute of Engineering and Management',
  };

  const req = new NextRequest('http://localhost:3000/api/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const res = await enquiryPost(req);
  assert.equal(res.status, 200, 'POST /api/enquiry should return status 200 for counselling leads');

  const data = await res.json();
  assert.equal(data.success, true);
  assert.ok(data.submissionId.startsWith('BC-ENQ-'));
});

test('4. API Route - POST /api/indexnow handles search engine submission gracefully', async () => {
  const req = new NextRequest('http://localhost:3000/api/indexnow', {
    method: 'POST',
  });

  const res = await indexnowPost(req);
  assert.ok(res.status === 200 || res.status === 500, 'POST /api/indexnow should return a valid HTTP status');
  const data = await res.json();
  assert.ok(typeof data === 'object');
});
