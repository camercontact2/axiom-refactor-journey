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

export const MOCK_RESULTS = [
  {
    id: "1",
    name: "Amélie Laurent",
    role: "Product Designer · Mentor",
    avatar: "AL",
    location: "Paris · 2 km",
    trust: 96,
    compatibility: 94,
    available: true,
    tags: ["Design systems", "Mentorat", "Calme"],
    note: "Style de collaboration proche du tien. Activité récente forte.",
    gradient: "linear-gradient(135deg, oklch(0.72 0.2 320), oklch(0.65 0.22 280))",
  },
  {
    id: "2",
    name: "Yacine Boudiaf",
    role: "Full-Stack Engineer",
    avatar: "YB",
    location: "Lyon · Remote",
    trust: 88,
    compatibility: 89,
    available: true,
    tags: ["React", "Edge", "Open-source"],
    note: "Contribue régulièrement à l'écosystème. Communication directe.",
    gradient: "linear-gradient(135deg, oklch(0.78 0.18 200), oklch(0.7 0.2 240))",
  },
  {
    id: "3",
    name: "Studio Hévéa",
    role: "Collectif créatif · 4 humains",
    avatar: "SH",
    location: "Marseille",
    trust: 92,
    compatibility: 86,
    available: false,
    tags: ["Branding", "Motion", "Stratégie"],
    note: "Expertise complémentaire. Disponibilité dans 2 semaines.",
    gradient: "linear-gradient(135deg, oklch(0.78 0.18 155), oklch(0.7 0.18 180))",
  },
];

export const ASSISTANT_HINTS = [
  "Préciser le niveau d'expérience ?",
  "Ajouter une contrainte de zone ?",
  "Filtrer par disponibilité immédiate ?",
];

export const VEILLES = [
  { id: "v1", label: "Designer freelance Paris", matches: 3, fresh: "il y a 2 h", color: "var(--radar)" },
  { id: "v2", label: "Co-fondateur tech, mission longue", matches: 1, fresh: "hier", color: "var(--trust)" },
];

export const RECENT_SEARCHES = [
  "Designer freelance dispo cette semaine",
  "Mentor produit early-stage",
  "Studio motion design Marseille",
  "Coach voix podcast",
];

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
