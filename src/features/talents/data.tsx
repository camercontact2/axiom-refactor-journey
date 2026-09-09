/**
 * Donnees du domaine "talents".
 * Contenu affiche par les ecrans : titres, libelles, listes de demo.
 * Modifier ici pour changer les textes/valeurs, sans toucher a l'interface.
 */
import { BookOpen, Compass, Flame, GraduationCap, Heart, Palette, ShieldCheck, Sparkles, Users, Zap } from "lucide-react";

export const ACCENT = "var(--radar)";

export const PILLARS = [
  {
    icon: GraduationCap,
    title: "Apprendre",
    desc: "Va choper un savoir-faire chez quelqu'un du coin. Pas de fioritures, du vrai.",
    cta: "Trouver un atelier",
    summary:
      "Trouve un mentor ou un atelier près de chez toi et apprends en vrai, dans les mains.",
    steps: [
      "Choisis une catégorie qui te parle (musique, cuisine, artisanat…).",
      "Réserve une session gratuite ou solidaire avec un talent local.",
      "Repars avec un savoir-faire et une nouvelle connexion humaine.",
    ],
    cta2: "Voir les catégories",
  },
  {
    icon: Heart,
    title: "Transmettre",
    desc: "T'as un truc dans les mains ou dans la tête ? Passe-le. Le quartier en a besoin.",
    cta: "Proposer un savoir",
    summary:
      "Toi aussi t'as un geste, une recette, une histoire à passer. On t'aide à monter ta fiche en 3 minutes.",
    steps: [
      "Décris ton savoir en deux lignes — même brouillon.",
      "Indique tes dispos et ton lieu (chez toi, en plein air, peu importe).",
      "On te connecte avec les premiers curieux du quartier.",
    ],
    cta2: "Créer ma fiche",
  },
  {
    icon: Users,
    title: "Se rencontrer",
    desc: "Une passion, un cercle, des gens vrais. Rejoins la tribu près de chez toi.",
    cta: "Voir les cercles",
    summary:
      "Les cercles, c'est des petits groupes qui se retrouvent pour pratiquer, débattre, créer.",
    steps: [
      "Ouvre le radar local pour voir les cercles actifs autour de toi.",
      "Rejoins-en un en un clic, sans engagement.",
      "Croise du monde, recommence, recommence encore.",
    ],
    cta2: "Ouvrir le radar",
  },
] as const;

export const LIVE_ITEMS = [
  { icon: <Flame className="h-3 w-3" />, text: "Awa vient d'ouvrir un atelier couture à Toulouse" },
  { icon: <Zap className="h-3 w-3" />, text: "3 places libres ce soir — kora & griotique" },
  { icon: <Sparkles className="h-3 w-3" />, text: "Sékou cherche un apprenti djembé" },
  { icon: <Heart className="h-3 w-3" />, text: "12 nouveaux talents cette semaine" },
  { icon: <Flame className="h-3 w-3" />, text: "Cuisine de mamie Jeanne — complet dimanche" },
];

export const CATEGORIES = [
  { label: "Artisanat", count: 0, icon: Palette, hint: "Bois, cuir, poterie, couture — tout ce qui se fait avec les mains." },
  { label: "Musique", count: 0, icon: Sparkles, hint: "Instruments, chant, prod, traditions vivantes." },
  { label: "Cuisine", count: 0, icon: Heart, hint: "Recettes du bled, street food, pâtisseries de famille." },
  { label: "Langues", count: 0, icon: BookOpen, hint: "Wolof, créole, arabe, anglais — apprends à la cool." },
  { label: "Bien-être", count: 0, icon: ShieldCheck, hint: "Yoga, massages, plantes, soins traditionnels." },
  { label: "Nature & jardin", count: 0, icon: Compass, hint: "Permaculture, balcons vivants, cueillette urbaine." },
  { label: "Sports doux", count: 0, icon: Users, hint: "Marche, danse, qi gong, mouvement libre." },
  { label: "Récits & mémoire", count: 0, icon: BookOpen, hint: "Contes, histoires de famille, mémoire du quartier." },
];

/** Contenu reel des utilisateurs. Vide tant que rien n'a ete publie. */
export const FEATURED: { name: string; by: string; city: string; tag: string; rating: number; when: string; duration: string; price: string; summary: string; steps: string[] }[] = [];

/** Contenu reel des utilisateurs. Vide tant que rien n'a ete publie. */
export const TESTIMONIALS: { quote: string; author: string }[] = [];
