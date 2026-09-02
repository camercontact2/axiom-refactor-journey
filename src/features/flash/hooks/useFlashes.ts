import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { FlashType } from "../data";

/**
 * Acces aux donnees reelles du domaine Flash (table "flashes").
 * Aucune logique d'affichage ici : uniquement lecture/ecriture + cache.
 */
export type Flash = {
  id: string;
  author_id: string;
  type: string;
  title: string;
  description: string | null;
  price: string | null;
  city: string | null;
  duration: string;
  status: string;
  moderation_status: string;
  moderation_reason: string | null;
  views: number;
  expires_at: string | null;
  created_at: string;
};

const COLUMNS =
  "id, author_id, type, title, description, price, city, duration, status, moderation_status, moderation_reason, views, expires_at, created_at";

export const flashKeys = {
  recent: ["flashes", "recent"] as const,
  mine: (userId?: string) => ["flashes", "mine", userId ?? "anonymous"] as const,
  moderation: ["flashes", "moderation"] as const,
};

/** Duree de publication -> date d'expiration. */
export function expiryFromDuration(duration: string): string {
  const hours = duration.includes("1h") ? 1 : duration.includes("7") ? 24 * 7 : 24;
  return new Date(Date.now() + hours * 3600_000).toISOString();
}

/** Fil public : Flash actifs et approuves. */
export function useRecentFlashes(limit = 12) {
  return useQuery({
    queryKey: flashKeys.recent,
    queryFn: async (): Promise<Flash[]> => {
      const { data, error } = await supabase
        .from("flashes")
        .select(COLUMNS)
        .eq("status", "active")
        .eq("moderation_status", "approved")
        .order("created_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as Flash[];
    },
  });
}

/** Mes Flash, quel que soit leur statut. */
export function useMyFlashes() {
  const { user } = useAuth();
  return useQuery({
    queryKey: flashKeys.mine(user?.id),
    enabled: Boolean(user?.id),
    queryFn: async (): Promise<Flash[]> => {
      const { data, error } = await supabase
        .from("flashes")
        .select(COLUMNS)
        .eq("author_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Flash[];
    },
  });
}

export type NewFlash = {
  type: FlashType;
  title: string;
  description?: string;
  price?: string;
  city?: string;
  duration: string;
};

export function useCreateFlash() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: NewFlash) => {
      if (!user) throw new Error("Connecte-toi pour publier un Flash.");
      const title = values.title.trim();
      if (title.length < 3) throw new Error("Le titre doit faire au moins 3 caracteres.");

      const { data, error } = await supabase
        .from("flashes")
        .insert({
          author_id: user.id,
          type: values.type,
          title,
          description: values.description?.trim() || null,
          price: values.price?.trim() || null,
          city: values.city?.trim() || null,
          duration: values.duration,
          expires_at: expiryFromDuration(values.duration),
        })
        .select(COLUMNS)
        .single();
      if (error) throw error;
      return data as Flash;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashes"] });
    },
  });
}

export function useDeleteFlash() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("flashes").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["flashes"] }),
  });
}

/** Moderation : reserve aux admins/moderateurs (verifie aussi cote base). */
export function useAllFlashes() {
  return useQuery({
    queryKey: flashKeys.moderation,
    queryFn: async (): Promise<Flash[]> => {
      const { data, error } = await supabase
        .from("flashes")
        .select(COLUMNS)
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data ?? []) as Flash[];
    },
  });
}

export function useModerateFlash() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      id: string;
      moderation_status: "approved" | "rejected" | "pending";
      reason?: string;
    }) => {
      const { error } = await supabase
        .from("flashes")
        .update({
          moderation_status: input.moderation_status,
          moderation_reason: input.reason ?? null,
        })
        .eq("id", input.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["flashes"] }),
  });
}
