# AI/ML Glossary - Learning Portal

A comprehensive learning portal for AI and Machine Learning concepts, built with Next.js 14, TypeScript, and Tailwind CSS. Features expandable term definitions, curated book recommendations, and intelligent search functionality.

## 🚀 Features

### Core Functionality
- **Progressive Learning**: Brief definitions that expand into detailed explanations
- **Smart Search**: Fuzzy search across terms, definitions, and tags with advanced filtering
- **Book Recommendations**: Per-term and global book library with curated selections
- **Responsive Design**: Mobile-first approach with modern UI components
- **Static Site Generation**: Fast loading with SEO optimization

### Content Management
- **Markdown-based Terms**: Easy content editing with frontmatter metadata
- **Structured Data**: JSON-based book recommendations and external resources
- **Categorization**: Terms organized by difficulty, category, and tags
- **Cross-references**: Related terms and book connections

### User Experience
- **Expandable Cards**: Click to reveal detailed information
- **Multiple Views**: List and grid layouts with sorting options
- **Filter System**: Category, difficulty, and tag-based filtering
- **External Resources**: Curated links to high-quality learning materials

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom components
- **Content**: Markdown with gray-matter for frontmatter
- **Search**: Fuse.js for fuzzy search capabilities
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Vercel-ready configuration

## 📁 Project Structure

```
ai-glossary/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── books/             # Book library page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── layout/            # Layout components
│   │   └── glossary/          # Glossary-specific components
│   └── lib/                   # Utility functions and types
├── content/
│   ├── terms/                 # Markdown files for terms
│   └── books/                 # Book recommendations (JSON)
└── public/                    # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-glossary
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📝 Content Management

### Adding New Terms

Create a new Markdown file in `content/terms/`:

```markdown
---
title: "Your Term"
slug: "your-term"
category: "Fundamentals"
difficulty: "beginner"
tags: ["tag1", "tag2"]
related: ["related-term-1", "related-term-2"]
recommendedBooks: ["book-id-1", "book-id-2"]
lastUpdated: "2025-01-28"
externalLinks:
  - title: "External Resource"
    url: "https://example.com"
    description: "Description"
    type: "tutorial"
    difficulty: "beginner"
---

# Brief Definition
Short, accessible definition for beginners.

# Detailed Explanation
Comprehensive explanation with examples and context.

# Key Concepts
- Concept 1
- Concept 2

# Common Applications
- Application 1
- Application 2

# Prerequisites
- Prerequisite 1
- Prerequisite 2
```

### Adding Book Recommendations

1. **Add to Global Library** (`content/books/global-library.json`)
2. **Create Term-Specific Recommendations** (`content/books/term-books/term-slug.json`)

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/app/globals.css` for global styles
- Component styles use Tailwind utility classes

### Content Categories
- Update categories in term frontmatter
- Modify filtering logic in `src/lib/search.ts`
- Adjust UI components for new categories

## 📊 Current Content

### Terms Included
- Machine Learning (Fundamentals, Beginner)
- Neural Networks (Fundamentals, Intermediate) 
- Deep Learning (Fundamentals, Intermediate)

### Book Library
- 12+ curated books across 4 categories
- Difficulty levels: Beginner to Advanced
- Topics: ML fundamentals, Deep Learning, Specialized areas

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings (auto-detected for Next.js)
3. Deploy with automatic CI/CD

### Other Platforms
- **Netlify**: Configure build command `npm run build`
- **AWS Amplify**: Use Next.js SSG configuration
- **Self-hosted**: Use `npm run build && npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add new terms or improve existing content
4. Submit a pull request

### Content Guidelines
- Keep brief definitions under 2 sentences
- Include practical examples in detailed explanations
- Verify external links are current and high-quality
- Follow consistent formatting and style

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Book recommendations curated from leading AI/ML resources
- External links verified for quality and relevance
- UI design inspired by modern learning platforms

---

Built with ❤️ for the AI/ML learning community