# Pastebin-Lite

A simple, secure pastebin application built with Next.js (App Router), Prisma, and PostgreSQL.

## Features
- Create text pastes with optional expiration (Time-to-Live).
- Set maximum view limits.
- Secure, server-side validation.
- Minimalist, fast UI.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Language**: JavaScript (Node.js 18+)

## Setup

1. **Clone the repository** (if applicable) and navigate to the directory.

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   - Rename `.env.example` to `.env` (or create `.env` if not present).
   - Update `DATABASE_URL` with your PostgreSQL connection string.
   
   Example `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
   TEST_MODE=0
   ```

4. **Initialize Database**:
   ```bash
   npx prisma db push
   ```

5. **Run Development Server**:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

## API Endpoints

### Health Check
- `GET /api/healthz`: Check service and database health.

### Create Paste
- `POST /api/pastes`
- Body: `{ "content": "...", "ttl_seconds": 60, "max_views": 5 }`

### Fetch Paste
- `GET /api/pastes/:id`: Get paste metadata (increments view count).

## Testing
To test expiry logic deterministically, set `TEST_MODE=1` in `.env` and pass the `x-test-now-ms` header with the desired timestamp (milliseconds since epoch).

## Project Structure
- `/app`: Next.js App Router pages and API routes.
- `/lib`: Shared utilities (Prisma client, time helper, business logic).
- `/prisma`: Database schema.

## Deployment

### Deploy to Vercel

1. **Push to GitHub**: Commit your changes and push to a GitHub repository.
2. **Import to Vercel**: Go to Vercel, import the repository.
3. **Configure Environment Variables**:
   Add the following environment variables in the Vercel project settings:
   - `DATABASE_URL`: Your production PostgreSQL connection string.
   - `TEST_MODE`: Set to `0`.
4. **Deploy**: Click Deploy.

The `postinstall` script in `package.json` will automatically generate the Prisma client during the build process.
