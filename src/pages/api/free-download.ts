export const prerender = false;

import type { APIRoute } from 'astro';

interface Env {
  DB?: D1Database;
  BEEHIIV_API_KEY?: string;
  BEEHIIV_PUBLICATION_ID?: string;
}

const resourceMap: Record<string, { downloadUrl: string; productSlug: string }> = {
  'ai-policy-template': {
    downloadUrl: '/downloads/ai-policy-template/',
    productSlug: 'policy-kit',
  },
  'policy-template': {
    downloadUrl: '/downloads/ai-policy-template/',
    productSlug: 'policy-kit',
  },
};

export const POST: APIRoute = async ({ request }) => {
  const env = (request as any).cf?.env as Env | undefined;

  try {
    const body = await request.json();
    const { email, resource, role, organization, districtSize, useCase } = body as {
      email?: string;
      resource?: string;
      role?: string;
      organization?: string;
      districtSize?: string;
      useCase?: string;
    };

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const resourceKey = resource || 'ai-policy-template';
    const resourceConfig = resourceMap[resourceKey];

    if (!resourceConfig) {
      return new Response(JSON.stringify({ error: 'Requested resource not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    // Store lead capture with resource info
    if (env?.DB) {
      await env.DB.prepare(
        'INSERT OR IGNORE INTO lead_captures (email, source, resource, captured_at) VALUES (?, ?, ?, ?)'
      ).bind(email, 'free-download', resourceKey, new Date().toISOString()).run();

      // Track product interest
      await env.DB.prepare(
        'INSERT INTO product_interest (email, product_slug, action, created_at) VALUES (?, ?, ?, ?)'
      ).bind(email, resourceConfig.productSlug, 'download', new Date().toISOString()).run();

      try {
        await env.DB.prepare(
          'INSERT INTO lead_context (email, source, role, organization, district_size, use_case, buying_stage, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        ).bind(
          email,
          'free-download',
          role || null,
          organization || null,
          districtSize || null,
          useCase || resourceKey,
          'researching',
          new Date().toISOString()
        ).run();
      } catch {
        // Older databases may not have the optional instrumentation tables yet.
      }
    }

    // Subscribe to Beehiiv with tag
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
          custom_fields: [{ name: 'lead_magnet', value: resourceKey }],
        }),
      });

      beehiivSubscribed = beehiivRes.ok;
    }

    return new Response(
      JSON.stringify({
        success: true,
        downloadUrl: resourceConfig.downloadUrl,
        successTitle: 'Resource ready',
        successMessage: beehiivSubscribed
          ? 'Open the resource now. We also queued the follow-up guidance in your inbox.'
          : 'Open the resource now. The resource is available immediately in your browser.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
