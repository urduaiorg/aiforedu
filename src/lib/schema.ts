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
      'Independent AI research, policy resources, and implementation guidance for K-12 school leadership teams.',
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AIForEdu',
    url: 'https://aiforedu.ai',
    description:
      'Independent tool reviews, policy resources, and implementation guidance for K-12 school leadership teams.',
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
