import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export type AppRole = "admin" | "moderator" | "user";

/**
 * Roles de l'utilisateur connecte (table "user_roles").
 * La verification finale reste cote base : les regles d'acces (RLS)
 * empechent toute action non autorisee, meme si l'interface est contournee.
 */
export function useRoles() {
  const { user, loading } = useAuth();

  const query = useQuery({
    queryKey: ["roles", user?.id ?? "anonymous"],
    enabled: Boolean(user?.id),
    queryFn: async (): Promise<AppRole[]> => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id);
      if (error) throw error;
      return (data ?? []).map((r) => r.role as AppRole);
    },
  });

  const roles = query.data ?? [];
  return {
    roles,
    isAdmin: roles.includes("admin"),
    isModerator: roles.includes("admin") || roles.includes("moderator"),
    loading: loading || query.isLoading,
  };
}
