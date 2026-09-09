/**
 * Donnees du domaine "trust".
 * Aucune donnee inventee : les listes reelles sont vides tant que
 * l'utilisateur n'a rien verifie / recu. Les catalogues ci-dessous
 * decrivent ce qui EXISTE dans le produit (badges, criteres), pas des faits.
 */
import { Activity, Award, BadgeCheck, CheckCircle2, FileCheck, ShieldCheck } from "lucide-react";

/** Criteres de verification disponibles + etat reel (aucun valide au depart). */
export const VERIFICATIONS: { label: string; icon: typeof BadgeCheck; ok: boolean }[] = [
  { label: "Identité vérifiée", icon: BadgeCheck, ok: false },
  { label: "Activité confirmée", icon: CheckCircle2, ok: false },
  { label: "Informations complètes", icon: FileCheck, ok: false },
  { label: "Historique actif", icon: Activity, ok: false },
];

/** Catalogue des badges que l'on peut obtenir. */
export const BADGES = [
  { label: "Verified", icon: BadgeCheck },
  { label: "Active", icon: Activity },
  { label: "Trusted", icon: ShieldCheck },
  { label: "Professional", icon: Award },
];

/** Indicateurs reels. Vides tant qu'il n'y a pas assez d'activite. */
export const INDICATORS: { label: string; value: string; pct: number; icon: typeof Activity }[] = [];

/** Retours reels recus par l'utilisateur. */
export const FEEDBACKS: { name: string; text: string; tags: string[] }[] = [];

/** Preuves reellement deposees par l'utilisateur. */
export const PROOFS: { label: string; icon: typeof Award }[] = [];

/** Historique reel du compte. */
export const TIMELINE: { when: string; text: string }[] = [];

/** Informations publiques reellement renseignees par l'utilisateur. */
export const TRANSPARENCY: { label: string; value: string }[] = [];
