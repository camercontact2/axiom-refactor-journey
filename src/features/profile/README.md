# Domaine : Profil (/profile)

Tout ce qui concerne cette page vit dans ce dossier. La page elle-meme
(`src/routes/profile.tsx`) ne fait qu'assembler les blocs ci-dessous.

## `data.ts` — les contenus

Textes, listes, chiffres affiches par la page. **C'est ici qu'on modifie
un titre, un prix, un libelle** — sans toucher au code d'affichage.

## `sections/` — les grands blocs de la page

Un fichier = une section visible :

- `ActivitySummarySection.tsx`
- `HeroSection.tsx`
- `OnboardingSection.tsx`
- `QuickActionsSection.tsx`
- `QuickStatsSection.tsx`
- `SettingsPreviewSection.tsx`
- `StatusSystemSection.tsx`
- `TrustSnapshotSection.tsx`

## Regle

- Les donnees restent dans `data.ts`.
- Les composants ne contiennent que de l'affichage.
