'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Term } from '@/lib/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronDown, ChevronUp, ExternalLink, BookOpen, Clock } from 'lucide-react';
import { formatDate, getReadingTime } from '@/lib/utils';

interface TermCardProps {
  term: Term;
  showBookRecommendations?: boolean;
}

const TermCard: React.FC<TermCardProps> = ({ term, showBookRecommendations = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const readingTime = getReadingTime(term.detailedExplanation);

  return (
    <div className="card-hover group">
      {/* Header - Always Visible */}
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
              {term.title}
            </h3>
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant="difficulty" difficulty={term.difficulty}>
                {term.difficulty}
              </Badge>
              <Badge variant="category" category={term.category}>
                {term.category}
              </Badge>
              {term.tags.slice(0, 3).map(tag => (
                <Badge key={tag}>
                  {tag}
                </Badge>
              ))}
              {term.tags.length > 3 && (
                <Badge>
                  +{term.tags.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-6 flex-shrink-0 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isExpanded ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <ChevronDown className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Brief Definition - Always Visible */}
        <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
          {term.briefDefinition}
        </p>

        {/* Expand/Collapse Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 space-x-6">
            <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
              <Clock className="w-4 h-4 mr-2" />
              {readingTime} min read
            </div>
            <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
              Updated {formatDate(term.lastUpdated)}
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-50 hover:to-purple-50 text-gray-700 hover:text-blue-600 font-semibold rounded-xl transition-all duration-300 border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-md"
          >
            {isExpanded ? 'Show Less' : 'Learn More'}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200/50 bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="p-8 space-y-8">
            {/* Detailed Explanation */}
            {term.detailedExplanation && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
                  Detailed Explanation
                </h4>
                <div className="prose-custom">
                  <p className="text-gray-700 leading-relaxed">{term.detailedExplanation}</p>
                </div>
              </div>
            )}

            {/* Key Concepts */}
            {term.keyConcepts.length > 0 && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full mr-3"></div>
                  Key Concepts
                </h4>
                <div className="grid gap-3">
                  {term.keyConcepts.map((concept, index) => (
                    <div key={index} className="flex items-start p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                      <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full mt-1.5 mr-4 flex-shrink-0 shadow-sm"></div>
                      <span className="text-gray-800 font-medium">{concept}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applications */}
            {term.applications.length > 0 && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></div>
                  Common Applications
                </h4>
                <div className="grid gap-3">
                  {term.applications.map((application, index) => (
                    <div key={index} className="flex items-start p-4 bg-purple-50/50 rounded-xl border border-purple-100">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full mt-1.5 mr-4 flex-shrink-0 shadow-sm"></div>
                      <span className="text-gray-800 font-medium">{application}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prerequisites */}
            {term.prerequisites.length > 0 && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></div>
                  Prerequisites
                </h4>
                <div className="grid gap-3">
                  {term.prerequisites.map((prerequisite, index) => (
                    <div key={index} className="flex items-start p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mt-1.5 mr-4 flex-shrink-0 shadow-sm"></div>
                      <span className="text-gray-800 font-medium">{prerequisite}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* External Links */}
            {term.externalLinks.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  External Resources
                </h4>
                <div className="grid gap-3">
                  {term.externalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{link.title}</div>
                        <div className="text-sm text-gray-600">{link.description}</div>
                        <div className="flex items-center mt-1 space-x-2">
                          <Badge>{link.type}</Badge>
                          <Badge variant="difficulty" difficulty={link.difficulty}>
                            {link.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Book Recommendations */}
            {showBookRecommendations && term.recommendedBooks.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Recommended Books
                </h4>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-blue-800 text-sm mb-2">
                    {term.recommendedBooks.length} curated book{term.recommendedBooks.length !== 1 ? 's' : ''} for this topic
                  </p>
                  <Link href={`/term/${term.slug}`}>
                    <Button size="sm">
                      View Book Recommendations
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Related Terms */}
            {term.related.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Related Terms
                </h4>
                <div className="flex flex-wrap gap-2">
                  {term.related.map(relatedSlug => (
                    <Link key={relatedSlug} href={`/term/${relatedSlug}`}>
                      <Badge className="hover:bg-primary-100 cursor-pointer transition-colors duration-200">
                        {relatedSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TermCard;