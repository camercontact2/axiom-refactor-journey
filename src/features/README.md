# `src/features` — un dossier par page / domaine

L'application est decoupee par **domaine metier**. Chaque domaine correspond a
une page de l'app et contient tout ce qui la concerne :

```text
src/features/<domaine>/
  README.md      -> explique le domaine
  data.ts(x)     -> les CONTENUS (textes, listes, chiffres)
  sections/      -> les grands blocs visibles de la page
  components/    -> les petites briques utilisees par les sections
```

| Domaine | Page | Ce qu'on y trouve |
| --- | --- | --- |
| `home` | `/` | accueil, hero, feed, temoignages |
| `flash` | `/flash` | publication express + scan de proximite |
| `radar` | `/radar` | recherche d'intentions et matching |
| `scan` | `/scan` | exploration autour de soi |
| `trust` | `/trust` | score de confiance, verifications |
| `talents` | `/talents` | espace talents & savoir-faire |
| `creation` | `/creation` | espace de creation, projets, studios |
| `messages` | `/messages` | conversations |
| `notifications` | `/notifications` | alertes |
| `profile` | `/profile` | profil utilisateur |

## Le reste de l'app

| Dossier | Role |
| --- | --- |
| `src/routes/` | une page = un fichier ; le fichier assemble seulement des blocs |
| `src/components/ui/` | briques generiques (boutons, dialogues…) — ne pas modifier |
| `src/components/ui-kit/` | briques maison partagees par plusieurs domaines |
| `src/components/ds/` | design system (typographie, cartes, champs) |
| `src/components/layout/` | coquille de l'app : barre du haut, dock, menus |
| `src/lib/` | donnees et utilitaires partages (messages, notifications, prefs) |
| `src/hooks/` | logique reutilisable (animations, detection mobile) |

## Comment modifier quelque chose

1. **Changer un texte / un prix** -> `src/features/<domaine>/data.ts`
2. **Changer l'apparence d'un bloc** -> `src/features/<domaine>/sections/<Bloc>.tsx`
3. **Ajouter un bloc a une page** -> creer le fichier dans `sections/`, puis
   l'ajouter dans `src/routes/<page>.tsx`
4. **Changer les couleurs globales** -> `src/styles.css`
