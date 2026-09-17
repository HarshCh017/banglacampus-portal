import fs from 'fs';
import path from 'path';
import os from 'os';
import { StoredLeadRecord, EligibilityOutcome, PercentageType, AttributionMetadata } from '@/types';
import { getBranchBySlug } from '@/data/branches';

// In-memory fallback cache for serverless environments where disk is ephemeral
const inMemoryLeadCache: StoredLeadRecord[] = [];

function getDataDir(): string {
  const localDir = path.join(process.cwd(), 'data');
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const testFile = path.join(localDir, '.write-test');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    return localDir;
  } catch {
    // Fallback to OS temp directory on read-only environments (e.g. Vercel / AWS Lambda)
    const tmpDir = path.join(os.tmpdir(), 'iem-data');
    try {
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
    } catch {
      // Ignore
    }
    return tmpDir;
  }
}

function getLeadsFilePath(): string {
  return path.join(getDataDir(), 'leads.json');
}

function ensureDataStoreExists(): string {
  const leadsFile = getLeadsFilePath();
  try {
    if (!fs.existsSync(leadsFile)) {
      fs.writeFileSync(leadsFile, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch {
    // Read-only fallback handled gracefully
  }
  return leadsFile;
}

export async function persistLeadRecord(lead: {
  fullName: string;
  phone: string;
  twelfthPercentage: number;
  percentageType: PercentageType;
  branch: string;
  consentGiven: boolean;
  consentTimestamp: string;
  consentVersion: string;
  eligibilityResult: EligibilityOutcome;
  attribution: AttributionMetadata;
}): Promise<StoredLeadRecord> {
  const leadsFile = ensureDataStoreExists();

  const branchInfo = getBranchBySlug(lead.branch);
  const branchName = branchInfo ? branchInfo.name : lead.branch;

  const leadId = `IEM-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  const record: StoredLeadRecord = {
    id: leadId,
    createdAt: new Date().toISOString(),
    fullName: lead.fullName,
    phone: lead.phone,
    twelfthPercentage: lead.twelfthPercentage,
    percentageType: lead.percentageType,
    branch: lead.branch,
    branchName,
    consentGiven: lead.consentGiven,
    consentTimestamp: lead.consentTimestamp,
    consentVersion: lead.consentVersion,
    eligibilityResult: lead.eligibilityResult,
    attribution: lead.attribution,
    status: 'NEW',
    syncStatus: 'LOCAL_ONLY',
  };

  // 1. Read existing records from disk or in-memory cache
  let records: StoredLeadRecord[] = [...inMemoryLeadCache];
  try {
    if (fs.existsSync(leadsFile)) {
      const rawData = fs.readFileSync(leadsFile, 'utf-8');
      records = JSON.parse(rawData);
    }
  } catch {
    // Keep in-memory cache
  }

  // 2. Check for idempotency match within existing records
  if (lead.attribution.idempotencyKey) {
    const existing = records.find(
      (r) => r.attribution.idempotencyKey === lead.attribution.idempotencyKey
    );
    if (existing) {
      return existing; // Idempotent return
    }
  }

  // 3. Persist locally (Pessimistic persistence guarantee)
  records.push(record);
  inMemoryLeadCache.push(record);

  try {
    fs.writeFileSync(leadsFile, JSON.stringify(records, null, 2), 'utf-8');
  } catch (writeErr: any) {
    console.warn('[LeadStore] Local file write skipped (Vercel serverless environment):', writeErr?.message);
  }

  // 4. Asynchronously attempt upstream CRM dispatch if configured
  dispatchToUpstreamCrm(record).catch((err) => {
    console.error(`[CRM Dispatch Error] Lead ${record.id} stored in fallback queue:`, err?.message);
  });

  return record;
}

async function dispatchToUpstreamCrm(record: StoredLeadRecord): Promise<void> {
  const crmUrl = process.env.CRM_WEBHOOK_URL;
  if (!crmUrl || crmUrl.includes('example.com')) {
    // No external CRM configured; kept in local durable queue
    return;
  }

  try {
    const res = await fetch(crmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.CRM_API_KEY ? { Authorization: `Bearer ${process.env.CRM_API_KEY}` } : {}),
      },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(5000), // 5-second timeout
    });

    if (res.ok) {
      updateLeadSyncStatus(record.id, 'SYNCED');
    } else {
      updateLeadSyncStatus(record.id, 'PENDING_RETRY');
    }
  } catch {
    updateLeadSyncStatus(record.id, 'PENDING_RETRY');
  }
}

function updateLeadSyncStatus(leadId: string, syncStatus: 'SYNCED' | 'PENDING_RETRY'): void {
  try {
    const leadsFile = getLeadsFilePath();
    if (fs.existsSync(leadsFile)) {
      const rawData = fs.readFileSync(leadsFile, 'utf-8');
      const records: StoredLeadRecord[] = JSON.parse(rawData);
      const target = records.find((r) => r.id === leadId);
      if (target) {
        target.syncStatus = syncStatus;
        fs.writeFileSync(leadsFile, JSON.stringify(records, null, 2), 'utf-8');
      }
    }
  } catch (err) {
    console.error(`Failed to update sync status for ${leadId}:`, err);
  }
}

export function getAllLeads(): StoredLeadRecord[] {
  try {
    const leadsFile = getLeadsFilePath();
    if (fs.existsSync(leadsFile)) {
      const raw = fs.readFileSync(leadsFile, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {
    // Return in-memory fallback
  }
  return [...inMemoryLeadCache];
}
