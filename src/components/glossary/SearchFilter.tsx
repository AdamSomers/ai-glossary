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
    <div className="space-y-4">
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
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-3">
          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={filters.difficulty}
            onChange={handleDifficultyChange}
            className="filter-select"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'all' ? 'All Levels' : 
                 difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>

          {/* Advanced Filters Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Tags
          </Button>
        </div>

        {/* Clear Filters & Results Count */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {filteredTerms.length} of {terms.length} terms
          </span>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters - Tags */}
      {showAdvancedFilters && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by Tags</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(({ tag, count }) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ${
                  filters.tags.includes(tag)
                    ? 'bg-primary-100 text-primary-800 border-primary-200'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {tag}
                <span className="ml-1 text-gray-500">({count})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.query && (
            <Badge>
              Search: "{filters.query}"
              <button
                onClick={() => setFilters(prev => ({ ...prev, query: '' }))}
                className="ml-1 hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          
          {filters.category !== 'all' && (
            <Badge variant="category" category={filters.category}>
              {filters.category}
              <button
                onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
                className="ml-1 hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          
          {filters.difficulty !== 'all' && (
            <Badge variant="difficulty" difficulty={filters.difficulty as any}>
              {filters.difficulty}
              <button
                onClick={() => setFilters(prev => ({ ...prev, difficulty: 'all' }))}
                className="ml-1 hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          
          {filters.tags.map(tag => (
            <Badge key={tag}>
              {tag}
              <button
                onClick={() => handleTagToggle(tag)}
                className="ml-1 hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;