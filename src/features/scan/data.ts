/**
 * Donnees du domaine "scan".
 * Contenu affiche par les ecrans : titres, libelles, listes de demo.
 * Modifier ici pour changer les textes/valeurs, sans toucher a l'interface.
 */
import { Briefcase, Flame, HandHeart, MapPin, Sparkles, Tag, TrendingUp, Zap } from "lucide-react";

export const FILTERS = [
  { id: "all", label: "À proximité", icon: MapPin },
  { id: "urgent", label: "Urgents", icon: Zap },
  { id: "trending", label: "Tendances", icon: TrendingUp },
  { id: "promo", label: "Promotions", icon: Tag },
  { id: "service", label: "Services", icon: Sparkles },
  { id: "job", label: "Emplois", icon: Briefcase },
  { id: "need", label: "Besoins", icon: HandHeart },
  { id: "flash", label: "Ventes Flash", icon: Flame },
];

export type Status = "urgent" | "flash" | "trending" | "normal";

export type FeedItem = {
  id: string;
  title: string;
  category: string;
  cat: string;
  distance: string;
  status: Status;
  desc: string;
  score: number;
};

/** Annonces reelles autour de l'utilisateur. */
export const FEED: FeedItem[] = [];

/** Lieux reels autour de l'utilisateur. */
export const NEARBY: { title: string; tag: string; dist: string; score: number }[] = [];

/** Tendances reelles de la zone. */
export const TRENDING: { title: string; count: string }[] = [];

/** Demandes urgentes reelles de la zone. */
export const URGENT: { title: string; dist: string; time: string }[] = [];

export const SUGGESTIONS = [
  "À proximité de vous",
  "Offres Flash populaires",
  "Besoins similaires à votre zone",
  "Services tendance cette semaine",
];
