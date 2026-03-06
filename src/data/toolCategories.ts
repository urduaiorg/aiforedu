export const toolCategoryMeta = {
  writing: {
    label: 'Writing and feedback',
    shortLabel: 'Writing',
    description:
      'Tools that help teachers or students draft, revise, coach, and improve written work.',
    audienceQuestion: 'Which tools actually improve writing quality without removing teacher judgment?',
  },
  grading: {
    label: 'Grading and assessment',
    shortLabel: 'Grading',
    description:
      'Tools that streamline rubric use, feedback cycles, quiz creation, and assessment workflows.',
    audienceQuestion: 'Which tools save time in assessment without creating integrity or quality problems?',
  },
  'lesson-planning': {
    label: 'Lesson planning',
    shortLabel: 'Planning',
    description:
      'Tools that generate lesson ideas, adapt materials, and reduce planning load for classroom teams.',
    audienceQuestion: 'Which planning tools are good enough for classroom use and responsible enough for district rollout?',
  },
  admin: {
    label: 'Administration and operations',
    shortLabel: 'Administration',
    description:
      'Tools for email drafting, meeting prep, communication, operations, and leader workflow support.',
    audienceQuestion: 'Which AI tools help school operations without creating governance headaches?',
  },
  'student-facing': {
    label: 'Student-facing tools',
    shortLabel: 'Student-facing',
    description:
      'Tools that place AI directly in front of students or shape how students interact with AI systems.',
    audienceQuestion: 'Which student-facing tools are usable in school while preserving safety, visibility, and control?',
  },
  'special-ed': {
    label: 'Special education',
    shortLabel: 'Special ed',
    description:
      'Tools that support accessibility, differentiation, and individualized planning for diverse learner needs.',
    audienceQuestion: 'Which AI tools are actually helpful for diverse learners rather than just broadly marketed as support?',
  },
  analytics: {
    label: 'Analytics and insight',
    shortLabel: 'Analytics',
    description:
      'Tools that surface patterns, dashboards, or implementation signals for leadership and program evaluation.',
    audienceQuestion: 'Which tools give leadership teams meaningful AI-related insight instead of vanity dashboards?',
  },
} as const;

export type ToolCategorySlug = keyof typeof toolCategoryMeta;

export const toolCategoryOrder = Object.keys(toolCategoryMeta) as ToolCategorySlug[];
