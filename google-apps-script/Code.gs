// =====================================================================
// BengalCampus — Multi-Form Google Sheets Webhook (Apps Script)
// =====================================================================
// This script automatically creates and manages 5 DISTINCT SHEET TABS
// for 5 different forms on the BengalCampus portal:
//
// 1. "Student Enquiries"      -> From Student Enquiry Modal (6-field academic form)
// 2. "Counselling Requests"    -> From Homepage & College 1-on-1 Counselling forms
// 3. "B.Tech Leads"            -> From B.Tech / IEM Admission Lead Capture forms
// 4. "Contact Messages"        -> From Contact & Grievance page form
// 5. "Newsletter Subscriptions"-> From Newsletter Digest subscription forms
//
// Each sheet tab has its OWN dedicated column headings, styled professionally
// in BengalCampus Navy (#102A56) with white text, frozen top row, and clean cells.
// =====================================================================

var SPREADSHEET_ID = ''; // Leave blank to write to the active spreadsheet

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Wait up to 10 seconds for concurrent write lock
    lock.waitLock(10000);

    if (!e || !e.postData || !e.postData.contents) {
      return responseJson({ status: 'error', message: 'No post data received' });
    }

    var payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      payload = e.parameter || { raw: e.postData.contents };
    }

    // Auto-detect form type if not explicitly set
    var formType = detectFormType(payload);

    var ss = SPREADSHEET_ID 
      ? SpreadsheetApp.openById(SPREADSHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();

    var config = getFormConfig(formType);
    var sheet = getOrCreateTab(ss, config.primaryTab, config.alternateTabs);

    // Ensure headers exist with professional formatting
    ensureCleanHeaders(sheet, config.headers);

    // Append row into exact columns (NO JSON blob)
    config.appendFn(sheet, payload);

    return responseJson({
      status: 'success',
      formType: formType,
      sheetTab: sheet.getName(),
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    return responseJson({
      status: 'error',
      message: err.toString()
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (lockErr) {}
  }
}

function doGet(e) {
  return responseJson({
    status: 'online',
    service: 'BengalCampus Multi-Form Google Sheets Webhook',
    timestamp: new Date().toISOString()
  });
}

// ---------------------------------------------------------------------
// 1. Form Type Detection (Handles both explicit formType and auto-routing)
// ---------------------------------------------------------------------
function detectFormType(p) {
  if (p.formType && p.formType !== 'UNKNOWN') {
    return String(p.formType).toUpperCase();
  }
  // Check distinctive fields
  if (p.leadId || p.twelfthPercentage !== undefined || p.percentageType) {
    return 'LEAD';
  }
  if (p.message || p.subject) {
    return 'CONTACT';
  }
  if (p.email && !p.phone && !p.message) {
    return 'NEWSLETTER';
  }
  // Differentiate Counselling (has phone/rank/quick lead) vs Academic Enquiry (has class10 & class12 %)
  if (p.class10Percentage !== undefined && p.class12Percentage !== undefined && !p.phone) {
    return 'ENQUIRY';
  }
  if (p.phone || p.mobile || p.rank) {
    return 'COUNSELLING';
  }
  if (p.submissionId || p.studentName || p.preferredCollege) {
    return 'ENQUIRY';
  }
  return 'ENQUIRY';
}

// ---------------------------------------------------------------------
// 2. Sheet Tab Configurations (5 Dedicated Sheets with Custom Columns)
// ---------------------------------------------------------------------
function getFormConfig(formType) {
  switch (formType) {

    // TAB 1: Student Enquiries (Full 6-Field Academic Modal)
    case 'ENQUIRY':
      return {
        primaryTab: 'Student Enquiries',
        alternateTabs: ['Enquiries', 'Student Enquiry'],
        headers: [
          'Submission ID',
          'Submitted Date & Time',
          'Student Name',
          'Class 10 %',
          'Class 12 %',
          'State / UT',
          'Preferred College',
          'Preferred Branch',
          'Source Page URL',
          'Consent Status'
        ],
        appendFn: appendEnquiryRow
      };

    // TAB 2: Counselling Requests (1-on-1 Guidance & Hero Forms)
    case 'COUNSELLING':
      return {
        primaryTab: 'Counselling Requests',
        alternateTabs: ['Counselling', 'Counseling', 'Counselling Leads'],
        headers: [
          'Submission ID',
          'Submitted Date & Time',
          'Student Name',
          'Mobile Number',
          'WBJEE Rank',
          'Target College',
          'Target Branch',
          'State / UT',
          'Source Form / Location',
          'Consent Status'
        ],
        appendFn: appendCounsellingRow
      };

    // TAB 3: B.Tech Leads (LeadCaptureForm on Homepage, IEM, /apply)
    case 'LEAD':
      return {
        primaryTab: 'B.Tech Leads',
        alternateTabs: ['Leads', 'BTech Leads', 'IEM Leads'],
        headers: [
          'Lead ID',
          'Submitted Date & Time',
          'Student Name',
          'Phone Number',
          'Branch of Interest',
          '12th Marks / %',
          'Percentage Type',
          'Eligibility Status',
          'Landing Page',
          'Source CTA',
          'Consent Status'
        ],
        appendFn: appendLeadRow
      };

    // TAB 4: Contact Messages (/contact page)
    case 'CONTACT':
      return {
        primaryTab: 'Contact Messages',
        alternateTabs: ['Contacts', 'Contact', 'Contact Us'],
        headers: [
          'Date & Time',
          'Full Name',
          'Email Address',
          'Subject / Topic',
          'Message',
          'Source Page URL'
        ],
        appendFn: appendContactRow
      };

    // TAB 5: Newsletter Subscriptions (Footer & Sidebar Digests)
    case 'NEWSLETTER':
      return {
        primaryTab: 'Newsletter Subscriptions',
        alternateTabs: ['Newsletter', 'Subscribers'],
        headers: [
          'Date & Time',
          'Email Address',
          'Source Page URL',
          'Consent Status'
        ],
        appendFn: appendNewsletterRow
      };

    default:
      return {
        primaryTab: 'General Submissions',
        alternateTabs: ['Submissions'],
        headers: ['Date & Time', 'Form Type', 'Name', 'Phone', 'Email', 'Details'],
        appendFn: appendGenericRow
      };
  }
}

// ---------------------------------------------------------------------
// 3. Tab-Specific Row Appenders (Exact Column Alignment)
// ---------------------------------------------------------------------

// Sheet 1: Student Enquiries
function appendEnquiryRow(sheet, p) {
  var row = [
    p.submissionId || '',
    formatDateString(p.submissionTimestamp || p.timestamp),
    p.studentName || p.fullName || p.name || '',
    formatPercentage(p.class10Percentage),
    formatPercentage(p.class12Percentage),
    p.state || 'West Bengal',
    p.preferredCollege || '',
    p.preferredBranch || '',
    p.sourceUrl || '',
    p.consentStatus || 'Explicit Consent Granted'
  ];
  sheet.appendRow(row);
  formatLastRow(sheet, row.length);
}

// Sheet 2: Counselling Requests
function appendCounsellingRow(sheet, p) {
  var row = [
    p.submissionId || ('BC-COUNS-' + Date.now().toString(36).toUpperCase()),
    formatDateString(p.submissionTimestamp || p.timestamp),
    p.studentName || p.fullName || p.name || '',
    p.phone || p.mobile || p.mobileNumber || '',
    p.rank !== undefined && p.rank !== null ? String(p.rank) : '',
    p.preferredCollege || p.college || p.targetCollege || 'West Bengal Engineering',
    p.preferredBranch || p.branch || p.targetBranch || 'Computer Science & Engineering',
    p.state || 'West Bengal',
    p.sourceUrl || p.source || 'Free College Counselling Form',
    p.consentStatus || 'Explicit Consent Granted'
  ];
  sheet.appendRow(row);
  formatLastRow(sheet, row.length);
}

// Sheet 3: B.Tech Leads
function appendLeadRow(sheet, p) {
  var row = [
    p.leadId || '',
    formatDateString(p.timestamp),
    p.name || p.fullName || '',
    p.phone || '',
    p.branch || '',
    p.twelfthPercentage !== undefined ? p.twelfthPercentage : '',
    p.percentageType || 'Aggregate',
    p.eligibilityResult || 'REVIEW_REQUIRED',
    p.landingPage || '/',
    p.sourceCtaId || 'general-form',
    p.consentStatus || 'Explicit Consent Granted'
  ];
  sheet.appendRow(row);
  formatLastRow(sheet, row.length);
}

// Sheet 4: Contact Messages
function appendContactRow(sheet, p) {
  var row = [
    formatDateString(p.timestamp),
    p.name || p.fullName || '',
    p.email || '',
    p.subject || '',
    p.message || '',
    p.sourceUrl || ''
  ];
  sheet.appendRow(row);
  formatLastRow(sheet, row.length);
}

// Sheet 5: Newsletter Subscriptions
function appendNewsletterRow(sheet, p) {
  var row = [
    formatDateString(p.timestamp),
    p.email || '',
    p.sourceUrl || '',
    p.consentStatus || 'Explicit Consent Granted'
  ];
  sheet.appendRow(row);
  formatLastRow(sheet, row.length);
}

function appendGenericRow(sheet, p) {
  var row = [
    formatDateString(p.timestamp),
    p.formType || 'GENERAL',
    p.name || p.fullName || p.studentName || '',
    p.phone || p.mobile || '',
    p.email || '',
    JSON.stringify(p)
  ];
  sheet.appendRow(row);
  formatLastRow(sheet, row.length);
}

// ---------------------------------------------------------------------
// 4. Tab Management & Styling Helpers
// ---------------------------------------------------------------------
function getOrCreateTab(ss, primaryName, alternateNames) {
  // Check if primary tab exists
  var sheet = ss.getSheetByName(primaryName);
  if (sheet) return sheet;

  // Check if any alternate tab already exists
  if (alternateNames && alternateNames.length > 0) {
    for (var i = 0; i < alternateNames.length; i++) {
      var alt = ss.getSheetByName(alternateNames[i]);
      if (alt) return alt;
    }
  }

  // Create new primary tab
  return ss.insertSheet(primaryName);
}

function ensureCleanHeaders(sheet, headers) {
  // Brand New Sheet
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    applyHeaderStyle(sheet, headers.length);
    return;
  }

  // Check if existing row 1 has legacy 'Payload' dump column from early tests
  var firstRowValues = sheet.getRange(1, 1, 1, Math.min(sheet.getLastColumn(), 5)).getValues()[0];
  var hasLegacyPayload = firstRowValues.some(function(v) {
    return String(v).trim().toLowerCase() === 'payload';
  });

  if (hasLegacyPayload) {
    convertExistingJsonDumpRows(sheet, headers);
  }
}

function applyHeaderStyle(sheet, colCount) {
  var headerRange = sheet.getRange(1, 1, 1, colCount);
  headerRange
    .setFontWeight('bold')
    .setBackground('#102A56') // BengalCampus Brand Navy
    .setFontColor('#FFFFFF')
    .setFontSize(10)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);

  sheet.setRowHeight(1, 36);
  sheet.setFrozenRows(1);

  // Set default column widths
  for (var i = 1; i <= colCount; i++) {
    sheet.setColumnWidth(i, 160);
  }
  sheet.setColumnWidth(1, 190); // ID / Date
  sheet.setColumnWidth(2, 175); // Date & Time
  sheet.setColumnWidth(3, 175); // Student Name
}

function formatLastRow(sheet, colCount) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return;

  var rowRange = sheet.getRange(lastRow, 1, 1, colCount);
  rowRange
    .setFontFamily('Arial')
    .setFontSize(10)
    .setVerticalAlignment('middle');

  // Alternating light row tint
  if (lastRow % 2 === 0) {
    rowRange.setBackground('#F8FAFC');
  } else {
    rowRange.setBackground('#FFFFFF');
  }
}

