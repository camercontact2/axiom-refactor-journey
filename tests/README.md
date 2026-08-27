# Tests et vérifications qualité

## 1. Tests rapides (quelques secondes)

```bash
bun run test
```

- `navigation-speed.test.ts` — vérifie que le préchargement au survol (`defaultPreload: "intent"`),
  le scroll restoration et le cache partagé restent activés, qu'aucune page n'utilise `<a href="/...">`
  (ce qui casserait le préchargement) et que chaque page a bien ses métadonnées `head()`.
- `query-cache.test.ts` — vérifie les réglages du cache client (stale-while-revalidate).
- `responsive.test.ts` — interdit les largeurs/polices fixes trop grandes (`w-[600px]`, `min-w-[...]`,
  `text-[48px]`, `w-screen`/`100vw`) qui provoquent un débordement horizontal sur mobile.

Si un test échoue, le message indique le fichier et la classe fautive : remplacez la valeur fixe par
une valeur responsive (`w-full`, `max-w-...`, `text-2xl sm:text-4xl`, ...).

## 2. Vérification navigateur (nav + responsive réels)

Serveur de dev démarré, puis :

```bash
python3 scripts/qa/check_nav_responsive.py
```

Ouvre les 10 pages en 375 / 768 / 1280 px, détecte tout scroll horizontal, remonte les erreurs
JavaScript et mesure le temps de navigation interne entre les pages.
