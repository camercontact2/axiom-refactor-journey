# VITALA — Route vers la production (100/100, 5M+ utilisateurs)

Aujourd'hui VITALA est une belle maquette : 10 pages, un design system, des
données de démonstration en dur, aucune base de données, aucun compte
utilisateur. Le plan ci-dessous transforme cette maquette en produit réel,
étape par étape. Chaque étape est autonome, testable, et livrable seule.

## Phase 0 — Fondations backend (étapes 1 à 5)

1. **Activer Lovable Cloud** — base de données, comptes, stockage de fichiers
   et code serveur intégrés. Aucune configuration externe.
2. **Comptes utilisateurs** — inscription/connexion e-mail + mot de passe,
   page `/auth`, déconnexion, session persistante, zone privée protégée.
3. **Profils** — table `profiles` (nom, ville, avatar, bio), création
   automatique à l'inscription, page `/profile` branchée sur les vraies
   données.
4. **Rôles & permissions** — table de rôles séparée (`user`, `moderator`,
   `admin`) + fonction de vérification côté serveur. Base de toute la
   modération.
5. **Sécurité des données (RLS)** — chaque table verrouillée : on ne lit et
   n'écrit que ce qui nous appartient. Politiques + droits d'accès explicites.

## Phase 1 — Le cœur métier (étapes 6 à 13)

6. **Flash — modèle de données** — table des annonces (type, titre, prix,
   lieu, durée, expiration, statut) + droits d'accès.
7. **Flash — publication** — le formulaire existant écrit réellement en base,
   validation des champs, retour d'erreur clair.
8. **Flash — lecture** — fil des annonces récentes, « Mes flashs », édition,
   suppression, expiration automatique.
9. **Médias** — upload d'images (annonces, avatars) avec compression,
   miniatures et limites de taille.
10. **Radar — besoins** — table des intentions/veilles, création, activation,
    désactivation.
11. **Radar — matching** — moteur de correspondance besoin ↔ annonce
    (mots-clés + catégorie + distance), exécuté côté serveur.
12. **Scan — géolocalisation** — coordonnées sur les annonces, recherche par
    rayon, tri par distance, autorisation navigateur gérée proprement.
13. **Trust — score de confiance** — vérifications (e-mail, téléphone,
    identité), avis entre utilisateurs, calcul du score côté serveur.

## Phase 2 — Interactions & vie sociale (étapes 14 à 19)

14. **Messagerie — données** — conversations et messages en base, liés à une
    annonce ou un besoin.
15. **Messagerie — temps réel** — réception instantanée, indicateur lu/non lu,
    présence en ligne.
16. **Notifications — données** — table + génération automatique (nouveau
    message, match radar, annonce expirée).
17. **Notifications — livraison** — badge temps réel, marquage lu, préférences
    par type.
18. **Talents & Création** — modèles réels pour les profils talents, projets
    et studios, aujourd'hui statiques.
19. **Recherche globale** — recherche plein texte sur annonces, talents et
    projets, avec index base de données.

## Phase 3 — Confiance, sûreté, conformité (étapes 20 à 23)

20. **Signalement & modération** — bouton signaler, file de modération pour
    les admins, blocage d'utilisateur.
21. **Anti-abus** — limitation du nombre de publications/messages par heure,
    détection de spam, protection des endpoints publics.
22. **RGPD** — pages Confidentialité et CGU, consentement, export et
    suppression de compte.
23. **Audit de sécurité complet** — scan, correction de chaque alerte, revue
    des politiques d'accès et des secrets.

## Phase 4 — Performance & montée en charge (étapes 24 à 28)

24. **Index & requêtes** — index sur toutes les colonnes filtrées/triées,
    suppression des requêtes N+1.
25. **Pagination** — listes infinies par curseur (annonces, messages,
    notifications) au lieu de tout charger.
26. **Chargement des pages** — préchargement par intention déjà en place,
    étendu : squelettes, images en AVIF/WebP, découpe du code par route.
27. **Budget de performance** — mesure Lighthouse/Core Web Vitals sur les 10
    pages, objectif LCP < 2,5 s, correction des écarts.
28. **Résilience** — pages d'erreur, mode hors-ligne, réessai automatique,
    surveillance des erreurs en production.

## Phase 5 — Finition & lancement (étapes 29 à 32)

29. **Qualité du code** — extraction des dernières données factices, typage
    strict, lint zéro avertissement, README par domaine à jour.
30. **Tests** — tests unitaires sur les règles métier, tests de bout en bout
    Playwright sur les 6 parcours clés (inscription, publier, chercher,
    contacter, noter, modérer).
31. **SEO & partage** — métadonnées par page, images de partage, sitemap,
    données structurées, page 404 utile.
32. **Mise en production** — publication, domaine personnalisé, tableau de
    bord analytics, checklist finale de lancement.

## Notes techniques

- Backend : Lovable Cloud (Postgres + auth + stockage). Logique serveur en
  fonctions serveur TanStack Start ; endpoints publics uniquement pour les
  webhooks.
- Sécurité : rôles dans une table dédiée, RLS sur 100 % des tables, aucun
  secret côté navigateur.
- Scalabilité : pagination par curseur, index ciblés, cache client
  stale-while-revalidate déjà en place, temps réel limité aux canaux utiles.
- Chaque étape se termine par : typecheck + tests verts + vérification
  visuelle de la page concernée.

## Ordre recommandé

Les étapes 1 à 5 sont bloquantes : rien de réel n'est possible sans compte ni
base. Ensuite Flash (6-9) donne le premier parcours complet et démontrable.
Les phases suivantes peuvent être réordonnées selon tes priorités business.
