import { NextResponse } from 'next/server';
import { syncPendingEnquiries, testGoogleSheetsWebhook } from '@/lib/googleSheetsService';
import { getServerSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    // 1. Authorization Gate: Only authenticated admins or counsellors can trigger synchronization
    const session = await getServerSession();
    if (!session || (session.role !== 'admin' && session.role !== 'counsellor')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: Admin or Counsellor role required.' },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));

    // 2. SSRF Prevention: Do NOT accept client-supplied URLs. Strictly use server-side env configuration.
    if (body.action === 'test_ping') {
      const pingResult = await testGoogleSheetsWebhook(); // Uses process.env.GOOGLE_SHEETS_WEBHOOK_URL
      return NextResponse.json(pingResult);
    }

    const result = await syncPendingEnquiries();
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Sync operation failed' },
      { status: 500 }
    );
  }
}
