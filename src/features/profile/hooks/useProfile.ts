import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/features/auth/hooks/useAuth";

/**
 * Profil reel de l'utilisateur connecte (table "profiles").
 * Lecture + mise a jour, avec cache partage (stale-while-revalidate).
 */
export type Profile = {
  id: string;
  username: string | null;
  display_name: string | null;
  bio: string | null;
  city: string | null;
  avatar_url: string | null;
};

export type ProfileUpdate = Pick<Profile, "username" | "display_name" | "bio" | "city">;

export function profileQueryKey(userId: string | undefined) {
  return ["profile", userId ?? "anonymous"] as const;
}

export function useProfile() {
  const { user, loading } = useAuth();

  const query = useQuery({
    queryKey: profileQueryKey(user?.id),
    enabled: Boolean(user?.id),
    queryFn: async (): Promise<Profile | null> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, display_name, bio, city, avatar_url")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  return { ...query, user, authLoading: loading };
}

export function useUpdateProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: ProfileUpdate) => {
      if (!user) throw new Error("Non connecte");
      const { data, error } = await supabase
        .from("profiles")
        .update(values)
        .eq("id", user.id)
        .select("id, username, display_name, bio, city, avatar_url")
        .single();
      if (error) throw error;
      return data as Profile;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(profileQueryKey(user?.id), data);
    },
  });
}
