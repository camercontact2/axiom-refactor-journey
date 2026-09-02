import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Donnees de l'espace d'administration.
 * L'acces reel est garanti par les regles de la base (RLS) :
 * un non-admin ne recoit rien, meme en appelant directement ces requetes.
 */
export type AdminProfile = {
  id: string;
  username: string | null;
  display_name: string | null;
  city: string | null;
  created_at: string;
};

export function useAdminProfiles() {
  return useQuery({
    queryKey: ["admin", "profiles"],
    queryFn: async (): Promise<AdminProfile[]> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, display_name, city, created_at")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data ?? []) as AdminProfile[];
    },
  });
}
