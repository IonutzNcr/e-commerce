# Récapitulatif de l’état du projet

**État relevé le 15 novembre 2026 — analyse statique du dépôt.** Ce document décrit ce que le code permet de constater ; l’application n’a pas été lancée et les parcours n’ont pas été testés.

## Vue d’ensemble

Le dépôt contient une boutique composée de deux applications :

- **Client** : interface React 18 avec Vite, React Router, Tailwind et React Query (`Client/src`).
- **API** : backend Laravel avec routes REST, modèles Eloquent et migrations (`laravel-ecomerce-api`).

Les écrans et les contrôleurs couvrent une grande partie des besoins d’une boutique : catalogue, catégories, recherche, compte, panier, administration, livraison et paiement Stripe. Plusieurs parcours ne sont toutefois pas reliés de bout en bout ou s’appuient sur des hypothèses locales.

## Fonctionnalités présentes

- Catalogue de produits, fiche produit, catégories/sous-catégories, recherche et sélection de produits populaires.
- Inscription et connexion ; le mot de passe est haché lors de l’inscription et vérifié lors de la connexion.
- Écrans de profil et de tableau de bord avec sections produits, catégories et utilisateurs.
- Contexte d’authentification et chargement de données par React Query ; panier récupéré côté API pour les utilisateurs connectés.
- Contrôleurs et routes API pour lire/créer/modifier/supprimer des articles, catégories et sous-catégories, gérer les variations, ainsi que lire et modifier des utilisateurs.
- Début d’intégration Stripe : récupération de la clé publique, création d’un PaymentIntent et formulaire de confirmation.
- Calcul de frais d’expédition côté API à partir du pays, du mode et du poids des articles.

## Incomplet ou incohérent — à traiter en priorité

### 1. Paiement et passage en caisse

- `Client/src/components/stripe/Payment.jsx` envoie un **montant fixe de 4 000 centimes** ; le total réel du panier n’est pas utilisé.
- `PaymentConfirm.jsx` exporte un composant nommé `PaymentForm` qui n’affiche qu’un titre, tandis que `PaymentForm.jsx` exporte le formulaire Stripe. Les imports actuels ciblent des fichiers distincts, mais ce nommage est trompeur et la page de confirmation ne montre pas de vérification explicite du statut du paiement.
- La gestion de l’erreur de `stripe.confirmPayment` suppose que `error` existe avant d’accéder à `error.type`.
- L’URL de retour est codée en dur sur `http://localhost:3000` ; la clé publique et les URLs de l’API sont également liées à des adresses locales.
- `PaymentConfirm.jsx` existe, mais la confirmation du paiement n’est pas reliée à l’enregistrement d’une commande dans les éléments consultés.
- La création du PaymentIntent n’est pas protégée par authentification et son montant vient directement de la requête. Le montant devrait être calculé et validé côté serveur à partir du panier.
- Le parcours invité n’est pas finalisé : le paiement existe dans le code, mais les commandes invitées sont explicitement notées comme TODO dans `OrdersController.php`.

### 2. Commandes

- Le client appelle `/api/saveOrder` et `/api/getOrders/{id}` (`Client/src/components/PagePanier.jsx`, `Client/src/components/ListOrders.jsx`), mais aucune de ces routes n’est déclarée dans `laravel-ecomerce-api/routes/api.php`.
- Le contrôleur présent s’appelle `OrdersController.php`, alors que sa classe PHP est `OrderController` (singulier). Il référence aussi `App\Models\Order`, dont aucun modèle n’apparaît dans `app/Models`.
- La migration `create_orders_table` définit `articles_id` et `price`, mais le contrôleur essaie d’enregistrer `crypt` et `etat`. Le schéma et le code de commande ne correspondent donc pas.
- Le bouton de la page panier appelle l’enregistrement d’une commande, mais aucun appel au paiement n’est visible dans ce parcours.
- L’historique affiche des suffixes factices dans le numéro de commande et les prix sont rendus avec le symbole `$`, alors que le projet utilise l’euro.

### 3. Panier et livraison

