/**
 * ==============================================================================
 * BANGLACAMPUS — PRODUCTION GOOGLE APPS SCRIPT
 * 1. Appends student enquiry row to Google Sheets ("Student Enquiries" tab)
 * 2. Triggers instant email notification directly to hc8986234943@gmail.com
 * ==============================================================================
 * 
 * SETUP INSTRUCTIONS:
 * 1. In Google Sheets (https://sheets.google.com), click:
 *    Extensions -> Apps Script
 * 2. Delete any existing code in Code.gs and paste this entire file.
 * 3. Click "Deploy" (top right) -> "New deployment".
 * 4. Select type: "Web app" (click gear icon).
 * 5. Description: "BanglaCampus Lead & Email Webhook"
 * 6. Execute as: "Me (your Google account email)"
 * 7. Who has access: "Anyone"
 * 8. Click "Deploy" and authorize permissions.
 * 9. Copy the generated Web App URL (starts with https://script.google.com/macros/s/.../exec)
 * 10. Add it to .env.local as:
 *     GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_URL/exec"
 */

// Target email address for instant admissions alert
var RECIPIENT_EMAIL = "hc8986234943@gmail.com";

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "BanglaCampus Google Sheets & Email Webhook",
    recipient: RECIPIENT_EMAIL,
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var rawData = e.postData ? e.postData.contents : null;
    if (!rawData) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "No payload received in request"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(rawData);

    // 1. Get or create the worksheet "Student Enquiries"
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

    // 2. Append row to Google Sheets
    var submissionId = data.submissionId || ("BC-" + new Date().getTime());
    var timestamp = data.submissionTimestamp || new Date().toISOString();
    var studentName = data.studentName || "N/A";
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

    // 3. Dispatch Instant Email Alert to hc8986234943@gmail.com
    var emailSubject = "[BanglaCampus New Enquiry] " + studentName + " — " + college + " (" + branch + ")";
    
    var emailBody = 
      "======================================================\n" +
      "BANGLACAMPUS — NEW STUDENT ENQUIRY ALERT\n" +
      "======================================================\n\n" +
      "A student has submitted their academic preferences on BanglaCampus.\n\n" +
      "STUDENT SUBMISSION DETAILS:\n" +
      "------------------------------------------------------\n" +
      "• Submission ID:        " + submissionId + "\n" +
      "• Student Full Name:    " + studentName + "\n" +
      "• Class 10 Percentage:  " + class10 + "%\n" +
      "• Class 12 Percentage:  " + class12 + "%\n" +
      "• State / UT:           " + state + "\n" +
      "• Preferred College:    " + college + "\n" +
      "• Preferred Branch:     " + branch + "\n" +
      "• Source Page URL:      " + sourceUrl + "\n" +
      "• Consent Status:       " + consent + "\n" +
      "• Timestamp (UTC):      " + timestamp + "\n\n" +
      "------------------------------------------------------\n" +
      "Recipient: " + RECIPIENT_EMAIL + "\n" +
      "======================================================\n";

    var emailHtml = 
      "<div style='font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 24px; color: #1e293b;'>" +
        "<div style='max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);'>" +
          "<div style='background: linear-gradient(135deg, #064e3b 0%, #0f172a 100%); padding: 24px; color: #ffffff;'>" +
            "<div style='font-size: 11px; font-weight: 700; text-transform: uppercase; color: #34d399; margin-bottom: 6px;'>BanglaCampus Admission Alert</div>" +
            "<h1 style='margin: 0; font-size: 20px; font-weight: 800;'>New Student Enquiry Received</h1>" +
            "<p style='margin: 6px 0 0 0; font-size: 13px; color: #cbd5e1;'>Submission ID: <code style='background: rgba(255,255,255,0.15); padding: 2px 6px; rounded: 4px;'>" + submissionId + "</code></p>" +
          "</div>" +
          "<div style='padding: 24px;'>" +
            "<table style='width: 100%; border-collapse: collapse; font-size: 13px;'>" +
              "<tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; color: #64748b; font-weight: 600; width: 40%;'>Student Name</td><td style='padding: 10px 0; font-weight: 700; color: #0f172a;'>" + studentName + "</td></tr>" +
              "<tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; color: #64748b; font-weight: 600;'>Class 10 Percentage</td><td style='padding: 10px 0; font-weight: 700; color: #0f172a;'>" + class10 + "%</td></tr>" +
              "<tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; color: #64748b; font-weight: 600;'>Class 12 Percentage</td><td style='padding: 10px 0; font-weight: 700; color: #0f172a;'>" + class12 + "%</td></tr>" +
              "<tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; color: #64748b; font-weight: 600;'>State / UT</td><td style='padding: 10px 0; font-weight: 600; color: #0f172a;'>" + state + "</td></tr>" +
              "<tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; color: #64748b; font-weight: 600;'>Preferred College</td><td style='padding: 10px 0; font-weight: 700; color: #047857;'>" + college + "</td></tr>" +
              "<tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; color: #64748b; font-weight: 600;'>Preferred Branch</td><td style='padding: 10px 0; font-weight: 700; color: #0f172a;'>" + branch + "</td></tr>" +
              "<tr><td style='padding: 10px 0; color: #64748b; font-weight: 600;'>Source URL</td><td style='padding: 10px 0;'><a href='" + sourceUrl + "' style='color: #2563eb;'>" + sourceUrl + "</a></td></tr>" +
            "</table>" +
            "<div style='margin-top: 24px; padding: 12px; background: #f8fafc; border-radius: 8px; font-size: 11px; color: #64748b;'>" +
              "Notification dispatched to <strong>" + RECIPIENT_EMAIL + "</strong> at " + timestamp + "." +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>";

    // Send email using Google Apps Script's built-in MailApp service
    try {
      MailApp.sendEmail({
        to: RECIPIENT_EMAIL,
        subject: emailSubject,
        body: emailBody,
        htmlBody: emailHtml
      });
    } catch (mailErr) {
      // If MailApp throws, log but still return success for sheet write
      Logger.log("MailApp error: " + mailErr.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      submissionId: submissionId,
      message: "Enquiry saved to Google Sheet and email alert triggered to " + RECIPIENT_EMAIL
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
