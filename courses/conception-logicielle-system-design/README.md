# Méthodologie de conception logicielle, UML et System Design

> **Auteur :** Zouhour Bellamine  
> **Langue :** Français  
> **Objectif :** disposer d’une référence structurée pour analyser un besoin, modéliser une solution, concevoir une architecture logicielle et raisonner sur un système complet.

## Sommaire

1. Cycle de vie et analyse des besoins
2. Cahier des charges et spécifications
3. Modèles de développement
4. UML et diagrammes
5. Architecture logicielle
6. Principes de conception et SOLID
7. Modélisation relationnelle et bases de données
8. Méthode de System Design
9. Scalabilité, disponibilité et performance
10. API, communication et traitements asynchrones
11. Sécurité, observabilité et tests
12. Étude de cas transversale
13. Exercices d’application
14. Synthèse des notions essentielles

---

## 1. Cycle de vie et analyse des besoins

### 1.1 Les étapes du cycle de vie d’un logiciel

Le cycle de vie organise le passage d’un besoin métier à une application opérationnelle et maintenable.

1. **Analyse des besoins :** comprendre le problème, les utilisateurs, les objectifs et les contraintes.
2. **Spécification :** formaliser les exigences fonctionnelles et non fonctionnelles.
3. **Conception :** définir l’architecture, les composants, les données, les interfaces et les interactions.
4. **Implémentation :** écrire le code et réaliser les fonctionnalités.
5. **Tests et validation :** vérifier la conformité du système et détecter les défauts.
6. **Déploiement :** installer et rendre le système accessible aux utilisateurs.
7. **Maintenance et évolution :** corriger les défauts, améliorer le système et répondre aux nouveaux besoins.

Ces étapes ne sont pas nécessairement strictement séquentielles : dans une démarche itérative, elles peuvent se répéter à chaque cycle.

### 1.2 Acteurs et parties prenantes

- **Maître d’ouvrage (MOA) :** porte le besoin métier, fixe les objectifs et valide le résultat.
- **Maître d’œuvre (MOE) :** prend en charge la réalisation technique de la solution.
- **Utilisateur final :** utilise l’application pour accomplir ses tâches.
- **Administrateur système :** gère notamment les comptes, les droits et la configuration technique.
- **Partie prenante (*stakeholder*) :** personne ou organisation concernée par le projet ou ses résultats.

Les rôles peuvent être répartis différemment selon la taille du projet et la gouvernance adoptée.

### 1.3 Exigences fonctionnelles et non fonctionnelles

**Exigences fonctionnelles :** décrivent les services et comportements que le système doit fournir.

Exemples :
- Enregistrer un bien ou un dossier.
- Rechercher un enregistrement par référence.
- Générer un rapport.
- Soumettre une demande à validation.
- Consulter l’historique des modifications.

**Exigences non fonctionnelles :** décrivent les qualités attendues ou les contraintes à respecter.

| Catégorie | Exemple |
|---|---|
| Performance | 95 % des recherches répondent en moins de 2 secondes sous une charge définie. |
| Disponibilité | Le service vise un objectif de disponibilité défini sur une période donnée. |
| Sécurité | Les utilisateurs sont authentifiés et les permissions contrôlées. |
| Confidentialité | Les données sensibles sont protégées contre les accès non autorisés. |
| Maintenabilité | Le code est organisé en composants compréhensibles et testables. |
| Compatibilité | L’application fonctionne avec les environnements pris en charge. |
| Fiabilité | Le système gère les erreurs sans corrompre les données. |
| Évolutivité | L’architecture permet d’ajouter des fonctionnalités avec un coût maîtrisé. |

Autres contraintes possibles : exigences métier, contraintes techniques, budget, délais, réglementation, conservation des données et compatibilité avec les systèmes existants.

### 1.4 Techniques de collecte des besoins

- **Entretien :** approfondir les attentes d’une personne ou d’un groupe.
- **Questionnaire :** recueillir des réponses auprès d’un grand nombre d’utilisateurs.
- **Observation :** comprendre les pratiques réelles et les difficultés opérationnelles.
- **Atelier de travail :** faire émerger et prioriser collectivement les besoins.
- **Analyse documentaire :** examiner les procédures, formulaires et systèmes existants.
- **Prototypage :** présenter une maquette pour obtenir des retours avant la réalisation complète.

Une maquette clarifie l’expérience utilisateur, mais ne constitue pas nécessairement une architecture technique ni une spécification complète.

---

## 2. Cahier des charges et spécifications

### 2.1 Contenu d’un cahier des charges

Le cahier des charges formalise le besoin, le périmètre et les contraintes du projet. Il comprend généralement :

- Contexte et objectifs.
- Périmètre, limites et exclusions.
- Acteurs et profils d’utilisateurs.
- Exigences fonctionnelles et non fonctionnelles.
- Règles métier.
- Contraintes techniques, budgétaires et temporelles.
- Interfaces avec les systèmes existants.
- Exigences de sécurité, de sauvegarde et de maintenance.
- Critères d’acceptation et modalités de validation.
- Hypothèses, risques et dépendances.

