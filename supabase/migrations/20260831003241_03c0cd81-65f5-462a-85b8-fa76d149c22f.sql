CREATE TABLE public.flashes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL DEFAULT 'sale' CHECK (type IN ('sale','service','urgent','offer','promo')),
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 120),
  description text CHECK (description IS NULL OR char_length(description) <= 2000),
  price text,
  city text,
  duration text NOT NULL DEFAULT '24h',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','expired','removed')),
  moderation_status text NOT NULL DEFAULT 'approved' CHECK (moderation_status IN ('pending','approved','rejected')),
  moderation_reason text,
  views integer NOT NULL DEFAULT 0,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX flashes_feed_idx ON public.flashes (created_at DESC) WHERE status = 'active' AND moderation_status = 'approved';
CREATE INDEX flashes_author_idx ON public.flashes (author_id, created_at DESC);
CREATE INDEX flashes_moderation_idx ON public.flashes (moderation_status, created_at DESC);

GRANT SELECT ON public.flashes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.flashes TO authenticated;
GRANT ALL ON public.flashes TO service_role;

ALTER TABLE public.flashes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view approved active flashes"
ON public.flashes FOR SELECT TO anon, authenticated
USING (status = 'active' AND moderation_status = 'approved');

CREATE POLICY "Authors can view their own flashes"
ON public.flashes FOR SELECT TO authenticated
USING (auth.uid() = author_id);

CREATE POLICY "Staff can view all flashes"
ON public.flashes FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

CREATE POLICY "Authors can create their own flashes"
ON public.flashes FOR INSERT TO authenticated
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own flashes"
ON public.flashes FOR UPDATE TO authenticated
USING (auth.uid() = author_id)
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Staff can moderate flashes"
ON public.flashes FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

CREATE POLICY "Authors can delete their own flashes"
ON public.flashes FOR DELETE TO authenticated
USING (auth.uid() = author_id);

CREATE POLICY "Admins can delete any flash"
ON public.flashes FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER flashes_set_updated_at
BEFORE UPDATE ON public.flashes
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
