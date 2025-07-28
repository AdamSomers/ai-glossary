import Fuse from 'fuse.js';
import { Term, GlobalBook, SearchFilters } from './types';

// Fuse.js options for term search
const termSearchOptions = {
  keys: [
    { name: 'title', weight: 0.3 },
    { name: 'briefDefinition', weight: 0.25 },
    { name: 'detailedExplanation', weight: 0.2 },
    { name: 'tags', weight: 0.15 },
    { name: 'keyConcepts', weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
};

// Fuse.js options for book search
const bookSearchOptions = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'authors', weight: 0.3 },
    { name: 'description', weight: 0.2 },
    { name: 'topics', weight: 0.1 },
  ],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true,
};

export class TermSearchEngine {
  private fuse: Fuse<Term>;

  constructor(terms: Term[]) {
    this.fuse = new Fuse(terms, termSearchOptions);
  }

  search(query: string): Term[] {
    if (!query.trim()) return [];
    
    const results = this.fuse.search(query);
    return results.map(result => result.item);
  }

  searchWithScore(query: string): Array<{ item: Term; score: number }> {
    if (!query.trim()) return [];
    
    const results = this.fuse.search(query);
    return results.map(result => ({
      item: result.item,
      score: result.score || 0,
    }));
  }
}

export class BookSearchEngine {
  private fuse: Fuse<GlobalBook>;

  constructor(books: GlobalBook[]) {
    this.fuse = new Fuse(books, bookSearchOptions);
  }

  search(query: string): GlobalBook[] {
    if (!query.trim()) return [];
    
    const results = this.fuse.search(query);
    return results.map(result => result.item);
  }

  searchWithScore(query: string): Array<{ item: GlobalBook; score: number }> {
    if (!query.trim()) return [];
    
    const results = this.fuse.search(query);
    return results.map(result => ({
      item: result.item,
      score: result.score || 0,
    }));
  }
}

export function filterTerms(terms: Term[], filters: SearchFilters): Term[] {
  let filteredTerms = [...terms];

  // Filter by search query
  if (filters.query.trim()) {
    const searchEngine = new TermSearchEngine(filteredTerms);
    filteredTerms = searchEngine.search(filters.query);
  }

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filteredTerms = filteredTerms.filter(
      term => term.category.toLowerCase() === filters.category.toLowerCase()
    );
  }

  // Filter by difficulty
  if (filters.difficulty && filters.difficulty !== 'all') {
    filteredTerms = filteredTerms.filter(
      term => term.difficulty === filters.difficulty
    );
  }

  // Filter by tags
  if (filters.tags.length > 0) {
    filteredTerms = filteredTerms.filter(term =>
      filters.tags.some(tag => term.tags.includes(tag))
    );
  }

  return filteredTerms;
}

export function filterBooks(
  books: GlobalBook[],
  query: string,
  difficulty?: string,
  topics?: string[]
): GlobalBook[] {
  let filteredBooks = [...books];

  // Filter by search query
  if (query.trim()) {
    const searchEngine = new BookSearchEngine(filteredBooks);
    filteredBooks = searchEngine.search(query);
  }

  // Filter by difficulty
  if (difficulty && difficulty !== 'all') {
    filteredBooks = filteredBooks.filter(book => book.difficulty === difficulty);
  }

  // Filter by topics
  if (topics && topics.length > 0) {
    filteredBooks = filteredBooks.filter(book =>
      topics.some(topic => book.topics.includes(topic))
    );
  }

  return filteredBooks;
}

export function getSearchSuggestions(terms: Term[], query: string): string[] {
  if (!query.trim()) return [];

  const suggestions = new Set<string>();
  const lowercaseQuery = query.toLowerCase();

  // Add matching titles
  terms.forEach(term => {
    if (term.title.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(term.title);
    }
  });

  // Add matching tags
  terms.forEach(term => {
    term.tags.forEach(tag => {
      if (tag.toLowerCase().includes(lowercaseQuery)) {
        suggestions.add(tag);
      }
    });
  });

  // Add matching key concepts
  terms.forEach(term => {
    term.keyConcepts.forEach(concept => {
      if (concept.toLowerCase().includes(lowercaseQuery)) {
        suggestions.add(concept);
      }
    });
  });

  return Array.from(suggestions).slice(0, 8);
}

export function getPopularTags(terms: Term[]): Array<{ tag: string; count: number }> {
  const tagCounts = new Map<string, number>();

  terms.forEach(term => {
    term.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRelatedSearchTerms(
  terms: Term[],
  currentTerm: Term
): string[] {
  const relatedTerms = new Set<string>();

  // Add related term titles
  currentTerm.related.forEach(relatedSlug => {
    const relatedTerm = terms.find(term => term.slug === relatedSlug);
    if (relatedTerm) {
      relatedTerms.add(relatedTerm.title);
    }
  });

  // Add terms with similar tags
  const currentTags = new Set(currentTerm.tags);
  terms.forEach(term => {
    if (term.slug !== currentTerm.slug) {
      const commonTags = term.tags.filter(tag => currentTags.has(tag));
      if (commonTags.length >= 2) {
        relatedTerms.add(term.title);
      }
    }
  });

  return Array.from(relatedTerms).slice(0, 6);
}

export function highlightSearchMatches(text: string, query: string): string {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}