### 2.2 Documents à distinguer

| Document ou notion | Rôle |
|---|---|
| Cahier des charges | Formalise le besoin, les objectifs, le périmètre et les contraintes. |
| Spécifications fonctionnelles | Décrivent les fonctions et comportements attendus. |
| Spécifications techniques | Décrivent les contraintes et choix de réalisation technique. |
| Maquette ou prototype | Représente une solution envisagée pour recueillir des retours. |
| Critère d’acceptation | Permet de vérifier si une exigence est satisfaite. |
| Traçabilité | Relie les exigences à la conception, au code et aux tests correspondants. |

Une exigence de qualité doit être **claire, non ambiguë, cohérente, vérifiable et traçable**.

- Formulation vague : « L’application doit être rapide. »
- Formulation mesurable : « Dans les conditions de charge documentées, 95 % des recherches doivent répondre en moins de 2 secondes. »

Les seuils doivent être définis selon les besoins réels du système, et non choisis arbitrairement.

---

## 3. Modèles de développement

### 3.1 Modèle en cascade (*Waterfall*)

Les phases sont principalement organisées de manière séquentielle.

- **Avantages :** étapes, responsabilités et livrables explicites.
- **Limites :** les changements tardifs peuvent être coûteux ; les utilisateurs obtiennent parfois un retour tardif sur le produit.
- **Contexte adapté :** exigences relativement stables et processus de validation formalisé.

### 3.2 Modèle itératif et incrémental

Le système est construit et amélioré par cycles successifs.

- **Itératif :** on affine progressivement une solution.
- **Incrémental :** on ajoute des capacités fonctionnelles au fil des versions.
- **Avantages :** retours réguliers, apprentissage et adaptation.
- **Limites :** nécessite une gestion cohérente des versions et une architecture capable d’évoluer.

### 3.3 Agile et Scrum

**Agile** désigne un ensemble de valeurs et de principes favorisant la collaboration, les retours fréquents et l’adaptation. **Scrum** est un cadre de travail spécifique.

- **Product Owner :** maximise la valeur du produit et ordonne les éléments du Product Backlog.
- **Scrum Master :** aide l’équipe à comprendre et appliquer Scrum, et favorise la suppression des obstacles.
- **Developers :** créent un incrément utilisable à chaque Sprint.
- **Sprint :** période fixe pendant laquelle un incrément est réalisé.
- **Product Backlog :** liste ordonnée des améliorations et besoins du produit.
- **Sprint Backlog :** objectif du Sprint, éléments sélectionnés et plan de réalisation.
- **Daily Scrum :** événement quotidien pour inspecter l’avancement et adapter le plan.
- **Sprint Review :** inspection du résultat avec les parties prenantes.
- **Sprint Retrospective :** réflexion sur les améliorations du mode de travail.
- **Incrément :** résultat utilisable conforme aux critères de qualité convenus.

### 3.4 Modèle en spirale

Chaque cycle combine développement progressif et analyse explicite des risques.

- **Point fort :** les risques techniques et métier sont étudiés régulièrement.
- **Limite :** le pilotage peut être complexe et coûteux.

Le choix d’une méthode dépend de la stabilité des exigences, des risques, de la taille de l’équipe, des obligations de validation et de la fréquence attendue des livraisons.

---

## 4. UML et diagrammes

### 4.1 Qu’est-ce qu’UML ?

**UML (*Unified Modeling Language*)** est un langage graphique normalisé permettant de modéliser la structure et le comportement d’un système.

UML n’est **ni un langage de programmation, ni une méthode de développement**. Il fournit des notations pour communiquer une conception, analyser un système et documenter des décisions.

### 4.2 Les principaux diagrammes UML

#### Diagramme de cas d’utilisation (*Use Case*)

Montre les acteurs externes et les objectifs fonctionnels qu’ils réalisent avec le système.

- **Acteur :** rôle externe qui interagit avec le système.
- **Cas d’utilisation :** objectif ou service rendu.
- **Association :** lien entre un acteur et un cas d’utilisation.
- **<<include>> :** comportement inclus obligatoirement dans un autre cas d’utilisation.
- **<<extend>> :** comportement additionnel qui étend un cas d’utilisation dans certaines conditions.

Il répond à la question : **qui utilise le système, et pour atteindre quel objectif ?**

#### Diagramme de classes

Décrit la structure statique : classes, attributs, opérations et relations.

- **Association :** relation entre classes.
- **Héritage / généralisation :** une classe spécialisée hérite des caractéristiques d’une classe générale.
- **Agrégation :** relation tout-partie faible ; la partie peut exister indépendamment.
- **Composition :** relation tout-partie forte, souvent liée au cycle de vie de l’objet composite.
- **Multiplicité :** nombre d’instances pouvant participer à une relation.

| Multiplicité | Signification |
|---|---|
| 1 | Exactement un |
| 0..1 | Zéro ou un |
| * ou 0..* | Zéro ou plusieurs |
| 1..* | Au moins un |
| 2..5 | Entre deux et cinq |

