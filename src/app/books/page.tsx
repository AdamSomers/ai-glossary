import { getGlobalLibrary } from '@/lib/books';
import { BookOpen, Star, Calendar, Users } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default async function BooksPage() {
  const globalLibrary = await getGlobalLibrary();

  if (!globalLibrary) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Library</h1>
            <p className="text-gray-600">Unable to load book library at this time.</p>
          </div>
        </div>
      </div>
    );
  }

  const allBooks = Object.values(globalLibrary.books);
  const totalBooks = allBooks.length;
  const averageRating = allBooks.reduce((sum, book) => sum + book.rating, 0) / totalBooks;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              <BookOpen className="inline-block w-12 h-12 mr-4 text-blue-600" />
              Book Library
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Curated collection of the best books for learning AI and Machine Learning. 
              From beginner-friendly introductions to advanced theoretical treatments.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalBooks}</div>
              <div className="text-sm text-gray-600">Curated Books</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-3">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{Object.keys(globalLibrary.categories).length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(globalLibrary.categories).map(([categoryId, category]) => {
            const categoryBooks = category.books
              .map(bookId => globalLibrary.books[bookId])
              .filter(book => book);

            return (
              <div key={categoryId} className="mb-16">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {category.title}
                  </h2>
                  <p className="text-gray-600">
                    {categoryBooks.length} book{categoryBooks.length !== 1 ? 's' : ''} in this category
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryBooks.map((book) => (
                    <Card key={book.isbn} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                              {book.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              by {book.authors.join(', ')}
                            </p>
                            <div className="flex items-center space-x-2 mb-3">
                              <Badge variant="difficulty" difficulty={book.difficulty}>
                                {book.difficulty}
                              </Badge>
                              <div className="flex items-center text-sm text-gray-500">
                                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                {book.rating}
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="w-4 h-4 mr-1" />
                                {book.publishYear}
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                          {book.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {book.topics.slice(0, 3).map(topic => (
                            <Badge key={topic} className="text-xs">
                              {topic.replace('-', ' ')}
                            </Badge>
                          ))}
                          {book.topics.length > 3 && (
                            <Badge className="text-xs">
                              +{book.topics.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            {book.pages} pages
                          </div>
                          <a
                            href={book.amazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="sm">
                              View Book
                            </Button>
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}