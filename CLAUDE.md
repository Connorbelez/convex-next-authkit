# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack TypeScript application that combines Convex as the backend, Next.js as the frontend framework, and WorkOS AuthKit for authentication. The project uses modern React patterns with TypeScript, Tailwind CSS for styling, and includes comprehensive testing setup with Vitest and Playwright.

## Development Commands

### Essential Development Commands

```bash
# Start full development environment (frontend + backend)
npm run dev

# Start only frontend
npm run dev:frontend

# Start only backend (Convex)
npm run dev:backend

# Initial setup - starts Convex and opens dashboard
npm run predev
```

### Build and Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

### Testing Commands

```bash
# Run unit tests in watch mode
npm run test

# Run unit tests once
npm run test:once

# Run tests with coverage
npm run test:coverage

# Debug tests
npm run test:debug

# Run E2E tests
npm run e2e

# Run E2E tests with UI
npm run e2e:ui
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Run all checks (lint + format)
npm run check

# Type checking
npm run check-types

# Generate TypeScript types
npm run tsgo
```

### Storybook

```bash
# Start Storybook development server
npm run storybook

# Build Storybook
npm run build-storybook
```

## Architecture Overview

### Core Stack

- **Backend**: Convex (database + serverless functions)
- **Frontend**: Next.js 15 with App Router
- **Authentication**: WorkOS AuthKit with redirect-based flow
- **Styling**: Tailwind CSS v4
- **UI Components**: HeroUI (custom NextUI fork) + Radix UI primitives
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Linting/Formatting**: Biome
- **Logging**: Custom centralized logging with Pino

### Key Architectural Patterns

#### Authentication Flow
- WorkOS AuthKit handles authentication via redirect-based flow
- Middleware (`middleware.ts`) protects routes and manages session state
- `ConvexClientProvider` bridges WorkOS auth with Convex authentication
- Unauthenticated paths: `/`, `/sign-in`, `/sign-up`

#### Data Flow
- Convex schema defined in `convex/schema.ts` (currently minimal)
- Server functions in `convex/` directory handle backend logic
- Client components use `useAuth()` and `useAccessToken()` hooks from AuthKit
- All data queries go through Convex's reactive query system

#### Logging Architecture
- Centralized logging system with adapter pattern
- Server: Pino-based structured logging with pretty output in dev
- Client: Batching adapter that posts to `/api/logs`
- Convex: Lightweight shim writing to stdout
- Environment: `LOG_LEVEL`, `LOG_PRETTY`, `LOG_SERVICE_NAME`

### Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   └── (auth)/            # Authenticated route groups
├── components/            # React components
├── convex/               # Convex backend (schema + functions)
├── lib/                  # Shared utilities and configurations
├── hooks/                # Custom React hooks
├── stories/              # Storybook stories
├── unit-tests/           # Unit test files
├── e2e/                  # Playwright E2E tests
└── docs/                 # Project documentation
```

### Environment Setup

Copy `.env.local.example` to `.env.local` and configure:

1. **WorkOS Configuration**:
   - `WORKOS_CLIENT_ID`
   - `WORKOS_API_KEY`
   - `WORKOS_COOKIE_PASSWORD` (32+ characters)
   - `NEXT_PUBLIC_WORKOS_REDIRECT_URI` (e.g., `http://localhost:3000/callback`)

2. **Convex Configuration**:
   - `NEXT_PUBLIC_CONVEX_URL` (auto-added by `npx convex dev`)
   - `CONVEX_DEPLOYMENT` (for production)

3. **Logging Configuration**:
   - `LOG_LEVEL` (default: `info`)
   - `LOG_PRETTY` (default: `true` in development)
   - `LOG_SERVICE_NAME` (default: `convex-next-authkit`)

### Development Workflow

1. **Initial Setup**:
   ```bash
   npm install
   cp .env.local.example .env.local
   # Configure environment variables
   npx convex dev
   npx convex auth add workos
   ```

2. **Daily Development**:
   ```bash
   npm run dev  # Starts both frontend and backend
   ```

3. **Testing Workflow**:
   ```bash
   npm run test        # Run unit tests while developing
   npm run e2e         # Run E2E tests before commits
   npm run check-types # Type checking
   ```

### Key Integration Points

#### WorkOS + Convex Integration
- `components/ConvexClientProvider.tsx` bridges AuthKit with Convex
- Custom `useAuthFromAuthKit()` function provides Convex-compatible auth interface
- Token refresh handled automatically by AuthKit components

#### Middleware Protection
- `middleware.ts` implements route protection and request ID tracking
- Eager authentication mode redirects unauthenticated users to sign-in
- Request IDs automatically added to headers for log correlation

#### Logging Integration
- Import from `lib/logger.ts` everywhere (server, client, Convex)
- Use `logger.child()` for request-scoped context
- Client logs automatically forwarded to server logging infrastructure

## Important Notes

- This is a WorkOS AuthKit template with automatic provisioning enabled
- Convex schema is optional - the app works without it
- All authentication state management is handled by AuthKit
- Logging is centralized and provider-agnostic for easy future migrations
- The project uses modern React patterns with TypeScript throughout