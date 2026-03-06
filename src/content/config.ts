import { defineCollection, z } from 'astro:content';

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['writing', 'grading', 'lesson-planning', 'admin', 'student-facing', 'special-ed', 'analytics']),
    pricing: z.enum(['free', 'freemium', 'paid']),
    priceRange: z.string().optional(),
    rating: z.number().min(1).max(5),
    ferpaCompliant: z.boolean(),
    coppaCompliant: z.boolean(),
    gradeLevel: z.array(z.string()),
    bestFor: z.string(),
    website: z.string().url(),
    affiliate: z.object({ url: z.string().url(), slug: z.string() }).optional(),
    lastReviewed: z.date(),
    publishDate: z.date(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    reviewedBy: z.string(),
    reviewFrameworkVersion: z.string().default('v1'),
    evidenceLevel: z.enum(['vendor-stated', 'document-reviewed', 'operationally-observed']),
    verificationNotes: z.array(z.string()).min(1),
    rubric: z.object({
      privacy: z.number().min(1).max(5),
      instructionalValue: z.number().min(1).max(5),
      implementation: z.number().min(1).max(5),
      transparency: z.number().min(1).max(5),
    }),
  }),
});

const comparisons = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tools: z.array(z.string()),
    category: z.string(),
    publishDate: z.date(),
    lastUpdated: z.date(),
  }),
});

const policies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['template', 'guide', 'framework', 'checklist']),
    audience: z.array(z.string()),
    publishDate: z.date(),
    lastUpdated: z.date(),
    downloadable: z.boolean().default(false),
    gated: z.boolean().default(false),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    readTime: z.number(),
    publishDate: z.date(),
    lastUpdated: z.date(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { tools, comparisons, policies, guides };
