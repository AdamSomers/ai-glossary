import { getAllTerms } from '@/lib/content';
import { getGlobalLibrary } from '@/lib/books';
import TermList from '@/components/glossary/TermList';
import SearchFilter from '@/components/glossary/SearchFilter';
import { BookOpen, Brain, Zap, Users } from 'lucide-react';

export default async function HomePage() {
  const terms = await getAllTerms();
  const globalLibrary = await getGlobalLibrary();

  const stats = {
    totalTerms: terms.length,
    totalBooks: globalLibrary ? Object.keys(globalLibrary.books).length : 0,
    categories: [...new Set(terms.map(term => term.category))].length,
    difficulties: ['beginner', 'intermediate', 'advanced'].length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              AI/ML{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Glossary
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Master Machine Learning and Artificial Intelligence with our comprehensive glossary. 
              From beginner-friendly definitions to advanced concepts, plus curated book recommendations.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalTerms}</div>
              <div className="text-sm text-gray-600">Terms</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalBooks}</div>
              <div className="text-sm text-gray-600">Books</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.categories}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-3">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.difficulties}</div>
              <div className="text-sm text-gray-600">Levels</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter */}
          <div className="mb-8">
            <SearchFilter terms={terms} />
          </div>

          {/* Terms List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Explore AI & ML Terms
              </h2>
              <p className="text-gray-600 mt-2">
                Click on any term to expand and learn more. Each term includes detailed explanations, 
                key concepts, applications, and curated book recommendations.
              </p>
            </div>
            
            <TermList terms={terms} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Glossary?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designed for learners at every level, from curious beginners to advanced practitioners.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Progressive Learning
              </h3>
              <p className="text-gray-600">
                Start with simple definitions and expand into detailed explanations. 
                Perfect for building understanding step by step.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Curated Resources
              </h3>
              <p className="text-gray-600">
                Each term comes with hand-picked book recommendations and external resources 
                from authoritative sources in the field.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Smart Search
              </h3>
              <p className="text-gray-600">
                Find exactly what you're looking for with intelligent search, 
                filtering by difficulty, category, and tags.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}