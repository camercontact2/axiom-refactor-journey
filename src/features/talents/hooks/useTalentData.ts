import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { type Talent, type TalentFiles, type TalentValues, validateMedia, validatePublication, talentSchema } from '../model';

// Replace this transitional untyped client with regenerated table types after the pending schema is applied.
const db: SupabaseClient = supabase;
const bucket = 'talent-media';
const unavailable = 'L’enregistrement des talents est indisponible pour le moment. Votre fiche reste ouverte ; ne quittez pas cette page.';
export function useTalent(id: string | undefined) {
  return useQuery({ queryKey: ['talent', id], enabled: Boolean(id), queryFn: async () => {
    const { data, error } = await db.from('talent_profiles').select('*').eq('id', id).maybeSingle();
    if (error) throw new Error('Cette fiche est momentanément indisponible.');
    return data as Talent | null;
  } });
}
export function usePublishedTalents() {
  return useQuery({ queryKey: ['talents', 'published'], queryFn: async () => {
    const { data, error } = await db.from('talent_profiles').select('*').eq('status', 'published').order('created_at', { ascending: false }).limit(30);
    if (error) throw new Error('Les fiches talents ne sont pas encore disponibles.');
    return (data ?? []) as Talent[];
  } });
}
export function useTalentMedia(path: string | null | undefined) {
  return useQuery({ queryKey: ['talent-media', path], enabled: Boolean(path), staleTime: 0, gcTime: 0, queryFn: async () => {
    if (!path) return null;
    const { data, error } = await db.storage.from(bucket).createSignedUrl(path, 300);
    if (error) throw new Error('Ce fichier n’est pas accessible.');
    return data.signedUrl;
  } });
}
export function useSaveTalent() {
  const cache = useQueryClient();
  return useMutation({ mutationFn: async ({ values, files, status, existing }: { values: TalentValues; files: TalentFiles; status: 'draft' | 'published'; existing?: Talent | null }) => {
    const parsed = status === 'published' ? validatePublication(values, Boolean(files.audio || existing?.audio_path)) : talentSchema.parse(values);
    const { data: auth, error: authError } = await supabase.auth.getUser();
    if (authError || !auth.user) throw new Error('Reconnectez-vous pour enregistrer votre fiche.');
    if (existing && existing.owner_id !== auth.user.id) throw new Error('Vous ne pouvez modifier que votre fiche.');
    const id = existing?.id ?? crypto.randomUUID();
    const uploaded: string[] = [];
    const media: Record<string, string | null> = { photo_path: existing?.photo_path ?? null, audio_path: existing?.audio_path ?? null, cv_path: existing?.cv_path ?? null };
    try {
      for (const [kind, file] of Object.entries(files)) {
        if (!file) continue;
        validateMedia(file, kind as keyof TalentFiles);
        const extension = file.type.includes('pdf') ? 'pdf' : file.type.includes('png') ? 'png' : file.type.includes('jpeg') ? 'jpg' : file.type.includes('mp4') ? 'm4a' : file.type.includes('ogg') ? 'ogg' : file.type.includes('webp') ? 'webp' : file.type.includes('mpeg') ? 'mp3' : file.type.includes('wav') ? 'wav' : 'webm';
        const path = `${auth.user.id}/${id}/${crypto.randomUUID()}.${extension}`;
        const { error } = await db.storage.from(bucket).upload(path, file, { contentType: file.type, upsert: false });
        if (error) throw new Error(unavailable);
        uploaded.push(path); media[`${kind}_path`] = path;
      }
      const row = { ...parsed, ...media, id, owner_id: auth.user.id, status, updated_at: new Date().toISOString() };
      const request = existing ? db.from('talent_profiles').update(row).eq('id', id).eq('owner_id', auth.user.id) : db.from('talent_profiles').insert(row);
      const { data, error } = await request.select('*').single();
      if (error) throw new Error(unavailable);
      return data as Talent;
    } catch (error) {
      if (uploaded.length) await db.storage.from(bucket).remove(uploaded);
      throw error;
    }
  }, onSuccess: talent => {
    cache.setQueryData(['talent', talent.id], talent);
    void cache.invalidateQueries({ queryKey: ['talents'] });
  } });
}