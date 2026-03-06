export const prerender = false;

import type { APIRoute } from 'astro';

interface Env {
  DB?: D1Database;
  BEEHIIV_API_KEY?: string;
  BEEHIIV_PUBLICATION_ID?: string;
  TURNSTILE_SECRET_KEY?: string;
}

export const POST: APIRoute = async ({ request }) => {
  const env = (request as any).cf?.env as Env | undefined;

  try {
    const body = await request.json();
    const { email, role, organization, districtSize, useCase, turnstileToken } = body as {
      email?: string;
      role?: string;
      organization?: string;
      districtSize?: string;
      useCase?: string;
      turnstileToken?: string;
    };

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const hasDatabase = Boolean(env?.DB);
    const hasBeehiiv = Boolean(env?.BEEHIIV_API_KEY && env?.BEEHIIV_PUBLICATION_ID);

    if (!hasDatabase && !hasBeehiiv) {
      return new Response(
        JSON.stringify({
          error: 'The newsletter workflow is not configured yet. Please check back after launch.',
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Turnstile verification (if configured)
    if (env?.TURNSTILE_SECRET_KEY && turnstileToken) {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
      });
      const verify = await verifyRes.json() as { success: boolean };
      if (!verify.success) {
        return new Response(JSON.stringify({ error: 'Bot verification failed' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // Store in D1
    if (env?.DB) {
      await env.DB.prepare(
        'INSERT OR IGNORE INTO lead_captures (email, source, captured_at) VALUES (?, ?, ?)'
      ).bind(email, 'newsletter', new Date().toISOString()).run();

      try {
        await env.DB.prepare(
          'INSERT INTO lead_context (email, source, role, organization, district_size, use_case, buying_stage, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        ).bind(
          email,
          'newsletter',
          role || null,
          organization || null,
          districtSize || null,
          useCase || 'weekly-briefing',
          'subscribed',
          new Date().toISOString()
        ).run();
      } catch {
        // Older databases may not have the optional instrumentation tables yet.
      }
    }

    // Forward to Beehiiv (if configured)
    let beehiivSubscribed = false;
    if (env?.BEEHIIV_API_KEY && env?.BEEHIIV_PUBLICATION_ID) {
      const beehiivRes = await fetch(`https://api.beehiiv.com/v2/publications/${env.BEEHIIV_PUBLICATION_ID}/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
        }),
      });

      beehiivSubscribed = beehiivRes.ok;
    }

    return new Response(
      JSON.stringify({
        success: true,
        successTitle: beehiivSubscribed ? 'Subscription confirmed' : 'Interest recorded',
        successMessage: beehiivSubscribed
          ? 'Check your inbox for the first briefing and welcome resources.'
          : 'Your interest has been recorded. Automated newsletter delivery is not configured in this environment yet.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
