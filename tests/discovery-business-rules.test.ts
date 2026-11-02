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

  it("ranks matches by overlap with the user query and excludes zero-score matches", () => {
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

    expect(ranked.map((match) => match.id)).toEqual(["m-1", "m-3"]);
  });

  it("drops malformed records and unknown fields at the runtime boundary", () => {
    const candidates = [
      {
        id: "valid",
        kind: "flash",
        title: "Plombier",
        description: "Intervention plomberie",
        city: "Douala",
      },
      {
        id: "invalid-extra-field",
        kind: "profile",
        title: "Plombier",
        description: "Intervention plomberie",
        city: "Douala",
        privateEmail: "private@example.test",
      },
      {
        id: "invalid-shape",
        kind: "flash",
        title: "",
        description: "Intervention plomberie",
        city: null,
      },
    ];

    expect(rankMatches("plombier intervention", candidates).map((match) => match.id)).toEqual([
      "valid",
    ]);
  });
});
