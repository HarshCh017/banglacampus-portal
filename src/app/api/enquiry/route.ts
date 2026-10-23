import { NextRequest, NextResponse } from 'next/server';
import {
  studentEnquirySchema,
  validateCollegeBranchCompatibility,
} from '@/lib/enquiryValidation';
import { persistStudentEnquiry } from '@/lib/googleSheetsService';
import { ENQUIRY_CONFIG } from '@/config/enquiry';

// In-memory rate limiting map (IP -> array of request timestamps)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= ENQUIRY_CONFIG.SUBMISSION.MAX_REQUESTS_PER_MINUTE_PER_IP) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many submissions. Please wait 60 seconds before trying again.',
        },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await req.json();

    // 3. Honeypot check (reject automated bots silently)
    if (body.hp_field && String(body.hp_field).trim() !== '') {
      return NextResponse.json(
        {
          success: true,
          submissionId: 'BC-BOT-FILTERED',
          message: 'Your preferences have been submitted successfully.',
        },
        { status: 200 }
      );
    }

    // 4. Schema validation
    const parseResult = studentEnquirySchema.safeParse(body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      const firstErrorMessage =
        parseResult.error.errors[0]?.message || 'Invalid form submission. Please review your entries.';

      return NextResponse.json(
        {
          success: false,
          message: firstErrorMessage,
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = parseResult.data;

    // 5. College-Branch Compatibility check
    const isCompatible = validateCollegeBranchCompatibility(
      validData.preferredCollege,
      validData.preferredBranch
    );

    if (!isCompatible) {
      return NextResponse.json(
        {
          success: false,
          message: 'The selected engineering branch is not verified for the chosen college.',
          errors: {
            preferredBranch: ['Branch is not offered by this institution according to verified records.'],
          },
        },
        { status: 400 }
      );
    }

    // 6. Persistence to Google Sheets & local queue
    const result = await persistStudentEnquiry(validData);

    return NextResponse.json(
      {
        success: true,
        submissionId: result.submissionId,
        persistedToGoogleSheets: result.persistedToGoogleSheets,
        message: result.message,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('[Student Enquiry API Error]', err?.message || err);
    return NextResponse.json(
      {
        success: false,
        message: 'A temporary server error occurred. Your entries have been preserved. Please try again.',
      },
      { status: 500 }
    );
  }
}
