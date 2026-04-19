# Store Management Application

A full-stack application for managing stores and products, built with NestJS, Prisma, and React (MUI).

## Run Instructions

### Prerequisites
- Docker and Docker Compose
- Node.js 24+ (for local development)

### Using Docker (Recommended)
**Development (with Hot Reload):**
```bash
docker-compose -f docker-compose.dev.yml up --build
```
- Client: `http://localhost:5173`
- Server: `http://localhost:3000`

**Production:**
```bash
docker-compose up --build
```
- Client: `http://localhost:80` (Proxied via Nginx)

### Local Development
1. **Server:**
   ```bash
   cd server
   npm install
   # Configure .env with DATABASE_URL
   npx prisma generate
   npx prisma migrate deploy
   npm run dev
   ```
2. **Client:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

## API Sketch
- `GET /store` - List all stores
- `POST /store` - Create a new store
- `PATCH /store/:id` - Update store details
- `DELETE /store/:id` - Remove a store
- `GET /store/:id` - Get store details
- `GET /store/:id/products` - Get products for a specific store (with filters/pagination)
- `GET /store/:id/inventory` - Get inventory for a specific store (with filters/pagination)
- `GET /product` - List products with pagination and filters (`category`, `minPrice`, `maxPrice`)
- `POST /product` - Add a new product
- `PATCH /product/:id` - Update product details
- `DELETE /product/:id` - Remove a product
- `Swagger UI`: `http://localhost:3000/docs`

## Decisions & Trade-offs
- **Monorepo Structure:** Simplified management of client and server in one repository for this scope, easier to maintain and deploy, 
and switch to separate repositories in the future.
- **NestJS:** A powerful and flexible framework for building scalable server-side applications. Added support of Swagger UI for API documentation, validations.
- **PostgreSQL:** Chosen for its support for complex queries, especially with Prisma's capabilities.
- **Prisma for ORM:** Prisma ORM for its type safety and ease of use, migrations and seed support.
- **Material UI:** Used for rapid development of a professional-looking interface.
- **Validation:** Implemented both server-side (class-validator) and client-side (Zod + React Hook Form) to ensure data integrity and better UX.
- **Docker Multi-stage Builds:** Optimized production images (Nginx for client, lightweight node for server) while keeping a "development" target for live updates.

## Testing Approach
- **Server:** Unit tests using Jest. Services and Controllers are tested by mocking the Prisma service to avoid database dependencies.
- **Client:** Component testing using Vitest and React Testing Library. Focused on core pages and navigation.
- **CI/CD:** GitHub Workflows automate test execution on Pull Requests for both client and server directories independently.

## Future improvements (with more time)
- More unit tests coverage for both client and server.
- Refactor the client code structure to improve maintainability and scalability.
- Environment variables validation on server startup.
