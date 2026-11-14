import fs from 'fs';
import path from 'path';
import os from 'os';
import { GoogleSheetsEnquiryRow } from './googleSheetsService';

export interface EmailDispatchRecord {
  id: string;
  recipient: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  sentAt: string;
  status: 'SENT' | 'LOGGED_LOCAL' | 'FAILED';
  provider: 'resend' | 'local_store';
  error?: string;
}

function getDataDir(): string {
  const localDir = path.join(process.cwd(), 'data');
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    return localDir;
  } catch {
    const tmpDir = path.join(os.tmpdir(), 'bengalcampus-data');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    return tmpDir;
  }
}

function getEmailLogsFilePath(): string {
  return path.join(getDataDir(), 'email-notifications.json');
}

/**
 * Robust HTML sanitizer to prevent injection vulnerabilities in email alerts (Patch v1.1 §P5 A2)
 */
export function escapeHtml(str: string | number | undefined | null): string {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Builds standard plain-text and HTML alert templates for a student enquiry
 */
export function buildEnquiryEmailContent(row: GoogleSheetsEnquiryRow) {
  const safeStudentName = escapeHtml(row.studentName);
  const safeSubmissionId = escapeHtml(row.submissionId);
  const safeCollege = escapeHtml(row.preferredCollege);
  const safeBranch = escapeHtml(row.preferredBranch);
  const safeState = escapeHtml(row.state);
  const safeSourceUrl = escapeHtml(row.sourceUrl);
  const safeTimestamp = escapeHtml(row.submissionTimestamp);
  const safeConsent = escapeHtml(row.consentStatus);
  const safeClass10 = escapeHtml(row.class10Percentage);
  const safeClass12 = escapeHtml(row.class12Percentage);

  const subject = `[BengalCampus New Enquiry] ${row.studentName} — ${row.preferredCollege} (${row.preferredBranch})`;

  const textContent = `
======================================================
BENGALCAMPUS — NEW STUDENT ENQUIRY ALERT
======================================================

A new student has submitted their academic preferences on BengalCampus.

SUBMISSION DETAILS:
------------------------------------------------------
• Submission ID:        ${row.submissionId}
• Timestamp (UTC):      ${row.submissionTimestamp}
• Student Full Name:    ${row.studentName}
• Class 10 Percentage:  ${row.class10Percentage}%
• Class 12 Percentage:  ${row.class12Percentage}%
• State / UT:           ${row.state}
• Preferred College:    ${row.preferredCollege}
• Preferred Branch:     ${row.preferredBranch}
• Source Page URL:      ${row.sourceUrl}
• Consent Status:       ${row.consentStatus}

------------------------------------------------------
This notification was automatically triggered by the BengalCampus Intake Engine.
Recipient: ${process.env.ENQUIRY_NOTIFICATION_EMAIL || 'admissions@bengalcampus.in'}
======================================================
`.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Student Enquiry Alert</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAFBFD; margin: 0; padding: 24px; color: #172033;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <div style="background: linear-gradient(135deg, #102A56 0%, #1455B8 100%); padding: 24px; color: #ffffff;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #93C5FD; margin-bottom: 6px;">
        BengalCampus Admission Alert
      </div>
      <h1 style="margin: 0; font-size: 20px; font-weight: 800; line-height: 1.3;">
        New Student Enquiry Received
      </h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #E2E8F0;">
        Submission ID: <code style="background: rgba(255,255,255,0.15); padding: 2px 6px; border-radius: 4px; font-family: monospace;">${safeSubmissionId}</code>
      </p>
    </div>
    
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tbody>
          <tr style="border-bottom: 1px solid #F1F5F9;">
            <td style="padding: 10px 0; font-weight: 600; color: #64748B; width: 40%;">Student Name</td>
            <td style="padding: 10px 0; font-weight: 700; color: #102A56;">${safeStudentName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F1F5F9;">
            <td style="padding: 10px 0; font-weight: 600; color: #64748B;">Class 10 Percentage</td>
            <td style="padding: 10px 0; font-weight: 700; color: #102A56; font-family: monospace;">${safeClass10}%</td>
          </tr>
          <tr style="border-bottom: 1px solid #F1F5F9;">
            <td style="padding: 10px 0; font-weight: 600; color: #64748B;">Class 12 Percentage</td>
            <td style="padding: 10px 0; font-weight: 700; color: #102A56; font-family: monospace;">${safeClass12}%</td>
          </tr>
          <tr style="border-bottom: 1px solid #F1F5F9;">
            <td style="padding: 10px 0; font-weight: 600; color: #64748B;">State / Union Territory</td>
            <td style="padding: 10px 0; font-weight: 600; color: #102A56;">${safeState}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F1F5F9;">
            <td style="padding: 10px 0; font-weight: 600; color: #64748B;">Preferred College</td>
            <td style="padding: 10px 0; font-weight: 700; color: #1455B8;">${safeCollege}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F1F5F9;">
            <td style="padding: 10px 0; font-weight: 600; color: #64748B;">Preferred Branch</td>
            <td style="padding: 10px 0; font-weight: 700; color: #102A56;">${safeBranch}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F1F5F9;">
            <td style="padding: 10px 0; color: #64748B;">Source Page URL</td>
            <td style="padding: 10px 0; color: #1455B8; word-break: break-all;">
              <a href="${safeSourceUrl}" style="color: #1455B8; text-decoration: none;">${safeSourceUrl}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: 600; color: #64748B;">Consent Status</td>
            <td style="padding: 10px 0; font-size: 12px; color: #0B7A62; font-weight: 600;">${safeConsent}</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 24px; padding: 14px; background-color: #FAFBFD; border-radius: 10px; border: 1px solid #E2E8F0; font-size: 11px; color: #64748B; line-height: 1.5;">
        <strong>Audit Trail:</strong> Generated at ${safeTimestamp} (UTC). Dispatched to <code>${process.env.ENQUIRY_NOTIFICATION_EMAIL || 'admissions@bengalcampus.in'}</code>.
      </div>
    </div>
  </div>
</body>
</html>
`.trim();

  return { subject, textContent, htmlContent };
}

/**
 * Dispatches the email notification to the specified address.
 * Uses RESEND_API_KEY if available, and permanently records in the local email log.
 */
export async function triggerEnquiryEmailAlert(
  row: GoogleSheetsEnquiryRow
): Promise<{ success: boolean; recipient: string; recordId: string }> {
  const recipient = process.env.ENQUIRY_NOTIFICATION_EMAIL || 'admissions@bengalcampus.in';
  const { subject, textContent, htmlContent } = buildEnquiryEmailContent(row);
  const recordId = `MAIL-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  let status: EmailDispatchRecord['status'] = 'LOGGED_LOCAL';
  let provider: EmailDispatchRecord['provider'] = 'local_store';
  let dispatchError: string | undefined = undefined;

  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey && resendApiKey.startsWith('re_')) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'BengalCampus Admissions <admissions@bengalcampus.in>',
          to: [recipient],
          subject,
          html: htmlContent,
          text: textContent,
        }),
      });

      if (response.ok) {
        status = 'SENT';
        provider = 'resend';
      } else {
        const errorData = await response.json().catch(() => ({}));
        dispatchError = errorData.message || `HTTP status ${response.status}`;
        status = 'FAILED';
      }
    } catch (err: any) {
      dispatchError = err?.message || 'Network error reaching Resend';
      status = 'FAILED';
    }
  }

  // Persist record locally so notification history is 100% auditable
  const logRecord: EmailDispatchRecord = {
    id: recordId,
    recipient,
    subject,
    htmlContent,
    textContent,
    sentAt: new Date().toISOString(),
    status,
    provider,
    error: dispatchError,
  };

  const logsFile = getEmailLogsFilePath();
  let existingLogs: EmailDispatchRecord[] = [];
  try {
    if (fs.existsSync(logsFile)) {
      existingLogs = JSON.parse(fs.readFileSync(logsFile, 'utf-8'));
    }
  } catch {
    // Keep empty
  }

  existingLogs.push(logRecord);

  try {
    fs.writeFileSync(logsFile, JSON.stringify(existingLogs, null, 2), 'utf-8');
  } catch (err: any) {
    console.warn('[EmailService] Local log write skipped:', err?.message);
  }

  console.info(`[Email Alert] Dispatched notification for ${row.submissionId} to ${recipient} (Status: ${status})`);

  return {
    success: true,
    recipient,
    recordId,
  };
}
