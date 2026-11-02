import { z } from 'zod';

export const discoveryInput = z.object({
  query: z.string().trim().min(4, 'Décrivez votre recherche en quelques mots.').max(600, 'Limitez votre recherche à 600 caractères.'),
  mode: z.enum(['radar', 'talents']),
});
export type DiscoveryMode = z.infer<typeof discoveryInput>['mode'];

/** Strict runtime boundary for records that may be returned by discovery. */
export const discoveryMatchSchema = z.object({
  id: z.string().min(1).max(128),
  kind: z.enum(['flash', 'profile']),
  title: z.string().trim().min(1).max(120),
  description: z.string().max(2000),
  city: z.string().max(120).nullable(),
}).strict();
export type DiscoveryMatch = z.infer<typeof discoveryMatchSchema>;

export function searchTerms(query: string) {
  const ignored = new Set(['cherche', 'recherche', 'trouver', 'besoin', 'avec', 'pour', 'dans', 'talent', 'profil', 'quelqu', 'consultant']);
  return [...new Set(query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').match(/[a-z0-9]{3,}/g) ?? [])].filter(t => !ignored.has(t)).slice(0, 8);
}

export function rankMatches(query: string, matches: unknown[]) {
  const terms = searchTerms(query);
  return matches.flatMap((candidate) => {
    const parsed = discoveryMatchSchema.safeParse(candidate);
    if (!parsed.success) return [];

    const match = parsed.data;
    const text = `${match.title} ${match.description} ${match.city ?? ''}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const score = terms.filter(term => text.includes(term)).length;
    return score > 0 ? [{ match, score }] : [];
  }).sort((a, b) => b.score - a.score).slice(0, 12).map(item => item.match);
}
