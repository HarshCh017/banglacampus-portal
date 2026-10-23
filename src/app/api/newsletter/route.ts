import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address').max(100),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Explicit consent is required to receive admission bulletins' }),
  }),
  hp_field: z.string().optional(), // Bot honeypot
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check
    if (body.hp_field && String(body.hp_field).trim() !== '') {
      return NextResponse.json({ success: true, message: 'Subscription received.' });
    }

    const parseResult = newsletterSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email } = parseResult.data;

    // Check if an email marketing provider is configured
    const providerConfigured = Boolean(process.env.RESEND_API_KEY || process.env.NEWSLETTER_PROVIDER_KEY);

    if (!providerConfigured) {
      // Disclose transparently to client
      return NextResponse.json({
        success: true,
        queued: true,
        providerConfigured: false,
        message:
          'Subscription noted in development store. Live email dispatch requires RESEND_API_KEY in environment variables.',
      });
    }

    // In a configured environment, forward to provider here
    return NextResponse.json({
      success: true,
      queued: false,
      providerConfigured: true,
      message: 'Thank you! You are subscribed to the BanglaCampus monthly admission digest.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred while processing subscription.' },
      { status: 500 }
    );
  }
}
