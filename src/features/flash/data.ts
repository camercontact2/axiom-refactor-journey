/**
 * Donnees du domaine "flash".
 * Contenu affiche par les ecrans : titres, libelles, listes de demo.
 * Modifier ici pour changer les textes/valeurs, sans toucher a l'interface.
 */
import { Briefcase, Flame, Megaphone, Wrench, Zap } from "lucide-react";

export type FlashType = "sale" | "service" | "urgent" | "offer" | "promo";

export type Mode = "home" | "scan-config" | "scanning" | "scan-ready" | "scan-results";

export const TYPES: { id: FlashType; label: string; icon: typeof Zap; tint: string }[] = [
  { id: "sale", label: "Vente Flash", icon: Zap, tint: "var(--flash)" },
  { id: "service", label: "Service", icon: Wrench, tint: "var(--scan)" },
  { id: "urgent", label: "Urgence", icon: Megaphone, tint: "var(--live)" },
  { id: "offer", label: "Offre", icon: Briefcase, tint: "var(--radar)" },
  { id: "promo", label: "Promo", icon: Flame, tint: "var(--warning)" },
];

export const DURATIONS = ["Flash 1h", "24h", "7 jours"] as const;

export const SCAN_RESULTS = [
  { title: "Électricien dispo ce soir", dist: "0.4 km", tag: "Service", tint: "var(--scan)", time: "il y a 3 min" },
  { title: "iPhone 15 Pro — vente flash", dist: "1.2 km", tag: "Vente", tint: "var(--flash)", time: "il y a 7 min" },
  { title: "Cherche graphiste freelance", dist: "2.1 km", tag: "Besoin", tint: "var(--radar)", time: "il y a 12 min" },
  { title: "Cours de yoga plein air", dist: "0.8 km", tag: "Service", tint: "var(--trust)", time: "il y a 22 min" },
  { title: "Livraison express dispo", dist: "1.6 km", tag: "Emploi", tint: "var(--success)", time: "il y a 31 min" },
];
