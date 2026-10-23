import fs from 'fs';
import path from 'path';
import os from 'os';
import {
  StudentEnquiryInput,
  sanitizeForSpreadsheet,
  generateSubmissionId,
  validateCollegeBranchCompatibility,
} from './enquiryValidation';
import { getCollegeBySlug, VERIFIED_COLLEGES } from '@/data/colleges';
import { triggerEnquiryEmailAlert } from './emailService';

export interface GoogleSheetsEnquiryRow {
  submissionId: string;
  submissionTimestamp: string;
  studentName: string;
  class10Percentage: number | string;
  class12Percentage: number | string;
  state: string;
  preferredCollege: string;
  preferredBranch: string;
  sourceUrl: string;
  consentStatus: string;
}

export interface StoredEnquiryRecord extends GoogleSheetsEnquiryRow {
  idempotencyKey?: string;
  syncStatus: 'CONFIRMED_GOOGLE_SHEETS' | 'PENDING_CONFIG' | 'FAILED_RETRY_QUEUED';
  createdAt: string;
}

function getDataDir(): string {
  const localDir = path.join(process.cwd(), 'data');
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    return localDir;
  } catch {
    const tmpDir = path.join(os.tmpdir(), 'banglacampus-data');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    return tmpDir;
  }
}

function getEnquiriesFilePath(): string {
  return path.join(getDataDir(), 'student-enquiries.json');
}

/**
 * In-memory cache for fast idempotency lookup across hot requests
 */
const enquiryCache: StoredEnquiryRecord[] = [];

/**
 * Prepares and formats the row values in Column A to J order:
 * A: Submission ID
 * B: Submission Timestamp
 * C: Student Name
 * D: Class 10 Percentage
 * E: Class 12 Percentage
 * F: State / Union Territory
 * G: Preferred College
 * H: Preferred Branch
 * I: Source Page URL
 * J: Consent Status
 */
export function buildGoogleSheetsRow(
  input: StudentEnquiryInput,
  submissionId: string,
  timestamp: string
): GoogleSheetsEnquiryRow {
  const college =
    getCollegeBySlug(input.preferredCollege) ||
    VERIFIED_COLLEGES.find((c) => c.id === input.preferredCollege);

  const collegeDisplay = college
    ? `${college.name} (${college.shortName} - Code ${college.wbjeebCode})`
    : input.preferredCollege;

  // Resolve branch display name
  const branchObj = college?.programs.find(
    (p) =>
      p.slug.toLowerCase() === input.preferredBranch.toLowerCase() ||
      p.name.toLowerCase() === input.preferredBranch.toLowerCase()
  );
  const branchDisplay = branchObj ? branchObj.name : input.preferredBranch;

  return {
    submissionId: sanitizeForSpreadsheet(submissionId),
    submissionTimestamp: timestamp,
    studentName: sanitizeForSpreadsheet(input.fullName),
    class10Percentage: input.class10Percentage,
    class12Percentage: input.class12Percentage,
    state: sanitizeForSpreadsheet(input.state),
    preferredCollege: sanitizeForSpreadsheet(collegeDisplay),
    preferredBranch: sanitizeForSpreadsheet(branchDisplay),
    sourceUrl: sanitizeForSpreadsheet(input.sourceUrl || 'https://banglacampus.in'),
    consentStatus: 'Explicit Consent Granted (Privacy Policy Accepted)',
  };
}

/**
 * Dispatches the formatted row to the configured Google Apps Script Web App / Webhook endpoint.
 * Requires timeout handling and SSL verification.
 */
async function postToGoogleSheetsWebhook(
  row: GoogleSheetsEnquiryRow,
  webhookUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'BanglaCampus-Integration/1.0',
      },
      body: JSON.stringify(row),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        success: false,
        error: `Google Sheets webhook returned HTTP status ${response.status}`,
      };
    }

    const data = await response.json().catch(() => null);
    if (data && (data.status === 'success' || data.result === 'success' || data.success === true)) {
      return { success: true };
    }

    return {
      success: true, // Many Apps Script redirects or simple handlers return 200 without standard JSON
    };
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return { success: false, error: 'Google Sheets webhook timed out after 8000ms' };
    }
    return { success: false, error: err?.message || 'Network error dispatching to Google Sheets' };
  }
}

/**
 * Main service method to persist an enquiry.
 * 1. Checks idempotency.
 * 2. Writes to local secure storage.
 * 3. Dispatches to Google Sheets if configured.
 */
