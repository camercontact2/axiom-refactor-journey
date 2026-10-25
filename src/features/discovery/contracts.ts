import { z } from 'zod';

export const discoveryInput = z.object({
  query: z.string().trim().min(4, 'Décrivez votre recherche en quelques mots.').max(600, 'Limitez votre recherche à 600 caractères.'),
  mode: z.enum(['radar', 'talents']),
});
export type DiscoveryMode = z.infer<typeof discoveryInput>['mode'];
export type DiscoveryMatch = { id: string; kind: 'flash' | 'profile'; title: string; description: string; city: string | null };

export function searchTerms(query: string) {
  const ignored = new Set(['cherche', 'recherche', 'trouver', 'besoin', 'avec', 'pour', 'dans', 'talent', 'profil', 'quelqu', 'consultant']);
  return [...new Set(query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').match(/[a-z0-9]{3,}/g) ?? [])].filter(t => !ignored.has(t)).slice(0, 8);
}

export function rankMatches(query: string, matches: DiscoveryMatch[]) {
  const terms = searchTerms(query);
  return matches.map(match => {
    const text = `${match.title} ${match.description} ${match.city ?? ''}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return { match, score: terms.filter(term => text.includes(term)).length };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 12).map(item => item.match);
}