- L’API expose uniquement `POST /getUserCart` pour lire le panier. Aucune route d’ajout, de modification de quantité ou de suppression d’article n’est déclarée dans `routes/api.php` ; le panier invité repose sur `localStorage` et son transfert vers le compte n’est pas visible.
- `PagePanier.jsx` et `ListOrders.jsx` lisent directement `localStorage.user.id` sans gérer l’absence d’utilisateur.
- La demande de frais envoie `adress_id: 2` en dur. Côté API, la recherche de l’utilisateur utilise cette valeur à la place de `user_id`, puis lit la première adresse sans vérifier qu’elle existe.
- Le calcul de livraison dépend de données associées (pays, mode, adresse, variation) sans validation robuste des éléments manquants. Le TODO dans `ShippingController.php` confirme que le poids doit encore être fiabilisé.
- Le total TTC dans le panier semble calculé à partir des frais de livraison uniquement (`200 + frais`), sans additionner le prix du panier.

### 4. Authentification et autorisations

- Les routes de gestion des utilisateurs, produits, catégories et variations sont déclarées sans middleware d’authentification/autorisation visible. Le contrôle du rôle administrateur semble surtout piloté par l’interface ; il doit être appliqué côté API avant mise en service.
- La connexion génère et stocke un `api_token`, mais les routes métier ne semblent pas l’exiger.
- Le contrôleur d’inscription enregistre Stripe sous `strip_id`, alors que le client transmet `user.customers_id` au paiement. Ces noms ne correspondent pas.
- Les routes de mise à jour et suppression d’utilisateur ne montrent pas de contrôle empêchant de modifier/supprimer un autre compte.

### 5. Configuration et exploitation

- Les URLs du client pointent directement vers `127.0.0.1:8000` ou `localhost:8000`. Une configuration par variables d’environnement est à prévoir pour les différents environnements.
- La récupération de configuration Stripe dans `App.jsx` ne gère pas les erreurs réseau ni une clé absente.
- Le `.env` est ignoré par Git, ce qui est normal pour les secrets, mais aucun exemple de configuration `.env.example` n’a été repéré à la racine de l’API.
- Le README racine ne contient que `# E-commerce` ; le README Laravel est celui du squelette standard et ne documente pas le projet.
- Le seeder de base est vide/commenté, donc aucune procédure de données de démonstration n’est fournie.
- Deux gestionnaires de dépendances sont présents dans `Client` (`package-lock.json` et `pnpm-lock.yaml`) ; il faudrait choisir et documenter un seul flux d’installation.

## Tests et qualité de vérification

- Les tests Laravel présents sont les exemples générés par défaut (une route `/` et une assertion triviale) ; ils ne couvrent pas les parcours boutique.
- Aucun test fonctionnel client ou API métier n’a été repéré dans les dossiers inspectés.
- Aucun résultat de build, lint ou test n’est consigné ici : ce récapitulatif est fondé sur la lecture des fichiers, sans exécution de ces commandes.

## Ordre de travail recommandé

1. **Remettre d’accord le schéma et le parcours de commande** : modèle, migration, routes, contrôleur, panier, paiement réussi et historique.
2. **Calculer le prix côté serveur** depuis les articles, variations, quantités et frais ; ne pas accepter un montant libre du navigateur.
3. **Sécuriser les routes** : authentification, contrôle du rôle admin, validation et autorisation par ressource.
4. **Finaliser le panier et la livraison** : ajout/mise à jour/suppression, adresse choisie, gestion invité, validation et calcul complet du total.
5. **Corriger les incohérences d’intégration** : identifiant Stripe, composants de paiement, URLs/configuration d’environnement et états d’erreur.
6. **Documenter l’installation et les variables requises**, puis ajouter des tests sur les parcours critiques.

## Fichiers de référence principaux

- Client et routes : `Client/src/App.jsx`, `Client/src/components/Providers/AuthProvider.jsx`
- Paiement : `Client/src/components/stripe/Payment.jsx`, `Client/src/components/stripe/PaymentForm.jsx`, `laravel-ecomerce-api/app/Http/Controllers/PaymentController.php`
- Panier et livraison : `Client/src/components/PagePanier.jsx`, `laravel-ecomerce-api/app/Http/Controllers/CartController.php`, `laravel-ecomerce-api/app/Http/Controllers/ShippingController.php`
- Commandes : `Client/src/components/ListOrders.jsx`, `laravel-ecomerce-api/app/Http/Controllers/OrdersController.php`, `laravel-ecomerce-api/database/migrations/2023_08_02_144122_create_orders_table.php`
- Routes API : `laravel-ecomerce-api/routes/api.php`
