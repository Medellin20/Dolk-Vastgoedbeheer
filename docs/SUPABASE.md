# Supabase — Dolk Real Estate Management BV

## Ce qui est fourni

Installation initiale complète correspondant aux types et aux requêtes actuelles : 16 tables, 7 enums, clés étrangères, index, horodatages automatiques, sélection de l'image principale, règles RLS et catalogue de 12 équipements. Aucune annonce, aucun client ni justificatif fictif n'est ajouté.

Les fichiers préparent le backend ; ils ne créent pas un compte ou un projet hébergé. Aucun identifiant Supabase n'était configuré dans ce dépôt lors de la préparation.

## Installation sur un projet neuf

1. Créer un projet dans le tableau de bord Supabase, choisir l'organisation, la région et un mot de passe de base fort. Conserver celui-ci dans un gestionnaire de secrets.
2. Copier `.env.example` vers `.env.local`. Dans les réglages du projet, récupérer l'URL et les clés :
   - `NEXT_PUBLIC_SUPABASE_URL` : URL du projet.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` : clé publique anon ou publishable.
   - `SUPABASE_SERVICE_ROLE_KEY` : clé serveur service_role ou secret. Ne jamais lui donner un préfixe `NEXT_PUBLIC_`.
3. Dans SQL Editor, exécuter **dans cet ordre** :
   - `supabase/schema.sql` ;
   - `supabase/rls_policies.sql` ;
   - `supabase/seed.sql`.
4. Exécuter `node scripts/setup-supabase-storage.mjs` à la racine du dépôt. Le script appelle l'API Storage et peut être relancé. Il ajuste la configuration des buckets existants sans supprimer leurs fichiers.
5. Exécuter `supabase/tests/security.sql` dans SQL Editor. Les tests utilisent une transaction annulée en fin de fichier ; aucun exemple n'est conservé. Employer les privilèges du propriétaire pour pouvoir changer de rôle pendant ce test.
6. Choisir `ADMIN_PASSWORD` et `ADMIN_SESSION_SECRET` dans `.env.local`, puis démarrer `npm run dev`. Pour produire un secret : `openssl rand -hex 32`, à conserver uniquement dans la configuration locale ou de l'hébergeur.
7. Configurer les mêmes variables sur l'hébergeur, avec `NEXT_PUBLIC_SITE_URL` égal au domaine réel, puis reconstruire/redéployer.

`schema.sql` et `rls_policies.sql` ciblent une **base neuve** : ne pas les rejouer sur une base existante. Les évolutions devront utiliser des migrations dédiées après sauvegarde. `seed.sql` est rejouable sans écraser les réglages existants.

## Tables et accès

| Table | Fonction | Lecture navigateur |
| --- | --- | --- |
| properties | Annonces, prix, caractéristiques et publication | Annonces publiées |
| property_images | Photos, ordre et image principale | Liées à une annonce publiée |
| amenities | Catalogue d'équipements | Oui |
| property_amenities | Relations annonces/équipements | Liées à une annonce publiée |
| site_settings | Téléphone public, lien de paiement, frais de visite | Ligne unique id=1 |
| clients | Coordonnées clients | Non |
| viewing_requests | Visites, frais et identifiants Stripe | Non |
| reservations | Dossiers de réservation | Non |
| request_submissions | Archives JSON des formulaires | Non |
| guarantee_payments | Garanties et déclarations de virement | Non |
| refund_requests | Remboursements | Non |
| bank_settings | Coordonnées et instructions bancaires | Non |
| contact_messages | Messages de contact | Non |
| admin_logs | Journal administratif | Non |
| status_history | Historique des statuts | Non |
| favorites | Structure pour favoris serveur éventuels | Non |

Toutes les tables ont RLS activée. Les rôles `anon` et `authenticated` n'ont aucun droit d'écriture. Les actions Next.js utilisent la clé serveur ; leur validation et leur contrôle d'accès restent indispensables puisque cette clé contourne RLS. Les permissions sont conformes au modèle [RLS de Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security).

L'administration existante utilise un cookie signé côté Next.js. Il n'y a pas de compte administrateur Supabase Auth à créer ni de rôle admin à donner aux visiteurs. L'inscription Supabase Auth n'est pas nécessaire au parcours actuel ; la désactiver dans le tableau de bord si aucun usage n'est prévu. Les favoris actuels restent gérés localement par le navigateur.

## Stockage

| Bucket | Visibilité | Limite par fichier | Formats |
| --- | --- | --- | --- |
| property-images | Public | 10 Mio | JPEG, PNG, WebP, AVIF |
| payment-proofs | Privé | 8 Mio | PDF, JPEG, PNG, WebP |

Les uploads et suppressions passent par les actions serveur. Aucune politique d'écriture publique Storage n'est nécessaire. Les photos d'un bucket public sont accessibles à toute personne disposant de l'URL, même si l'annonce est dépubliée ; la RLS des métadonnées ne rend pas ces fichiers privés. Pour un justificatif, utiliser un téléchargement serveur autorisé ou une URL signée de courte durée, jamais `getPublicUrl`. Voir [les règles Storage](https://supabase.com/docs/guides/storage/security/access-control).

## Réglages et comportement existant

Le seed reprend les valeurs de repli déjà présentes dans `lib/data/site-settings.ts` : téléphone, lien de paiement et frais de visite de 50 €. Vérifier et modifier ces valeurs dans `/admin/parametres` avant publication. Aucun IBAN n'est inventé ; la ligne bancaire est vide et masquée. Renseigner les coordonnées réelles dans `/admin/configuration-bancaire` avant d'afficher les instructions.

Le formulaire `createReservation` dans `actions/reservations.ts` envoie uniquement un e-mail. Il ne crée ni réservation ni client en base. Les tables sont disponibles pour les fonctionnalités existantes, mais cette installation ne change pas ce choix applicatif. Le Gmail d'alerte nécessite `GMAIL_USER`, `GMAIL_APP_PASSWORD` et `ALERT_EMAIL`. Ne jamais utiliser le mot de passe principal Gmail.

Stripe est facultatif et nécessite ses clés et la configuration du webhook de l'application pour une confirmation effective. Les scripts SQL ne valident aucun paiement et ne confirment aucun virement automatiquement.

## Validation

L'installation SQL et les tests de droits ont été exécutés sur PostgreSQL 18 local, avec les rôles Supabase simulés et une table `auth.users` minimale. Cela valide la syntaxe, les clés, les seeds, la règle d'image principale et les accès SQL ; cela ne constitue pas un test du service Supabase hébergé.

Après connexion au projet réel :

- Vérifier les 16 tables et les deux buckets, leurs limites et leur visibilité.
- Créer une annonce brouillon dans l'admin, téléverser deux photos, changer l'image principale, publier puis contrôler le catalogue public.
- Soumettre une visite avec des coordonnées de test et vérifier client, visite, archive et statut dans l'admin.
- Tester séparément une réservation et la réception réelle de l'e-mail, compte tenu du fonctionnement décrit plus haut.
- Tester un justificatif privé sur un dossier contrôlé et vérifier qu'une URL publique ne permet pas de le télécharger.
- Vérifier les paramètres publics et bancaires, puis supprimer les données de test via l'application et les fichiers par l'API Storage.

Les contrôles SQL sont limités aux permissions et aux fixtures indiquées. Livraison d'e-mails, Stripe, uploads, sauvegardes, quotas et parcours navigateur doivent être vérifiés sur le service connecté. Les sauvegardes et leur restauration se configurent dans Supabase selon l'offre choisie ; aucun paramètre de facturation n'est modifié par ces fichiers.
