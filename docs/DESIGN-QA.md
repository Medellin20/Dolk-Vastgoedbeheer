# Vérification locale — 17 novembre 2026

La refonte Dutch Luxury Minimalist est réalisée dans le projet Next.js existant. Aucun schéma SQL, enregistrement Supabase, tarif ou flux d’authentification n’est modifié par cette refonte. Les libellés, valeurs d’affichage et modèles d’e-mail sont néerlandais ; les clés et valeurs métier historiques restent inchangées.

## Contrôles automatisés

- `node --test tests/*.test.cjs` : 26 tests réussis (actions, brouillons, recherche administrateur, photos, notifications, validation et motif de paiement).
- `npm run build` : compilation, vérification TypeScript et génération des 28 pages réussies.
- `git diff --check` : aucune erreur de formatage.
- Polices : fichiers WOFF2 variables locaux avec licences, environ 102 Ko au total pour Manrope et Cormorant Garamond normale/italique.

## Navigateur Chrome local

Largeurs contrôlées : 320, 375, 390, 640, 768, 1 024 et 1 440 pixels. Contrôles des dimensions du document et des éléments, captures d’écran de l’accueil, du catalogue, du contact et d’une fiche réelle. Les vues initiales ont identifié deux débordements (contact à 320 px et statistiques d’accueil à 640 px), corrigés puis revérifiés.

| Groupe | Couverture |
| --- | --- |
| Accueil, liste des villes, catalogue Rotterdam, contact, présentation, fonctionnement, FAQ, trois pages légales, connexion admin | 320 à 1 440 px |
| Fiche d’un logement Supabase, formulaire de visite, formulaire de réservation | 320, 390, 640, 768, 1 024 et 1 440 px |
| Administration authentifiée : tableau de bord, annonces, paramètres, banque, visites, réservations, garanties, remboursements | 390 et 1 440 px |

Les contrôles finaux n’ont relevé aucun débordement horizontal sur ces vues. Les tableaux et carrousels gardent leur propre défilement interne.

Les quatre pages de statuts contenaient des fonctions intermédiaires non sérialisables entre composants serveur/client. Elles passent maintenant les mêmes Server Actions via `bind`, avec les mêmes identifiants et statuts. La page des visites charge correctement après correction. Aucun statut ou réglage n’a été changé durant le contrôle.

## Interactions

- Menu public : ouverture testée aux sept largeurs ; en-tête sticky confirmé.
- Recherche : application de Rotterdam, budget minimum 1 000 et type `studio` ; critères présents dans l’URL et conservés.
- Formulaire de contact vide : messages en néerlandais pour le nom, l’e-mail, le sujet et le message ; aucun envoi.
- Carrousel mobile : passage de `scrollLeft = 0` à `363` après cinq secondes ; pause confirmée à `363`, puis absence de déplacement sous `prefers-reduced-motion`.
- Les essais finaux de navigation publique et administrative n’ont signalé aucune exception JavaScript.
- Les avis existants sans source vérifiée restent conservés dans le code et masqués à l’affichage. Aucune note n’a été inventée.

## Limites

Ces contrôles concernent Chrome local et des largeurs simulées, pas des appareils iOS/Android physiques. Aucun formulaire réel, paiement, envoi d’e-mail, modification d’annonce ou sauvegarde de réglage n’a été déclenché. Le mécanisme de streaming et les écrans de chargement Next.js existants restent en place ; le fonctionnement intégral sans JavaScript n’est pas certifié. Aucun déploiement de production n’a été réalisé.

Les captures et mesures détaillées de cette session sont conservées localement dans `/tmp/vastgoed-luxury-qa/` ; ce répertoire est temporaire et ne fait pas partie du déploiement.
