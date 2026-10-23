import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';
import { POST as enquiryPost } from '@/app/api/enquiry/route';
import { POST as loginPost } from '@/app/api/auth/login/route';

test('1. API Route - POST /api/enquiry triggers email alert to hc8986234943@gmail.com', async () => {
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
  const found = logs.find((l: any) => l.subject.includes('Pritam Chakraborty'));
  assert.ok(found, 'Log must contain outbound alert for Pritam Chakraborty');
  assert.equal(found.recipient, 'hc8986234943@gmail.com');
  assert.ok(found.textContent.includes('Haldia Institute of Technology'));
  assert.ok(found.textContent.includes('92.4%'));
  assert.ok(found.textContent.includes('88.6%'));
});

test('2. API Route - POST /api/auth/login returns user profile with bookmarked colleges', async () => {
  const req = new NextRequest('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'suman.sen@wbjee.ac.in',
      name: 'Suman Sen',
      role: 'student',
    }),
  });

  const res = await loginPost(req);
  assert.equal(res.status, 200);

  const data = await res.json();
  assert.equal(data.success, true);
  assert.equal(data.user.email, 'suman.sen@wbjee.ac.in');
  assert.equal(data.user.name, 'Suman Sen');
  assert.equal(data.user.role, 'student');
  assert.ok(data.user.bookmarkedColleges.length > 0);
});
