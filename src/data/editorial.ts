export const editorialDesks = [
  {
    title: 'Editorial research desk',
    summary:
      'Maps the AI vendor landscape, reviews product documentation, and translates product claims into leadership-relevant language.',
  },
  {
    title: 'Policy and governance desk',
    summary:
      'Focuses on privacy, board communication, parent-facing implications, and the governance decisions schools actually have to make.',
  },
  {
    title: 'Implementation and procurement desk',
    summary:
      'Evaluates rollout friction, training burden, workflow fit, and the practical questions teams ask before approving a pilot.',
  },
] as const;

export const editorialSignals = [
  'Dated reviews with explicit evidence levels',
  'Public methodology and affiliate disclosure',
  'Resources written for district and school leadership teams',
  'Commercial products separated from editorial guidance',
] as const;

export const readerQuestions = [
  'Is this tool safe enough for student use?',
  'What should we ask before approving a pilot?',
  'How do we brief boards and families without overselling AI?',
  'What can a small school or district do first without creating chaos?',
] as const;

export const productAssurances = [
  'Immediate digital delivery after checkout',
  'Editable working documents for internal adaptation',
  'Designed for school and district planning conversations',
  'Commercial resources do not replace legal review or district policy approval',
] as const;
