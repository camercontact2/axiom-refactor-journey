import { z } from 'zod';

export const TALENT_CATEGORIES = ['Artisanat', 'Musique', 'Cuisine', 'Langues', 'Bien-être', 'Nature & jardin', 'Sports doux', 'Récits & mémoire'] as const;
export const MAX_RECORDING_SECONDS = 120;
export const MAX_MEDIA_BYTES = 10 * 1024 * 1024;
export const talentSchema = z.object({
  name: z.string().trim().min(2, 'Indiquez votre nom ou votre talent.').max(100),
  bio: z.string().trim().max(2000),
  categories: z.array(z.enum(TALENT_CATEGORIES)).min(1, 'Choisissez une catégorie.').max(8),
  skills: z.array(z.string().trim().min(1).max(100)).max(30),
  experience: z.string().max(5000),
  links: z.array(z.string().url('Indiquez un lien complet : https://…').refine(value => /^https?:\/\//i.test(value), 'Utilisez un lien https://…')).max(10),
});
export type TalentValues = z.infer<typeof talentSchema>;
export type Talent = TalentValues & { id: string; owner_id: string; status: 'draft' | 'published'; photo_path: string | null; audio_path: string | null; cv_path: string | null; created_at: string };
export type MediaKind = 'photo' | 'audio' | 'cv';
export type TalentFiles = Partial<Record<MediaKind, File>>;
export const blankTalent: TalentValues = { name: '', bio: '', categories: [], skills: [], experience: '', links: [] };

export function validateMedia(file: Pick<File, 'size' | 'type'>, kind: MediaKind) {
  const allowed = kind === 'photo' ? ['image/jpeg', 'image/png', 'image/webp'] : kind === 'cv' ? ['application/pdf'] : ['audio/webm', 'audio/ogg', 'audio/mp4', 'audio/wav', 'audio/mpeg'];
  if (!allowed.includes(file.type.split(';')[0])) throw new Error(kind === 'photo' ? 'Choisissez une photo JPG, PNG ou WebP.' : kind === 'cv' ? 'Choisissez un CV au format PDF.' : 'Choisissez un fichier audio.');
  const max = kind === 'audio' ? MAX_MEDIA_BYTES : 5 * 1024 * 1024;
  if (file.size <= 0 || file.size > max) throw new Error(kind === 'audio' ? 'Audio trop volumineux (10 Mo maximum).' : 'Fichier trop volumineux (5 Mo maximum).');
}

export function validatePublication(values: TalentValues, hasAudio: boolean) {
  const parsed = talentSchema.parse(values);
  if (!parsed.bio && !hasAudio) throw new Error('Ajoutez une courte présentation ou enregistrez votre voix.');
  return parsed;
}