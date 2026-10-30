# `src/features` — un dossier par page / domaine

L'application est découpée par domaine métier. Chaque feature correspond à une page ou à un sous-domaine fonctionnel, et est responsable de tout son contexte : données, composants, logique, accès serveur, et états.

```text
src/features/<domaine>/
  README.md      -> explique la feature et ses règles
  data.ts(x)     -> contenus éditables, labels, listes, mock data, config visible
  model.ts       -> types métier et règles de validation de domaine
  hooks/         -> logique réutilisable locale à la feature
  components/    -> briques de présentation uniquement
  sections/      -> grands blocs de page, assemblage de composants feature
  server/        -> appels sécurisés, fetch, IA, DB, providers
  utils/         -> helpers locaux de feature
```

## Règles de conception

1. Une feature ne doit pas dépendre directement de la route.
   - les routes ne doivent pas contenir la logique métier,
   - les pages ne doivent pas ouvrir des appels API directement,
   - les composants ne doivent pas décider seuls des règles de sécurité.

2. Une feature doit avoir une responsabilité claire.
   - `data.ts` = contenus statiques et labels
   - `model.ts` = types/domain rules
   - `hooks/` = logique locale réutilisable
   - `components/` = rendu UI
   - `server/` = accès aux données et services externes
   - `sections/` = blocs de page

3. On ne mélange pas les couches.
   - rendu + métier + accès réseau + IA dans le même fichier = anti-pattern
   - si un composant a besoin d’une règle métier, elle doit être dans un hook, un utilitaire ou un service

4. Les services externes sont serveur-only.
   - appels Supabase, AI, données protégées, permissions, provider access
   - pas de fetch direct depuis un composant de présentation

5. Les routes doivent rester légères.
   - route = déclaration du chemin + métadonnées + composition d’une page feature
   - route ne doit pas contenir de logique de filtrage, de matching, de validation métier ou d’accès de données

## Liste des features actives

| Domaine | Page | Ce qu'on y trouve |
| --- | --- | --- |
| `home` | `/` | accueil, hero, hubs, CTA |
| `flash` | `/flash` | publication express + scan de proximité |
| `radar` | `/radar` | recherche d'intentions et matching |
| `scan` | `/scan` | exploration autour de soi |
| `trust` | `/trust` | score de confiance et vérifications |
| `talents` | `/talents` | espace talents & savoir-faire |
| `creation` | `/creation` | espace de création, projets, studios |
| `messages` | `/messages` | conversations |
| `notifications` | `/notifications` | alertes |
| `profile` | `/profile` | profil utilisateur |
| `auth` | `/auth` | connexion / inscription |
| `admin` | `/admin` | administration |

## Le reste de l'app

| Dossier | Rôle |
| --- | --- |
| `src/routes/` | une route = un fichier ; il assemble la page feature et les métadonnées |
| `src/components/ui/` | briques génériques de base (boutons, dialogues, inputs) |
| `src/components/ui-kit/` | briques maison réutilisées par plusieurs features |
| `src/components/layout/` | coque app : barre du haut, dock, navigation |
| `src/lib/` | utilitaires partagés, types transverses et petites abstractions |
| `src/hooks/` | hooks globaux, réutilisés à l'échelle de l'app |

## Comment modifier quelque chose

1. Changer un texte / un prix -> `src/features/<domaine>/data.ts` ou `data.tsx`
2. Modifier l'apparence d'un bloc -> `src/features/<domaine>/sections/<Bloc>.tsx`
3. Ajouter un bloc à une page -> créer le fichier dans `sections/`, puis l'ajouter dans la page feature
4. Changer la logique de calcul / métier -> `src/features/<domaine>/hooks/` ou `model.ts`
5. Ajouter un appel API, IA ou DB -> `src/features/<domaine>/server/`
6. Changer les couleurs globales -> `src/styles.css`

## Règle d’or

“Aucun fichier de route ne doit contenir du code de domaine. Un fichier de route ne doit pas devenir une page monolithique.”
