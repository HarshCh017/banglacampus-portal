/**
 * Shared Google Sheets webhook dispatcher.
 * All forms use this single function to send data to the configured
 * Google Apps Script web app. The `formType` field routes data to
 * the correct sheet tab within the spreadsheet.
 */

export type SheetsFormType =
  | 'ENQUIRY'
  | 'CONTACT'
  | 'NEWSLETTER'
  | 'LEAD'
  | 'COUNSELLING';

export interface SheetsPayload {
  formType: SheetsFormType;
  timestamp: string;
  [key: string]: string | number | boolean | undefined | null;
}

export async function sendToGoogleSheets(
  payload: SheetsPayload
): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl || !webhookUrl.startsWith('http')) {
    console.warn('[SheetsWebhook] GOOGLE_SHEETS_WEBHOOK_URL is not configured. Skipping.');
    return { success: false, error: 'GOOGLE_SHEETS_WEBHOOK_URL not configured' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const webhookSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'BengalCampus-Webhook/2.0',
    };

    if (webhookSecret) {
      headers['x-webhook-secret'] = webhookSecret;
      headers['Authorization'] = `Bearer ${webhookSecret}`;
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      return {
        success: false,
        error: `Webhook HTTP ${response.status}: ${text.slice(0, 200)}`,
      };
    }

    // Google Apps Script always returns 200; parse body for result
    const data = await response.json().catch(() => null);

    if (
      data &&
      (data.status === 'success' ||
        data.result === 'success' ||
        data.success === true)
    ) {
      return { success: true };
    }

    if (data && (data.status === 'error' || data.success === false)) {
      return {
        success: false,
        error: data.error || data.message || 'Script reported error',
      };
    }

    // Google Apps Script sometimes returns plain text "success"
    return { success: true };
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return { success: false, error: 'Webhook timed out after 10s' };
    }
    return { success: false, error: err?.message || 'Network error' };
  }
}
