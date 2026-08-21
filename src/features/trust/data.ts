/**
 * Donnees du domaine "trust".
 * Contenu affiche par les ecrans : titres, libelles, listes de demo.
 * Modifier ici pour changer les textes/valeurs, sans toucher a l'interface.
 */
import { Activity, Award, BadgeCheck, CheckCircle2, Clock, Eye, FileCheck, ImageIcon, ShieldCheck, Sparkles, Zap } from "lucide-react";

export const PROFILE = {
  name: "Atelier Léa Moreau",
  handle: "@lea.atelier",
  role: "Service de couture · Paris 11e",
  score: 92,
  status: "Fiable",
};

export const SCORES = [
  { label: "Fiabilité", value: 94 },
  { label: "Activité", value: 88 },
  { label: "Transparence", value: 96 },
  { label: "Réactivité", value: 90 },
];

export const VERIFICATIONS = [
  { label: "Identité vérifiée", icon: BadgeCheck, ok: true },
  { label: "Activité confirmée", icon: CheckCircle2, ok: true },
  { label: "Informations complètes", icon: FileCheck, ok: true },
  { label: "Historique actif", icon: Activity, ok: true },
];

export const BADGES = [
  { label: "Verified", icon: BadgeCheck },
  { label: "Active", icon: Activity },
  { label: "Trusted", icon: ShieldCheck },
  { label: "Professional", icon: Award },
];

export const INDICATORS = [
  { label: "Réponse moyenne", value: "< 1h", pct: 92, icon: Zap },
  { label: "Satisfaction", value: "98%", pct: 98, icon: Sparkles },
  { label: "Transparence infos", value: "Complète", pct: 96, icon: Eye },
  { label: "Activité récente", value: "Aujourd'hui", pct: 88, icon: Clock },
];

export const FEEDBACKS = [
  { name: "Maya R.", text: "Travail soigné, communication parfaite.", tags: ["professionnel", "clair"] },
  { name: "Tom B.", text: "Très rapide, exactement ce que je cherchais.", tags: ["rapide", "fiable"] },
  { name: "Inès D.", text: "Conseils précis et délais respectés.", tags: ["professionnel", "fiable"] },
];

export const PROOFS = [
  { label: "Certification métier", icon: Award },
  { label: "Pièce d'identité", icon: BadgeCheck },
  { label: "Atelier — photo", icon: ImageIcon },
  { label: "Assurance pro", icon: FileCheck },
];

export const TIMELINE = [
  { when: "Aujourd'hui", text: "Profil mis à jour" },
  { when: "Hier", text: "Nouvelle interaction confirmée" },
  { when: "3 j", text: "Vérification d'identité renouvelée" },
  { when: "1 sem", text: "Certification ajoutée" },
];

export const TRANSPARENCY = [
  { label: "Disponibilité", value: "Lun–Sam" },
  { label: "Horaires", value: "9h – 19h" },
  { label: "Délai moyen", value: "2 jours" },
  { label: "Politique", value: "Retour 14j" },
];
