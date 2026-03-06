export const editorialDesks = [
  {
    title: 'Editorial research desk',
    summary:
      'Maps the AI vendor landscape, reviews product documentation, and translates product claims into language that educators and institutions can actually use.',
  },
  {
    title: 'Policy and governance desk',
    summary:
      'Focuses on privacy, academic integrity, family communication, and the governance decisions schools, universities, and education systems actually have to make.',
  },
  {
    title: 'Implementation and adoption desk',
    summary:
      'Evaluates rollout friction, training burden, workflow fit, and the practical questions teams ask before they formalize AI use.',
  },
] as const;

export const editorialSignals = [
  'Dated reviews with explicit evidence levels',
  'Public methodology and affiliate disclosure',
  'Resources written for educators and institutions, not vendors',
  'A content-first library designed to earn trust before monetization',
] as const;

export const readerQuestions = [
  'Is this tool safe enough for student use?',
  'What should we ask before approving AI use in our institution?',
  'How do we brief boards, families, or academic leaders without overselling AI?',
  'What can a small school, university, or nonprofit do first without creating chaos?',
  'Which AI tools work well when budgets, bandwidth, or infrastructure are limited?',
] as const;
