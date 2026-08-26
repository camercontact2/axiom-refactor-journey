import { useEffect, useState, type ReactNode } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

import { QUERY_GC_TIME } from "./query-client";

/**
 * Persiste le cache React Query dans le localStorage du navigateur.
 * Effet : apres un refresh (F5) ou un retour sur le site, les pages reaffichent
 * immediatement les dernieres donnees connues pendant qu'elles se rafraichissent.
 * Cote serveur (SSR) rien n'est persiste : on rend simplement le provider normal.
 */
export function PersistedQueryProvider({
  client,
  children,
}: {
  client: QueryClient;
  children: ReactNode;
}) {
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    (async () => {
      try {
        const [{ persistQueryClient }, { createSyncStoragePersister }] = await Promise.all([
          import("@tanstack/react-query-persist-client"),
          import("@tanstack/query-sync-storage-persister"),
        ]);

        const persister = createSyncStoragePersister({
          storage: window.localStorage,
          key: "vitala-query-cache",
          throttleTime: 1000,
        });

        const [unsub, restorePromise] = persistQueryClient({
          queryClient: client,
          persister,
          maxAge: QUERY_GC_TIME,
          buster: "v1",
        });

        unsubscribe = unsub;
        await restorePromise;
      } catch {
        // localStorage indisponible (mode prive, quota) : on continue sans persistance.
      } finally {
        if (!cancelled) setRestored(true);
      }
    })();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [client]);

  // On rend toujours les enfants : la restauration se fait en arriere-plan,
  // aucun ecran blanc, aucun retard d'affichage.
  void restored;

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
