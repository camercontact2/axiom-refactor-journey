/**
 * Donnees du domaine "radar".
 * Contenu affiche par les ecrans : titres, libelles, listes de demo.
 * Modifier ici pour changer les textes/valeurs, sans toucher a l'interface.
 */
import { Brain, Briefcase, Eye, Heart, Sparkles, TrendingUp, Users } from "lucide-react";

export type RadarState = "express" | "analyzing" | "ready" | "results";

export const PLACEHOLDER_PROMPTS = [
  "Que recherchez-vous aujourd'hui ?",
  "Décrivez votre besoin naturellement…",
  "Expliquez ce que vous cherchez…",
  "Parlez librement de votre besoin…",
];

export const SMART_EXAMPLES = [
  { text: "Trouver un développeur", icon: "💻" },
  { text: "Chercher un emploi", icon: "💼" },
  { text: "Trouver une aide urgente", icon: "🆘" },
  { text: "Rechercher un partenaire", icon: "🤝" },
];

export const ANALYSIS_STEPS = [
  { icon: Brain, label: "Compréhension de l'intention", hint: "Décodage du contexte humain" },
  { icon: Eye, label: "Exploration de l'écosystème", hint: "Lecture des signaux vivants" },
  { icon: Users, label: "Analyse de compatibilité", hint: "Profils, confiance, disponibilité" },
  { icon: Sparkles, label: "Émergence des opportunités", hint: "Résultats contextuels" },
];

export type RadarMatch = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  location: string;
  trust: number;
  compatibility: number;
  available: boolean;
  tags: string[];
  note: string;
  gradient: string;
};

/** Resultats reels du radar. Vide tant que l'ecosysteme n'a rien remonte. */
export const MOCK_RESULTS: RadarMatch[] = [];

export const ASSISTANT_HINTS = [
  "Préciser le niveau d'expérience ?",
  "Ajouter une contrainte de zone ?",
  "Filtrer par disponibilité immédiate ?",
];

/** Veilles reellement enregistrees par l'utilisateur. */
export const VEILLES: { id: string; label: string; matches: number; fresh: string; color: string }[] = [];

/** Recherches recentes reelles de l'utilisateur. */
export const RECENT_SEARCHES: string[] = [];

export const SUGGESTIONS = [
  {
    icon: TrendingUp,
    label: "Tendance",
    hint: "Designers produit recherchés",
    color: "var(--flash)",
    prompt: "Designer produit pour mission de 4 semaines",
  },
  {
    icon: Briefcase,
    label: "Opportunité",
    hint: "3 collectifs cherchent ton profil",
    color: "var(--radar)",
    prompt: "Rejoindre un collectif tech bienveillant",
  },
  {
    icon: Heart,
    label: "Entraide",
    hint: "Aide demandée à 800 m",
    color: "var(--trust)",
    prompt: "Aider un voisin sur un déménagement",
  },
];

export type RadarParams = {
  radius: number;
  depth: "fast" | "balanced" | "deep";
  trustMin: number;
  availableOnly: boolean;
  scope: "all" | "humans" | "collectifs" | "services";
};
