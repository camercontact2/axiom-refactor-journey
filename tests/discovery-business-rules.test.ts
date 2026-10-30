import { describe, expect, it } from "vitest";
import { discoveryInput, rankMatches, searchTerms } from "../src/features/discovery/contracts";

describe("discovery business rules", () => {
  it("rejects short or empty queries", () => {
    expect(() => discoveryInput.parse({ query: "abc", mode: "radar" })).toThrow();
    expect(() => discoveryInput.parse({ query: "", mode: "talents" })).toThrow();
  });

  it("accepts valid discovery input", () => {
    const parsed = discoveryInput.parse({
      query: "Besoin d'un plombier rapide à Yaoundé",
      mode: "radar",
    });

    expect(parsed).toEqual({
      query: "Besoin d'un plombier rapide à Yaoundé",
      mode: "radar",
    });
  });

  it("extracts meaningful search terms and ignores stop words and accents", () => {
    expect(searchTerms("Cherche un plombier rapide à Yaoundé pour réparation")).toEqual([
      "plombier",
      "rapide",
      "yaounde",
      "reparation",
    ]);
  });

  it("ranks matches by overlap with the user query", () => {
    const query = "plombier rapide Yaoundé réparation";
    const matches = [
      {
        id: "m-1",
        kind: "profile" as const,
        title: "Plombier rapide",
        description: "Réparation de robinets et tuyauterie",
        city: "Yaoundé",
      },
      {
        id: "m-2",
        kind: "flash" as const,
        title: "Traiteur local",
        description: "Cuisine maison pour événements",
        city: "Douala",
      },
      {
        id: "m-3",
        kind: "profile" as const,
        title: "Plombier",
        description: "Travaux de plomberie et drainage",
        city: null,
      },
    ];

    const ranked = rankMatches(query, matches);

    expect(ranked.map((match) => match.id)).toEqual(["m-1", "m-3", "m-2"]);
    expect(ranked).toHaveLength(3);
  });

  it("drops matches with zero score", () => {
    const matches = [
      {
        id: "no-match",
        kind: "flash" as const,
        title: "Photographe",
        description: "Prises de vue pour événements",
        city: "Douala",
      },
    ];

    expect(rankMatches("plombier urgence yaounde", matches)).toEqual([]);
  });
});
