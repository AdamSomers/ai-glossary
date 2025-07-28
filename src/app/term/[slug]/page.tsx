import { notFound } from 'next/navigation';
import { getTermBySlug, getAllTerms } from '@/lib/content';
import { getBooksByIds } from '@/lib/books';
import TermCard from '@/components/glossary/TermCard';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface TermPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const terms = await getAllTerms();
  return terms.map((term) => ({
    slug: term.slug,
  }));
}

export async function generateMetadata({ params }: TermPageProps) {
  const term = await getTermBySlug(params.slug);
  
  if (!term) {
    return {
      title: 'Term Not Found',
    };
  }

  return {
    title: `${term.title} - AI Glossary`,
    description: term.briefDefinition,
  };
}

export default async function TermPage({ params }: TermPageProps) {
  const term = await getTermBySlug(params.slug);
  
  if (!term) {
    notFound();
  }

  const termBooks = await getBooksByIds(term.recommendedBooks);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Glossary
            </Button>
          </Link>
        </div>

        {/* Term Details */}
        <div className="max-w-4xl mx-auto">
          <TermCard term={term} showBookRecommendations={false} />
          
          {/* Book Recommendations Section */}
          {termBooks.length > 0 && (
            <div className="mt-8">
              <Card>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
                    Recommended Books for {term.title}
                  </h2>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    {termBooks.map((book) => (
                      <div key={book.isbn} className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl p-6 border border-blue-100 hover:border-blue-200 transition-colors duration-200">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-8 h-8 text-blue-600" />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-2 leading-tight">
                              {book.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              by {book.authors.join(', ')}
                            </p>
                            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                              {book.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge variant="difficulty" difficulty={book.difficulty}>
                                {book.difficulty}
                              </Badge>
                              <Badge>
                                {book.pages} pages
                              </Badge>
                              <Badge>
                                {book.publishYear}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-gray-600">
                                <span className="text-yellow-500 mr-1">★</span>
                                {book.rating}/5
                              </div>
                              
                              <a
                                href={book.amazonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                              >
                                View on Amazon →
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Link href="/books">
                      <Button>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Browse All Books
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}