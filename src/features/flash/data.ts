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

export const RECENT = [
  { type: "sale", title: "iPhone 13 — état neuf", price: "420 €", where: "Lyon 7", time: "2 min" },
  { type: "service", title: "Cours de guitare à domicile", price: "25 €/h", where: "Paris 11", time: "8 min" },
  { type: "urgent", title: "Recherche garde chien ce soir", price: "—", where: "Bordeaux", time: "14 min" },
  { type: "promo", title: "-30% café torréfié maison", price: "9 €", where: "Marseille", time: "21 min" },
] as const;

export const SCAN_RESULTS = [
  { title: "Électricien dispo ce soir", dist: "0.4 km", tag: "Service", tint: "var(--scan)", time: "il y a 3 min" },
  { title: "iPhone 15 Pro — vente flash", dist: "1.2 km", tag: "Vente", tint: "var(--flash)", time: "il y a 7 min" },
  { title: "Cherche graphiste freelance", dist: "2.1 km", tag: "Besoin", tint: "var(--radar)", time: "il y a 12 min" },
  { title: "Cours de yoga plein air", dist: "0.8 km", tag: "Service", tint: "var(--trust)", time: "il y a 22 min" },
  { title: "Livraison express dispo", dist: "1.6 km", tag: "Emploi", tint: "var(--success)", time: "il y a 31 min" },
];

export const MINE = [
  { type: "sale", title: "Casque Sony WH-1000XM4", status: "Actif", color: "var(--success)", views: 124, msgs: 8, time: "il y a 1 h" },
  { type: "service", title: "Coaching sportif à domicile", status: "En attente", color: "var(--warning)", views: 47, msgs: 2, time: "il y a 3 h" },
  { type: "promo", title: "Pâtisseries maison · -20%", status: "Expiré", color: "var(--muted-foreground)", views: 312, msgs: 14, time: "hier" },
] as const;
