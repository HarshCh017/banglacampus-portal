import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import {
  signJwt,
  verifyJwt,
  getGoogleOAuthUrl,
  UserSession,
} from '@/lib/auth';
import {
  buildEnquiryEmailContent,
  triggerEnquiryEmailAlert,
} from '@/lib/emailService';
import { GoogleSheetsEnquiryRow } from '@/lib/googleSheetsService';

test('1. Auth - JWT Creation and Verification', () => {
  const dummySession: UserSession = {
    id: 'usr_test_123',
    email: 'ananya.mukherjee@student.wb.in',
    name: 'Ananya Mukherjee',
    role: 'student',
    bookmarkedColleges: ['jadavpur-university-engineering', 'iem-kolkata'],
    createdAt: new Date().toISOString(),
  };

  const token = signJwt(dummySession, 3600);
  assert.ok(token, 'Token must be generated');
  assert.equal(token.split('.').length, 3, 'JWT must have 3 segments separated by dots');

  const decoded = verifyJwt<UserSession>(token);
  assert.ok(decoded, 'Decoded payload must not be null');
  assert.equal(decoded?.id, 'usr_test_123');
  assert.equal(decoded?.email, 'ananya.mukherjee@student.wb.in');
  assert.equal(decoded?.name, 'Ananya Mukherjee');
  assert.equal(decoded?.role, 'student');
  assert.deepEqual(decoded?.bookmarkedColleges, ['jadavpur-university-engineering', 'iem-kolkata']);
});

test('2. Auth - Rejects Tampered or Expired Tokens', () => {
  const dummySession = { id: 'usr_tamper', role: 'student' };
  const token = signJwt(dummySession, 3600);

  // Tamper with payload
  const parts = token.split('.');
  const tamperedToken = `${parts[0]}.${Buffer.from(JSON.stringify({ id: 'usr_hacked', role: 'admin' })).toString('base64url')}.${parts[2]}`;
  const tamperedResult = verifyJwt(tamperedToken);
  assert.equal(tamperedResult, null, 'Tampered token signature mismatch must return null');

  // Expired token (expires in -10 seconds)
  const expiredToken = signJwt(dummySession, -10);
  const expiredResult = verifyJwt(expiredToken);
  assert.equal(expiredResult, null, 'Expired token must return null');
});

test('3. Auth - Google OAuth URL Construction', () => {
  const { url, isConfigured } = getGoogleOAuthUrl('http://localhost:3000');
  assert.ok(url.includes('https://accounts.google.com/o/oauth2/v2/auth'), 'Must use Google OAuth v2 URL');
  assert.ok(url.includes('redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgoogle'), 'Redirect URI must be URL-encoded');
  // Since GOOGLE_CLIENT_ID contains 'your-client-id' placeholder by default
  assert.equal(isConfigured, false, 'Placeholder client id should flag isConfigured as false');
});

test('4. Email Notification - Content Builder Formats All 10 Student Details', () => {
  const sampleRow: GoogleSheetsEnquiryRow = {
    submissionId: 'ENQ-2026-TEST1',
    submissionTimestamp: '2026-10-24T02:00:00.000Z',
    studentName: 'Subhajit Roy',
    class10Percentage: '91.50',
    class12Percentage: '89.20',
    state: 'West Bengal',
    preferredCollege: 'Haldia Institute of Technology',
    preferredBranch: 'Computer Science and Engineering',
    sourceUrl: 'http://localhost:3000/colleges/haldia-institute-of-technology',
    consentStatus: 'CONSENT_GRANTED',
  };

  const { subject, textContent, htmlContent } = buildEnquiryEmailContent(sampleRow);

  // Verify Subject
  assert.ok(subject.includes('BanglaCampus New Enquiry'), 'Subject should contain brand tag');
  assert.ok(subject.includes('Subhajit Roy'), 'Subject should contain student name');
  assert.ok(subject.includes('Haldia Institute of Technology'), 'Subject should contain college');

  // Verify Plain Text includes all 10 fields
  assert.ok(textContent.includes('ENQ-2026-TEST1'));
  assert.ok(textContent.includes('Subhajit Roy'));
  assert.ok(textContent.includes('91.50%'));
  assert.ok(textContent.includes('89.20%'));
  assert.ok(textContent.includes('West Bengal'));
  assert.ok(textContent.includes('Haldia Institute of Technology'));
  assert.ok(textContent.includes('Computer Science and Engineering'));
  assert.ok(textContent.includes('http://localhost:3000/colleges/haldia-institute-of-technology'));
  assert.ok(textContent.includes('CONSENT_GRANTED'));
  assert.ok(textContent.includes('hc8986234943@gmail.com'));

  // Verify HTML includes all necessary fields
  assert.ok(htmlContent.includes('Subhajit Roy'));
  assert.ok(htmlContent.includes('91.50%'));
  assert.ok(htmlContent.includes('89.20%'));
  assert.ok(htmlContent.includes('hc8986234943@gmail.com'));
});

test('5. Email Notification - Trigger Writes to Permanent Audit Store', async () => {
  const sampleRow: GoogleSheetsEnquiryRow = {
    submissionId: 'ENQ-2026-TEST2',
    submissionTimestamp: '2026-10-24T02:15:00.000Z',
    studentName: 'Debarati Ghosh',
    class10Percentage: '94.00',
    class12Percentage: '92.50',
    state: 'West Bengal',
    preferredCollege: 'Narula Institute of Technology',
    preferredBranch: 'Information Technology',
    sourceUrl: 'http://localhost:3000/colleges/narula-institute-of-technology',
    consentStatus: 'CONSENT_GRANTED',
  };

  const result = await triggerEnquiryEmailAlert(sampleRow);
  assert.equal(result.success, true);
  assert.equal(result.recipient, 'hc8986234943@gmail.com');
  assert.ok(result.recordId.startsWith('MAIL-'));

  // Verify the notification was saved to data/email-notifications.json
  const emailLogFile = path.join(process.cwd(), 'data', 'email-notifications.json');
  assert.ok(fs.existsSync(emailLogFile), 'Email notifications audit log must exist');

  const logs = JSON.parse(fs.readFileSync(emailLogFile, 'utf-8'));
  const found = logs.find((l: any) => l.id === result.recordId);
  assert.ok(found, 'Logged notification record must match dispatched record ID');
  assert.equal(found.recipient, 'hc8986234943@gmail.com');
  assert.ok(found.subject.includes('Debarati Ghosh'));
});
