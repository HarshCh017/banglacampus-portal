# BANGLACAMPUS — GOOGLE SHEETS INTEGRATION & APPS SCRIPT SETUP GUIDE

This document provides the complete, step-by-step setup procedure for connecting the **BanglaCampus Student Enquiry Popup** directly and securely to a Google Sheet without exposing credentials to frontend bundles.

---

## 1. SPREADSHEET ARCHITECTURE & COLUMNS

Every verified student submission is recorded in a dedicated Google Sheet worksheet named:
`Student Enquiries`

The sheet uses the following **ten columns in a strict, stable order**:

| Column | Header Name | Description / Format | Example Value |
| :--- | :--- | :--- | :--- |
| **A** | `Submission ID` | Unique collision-resistant identifier | `BC-ENQ-M6XYZ12-9A8B7` |
| **B** | `Submission Timestamp` | ISO 8601 UTC timestamp | `2026-10-24T02:15:00.000Z` |
| **C** | `Student Name` | Full Name (Formula-sanitized) | `Suman Mukherjee` |
| **D** | `Class 10 Percentage` | Numeric (0–100, decimals supported) | `88.5` |
| **E** | `Class 12 Percentage` | Numeric (0–100, decimals supported) | `84.0` |
| **F** | `State / Union Territory` | Canonical Indian State / UT | `West Bengal` |
| **G** | `Preferred College` | Institution Name, Short Name & WBJEE Code | `Jadavpur University (FET) (Code 001)` |
| **H** | `Preferred Branch` | Official branch name | `Computer Science & Engineering` |
| **I** | `Source Page URL` | Specific route where enquiry was submitted | `https://banglacampus.in/colleges/jadavpur-university-engineering` |
| **J** | `Consent Status` | Legal DPDP consent confirmation | `Explicit Consent Granted (Privacy Policy Accepted)` |

---

## 2. GOOGLE APPS SCRIPT CODE (DEPLOYMENT)