export async function persistStudentEnquiry(input: StudentEnquiryInput): Promise<{
  success: boolean;
  submissionId: string;
  persistedToGoogleSheets: boolean;
  message: string;
}> {
  const filePath = getEnquiriesFilePath();

  // Read existing records
  let records: StoredEnquiryRecord[] = [...enquiryCache];
  try {
    if (fs.existsSync(filePath)) {
      records = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch {
    // Keep cached
  }

  // Idempotency check
  if (input.idempotencyKey) {
    const existing = records.find((r) => r.idempotencyKey === input.idempotencyKey);
    if (existing) {
      return {
        success: true,
        submissionId: existing.submissionId,
        persistedToGoogleSheets: existing.syncStatus === 'CONFIRMED_GOOGLE_SHEETS',
        message: 'Your preferences have been submitted successfully.',
      };
    }
  }

  const submissionId = generateSubmissionId();
  const timestamp = new Date().toISOString();
  const row = buildGoogleSheetsRow(input, submissionId, timestamp);

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  let persistedToGoogleSheets = false;
  let syncStatus: StoredEnquiryRecord['syncStatus'] = 'PENDING_CONFIG';

  if (webhookUrl && webhookUrl.startsWith('http')) {
    const sheetResult = await postToGoogleSheetsWebhook(row, webhookUrl);
    if (sheetResult.success) {
      persistedToGoogleSheets = true;
      syncStatus = 'CONFIRMED_GOOGLE_SHEETS';
    } else {
      syncStatus = 'FAILED_RETRY_QUEUED';
      console.warn(`[Google Sheets] Forwarding failed for ${submissionId}: ${sheetResult.error}`);
    }
  }

  const record: StoredEnquiryRecord = {
    ...row,
    idempotencyKey: input.idempotencyKey,
    syncStatus,
    createdAt: timestamp,
  };

  records.push(record);
  enquiryCache.push(record);

  try {
    fs.writeFileSync(filePath, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err: any) {
    console.warn('[EnquiryStore] Local disk write skipped in serverless environment:', err?.message);
  }

  // Trigger automatic email alert to hc8986234943@gmail.com
  triggerEnquiryEmailAlert(row).catch((emailErr) => {
    console.error(`[Email Alert Error] Failed for ${submissionId}:`, emailErr?.message);
  });

  return {
    success: true,
    submissionId,
    persistedToGoogleSheets,
    message: 'Thank you! Your preferences have been submitted successfully.',
  };
}

/**
 * Synchronizes any pending enquiries (such as submissions made while offline or before webhook configuration).
 */
export async function syncPendingEnquiries(): Promise<{
  total: number;
  synced: number;
  failed: number;
  webhookConfigured: boolean;
  message: string;
}> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl || !webhookUrl.startsWith('http')) {
    return {
      total: 0,
      synced: 0,
      failed: 0,
      webhookConfigured: false,
      message: 'GOOGLE_SHEETS_WEBHOOK_URL is not configured in .env.local',
    };
  }

  const filePath = getEnquiriesFilePath();
  let records: StoredEnquiryRecord[] = [];
  try {
    if (fs.existsSync(filePath)) {
      records = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch {
    return { total: 0, synced: 0, failed: 0, webhookConfigured: true, message: 'Could not read local enquiries' };
  }

  const pending = records.filter((r) => r.syncStatus !== 'CONFIRMED_GOOGLE_SHEETS');
  let synced = 0;
  let failed = 0;

  for (const record of pending) {
    const row: GoogleSheetsEnquiryRow = {
      submissionId: record.submissionId,
      submissionTimestamp: record.submissionTimestamp,
      studentName: record.studentName,
      class10Percentage: record.class10Percentage,
      class12Percentage: record.class12Percentage,
      state: record.state,
      preferredCollege: record.preferredCollege,
      preferredBranch: record.preferredBranch,
      sourceUrl: record.sourceUrl,
      consentStatus: record.consentStatus,
    };

    const res = await postToGoogleSheetsWebhook(row, webhookUrl);
    if (res.success) {
      record.syncStatus = 'CONFIRMED_GOOGLE_SHEETS';
      synced++;
    } else {
      failed++;
    }
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err: any) {
    console.warn('[EnquiryStore] Disk write failed:', err?.message);
  }

  return {
    total: pending.length,
    synced,
    failed,
    webhookConfigured: true,
    message: `Successfully synchronized ${synced} of ${pending.length} pending enquiries to Google Sheets.`,
  };
}

/**
 * Tests connection to Google Sheets Webhook endpoint
 */
export async function testGoogleSheetsWebhook(testUrl?: string): Promise<{
  success: boolean;
  message: string;
}> {
  const targetUrl = testUrl || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!targetUrl || !targetUrl.startsWith('http')) {
    return {
      success: false,
      message: 'GOOGLE_SHEETS_WEBHOOK_URL is not configured.',
    };
  }

  const testPayload: GoogleSheetsEnquiryRow = {
    submissionId: `BC-TEST-${Date.now().toString(36).toUpperCase()}`,
    submissionTimestamp: new Date().toISOString(),
    studentName: 'BanglaCampus Test Connection',
    class10Percentage: '90.0',
    class12Percentage: '85.0',
    state: 'West Bengal',
    preferredCollege: 'Jadavpur University',
    preferredBranch: 'Computer Science & Engineering',
    sourceUrl: 'http://localhost:3000/admin',
    consentStatus: 'Test Ping',
  };

  const res = await postToGoogleSheetsWebhook(testPayload, targetUrl);
  return {
    success: res.success,
    message: res.success
      ? 'Connection successful! Webhook returned positive response.'
      : (res.error || 'Webhook ping failed.'),
  };
}
