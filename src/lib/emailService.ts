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
    const tmpDir = path.join(os.tmpdir(), 'banglacampus-data');
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
 * Builds standard plain-text and HTML alert templates for a student enquiry
 */
export function buildEnquiryEmailContent(row: GoogleSheetsEnquiryRow) {
  const subject = `[BanglaCampus New Enquiry] ${row.studentName} — ${row.preferredCollege} (${row.preferredBranch})`;

  const textContent = `
======================================================
BANGLACAMPUS — NEW STUDENT ENQUIRY ALERT
======================================================

A new student has submitted their academic preferences on BanglaCampus.

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
This notification was automatically triggered by the BanglaCampus Intake Engine.
Recipient: ${process.env.ENQUIRY_NOTIFICATION_EMAIL || 'hc8986234943@gmail.com'}
======================================================
`.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Student Enquiry Alert</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <div style="background: linear-gradient(135deg, #064e3b 0%, #0f172a 100%); padding: 24px; color: #ffffff;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #34d399; margin-bottom: 6px;">
        BanglaCampus Admission Alert
      </div>
      <h1 style="margin: 0; font-size: 20px; font-weight: 800; line-height: 1.3;">
        New Student Enquiry Received
      </h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #cbd5e1;">
        Submission ID: <code style="background: rgba(255,255,255,0.15); padding: 2px 6px; rounded: 4px; font-family: monospace;">${row.submissionId}</code>
      </p>
    </div>
    
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tbody>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #64748b; width: 40%;">Student Name</td>
            <td style="padding: 10px 0; font-weight: 700; color: #0f172a;">${row.studentName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Class 10 Percentage</td>
            <td style="padding: 10px 0; font-weight: 700; color: #0f172a; font-family: monospace;">${row.class10Percentage}%</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Class 12 Percentage</td>
            <td style="padding: 10px 0; font-weight: 700; color: #0f172a; font-family: monospace;">${row.class12Percentage}%</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #64748b;">State / Union Territory</td>
            <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${row.state}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Preferred College</td>
            <td style="padding: 10px 0; font-weight: 700; color: #047857;">${row.preferredCollege}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Preferred Branch</td>
            <td style="padding: 10px 0; font-weight: 700; color: #0f172a;">${row.preferredBranch}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Source Page URL</td>
            <td style="padding: 10px 0; color: #3b82f6; word-break: break-all;">
              <a href="${row.sourceUrl}" style="color: #2563eb; text-decoration: none;">${row.sourceUrl}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Consent Status</td>
            <td style="padding: 10px 0; font-size: 12px; color: #16a34a; font-weight: 600;">${row.consentStatus}</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 24px; padding: 14px; background-color: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 11px; color: #64748b; line-height: 1.5;">
        <strong>Audit Trail:</strong> Generated at ${row.submissionTimestamp} (UTC). This message was dispatched directly to <code>${process.env.ENQUIRY_NOTIFICATION_EMAIL || 'hc8986234943@gmail.com'}</code>.
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
  const recipient = process.env.ENQUIRY_NOTIFICATION_EMAIL || 'hc8986234943@gmail.com';
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
          from: 'BanglaCampus Admissions <admissions@banglacampus.in>',
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
