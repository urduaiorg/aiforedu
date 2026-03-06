export interface Author {
    name: string;
    slug: string;
    role: string;
    credential: string;
    bio: string;
}

export const authors: Record<string, Author> = {
    'editorial-desk': {
        name: 'Qaisar Roonjha',
        slug: 'editorial-desk',
        role: 'Founding Editor',
        credential: 'Education Technology & Policy',
        bio: 'Leads AIForEdu\'s editorial research on AI tools, policy, and implementation for educators and institutions worldwide. Background in education technology strategy and digital equity.',
    },
    'policy-desk': {
        name: 'AIForEdu Policy Desk',
        slug: 'policy-desk',
        role: 'Policy & Governance',
        credential: 'K-12 AI Governance & Compliance',
        bio: 'Covers AI privacy, academic integrity, family communication, and the governance decisions schools, universities, and education systems must make.',
    },
} as const;

export function getAuthor(slug: string): Author {
    return authors[slug] || authors['editorial-desk'];
}