La distinction entre agrégation et composition dépend du modèle métier ; elle ne se résume pas uniquement à un symbole graphique.

#### Diagramme de séquence

Représente les échanges entre acteurs et objets dans l’ordre chronologique.

- **Lignes de vie :** participants à l’interaction.
- **Messages :** appels ou communications.
- **Barres d’activation :** périodes d’exécution.
- **alt :** branches alternatives.
- **opt :** interaction conditionnelle.
- **loop :** répétition.

Il peut décrire le chemin d’une requête depuis une interface web vers une API, un service métier et une base de données.

#### Diagramme d’activités

Modélise un processus ou un flux de travail : nœud initial et final, actions, transitions, décisions, fusions, exécutions parallèles et couloirs (*swimlanes*) indiquant les responsabilités.

#### Diagramme d’états-transitions

Décrit les états possibles d’un objet et les transitions déclenchées par des événements ou conditions.

Exemple de cycle de vie d’un dossier : **Brouillon → Soumis → Validé ou Rejeté**. Les transitions doivent respecter les règles métier.

#### Diagramme de composants

Montre les composants logiciels, leurs interfaces et leurs dépendances. Exemple : interface web, API, service de génération de rapports et accès aux données.

#### Diagramme de déploiement

Représente les nœuds matériels ou environnements d’exécution et les artefacts déployés. Exemple : navigateur client, serveur applicatif et serveur de base de données.

### 4.3 Choisir le diagramme adapté

| Question | Diagramme recommandé |
|---|---|
| Qui utilise le système et pour quoi faire ? | Cas d’utilisation |
| Quelles sont les classes et leurs relations ? | Classes |
| Dans quel ordre les messages sont-ils échangés ? | Séquence |
| Quelles sont les étapes d’un processus ? | Activités |
| Quels sont les états possibles d’un objet ? | États-transitions |
| Comment le logiciel est-il découpé ? | Composants |
| Où les éléments sont-ils exécutés ? | Déploiement |

---

## 5. Architecture logicielle

L’architecture décrit les principaux composants d’un système, leurs responsabilités, leurs interfaces, leurs dépendances et leurs interactions. Elle doit répondre aux exigences fonctionnelles et non fonctionnelles tout en maîtrisant la complexité.

### 5.1 Architecture en couches (*Layered Architecture*)

Une organisation courante sépare les responsabilités :

1. **Présentation :** interface utilisateur ou endpoints HTTP.
2. **Application / services :** orchestration des cas d’utilisation.
3. **Domaine / métier :** règles métier et invariants.
4. **Accès aux données :** requêtes et persistance.

**Avantages :** séparation des responsabilités, lisibilité, testabilité et remplacement plus facile de certaines parties.  
**Risques :** multiplication inutile des couches ou dépendances qui traversent les frontières prévues.

### 5.2 Architecture client-serveur

Le client demande un service et le serveur traite la requête. Le client peut être un navigateur, une application mobile ou un autre système. Le serveur applique la logique métier et accède aux ressources nécessaires.

Cette séparation facilite la centralisation des règles métier et des données, mais impose de traiter la latence réseau, les erreurs de communication, l’authentification et la disponibilité.

### 5.3 Monolithe et microservices

**Monolithe :** l’application est déployée comme une unité, même si son code est organisé en modules.

- Déploiement et débogage souvent plus simples.
- Appels internes généralement directs.
- Peut devenir difficile à faire évoluer si les modules sont fortement couplés.

**Microservices :** l’application est divisée en services autonomes, organisés autour de capacités métier et communiquant par API ou messages.

- Déploiement et mise à l’échelle potentiellement indépendants.
- Isolation possible de certaines défaillances.
- Coût opérationnel plus élevé : réseau, observabilité distribuée, sécurité interservices, versionnement, cohérence des données et gestion des pannes.

Les microservices ne sont pas automatiquement meilleurs. Un **monolithe modulaire** est souvent une base raisonnable lorsqu’il n’existe pas encore de besoin de déploiements indépendants.

### 5.4 Architecture orientée événements

Les composants publient des événements consommés par d’autres composants, souvent via un broker ou une file de messages.

Exemple : après la création d’un dossier, un événement peut déclencher la génération d’un document ou l’envoi d’une notification sans bloquer la requête initiale.

Points d’attention : livraison répétée, ordre des événements, idempotence, reprises, suivi des messages et cohérence éventuelle.

### 5.5 Qualités d’un logiciel

- **Maintenabilité :** facilité de compréhension, correction et évolution.
- **Scalabilité :** capacité à supporter une croissance de charge.
- **Disponibilité :** capacité à rendre le service accessible.
- **Fiabilité :** capacité à fonctionner correctement dans les conditions prévues.
- **Sécurité :** protection contre les accès et actions non autorisés.
- **Performance :** temps de réponse, débit et utilisation des ressources.
- **Interopérabilité :** capacité à échanger avec d’autres systèmes.
- **Testabilité :** facilité à vérifier le comportement du système.
- **Portabilité :** facilité à l’exécuter dans différents environnements pris en charge.

