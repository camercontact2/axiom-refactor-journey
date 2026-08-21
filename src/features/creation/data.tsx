/**
 * Donnees du domaine "creation".
 * Contenu affiche par les ecrans : titres, libelles, listes de demo.
 * Modifier ici pour changer les textes/valeurs, sans toucher a l'interface.
 */
import { Camera, Compass, Film, Flame, GraduationCap, Lightbulb, MessageCircle, Music2, Palette, PenTool, Plus, Rocket, Sparkles, Users, Zap } from "lucide-react";

export const ACCENT = "var(--flash)";

export const STUDIOS = [
  {
    icon: PenTool,
    label: "Écriture",
    count: 12,
    hint: "Récits, poésie, BD",
    summary:
      "Tu poses des mots ? Ici on écrit à plusieurs, on se relit, on publie des fanzines et des recueils.",
    steps: [
      "Choisis un format (court, série, collectif).",
      "Lance un appel à plumes ou rejoins-en un.",
      "Publie chapitre par chapitre, à ton rythme.",
    ],
  },
  {
    icon: Palette,
    label: "Arts visuels",
    count: 18,
    hint: "Illustration, peinture",
    summary:
      "Illustrateur·rices, peintres, graphistes : monte un projet, partage tes WIP, trouve un binôme.",
    steps: [
      "Présente ta direction artistique en 3 visuels.",
      "Indique ce que tu cherches (collab, modèle, lieu).",
      "Avance par jalons visibles par la commu.",
    ],
  },
  {
    icon: Camera,
    label: "Photo",
    count: 9,
    hint: "Reportage, portraits",
    summary:
      "Du reportage de quartier aux séries portrait : trouve modèles, lieux et regards complices.",
    steps: [
      "Décris ta série en une intention forte.",
      "Lance un casting modèles/lieux dans ton coin.",
      "Publie 3 planches, recueille les retours.",
    ],
  },
  {
    icon: Music2,
    label: "Musique",
    count: 14,
    hint: "Compo, live, prod",
    summary:
      "Compose, enregistre, joue. Trouve un·e batteur·euse, un·e ingé son ou juste un studio dispo.",
    steps: [
      "Démarre une session (démo, EP, live).",
      "Recrute les rôles manquants en un post.",
      "Programme une répète ou un live de quartier.",
    ],
  },
  {
    icon: Film,
    label: "Vidéo",
    count: 7,
    hint: "Court-métrage, doc",
    summary:
      "Court-métrages, docus, capsules : monte une équipe régie, son, image et tourne près de chez toi.",
    steps: [
      "Pitch en 5 lignes + intention visuelle.",
      "Forme l'équipe (réa, image, son, régie).",
      "Diffuse en projection locale ou en ligne.",
    ],
  },
  {
    icon: Lightbulb,
    label: "Idées",
    count: 23,
    hint: "Concepts, prototypes",
    summary:
      "Un concept en tête mais pas encore d'équipe ? Pose-le ici, regarde qui mord.",
    steps: [
      "Décris l'idée en 2 lignes, sans filtre.",
      "Tag les compétences que tu cherches.",
      "Affine au fil des retours, transforme en projet.",
    ],
  },
];

export const PROJECTS = [
  {
    title: "Fanzine collectif — N°3",
    by: "Studio Atelier 9",
    members: 6,
    status: "Ouvert",
    needs: ["Illustrateur·rice", "Relecture"],
    summary:
      "Troisième numéro du fanzine du quartier : 32 pages, thème « voisinages ». Sortie papier + numérique en mars.",
    steps: [
      "Lecture du brief + appel à contributions.",
      "Atelier maquette commune un samedi.",
      "Impression locale + lancement en librairie.",
    ],
  },
  {
    title: "EP acoustique — sessions home",
    by: "Léna B.",
    members: 2,
    status: "Recrute",
    needs: ["Batteur·euse", "Mix"],
    summary:
      "5 morceaux folk enregistrés en home studio. Cherche batteur·euse doux·ce et un·e ingé mix sensible.",
    steps: [
      "Écoute des démos partagées en privé.",
      "Une répète + une session d'enregistrement.",
      "Mix collaboratif, sortie sur les plateformes.",
    ],
  },
  {
    title: "Court-métrage — quartier vivant",
    by: "Collectif Plein Cadre",
    members: 8,
    status: "En tournage",
    needs: ["Régie", "Son"],
    summary:
      "Fiction de 15 min sur une journée dans un marché de quartier. Tournage en cours, postprod prévue cet été.",
    steps: [
      "Reprise des tournages les week-ends.",
      "Postprod son/image en juillet.",
      "Projection locale + festivals d'automne.",
    ],
  },
];

