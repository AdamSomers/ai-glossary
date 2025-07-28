'use client';

import React, { useState, useMemo } from 'react';
import { Term } from '@/lib/types';
import TermCard from './TermCard';
import SearchFilter from './SearchFilter';
import { filterTerms } from '@/lib/search';
import { groupBy } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Grid, List, SortAsc, SortDesc } from 'lucide-react';

interface TermListProps {
  terms: Term[];
  showSearch?: boolean;
  showGrouping?: boolean;
  defaultView?: 'list' | 'grid';
}

type SortOption = 'alphabetical' | 'difficulty' | 'category' | 'updated';
type SortDirection = 'asc' | 'desc';

const TermList: React.FC<TermListProps> = ({ 
  terms, 
  showSearch = true, 
  showGrouping = true,
  defaultView = 'list'
}) => {
  const [filteredTerms, setFilteredTerms] = useState<Term[]>(terms);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(defaultView);
  const [sortBy, setSortBy] = useState<SortOption>('alphabetical');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [groupBy, setGroupBy] = useState<'none' | 'category' | 'difficulty'>('none');

  const sortedTerms = useMemo(() => {
    const sorted = [...filteredTerms].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'alphabetical':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'difficulty':
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
          comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'updated':
          comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }, [filteredTerms, sortBy, sortDirection]);

  const groupedTerms = useMemo(() => {
    if (groupBy === 'none') {
      return { 'All Terms': sortedTerms };
    }
    
    return sortedTerms.reduce((groups, term) => {
      const key = groupBy === 'category' ? term.category : term.difficulty;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(term);
      return groups;
    }, {} as Record<string, Term[]>);
  }, [sortedTerms, groupBy]);

  const handleSortChange = (newSortBy: SortOption) => {
    if (sortBy === newSortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (option: SortOption) => {
    if (sortBy !== option) return null;
    return sortDirection === 'asc' ? 
      <SortAsc className="w-4 h-4 ml-1" /> : 
      <SortDesc className="w-4 h-4 ml-1" />;
  };

  if (terms.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No terms found</div>
        <div className="text-gray-400">Try adjusting your search or filters</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      {showSearch && (
        <SearchFilter 
          terms={terms} 
          onFilteredTerms={setFilteredTerms}
        />
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gray-50 p-4 rounded-lg">
        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">View:</span>
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-sm flex items-center ${
                viewMode === 'list' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <List className="w-4 h-4 mr-1" />
              List
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 text-sm flex items-center border-l border-gray-300 ${
                viewMode === 'grid' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Grid className="w-4 h-4 mr-1" />
              Grid
            </button>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <button
            onClick={() => handleSortChange('alphabetical')}
            className={`px-3 py-1 text-sm rounded flex items-center ${
              sortBy === 'alphabetical' 
                ? 'bg-primary-100 text-primary-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Name
            {getSortIcon('alphabetical')}
          </button>
          <button
            onClick={() => handleSortChange('difficulty')}
            className={`px-3 py-1 text-sm rounded flex items-center ${
              sortBy === 'difficulty' 
                ? 'bg-primary-100 text-primary-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Difficulty
            {getSortIcon('difficulty')}
          </button>
          <button
            onClick={() => handleSortChange('category')}
            className={`px-3 py-1 text-sm rounded flex items-center ${
              sortBy === 'category' 
                ? 'bg-primary-100 text-primary-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Category
            {getSortIcon('category')}
          </button>
          <button
            onClick={() => handleSortChange('updated')}
            className={`px-3 py-1 text-sm rounded flex items-center ${
              sortBy === 'updated' 
                ? 'bg-primary-100 text-primary-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Updated
            {getSortIcon('updated')}
          </button>
        </div>

        {/* Group By */}
        {showGrouping && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Group by:</span>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value as any)}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value="none">None</option>
              <option value="category">Category</option>
              <option value="difficulty">Difficulty</option>
            </select>
          </div>
        )}
      </div>

      {/* Terms Display */}
      <div className="space-y-8">
        {Object.entries(groupedTerms).map(([groupName, groupTerms]) => (
          <div key={groupName}>
            {groupBy !== 'none' && (
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {groupName} ({groupTerms.length})
              </h2>
            )}
            
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 lg:grid-cols-2 gap-6'
                : 'space-y-4'
            }>
              {groupTerms.map((term) => (
                <TermCard 
                  key={term.slug} 
                  term={term}
                  showBookRecommendations={true}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTerms.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No terms match your filters</div>
          <div className="text-gray-400">Try adjusting your search criteria</div>
        </div>
      )}
    </div>
  );
};

export default TermList;