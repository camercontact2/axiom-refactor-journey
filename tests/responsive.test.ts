import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
const SCAN_DIRS = [join(ROOT, "src", "features"), join(ROOT, "src", "routes")];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return walk(full);
    return full.endsWith(".tsx") ? [full] : [];
  });
}

const files = SCAN_DIRS.flatMap(walk);

function findOffenders(pattern: RegExp, guard?: (match: RegExpMatchArray) => boolean) {
  const offenders: string[] = [];
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    for (const match of src.matchAll(pattern)) {
      if (guard && !guard(match)) continue;
      offenders.push(`${relative(ROOT, file)} -> ${match[0]}`);
    }
  }
  return offenders;
}

describe("garde-fous responsive", () => {
  it("pas de largeur fixe superieure a 360px (deborde sur mobile)", () => {
    const offenders = findOffenders(/(?:^|[\s"'`])w-\[(\d+)px\]/g, (m) => Number(m[1]) > 360);
    expect(offenders).toEqual([]);
  });

  it("pas de min-width fixe superieure a 360px", () => {
    const offenders = findOffenders(/min-w-\[(\d+)px\]/g, (m) => Number(m[1]) > 360);
    expect(offenders).toEqual([]);
  });

  it("pas de taille de police fixe superieure a 40px sans variante responsive", () => {
    const offenders = findOffenders(/text-\[(\d+)px\]/g, (m) => Number(m[1]) > 40);
    expect(offenders).toEqual([]);
  });

  it("pas de viewport horizontal force (100vw provoque un scroll lateral)", () => {
    const offenders = findOffenders(/(?:w|min-w)-(?:screen|\[100vw\])/g);
    expect(offenders).toEqual([]);
  });
});
