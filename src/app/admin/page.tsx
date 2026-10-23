import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { getServerSession } from '@/lib/auth';
import { StoredEnquiryRecord } from '@/lib/googleSheetsService';
import { EmailDispatchRecord } from '@/lib/emailService';
import {
  ShieldCheck,
  Users,
  FileSpreadsheet,
  Mail,
  Building2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Lock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Counsellor & Admin Portal | BanglaCampus',
  description: 'Manage student preferences, Google Sheets sync, and email notifications.',
};

function getEnquiries(): StoredEnquiryRecord[] {
  try {
    const localFile = path.join(process.cwd(), 'data', 'student-enquiries.json');
    if (fs.existsSync(localFile)) {
      return JSON.parse(fs.readFileSync(localFile, 'utf-8'));
    }
  } catch {
    // Fallback
  }
  return [];
}

function getEmailLogs(): EmailDispatchRecord[] {
  try {
    const localFile = path.join(process.cwd(), 'data', 'email-notifications.json');
    if (fs.existsSync(localFile)) {
      return JSON.parse(fs.readFileSync(localFile, 'utf-8'));
    }
  } catch {
    // Fallback
  }
  return [];
}

export default async function AdminPage() {
  const session = await getServerSession();

  // If not logged in as counsellor or admin, show login prompt
  if (!session || (session.role !== 'counsellor' && session.role !== 'admin')) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto shadow-xs">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold font-heading text-slate-900">
            Counsellor &amp; Admin Desk Access Required
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            This protected workspace is reserved for authorized admission counsellors and researchers reviewing student submissions.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/login?role=counsellor"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-md"
          >
            <span>Log In as Counsellor / Admin</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const enquiries = getEnquiries().reverse(); // newest first
  const emailLogs = getEmailLogs().reverse();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>BanglaCampus Admissions Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
            Student Enquiries &amp; Lead Intake Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Logged in as <span className="font-semibold text-slate-800">{session.name}</span> ({session.email})
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200">
            Total Enquiries: <strong className="text-slate-900">{enquiries.length}</strong>
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Total Enquiries Recorded</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black font-mono text-slate-900">
            {enquiries.length}
          </div>
          <p className="text-[11px] text-slate-500">
            Dual-stored locally &amp; queued for Google Sheets
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Email Alerts Dispatched</span>
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black font-mono text-slate-900">
            {emailLogs.length}
          </div>
          <p className="text-[11px] text-slate-500 truncate">
            Target: {process.env.ENQUIRY_NOTIFICATION_EMAIL || 'hc8986234943@gmail.com'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Google Sheets Sync</span>
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-lg font-bold text-slate-900 flex items-center gap-1.5 pt-1">
            {process.env.GOOGLE_SHEETS_WEBHOOK_URL ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Connected</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span className="text-sm">Webhook Pending</span>
              </>
            )}
          </div>
          <p className="text-[11px] text-slate-500">
            Worksheet: <code>Student Enquiries</code>
          </p>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-base font-bold font-heading text-slate-900">
            Incoming Student Enquiries
          </h2>
          <span className="text-xs text-slate-500">
            Auto-refreshed upon submission
          </span>
        </div>

        {enquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <Users className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-medium">No student enquiries recorded yet.</p>
            <p className="text-xs text-slate-400">
              New submissions from the 5-second popup will instantly appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-3 px-4">Submission ID</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4 text-center">Class 10</th>
                  <th className="py-3 px-4 text-center">Class 12</th>
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4">Preferred College &amp; Branch</th>
                  <th className="py-3 px-4 text-center">Sync Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {enquiries.map((enq) => (
                  <tr key={enq.submissionId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {enq.submissionId}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {enq.studentName}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-800">
                      {enq.class10Percentage}%
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-800">
                      {enq.class12Percentage}%
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-600">
                      {enq.state}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-emerald-800 leading-tight">
                        {enq.preferredCollege}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {enq.preferredBranch}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          enq.syncStatus === 'CONFIRMED_GOOGLE_SHEETS'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {enq.syncStatus === 'CONFIRMED_GOOGLE_SHEETS'
                          ? 'Google Sheets Synced'
                          : 'Local Queue (Pending Webhook)'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
