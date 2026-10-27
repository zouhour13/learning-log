# Bases de données et SQL

> **Auteur :** Zouhour Bellamine

Cette fiche présente les fondamentaux des bases de données relationnelles, la modélisation, SQL, les contraintes d'intégrité, les jointures, les agrégations, la normalisation, les transactions, les index, les vues, la sécurité et les opérations de sauvegarde.

## Sommaire

1. [Fondamentaux](#1-fondamentaux-des-bases-de-données)
2. [Types SQL](#2-types-de-données-sql)
3. [Clés](#3-clés-primaires-étrangères-et-autres-clés)
4. [Contraintes d'intégrité](#4-contraintes-dintégrité)
5. [Catégories de commandes SQL](#5-catégories-de-commandes-sql)
6. [SELECT et filtres](#6-select-et-filtres)
7. [NULL](#7-null-et-logique-à-trois-valeurs)
8. [Jointures](#8-jointures-sql)
9. [Agrégations](#9-agrégations-group-by-et-having)
10. [Sous-requêtes et opérateurs ensemblistes](#10-sous-requêtes-et-opérateurs-ensemblistes)
11. [Modélisation relationnelle](#11-modélisation-relationnelle)
12. [Normalisation](#12-normalisation)
13. [Transactions ACID](#13-transactions-et-propriétés-acid)
14. [Index](#14-index)
15. [Vues](#15-vues-sql)
16. [Sécurité](#16-sécurité-et-privilèges)
17. [Sauvegarde et reprise](#17-sauvegarde-journalisation-et-reprise)
18. [Confusions fréquentes](#18-confusions-fréquentes)
19. [Pièges et astuces](#19-pièges-et-astuces-à-mémoriser)
20. [Auto-évaluation](#20-questions-dauto-évaluation)

## 1. Fondamentaux des bases de données

- **Donnée :** valeur brute, par exemple un identifiant, une date ou un montant.
- **Information :** donnée interprétée dans un contexte.
- **Base de données (BD) :** ensemble organisé de données liées.
- **SGBD :** logiciel permettant de créer, consulter, modifier, sécuriser et administrer une base de données.
- **SGBDR :** SGBD relationnel reposant sur des tables et des relations.
- **SQL (*Structured Query Language*) :** langage utilisé pour définir, manipuler et interroger les données relationnelles.

Exemples de SGBDR : PostgreSQL, MySQL, Oracle Database et Microsoft SQL Server.

### Concepts du modèle relationnel

- **Relation :** représentation théorique correspondant à une table.
- **Tuple :** ligne d'une relation.
- **Attribut :** colonne.
- **Domaine :** ensemble des valeurs autorisées pour un attribut.
- **Schéma :** structure définissant les colonnes et leurs types.
- **Instance :** données présentes dans la base à un instant donné.

### Rôle d'un SGBD

- Réduire la redondance inutile et maintenir la cohérence.
- Gérer les accès concurrents et les transactions.
- Contrôler les droits d'accès.
- Appliquer les contraintes d'intégrité.
- Sauvegarder et restaurer les données.
- Optimiser l'exécution des requêtes.

Les bases de données peuvent être relationnelles, documentaires, clé-valeur, orientées colonnes ou orientées graphes.

## 2. Types de données SQL

| Type | Usage | Exemple |
|---|---|---|
| `INT` / `INTEGER` | Entier | `42` |
| `DECIMAL(p,s)` / `NUMERIC` | Nombre décimal exact | `1250.50` |
| `FLOAT` / `REAL` | Nombre approximatif | `3.14` |
| `CHAR(n)` | Chaîne de longueur fixe | Code |
| `VARCHAR(n)` | Chaîne de longueur variable | Nom |
| `TEXT` | Texte long, selon le moteur | Description |
| `DATE` | Date | `2026-10-27` |
| `TIME` | Heure | `14:30:00` |
| `TIMESTAMP` | Date et heure | Horodatage |
| `BOOLEAN` | Valeur logique | `TRUE` / `FALSE` |

**À retenir :**
- `DECIMAL`/`NUMERIC` convient généralement aux montants exacts ; `FLOAT` est approximatif.
- `CHAR` est de longueur fixe, contrairement à `VARCHAR`.
- Les types et leur comportement exact peuvent varier selon le SGBD.

## 3. Clés primaires, étrangères et autres clés

### Clé primaire — `PRIMARY KEY`

Identifie chaque ligne de manière unique. Elle impose l'unicité et l'absence de `NULL`. Une table possède une seule contrainte de clé primaire, mais celle-ci peut être composée de plusieurs colonnes.

```sql
CREATE TABLE Agent (
    id_agent INT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);
```

### Clé étrangère — `FOREIGN KEY`

Référence une clé admissible d'une autre table ou de la même table et maintient l'intégrité référentielle.

```sql
CREATE TABLE Dossier (
    id_dossier INT PRIMARY KEY,
    titre VARCHAR(150) NOT NULL,
    id_agent INT,
    FOREIGN KEY (id_agent) REFERENCES Agent(id_agent)
);
```

Si `id_agent` est renseigné, il doit correspondre à une valeur référencée existante. La colonne peut être `NULL` si elle n'est pas déclarée `NOT NULL`.

### Autres clés

- **Clé candidate :** ensemble minimal d'attributs identifiant une ligne de façon unique.
- **Clé alternative :** clé candidate non choisie comme clé primaire.
- **Superclé :** ensemble d'attributs identifiant une ligne de manière unique, éventuellement avec des attributs superflus.
- **Clé composite :** clé composée de plusieurs colonnes.
- **Clé naturelle :** identifiant issu du domaine métier.
- **Clé artificielle (surrogate key) :** identifiant créé pour la base.

Exemple de clé composite :

```sql
CREATE TABLE Affectation (
    id_agent INT,
    id_dossier INT,
    date_affectation DATE,
    PRIMARY KEY (id_agent, id_dossier)
);
```

Le couple `(id_agent, id_dossier)` doit être unique. Chaque composant peut se répéter séparément.

## 4. Contraintes d'intégrité

- **`NOT NULL` :** impose une valeur non nulle.
- **`UNIQUE` :** interdit les doublons pour la colonne ou combinaison concernée. Le traitement des `NULL` varie selon le moteur.
- **`CHECK` :** impose une condition.
- **`DEFAULT` :** définit la valeur utilisée si aucune valeur n'est fournie, selon les règles du moteur.
- **`PRIMARY KEY` :** unicité et absence de `NULL`.
- **`FOREIGN KEY` :** contrôle les références.

```sql
CREATE TABLE Bien (
    id_bien INT PRIMARY KEY,
    surface DECIMAL(10,2) NOT NULL CHECK (surface > 0),
    statut VARCHAR(30) DEFAULT 'En attente'
);
```

Une condition `CHECK` évaluée à `UNKNOWN` à cause de `NULL` peut être acceptée ; ajoutez `NOT NULL` lorsque la valeur est obligatoire.

### Actions référentielles

- `ON DELETE RESTRICT` / `NO ACTION` : empêche ou fait échouer la suppression lorsque la référence n'est pas autorisée.
- `ON DELETE CASCADE` : supprime aussi les lignes dépendantes.
- `ON DELETE SET NULL` : remplace la référence par `NULL), si permis.
- `ON DELETE SET DEFAULT` : applique la valeur par défaut lorsque l'action est prise en charge et valide.

Une clé étrangère n'est pas automatiquement unique : plusieurs dossiers peuvent référencer le même agent.

## 5. Catégories de commandes SQL

| Catégorie | Signification | Commandes |
|---|---|---|
| DDL | Définition des données | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` |
| DML | Manipulation des données | `INSERT`, `UPDATE`, `DELETE` |
| DQL | Interrogation des données (classification courante) | `SELECT` |
| DCL | Contrôle des privilèges | `GRANT`, `REVOKE` |
| TCL | Contrôle des transactions | `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

La classification de `SELECT` en DQL est courante, mais certaines classifications l'intègrent au DML.

### DDL : structure

```sql
CREATE TABLE Agent (
    id_agent INT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

ALTER TABLE Agent ADD email VARCHAR(150);

DROP TABLE Agent;

TRUNCATE TABLE Agent;
```

- `DROP` supprime l'objet et sa définition.
- `TRUNCATE` vide la table tout en conservant sa structure ; les effets sur transactions, déclencheurs, compteurs et contraintes dépendent du SGBD.

### DML : données

```sql
INSERT INTO Agent (id_agent, nom)
VALUES (1, 'Amira');

UPDATE Agent
SET nom = 'Amira Ben Ali'
WHERE id_agent = 1;

DELETE FROM Agent
WHERE id_agent = 1;
```

**Danger :** sans `WHERE`, `UPDATE` peut modifier toutes les lignes et `DELETE` peut supprimer toutes les lignes.

## 6. SELECT et filtres

```sql
SELECT titre, montant
FROM Dossier
WHERE montant > 3000
ORDER BY montant DESC;
```

- `SELECT` : colonnes et expressions à afficher.
- `FROM` : sources de données.
- `WHERE` : filtre les lignes.
- `DISTINCT` : élimine les doublons du résultat.
- `ORDER BY` : trie le résultat.
- `LIMIT` : limite le nombre de lignes dans les moteurs qui le prennent en charge ; la syntaxe varie.

Sans `ORDER BY`, aucun ordre des lignes n'est garanti.

### Opérateurs

| Opérateur | Sens |
|---|---|
| `=` | Égal |
| `<>` / `!=` | Différent, selon la syntaxe acceptée |
| `>`, `<`, `>=`, `<=` | Comparaisons |
| `AND` | Toutes les conditions doivent être vraies |
| `OR` | Au moins une condition vraie |
| `NOT` | Négation |
| `BETWEEN` | Intervalle avec bornes incluses |
| `IN` | Appartenance à une liste ou un résultat |
| `LIKE` | Motif textuel |
| `IS NULL` | Teste une valeur nulle |

```sql
SELECT *
FROM Dossier
WHERE montant BETWEEN 2000 AND 5000;
```

Les bornes de `BETWEEN` sont incluses.

### Motifs LIKE

- `%` : zéro, un ou plusieurs caractères.
- `_` : exactement un caractère.

```sql
SELECT * FROM Agent WHERE nom LIKE 'A%';
SELECT * FROM Agent WHERE nom LIKE '_mira';
```

La sensibilité à la casse dépend du SGBD et de la collation.

### Priorité logique

La priorité usuelle est `NOT`, puis `AND), puis `OR`. Utilisez des parenthèses pour rendre la logique explicite.

```sql
WHERE statut = 'Validé'
   OR (statut = 'En attente' AND montant > 3000)
```

## 7. NULL et logique à trois valeurs

`NULL` représente une valeur inconnue, absente ou non renseignée ; ce n'est ni zéro ni une chaîne vide.

Incorrect : `WHERE montant = NULL`

Correct :

```sql
WHERE montant IS NULL
WHERE montant IS NOT NULL
```

SQL utilise une logique à trois valeurs : `TRUE`, `FALSE) et `UNKNOWN`. Les lignes pour lesquelles `WHERE` donne `FALSE` ou `UNKNOWN` ne sont pas retenues.

- `COUNT(*)` compte les lignes, y compris lorsque certaines colonnes sont nulles.
- `COUNT(colonne)` compte les valeurs non `NULL` de cette colonne.
- `SUM`, `AVG`, `MIN` et `MAX` ignorent généralement les valeurs `NULL`.
- `NOT IN` peut produire des résultats surprenants si la liste ou la sous-requête contient `NULL`. `NOT EXISTS` est souvent plus robuste.

## 8. Jointures SQL

Une jointure combine les lignes de plusieurs tables selon une condition.

### INNER JOIN

Ne conserve que les lignes correspondant à la condition.

```sql
SELECT a.nom, d.titre
FROM Agent a
INNER JOIN Dossier d ON a.id_agent = d.id_agent;
```

Si un agent possède plusieurs dossiers, son nom apparaît plusieurs fois.

### LEFT JOIN

Conserve toutes les lignes de la table gauche et ajoute les correspondances de droite ; sans correspondance, les colonnes de droite valent `NULL`.

```sql
SELECT a.nom, d.titre
FROM Agent a
LEFT JOIN Dossier d ON a.id_agent = d.id_agent;
```

### RIGHT JOIN

Conserve toutes les lignes de la table droite et les correspondances de gauche.

### FULL OUTER JOIN

Conserve toutes les lignes des deux tables, qu'elles correspondent ou non. Tous les SGBDR ne prennent pas directement en charge cette syntaxe (notamment MySQL).

### CROSS JOIN

Produit le produit cartésien. Avec 3 lignes d'un côté et 4 de l'autre, le résultat contient 12 combinaisons.

### SELF JOIN

Joint une table à elle-même, par exemple pour relier des employés à leurs responsables.

```sql
SELECT e.nom AS employe, r.nom AS responsable
FROM Agent e
LEFT JOIN Agent r ON e.id_responsable = r.id_agent;
```

Cet exemple suppose que la colonne `id_responsable` existe.

### Comparaison

| Jointure | Résultat |
|---|---|
| `INNER JOIN` | Correspondances uniquement |
| `LEFT JOIN` | Toutes les lignes de gauche |
| `RIGHT JOIN` | Toutes les lignes de droite |
| `FULL OUTER JOIN` | Toutes les lignes des deux côtés |
| `CROSS JOIN` | Toutes les combinaisons |
| `SELF JOIN` | Table jointe à elle-même |

### Piège : ON contre WHERE

```sql
SELECT a.nom, d.titre
FROM Agent a
LEFT JOIN Dossier d
  ON a.id_agent = d.id_agent
 AND d.statut = 'Validé';
```

Tous les agents sont conservés, même ceux qui n'ont pas de dossier validé.

En revanche, ajouter `WHERE d.statut = 'Validé'` élimine les lignes sans dossier correspondant, car leur statut est `NULL`. Le résultat se comporte alors comme une jointure interne pour cette condition.

## 9. Agrégations, GROUP BY et HAVING

### Fonctions d'agrégation

| Fonction | Rôle |
|---|---|
| `COUNT(*)` | Nombre de lignes |
| `COUNT(colonne)` | Nombre de valeurs non NULL |
| `SUM(colonne)` | Somme |
| `AVG(colonne)` | Moyenne |
| `MIN(colonne)` | Minimum |
| `MAX(colonne)` | Maximum |

```sql
SELECT COUNT(*) AS nombre_dossiers,
       AVG(montant) AS montant_moyen
FROM Dossier;
```

### GROUP BY

Regroupe les lignes selon une ou plusieurs colonnes.

```sql
SELECT statut, COUNT(*) AS nombre
FROM Dossier
GROUP BY statut;
```

Une colonne sélectionnée qui n'est ni agrégée ni constante doit normalement figurer dans `GROUP BY), sous réserve des règles du moteur et des dépendances fonctionnelles reconnues.

### WHERE contre HAVING

- `WHERE` filtre les lignes avant le regroupement.
- `HAVING` filtre les groupes après le regroupement.

```sql
SELECT id_agent, COUNT(*) AS nombre_dossiers
FROM Dossier
WHERE statut = 'Validé'
GROUP BY id_agent
HAVING COUNT(*) >= 2;
```

On filtre les dossiers validés, on regroupe par agent, puis on conserve les groupes comptant au moins deux dossiers. Une agrégation telle que `COUNT(*)` ne se place normalement pas directement dans `WHERE`.

## 10. Sous-requêtes et opérateurs ensemblistes

### Sous-requête et IN

```sql
SELECT nom
FROM Agent
WHERE id_agent IN (
    SELECT id_agent
    FROM Dossier
    WHERE statut = 'Validé'
);
```

### EXISTS et NOT EXISTS

- `EXISTS` teste si une sous-requête renvoie au moins une ligne.
- `NOT EXISTS` teste qu'aucune ligne correspondante n'existe.

```sql
SELECT a.nom
FROM Agent a
WHERE EXISTS (
    SELECT 1
    FROM Dossier d
    WHERE d.id_agent = a.id_agent
);
```

Cette requête renvoie les agents ayant au moins un dossier.

### UNION et variantes

- `UNION` combine les résultats et élimine les doublons.
- `UNION ALL` conserve les doublons et évite l'étape de déduplication.
- `INTERSECT` renvoie les lignes communes.
- `EXCEPT` renvoie les lignes du premier résultat absentes du second ; certains moteurs utilisent `MINUS`.

Les requêtes combinées doivent avoir le même nombre de colonnes, dans le même ordre, et des types compatibles.

### Ordre logique simplifié d'une requête

1. `FROM` / `JOIN` : sources et combinaisons.
2. `WHERE` : filtrage des lignes.
3. `GROUP BY` : constitution des groupes.
4. `HAVING` : filtrage des groupes.
5. `SELECT` : choix des colonnes et expressions.
6. `DISTINCT) : élimination des doublons si demandé.
7. `ORDER BY` : tri.
8. `LIMIT` : limitation du résultat.

Il s'agit de l'ordre logique conceptuel, pas nécessairement de l'ordre physique choisi par l'optimiseur.

## 11. Modélisation relationnelle

### Cardinalités

- **1:1 :** une occurrence correspond au maximum à une autre.
- **1:N :** une occurrence peut être associée à plusieurs occurrences de l'autre entité.
- **N:N :** plusieurs occurrences de chaque entité peuvent être associées.

Une relation N:N est généralement représentée par une table d'association.

Exemple :

- `Agent(id_agent, nom)`
- `Dossier(id_dossier, titre)`
- `Affectation(id_agent, id_dossier, date_affectation)`

La table d'association contient généralement les clés étrangères des deux entités et peut avoir une clé primaire composite.

### Dépendances fonctionnelles

Une dépendance `X → Y` signifie que X détermine une valeur unique de Y dans la relation considérée.

Exemple : `id_agent → nom_agent`.

La réciproque n'est pas nécessairement vraie : plusieurs agents peuvent avoir le même nom.

## 12. Normalisation

La normalisation réduit les redondances et les anomalies d'insertion, de mise à jour et de suppression.

### Première forme normale (1FN)

Chaque cellule contient une valeur atomique au regard du domaine choisi ; éviter les listes répétées dans une seule colonne.

Au lieu de stocker plusieurs téléphones dans une cellule, on peut créer une table `TelephoneAgent(id_agent, telephone)` liée à `Agent(id_agent, nom)`.

### Deuxième forme normale (2FN)

La relation est en 1FN et chaque attribut non premier dépend de la totalité de chaque clé candidate : aucune dépendance partielle vis-à-vis d'une partie d'une clé candidate.

Exemple de table mal organisée :

`Affectation(id_agent, id_dossier, nom_agent, titre_dossier, date_affectation)`

Si la clé est `(id_agent, id_dossier)` :
- `id_agent → nom_agent`
- `id_dossier → titre_dossier`
- `(id_agent, id_dossier) → date_affectation`

Le nom de l'agent et le titre du dossier dépendent chacun d'une partie seulement de la clé composite. Décomposer en tables `Agent`, `Dossier` et `Affectation`.

### Troisième forme normale (3FN)

Une relation en 2FN ne doit pas présenter de dépendance transitive problématique des attributs non premiers vis-à-vis d'une clé candidate.

Exemple : `Agent(id_agent, nom_agent, id_service, nom_service)), avec :
- `id_agent → id_service`
- `id_service → nom_service`

Décomposer en `Agent(id_agent, nom_agent, id_service)` et `Service(id_service, nom_service)`.

### Forme normale de Boyce-Codd (BCNF)

Pour toute dépendance fonctionnelle non triviale `X → Y`, X doit être une superclé. La BCNF est plus stricte que la 3FN.

**Mémo :**
- 1FN : valeurs atomiques.
- 2FN : pas de dépendance partielle.
- 3FN : pas de dépendance transitive problématique des attributs non premiers.
- BCNF : chaque déterminant non trivial est une superclé.

### Anomalies de conception

- **Insertion :** impossible d'ajouter une information indépendamment d'une autre dans un schéma mal conçu.
- **Mise à jour :** une même information répétée doit être modifiée partout, avec risque d'incohérence.
- **Suppression :** supprimer une ligne peut faire perdre une information indépendante.

La normalisation n'impose pas de multiplier les tables sans raison. Une dénormalisation peut être choisie pour certaines charges de lecture si ses conséquences sont maîtrisées.

## 13. Transactions et propriétés ACID

Une transaction est une unité logique de travail pouvant comprendre plusieurs opérations SQL.

### ACID

- **Atomicité (Atomicity) :** tout est exécuté ou les effets de la transaction sont annulés.
- **Cohérence (Consistency) :** une transaction correctement exécutée fait passer la base d'un état valide à un autre.
- **Isolation (Isolation) :** les transactions concurrentes n'interfèrent pas au-delà des anomalies permises par le niveau d'isolation.
- **Durabilité (Durability) :** les changements validés sont préservés selon les garanties du SGBD.

Mémo : tout ou rien ; règles respectées ; concurrence maîtrisée ; résultat conservé.

### COMMIT, ROLLBACK, SAVEPOINT

```sql
BEGIN;

UPDATE Compte
SET solde = solde - 100
WHERE id_compte = 1;

UPDATE Compte
SET solde = solde + 100
WHERE id_compte = 2;

COMMIT;
```

- `BEGIN` / `START TRANSACTION` : commence une transaction explicite, selon le moteur.
- `COMMIT` : valide les changements.
- `ROLLBACK` : annule les changements non validés.
- `SAVEPOINT` : définit un point de retour intermédiaire.
- `ROLLBACK TO SAVEPOINT` : revient à ce point sans forcément annuler toute la transaction.

Un vrai transfert doit aussi vérifier l'existence des comptes, le solde disponible et le nombre de lignes modifiées.

### Niveaux d'isolation

| Niveau | Lecture sale | Lecture non répétable | Lecture fantôme |
|---|---|---|---|
| `READ UNCOMMITTED` | Possible | Possible | Possible |
| `READ COMMITTED` | Évitée | Possible | Possible |
| `REPEATABLE READ` | Évitée | Évitée | Dépend des garanties et du moteur |
| `SERIALIZABLE` | Évitée | Évitée | Évitée dans le modèle SQL classique |

- **Lecture sale :** lire une modification non validée.
- **Lecture non répétable :** relire la même ligne et obtenir une autre valeur après la validation d'une autre transaction.
- **Lecture fantôme :** une requête répétée renvoie de nouvelles lignes satisfaisant son prédicat.

Les SGBDR peuvent offrir des garanties supplémentaires (par exemple via MVCC). `SERIALIZABLE` peut entraîner des attentes, des interblocages ou des erreurs de sérialisation nécessitant une nouvelle tentative.

### Verrous et deadlocks

- **Verrou partagé :** permet généralement plusieurs lectures compatibles.
- **Verrou exclusif :** protège une modification contre des opérations incompatibles.
- **Deadlock (interblocage) :** plusieurs transactions s'attendent mutuellement ; le SGBD peut annuler une transaction victime.

L'application doit gérer ces échecs et, si nécessaire, réessayer la transaction.

## 14. Index

Un index est une structure auxiliaire pouvant accélérer certaines recherches, jointures ou opérations de tri. Il consomme de l'espace et augmente le coût des écritures.

```sql
CREATE INDEX idx_dossier_statut
ON Dossier(statut);
```

### Types et notions

- **B-tree :** index courant pour égalités, plages et tris compatibles.
- **Index unique :** interdit les doublons de clé d'index selon les règles du moteur.
- **Index composite :** index sur plusieurs colonnes.
- **Index textuel :** spécialisé dans la recherche de texte.
- **Index de hachage :** adapté à certains tests d'égalité, généralement pas aux recherches par intervalle.
- **Index couvrant :** peut permettre de répondre à une requête à partir de l'index seul.

### Ordre d'un index composite

```sql
CREATE INDEX idx_dossier_statut_date
ON Dossier(statut, date_creation);
```

L'ordre des colonnes compte. Un index B-tree composite est généralement plus utile pour les recherches utilisant le préfixe gauche (ici, `statut`) que pour une recherche portant uniquement sur `date_creation`.

### Quand indexer ?

Candidats fréquents :
- colonnes filtrées souvent ;
- colonnes utilisées dans les jointures ;
- colonnes utilisées pour certains tris ou regroupements.

Limites :
- espace de stockage ;
- coût supplémentaire pour les écritures ;
- utilité limitée sur une colonne peu sélective dans certains scénarios ;
- l'optimiseur peut préférer un parcours complet de table.

Un index ne garantit pas que toutes les requêtes seront plus rapides.

## 15. Vues SQL

### Vue classique

Une vue est une table virtuelle définie par une requête.

```sql
CREATE VIEW DossiersValides AS
SELECT id_dossier, titre, id_agent
FROM Dossier
WHERE statut = 'Validé';
```

On peut ensuite interroger la vue :

```sql
SELECT * FROM DossiersValides;
```

Une vue classique stocke principalement la définition de la requête ; les données proviennent généralement des tables sources au moment de l'utilisation.

Utilités :
- simplifier des requêtes ;
- réutiliser une logique de sélection ;
- fournir une interface de données stable ;
- limiter l'exposition de colonnes ou de lignes, avec des privilèges adaptés.

Une vue seule ne garantit pas la sécurité : les permissions et les mécanismes spécifiques du SGBD restent essentiels.

### Vue matérialisée

Une vue matérialisée conserve physiquement un résultat calculé et peut accélérer les lectures, mais nécessite du stockage et une actualisation. Sa disponibilité et son mode d'actualisation dépendent du moteur.

| Vue classique | Vue matérialisée |
|---|---|
| Définition de requête | Résultat matérialisé |
| Données généralement lues depuis les sources | Résultat stocké |
| Résultat recalculé à l'utilisation, selon le moteur | Actualisation éventuellement nécessaire |
| Stockage du résultat non requis par principe | Stockage supplémentaire |

Certaines vues sont modifiables ; d'autres ne le sont pas. Cela dépend notamment des jointures, agrégations, expressions et règles du SGBD.

## 16. Sécurité et privilèges

- **Authentification :** vérifier l'identité.
- **Autorisation :** déterminer les actions permises.
- **Moindre privilège :** accorder uniquement les droits nécessaires.
- **Audit :** conserver des traces pertinentes.
- **Chiffrement :** protéger les données en transit et, selon le besoin, au repos.
- **Requêtes paramétrées :** protection fondamentale contre l'injection SQL.
- **Sauvegarde et restauration :** contribuer à la résilience.

### GRANT et REVOKE

```sql
GRANT SELECT ON Dossier TO lecteur;
REVOKE INSERT ON Dossier FROM lecteur;
```

`GRANT` accorde des privilèges ; `REVOKE` les retire. Les privilèges peuvent inclure `SELECT`, `INSERT`, `UPDATE`, `DELETE) et certaines opérations sur les objets.

Ne construisez pas une requête SQL par concaténation directe d'entrées non fiables : privilégiez les requêtes préparées et paramétrées.

## 17. Sauvegarde, journalisation et reprise

- **Sauvegarde complète :** copie de référence des données concernées.
- **Sauvegarde différentielle :** changements depuis une sauvegarde complète de référence.
- **Sauvegarde incrémentale :** changements depuis la sauvegarde précédente pertinente.
- **Journal des transactions :** trace les opérations et contribue à la récupération selon le SGBD.
- **Restauration :** reconstitue les données à partir des sauvegardes et éventuellement des journaux.
- **Réplication :** maintient des copies de données sur plusieurs instances.

La réplication n'est pas une sauvegarde : une suppression ou une corruption peut être répliquée. Il faut tester les restaurations, pas seulement vérifier que les fichiers de sauvegarde existent.

## 18. Confusions fréquentes

| Notion A | Notion B | Différence |
|---|---|---|
| `DELETE` | `DROP` | Supprime des lignes / supprime l'objet et sa définition |
| `DELETE` | `TRUNCATE` | Supprime les lignes ciblées / vide globalement la table, avec sémantique dépendante du moteur |
| `WHERE` | `HAVING` | Filtre les lignes / filtre les groupes |
| `PRIMARY KEY` | `FOREIGN KEY` | Identifie les lignes / référence une clé |
| `UNIQUE` | `NOT NULL` | Unicité / valeur obligatoire |
| `INNER JOIN` | `LEFT JOIN` | Correspondances / toutes les lignes de gauche |
| `COUNT(*)` | `COUNT(colonne)` | Toutes les lignes / valeurs non NULL |
| `UNION` | `UNION ALL` | Élimine les doublons / les conserve |
| `COMMIT` | `ROLLBACK` | Valide / annule les modifications non validées |
| Index | Vue | Structure d'accès / requête enregistrée |
| Vue classique | Vue matérialisée | Résultat généralement calculé à la lecture / résultat stocké et actualisé |
| Atomicité | Durabilité | Tout ou rien / conservation après validation |
| 2FN | 3FN | Dépendances partielles / dépendances transitives problématiques |
| Authentification | Autorisation | Identité / droits |
| Sauvegarde | Réplication | Récupération / copies synchronisées ou répliquées |

## 19. Pièges et astuces à mémoriser

1. **NULL :** utiliser `IS NULL`, jamais `= NULL`.
2. **Clé primaire :** unique et non nulle ; peut être composite.
3. **Clé étrangère :** peut contenir des doublons et, si nullable, des valeurs `NULL`.
4. **LEFT JOIN :** une condition sur la table droite dans `WHERE` peut supprimer les lignes sans correspondance.
5. **Agrégations :** `WHERE` avant les groupes ; `HAVING` après.
6. **ACID :** atomicité = tout ou rien ; cohérence = règles respectées ; isolation = concurrence maîtrisée ; durabilité = changements validés conservés.
7. **Index :** accélération possible des lectures, mais coût en stockage et en écriture.
8. **Normalisation :** 1FN = atomicité ; 2FN = pas de dépendance partielle ; 3FN = pas de dépendance transitive problématique ; BCNF = chaque déterminant non trivial est une superclé.
9. **Transactions :** `COMMIT` valide ; `ROLLBACK` annule les changements non validés.
10. **Résultats SQL :** sans `ORDER BY`, l'ordre n'est pas garanti ; `DISTINCT` ne supprime pas les données de la table.
11. **UNIQUE et NULL :** le traitement des `NULL` dépend du SGBD.
12. **NOT IN :** attention si la sous-requête contient `NULL` ; examiner `NOT EXISTS`.
13. **Index composite :** l'ordre des colonnes a une importance.
14. **Vues :** toutes ne sont pas modifiables ; une vue classique n'est pas nécessairement une copie des données.
15. **Transactions :** le comportement du DDL et de `TRUNCATE` varie selon le moteur.
16. **Isolation :** connaître lecture sale, lecture non répétable, lecture fantôme et niveaux d'isolation.
17. **Sécurité :** authentification et autorisation sont deux notions différentes.
18. **Sauvegarde :** la réplication seule ne protège pas de toutes les suppressions ou corruptions.

## 20. Questions d'auto-évaluation

### Question 1
Quelle contrainte garantit qu'une colonne identifie chaque ligne sans doublon et sans valeur `NULL` ?

A. `FOREIGN KEY`  
B. `PRIMARY KEY`  
C. `DEFAULT`  
D. `CHECK`

<details>
<summary>Voir la réponse</summary>

**Réponse : B — PRIMARY KEY.** Elle impose l'unicité et l'absence de `NULL`.
</details>

### Question 2
Quelle condition sélectionne correctement les lignes dont le montant est inconnu ?

A. `montant = NULL`  
B. `montant <> NULL`  
C. `montant IS NULL`  
D. `montant == NULL`

<details>
<summary>Voir la réponse</summary>

**Réponse : C — IS NULL.** SQL utilise une logique à trois valeurs ; l'égalité avec `NULL` ne teste pas correctement les valeurs nulles.
</details>

### Question 3
Quelle clause filtre les groupes après un `COUNT(*)` ?

A. `WHERE`  
B. `ORDER BY`  
C. `HAVING`  
D. `FROM`

<details>
<summary>Voir la réponse</summary>

**Réponse : C — HAVING.** `WHERE` filtre les lignes avant l'agrégation ; `HAVING` filtre les groupes.
</details>

### Question 4
Quelle jointure conserve toutes les lignes de la table de gauche ?

A. `INNER JOIN`  
B. `LEFT JOIN`  
C. `CROSS JOIN`  
D. Une jointure interne uniquement

<details>
<summary>Voir la réponse</summary>

**Réponse : B — LEFT JOIN.** Les colonnes de droite valent `NULL` lorsqu'aucune correspondance n'existe.
</details>

### Question 5
Quelle propriété ACID garantit la conservation des modifications après un `COMMIT` réussi ?

A. Atomicité  
B. Cohérence  
C. Isolation  
D. Durabilité

<details>
<summary>Voir la réponse</summary>

**Réponse : D — Durabilité.**
</details>

### Question 6
Que fait `UNION ALL` par rapport à `UNION` ?

A. Supprime toutes les lignes répétées  
B. Conserve les doublons  
C. Trie toujours le résultat  
D. Fusionne physiquement les tables

<details>
<summary>Voir la réponse</summary>

**Réponse : B — Il conserve les doublons.** `UNION` effectue une élimination des doublons.
</details>

### Question 7
Quel est l'objectif principal d'un index ?

A. Remplacer les clés étrangères  
B. Garantir toutes les transactions  
C. Accélérer certaines recherches au prix d'un coût de stockage et d'écriture  
D. Éliminer automatiquement les NULL

<details>
<summary>Voir la réponse</summary>

**Réponse : C.** Un index peut faciliter les accès, mais consomme de l'espace et augmente le travail des écritures.
</details>

### Question 8
Quelle forme normale élimine les dépendances partielles vis-à-vis d'une clé candidate ?

A. 1FN  
B. 2FN  
C. 3FN  
D. BCNF uniquement

<details>
<summary>Voir la réponse</summary>

**Réponse : B — 2FN.**
</details>

### Question 9
Quelle commande annule les modifications non validées d'une transaction ?

A. `GRANT`  
B. `COMMIT`  
C. `ROLLBACK`  
D. `ALTER`

<details>
<summary>Voir la réponse</summary>

**Réponse : C — ROLLBACK.**
</details>

### Question 10
Quelle affirmation concernant `COUNT` est correcte ?

A. `COUNT(*)` ignore toutes les lignes contenant `NULL`  
B. `COUNT(colonne)` compte aussi les `NULL`  
C. `COUNT(*)` compte les lignes ; `COUNT(colonne)` ignore les `NULL` de cette colonne  
D. `COUNT` et `SUM` sont identiques

<details>
<summary>Voir la réponse</summary>

**Réponse : C.**
</details>

---

## Références pour approfondir

- [PostgreSQL — Documentation officielle](https://www.postgresql.org/docs/)
- [MySQL — Documentation officielle](https://dev.mysql.com/doc/)
- [SQL Server — Documentation officielle](https://learn.microsoft.com/sql/)
- [Oracle Database — Documentation officielle](https://docs.oracle.com/en/database/)
