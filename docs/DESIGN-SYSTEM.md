# Dolk Real Estate Management BV — identité visuelle

La palette globale est définie dans `tailwind.config.ts`, avec les mêmes couleurs de base dans les variables CSS de `app/globals.css`.

| Usage | Couleur |
| --- | --- |
| Marque, navigation, surfaces sombres | Émeraude `#064E3B` |
| Surfaces secondaires, décoration | Sauge `#A3B18A` |
| Fond | Blanc cassé `#FAF9F6` |
| Texte principal | Charbon `#18181B` |
| Actions principales et accents | Champagne `#D4AF75` |

`emerald`, `sage` et `champagne` sont les nouveaux tokens explicites. Les familles historiques `ink`, `canal`, `brick` et `sand` restent disponibles avec les nouvelles teintes pour couvrir les pages et états existants sans modifier leurs contrats. Les erreurs et suppressions restent rouges ; les statuts disposent de nuances sémantiques.

Les titres publics utilisent une famille éditoriale Georgia/Palatino ; le texte et les contrôles utilisent les polices système Avenir/Segoe UI/Arial. Aucun téléchargement Google Fonts n'est nécessaire. Les champs, cartes, boutons, modales, filtres, pages légales, états vides et listes administratives partagent les styles globaux. Les cartes immobilières conservent les images, favoris, statuts et liens existants.

L'administration dispose d'une sidebar émeraude, d'un fil de navigation, de statistiques liées aux listes réelles et de tableaux avec défilement horizontal interne si nécessaire. Les variantes mobiles conservent les actions existantes. Les animations CSS et Framer Motion respectent la préférence de mouvement réduit.

La refonte ne modifie pas les schémas SQL, les requêtes Supabase, les API, les actions de réservation/visite, les paiements ou l'authentification. Seule la présentation du modèle d'e-mail est harmonisée. Le test existant de tri des photos charge désormais sa dépendance native `node:crypto`.

Validation locale : compilation de production, TypeScript et 16 tests unitaires ; réponses HTTP 200 sur 20 routes publiques/admin ; contrôle Chrome de l'accueil, du contact, de la connexion, du dashboard, des annonces et des paramètres, avec largeurs de 390 et 1440 pixels. Aucun débordement de page constaté sur les écrans contrôlés, menus public/admin fonctionnels. La base consultée ne contenait pas d'annonces affichables : les cartes avec photos, détails de biens et formulaires liés à un bien nécessitent encore une vérification avec une annonce réelle. Aucune donnée de test n'a été insérée et aucun envoi d'e-mail ou paiement n'a été effectué.
