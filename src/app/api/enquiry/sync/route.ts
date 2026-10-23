import { NextResponse } from 'next/server';
import { syncPendingEnquiries, testGoogleSheetsWebhook } from '@/lib/googleSheetsService';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    if (body.action === 'test_ping') {
      const pingResult = await testGoogleSheetsWebhook(body.url);
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
