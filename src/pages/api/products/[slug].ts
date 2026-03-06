export const prerender = false;

import type { APIRoute } from 'astro';
import { productsBySlug } from '../../../data/products';

interface Env {
  DB?: D1Database;
}

const ROBOTS_HEADERS = {
  'X-Robots-Tag': 'noindex, nofollow',
};

export const GET: APIRoute = async ({ params, request }) => {
  const env = (request as any).cf?.env as Env | undefined;
  const slug = params.slug as keyof typeof productsBySlug | undefined;
  const product = slug ? productsBySlug[slug] : undefined;

  if (!product) {
    return new Response('Not found', { status: 404, headers: ROBOTS_HEADERS });
  }

  const source = new URL(request.url).searchParams.get('source') || 'unknown';

  if (env?.DB) {
    const referer = request.headers.get('referer') || '';
    const userAgent = request.headers.get('user-agent') || '';

    try {
      await env.DB.prepare(
        'INSERT INTO product_clicks (product_slug, source, referer, user_agent, clicked_at) VALUES (?, ?, ?, ?, ?)'
      ).bind(
        product.slug,
        source,
        referer.slice(0, 500),
        userAgent.slice(0, 200),
        new Date().toISOString()
      ).run();
    } catch {
      // Older databases may not have the optional instrumentation tables yet.
    }
  }

  return new Response(null, {
    status: 302,
    headers: {
      ...ROBOTS_HEADERS,
      Location: product.checkoutUrl,
    },
  });
};
