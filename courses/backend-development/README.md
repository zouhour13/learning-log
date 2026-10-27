# Développement Backend

> **Auteur :** Zouhour Bellamine  
> **Langue :** Français  
> **Objectif :** comprendre les concepts fondamentaux du développement côté serveur, les API, la sécurité applicative et les architectures backend.

## Sommaire

1. [Rôle du backend et architecture client-serveur](#1-rôle-du-backend-et-architecture-client-serveur)
2. [HTTP et cycle d'une requête](#2-http-et-cycle-dune-requête)
3. [API REST et codes HTTP](#3-api-rest-et-codes-http)
4. [Architecture logicielle côté serveur](#4-architecture-logicielle-côté-serveur)
5. [Validation, erreurs et journalisation](#5-validation-erreurs-et-journalisation)
6. [Authentification et autorisation](#6-authentification-et-autorisation)
7. [Sécurité des applications web](#7-sécurité-des-applications-web)
8. [Bases de données, ORM et transactions](#8-bases-de-données-orm-et-transactions)
9. [Synchrone, asynchrone et concurrence](#9-synchrone-asynchrone-et-concurrence)
10. [Tests et qualité](#10-tests-et-qualité)
11. [Configuration et performance](#11-configuration-et-performance)
12. [Confusions fréquentes](#12-confusions-fréquentes)
13. [Auto-évaluation QCM](#13-auto-évaluation-qcm)

## 1. Rôle du backend et architecture client-serveur

Le **frontend** est la partie avec laquelle l'utilisateur interagit. Le **backend** traite la logique métier, applique les règles d'accès, échange avec les bases de données et expose des services via des API.

Flux simplifié :

`Client → DNS/réseau → serveur web ou reverse proxy → application backend → base de données/service externe → réponse`

- **Client :** navigateur, application mobile ou autre service.
- **Serveur web / reverse proxy :** reçoit le trafic HTTP(S), peut terminer TLS, router les requêtes et servir des fichiers statiques.
- **Backend :** vérifie la requête, exécute la logique métier et orchestre les dépendances.
- **Base de données :** conserve les données de manière structurée ou non structurée.
- **API :** contrat d'échange entre deux logiciels.

Le client ne doit pas être considéré comme fiable : toute donnée reçue doit être validée côté serveur. Masquer un bouton dans l'interface ne remplace pas une vérification d'autorisation backend.

## 2. HTTP et cycle d'une requête

HTTP est un protocole applicatif de communication client-serveur. HTTPS correspond à HTTP protégé par TLS.

Une requête HTTP comporte généralement une méthode, une cible/URL, des en-têtes et éventuellement un corps. Une réponse comporte un code de statut, des en-têtes et éventuellement un corps.

Exemples d'en-têtes :
- `Content-Type: application/json` : type du contenu envoyé.
- `Accept: application/json` : format que le client souhaite recevoir.
- `Authorization: Bearer …` : informations d'authentification.
- `Cache-Control` : directives de cache.

**Idempotence :** une opération est idempotente si la répéter produit le même effet prévu sur l'état du serveur. GET, PUT et DELETE sont définis comme idempotents par HTTP, même si les réponses peuvent varier. POST n'est généralement pas idempotent.

**Sûreté (safe method) :** une méthode sûre est conçue pour ne pas modifier l'état métier du serveur. GET est sûre ; POST ne l'est pas.

## 3. API REST et codes HTTP

REST est un style d'architecture pour des systèmes distribués. Une API REST bien conçue expose des ressources via des URI et utilise les méthodes HTTP de manière cohérente.

Exemple pour une ressource `/api/dossiers` :
- `GET /api/dossiers` : lister les dossiers.
- `GET /api/dossiers/42` : lire le dossier 42.
- `POST /api/dossiers` : créer un dossier.
- `PUT /api/dossiers/42` : remplacer la représentation du dossier 42.
- `PATCH /api/dossiers/42` : modifier partiellement le dossier 42.
- `DELETE /api/dossiers/42` : supprimer le dossier 42.

### Codes de statut à connaître

| Code | Signification | Exemple |
|---|---|---|
| 200 OK | Succès | Lecture réussie |
| 201 Created | Ressource créée | Création réussie |
| 202 Accepted | Traitement accepté, pas nécessairement terminé | Tâche asynchrone |
| 204 No Content | Succès sans corps de réponse | Suppression réussie |
| 301/302 | Redirection | URL déplacée ou redirigée |
| 400 Bad Request | Requête invalide | Paramètre mal formé |
| 401 Unauthorized | Authentification manquante ou invalide | Jeton absent/expiré |
| 403 Forbidden | Accès refusé | Utilisateur identifié sans permission |
| 404 Not Found | Ressource introuvable | Identifiant inexistant |
| 409 Conflict | Conflit avec l'état courant | Doublon ou conflit de version |
| 422 Unprocessable Content | Contenu syntaxiquement compris mais invalide selon les règles applicatives, selon le contrat API | Champ hors contrainte |
| 429 Too Many Requests | Trop de requêtes | Limite de débit dépassée |
| 500 Internal Server Error | Erreur serveur inattendue | Exception non gérée |
| 502 Bad Gateway | Réponse invalide d'un serveur amont | Reverse proxy et backend |
| 503 Service Unavailable | Service temporairement indisponible | Surcharge ou maintenance |
| 504 Gateway Timeout | Délai dépassé auprès d'un serveur amont | Backend trop lent |

**À distinguer :** 401 = problème d'authentification ; 403 = identité connue ou requête comprise, mais permission insuffisante.

## 4. Architecture logicielle côté serveur

Une architecture en couches sépare les responsabilités :

- **Routeur / contrôleur :** reçoit la requête HTTP, extrait les paramètres et construit la réponse.
- **Service :** porte la logique métier et orchestre les opérations.
- **Repository / couche d'accès aux données :** encapsule les requêtes de persistance.
- **Modèle / entité :** représente les données du domaine.
- **Schéma DTO :** définit les données attendues en entrée ou renvoyées au client.

Flux fréquent : `Route → validation → service → repository → base de données → réponse`.

Concepts associés :
- **MVC :** Model, View, Controller ; séparation des données, de la présentation et du contrôle.
- **Injection de dépendances (DI) :** fournir à un composant ses dépendances plutôt que les créer en dur à l'intérieur.
- **Middleware :** composant exécuté dans le pipeline de requête/réponse, par exemple pour les logs, l'authentification ou CORS.
- **Monolithe :** application déployée comme une unité.
- **Microservices :** services autonomes communiquant par réseau ; plus de souplesse organisationnelle, mais davantage de complexité opérationnelle.
- **Architecture événementielle :** composants réagissant à des événements, souvent via un broker/message queue.

Une bonne séparation facilite les tests et la maintenance. Elle ne signifie pas qu'il faut multiplier inutilement les couches.

## 5. Validation, erreurs et journalisation

La validation doit vérifier les types, les champs obligatoires, les formats, les limites et les règles métier. La validation côté frontend améliore l'expérience, mais celle côté backend est indispensable.

Bonnes pratiques :
- Retourner des erreurs cohérentes avec un code HTTP approprié.
- Ne pas exposer de trace de pile, requête SQL, mot de passe ou secret dans une réponse publique.
- Journaliser les événements utiles avec un identifiant de corrélation.
- Éviter d'écrire dans les logs des jetons, mots de passe ou données personnelles inutiles.
- Distinguer erreurs métier attendues et erreurs internes inattendues.
- Utiliser des délais d'expiration (timeouts) pour les appels réseau.

Les logs sont des événements détaillés ; les métriques sont des mesures numériques agrégées ; les traces distribuées suivent un parcours à travers plusieurs services.

## 6. Authentification et autorisation

- **Authentification (AuthN) :** vérifier qui est l'utilisateur ou le service.
- **Autorisation (AuthZ) :** déterminer ce qu'il est permis de faire.
- **Session :** état associé à un utilisateur, généralement identifié par un identifiant de session conservé côté client.
- **Cookie :** mécanisme du navigateur pour stocker et renvoyer de petites données au serveur.
- **JWT :** format de jeton contenant des claims, souvent signé ; un JWT signé n'est pas automatiquement chiffré.
- **OAuth 2.0 :** cadre de délégation d'autorisation.
- **OpenID Connect (OIDC) :** couche d'identité construite au-dessus d'OAuth 2.0.
- **RBAC :** permissions associées à des rôles.
- **ABAC :** décisions d'accès fondées sur des attributs (utilisateur, ressource, contexte).

Mesures importantes : mots de passe hachés avec un algorithme adapté aux mots de passe (Argon2id, bcrypt ou scrypt), limitation des tentatives, expiration/révocation des sessions, contrôle d'accès côté serveur et privilèges minimaux.

## 7. Sécurité des applications web

- **Injection SQL :** entrée malveillante interprétée comme une partie de la requête SQL. Utiliser des requêtes paramétrées ; ne pas concaténer directement les entrées.
- **XSS (Cross-Site Scripting) :** exécution de contenu script injecté dans le navigateur. Échapper les sorties selon le contexte et appliquer une politique CSP appropriée.
- **CSRF :** un navigateur authentifié est amené à envoyer une action non voulue. Utiliser des jetons anti-CSRF et les attributs de cookies adaptés selon l'architecture.
- **CORS :** mécanisme navigateur qui contrôle les origines autorisées à lire certaines réponses cross-origin ; ce n'est pas un mécanisme d'authentification et il ne remplace pas les autorisations backend.
- **Rate limiting :** limiter le nombre de requêtes pour réduire abus et surcharge.
- **TLS :** protège la confidentialité et l'intégrité du transport et authentifie le serveur selon la validation du certificat.
- **Gestion des secrets :** secrets hors du code source, avec accès limité et rotation adaptée.
- **Principe du moindre privilège :** accorder uniquement les droits nécessaires.

## 8. Bases de données, ORM et transactions

Un backend utilise souvent une base relationnelle via SQL ou une base NoSQL selon le besoin.

- **ORM (Object-Relational Mapping) :** associe des objets/classes aux tables et lignes relationnelles.
- **Migration :** versionne les changements de schéma de base de données.
- **Transaction :** regroupe des opérations qui doivent respecter des propriétés d'atomicité et de cohérence.
- **Connection pool :** réutilise un ensemble de connexions pour éviter de créer une nouvelle connexion à chaque requête.
- **N+1 queries :** problème où une requête initiale déclenche ensuite une requête supplémentaire pour chaque élément.
- **Index :** peut accélérer certaines lectures, mais coûte de l'espace et ralentit certaines écritures.

Pour éviter les incohérences, les opérations métier qui doivent réussir ou échouer ensemble doivent être placées dans une transaction lorsque le système de persistance le permet. Ne pas conserver une transaction ouverte pendant des appels réseau lents sans raison.

## 9. Synchrone, asynchrone et concurrence

- **Synchrone :** l'exécution attend le résultat de l'opération avant de poursuivre sur ce flux.
- **Asynchrone :** une opération d'attente peut céder le contrôle afin que d'autres tâches progressent.
- **Concurrence :** plusieurs tâches progressent sur des périodes qui se chevauchent.
- **Parallélisme :** plusieurs tâches s'exécutent réellement au même instant, par exemple sur plusieurs cœurs.
- **Thread :** unité d'exécution au sein d'un processus.
- **Processus :** programme en cours d'exécution avec ses ressources.
- **Queue / file de messages :** permet de découpler l'émetteur du consommateur et de traiter des tâches hors du cycle HTTP.

L'asynchrone est particulièrement utile pour les entrées/sorties (réseau, fichiers, base de données) lorsque les bibliothèques utilisées sont compatibles. Il ne rend pas automatiquement plus rapide un calcul CPU intensif. Les tâches longues peuvent être déplacées vers un worker en arrière-plan.

## 10. Tests et qualité

- **Test unitaire :** teste une unité isolée.
- **Test d'intégration :** vérifie l'interaction entre composants, par exemple backend et base de données.
- **Test de bout en bout (E2E) :** vérifie un parcours complet à travers le système.
- **Mock / stub :** remplace une dépendance réelle par un comportement contrôlé dans un test.
- **Test de régression :** détecte la réapparition d'un défaut déjà corrigé.
- **Test de charge :** observe le comportement sous un volume de requêtes donné.
- **Linting / analyse statique :** détecte des problèmes sans exécuter nécessairement le programme.

Une couverture de code élevée ne garantit pas à elle seule la qualité : il faut également vérifier la pertinence des assertions et les cas limites.

## 11. Configuration et performance

- Séparer configuration et code.
- Lire les secrets depuis des variables d'environnement ou un gestionnaire de secrets.
- Définir des timeouts pour les appels externes.
- Ajouter pagination, index et cache lorsque justifiés par la charge et les mesures.
- Éviter de retourner des volumes de données illimités.
- Utiliser HTTPS et une configuration de production distincte du développement.
- Prévoir des contrôles de santé : liveness (processus vivant) et readiness (prêt à recevoir du trafic).
- Mesurer avant d'optimiser : latence, débit, taux d'erreur, saturation des ressources.

**Disponibilité** : proportion de temps pendant lequel le service est opérationnel. **Latence** : délai d'une opération. **Débit** : nombre d'opérations traitées par unité de temps.

## 12. Confusions fréquentes

| Notion A | Notion B | Différence |
|---|---|---|
| Frontend | Backend | Interface utilisateur vs logique côté serveur |
| Authentification | Autorisation | Qui êtes-vous ? vs que pouvez-vous faire ? |
| 401 | 403 | Authentification invalide/manquante vs accès interdit |
| PUT | PATCH | Remplacement vs modification partielle |
| Cookie | Session | Donnée envoyée par le navigateur vs état géré côté serveur |
| JWT signé | JWT chiffré | Signature vérifiable vs contenu rendu confidentiel |
| CORS | Authentification | Politique d'accès cross-origin du navigateur vs vérification d'identité |
| Asynchrone | Parallèle | Progression sans blocage vs exécution simultanée |
| Test unitaire | Test d'intégration | Composant isolé vs interaction entre composants |
| Logs | Métriques | Événements détaillés vs mesures agrégées |

## 13. Auto-évaluation QCM

**Q1. Quel code indique généralement une ressource créée avec succès ?**

A. 200  
B. 201  
C. 401  
D. 500

**Q2. Quelle différence est correcte entre authentification et autorisation ?**

A. Elles signifient exactement la même chose.  
B. L'authentification vérifie l'identité ; l'autorisation vérifie les permissions.  
C. L'autorisation chiffre le réseau.  
D. L'authentification remplace les rôles.

**Q3. Quelle mesure prévient le plus directement l'injection SQL ?**

A. Masquer le bouton de suppression.  
B. Utiliser uniquement CORS.  
C. Utiliser des requêtes paramétrées.  
D. Augmenter la taille du serveur.

**Q4. À quoi sert un middleware ?**

A. À exécuter une logique dans le pipeline des requêtes/réponses.  
B. À remplacer obligatoirement la base de données.  
C. À compiler le système d'exploitation.  
D. À convertir HTTP en SQL dans tous les cas.

**Q5. Quel énoncé sur l'asynchrone est correct ?**

A. Il rend tout calcul CPU plus rapide.  
B. Il signifie toujours exécution parallèle.  
C. Il peut améliorer l'utilisation des ressources pendant les attentes d'entrées/sorties.  
D. Il interdit d'utiliser des bases de données.

**Corrigé :** 1-B, 2-B, 3-C, 4-A, 5-C.

## Références

- [MDN — HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [MDN — HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [FastAPI — Documentation](https://fastapi.tiangolo.com/)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
