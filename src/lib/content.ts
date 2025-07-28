import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Term, TermWithContent, ExternalLink } from './types';

const contentDirectory = path.join(process.cwd(), 'content');
const termsDirectory = path.join(contentDirectory, 'terms');

export async function getAllTerms(): Promise<Term[]> {
  const fileNames = fs.readdirSync(termsDirectory);
  const allTermsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        return getTermBySlug(slug);
      })
  );

  return allTermsData.filter((term): term is Term => term !== null);
}

export async function getTermBySlug(slug: string): Promise<Term | null> {
  try {
    const fullPath = path.join(termsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Process the markdown content
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    // Extract sections from content
    const sections = parseMarkdownSections(content);

    return {
      title: data.title || '',
      slug,
      category: data.category || 'Fundamentals',
      difficulty: data.difficulty || 'beginner',
      tags: data.tags || [],
      related: data.related || [],
      recommendedBooks: data.recommendedBooks || [],
      lastUpdated: data.lastUpdated || new Date().toISOString(),
      briefDefinition: sections.briefDefinition || '',
      detailedExplanation: sections.detailedExplanation || '',
      keyConcepts: sections.keyConcepts || [],
      applications: sections.applications || [],
      prerequisites: sections.prerequisites || [],
      externalLinks: data.externalLinks || [],
    };
  } catch (error) {
    console.error(`Error reading term ${slug}:`, error);
    return null;
  }
}

export async function getTermWithContent(slug: string): Promise<TermWithContent | null> {
  try {
    const fullPath = path.join(termsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Process the markdown content
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    // Extract sections from content
    const sections = parseMarkdownSections(content);

    return {
      title: data.title || '',
      slug,
      category: data.category || 'Fundamentals',
      difficulty: data.difficulty || 'beginner',
      tags: data.tags || [],
      related: data.related || [],
      recommendedBooks: data.recommendedBooks || [],
      lastUpdated: data.lastUpdated || new Date().toISOString(),
      briefDefinition: sections.briefDefinition || '',
      detailedExplanation: sections.detailedExplanation || '',
      keyConcepts: sections.keyConcepts || [],
      applications: sections.applications || [],
      prerequisites: sections.prerequisites || [],
      externalLinks: data.externalLinks || [],
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error reading term with content ${slug}:`, error);
    return null;
  }
}

function parseMarkdownSections(content: string) {
  const sections: {
    briefDefinition: string;
    detailedExplanation: string;
    keyConcepts: string[];
    applications: string[];
    prerequisites: string[];
  } = {
    briefDefinition: '',
    detailedExplanation: '',
    keyConcepts: [],
    applications: [],
    prerequisites: [],
  };

  const lines = content.split('\n');
  let currentSection = '';
  let currentContent: string[] = [];

  for (const line of lines) {
    if (line.startsWith('# Brief Definition')) {
      if (currentSection) {
        processSectionContent(sections, currentSection, currentContent);
      }
      currentSection = 'briefDefinition';
      currentContent = [];
    } else if (line.startsWith('# Detailed Explanation')) {
      if (currentSection) {
        processSectionContent(sections, currentSection, currentContent);
      }
      currentSection = 'detailedExplanation';
      currentContent = [];
    } else if (line.startsWith('# Key Concepts')) {
      if (currentSection) {
        processSectionContent(sections, currentSection, currentContent);
      }
      currentSection = 'keyConcepts';
      currentContent = [];
    } else if (line.startsWith('# Common Applications')) {
      if (currentSection) {
        processSectionContent(sections, currentSection, currentContent);
      }
      currentSection = 'applications';
      currentContent = [];
    } else if (line.startsWith('# Prerequisites')) {
      if (currentSection) {
        processSectionContent(sections, currentSection, currentContent);
      }
      currentSection = 'prerequisites';
      currentContent = [];
    } else if (currentSection && !line.startsWith('#')) {
      currentContent.push(line);
    }
  }

  // Process the last section
  if (currentSection) {
    processSectionContent(sections, currentSection, currentContent);
  }

  return sections;
}

function processSectionContent(
  sections: any,
  sectionName: string,
  content: string[]
) {
  const cleanContent = content.join('\n').trim();

  if (sectionName === 'keyConcepts' || sectionName === 'applications' || sectionName === 'prerequisites') {
    // Extract list items
    const listItems = cleanContent
      .split('\n')
      .filter(line => line.startsWith('- '))
      .map(line => line.substring(2).trim());
    sections[sectionName] = listItems;
  } else {
    sections[sectionName] = cleanContent;
  }
}

export function getTermSlugs(): string[] {
  const fileNames = fs.readdirSync(termsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export async function getRelatedTerms(termSlugs: string[]): Promise<Term[]> {
  const relatedTerms = await Promise.all(
    termSlugs.map(async (slug) => getTermBySlug(slug))
  );
  return relatedTerms.filter((term): term is Term => term !== null);
}

export function getTermsByCategory(terms: Term[]): Record<string, Term[]> {
  return terms.reduce((acc, term) => {
    if (!acc[term.category]) {
      acc[term.category] = [];
    }
    acc[term.category].push(term);
    return acc;
  }, {} as Record<string, Term[]>);
}

export function getTermsByDifficulty(terms: Term[]): Record<string, Term[]> {
  return terms.reduce((acc, term) => {
    if (!acc[term.difficulty]) {
      acc[term.difficulty] = [];
    }
    acc[term.difficulty].push(term);
    return acc;
  }, {} as Record<string, Term[]>);
}