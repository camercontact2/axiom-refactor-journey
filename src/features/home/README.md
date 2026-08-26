# Domaine : Accueil (/)

Tout ce qui concerne cette page vit dans ce dossier. La page elle-meme
(`src/routes/index.tsx`) ne fait qu'assembler les blocs ci-dessous.

## `data.ts` — les contenus

Textes, listes, chiffres affiches par la page. **C'est ici qu'on modifie
un titre, un prix, un libelle** — sans toucher au code d'affichage.

## `components/` — les briques du domaine

Petits elements utilises par les sections :

- `CTAJourney.tsx`
- `CommunityPulse.tsx`
- `FeaturesShowcase.tsx`
- `FinalCTA.tsx`
- `HowItWorks.tsx`
- `HubGrid.tsx`
- `LiveStrip.tsx`
- `Opportunities.tsx`
- `QuickFAQ.tsx`
- `RecentActivity.tsx`
- `Reveal.tsx`
- `SmartFeed.tsx`
- `SmartHero.tsx`
- `SmartSuggestions.tsx`
- `Testimonials.tsx`
- `TrustHint.tsx`
- `UseCases.tsx`

## Regle

- Les donnees restent dans `data.ts`.
- Les composants ne contiennent que de l'affichage.
