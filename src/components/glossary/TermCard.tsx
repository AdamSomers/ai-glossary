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
    <Card className="overflow-hidden">
      {/* Header - Always Visible */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {term.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
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
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 flex-shrink-0"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Brief Definition - Always Visible */}
        <p className="text-gray-700 leading-relaxed">
          {term.briefDefinition}
        </p>

        {/* Expand/Collapse Button */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {readingTime} min read
            </div>
            <div>
              Updated {formatDate(term.lastUpdated)}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Learn More'}
          </Button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="p-6 space-y-6">
            {/* Detailed Explanation */}
            {term.detailedExplanation && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Detailed Explanation
                </h4>
                <div className="prose-custom">
                  <p>{term.detailedExplanation}</p>
                </div>
              </div>
            )}

            {/* Key Concepts */}
            {term.keyConcepts.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Key Concepts
                </h4>
                <ul className="space-y-2">
                  {term.keyConcepts.map((concept, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Applications */}
            {term.applications.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Common Applications
                </h4>
                <ul className="space-y-2">
                  {term.applications.map((application, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{application}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prerequisites */}
            {term.prerequisites.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Prerequisites
                </h4>
                <ul className="space-y-2">
                  {term.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{prerequisite}</span>
                    </li>
                  ))}
                </ul>
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
    </Card>
  );
};

export default TermCard;