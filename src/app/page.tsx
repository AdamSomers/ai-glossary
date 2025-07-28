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
    categories: Array.from(new Set(terms.map(term => term.category))).length,
    difficulties: ['beginner', 'intermediate', 'advanced'].length,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              Learn AI & ML with Interactive Definitions
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              AI/ML{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Glossary
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
              Master Machine Learning and Artificial Intelligence with our comprehensive glossary. 
              From beginner-friendly definitions to advanced concepts, plus curated book recommendations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn-secondary">
                <Brain className="w-5 h-5 mr-2" />
                Explore Terms
              </button>
              <button className="btn-outline">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Books
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="glass-card p-8 group hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stats.totalTerms}</div>
              <div className="text-white/80 font-medium">AI/ML Terms</div>
            </div>
            
            <div className="glass-card p-8 group hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stats.totalBooks}</div>
              <div className="text-white/80 font-medium">Curated Books</div>
            </div>
            
            <div className="glass-card p-8 group hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stats.categories}</div>
              <div className="text-white/80 font-medium">Categories</div>
            </div>
            
            <div className="glass-card p-8 group hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stats.difficulties}</div>
              <div className="text-white/80 font-medium">Skill Levels</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Explore AI & ML Terms
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Click on any term to expand and learn more. Each term includes detailed explanations, 
                key concepts, applications, and curated book recommendations.
              </p>
            </div>
            <SearchFilter terms={terms} />
          </div>

          {/* Terms List */}
          <div className="card overflow-hidden">
            <TermList terms={terms} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Why Choose Our{' '}
              <span className="gradient-text">Glossary?</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Designed for learners at every level, from curious beginners to advanced practitioners.
              Experience the future of AI/ML education.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center group hover:bg-white/10 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Progressive Learning
              </h3>
              <p className="text-white/80 leading-relaxed">
                Start with simple definitions and expand into detailed explanations. 
                Perfect for building understanding step by step with interactive content.
              </p>
            </div>

            <div className="glass-card p-8 text-center group hover:bg-white/10 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Curated Resources
              </h3>
              <p className="text-white/80 leading-relaxed">
                Each term comes with hand-picked book recommendations and external resources 
                from authoritative sources in the field, carefully vetted by experts.
              </p>
            </div>

            <div className="glass-card p-8 text-center group hover:bg-white/10 transition-all duration-300">
              <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Smart Search
              </h3>
              <p className="text-white/80 leading-relaxed">
                Find exactly what you're looking for with intelligent search, 
                filtering by difficulty, category, and tags. Powered by advanced algorithms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}