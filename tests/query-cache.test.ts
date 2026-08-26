import { describe, expect, it } from "vitest";

import { createAppQueryClient, QUERY_GC_TIME, QUERY_STALE_TIME } from "../src/lib/query-client";

describe("cache client (stale-while-revalidate)", () => {
  const defaults = createAppQueryClient().getDefaultOptions().queries!;

  it("affiche les donnees en cache sans attendre le reseau", () => {
    expect(defaults.staleTime).toBe(QUERY_STALE_TIME);
    expect(QUERY_STALE_TIME).toBeGreaterThanOrEqual(60_000);
  });

  it("garde les donnees assez longtemps pour un retour / refresh instantane", () => {
    expect(defaults.gcTime).toBe(QUERY_GC_TIME);
    expect(QUERY_GC_TIME).toBeGreaterThanOrEqual(60 * 60 * 1000);
  });

  it("rafraichit en arriere-plan quand c'est perime", () => {
    expect(defaults.refetchOnMount).toBe("always");
    expect(defaults.refetchOnReconnect).toBe(true);
  });
});
