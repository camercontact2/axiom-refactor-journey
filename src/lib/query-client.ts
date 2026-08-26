import { QueryClient } from "@tanstack/react-query";

/**
 * Reglages de cache "stale-while-revalidate" :
 * - staleTime : pendant 5 min, les donnees deja en cache s'affichent SANS attendre le reseau.
 * - gcTime : les donnees restent en memoire 24 h (retour arriere = affichage instantane).
 * - refetchOnMount / refetchOnReconnect : on rafraichit en arriere-plan quand c'est perime.
 */
export const QUERY_STALE_TIME = 5 * 60 * 1000;
export const QUERY_GC_TIME = 24 * 60 * 60 * 1000;

export function createAppQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME,
        gcTime: QUERY_GC_TIME,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: "always",
        retry: 1,
      },
    },
  });
}
