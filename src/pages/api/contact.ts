export const prerender = false;

import type { APIRoute } from 'astro';

interface Env {
  DB: D1Database;
  TURNSTILE_SECRET_KEY?: string;
}

export const POST: APIRoute = async ({ request }) => {
  const env = (request as any).cf?.env as Env | undefined;

  try {
    const body = await request.json();
    const { name, email, subject, message, turnstileToken } = body as {
      name?: string; email?: string; subject?: string; message?: string; turnstileToken?: string;
    };

    if (!email || !name || !message) {
      return new Response(JSON.stringify({ error: 'Name, email, and message are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
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
        return new Response(JSON.stringify({ error: 'Bot verification failed' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // Store in D1
    if (env?.DB) {
      await env.DB.prepare(
        'INSERT INTO contact_submissions (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, ?)'
      ).bind(name, email, subject || 'General Inquiry', message, new Date().toISOString()).run();
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
