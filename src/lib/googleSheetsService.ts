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

  return {
    success: true,
    submissionId,
    persistedToGoogleSheets,
    message: 'Thank you! Your preferences have been submitted successfully.',
  };
}
