import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
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
    // Support both full 6-field academic inquiry and quick 1-on-1 counselling lead
    if (body.class10Percentage !== undefined) {
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

      // 6. DPDP Act 2023 Consent Audit Trail
      const userAgent = req.headers.get('user-agent') || 'unknown';
      const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
      const uaHash = crypto.createHash('sha256').update(userAgent).digest('hex').substring(0, 16);
      const consentAt = new Date().toISOString();

      // 7. Persistence to Google Sheets & local queue
      const result = await persistStudentEnquiry({
        ...validData,
        formType: 'ENQUIRY',
      }, {
        ipHash,
        uaHash,
        consentAt,
      });

      return NextResponse.json(
        {
          success: true,
          submissionId: result.submissionId,
          persistedToGoogleSheets: result.persistedToGoogleSheets,
          message: result.message,
        },
        { status: 200 }
      );
    }

    // Quick Free Counselling Lead Handler (From Homepage Hero & College Detail Pages)
    const rawName = String(body.fullName || body.name || body.studentName || '').trim();
    const rawPhone = String(body.phone || body.mobile || body.mobileNumber || '').replace(/\D/g, '');

    if (rawName.length < 2) {
      return NextResponse.json(
        { success: false, message: 'Please enter your full name (minimum 2 characters)' },
        { status: 400 }
      );
    }

    if (rawPhone.length !== 10) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid 10-digit mobile number' },
        { status: 400 }
      );
    }

    const preferredCollege = String(
      body.preferredCollege ||
      body.collegeSlug ||
      body.targetCollege ||
      body.preferredCollegeSlug ||
      'general'
    ).trim();

    const preferredBranch = String(
      body.preferredBranch ||
      body.targetBranch ||
      body.branch ||
      'Computer Science & Engineering'
    ).trim();

    const rawRank = body.rank !== undefined
      ? body.rank
      : (body.notes ? String(body.notes).replace(/[^0-9]/g, '') : undefined);

    const userAgent = req.headers.get('user-agent') || 'unknown';
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
    const uaHash = crypto.createHash('sha256').update(userAgent).digest('hex').substring(0, 16);
    const consentAt = new Date().toISOString();

    const quickData: any = {
      formType: 'COUNSELLING',
      fullName: rawName,
      class10Percentage: rawRank ? `WBJEE Rank: ${rawRank}` : `Mobile: ${rawPhone}`,
      class12Percentage: `WhatsApp: ${rawPhone}`,
      state: body.state || 'West Bengal',
      preferredCollege,
      preferredBranch,
      sourceUrl: body.source || body.sourceUrl || 'Free College Counselling Form',
      consent: true,
      phone: rawPhone,
      rank: rawRank,
    };

    const result = await persistStudentEnquiry(quickData, {
      ipHash,
      uaHash,
      consentAt,
    });

    return NextResponse.json(
      {
        success: true,
        submissionId: result.submissionId,
        persistedToGoogleSheets: result.persistedToGoogleSheets,
        message: 'Your counselling request has been registered. An expert will reach out shortly.',
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
