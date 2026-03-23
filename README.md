# Martim Mendes Portfolio

A developer portfolio website showcasing projects, skills, and experience. Built with React, TypeScript, and Tailwind CSS, deployed on Cloudflare Workers.

## Features

- **IDE-like interface** - Editor-inspired UI with file tree navigation
- **Dynamic project showcase** - Fetches and displays GitHub repositories in real-time
- **Interactive animations** - Perlin noise wave background with mouse interaction
- **Responsive design** - Works seamlessly on desktop and mobile
- **Accessible** - Skip links, keyboard navigation, reduced motion support
- **Contact form** - Cloudflare Worker proxy to Formspree

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Backend**: Cloudflare Workers (serverless)
- **Deployment**: Cloudflare Workers with Assets
- **Testing**: Vitest, React Testing Library
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/MartimMendesIPL/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

| Variable            | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| `VITE_GITHUB_TOKEN` | GitHub personal access token for increased API rate limit (optional) |

### Building

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Testing

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Project Structure

```
src/
├── components/          # React components
│   ├── about/          # About section components
│   ├── contact/        # Contact section components
│   └── projects/       # Projects section components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and constants
│   ├── constants.ts    # Magic numbers and config values
│   ├── github-api.ts   # GitHub API utilities with Zod validation
│   └── icons.ts        # Icon mapping
├── worker.ts           # Cloudflare Worker handler
└── test/               # Test setup and utilities

public/                 # Static assets (favicon, sitemap, robots.txt)
```

## Deployment

### Cloudflare Workers

```bash
# Deploy to Cloudflare Workers
npm run deploy
```

This deploys the Worker (handles `/contact` endpoint) and serves static assets.

### Custom Domain

The site uses `martimmendes.dev` as the custom domain. Configure in Cloudflare Dashboard under Workers & Pages → portfolio → Custom Domains.

## SEO Setup

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain (`martimmendes.dev`)
3. Verify ownership (usually automatic via Cloudflare)
4. Submit your sitemap at `https://martimmendes.dev/sitemap.xml`

### Sitemap

The site includes an auto-generated sitemap at `/sitemap.xml` listing the main pages for search engines to crawl.

### Robots.txt

Included at `/robots.txt` to guide search engine crawlers.

### Open Graph & Social

The site includes meta tags for:
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Standard SEO meta tags

To update the social preview image, replace `public/og-image.png` (recommended: 1200x630px).

## License

MIT
