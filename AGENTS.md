# Repository Guidelines

Whatever action you can do yourself, please do yourself, this include starting apps and verification

## Project Structure & Module Organization

This Next.js 16 App Router project has three No.9 Bubble Tea concepts: `/`, `/club` and `/final`. Routes and styles live in `src/app/`; interactions live in `src/components/`; CMS source files live in `CMS/`; generated menu data lives in `src/generated/`; shop and WhatsApp helpers live in `src/lib/shop.ts`. Tests are in `tests/`. Next.js serves images and fonts from `public/`.

## Build, Test, and Development Commands

Use Node.js 24+ and install dependencies with `npm install`.

- `npm run dev`: start the app at `http://localhost:3000`.
- `npm run build` / `npm start`: build and serve production output.
- `npm run cms:check`: validate menu CSV rows and matching PNG files.
- `npm run cms:sync`: regenerate menu data and public menu images.
- `npm run lint` / `npm run typecheck`: check ESLint and TypeScript.
- `npm test`: run ordering and menu-filter tests.
- `npm run format`: apply Prettier to source, tests and root documents.

Keep `package-lock.json` alongside dependency changes. Start and verify the app yourself after meaningful UI changes.

## Coding Style & Naming Conventions

Use TypeScript, two-space indentation, double quotes and semicolons. Follow Prettier and Next.js ESLint rules. Use PascalCase for React components, camelCase for helpers and kebab-case filenames. Keep customer copy in British English. Respect reduced-motion preferences and preserve keyboard focus when changing dialogs.

## Testing Guidelines

Use Node's test runner with `tests/*.test.ts`. Test observable behaviour, particularly menu filtering, basket totals and encoded WhatsApp messages. Run `npm run cms:check` after every CMS edit. No coverage threshold is configured. Check desktop and mobile layouts, image loading, keyboard navigation and browser errors for visual changes.

## Commit & Pull Request Guidelines

No commit convention exists yet. Use focused, imperative subjects such as `Add menu filtering`. Pull requests should explain the change, link relevant issues and list validation. Include desktop/mobile screenshots for visual changes.

## Security & Configuration

No secrets or environment variables are required. Never invent prices, hours, stock or reviews. Preserve the shop's WhatsApp number and confirm unverified content with the owner. Record photo provenance in `ASSETS.md`. Do not send customer messages automatically or add checkout without a new request.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
