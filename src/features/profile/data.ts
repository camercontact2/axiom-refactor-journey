/**
 * Donnees du domaine "profile".
 * Contenu affiche par les ecrans : titres, libelles, listes de demo.
 * Modifier ici pour changer les textes/valeurs, sans toucher a l'interface.
 */
import { Bell, CheckCircle2, Eye, Lock, MessageCircle, Pencil, Radar, ScanSearch, ShieldCheck, Zap } from "lucide-react";

export const USER = {
  name: "Sophie Lambert",
  handle: "@sophie.l",
  city: "Lyon, FR",
  status: "Confirmé" as "Enregistré" | "Confirmé" | "Pro",
  activity: 72,
  trust: 88,
  completion: 80,
};

export const STATS = [
  { label: "Flash", value: 14, icon: Zap, color: "var(--flash)" },
  { label: "Radar", value: 6, icon: Radar, color: "var(--radar)" },
  { label: "Scan", value: 23, icon: ScanSearch, color: "var(--scan)" },
  { label: "Trust", value: 88, icon: ShieldCheck, color: "var(--trust)" },
];

export const LEVELS = [
  { key: "consultant", label: "Consultant", desc: "Lecture seule" },
  { key: "registered", label: "Enregistré", desc: "Peut publier" },
  { key: "confirmed", label: "Confirmé", desc: "Identité vérifiée" },
  { key: "pro", label: "Pro", desc: "Activité régulière" },
];

export const ACTIVITY = [
  { icon: Zap, color: "var(--flash)", title: "Vente Flash — Vélo urbain", meta: "Il y a 2 h", tag: "Publié" },
  { icon: Radar, color: "var(--radar)", title: "Besoin — Cours de guitare", meta: "Hier", tag: "Actif" },
  { icon: MessageCircle, color: "var(--scan)", title: "Réponse à Marc D.", meta: "Hier", tag: "Échange" },
  { icon: CheckCircle2, color: "var(--trust)", title: "Vérification email", meta: "3 jours", tag: "Validé" },
  { icon: ScanSearch, color: "var(--scan)", title: "A consulté 4 services", meta: "Cette semaine", tag: "Découverte" },
];

export const TRUST_ITEMS = [
  { label: "Identité", value: 100 },
  { label: "Transparence", value: 92 },
  { label: "Fiabilité", value: 85 },
];

export const QUICK_ACTIONS = [
  { to: "/flash", label: "Publier Flash", icon: Zap, color: "var(--flash)" },
  { to: "/radar", label: "Créer besoin", icon: Radar, color: "var(--radar)" },
  { to: "/scan", label: "Explorer", icon: ScanSearch, color: "var(--scan)" },
  { to: "/trust", label: "Trust Hub", icon: ShieldCheck, color: "var(--trust)" },
] as const;

export const SETTINGS = [
  { icon: Pencil, label: "Modifier profil" },
  { icon: Lock, label: "Confidentialité" },
  { icon: Bell, label: "Préférences" },
  { icon: Eye, label: "Sécurité" },
];