Ces qualités peuvent entrer en tension. Par exemple, la redondance peut améliorer la disponibilité mais augmenter les coûts et la complexité.

---

## 6. Principes de conception et SOLID

### 6.1 Cohésion, couplage et séparation des responsabilités

- **Forte cohésion :** un module rassemble des responsabilités étroitement liées.
- **Faible couplage :** un module dépend le moins possible des détails internes des autres modules.
- **Séparation des responsabilités :** chaque composant a un rôle clair.
- **Encapsulation :** l’état interne est protégé et accessible par des interfaces contrôlées.
- **Abstraction :** les détails inutiles sont masqués derrière un contrat pertinent.
- **Composition :** construire un comportement en assemblant des objets ou composants.
- **DRY (*Don't Repeat Yourself*) :** éviter de dupliquer la même connaissance métier.
- **KISS (*Keep It Simple*) :** privilégier une solution aussi simple que possible pour le besoin réel.
- **YAGNI (*You Aren't Gonna Need It*) :** éviter une fonctionnalité spéculative sans besoin justifié.

Ces principes sont des guides de conception, pas des règles absolues à appliquer sans tenir compte du contexte.

### 6.2 Les cinq principes SOLID

1. **S — Single Responsibility Principle :** une classe ou un module doit avoir une responsabilité cohérente et une raison principale de changer.
2. **O — Open/Closed Principle :** le code doit pouvoir être étendu sans modifier inutilement le comportement déjà stable.
3. **L — Liskov Substitution Principle :** un sous-type doit pouvoir remplacer son type de base sans violer les attentes du programme.
4. **I — Interface Segregation Principle :** préférer plusieurs interfaces spécifiques à une interface trop large imposant des méthodes inutiles.
5. **D — Dependency Inversion Principle :** les modules de haut niveau doivent dépendre d’abstractions plutôt que de détails concrets.

**Exemple :** un service métier peut dépendre d’une interface de dépôt (*Repository*) plutôt que d’être lié directement à une implémentation SQL. Cela facilite les tests et le remplacement de l’implémentation.

---

## 7. Modélisation relationnelle et bases de données

### 7.1 Les niveaux de modélisation

- **MCD — Modèle conceptuel de données :** représente les entités métier, leurs propriétés et leurs associations, indépendamment d’un SGBD précis.
- **MLD — Modèle logique de données :** traduit le modèle conceptuel dans une structure logique, par exemple relationnelle.
- **MPD — Modèle physique de données :** précise la réalisation dans un SGBD : types, index, contraintes et choix physiques.

### 7.2 Tables, lignes, colonnes et clés

- **Table / relation :** ensemble structuré d’enregistrements.
- **Ligne / tuple :** un enregistrement.
- **Colonne / attribut :** une propriété.
- **Clé primaire (PK) :** identifie de façon unique chaque ligne ; elle ne doit pas être nulle.
- **Clé étrangère (FK) :** référence une clé d’une autre table ou de la même table et assure une contrainte référentielle.
- **UNIQUE :** empêche les doublons sur les colonnes concernées.
- **NOT NULL :** interdit une valeur nulle.
- **CHECK :** vérifie une condition.
- **Index :** accélère certaines recherches au prix d’espace et d’un coût supplémentaire lors des écritures.

Les contraintes doivent faire respecter les invariants importants au niveau approprié, notamment dans la base de données.

### 7.3 Relations et cardinalités

- **Un-à-un (1:1) :** une entité est associée à au plus une entité de l’autre côté, selon les contraintes.
- **Un-à-plusieurs (1:N) :** une entité peut être liée à plusieurs entités ; la clé étrangère se trouve généralement du côté N.
- **Plusieurs-à-plusieurs (N:N) :** plusieurs entités peuvent être liées à plusieurs autres ; dans un modèle relationnel, une table d’association contenant les clés étrangères est généralement utilisée.

### 7.4 Normalisation

La normalisation réduit les redondances et les anomalies d’insertion, de mise à jour et de suppression.

- **Première forme normale (1NF) :** chaque attribut contient une valeur atomique selon le modèle relationnel retenu ; pas de groupes répétitifs dans une même cellule.
- **Deuxième forme normale (2NF) :** être en 1NF et ne pas avoir de dépendance partielle d’un attribut non-clé à une partie seulement d’une clé candidate composée.
- **Troisième forme normale (3NF) :** être en 2NF et éviter les dépendances transitives inappropriées d’attributs non-clés sur une clé candidate.

La normalisation améliore la cohérence, mais certaines lectures intensives peuvent justifier une dénormalisation mesurée. Toute dénormalisation introduit des compromis et doit être motivée par des besoins de performance mesurés.

### 7.5 Transactions et propriétés ACID

Une transaction regroupe plusieurs opérations qui doivent être considérées comme une unité logique.

- **Atomicité :** toutes les opérations sont validées, ou aucune ne l’est.
- **Cohérence :** la transaction respecte les contraintes définies.
- **Isolation :** les transactions concurrentes ne produisent pas d’interférences interdites par le niveau d’isolation choisi.
- **Durabilité :** après validation, les changements persistent selon les garanties du système.

Exemple : lorsqu’un dossier est validé, le changement de statut et l’écriture de l’événement d’historique peuvent devoir être réalisés dans une même transaction. Si une opération échoue, l’ensemble doit être annulé.

### 7.6 Concurrence et index

Les bases relationnelles offrent des mécanismes de verrouillage et différents niveaux d’isolation. Un niveau plus strict peut réduire certains phénomènes de concurrence, mais aussi diminuer le débit ou augmenter les attentes.

Un index est utile lorsqu’il correspond aux filtres, jointures ou tris réellement fréquents. Trop d’index augmentent l’espace utilisé et ralentissent les écritures. Il faut examiner les plans d’exécution et mesurer avant d’optimiser.

---

## 8. Méthode de System Design

Le **System Design** consiste à concevoir les composants, les données et les interactions d’un système afin de répondre à des exigences fonctionnelles et non fonctionnelles. Il faut également expliciter les compromis entre coût, complexité, performance, sécurité et maintenabilité.

### 8.1 Étapes de conception

1. **Clarifier le besoin :** utilisateurs, fonctions, périmètre, scénarios principaux et exclusions.
2. **Définir les exigences non fonctionnelles :** latence, débit, disponibilité, sécurité, cohérence, rétention et coût.
3. **Estimer la charge :** utilisateurs actifs, requêtes par seconde, tailles de requêtes, volume de données et croissance.
4. **Définir les API et les modèles de données :** opérations, entités, validations, erreurs et autorisations.
5. **Dessiner l’architecture globale :** clients, API, services métier, stockage, cache, broker et traitements asynchrones éventuels.
6. **Identifier les goulots d’étranglement :** CPU, mémoire, réseau, requêtes SQL, contention, stockage ou dépendances externes.
7. **Prévoir sécurité et résilience :** contrôle d’accès, sauvegardes, redondance, surveillance et reprise.
8. **Analyser les compromis :** complexité opérationnelle, coût, cohérence, performances et facilité d’évolution.
9. **Valider la conception :** tester les hypothèses avec des mesures, des prototypes ou des essais de charge.

### 8.2 Estimation de charge

Les estimations servent à dimensionner une première solution et à rendre les hypothèses explicites. Elles ne remplacent pas les mesures en production.

- **Débit :** nombre de requêtes traitées par unité de temps, par exemple requêtes par seconde.
- **Latence :** temps nécessaire pour traiter une requête.
- **Concurrence :** nombre d’opérations en cours simultanément.
- **Volume de stockage :** nombre d’enregistrements, taille moyenne, pièces jointes et croissance.
- **Pic de charge :** période où l’activité dépasse la moyenne.

Exemple simplifié : si 600 utilisateurs envoient chacun en moyenne une requête toutes les 30 secondes, la charge moyenne estimée est 600 / 30 = **20 requêtes/s**. Cette moyenne ne décrit pas les pics, les requêtes plus coûteuses ni la concurrence réelle.

### 8.3 Vue logique d’une application web

Un flux typique :

1. Le navigateur envoie une requête HTTPS.
2. Un reverse proxy ou un répartiteur dirige la requête vers une instance applicative.
3. L’API authentifie l’utilisateur, valide les entrées et contrôle les autorisations.
4. Le service métier applique les règles métier.
5. La couche d’accès aux données interagit avec la base.
6. L’application transforme le résultat en réponse et renvoie un code HTTP adapté.
7. Les journaux, métriques et traces enregistrent les informations opérationnelles nécessaires.

Cette séparation facilite le diagnostic, les tests et l’application des règles de sécurité.

---

## 9. Scalabilité, disponibilité et performance

### 9.1 Scalabilité verticale et horizontale

- **Scalabilité verticale (*scale up*) :** augmenter les ressources d’une machine (CPU, mémoire, stockage). C’est souvent simple, mais les ressources ont des limites et peuvent coûter cher.
- **Scalabilité horizontale (*scale out*) :** ajouter des instances pour répartir la charge. Cela exige de gérer l’état partagé, l’équilibrage, les pannes et parfois la cohérence.

Les applications sans état local persistant sont généralement plus simples à répliquer. Les sessions et fichiers nécessaires doivent être stockés dans un service partagé ou gérés explicitement.

### 9.2 Répartition de charge (*Load Balancing*)

Un répartiteur distribue les requêtes entre plusieurs instances saines.

- **Round robin :** distribue les requêtes successivement.
- **Least connections :** privilégie une instance ayant moins de connexions actives.
- **Health checks :** vérifient si une instance peut recevoir du trafic.

Le load balancing peut améliorer le débit et la disponibilité, mais ne corrige pas à lui seul un goulot d’étranglement commun, comme une base de données saturée.

### 9.3 Cache

Un cache conserve temporairement des résultats afin d’éviter de recalculer ou relire fréquemment les mêmes données.

- **Cache client ou navigateur :** réduit les requêtes répétées pour les ressources compatibles.
- **Cache applicatif :** conserve des résultats fréquemment utilisés.
- **Cache distribué :** partage des valeurs entre plusieurs instances.
- **Cache de stockage ou de base :** exploite les mécanismes fournis par le système sous-jacent.

Le principal défi est l’**invalidation** : déterminer quand une valeur en cache devient obsolète. Un cache mal géré peut servir des données incorrectes ou anciennes. Il faut considérer TTL, invalidation, clés, cohérence et confidentialité.

### 9.4 Réplication et partitionnement

- **Réplication :** conserver plusieurs copies de données, par exemple pour améliorer la disponibilité ou répartir les lectures.
- **Partitionnement (*partitioning*) :** diviser une table ou un ensemble de données en partitions.
- **Sharding :** répartir les données sur plusieurs nœuds selon une clé de partitionnement.

Une mauvaise clé peut créer un nœud surchargé, compliquer les requêtes ou rendre les migrations difficiles.

### 9.5 Disponibilité et résilience

- **Redondance :** disposer de composants de remplacement.
- **Health check :** vérifier l’état d’un composant.
- **Timeout :** limiter la durée d’attente d’une dépendance.
- **Retry :** réessayer après un échec transitoire, avec limites et délai progressif.
- **Circuit breaker :** interrompre temporairement les appels vers une dépendance défaillante.
- **Dégradation contrôlée :** conserver les fonctions essentielles lorsqu’une fonction secondaire est indisponible.
- **Sauvegarde :** copie permettant une restauration.
- **Plan de reprise :** procédures pour rétablir le service après un incident.

Les retries non contrôlés peuvent amplifier une panne. Les opérations réessayées doivent être idempotentes ou protégées contre les doublons lorsque nécessaire.

### 9.6 Cohérence, disponibilité et théorème CAP

Le théorème CAP concerne les systèmes distribués en présence d’une partition réseau. Il faut comprendre les compromis entre **cohérence** et **disponibilité** lorsqu’une communication fiable entre nœuds est impossible.

- **Cohérence forte :** les lectures respectent le modèle de cohérence défini après une écriture confirmée.
- **Cohérence éventuelle :** les copies peuvent temporairement diverger mais convergent si les mises à jour cessent et que la propagation aboutit.
- **Partition réseau :** des nœuds ne peuvent plus communiquer correctement.

CAP ne signifie pas que tout système choisit simplement deux propriétés en toutes circonstances. Le compromis devient particulièrement important lorsque le réseau est partitionné ; la conception doit préciser le comportement attendu et ses conséquences métier.

---

## 10. API, communication et traitements asynchrones

### 10.1 API et principes REST

Une API définit comment les composants communiquent. Une API HTTP bien conçue documente les ressources, méthodes, paramètres, formats, erreurs et règles d’accès.

Méthodes HTTP courantes :

- **GET :** lire une ressource ; méthode sûre par convention.
- **POST :** créer une ressource ou déclencher un traitement.
- **PUT :** remplacer la représentation d’une ressource, généralement de manière idempotente.
- **PATCH :** modifier partiellement une ressource.
- **DELETE :** supprimer une ressource, selon les règles du service.

Codes de statut fréquents :

| Code | Sens |
|---|---|
| 200 OK | Requête réussie. |
| 201 Created | Ressource créée. |
| 204 No Content | Succès sans contenu de réponse. |
| 400 Bad Request | Requête invalide. |
| 401 Unauthorized | Authentification absente ou invalide. |
| 403 Forbidden | Accès refusé malgré une requête comprise. |
| 404 Not Found | Ressource non trouvée. |
| 409 Conflict | Conflit avec l’état actuel de la ressource. |
| 422 Unprocessable Content | Contenu reçu mais sémantiquement invalide, selon l’API. |
| 429 Too Many Requests | Limite de requêtes dépassée. |
| 500 Internal Server Error | Erreur interne inattendue. |
| 503 Service Unavailable | Service temporairement indisponible. |

**Authentification :** vérifier l’identité. **Autorisation :** déterminer ce que cette identité a le droit de faire.

### 10.2 Communication synchrone et asynchrone

**Synchrone :** l’appelant attend la réponse. C’est simple à comprendre, mais la latence et les pannes d’une dépendance peuvent se répercuter sur l’appelant.

**Asynchrone :** l’appelant dépose un message ou lance un traitement sans attendre nécessairement son résultat final.

- **File de messages / broker :** découple producteurs et consommateurs.
- **Worker :** exécute un traitement en arrière-plan.
- **Événement :** annonce qu’un fait s’est produit.
- **Idempotence :** répéter une opération ne doit pas entraîner d’effet supplémentaire non voulu.
- **Dead-letter queue :** conserve les messages qui ne peuvent pas être traités après les tentatives prévues.

L’asynchronisme améliore le découplage et absorbe les pics, mais ajoute des questions de suivi, de reprise, d’ordre et de cohérence.

### 10.3 Gestion des erreurs et versionnement

Une API doit renvoyer des erreurs cohérentes, compréhensibles et sans fuite d’informations sensibles. Les détails techniques internes ne doivent pas être exposés aux clients.

Le versionnement peut être nécessaire lorsque des changements cassent la compatibilité. Il est préférable de définir une politique de dépréciation et d’annoncer les changements aux consommateurs.

---

## 11. Sécurité, observabilité et tests

### 11.1 Principes de sécurité à intégrer à la conception

- **Authentification :** vérifier l’identité d’un utilisateur ou d’un service.
- **Autorisation :** vérifier les permissions pour chaque opération et ressource.
- **Moindre privilège :** ne donner que les droits nécessaires.
- **Chiffrement en transit :** protéger les communications, notamment avec TLS.
- **Chiffrement au repos :** protéger les données stockées lorsque le risque et les exigences le justifient.
- **Validation des entrées :** vérifier format, type, taille et règles métier.
- **Requêtes paramétrées :** réduire le risque d’injection SQL.
- **Gestion des secrets :** ne pas placer mots de passe, clés ou jetons dans le code ou les dépôts.
- **Journalisation d’audit :** tracer les opérations sensibles sans enregistrer inutilement des secrets.
- **Sauvegardes testées :** vérifier que les données peuvent effectivement être restaurées.
- **Protection des API :** contrôler les droits, les quotas et les abus possibles.

Le contrôle d’accès basé sur les rôles (**RBAC**) attribue des permissions à des rôles. Un utilisateur peut, par exemple, consulter un dossier alors qu’un responsable habilité peut le valider. Les règles exactes dépendent du domaine métier.

### 11.2 Observabilité et supervision

L’observabilité aide à comprendre l’état interne du système à partir de ses sorties.

- **Logs (journaux) :** événements, erreurs et actions significatives.
- **Métriques :** taux d’erreur, latence, débit, utilisation CPU et mémoire.
- **Traces distribuées :** suivi d’une requête à travers plusieurs composants.
- **Alertes :** notifications déclenchées par des seuils ou conditions.
- **Tableaux de bord :** vue synthétique de l’état et des tendances du système.

La supervision détecte des symptômes ; le diagnostic cherche la cause. Les journaux doivent être horodatés, protégés et conçus pour éviter d’exposer des secrets ou des données personnelles inutiles.

### 11.3 Types de tests

- **Test unitaire :** vérifie une unité isolée, par exemple une fonction.
- **Test d’intégration :** vérifie les interactions entre composants, par exemple un service et une base de données.
- **Test système :** vérifie le système complet.
- **Test d’acceptation :** vérifie que le résultat répond aux besoins métier.
- **Test de non-régression :** vérifie qu’une modification n’a pas cassé une fonction existante.
- **Test de charge :** mesure le comportement sous une charge définie.
- **Test de sécurité :** recherche des vulnérabilités et des erreurs de contrôle d’accès.
- **Test de restauration :** confirme qu’une sauvegarde permet de rétablir les données.

Une stratégie de test combine plusieurs niveaux. L’automatisation accélère les vérifications répétées, mais ne remplace pas tous les tests exploratoires, ergonomiques ou métier.

---

## 12. Étude de cas transversale

### Concevoir une application de gestion de biens et de dossiers

Considérons une application interne permettant d’inventorier des biens, de suivre des dossiers, de gérer les affectations et de produire des rapports. Cet exemple illustre l’application des concepts ; il ne décrit pas un système réel particulier.

### 12.1 Besoins fonctionnels possibles

- Enregistrer et mettre à jour un bien.
- Rechercher un bien par référence, localisation ou statut.
- Créer un dossier et lui associer des documents.
- Soumettre un dossier à validation.
- Contrôler les droits des agents et responsables.
- Consulter l’historique des modifications.
- Produire des rapports selon des filtres autorisés.

### 12.2 Architecture logique

    Utilisateur
        |
    Interface web
        |
    API HTTP / authentification / validation
        |
    Services métier
        |--------------------|
    Dépôts de données     Traitements asynchrones
        |                     |
    Base relationnelle    File de messages / workers
        |
    Stockage documentaire

    Transversal : journaux, métriques, traces, audit, sauvegardes

Les composants exacts dépendent du volume, des contraintes et des systèmes déjà en place.

### 12.3 Modélisation des données

Tables possibles :

- **Bien :** identifiant, référence, type, localisation, statut.
- **Dossier :** identifiant, référence, statut, dates, responsable.
- **Agent :** identifiant, identité professionnelle, rôle.
- **Affectation :** liens entre biens, dossiers ou agents selon les règles métier.
- **Document :** métadonnées, emplacement de stockage, type et lien vers le dossier.
- **Historique :** objet concerné, action, auteur, horodatage et métadonnées utiles.

Les contraintes doivent empêcher les références dupliquées lorsqu’elles doivent être uniques, garantir les clés étrangères et encadrer les transitions de statut.

### 12.4 Scénario de validation

1. L’agent authentifié demande la validation d’un dossier.
2. L’API vérifie le format de la requête et les droits.
3. Le service métier vérifie que le dossier peut être validé dans son état actuel.
4. Une transaction met à jour le statut et enregistre l’événement d’audit.
5. L’API renvoie le résultat avec un statut HTTP adapté.
6. Si nécessaire, un événement déclenche en arrière-plan une notification ou la génération d’un rapport.
7. Les journaux et métriques permettent de diagnostiquer un échec.

### 12.5 Risques de conception à considérer

- Accès à un dossier sans permission.
- Modifications concurrentes et transitions de statut invalides.
- Recherche lente faute d’index adapté.
- Perte de documents ou absence de stratégie de restauration.
- Doublons lors de la répétition d’une requête.
- Exposition de données sensibles dans les journaux.
- Dépendance indisponible bloquant un traitement secondaire.

---

## 13. Exercices d’application

### Exercice 1 — Classer les exigences

Pour une application de suivi de dossiers, classez chaque élément :

1. « Un agent peut rechercher un dossier par référence. »
2. « 95 % des recherches répondent en moins de deux secondes sous la charge définie. »
3. « Seuls les responsables habilités peuvent valider un dossier. »
4. « Les opérations doivent être journalisées et consultables par les rôles autorisés. »

**Correction :**
1. Fonctionnelle.
2. Non fonctionnelle de performance.
3. Exigence fonctionnelle de contrôle d’accès, fondée sur une règle métier.
4. Exigence fonctionnelle d’audit et exigence de sécurité/traçabilité.

### Exercice 2 — Choisir un diagramme UML

- Identifier les acteurs et les fonctionnalités : **cas d’utilisation**.
- Représenter les entités et leurs relations : **classes**.
- Décrire l’ordre des appels entre interface, API et base de données : **séquence**.
- Décrire les étapes de validation d’un dossier : **activités**.
- Représenter les états Brouillon, Soumis, Validé et Rejeté : **états-transitions**.
- Décrire les composants logiciels : **composants**.
- Décrire les serveurs et les artefacts déployés : **déploiement**.

### Exercice 3 — Choisir une architecture

Une petite application interne doit être maintenue par une équipe réduite. Un **monolithe modulaire en couches** peut être un bon point de départ. Si des besoins démontrés d’isolation, de déploiement indépendant ou de mise à l’échelle apparaissent, une séparation en services peut être étudiée. La décision doit reposer sur les exigences et les coûts, pas sur la popularité d’une technologie.

### Exercice 4 — Garantir la cohérence d’une validation

Lorsqu’un dossier est validé, son statut doit être mis à jour et l’événement doit être ajouté à l’historique. Si les deux opérations doivent toujours réussir ensemble, une transaction permet de les valider ensemble ou de les annuler ensemble en cas d’échec.

### Exercice 5 — Diagnostiquer une recherche lente

Avant d’ajouter des serveurs, mesurer le temps de réponse et examiner les requêtes SQL, les index, les volumes transférés, le cache et les appels externes. Un cache peut aider si les données sont fréquemment lues et qu’une stratégie d’invalidation correcte existe. Ajouter des instances applicatives ne résout pas nécessairement un goulot d’étranglement dans la base de données.

### Exercice 6 — Distinguer authentification et autorisation

- L’utilisateur prouve son identité avec des identifiants valides : **authentification**.
- Le système vérifie qu’il peut modifier un dossier précis : **autorisation**.

Les deux contrôles sont nécessaires ; une identité authentifiée ne doit pas obtenir automatiquement tous les droits.

---

## 14. Synthèse des notions essentielles

1. **Analyse des besoins :** identifier objectifs, utilisateurs, périmètre et contraintes.
2. **Exigence fonctionnelle :** ce que le système doit faire ; **non fonctionnelle :** qualité ou contrainte à respecter.
3. **Cahier des charges :** contexte, objectifs, périmètre, exigences, contraintes et critères d’acceptation.
4. **Cascade :** phases principalement séquentielles ; **Agile :** adaptation et retours fréquents ; **spirale :** analyse des risques.
5. **UML :** langage de modélisation, ni méthode de développement ni langage de programmation.
6. **Cas d’utilisation :** acteurs et objectifs ; **classes :** structure ; **séquence :** échanges dans le temps ; **activités :** flux de travail.
7. **include :** comportement inclus obligatoirement ; **extend :** extension conditionnelle.
8. **Bonne conception :** responsabilités claires, forte cohésion, faible couplage et interfaces explicites.
9. **SOLID :** cinq principes de conception orientée objet visant à améliorer la maintenabilité et l’extensibilité.
10. **MCD → MLD → MPD :** modèles conceptuel, logique et physique des données.
11. **Normalisation :** limiter redondances et anomalies ; dénormalisation : compromis d’optimisation à justifier.
12. **ACID :** Atomicité, Cohérence, Isolation, Durabilité.
13. **Scalabilité verticale :** renforcer une machine ; **horizontale :** ajouter des instances.
14. **Cache :** accélérer certains accès ; **réplication :** maintenir plusieurs copies ; **sharding :** répartir les données.
15. **System Design :** exigences, charge, API, données, architecture, sécurité, résilience et compromis.
16. **Authentification :** vérifier l’identité ; **autorisation :** vérifier les permissions.
17. **Observabilité :** logs, métriques, traces et alertes.
18. **Tests :** unitaires, intégration, système, acceptation, non-régression, charge et sécurité.

---
