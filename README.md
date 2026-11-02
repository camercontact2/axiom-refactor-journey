# Axiom Refactor Journey

Axiom is a VITALA social discovery application built with React, TypeScript, TanStack Start, Supabase, and Lovable Cloud.

## Requirements

- [Bun](https://bun.sh/) (the repository includes `bun.lock`)
- A supported Node.js version for the installed Vite/toolchain
- Supabase and Lovable Cloud credentials for authenticated data and AI features

## Get started

```sh
git clone https://github.com/camercontact2/axiom-refactor-journey.git
cd axiom-refactor-journey
bun install
cp .env.example .env.local
# Fill in the required values described in docs/environment.md
bun run dev
```

The development server prints its local URL when it starts. Some screens can be explored without backend credentials; Supabase-backed authentication, database, and AI features require valid environment configuration.

## Common commands

```sh
bun run dev       # Start the Vite development server
bun run test      # Run Vitest tests
bun run lint      # Run ESLint
bun run build     # Create a production build
bun run preview   # Preview a production build locally
bun run format    # Format the repository with Prettier
```

## Project structure

- `src/routes/` — route declarations and page metadata
- `src/features/<domain>/` — domain-specific pages, components, hooks, and logic
- `src/components/` — shared layout and UI components
- `src/integrations/supabase/` — Supabase clients and auth integration
- `supabase/migrations/` — Supabase schema and access-policy migrations
- `tests/` — automated tests and quality guardrails
- `docs/` — setup and contributor guidance

Keep routes lightweight. Put domain logic with its feature; keep privileged database access and provider calls in server-only modules. See [`src/features/README.md`](src/features/README.md) for the feature conventions and [`docs/environment.md`](docs/environment.md) for configuration and secret handling.

## Database and security

Apply Supabase migrations using the project's configured Supabase workflow. Review each migration and its RLS policies before applying it to a shared or production database. Never commit real credentials, service-role keys, or production secrets. Client-side `VITE_` variables are public at build time and must never contain secrets.

## Tests and browser checks

Run `bun run test` before submitting changes. Additional browser navigation/responsive checks are described in [`tests/README.md`](tests/README.md). The repository's automated checks do not replace testing authenticated flows against a configured Supabase environment.

## Contributing

Before opening a change:

1. Follow the domain boundaries in [`src/features/README.md`](src/features/README.md).
2. Add or update tests for behavior changes.
3. Run `bun run test`, `bun run lint`, and `bun run build`.
4. Do not commit generated secrets or rewrite published history; this repository is synchronized with Lovable (see [`AGENTS.md`](AGENTS.md)).

## Lovable

This project is connected to [Lovable](https://lovable.dev). Changes committed to the connected branch may synchronize to its editor. Preserve published Git history.
