# Evinced Test Case

## Technology Stack & Architecture

### Frontend Technologies
- **React 19**: Latest version of React with improved performance and features
- **TypeScript**: For type safety and better developer experience
- **Vite**: Modern, fast build tool and development server
- **TanStack Router**: Type-safe router for React with automatic code splitting
- **TanStack Query**: Data fetching, caching, and state management
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Radix UI**: Accessible component primitives
- **React Hook Form**: Form validation and handling
- **Zod**: Schema validation library
- **Biome**: Linter and formatter

### Architecture
This project follows a **Clean Architecture** approach:

- **Domain Layer** (`/core/domain`): Contains business logic, entities, and repository interfaces (ports)
- **Infrastructure Layer** (`/core/infrastructure`): Implements interfaces defined in the domain layer
- **UI Layer** (`/components`, `/routes`): React components and pages
- **API Layer** (`/api`): Client-side API integration using TanStack Query

This structure ensures:
- Clear separation of concerns
- Better testability
- Domain-driven design principles
- Tech stack independence (core business logic doesn't depend on UI frameworks)

## Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm

### Installation
```bash
pnpm install
```

### Development
Run the development server:
```bash
pnpm dev
```

### Building for Production
```bash
pnpm build
```

Preview the production build:
```bash
pnpm preview
```

### Linting
```bash
pnpm lint
pnpm lint:fix
```
