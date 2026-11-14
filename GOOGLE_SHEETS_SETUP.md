# Google Sheets Integration Setup Guide

This guide explains how to connect BengalCampus forms to Google Sheets using a free Google Apps Script webhook. All forms (Contact, Newsletter, Lead Capture, Student Enquiry, Counselling) send data to a **single spreadsheet** with separate tabs per form type.

## Step 1: Create the Google Spreadsheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it **"BengalCampus Form Submissions"**.
3. Note the spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_ID/edit`

## Step 2: Open the Apps Script Editor

1. In the spreadsheet, click **Extensions → Apps Script**.
2. Delete any existing code in `Code.gs`.
3. Paste the entire contents of `google-apps-script/Code.gs` from this repository.
4. If you want to target a specific spreadsheet (not this one), paste your spreadsheet ID into the `SPREADSHEET_ID` variable at the top. Otherwise, leave it blank.
5. Click **Save** (Ctrl+S / Cmd+S).

## Step 3: Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
3. Set:
   - **Description**: `BengalCampus Webhook v1`
   - **Execute as**: `Me` (your Google account)
   - **Who has access**: `Anyone` ← **This is required** for the webhook to work without OAuth
4. Click **Deploy**.
5. Click **Authorize access** and grant permissions when prompted.
6. Copy the **Web app URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## Step 4: Add the URL to your environment

Open `.env.local` and set:
```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Then restart your dev server:
```bash
pnpm dev
```

## Step 5: Test the integration

Submit any form on the site. You should see a new row appear in the corresponding sheet tab within seconds.

You can also run the `testIntegration()` function directly in the Apps Script editor to verify the setup.

## Updating An Existing Deployment (Fix "Timestamp | Payload" JSON dump)

If you already deployed a webhook earlier and saw rows appearing with a raw JSON blob under `Timestamp | Payload`:

1. In your spreadsheet, open **Extensions → Apps Script**.
2. Replace all code in `Code.gs` with the updated `google-apps-script/Code.gs`.
3. Click **Deploy → Manage deployments**.
4. Click the **Edit (pencil icon)** on your active Web app deployment.
5. In the **Version** dropdown, select **New version**.
6. Click **Deploy**. (This ensures Google uses the new code; without selecting "New version", Apps Script runs the cached old code).
7. Submit the form again — data will now be inserted into proper, human-readable Excel columns (`Submission ID`, `Submitted Date & Time`, `Student Name`, `Class 10 %`, `Class 12 %`, `State`, `Preferred College`, etc.).

### Automatic Cleanup of Existing Legacy Rows
The new script automatically detects if a sheet tab has `Payload` headers. When a new submission arrives, it migrates any earlier JSON rows into proper columns. You can also delete the old tab and let the script generate fresh formatted tabs.

## 5 Dedicated Sheets for 5 Forms (With Custom Headings)

Every form on the portal routes to its own dedicated tab with tailored column headings:

| Sheet Tab Name | Triggering Form(s) | Exact Column Headings in Sheet |
|---|---|---|
| **Student Enquiries** | Student Enquiry Modal (6-field academic form) | `Submission ID`, `Submitted Date & Time`, `Student Name`, `Class 10 %`, `Class 12 %`, `State / UT`, `Preferred College`, `Preferred Branch`, `Source Page URL`, `Consent Status` |
| **Counselling Requests** | 1-on-1 Free Counselling (Homepage Hero, Guidance Banner, College Counselling Cards, `/counselling` page) | `Submission ID`, `Submitted Date & Time`, `Student Name`, `Mobile Number`, `WBJEE Rank`, `Target College`, `Target Branch`, `State / UT`, `Source Form / Location`, `Consent Status` |
| **B.Tech Leads** | Admission Lead Capture Form (`/apply`, IEM Kolkata, college detail pages) | `Lead ID`, `Submitted Date & Time`, `Student Name`, `Phone Number`, `Branch of Interest`, `12th Marks / %`, `Percentage Type`, `Eligibility Status`, `Landing Page`, `Source CTA`, `Consent Status` |
| **Contact Messages** | Research Cell Contact & Error Reporting (`/contact` page) | `Date & Time`, `Full Name`, `Email Address`, `Subject / Topic`, `Message`, `Source Page URL` |
| **Newsletter Subscriptions** | Monthly Admission Bulletin Digest (Footer & Sidebar) | `Date & Time`, `Email Address`, `Source Page URL`, `Consent Status` |

> Each sheet tab is styled with BengalCampus Navy (`#102A56`) headers, white text, frozen top row, and clean Excel values (strings, numbers, formatted dates).

## Troubleshooting

- **Payload appears as JSON**: Follow the **Updating An Existing Deployment** section above (Deploy → Manage deployments → Edit → Version: New version).
- **No data in sheet**: Check that `GOOGLE_SHEETS_WEBHOOK_URL` is set in `.env.local` and your dev server was restarted.
- **Apps Script error "You do not have permission"**: Re-deploy the web app and make sure "Who has access" is set to `Anyone`.
- **HTTP 302 redirect**: Ensure "Who has access" is set to `Anyone`, not `Anyone with Google account`.

## Security Notes

- The webhook URL is a server-side environment variable (no `NEXT_PUBLIC_` prefix) — it is never exposed to browsers.
- Optionally set `GOOGLE_SHEETS_WEBHOOK_SECRET` to a random string; the Apps Script will receive it in the `x-webhook-secret` header (you can verify it in the script for extra security).
- Student PII (names, phones) goes only to the Google Sheet you control — not any third party.
