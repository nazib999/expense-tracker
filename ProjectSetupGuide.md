
## Tailwind CSS

Tailwind v4 is used via @tailwindcss/postcss. Global styles are in app/globals.css. Utility-first styling is available across components.

## Linting and Type Checking

- Lint: npm run lint
- TypeScript is configured via tsconfig.json. Next.js runs type checks during build.

## Deployment

- Vercel: Recommended for Next.js. Configure MONGODB_URL and JWT_SECRET in project environment variables. No extra server is required.
- Docker: If containerizing, ensure environment variables are passed and port 3000 is exposed.

## Troubleshooting

- MONGODB_URL not found
  - Ensure .env.local exists at the project root and the variable is defined.
- Cannot connect to MongoDB
  - Check your connection string, network access (Atlas IP allowlist), and that the DB service is running.
- Cookies not persisting in development
  - In dev, cookies are set without secure. Check that your client includes credentials if using fetch from another origin.
- Build errors about types
  - Run npm install and ensure Node/TypeScript versions match the engines listed above.

## License

This project is provided as-is for educational and internal use. Add your preferred license if distributing.

## Contributing

Feel free to open issues or PRs with improvements or bug fixes.
