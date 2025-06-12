
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const YOUR_EMAIL_ADDRESS = 'kishorem2607@gmail.com';
// IMPORTANT: For Resend to work, this FROM_EMAIL_ADDRESS MUST be from a domain you have verified in your Resend account.
// For initial testing *before* domain verification, you *might* be able to use 'Portfolio Contact <onboarding@resend.dev>',
// but this is not reliable for production.
const FROM_EMAIL_ADDRESS = 'Portfolio Contact <onboarding@resend.dev>'; // Replace with your verified sender email

export async function POST(request: NextRequest) {
  if (!RESEND_API_KEY) {
    console.error('Resend API key is not configured. Set RESEND_API_KEY in .env.local');
    return NextResponse.json({ error: 'Email service not configured (API key missing).', details: 'The site administrator needs to configure the email sending service.' }, { status: 500 });
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL_ADDRESS,
      to: [YOUR_EMAIL_ADDRESS],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      reply_to: email,
    });

    if (error) {
      console.error('Resend API Error:', error);
      // Try to extract a more specific error message if available
      let errorMessage = 'Failed to send email due to an API error.';
      if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'name' in error && 'message' in error) {
        errorMessage = `${(error as any).name}: ${(error as any).message}`;
      }
      return NextResponse.json({ error: 'Failed to send message.', details: errorMessage }, { status: 500 });
    }

    return NextResponse.json({ message: 'Form submission received and email sent successfully!' }, { status: 200 });

  } catch (err: unknown) {
    console.error('API Route Error (Resend):', err);
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred processing the request.';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}
