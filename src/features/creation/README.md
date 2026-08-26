# Domaine : Création (/creation)

Tout ce qui concerne cette page vit dans ce dossier. La page elle-meme
(`src/routes/creation.tsx`) ne fait qu'assembler les blocs ci-dessous.

## `data.ts` — les contenus

Textes, listes, chiffres affiches par la page. **C'est ici qu'on modifie
un titre, un prix, un libelle** — sans toucher au code d'affichage.

## `sections/` — les grands blocs de la page

Un fichier = une section visible :

- `FaqAccordionSection.tsx`
- `FooterNavSection.tsx`
- `HeroSection.tsx`
- `InspirationsCarouselSection.tsx`
- `NouveauProjetSection.tsx`
- `ProjectsSection.tsx`
- `ResourcesSection.tsx`
- `StepsSection.tsx`
- `StudiosSection.tsx`

## Regle

- Les donnees restent dans `data.ts`.
- Les composants ne contiennent que de l'affichage.