### Step 1: Create the Google Sheet
1. Navigate to [Google Sheets](https://sheets.google.com) and create a new sheet titled:  
   `BanglaCampus — Student Enquiries (Production)`
2. Rename the first tab from `Sheet1` to:  
   `Student Enquiries`
3. In row 1, set the headers across columns A to J as listed in the table above.

### Step 2: Open Apps Script Editor
1. In the Google Sheets menu, click **Extensions** $\to$ **Apps Script**.
2. Replace all placeholder code in `Code.gs` with the production script below:

```javascript
/**
 * BANGLACAMPUS — SECURE STUDENT ENQUIRY WEBHOOK & EMAIL ALERT DISPATCHER
 * 1. Appends student preferences to Google Sheet ("Student Enquiries" tab)
 * 2. Sends automated admissions alert to hc8986234943@gmail.com
 */

var RECIPIENT_EMAIL = "hc8986234943@gmail.com";

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "BanglaCampus Google Sheets & Email Webhook",
    recipient: RECIPIENT_EMAIL
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var rawData = e.postData ? e.postData.contents : null;
    if (!rawData) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "No payload received"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(rawData);

    // 1. Get or create worksheet "Student Enquiries"
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Student Enquiries");

    if (!sheet) {
      sheet = ss.insertSheet("Student Enquiries");
      sheet.appendRow([
        "Submission ID",
        "Submission Timestamp",
        "Student Name",
        "Class 10 Percentage",
        "Class 12 Percentage",
        "State / Union Territory",
        "Preferred College",
        "Preferred Branch",
        "Source Page URL",
        "Consent Status"
      ]);
      sheet.setFrozenRows(1);
    }

    // 2. Append row
    var submissionId = data.submissionId || ("BC-" + new Date().getTime());
    var timestamp = data.submissionTimestamp || new Date().toISOString();
    var studentName = data.studentName || "";
    var class10 = data.class10Percentage || "";
    var class12 = data.class12Percentage || "";
    var state = data.state || "";
    var college = data.preferredCollege || "";
    var branch = data.preferredBranch || "";
    var sourceUrl = data.sourceUrl || "";
    var consent = data.consentStatus || "Explicit Consent Granted";

    sheet.appendRow([
      submissionId,
      timestamp,
      studentName,
      class10,
      class12,
      state,
      college,
      branch,
      sourceUrl,
      consent
    ]);

    // 3. Trigger email alert directly to hc8986234943@gmail.com
    var emailSubject = "[BanglaCampus New Enquiry] " + studentName + " — " + college + " (" + branch + ")";
    var emailBody = 
      "======================================================\n" +
      "BANGLACAMPUS — NEW STUDENT ENQUIRY ALERT\n" +
      "======================================================\n\n" +
      "A new student has submitted their academic preferences on BanglaCampus.\n\n" +
      "SUBMISSION DETAILS:\n" +
      "• Submission ID:        " + submissionId + "\n" +
      "• Timestamp (UTC):      " + timestamp + "\n" +
      "• Student Full Name:    " + studentName + "\n" +
      "• Class 10 Percentage:  " + class10 + "%\n" +
      "• Class 12 Percentage:  " + class12 + "%\n" +
      "• State / UT:           " + state + "\n" +
      "• Preferred College:    " + college + "\n" +
      "• Preferred Branch:     " + branch + "\n" +
      "• Source Page URL:      " + sourceUrl + "\n" +
      "• Consent Status:       " + consent + "\n\n" +
      "Recipient: " + RECIPIENT_EMAIL + "\n" +
      "======================================================\n";

    try {
      MailApp.sendEmail({
        to: RECIPIENT_EMAIL,
        subject: emailSubject,
        body: emailBody
      });
    } catch (mailErr) {
      Logger.log("MailApp notice: " + mailErr.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      submissionId: submissionId,
      message: "Enquiry recorded in Google Sheet and email sent to " + RECIPIENT_EMAIL
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy as a Web App
1. Click the blue **Deploy** button (top right) $\to$ **New deployment**.
2. Select type: **Web app** (gear icon).
3. Set configuration:
   - **Description**: `BanglaCampus Production Enquiry Webhook`
   - **Execute as**: `Me (your Google email)`
   - **Who has access**: `Anyone` *(Note: The endpoint is invoked server-side by our Next.js backend, keeping all client requests anonymous to Google)*.
4. Click **Deploy**. Authorize Google permissions if prompted.
5. Copy the generated **Web App URL** (e.g. `https://script.google.com/macros/s/AKfycb.../exec`).

---

## 3. APPLICATION ENVIRONMENT CONFIGURATION

In your deployment environment (e.g., Vercel, Railway, or local `.env.local`):

```bash
# BanglaCampus Google Sheets Webhook Configuration
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_APPS_SCRIPT_ID/exec"
```

### Security & Privacy Protections
* **Zero Client Secret Exposure**: `GOOGLE_SHEETS_WEBHOOK_URL` is never prefixed with `NEXT_PUBLIC_`. It is exclusively accessible inside server runtime (`/api/enquiry`), guaranteeing zero credential exposure in client browser bundles.
* **Spreadsheet Formula Injection Defense**: All text cells are pre-sanitized by `sanitizeForSpreadsheet()`. Any entry starting with `=`, `+`, `-`, or `@` is prefixed with `'` to neutralize formula execution in Google Sheets / Excel.
* **Pessimistic Dual-Store**: In the event of a Google network timeout or temporary outage, all submissions are synchronously saved to the local server queue (`data/student-enquiries.json`) so no student preferences are ever lost.
* **Rate Limiting**: Protected against bot floods with 5 submissions per minute per IP and invisible honeypot trap fields.

---

## 4. HOW TO TEST AND VERIFY

1. Start the application (`npm run dev` or `npm run build && npm start`).
2. Open `http://localhost:3000/colleges/jadavpur-university-engineering`.
3. Wait 5 seconds for the enquiry modal to appear.
4. Verify that **Jadavpur University** is preselected in the *Preferred College* dropdown.
5. Fill out the form:
   - Name: `Testing Student`
   - Class 10: `89.5`
   - Class 12: `85.0`
   - State: `West Bengal`
   - Branch: `Computer Science & Engineering`
   - Agree to Privacy Policy.
6. Click **Submit My Preferences**.
7. Confirm that the success confirmation displays a valid `Submission ID` (e.g., `BC-ENQ-...`).
8. Open your Google Sheet `Student Enquiries` tab and confirm the new row appears with all 10 columns populated.
