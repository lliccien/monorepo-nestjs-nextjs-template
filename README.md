# Monorepo NestJS + Next.js

Full-stack monorepo template with NestJS backend and Next.js frontend, managed with Turborepo and pnpm.

## Tech Stack

### Backend (API)
- **NestJS** - Progressive Node.js framework
- **TypeORM** - ORM for database management
- **PostgreSQL** - Primary database
- **Redis** - Caching layer
- **Swagger** - API documentation

### Frontend (Web)
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS
- **TypeScript** - Type safety

### Tools
- **Turborepo** - High-performance build system
- **pnpm** - Fast, disk space efficient package manager
- **Docker** - Containerization for development and production
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Prerequisites

- Node.js 18+
- pnpm 9+
- Docker & Docker Compose
- Make (optional, for shortcuts)

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start Development Services

```bash
# Using Makefile (recommended)
make dev-up

# Or directly with docker-compose
docker compose --env-file .env -f docker/docker-compose.dev.yml up -d
```

This starts PostgreSQL and Redis containers. Services:
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

### 4. Run Applications

```bash
# Run all apps
pnpm dev

# Run specific app
pnpm dev:api    # API on http://localhost:4000
pnpm dev:web    # Web on http://localhost:3000
```

## Project Structure

```
.
├── apps/
│   ├── api/          # NestJS backend
│   └── web/          # Next.js frontend
├── docker/           # Docker configuration
│   ├── docker-compose.dev.yml
│   ├── docker-compose.prod.yml
│   ├── Dockerfile.api
│   └── Dockerfile.web
├── packages/         # Shared packages (empty, ready for libraries)
└── Makefile          # Development commands
```

## Available Commands

### Development

```bash
pnpm dev           # Start all apps in development mode
pnpm dev:api       # Start API only
pnpm dev:web       # Start Web only
```

### Build

```bash
pnpm build         # Build all apps
pnpm build:api     # Build API only
pnpm build:web     # Build Web only
```

### Production

```bash
pnpm start         # Start all apps in production mode
pnpm start:api     # Start API only
pnpm start:web     # Start Web only
```

### Code Quality

```bash
pnpm lint          # Lint all apps
pnpm format        # Format code with Prettier
pnpm test          # Run all tests
```

## Docker Commands (Makefile)

### Development

```bash
make dev-up        # Start PostgreSQL + Redis
make dev-down      # Stop services
make dev-logs      # View logs
make dev-clean     # Clean containers and volumes
```

### Production

```bash
make prod-build    # Build production images
make prod-up       # Start API + Web containers
make prod-down     # Stop production services
make prod-logs     # View production logs
make prod-clean    # Clean production containers
```

### Utilities

```bash
make help          # Show all available commands
make status        # Show container status
```

## API Documentation

When running in development, Swagger documentation is available at:
- API Docs: `http://localhost:4000/api`

## Environment Variables

Key environment variables in `.env`:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=myuser
DB_PASSWORD=mypassword
DB_NAME=mydb

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# API
PORT_API=4000

# Web
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Production Deployment

For production, configure external PostgreSQL and Redis services, then:

```bash
# Build images
make prod-build

# Start containers
make prod-up
```

The production setup uses optimized multi-stage Docker builds with minimal image sizes.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm lint` and `pnpm test`
4. Submit a pull request

## License

UNLICENSED