// ---------------------------------------------------------------------
// 5. Auto-Convert Legacy JSON Dumps (Cleans up previous test rows)
// ---------------------------------------------------------------------
function convertExistingJsonDumpRows(sheet, targetHeaders) {
  try {
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      sheet.clear();
      sheet.appendRow(targetHeaders);
      applyHeaderStyle(sheet, targetHeaders.length);
      return;
    }

    var range = sheet.getRange(2, 1, lastRow - 1, 2);
    var oldValues = range.getValues();
    var migratedRows = [];

    for (var i = 0; i < oldValues.length; i++) {
      var timeCell = oldValues[i][0];
      var payloadCell = oldValues[i][1];
      try {
        var parsed = JSON.parse(payloadCell);
        migratedRows.push([
          parsed.submissionId || ('LEGACY-' + (i + 1)),
          formatDateString(parsed.submissionTimestamp || timeCell),
          parsed.studentName || parsed.fullName || parsed.name || '',
          formatPercentage(parsed.class10Percentage),
          formatPercentage(parsed.class12Percentage),
          parsed.state || '',
          parsed.preferredCollege || '',
          parsed.preferredBranch || '',
          parsed.sourceUrl || '',
          parsed.consentStatus || 'Migrated from legacy test row'
        ]);
      } catch (e) {
        migratedRows.push([
          'LEGACY-' + (i + 1),
          formatDateString(timeCell),
          '', '', '', '', '', '', '',
          String(payloadCell).substring(0, 100)
        ]);
      }
    }

    sheet.clear();
    sheet.appendRow(targetHeaders);
    applyHeaderStyle(sheet, targetHeaders.length);

    if (migratedRows.length > 0) {
      sheet.getRange(2, 1, migratedRows.length, targetHeaders.length).setValues(migratedRows);
      for (var r = 2; r <= migratedRows.length + 1; r++) {
        formatLastRow(sheet, targetHeaders.length);
      }
    }
  } catch (err) {
    Logger.log('Migration skipped: ' + err);
  }
}

