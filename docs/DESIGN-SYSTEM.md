# Vastgoed Beheer B.V. — Dutch Luxury Minimalist

Refonte progressive de l’application Next.js existante. Les schémas, identifiants, valeurs métier, accès Supabase et parcours de visite/réservation sont conservés.

| Usage | Couleur |
| --- | --- |
| Fond | Ivoire `#F7F5F0` |
| Identité, navigation, actions | Vert sapin `#173D35` |
| Texte principal | Anthracite `#202623` |
| Accents | Champagne `#C5A77D` |

Les familles historiques de tokens Tailwind restent disponibles. Les erreurs et statuts gardent leurs couleurs sémantiques. Le favicon et le symbole de marque existants adoptent le vert sapin.

Manrope est utilisée pour les textes et contrôles ; Cormorant Garamond pour les titres, avec sa véritable italique. Les fichiers variables WOFF2 sont locaux (`public/fonts`), préchargés par `next/font/local` avec `display: swap`. Les licences SIL Open Font License sont jointes. Sources : Google Fonts (licences), distributions Fontsource Variable (WOFF2 latin). Aucune requête Google Fonts n’est nécessaire à l’exécution.

L’accueil utilise une photographie provenant des images de l’un des logements Supabase affichés. Son titre, sa ville et un lien vers la fiche identifient le logement photographié. Les photographies des cartes et des villes proviennent de leurs propres relations Supabase. Aucun visuel de stock ou généré n’est ajouté. Les statistiques d’accueil sont calculées à partir des logements publiés. Les liens sociaux sans destination ont été retirés.

Les 50 textes d’avis et les noms fournis sont conservés dans `lib/data/testimonials.ts`. Leur statut `verified` est initialement faux : aucun justificatif ou lien de vérification n’a été fourni. Seuls les avis vérifiés sont affichés. Ne passer un avis à `verified: true` qu’après validation de son origine et de son attribution ; ne pas attribuer automatiquement cinq étoiles à un avis sans note vérifiée.

Les cartes, mosaïques et sections éditoriales utilisent les mêmes routes et composants. Les libellés publics, administratifs, erreurs de formulaire et retours des actions ont été traduits en néerlandais. Les valeurs françaises historiques enregistrées (types de contrats, meublé, statuts) sont traduites à l’affichage, sans migration des données ou changement des clés de formulaire.

Motion (`framer-motion`, déjà installé) gère la parallaxe limitée à 36 px, les révélations légères et les transitions du carrousel. Le carrousel avance toutes les 5 secondes quand il est visible. Il s’arrête au survol, au focus, dans un onglet masqué ou sous `prefers-reduced-motion`. Les commandes manuelles et un bouton pause/reprise restent accessibles. Les images bénéficient d’un zoom CSS discret. Les révélations gardent une opacité initiale de 1 dans le HTML rendu ; le routage et le streaming Next.js existants sont conservés.

L’en-tête reste sticky ; le menu conserve la fermeture au clavier. Un lien d’évitement, les associations label/champ et les noms accessibles des contrôles ont été ajoutés. Les pages, métadonnées et données structurées existantes sont conservées ; le titre et l’URL canonique d’accueil sont explicites.

Les vérifications de cette version sont consignées dans `docs/DESIGN-QA.md`. Une compilation locale ne valide pas un déploiement en production ni une opération bancaire réelle.
