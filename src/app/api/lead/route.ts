import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema, normalizePhoneNumber } from '@/lib/schema';
import { evaluateEligibility } from '@/lib/eligibility';
import { persistLeadRecord } from '@/lib/leadStore';

// Simple in-memory rate limiting map (IP -> timestamps array)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    // 2. Parse JSON body
    const body = await req.json();

    // 3. Honeypot check (reject automated bots silently)
    if (body.hp_website_confirm || body.botField) {
      return NextResponse.json({ success: true, leadId: 'IEM-BOT-DROPPED' }, { status: 200 });
    }

    // 4. Server-Side Authoritative Schema Validation
    const validationResult = leadFormSchema.safeParse({
      fullName: body.fullName,
      phone: body.phone,
      twelfthPercentage: body.twelfthPercentage,
      percentageType: body.percentageType,
      branch: body.branch,
      consent: body.consentGiven === true || body.consent === true,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]?.message || 'Invalid form submission.';
      return NextResponse.json(
        { success: false, message: firstError, errors: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // 5. Evaluate Preliminary Eligibility Indication Server-Side
    const indication = evaluateEligibility(
      validData.branch,
      validData.twelfthPercentage,
      validData.percentageType
    );

    // 6. Persist Lead to Durable Local Fallback & Asynchronously Dispatch to CRM
    const record = await persistLeadRecord({
      fullName: validData.fullName,
      phone: normalizePhoneNumber(validData.phone),
      twelfthPercentage: validData.twelfthPercentage,
      percentageType: validData.percentageType,
      branch: validData.branch,
      consentGiven: true,
      consentTimestamp: body.consentTimestamp || new Date().toISOString(),
      consentVersion: body.consentVersion || 'v1.0-2027',
      eligibilityResult: indication.status,
      attribution: {
        utmSource: body.utmSource,
        utmMedium: body.utmMedium,
        utmCampaign: body.utmCampaign,
        utmContent: body.utmContent,
        utmTerm: body.utmTerm,
        landingPage: body.landingPage || '/',
        referrer: body.referrer || '',
        sourceCtaId: body.sourceCtaId || 'general-form',
        idempotencyKey: body.idempotencyKey,
      },
    });

    // 7. Auto-Responder / Counsellor Notification Log
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Lead Ingested] ID: ${record.id} | Name: ${record.fullName} | Phone: ${record.phone} | Branch: ${record.branch} | Indication: ${record.eligibilityResult}`);
    }

    return NextResponse.json(
      {
        success: true,
        leadId: record.id,
        eligibilityResult: record.eligibilityResult,
        branch: record.branch,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[API Lead Ingestion Error]:', error);
    // Never expose stack trace to client
    return NextResponse.json(
      { success: false, message: 'An internal error occurred while processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
