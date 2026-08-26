# Domaine : Messages (/messages)

Tout ce qui concerne cette page vit dans ce dossier. La page elle-meme
(`src/routes/messages.tsx`) ne fait qu'assembler les blocs ci-dessous.

## `data.ts` — les contenus

Textes, listes, chiffres affiches par la page. **C'est ici qu'on modifie
un titre, un prix, un libelle** — sans toucher au code d'affichage.

## `components/` — les briques du domaine

Petits elements utilises par les sections :

- `ActionIcon.tsx`
- `ChatScreen.tsx`
- `ContextBadge.tsx`
- `ContextPanel.tsx`
- `ConvItem.tsx`
- `EmptyState.tsx`
- `HubIcon.tsx`
- `Inbox.tsx`
- `ReadIcon.tsx`
- `StatusDot.tsx`
- `TrustChip.tsx`

## Regle

- Les donnees restent dans `data.ts`.
- Les composants ne contiennent que de l'affichage.
