'use client';

import Link from 'next/link';
import { BookOpen, Brain } from 'lucide-react';

export default function HeroButtons() {
  const scrollToTerms = () => {
    document.getElementById('terms-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button 
        onClick={scrollToTerms}
        className="btn-secondary"
      >
        <Brain className="w-5 h-5 mr-2" />
        Explore Terms
      </button>
      <Link href="/books" className="btn-outline">
        <BookOpen className="w-5 h-5 mr-2" />
        Browse Books
      </Link>
    </div>
  );
}