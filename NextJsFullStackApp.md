# Full-Stack Next.js App

This repository contains a full-stack Next.js application (App Router) with a built-in backend powered by Next.js API routes and MongoDB (via Mongoose). It includes user authentication (register, login, logout, session/me) and a React-based frontend with Tailwind CSS and various UI utilities.

## Tech Stack

- Frontend: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- Backend: Next.js API Routes, Mongoose 8, MongoDB 6
- Auth: JSON Web Tokens (JWT), HttpOnly cookies
- Forms & Validation: react-hook-form, zod
- Charts/UI: recharts, radix-ui, lucide-react
- Tooling: ESLint, TypeScript

## Monorepo vs Split Apps

This is a single Next.js app where:
- Frontend runs on http://localhost:3000
- Backend API routes are available under http://localhost:3000/api

You do not need to run a separate server. The API and frontend run together.

## Prerequisites

- Node.js 18.18+ or 20+ (recommended)
- npm 9+ (this repo uses npm)
- A MongoDB instance (local or hosted, e.g., MongoDB Atlas)

## Environment Variables

Create a .env.local file in the project root with:
