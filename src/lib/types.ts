export interface Term {
  title: string;
  slug: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  related: string[];
  recommendedBooks: string[]; // Book IDs
  lastUpdated: string;
  briefDefinition: string;
  detailedExplanation: string;
  keyConcepts: string[];
  applications: string[];
  prerequisites: string[];
  externalLinks: ExternalLink[];
}

export interface ExternalLink {
  title: string;
  url: string;
  description: string;
  type: 'article' | 'tutorial' | 'video' | 'course' | 'documentation' | 'research';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface TermBookRecommendation {
  id: string;
  title: string;
  authors: string[];
  isbn: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  relevanceScore: number; // 1-10
  specificChapters: string[];
  whyRecommended: string;
  amazonLink: string;
  rating: number;
  coverImage: string;
}

export interface TermBooks {
  termSlug: string;
  books: TermBookRecommendation[];
}

export interface GlobalBook {
  title: string;
  authors: string[];
  isbn: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[]; // Related term slugs
  amazonLink: string;
  rating: number;
  coverImage: string;
  publishYear: number;
  pages: number;
}

export interface BookCategory {
  title: string;
  books: string[]; // Book IDs
}

export interface GlobalLibrary {
  categories: Record<string, BookCategory>;
  books: Record<string, GlobalBook>;
}

export interface SearchFilters {
  query: string;
  category: string;
  difficulty: string;
  tags: string[];
}

export interface TermWithContent extends Term {
  content: string;
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type CategoryType = 'Fundamentals' | 'Algorithms' | 'Applications' | 'Theory' | 'Tools';