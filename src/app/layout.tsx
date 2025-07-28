import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI/ML Glossary - Learn Machine Learning & Artificial Intelligence',
  description: 'Comprehensive glossary of AI and Machine Learning terms with detailed explanations, book recommendations, and curated resources for learners at all levels.',
  keywords: 'AI, Machine Learning, Deep Learning, Neural Networks, Artificial Intelligence, Glossary, Learning Resources',
  authors: [{ name: 'AI Glossary Team' }],
  openGraph: {
    title: 'AI/ML Glossary - Learn Machine Learning & Artificial Intelligence',
    description: 'Comprehensive glossary of AI and Machine Learning terms with detailed explanations and curated resources.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI/ML Glossary',
    description: 'Learn AI and Machine Learning with our comprehensive glossary',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}