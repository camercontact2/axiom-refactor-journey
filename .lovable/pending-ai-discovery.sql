CREATE TABLE public.ai_discovery_access_state (
  model text PRIMARY KEY,
  message text NOT NULL,
  blocked_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_discovery_access_state TO service_role;
ALTER TABLE public.ai_discovery_access_state ENABLE ROW LEVEL SECURITY;