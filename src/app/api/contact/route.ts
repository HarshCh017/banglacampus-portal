import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().email('Please enter a valid email address').max(100),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(120),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the privacy policy to submit an enquiry' }),
  }),
  hp_website: z.string().optional(), // Bot honeypot
});

// Simple in-memory rate limiting map for developmental/single instance runtime
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many submissions. Please wait 60 seconds before trying again.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot trap: if bot filled this hidden field, return false success
    if (body.hp_website && String(body.hp_website).trim() !== '') {
      return NextResponse.json({
        success: true,
        message: 'Your enquiry has been received. Our team will review it shortly.',
      });
    }

    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { fullName, email, subject } = parseResult.data;

    // Operational rule: Never log raw message bodies to protect personal data
    console.info(`[BanglaCampus Contact] Received enquiry from ${email.replace(/(?<=.{2}).(?=[^@]*?@)/g, '*')} regarding "${subject}"`);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received by the BanglaCampus Research Cell. We will review your enquiry within 2 business days.',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'An unexpected server error occurred while sending your message.' },
      { status: 500 }
    );
  }
}
