export const prerender = false;

import type { APIRoute } from 'astro';

interface Env {
  DB: D1Database;
}

const ROBOTS_HEADERS = {
  'X-Robots-Tag': 'noindex, nofollow',
};

// Affiliate URL mapping — add real affiliate URLs here
const affiliateMap: Record<string, string> = {
  'magicschool': 'https://www.magicschool.ai/?ref=aiforedu',
  'curipod': 'https://curipod.com/?ref=aiforedu',
  'diffit': 'https://diffit.me/?ref=aiforedu',
  'brisk': 'https://www.briskteaching.com/?ref=aiforedu',
  'khanmigo': 'https://www.khanacademy.org/khan-labs?ref=aiforedu',
  'schoolai': 'https://schoolai.com/?ref=aiforedu',
  'eduaide': 'https://www.eduaide.ai/?ref=aiforedu',
  'gradescope': 'https://www.gradescope.com/?ref=aiforedu',
};

export const GET: APIRoute = async ({ params, request }) => {
  const env = (request as any).cf?.env as Env | undefined;
  const slug = params.slug || '';
  const destination = affiliateMap[slug];

  if (!destination) {
    return new Response('Not found', { status: 404, headers: ROBOTS_HEADERS });
  }

  // Track the click in D1
  if (env?.DB) {
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const ua = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || '';

    await env.DB.prepare(
      'INSERT INTO affiliate_clicks (slug, ip_hash, user_agent, referer, clicked_at) VALUES (?, ?, ?, ?, ?)'
    ).bind(slug, ip.slice(0, 8) + '***', ua.slice(0, 200), referer.slice(0, 500), new Date().toISOString()).run();
  }

  return new Response(null, {
    status: 302,
    headers: {
      ...ROBOTS_HEADERS,
      Location: destination,
    },
  });
};