export const LIVE_ITEMS = [
  { icon: <Flame className="h-3 w-3" />, text: "Léna cherche un batteur pour ce week-end" },
  { icon: <Zap className="h-3 w-3" />, text: "Tournage live — Plein Cadre, ce soir 20h" },
  { icon: <Sparkles className="h-3 w-3" />, text: "Fanzine N°3 : 4 contributions reçues aujourd'hui" },
  { icon: <Rocket className="h-3 w-3" />, text: "2 nouveaux studios viennent d'ouvrir" },
  { icon: <Flame className="h-3 w-3" />, text: "Casting illustration — réponse avant vendredi" },
];

export const STEPS = [
  {
    icon: Lightbulb,
    title: "Balance l'idée",
    desc: "Deux lignes, même brouillon. L'important c'est que ça sorte.",
    step: "01",
    summary:
      "On démarre toujours par une intention brute. Pas besoin de plan parfait, juste de la sincérité.",
    detailSteps: [
      "Donne un titre de travail (ça peut changer).",
      "Écris 2 lignes : pourquoi ce projet, maintenant.",
      "Coche les rôles que tu cherches.",
    ],
  },
  {
    icon: Users,
    title: "Monte l'équipe",
    desc: "Trouve les bonnes mains, les bons mentors, les bonnes oreilles.",
    step: "02",
    summary:
      "L'équipe se construit petit à petit, au fil des messages et des premières répètes.",
    detailSteps: [
      "Publie un appel clair (rôle, dispo, lieu).",
      "Discute en DM avec les candidat·es.",
      "Valide une équipe noyau et démarre.",
    ],
  },
  {
    icon: Rocket,
    title: "Envoie",
    desc: "Publie une étape, montre l'avancée, fais grandir ton truc.",
    step: "03",
    summary:
      "Chaque étape publiée attire des regards, du feedback, parfois de nouveaux contributeurs.",
    detailSteps: [
      "Choisis un format de partage (photo, audio, texte).",
      "Publie l'étape avec un mot sur le contexte.",
      "Réponds aux retours, itère, recommence.",
    ],
  },
];

export const INSPIRATIONS = [
  {
    tag: "Fanzine",
    title: "Voix du marché",
    by: "Atelier 9 · Marseille",
    quote: "On a édité 200 exemplaires en 3 semaines.",
  },
  {
    tag: "Musique",
    title: "Nuit kora & beats",
    by: "Sékou × Yann · Lyon",
    quote: "Rencontre dans un cercle, EP six mois plus tard.",
  },
  {
    tag: "Photo",
    title: "Portraits d'immeuble",
    by: "Inès D. · Nantes",
    quote: "12 voisins, 12 portraits, une expo dans le hall.",
  },
  {
    tag: "Vidéo",
    title: "Le dernier kiosque",
    by: "Plein Cadre · Aubervilliers",
    quote: "Doc de 8 min, primé au festival local.",
  },
  {
    tag: "Écriture",
    title: "Lettres au quartier",
    by: "Collectif Plume",
    quote: "Une lettre par semaine, lue à voix haute.",
  },
];

export const FAQ = [
  {
    q: "Faut un niveau pour se lancer ?",
    a: "Non. Sérieux. Tu peux débarquer avec une idée brute et zéro réseau — la communauté est faite pour ça.",
  },
  {
    q: "C'est payant ?",
    a: "Créer un projet, rejoindre une équipe, publier des étapes : 100% gratuit. Si tu veux monter un projet rémunéré, c'est toi qui fixes les règles.",
  },
  {
    q: "Comment je trouve les bonnes personnes ?",
    a: "Décris ce que tu cherches en une phrase claire. Plus c'est précis (rôle, dispo, ville), plus les bons profils répondent.",
  },
  {
    q: "Je peux rester anonyme au début ?",
    a: "Oui, tu peux publier sous pseudo et révéler ton identité aux gens avec qui tu connectes en DM.",
  },
  {
    q: "Et si mon projet n'aboutit pas ?",
    a: "C'est la vie. Tu archives, tu en lances un autre, tu réutilises l'équipe. Aucun jugement, juste du mouvement.",
  },
];

export const RESOURCES = [
  {
    icon: GraduationCap,
    title: "Talents & savoirs",
    desc: "Chope un geste, trouve un mentor pour ton projet.",
    to: "/talents",
    label: "Explorer",
  },
  {
    icon: Compass,
    title: "Radar local",
    desc: "Vois les studios et ateliers qui bougent autour de toi.",
    to: "/radar",
    label: "Ouvrir le radar",
  },
  {
    icon: MessageCircle,
    title: "Messages",
    desc: "Tape direct un collectif ou un porteur de projet.",
    to: "/messages",
    label: "Mes messages",
  },
] as const;
