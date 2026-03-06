export type JsonLdValue = Record<string, unknown>;

export function toJsonLd(value: JsonLdValue | JsonLdValue[] | undefined) {
  if (!value) return undefined;
  const payload = Array.isArray(value) ? value : [value];
  return JSON.stringify(payload.length === 1 ? payload[0] : payload, null, 2);
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AIForEdu',
    url: 'https://aiforedu.ai',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Impact Glocal Inc.',
      url: 'https://imglocal.com',
    },
    sameAs: ['https://imglocal.com'],
    description:
      'Independent AI research, policy resources, and implementation guidance for educators and institutions worldwide.',
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AIForEdu',
    url: 'https://aiforedu.ai',
    description:
      'Independent tool reviews, policy resources, and implementation guidance for educators and institutions worldwide.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://aiforedu.ai/tools/',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/** HowTo schema — triggers step-by-step rich results in Google */
export function howToSchema(opts: {
  name: string;
  description: string;
  totalTime?: string;
  steps: Array<{ name: string; text: string; url?: string }>;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    ...(opts.totalTime && { totalTime: opts.totalTime }),
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url && { url: s.url }),
    })),
    author: { '@type': 'Organization', name: 'AIForEdu', url: 'https://aiforedu.ai' },
  };
}

/** ItemList schema — triggers carousel rich results for roundups */
export function itemListSchema(opts: {
  name: string;
  description: string;
  items: Array<{ name: string; url: string; position?: number }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: opts.name,
    description: opts.description,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, i) => ({
      '@type': 'ListItem',
      position: item.position ?? i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

/** Reusable Article schema for content pages */
export function articleSchema(opts: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  url: string;
  image?: string;
  authorName?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    url: opts.url,
    ...(opts.image && { image: opts.image }),
    author: { '@type': 'Organization', name: opts.authorName || 'AIForEdu' },
    publisher: { '@type': 'Organization', name: 'AIForEdu', url: 'https://aiforedu.ai' },
  };
}
