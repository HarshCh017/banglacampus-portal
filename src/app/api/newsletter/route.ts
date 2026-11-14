import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendToGoogleSheets } from '@/lib/sheetsWebhook';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address').max(100),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Explicit consent is required to receive admission bulletins' }),
  }),
  hp_field: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.hp_field && String(body.hp_field).trim() !== '') {
      return NextResponse.json({ success: true, message: 'Subscription received.' });
    }

    const parseResult = newsletterSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, errors: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email } = parseResult.data;

    // Send to Google Sheets
    const sheetsResult = await sendToGoogleSheets({
      formType: 'NEWSLETTER',
      timestamp: new Date().toISOString(),
      email,
      sourceUrl: req.headers.get('referer') || 'https://bengalcampus.in',
      consentStatus: 'Explicit Consent Granted (Newsletter)',
    });

    if (!sheetsResult.success) {
      console.warn('[Newsletter] Google Sheets dispatch failed:', sheetsResult.error);
    }

    return NextResponse.json({
      success: true,
      queued: !sheetsResult.success,
      persistedToGoogleSheets: sheetsResult.success,
      message: 'Thank you! You are subscribed to the BengalCampus monthly admission digest.',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred while processing subscription.' },
      { status: 500 }
    );
  }
}
