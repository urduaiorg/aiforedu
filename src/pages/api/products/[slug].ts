export const prerender = false;

import type { APIRoute } from 'astro';

const JSON_HEADERS = {
  'X-Robots-Tag': 'noindex, nofollow',
  Location: 'https://aiforedu.ai/resources/',
};

export const GET: APIRoute = async () => {
  return new Response(null, {
    status: 302,
    headers: JSON_HEADERS,
  });
};
