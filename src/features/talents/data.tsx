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
  { label: "Artisanat", count: 42, icon: Palette, hint: "Bois, cuir, poterie, couture — tout ce qui se fait avec les mains." },
  { label: "Musique", count: 28, icon: Sparkles, hint: "Instruments, chant, prod, traditions vivantes." },
  { label: "Cuisine", count: 31, icon: Heart, hint: "Recettes du bled, street food, pâtisseries de famille." },
  { label: "Langues", count: 19, icon: BookOpen, hint: "Wolof, créole, arabe, anglais — apprends à la cool." },
  { label: "Bien-être", count: 24, icon: ShieldCheck, hint: "Yoga, massages, plantes, soins traditionnels." },
  { label: "Nature & jardin", count: 17, icon: Compass, hint: "Permaculture, balcons vivants, cueillette urbaine." },
  { label: "Sports doux", count: 14, icon: Users, hint: "Marche, danse, qi gong, mouvement libre." },
  { label: "Récits & mémoire", count: 9, icon: BookOpen, hint: "Contes, histoires de famille, mémoire du quartier." },
];

export const FEATURED = [
  {
    name: "Atelier poterie raku",
    by: "Claire M.",
    city: "Lyon",
    tag: "Artisanat",
    rating: 4.9,
    when: "Sam. 14h",
    duration: "2h",
    price: "Libre — 15€ suggéré",
    summary:
      "Une après-midi les mains dans la terre avec Claire, céramiste depuis 12 ans. Tu repars avec ta pièce, cuite à la mode raku.",
    steps: [
      "Accueil thé & présentation des pièces.",
      "Tournage / modelage guidé selon ton niveau.",
      "Cuisson raku en direct — magie garantie.",
    ],
  },
  {
    name: "Cours de kora & griotique",
    by: "Sékou D.",
    city: "Marseille",
    tag: "Musique",
    rating: 4.8,
    when: "Mer. 18h",
    duration: "1h30",
    price: "Solidaire",
    summary:
      "Sékou partage la kora et l'art du griot : un instrument, mille histoires. Aucun niveau requis, juste l'envie d'écouter.",
    steps: [
      "Démo et histoire de l'instrument.",
      "Premières notes, posture, respiration.",
      "On joue ensemble un motif traditionnel.",
    ],
  },
  {
    name: "Cuisine de mamie Jeanne",
    by: "Jeanne R.",
    city: "Aix",
    tag: "Cuisine",
    rating: 5.0,
    when: "Dim. 11h",
    duration: "3h + repas",
    price: "12€ (ingrédients)",
    summary:
      "Jeanne, 78 ans, ouvre sa cuisine pour transmettre ses recettes provençales. On cuisine, on mange, on raconte.",
    steps: [
      "Marché ensemble au coin de la rue (optionnel).",
      "Préparation à 4 mains des plats du jour.",
      "On passe à table — c'est là que tout se dit.",
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote: "Franchement, j'ai retrouvé le kiff de transmettre ce que ma mère m'a appris.",
    author: "Awa, 62 ans — Toulouse",
  },
  {
    quote: "Trois ateliers, trois belles rencontres. Et tout ça à 10 min de chez moi.",
    author: "Hugo, 29 ans — Nantes",
  },
];
