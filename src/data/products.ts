export interface ProductDefinition {
  slug: 'policy-kit' | 'readiness-workbook' | 'tool-vetting-pack';
  title: string;
  shortLabel: string;
  price: string;
  badge?: string;
  featured?: boolean;
  description: string;
  audience: string;
  promise: string;
  checkoutUrl: string;
  features: string[];
  deliverables: string[];
  outcomes: string[];
  preview: string[];
  delivery: string;
  format: string;
  license: string;
  faq: Array<{ question: string; answer: string }>;
}

export const products: ProductDefinition[] = [
  {
    slug: 'policy-kit',
    title: 'AI Policy Kit',
    shortLabel: 'Policy kit',
    price: '$29',
    badge: 'Best Seller',
    featured: true,
    description: 'A governance-ready policy bundle for school and district teams moving from discussion to formal adoption.',
    audience: 'Best for leadership teams building board-ready policy language and parent/staff communication.',
    promise: 'Move from rough policy ideas to a usable board-facing working set in one sprint.',
    checkoutUrl: 'https://aiforedu.lemonsqueezy.com/checkout/policy-kit',
    features: [
      '5 editable policy templates',
      'Board presentation deck',
      'Parent communication guide',
      'Staff training checklist',
      'FERPA/COPPA compliance matrix',
    ],
    deliverables: [
      'Acceptable use template',
      'Academic integrity policy template',
      'Staff guidance draft',
      'Parent notification language',
      'Board presentation narrative',
    ],
    outcomes: [
      'Faster board and cabinet alignment',
      'More consistent district messaging',
      'Reduced policy drafting time',
    ],
    preview: [
      'A board-facing narrative outline that frames why policy action is needed now',
      'Editable parent communication language for introducing school AI expectations',
      'A compliance matrix that helps teams separate policy language from legal review questions',
    ],
    delivery: 'Delivered immediately after checkout as a digital resource bundle.',
    format: 'Editable documents, planning materials, and board-facing working files.',
    license: 'Intended for internal school or district use and adaptation.',
    faq: [
      {
        question: 'Who is this for?',
        answer: 'This kit is built for superintendents, principals, district innovation leads, and governance teams preparing formal AI policy.',
      },
      {
        question: 'Is this legal advice?',
        answer: 'No. It is a structured starting point that should be reviewed by your own legal counsel and district stakeholders before adoption.',
      },
    ],
  },
  {
    slug: 'readiness-workbook',
    title: 'AI Readiness Workbook',
    shortLabel: 'Readiness workbook',
    price: '$19',
    description: 'A practical working set for teams assessing whether their school or district is operationally ready for AI rollout.',
    audience: 'Best for leaders who need an implementation plan before they choose vendors or formalize policy.',
    promise: 'Turn vague AI ambition into a concrete 90-day readiness plan with clearer ownership and sequencing.',
    checkoutUrl: 'https://aiforedu.lemonsqueezy.com/checkout/readiness-workbook',
    features: [
      'Infrastructure audit checklist',
      '90-day implementation timeline',
      'Budget planning worksheet',
      'Stakeholder survey templates',
      'Progress tracking dashboard',
      'Professional development session outlines',
    ],
    deliverables: [
      'Readiness scoring worksheet',
      'Implementation roadmap template',
      'Budget and staffing prompts',
      'Stakeholder communication prompts',
    ],
    outcomes: [
      'Clearer rollout sequencing',
      'More realistic implementation scope',
      'Fewer surprises during adoption planning',
    ],
    preview: [
      'A readiness scoring sheet that makes weak spots visible before procurement',
      'A 90-day sequencing template for ownership, milestones, and dependencies',
      'Stakeholder prompts for principals, cabinet, and instructional teams',
    ],
    delivery: 'Delivered immediately after checkout as a digital workbook and planning set.',
    format: 'Editable worksheets, checklists, and planning templates.',
    license: 'Intended for internal school or district planning use.',
    faq: [
      {
        question: 'When should I use this workbook?',
        answer: 'Use it when your team is beyond casual exploration and needs a structured readiness baseline before procurement or policy finalization.',
      },
      {
        question: 'Does it include board materials?',
        answer: 'No. This product focuses on operational readiness. The AI Policy Kit is the stronger choice for board-facing policy work.',
      },
    ],
  },
  {
    slug: 'tool-vetting-pack',
    title: 'Tool Vetting Pack',
    shortLabel: 'Vetting pack',
    price: '$39',
    badge: 'Most Comprehensive',
    description: 'A procurement-oriented evaluation system for teams comparing AI vendors, documenting risk, and building approval recommendations.',
    audience: 'Best for district teams evaluating tools for pilot approval, procurement review, or formal recommendation.',
    promise: 'Replace ad hoc vendor review with a more defensible evaluation workflow and cleaner decision trail.',
    checkoutUrl: 'https://aiforedu.lemonsqueezy.com/checkout/tool-vetting-pack',
    features: [
      'Vendor evaluation rubric',
      'Security questionnaire template',
      'Pilot program framework',
      'Tool profile tracker',
      'Comparison spreadsheet',
      'Board recommendation template',
    ],
    deliverables: [
      'Vendor review scorecard',
      'Approval workflow prompts',
      'Pilot observation template',
      'Recommendation memo structure',
    ],
    outcomes: [
      'Stronger procurement defensibility',
      'Cleaner vendor comparison process',
      'Better board and cabinet communication',
    ],
    preview: [
      'A side-by-side tool scorecard for vendor review meetings',
      'A security and privacy question bank for procurement conversations',
      'A recommendation memo structure for turning pilot notes into approval guidance',
    ],
    delivery: 'Delivered immediately after checkout as a digital evaluation toolkit.',
    format: 'Editable scorecards, spreadsheets, questionnaires, and memo templates.',
    license: 'Intended for internal school or district evaluation use.',
    faq: [
      {
        question: 'Is this only for IT teams?',
        answer: 'No. It is meant for cross-functional evaluation teams including curriculum, instruction, IT, privacy, and school leadership.',
      },
      {
        question: 'Does it replace legal or security review?',
        answer: 'No. It supports those processes by creating a clearer intake and evaluation framework, but it does not replace formal legal or security review.',
      },
    ],
  },
];

export const productsBySlug = Object.fromEntries(
  products.map((product) => [product.slug, product])
) as Record<ProductDefinition['slug'], ProductDefinition>;
