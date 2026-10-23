'use client';

import React, { useState } from 'react';
import {
  FileSpreadsheet,
  RefreshCw,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';

interface AdminSyncControlProps {
  pendingCount: number;
  isConfigured: boolean;
}

export function AdminSyncControl({ pendingCount, isConfigured }: AdminSyncControlProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [testUrl, setTestUrl] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/enquiry/sync', { method: 'POST' });
      const data = await res.json();
      if (data.webhookConfigured && data.synced > 0) {
        setStatusType('success');
        setStatusMessage(`Successfully synced ${data.synced} student enquiries to Google Sheets!`);
        setTimeout(() => window.location.reload(), 1500);
      } else if (!data.webhookConfigured) {
        setStatusType('error');
        setStatusMessage(
          'GOOGLE_SHEETS_WEBHOOK_URL is not set in .env.local. Follow the guide below to connect in 1 minute!'
        );
      } else {
        setStatusType('success');
        setStatusMessage(data.message || 'All records are up to date.');
      }
    } catch (err: any) {
      setStatusType('error');
      setStatusMessage(err?.message || 'Failed to trigger sync');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleTestWebhook = async () => {
    if (!testUrl && !isConfigured) {
      setStatusType('error');
      setStatusMessage('Please paste your Google Web App URL (starts with https://script.google.com/...)');
      return;
    }
    setIsTesting(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/enquiry/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test_ping', url: testUrl }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusType('success');
        setStatusMessage('Success! Webhook responded positively and triggered test alert to hc8986234943@gmail.com.');
      } else {
        setStatusType('error');
        setStatusMessage(`Test ping failed: ${data.message}`);
      }
    } catch (err: any) {
      setStatusType('error');
      setStatusMessage(err?.message || 'Test failed');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-xs font-semibold">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Google Sheets &amp; Email Dispatcher Engine</span>
          </div>
          <h2 className="text-xl font-bold font-heading text-white tracking-tight">
            Live Intake Synchronization Desk
          </h2>
          <p className="text-xs text-slate-400">
            Pending in Local Queue:{' '}
            <strong className="text-emerald-400 font-mono text-sm">{pendingCount} Submissions</strong>{' '}
            (including recent live submissions)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSync}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing to Sheets...' : 'Sync Pending Enquiries Now'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowGuide((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>{showGuide ? 'Hide Setup Script' : 'View Google Apps Script (1-Min Setup)'}</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-start gap-2.5 ${
            statusType === 'success'
              ? 'bg-emerald-950/70 border border-emerald-700/60 text-emerald-200'
              : 'bg-rose-950/70 border border-rose-700/60 text-rose-200'
          }`}
        >
          {statusType === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          )}
          <p className="leading-relaxed font-medium">{statusMessage}</p>
        </div>
      )}

      {/* Webhook Connection Test Bar */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <label className="block text-xs font-bold text-slate-300">
          Test or Validate Google Sheets Web App URL:
        </label>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="url"
            value={testUrl}
            onChange={(e) => setTestUrl(e.target.value)}
            placeholder="https://script.google.com/macros/s/AKfycb.../exec"
            className="flex-1 px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={handleTestWebhook}
            disabled={isTesting}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isTesting ? 'Pinging Webhook...' : 'Test & Send Test Alert'}</span>
          </button>
        </div>
      </div>

      {/* 1-Minute Setup Guide */}
      {showGuide && (
        <div className="pt-4 border-t border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-emerald-300 font-heading">
              1-Minute Setup: Connect Your Google Sheet &amp; Trigger Emails to hc8986234943@gmail.com
            </h3>
            <button
              type="button"
              onClick={() => {
                const code = `var RECIPIENT_EMAIL = "hc8986234943@gmail.com";
function doGet(e) { return ContentService.createTextOutput(JSON.stringify({ status: "online" })).setMimeType(ContentService.MimeType.JSON); }
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Student Enquiries");
  if (!sheet) { sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Student Enquiries"); sheet.appendRow(["Submission ID","Timestamp","Name","Class 10","Class 12","State","College","Branch","Source URL","Consent"]); }
  sheet.appendRow([data.submissionId, data.submissionTimestamp, data.studentName, data.class10Percentage, data.class12Percentage, data.state, data.preferredCollege, data.preferredBranch, data.sourceUrl, data.consentStatus]);
  MailApp.sendEmail({ to: RECIPIENT_EMAIL, subject: "[BanglaCampus New Enquiry] " + data.studentName, body: "Submission ID: " + data.submissionId + "\\nName: " + data.studentName + "\\nClass 10: " + data.class10Percentage + "%\\nClass 12: " + data.class12Percentage + "%\\nCollege: " + data.preferredCollege + "\\nBranch: " + data.preferredBranch });
  return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
}`;
                navigator.clipboard.writeText(code);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-xs font-semibold px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Script!' : 'Copy Script Code'}</span>
            </button>
          </div>

          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300">
            <li>
              Open your Google Sheet at{' '}
              <a
                href="https://sheets.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 underline inline-flex items-center gap-0.5"
              >
                sheets.google.com <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              Click <strong>Extensions</strong> &rarr; <strong>Apps Script</strong>.
            </li>
            <li>
              Paste the code from <code className="text-emerald-300 bg-slate-800 px-1 rounded">scripts/google-apps-script.js</code> into <code className="text-emerald-300 bg-slate-800 px-1 rounded">Code.gs</code>.
            </li>
            <li>
              Click blue <strong>Deploy</strong> &rarr; <strong>New deployment</strong> &rarr; Select <strong>Web app</strong> (gear icon).
            </li>
            <li>
              Set <em>Who has access</em> to <strong>Anyone</strong>, then click <strong>Deploy</strong>.
            </li>
            <li>
              Copy the resulting URL and paste it in the box above or add to <code className="text-emerald-300 bg-slate-800 px-1 rounded">.env.local</code> as:
              <pre className="mt-2 p-2.5 bg-black/50 border border-slate-800 rounded-lg text-emerald-300 font-mono text-[11px] overflow-x-auto">
                GOOGLE_SHEETS_WEBHOOK_URL=&quot;https://script.google.com/macros/s/.../exec&quot;
              </pre>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
