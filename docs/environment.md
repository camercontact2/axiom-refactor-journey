# Environment configuration

Create a local `.env.local` (or `.env`) file and keep it out of version control. `.env.example` contains variable names without credentials. Never paste production secrets into a client-side `VITE_` variable.

## Variables

| Variable | Used by | Sensitivity / notes |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Browser Supabase client | Public project URL; must match the Supabase project. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser Supabase client | Publishable key; public by design. Protect data with RLS. |
| `SUPABASE_URL` | Server-side Supabase clients and handlers | Project URL. |
| `SUPABASE_PUBLISHABLE_KEY` | Server-side user-authenticated calls | Publishable key; not a service credential. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only admin client | Secret; bypasses RLS. Never expose to the browser or commit it. |
| `LOVABLE_API_KEY` | Server-side AI gateway calls | Secret; keep server-only. |
| `LOVABLE_DB_MIGRATION_URL` | Drizzle migration tooling | Database connection string; treat as a secret. |
| `LOVABLE_CRON_SECRET` | Scheduled/cron endpoint authentication | Secret bearer credential. |
| `LOVABLE_CRON_SECRET_PREVIOUS` | Optional cron-secret rotation | Previous secret during a controlled rotation; remove after rotation. |

Only configure variables needed by the features and tooling you use. Keep the public Supabase URL and publishable key aligned with the server-side Supabase project configuration.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Fill in values from the correct Supabase/Lovable Cloud project and local tooling setup.
3. Restart the dev server after changing environment variables.
4. Ensure no service-role key, AI key, database URL, or cron secret is included in client code, logs, screenshots, or commits.

The public Supabase publishable key is not an authorization boundary: database access must be protected by reviewed RLS policies. `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS and belongs exclusively in trusted server environments.

## Deployment

Configure secrets in the deployment platform's secret/environment settings, not in source control. Add public `VITE_` values as build-time variables only when they are genuinely public. Rotate any credential that has been accidentally committed or exposed; removing it from a later commit does not revoke it.
