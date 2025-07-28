import fs from 'fs';
import path from 'path';
import { TermBooks, GlobalLibrary, TermBookRecommendation, GlobalBook } from './types';

const contentDirectory = path.join(process.cwd(), 'content');
const booksDirectory = path.join(contentDirectory, 'books');
const termBooksDirectory = path.join(booksDirectory, 'term-books');

export async function getGlobalLibrary(): Promise<GlobalLibrary | null> {
  try {
    const libraryPath = path.join(booksDirectory, 'global-library.json');
    const fileContents = fs.readFileSync(libraryPath, 'utf8');
    return JSON.parse(fileContents) as GlobalLibrary;
  } catch (error) {
    console.error('Error reading global library:', error);
    return null;
  }
}

export async function getTermBooks(termSlug: string): Promise<TermBooks | null> {
  try {
    const termBooksPath = path.join(termBooksDirectory, `${termSlug}.json`);
    const fileContents = fs.readFileSync(termBooksPath, 'utf8');
    return JSON.parse(fileContents) as TermBooks;
  } catch (error) {
    console.error(`Error reading books for term ${termSlug}:`, error);
    return null;
  }
}

export async function getBooksByIds(
  bookIds: string[],
  globalLibrary?: GlobalLibrary
): Promise<GlobalBook[]> {
  const library = globalLibrary || await getGlobalLibrary();
  if (!library) return [];

  return bookIds
    .map(id => library.books[id])
    .filter((book): book is GlobalBook => book !== undefined);
}

export async function getTermBookRecommendations(
  termSlug: string
): Promise<TermBookRecommendation[]> {
  const termBooks = await getTermBooks(termSlug);
  return termBooks?.books || [];
}

export async function getAllTermBooks(): Promise<Record<string, TermBooks>> {
  try {
    const termBookFiles = fs.readdirSync(termBooksDirectory);
    const allTermBooks: Record<string, TermBooks> = {};

    for (const fileName of termBookFiles) {
      if (fileName.endsWith('.json')) {
        const termSlug = fileName.replace('.json', '');
        const termBooks = await getTermBooks(termSlug);
        if (termBooks) {
          allTermBooks[termSlug] = termBooks;
        }
      }
    }

    return allTermBooks;
  } catch (error) {
    console.error('Error reading all term books:', error);
    return {};
  }
}

export function getBooksByCategory(
  library: GlobalLibrary,
  categoryId: string
): GlobalBook[] {
  const category = library.categories[categoryId];
  if (!category) return [];

  return category.books
    .map(bookId => library.books[bookId])
    .filter((book): book is GlobalBook => book !== undefined);
}

export function getBooksByDifficulty(
  books: GlobalBook[],
  difficulty: string
): GlobalBook[] {
  return books.filter(book => book.difficulty === difficulty);
}

export function getBooksByTopic(
  library: GlobalLibrary,
  topicSlug: string
): GlobalBook[] {
  return Object.values(library.books).filter(book =>
    book.topics.includes(topicSlug)
  );
}

export function sortBooksByRating(books: GlobalBook[]): GlobalBook[] {
  return [...books].sort((a, b) => b.rating - a.rating);
}

export function sortBooksByYear(books: GlobalBook[]): GlobalBook[] {
  return [...books].sort((a, b) => b.publishYear - a.publishYear);
}

export function getTopRatedBooks(
  books: GlobalBook[],
  limit: number = 10
): GlobalBook[] {
  return sortBooksByRating(books).slice(0, limit);
}

export function getRecentBooks(
  books: GlobalBook[],
  limit: number = 10
): GlobalBook[] {
  return sortBooksByYear(books).slice(0, limit);
}

export function searchBooks(
  books: GlobalBook[],
  query: string
): GlobalBook[] {
  const lowercaseQuery = query.toLowerCase();
  return books.filter(book =>
    book.title.toLowerCase().includes(lowercaseQuery) ||
    book.authors.some(author => author.toLowerCase().includes(lowercaseQuery)) ||
    book.description.toLowerCase().includes(lowercaseQuery) ||
    book.topics.some(topic => topic.toLowerCase().includes(lowercaseQuery))
  );
}

export function getBookStatistics(library: GlobalLibrary) {
  const books = Object.values(library.books);
  const totalBooks = books.length;
  const categories = Object.keys(library.categories).length;
  
  const difficultyCount = books.reduce((acc, book) => {
    acc[book.difficulty] = (acc[book.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const averageRating = books.reduce((sum, book) => sum + book.rating, 0) / totalBooks;
  const averagePages = books.reduce((sum, book) => sum + book.pages, 0) / totalBooks;

  return {
    totalBooks,
    categories,
    difficultyCount,
    averageRating: Math.round(averageRating * 10) / 10,
    averagePages: Math.round(averagePages),
  };
}

export async function getRelatedBooks(
  termSlug: string,
  limit: number = 5
): Promise<GlobalBook[]> {
  const library = await getGlobalLibrary();
  if (!library) return [];

  const relatedBooks = getBooksByTopic(library, termSlug);
  return sortBooksByRating(relatedBooks).slice(0, limit);
}