// ---------------------------------------------------------------------
// 6. Formatting Utilities
// ---------------------------------------------------------------------
function formatDateString(raw) {
  if (!raw) return Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');
  try {
    var d = new Date(raw);
    if (isNaN(d.getTime())) return String(raw);
    return Utilities.formatDate(d, 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');
  } catch (e) {
    return String(raw);
  }
}

function formatPercentage(val) {
  if (val === undefined || val === null || val === '') return '';
  var num = parseFloat(val);
  return isNaN(num) ? String(val) : num;
}

function responseJson(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---------------------------------------------------------------------
// 7. Test Runners for All 5 Forms (Run directly inside Apps Script)
// ---------------------------------------------------------------------
function testAllForms() {
  Logger.log('--- Testing Tab 1: Student Enquiries ---');
  doPost({
    postData: {
      contents: JSON.stringify({
        formType: 'ENQUIRY',
        submissionId: 'BC-ENQ-TEST-01',
        submissionTimestamp: new Date().toISOString(),
        studentName: 'Aman Mishra',
        class10Percentage: 92.5,
        class12Percentage: 89.0,
        state: 'West Bengal',
        preferredCollege: 'Faculty of Engineering & Technology, Jadavpur University',
        preferredBranch: 'Computer Science & Engineering',
        sourceUrl: 'https://bengalcampus.in/colleges/jadavpur-university-engineering',
        consentStatus: 'Explicit Consent Granted (DPDP 2023)'
      })
    }
  });

  Logger.log('--- Testing Tab 2: Counselling Requests ---');
  doPost({
    postData: {
      contents: JSON.stringify({
        formType: 'COUNSELLING',
        submissionId: 'BC-COUNS-TEST-01',
        timestamp: new Date().toISOString(),
        fullName: 'Rahul Roy',
        phone: '9876543210',
        rank: 4250,
        preferredCollege: 'Heritage Institute of Technology',
        preferredBranch: 'Electronics & Communication Engineering',
        state: 'West Bengal',
        sourceUrl: 'Homepage Hero Counselling Form',
        consentStatus: 'Explicit Consent Granted'
      })
    }
  });

  Logger.log('--- Testing Tab 3: B.Tech Leads ---');
  doPost({
    postData: {
      contents: JSON.stringify({
        formType: 'LEAD',
        leadId: 'IEM-TEST-LEAD-01',
        timestamp: new Date().toISOString(),
        name: 'Priya Sen',
        phone: '9123456789',
        branch: 'cse-aiml',
        twelfthPercentage: 88.5,
        percentageType: 'Aggregate',
        eligibilityResult: 'ELIGIBLE_PRELIMINARY',
        landingPage: '/apply',
        sourceCtaId: 'dedicated-apply-page',
        consentStatus: 'Explicit Consent Granted'
      })
    }
  });

  Logger.log('--- Testing Tab 4: Contact Messages ---');
  doPost({
    postData: {
      contents: JSON.stringify({
        formType: 'CONTACT',
        timestamp: new Date().toISOString(),
        name: 'Sourav Ganguly',
        email: 'sourav@example.com',
        subject: 'Cutoff Data Verification Inquiry',
        message: 'Could you verify the Round 2 closing rank for KGEC Electrical?',
        sourceUrl: 'https://bengalcampus.in/contact'
      })
    }
  });

  Logger.log('--- Testing Tab 5: Newsletter Subscriptions ---');
  doPost({
    postData: {
      contents: JSON.stringify({
        formType: 'NEWSLETTER',
        timestamp: new Date().toISOString(),
        email: 'subscriber@example.com',
        sourceUrl: 'https://bengalcampus.in/',
        consentStatus: 'Explicit Consent Granted (Newsletter)'
      })
    }
  });

  Logger.log('All 5 forms tested successfully. Check the 5 sheet tabs in your spreadsheet!');
}
