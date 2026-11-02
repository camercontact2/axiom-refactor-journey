import { describe, expect, it } from "vitest";
import { discoveryInput, rankMatches, searchTerms } from "../src/features/discovery/contracts";

describe("discovery performance and business rules", () => {
  it("rejects short or empty queries", () => {
    expect(() => discoveryInput.parse({ query: "abc", mode: "radar" })).toThrow();
    expect(() => discoveryInput.parse({ query: "", mode: "talents" })).toThrow();
  });

  it("ignores empty terms and keeps matching logic cheap and consistent", () => {
    expect(searchTerms("   ")).toEqual([]);
    expect(searchTerms("Cherche un plombier rapide à Yaoundé pour réparation")).toEqual([
      "plombier",
      "rapide",
      "yaounde",
      "reparation",
    ]);
  });

  it("validates and filters result records before ranking them", () => {
    const query = "plombier rapide yaounde";
    const matches = [
      {
        id: "valid-1",
        kind: "profile",
        title: "Plombier rapide",
        description: "Réparation de robinets et tuyauterie",
        city: "Yaoundé",
      },
      {
        id: "invalid-1",
        kind: "profile",
        title: "",
        description: "Intervention",
        city: null,
      },
      {
        id: "invalid-2",
        kind: "profile",
        title: "Plombier",
        description: "Intervention",
        city: "Douala",
        privateEmail: "secret@example.test",
      },
    ];

    expect(rankMatches(query, matches).map((match) => match.id)).toEqual(["valid-1"]);
  });

  it("returns only high-signal results and drops zero-score items", () => {
    const query = "plombier urgence yaounde";
    const matches = [
      {
        id: "m-1",
        kind: "flash",
        title: "Plombier",
        description: "Urgence plomberie",
        city: "Yaoundé",
      },
      {
        id: "m-2",
        kind: "flash",
        title: "Photographe",
        description: "Prises de vue pour événements",
        city: "Douala",
      },
    ];

    expect(rankMatches(query, matches).map((match) => match.id)).toEqual(["m-1"]);
  });
});
