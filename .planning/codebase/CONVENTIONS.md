# Coding Conventions

**Analysis Date:** 2026-01-24

## Naming Patterns

**Files:**
- Controllers: `[entity]Controller.ts` (e.g., `authController.ts`, `postController.ts`)
- Middleware: `[name]Middleware.ts` (e.g., `authMiddleware.ts`, `errorMiddleware.ts`)
- Routes: `[entity]Routes.ts` (e.g., `authRoutes.ts`, `postRoutes.ts`)
- Services: `[name]Service.ts` (e.g., `emailService.ts`, `cronService.ts`)
- Utilities: lowercase camelCase (e.g., `jwt.ts`, `password.ts`, `slug.ts`)
- Components: PascalCase (e.g., `BlogCard.tsx`, `Contact.tsx`, `Navbar.tsx`)

**Functions:**
- camelCase for all function names
- Async functions use `async` keyword
- Handler functions prefix with action: `login()`, `logout()`, `createPost()`
- Middleware functions: `authenticate()`, `errorHandler()`, `notFoundHandler()`
- React components use PascalCase for component functions
- Hook functions prefixed with `use`: `useAuth()`, `useContext()`

**Variables:**
- camelCase for all local variables and constants
- Constants in config files use lowercase camelCase (e.g., `maxFailedAttempts`, `lockDuration`)

**Types:**
- Interfaces: PascalCase (e.g., `AppError`, `AuthContextType`, `BlogCardProps`)
- Generic types use angle brackets: `ApiResponse<T>`, `Promise<Result>`

## Code Style

**Formatting:**
- No linter/formatter configured in the project
- TypeScript strict mode enabled in backend `tsconfig.json`
- Indent with 2 spaces (observed throughout codebase)
- Semicolons used consistently

**Linting:**
- No ESLint or Prettier configuration present
- TypeScript compiler handles type checking
- Developers follow conventions by example from existing code

## Import Organization

**Order:**
1. External libraries (Node.js, npm packages)
2. Relative imports from parent directories (./)
3. Type imports from Prisma, Express, React

**Path Aliases:**
- Frontend: `@/*` maps to project root
- Backend: no aliases configured, uses relative imports

## Error Handling

**Patterns:**
- Backend uses custom `AppError` interface with `statusCode` and `isOperational` flags
- Create operational errors with `createError(message, statusCode)` from `errorMiddleware.ts`
- Controllers wrap logic in try-catch and pass errors to Express via `next(error)`
- Zod validation errors handled by error middleware with field-level details
- Response format: `{ success: boolean, data?: T, message?: string, error?: string }`
- Frontend checks `result.success` for error handling
- Uses `console.error()` for development logging

## Logging

**Framework:** Native `console` - no external logging service

**Patterns:**
- `console.log()` for startup messages and info
- `console.error()` for errors
- Emojis in production messages (✅, ❌, 🚀)
- Activity logging to database for auth events: login, logout, password changes

## Comments

**When to Comment:**
- JSDoc comments for exported functions with param/return descriptions
- Chinese language comments for business logic
- Comments explain "why" not "what" (code is self-documenting)

**JSDoc/TSDoc:**
- Format: `/** Description \n * HTTP_METHOD /api/endpoint \n */`
- Used on controller functions to document endpoints

## Function Design

**Size:**
- Backend controller functions typically 20-100 lines
- Frontend component functions 50-300 lines depending on state
- Long functions broken into smaller utility functions

**Parameters:**
- Express handlers: `(req: Request, res: Response, next: NextFunction)`
- React components: `React.FC<ComponentProps>`
- Keep utility function parameters < 4

**Return Values:**
- Backend controllers return via `res.json()` with consistent response shape
- Frontend API functions return `Promise<ApiResponse<T>>`
- Utility functions return values or throw errors

## Module Design

**Exports:**
- Default exports for single-class/function modules
- Named exports for utility functions and types
- Controller functions exported as named exports, combined into routes

## API Response Format

**Consistent structure:**
```typescript
{
  success: boolean,
  data?: T,
  message?: string,
  error?: string
}
```

**Pagination pattern:**
```typescript
{
  success: true,
  data: {
    posts: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 100,
      totalPages: 10
    }
  }
}
```

## Middleware Chain Order

1. Security: helmet, CORS
2. Body parsing: JSON, URL-encoded
3. Rate limiting
4. Authentication (optional per route)
5. Route handlers
6. Error handling (bottom of chain)

## Database Query Patterns

**Using Prisma:**
- Use `select` to limit returned fields
- Use `include` only when related data needed
- Use `where` with complex filters via objects
- `Promise.all()` for parallel queries
- Example: `const [posts, total] = await Promise.all([prisma.post.findMany(...), prisma.post.count(...)])`

---

*Convention analysis: 2026-01-24*
