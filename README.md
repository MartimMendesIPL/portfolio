# Martim Mendes Portfolio

A developer portfolio website showcasing projects, skills, and experience. Built with React, TypeScript, and Tailwind CSS, deployed on Cloudflare Pages.

## Features

- **IDE-like interface** - Editor-inspired UI with file tree navigation
- **Dynamic project showcase** - Fetches and displays GitHub repositories in real-time
- **Interactive animations** - Perlin noise wave background with mouse interaction
- **Responsive design** - Works seamlessly on desktop and mobile
- **Accessible** - Skip links, keyboard navigation, reduced motion support
- **Contact form** - Serverless-backed form with rate limiting

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, CSS Modules
- **Icons**: Lucide React
- **Backend**: Cloudflare Workers (serverless functions)
- **Deployment**: Cloudflare Pages
- **Testing**: Vitest, React Testing Library
- **Linting**: ESLint, Prettier
- **Pre-commit**: Husky, lint-staged

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
└── test/               # Test setup and utilities

functions/              # Cloudflare Workers serverless functions
public/                 # Static assets
```

## Deployment

The site deploys automatically to Cloudflare Pages on push to main.

### Manual Deployment

```bash
npm run deploy
```

## License

MIT
