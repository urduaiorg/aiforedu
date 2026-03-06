export const prerender = false;

import type { APIRoute } from 'astro';

interface Env {
  DB?: D1Database;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_WEBHOOK_URL?: string;
}

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'X-Robots-Tag': 'noindex, nofollow',
};

export const POST: APIRoute = async ({ request }) => {
  const env = (request as any).cf?.env as Env | undefined;

  try {
    const body = await request.json();
    const { name, email, subject, message, role, organization, districtSize, useCase, buyingStage, turnstileToken } = body as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      role?: string;
      organization?: string;
      districtSize?: string;
      useCase?: string;
      buyingStage?: string;
      turnstileToken?: string;
    };

    if (!email || !name || !message) {
      return new Response(JSON.stringify({ error: 'Name, email, and message are required' }), { status: 400, headers: JSON_HEADERS });
    }

    const hasDatabase = Boolean(env?.DB);
    const hasWebhook = Boolean(env?.CONTACT_WEBHOOK_URL);

    if (!hasDatabase && !hasWebhook) {
      return new Response(
        JSON.stringify({
          error: 'The contact workflow is not configured yet. Please email hello@aiforedu.ai directly.',
        }),
        { status: 503, headers: JSON_HEADERS }
      );
    }

    // Turnstile verification
    if (env?.TURNSTILE_SECRET_KEY && turnstileToken) {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
      });
      const verify = await verifyRes.json() as { success: boolean };
      if (!verify.success) {
        return new Response(JSON.stringify({ error: 'Bot verification failed' }), { status: 403, headers: JSON_HEADERS });
      }
    }

    if (env?.CONTACT_WEBHOOK_URL) {
      const webhookRes = await fetch(env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'aiforedu-contact-form',
          submittedAt: new Date().toISOString(),
          payload: {
            name,
            email,
            subject: subject || 'General Inquiry',
            message,
            role,
            organization,
            districtSize,
            useCase,
            buyingStage,
          },
        }),
      });

      if (!webhookRes.ok) {
        return new Response(
          JSON.stringify({ error: 'The contact destination is currently unavailable. Please email hello@aiforedu.ai directly.' }),
          { status: 502, headers: JSON_HEADERS }
        );
      }
    }

    if (env?.DB) {
      await env.DB.prepare(
        'INSERT INTO contact_submissions (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, ?)'
      ).bind(name, email, subject || 'General Inquiry', message, new Date().toISOString()).run();

      try {
        await env.DB.prepare(
          'INSERT INTO lead_context (email, source, role, organization, district_size, use_case, buying_stage, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        ).bind(
          email,
          'contact',
          role || null,
          organization || null,
          districtSize || null,
          useCase || null,
          buyingStage || null,
          new Date().toISOString()
        ).run();
      } catch {
        // Older databases may not have the optional instrumentation tables yet.
      }
    }

    const successMessage = env?.CONTACT_WEBHOOK_URL
      ? 'Your message reached the editorial desk. We will review it and reply from hello@aiforedu.ai.'
      : 'Your message has been logged for manual review. For anything urgent, email hello@aiforedu.ai directly.';

    return new Response(
      JSON.stringify({
        success: true,
        successTitle: 'Message received',
        successMessage,
      }),
      { status: 200, headers: JSON_HEADERS }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: JSON_HEADERS });
  }
};
