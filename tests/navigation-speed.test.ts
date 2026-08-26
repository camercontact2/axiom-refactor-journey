import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROUTES_DIR = join(process.cwd(), "src", "routes");
const routeFiles = readdirSync(ROUTES_DIR).filter((f) => f.endsWith(".tsx"));

const router = readFileSync(join(process.cwd(), "src", "router.tsx"), "utf8");

describe("garde-fous vitesse de navigation", () => {
  it("le prechargement au survol/focus reste actif", () => {
    expect(router).toMatch(/defaultPreload:\s*"intent"/);
  });

  it("le scroll restoration reste actif", () => {
    expect(router).toMatch(/scrollRestoration:\s*true/);
  });

  it("le cache partage (QueryClient configure) est branche sur le router", () => {
    expect(router).toMatch(/createAppQueryClient\(\)/);
  });

  it("aucune page n'utilise <a href> pour naviguer en interne (casse le prechargement)", () => {
    const offenders: string[] = [];
    for (const file of routeFiles) {
      if (file === "__root.tsx") continue; // la page d'erreur utilise volontairement un <a>
      const src = readFileSync(join(ROUTES_DIR, file), "utf8");
      if (/<a\s[^>]*href=["']\/(?!\/)/.test(src)) offenders.push(file);
    }
    expect(offenders).toEqual([]);
  });

  it("chaque page declare ses metadonnees head()", () => {
    const missing = routeFiles.filter(
      (file) => !readFileSync(join(ROUTES_DIR, file), "utf8").includes("head:"),
    );
    expect(missing).toEqual([]);
  });
});
