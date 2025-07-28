'use client';

import React, { useState, useEffect } from 'react';
import { Term, SearchFilters } from '@/lib/types';
import { filterTerms, getPopularTags } from '@/lib/search';
import SearchInput from '@/components/ui/SearchInput';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Filter, X } from 'lucide-react';

interface SearchFilterProps {
  terms: Term[];
  onFilteredTerms?: (filteredTerms: Term[]) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ terms, onFilteredTerms }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    difficulty: 'all',
    tags: [],
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filteredTerms, setFilteredTerms] = useState<Term[]>(terms);

  const categories = ['all', ...Array.from(new Set(terms.map(term => term.category)))];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];
  const popularTags = getPopularTags(terms).slice(0, 10);

  useEffect(() => {
    const filtered = filterTerms(terms, filters);
    setFilteredTerms(filtered);
    onFilteredTerms?.(filtered);
  }, [filters, terms, onFilteredTerms]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, query: e.target.value }));
  };

  const handleClearQuery = () => {
    setFilters(prev => ({ ...prev, query: '' }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, category: e.target.value }));
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, difficulty: e.target.value }));
  };

  const handleTagToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      query: '',
      category: 'all',
      difficulty: 'all',
      tags: [],
    });
  };

  const hasActiveFilters = filters.query || filters.category !== 'all' || 
                          filters.difficulty !== 'all' || filters.tags.length > 0;

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <SearchInput
          placeholder="Search terms, definitions, concepts..."
          value={filters.query}
          onChange={handleQueryChange}
          onClear={handleClearQuery}
        />
      </div>

      {/* Filter Controls */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={handleCategoryChange}
                className="filter-select min-w-[140px]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
              <select
                value={filters.difficulty}
                onChange={handleDifficultyChange}
                className="filter-select min-w-[120px]"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Levels' :
                     difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Tags</label>
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                  showAdvancedFilters
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {showAdvancedFilters ? 'Hide Tags' : 'Show Tags'}
              </button>
            </div>
          </div>

          {/* Clear Filters & Results Count */}
          <div className="flex items-center gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-xl border border-blue-200/50">
              <span className="text-sm font-semibold text-gray-700">
                {filteredTerms.length} of {terms.length} terms
              </span>
            </div>
            
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-xl transition-all duration-300 flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters - Tags */}
      {showAdvancedFilters && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200/50 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
            Filter by Tags
          </h3>
          <div className="flex flex-wrap gap-3">
            {popularTags.map(({ tag, count }) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-300 transform hover:scale-105 ${
                  filters.tags.includes(tag)
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg'
                    : 'bg-white/80 text-gray-700 border-gray-200 hover:bg-white hover:border-blue-300 shadow-sm'
                }`}
              >
                {tag}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  filters.tags.includes(tag)
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.query && (
              <div className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-xl text-sm font-medium">
                Search: "{filters.query}"
                <button
                  onClick={() => setFilters(prev => ({ ...prev, query: '' }))}
                  className="ml-2 hover:text-red-600 transition-colors duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {filters.category !== 'all' && (
              <div className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-800 rounded-xl text-sm font-medium">
                {filters.category}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
                  className="ml-2 hover:text-red-600 transition-colors duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {filters.difficulty !== 'all' && (
              <div className="inline-flex items-center px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-sm font-medium">
                {filters.difficulty}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, difficulty: 'all' }))}
                  className="ml-2 hover:text-red-600 transition-colors duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {filters.tags.map(tag => (
              <div key={tag} className="inline-flex items-center px-3 py-1.5 bg-orange-100 text-orange-800 rounded-xl text-sm font-medium">
                {tag}
                <button
                  onClick={() => handleTagToggle(tag)}
                  className="ml-2 hover:text-red-600 transition-colors duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;