# Domaine : Flash (/flash)

Tout ce qui concerne cette page vit dans ce dossier. La page elle-meme
(`src/routes/flash.tsx`) ne fait qu'assembler les blocs ci-dessous.

## `data.ts` — les contenus

Textes, listes, chiffres affiches par la page. **C'est ici qu'on modifie
un titre, un prix, un libelle** — sans toucher au code d'affichage.

## `components/` — les briques du domaine

Petits elements utilises par les sections :

- `CreateSheet.tsx`
- `Field.tsx`
- `FlashHero.tsx`
- `IntentCards.tsx`
- `MediaUpload.tsx`
- `MyFlashes.tsx`
- `OptionRow.tsx`
- `PreviewCard.tsx`
- `QuickTypes.tsx`
- `RecentFlashes.tsx`
- `ScanConfig.tsx`
- `ScanResults.tsx`
- `Toggle.tsx`

## Regle

- Les donnees restent dans `data.ts`.
- Les composants ne contiennent que de l'affichage.
