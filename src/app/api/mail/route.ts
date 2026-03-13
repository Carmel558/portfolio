import { NextResponse } from 'next/server';
export const runtime = 'nodejs';

// POST /api/mail
// Body: { to: string, subject: string, html?: string, text?: string, from?: { email?: string, name?: string } }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, html, text, from } = body || {};

    if (!to || !subject || (!html && !text)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'BREVO_API_KEY not configured' }, { status: 500 });
    }

    const payload = {
      sender: {
        email:  process.env.BREVO_API_MAIL,
        name: from?.name || 'HuuFit Team',
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
      textContent: text,
    };

    const resp = await fetch(process.env.BREVO_API_URL || 'https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const err = await resp.text();
      return NextResponse.json({ error: 'Brevo error', details: err }, { status: 502 });
    }

    const data = await resp.json();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error('MAIL_ROUTE_POST_ERROR', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


