import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/**
 * Etat de connexion de l'utilisateur.
 * A utiliser dans n'importe quel composant : const { user, loading } = useAuth();
 */
export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const user: User | null = session?.user ?? null;

  return { session, user, loading, isAuthenticated: Boolean(user) };
}

export async function signOut() {
  await supabase.auth.signOut();
}
