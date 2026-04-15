import { NextRequest, NextResponse } from 'next/server';
import { createInquiry } from '@/lib/db';
import { sanitizeObject, validateEmail } from '@/lib/sanitize';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

interface EmailConfig {
  to: string;
  subject: string;
  text: string;
  html: string;
}

async function sendEmail(config: EmailConfig): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;
  
  if (!resendApiKey) {
    console.log('Email would be sent (no RESEND_API_KEY configured):', {
      to: config.to,
      subject: config.subject,
      preview: config.text.substring(0, 100)
    });
    return true;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'Smart Edge <onboarding@resend.dev>',
        to: config.to,
        subject: config.subject,
        text: config.text,
        html: config.html,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);
  
  if (!checkRateLimit(clientIp)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const sanitized = sanitizeObject(body) as { name?: unknown; email?: unknown; service?: unknown; message?: unknown; company?: unknown };
    const name = String(sanitized.name || '');
    const email = String(sanitized.email || '');
    const service = String(sanitized.service || '');
    const message = String(sanitized.message || '');
    const company = String(sanitized.company || '');

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const inquiry = createInquiry({
      name,
      email,
      subject: service || 'General Inquiry',
      message,
      status: 'new',
    });

    await sendEmail({
      to: 'rohansakha343@gmail.com',
      subject: `New Inquiry: ${service || 'General'} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nService: ${service}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Service:</strong> ${service || 'General Inquiry'}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    sendEmail({
      to: email,
      subject: 'Thank you for contacting Smart Edge Solutions',
      text: `Dear ${name},\n\nThank you for reaching out to us. We have received your inquiry and will get back to you within 24 hours.\n\nBest regards,\nSmart Edge Solutions Team`,
      html: `
        <h2>Thank you for contacting Smart Edge Solutions!</h2>
        <p>Dear ${name},</p>
        <p>We have received your inquiry and will get back to you within 24 hours.</p>
        <p>Best regards,<br>Smart Edge Solutions Team</p>
      `,
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}