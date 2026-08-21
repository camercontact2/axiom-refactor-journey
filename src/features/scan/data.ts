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

export const FEED: {
  id: string;
  title: string;
  category: string;
  cat: string;
  distance: string;
  status: Status;
  desc: string;
  score: number;
}[] = [
  { id: "1", title: "Électricien disponible ce soir", category: "Service", cat: "service", distance: "0.4 km", status: "urgent", desc: "Intervention rapide, dépannage et installation.", score: 92 },
  { id: "2", title: "iPhone 15 Pro — vente flash", category: "Vente", cat: "flash", distance: "1.2 km", status: "flash", desc: "Neuf, sous garantie. -25% pendant 2h.", score: 88 },
  { id: "3", title: "Cherche graphiste freelance", category: "Besoin", cat: "need", distance: "2.1 km", status: "trending", desc: "Mission courte, branding pour startup.", score: 81 },
  { id: "4", title: "Cours de yoga en plein air", category: "Service", cat: "service", distance: "0.8 km", status: "normal", desc: "Séance collective dimanche matin.", score: 86 },
  { id: "5", title: "Livraison express dispo", category: "Emploi", cat: "job", distance: "1.6 km", status: "trending", desc: "Mission ponctuelle, 2h, bien rémunérée.", score: 79 },
];

export const NEARBY = [
  { title: "Café Nuage", tag: "Coworking · Wifi", dist: "0.3 km", score: 92 },
  { title: "Atelier 12", tag: "Studio créatif", dist: "0.6 km", score: 87 },
  { title: "Marché Local", tag: "Producteurs", dist: "0.9 km", score: 90 },
];

export const TRENDING = [
  { title: "Plomberie express", count: "248 vues" },
  { title: "Garde d'enfants soir", count: "189 vues" },
  { title: "Livreur véhiculé", count: "164 vues" },
];

export const URGENT = [
  { title: "Aide déménagement ce soir", dist: "1.1 km", time: "dans 2h" },
  { title: "Pièces auto recherchées", dist: "2.4 km", time: "urgent" },
];

export const SUGGESTIONS = [
  "À proximité de vous",
  "Offres Flash populaires",
  "Besoins similaires à votre zone",
  "Services tendance cette semaine",
];
