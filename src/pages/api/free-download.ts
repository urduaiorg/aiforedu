export const prerender = false;

import type { APIRoute } from 'astro';

interface Env {
  DB: D1Database;
  BEEHIIV_API_KEY?: string;
  BEEHIIV_PUBLICATION_ID?: string;
}

export const POST: APIRoute = async ({ request }) => {
  const env = (request as any).cf?.env as Env | undefined;

  try {
    const body = await request.json();
    const { email, resource } = body as { email?: string; resource?: string };

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Store lead capture with resource info
    if (env?.DB) {
      await env.DB.prepare(
        'INSERT OR IGNORE INTO lead_captures (email, source, resource, captured_at) VALUES (?, ?, ?, ?)'
      ).bind(email, 'free-download', resource || 'unknown', new Date().toISOString()).run();

      // Track product interest
      await env.DB.prepare(
        'INSERT INTO product_interest (email, product_slug, action, created_at) VALUES (?, ?, ?, ?)'
      ).bind(email, resource || 'ai-policy-template', 'download', new Date().toISOString()).run();
    }

    // Subscribe to Beehiiv with tag
    if (env?.BEEHIIV_API_KEY && env?.BEEHIIV_PUBLICATION_ID) {
      await fetch(`https://api.beehiiv.com/v2/publications/${env.BEEHIIV_PUBLICATION_ID}/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          custom_fields: [{ name: 'lead_magnet', value: resource || 'ai-policy-template' }],
        }),
      });
    }

    // In production, this would trigger an email with the download link
    // For now, return a direct download URL
    const downloadUrl = `/downloads/${resource || 'ai-policy-template'}.docx`;

    return new Response(JSON.stringify({ success: true, downloadUrl }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
