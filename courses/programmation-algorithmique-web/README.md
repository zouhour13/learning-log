# Programmation, algorithmique et technologies Web

> **Auteur :** Zouhour Bellamine  
> **Langue :** Français  
> **Objectif :** consolider les fondamentaux de la programmation, les structures de données, l'analyse algorithmique, la POO et les principales technologies Web.

## Sommaire

1. [Variables, types et opérateurs](#1-variables-types-et-opérateurs)
2. [Conditions et boucles](#2-conditions-et-boucles)
3. [Fonctions et récursivité](#3-fonctions-et-récursivité)
4. [Tableaux, chaînes et collections](#4-tableaux-chaînes-et-collections)
5. [Piles et files](#5-piles-et-files)
6. [Complexité algorithmique](#6-complexité-algorithmique)
7. [Algorithmes classiques](#7-algorithmes-classiques)
8. [Programmation orientée objet](#8-programmation-orientée-objet-poo)
9. [Classes abstraites, interfaces et exceptions](#9-classes-abstraites-interfaces-et-exceptions)
10. [Compilation et interprétation](#10-compilation-et-interprétation)
11. [Architecture client-serveur et couches](#11-architecture-client-serveur-et-couches)
12. [HTTP, HTTPS et codes de statut](#12-http-https-et-codes-de-statut)
13. [API REST et JSON](#13-api-rest-et-json)
14. [Authentification, autorisation et erreurs](#14-authentification-autorisation-et-erreurs)
15. [Spring et Spring Boot](#15-spring-et-spring-boot)
16. [Angular](#16-angular)
17. [Tableaux comparatifs et pièges fréquents](#17-tableaux-comparatifs-et-pièges-fréquents)

---

# Partie I — Programmation et algorithmique

## 1. Variables, types et opérateurs

### 1.1 Variables et affectation

Une **variable** est un nom associé à une valeur. L'affectation donne une valeur à une variable ou la remplace.

```python
age = 25
nom = "Amira"
est_actif = True
```

- `=` : affectation.
- `==` : comparaison d'égalité.
- `!=` : différence.
- `+=`, `-=`, `*=`, `/=` : opération suivie d'une affectation.

```python
x = 5
x += 2  # x vaut maintenant 7
```

`x = x + 1` signifie que l'ancienne valeur de `x` est augmentée de 1, puis que le résultat est réaffecté à `x`.

### 1.2 Types de données

| Type | Signification | Exemple Python |
|---|---|---|
| Entier | Nombre sans partie décimale | `42` |
| Réel | Nombre à partie décimale | `3.14` |
| Chaîne | Texte | `"Bonjour"` |
| Booléen | Valeur logique | `True`, `False` |
| Liste | Collection ordonnée modifiable | `[1, 2, 3]` |
| Tuple | Collection ordonnée non modifiable | `(1, 2, 3)` |
| Dictionnaire | Paires clé-valeur | `{"id": 1}` |
| Ensemble | Valeurs uniques | `{1, 2, 3}` |

En Java, les types primitifs courants incluent `int`, `long`, `double`, `float`, `char` et `boolean`. `String` est un type référence, pas un type primitif.

Conversions Python :

```python
int("42")       # 42
float("3.5")    # 3.5
str(25)         # "25"
```

Une conversion peut échouer : `int("abc")` déclenche une exception `ValueError`.

### 1.3 Opérateurs

| Catégorie | Opérateurs | Exemple |
|---|---|---|
| Arithmétiques | `+`, `-`, `*`, `/`, `//`, `%`, `**` | `7 % 3 == 1` |
| Comparaison | `==`, `!=`, `<`, `>`, `<=`, `>=` | `x >= 10` |
| Logiques | `and`, `or`, `not` | `age >= 18 and actif` |
| Affectation | `=`, `+=`, `-=` | `x += 1` |

**À retenir :**
- `%` renvoie le reste de la division : `n % 2 == 0` teste si un entier est pair.
- En Python, `/` effectue une division réelle ; `//` donne le quotient arrondi vers le bas.
- `and` exige que les deux conditions soient vraies ; `or` exige qu'au moins une le soit.
- Ne confonds jamais `=` et `==`.

## 2. Conditions et boucles

### 2.1 Conditions

```python
if note >= 10:
    resultat = "Validé"
elif note >= 8:
    resultat = "À revoir"
else:
    resultat = "Non validé"
```

- `if` : teste la première condition.
- `elif` : teste une condition suivante si les précédentes sont fausses.
- `else` : traite le cas restant.

Dans une structure `if / elif / else`, une seule branche est exécutée.

### 2.2 Boucle `for`

```python
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4
```

`range(5)` commence à 0 et s'arrête avant 5. `range(2, 6)` produit 2, 3, 4 et 5.

### 2.3 Boucle `while`

```python
i = 0
while i < 3:
    print(i)
    i += 1
```

Une boucle `while` continue tant que sa condition est vraie. Si cette condition ne devient jamais fausse, elle peut tourner indéfiniment.

### 2.4 `break` et `continue`

- `break` : quitte immédiatement la boucle.
- `continue` : saute le reste de l'itération actuelle et passe à la suivante.

**Astuce :** `break` = sortir ; `continue` = passer à l'itération suivante.

## 3. Fonctions et récursivité

### 3.1 Fonctions

Une fonction regroupe des instructions réutilisables.

```python
def addition(a, b):
    return a + b

resultat = addition(3, 4)  # 7
```

- **Paramètres** : variables déclarées dans la définition.
- **Arguments** : valeurs transmises lors de l'appel.
- `return` : renvoie un résultat et termine la fonction.
- `print()` affiche une valeur, mais ne la renvoie pas automatiquement.
- Une variable locale est généralement accessible uniquement dans la fonction où elle est définie.
- En Python, une fonction sans `return` explicite renvoie `None`.

### 3.2 Passage d'arguments

En Python, les noms sont liés aux objets transmis. Modifier un objet mutable, comme une liste, peut être visible à l'extérieur ; réaffecter un paramètre ne réaffecte pas automatiquement la variable de l'appelant.

En Java, les arguments sont toujours transmis **par valeur**. Pour un objet, la valeur copiée est une référence à cet objet.

### 3.3 Récursivité

Une fonction récursive s'appelle elle-même. Elle doit avoir :

1. Un **cas de base** qui arrête la récursion.
2. Un **cas récursif** qui rapproche le problème du cas de base.

```python
def factorielle(n):
    if n < 0:
        raise ValueError("n doit être positif ou nul")
    if n == 0:
        return 1
    return n * factorielle(n - 1)
```

Exemple : (4! = 4 \times 3 \times 2 \times 1 = 24).

Sans cas de base atteignable, la récursion peut provoquer un dépassement de pile (`RecursionError` en Python).

**À retenir :** la récursivité peut simplifier certains algorithmes, mais consomme de la mémoire pour les appels empilés. Une solution itérative peut être plus économe.

## 4. Tableaux, chaînes et collections

### 4.1 Tableaux et listes

Un tableau classique contient des éléments accessibles par indice ; dans de nombreux langages, sa taille est fixe. Une liste Python est une séquence dynamique et modifiable.

```python
nombres = [10, 20, 30, 40]
print(nombres[0])    # 10
print(nombres[-1])   # 40
nombres.append(50)
```

Pour une séquence de longueur (n), les indices valides vont de 0 à (n-1).

| Opération sur une liste Python | Exemple | Coût usuel |
|---|---|---:|
| Accès par indice | `a[i]` | (O(1)) |
| Parcours complet | `for x in a` | (O(n)) |
| Recherche par valeur | `x in a` | (O(n)) |
| Ajout en fin | `a.append(x)` | (O(1)) amorti |
| Insertion au début | `a.insert(0, x)` | (O(n)) |
| Suppression au milieu | `a.pop(i)` | (O(n)) en général |

Le coût amorti est constant pour l'ajout en fin en moyenne sur une séquence d'opérations, même si certains ajouts déclenchent un redimensionnement.

### 4.2 Chaînes de caractères

Une chaîne est une suite de caractères. En Python, les chaînes sont **immuables** : un caractère ne peut pas être modifié directement à un indice.

```python
texte = "Programmation"
len(texte)
texte.lower()
texte.upper()
texte[0:4]
```

Méthodes utiles :
- `len(s)` : longueur.
- `s.lower()` / `s.upper()` : changement de casse.
- `s.strip()` : suppression des espaces aux extrémités.
- `s.split()` : découpage en liste.
- `separator.join(liste)` : assemblage de chaînes.
- `s.find(sub)` : recherche d'une sous-chaîne.

**Piège :** le premier indice est généralement 0, pas 1.

### 4.3 Liste, tuple, ensemble et dictionnaire

| Structure | Ordre | Modifiable | Doublons | Usage |
|---|---|---|---|---|
| `list` | Oui | Oui | Oui | Séquence modifiable |
| `tuple` | Oui | Non | Oui | Séquence stable |
| `set` | Pas d'ordre positionnel garanti | Oui | Non | Unicité et appartenance |
| `dict` | Ordre d'insertion conservé en Python moderne | Oui | Clés uniques | Accès par clé |

```python
noms = ["Ali", "Sami", "Ali"]
uniques = set(noms)
ages = {"Ali": 24, "Sami": 28}
print(ages["Ali"])
```

La recherche dans un dictionnaire ou un ensemble est généralement (O(1)) en moyenne, mais peut être plus coûteuse dans certains cas défavorables.

## 5. Piles et files

### Pile — Stack

**LIFO** (*Last In, First Out*) : le dernier élément ajouté est le premier retiré.

- `push` : empiler.
- `pop` : retirer le sommet.
- `peek/top` : consulter le sommet sans le retirer.
- Exemples : pile d'appels, annulation d'une action, historique de navigation.

```python
pile = []
pile.append(10)  # push
pile.append(20)
dernier = pile.pop()  # 20
```

### File — Queue

**FIFO** (*First In, First Out*) : le premier élément ajouté est le premier retiré.

- `enqueue` : ajouter en fin.
- `dequeue` : retirer en tête.
- `front` : consulter le premier élément.
- Exemples : tâches d'impression, requêtes en attente.

```python
from collections import deque

file = deque()
file.append("A")
file.append("B")
premier = file.popleft()  # "A"
```

**Astuce :** pile = assiettes empilées ; file = personnes qui attendent au guichet.

## 6. Complexité algorithmique

La complexité décrit l'évolution des ressources utilisées par un algorithme selon la taille (n) de l'entrée. On mesure surtout le temps d'exécution et la mémoire auxiliaire.

### 6.1 Classes principales

| Complexité | Nom | Exemple typique |
|---|---|---|
| (O(1)) | Constante | Accès à `tab[i]` |
| (O(\log n)) | Logarithmique | Recherche dichotomique |
| (O(n)) | Linéaire | Parcours d'un tableau |
| (O(n\log n)) | Linéarithmique | Tri fusion |
| (O(n^2)) | Quadratique | Deux boucles complètes imbriquées |
| (O(2^n)) | Exponentielle | Certaines récursions naïves |

Si (n) double :
- (O(n)) augmente approximativement d'un facteur 2.
- (O(n^2)) augmente approximativement d'un facteur 4.

### 6.2 Reconnaître la complexité

Constante :

```python
def premier(tab):
    return tab[0]
```

Linéaire :

```python
for x in tab:
    print(x)
```

Quadratique :

```python
for i in range(n):
    for j in range(n):
        print(i, j)
```

La dernière boucle exécute environ (n \times n = n^2) opérations.

Logarithmique : un algorithme qui divise la taille du problème par deux à chaque étape, comme la recherche dichotomique, effectue (O(\log n)) étapes.

### 6.3 Règles de calcul

- Deux boucles successives de taille (n) : (O(n+n)=O(n)).
- Deux boucles imbriquées de taille (n) : généralement (O(n^2)).
- Une boucle qui divise le problème par deux : souvent (O(\log n)).
- (n) itérations contenant un traitement logarithmique : souvent (O(n\log n)).
- (O(3n^2+5n+2)=O(n^2)) : on garde le terme dominant et on ignore les constantes.

Attention : deux boucles imbriquées ne donnent pas toujours (O(n^2)). Il faut compter les itérations réellement exécutées.

### 6.4 Meilleur, moyen et pire cas

- **Meilleur cas** : entrée la plus favorable.
- **Cas moyen** : coût attendu selon une distribution d'entrées.
- **Pire cas** : coût maximal pour les entrées de taille (n).

Pour une recherche linéaire, trouver la cible au premier indice coûte (O(1)), mais le pire cas coûte (O(n)).

**Ordre de croissance, du plus favorable au plus coûteux en général :** (O(1)), (O(\log n)), (O(n)), (O(n\log n)), (O(n^2)), (O(2^n)).

## 7. Algorithmes classiques

### 7.1 Recherche linéaire

```python
def recherche(tab, cible):
    for i, valeur in enumerate(tab):
        if valeur == cible:
            return i
    return -1
```

Elle visite les éléments un par un, fonctionne sur une séquence non triée et coûte (O(n)) dans le pire cas.

### 7.2 Recherche dichotomique

Elle nécessite une séquence triée selon l'ordre de comparaison.

```python
def recherche_dicho(tab, cible):
    gauche, droite = 0, len(tab) - 1
    while gauche <= droite:
        milieu = (gauche + droite) // 2
        if tab[milieu] == cible:
            return milieu
        elif tab[milieu] < cible:
            gauche = milieu + 1
        else:
            droite = milieu - 1
    return -1
```

À chaque étape, elle élimine environ la moitié de la zone de recherche : complexité (O(\log n)).

### 7.3 Algorithmes de tri

| Algorithme | Complexité temporelle typique | Principe |
|---|---|---|
| Tri à bulles | (O(n^2)) en moyenne et au pire | Échanges d'éléments adjacents |
| Tri par sélection | (O(n^2)) | Sélection du minimum restant |
| Tri par insertion | (O(n^2)) en moyenne et au pire | Insertion dans la partie triée |
| Tri fusion | (O(n\log n)) | Diviser, trier, fusionner |
| Quicksort | (O(n\log n)) en moyenne, (O(n^2)) au pire | Partition autour d'un pivot |

La recherche dichotomique ne trie pas les données : elle recherche dans une séquence déjà triée.

---

# Partie II — Programmation orientée objet

## 8. Principes de la POO

La programmation orientée objet organise un programme autour d'objets qui regroupent des données et des comportements.

- **Classe** : modèle décrivant attributs et méthodes.
- **Objet** : instance concrète d'une classe.
- **Attribut** : donnée associée à un objet ou à une classe.
- **Méthode** : fonction définie dans une classe.
- **Constructeur** : mécanisme d'initialisation d'un objet.

```python
class Document:
    def __init__(self, titre):
        self.titre = titre

    def afficher_titre(self):
        return self.titre

doc = Document("Contrat")
print(doc.afficher_titre())
```

### 8.1 Les quatre piliers

**Encapsulation** — regrouper l'état et les méthodes et contrôler l'accès aux données. Exemple : empêcher un solde de devenir négatif sans validation.

**Héritage** — une classe dérivée réutilise ou spécialise le comportement d'une classe de base. Exemple : `DocumentPDF` dérive de `Document`.

**Polymorphisme** — une même opération peut avoir un comportement différent selon le type réel de l'objet. Exemple : `calculer_surface()` pour un cercle et un rectangle.

**Abstraction** — exposer les opérations essentielles tout en masquant les détails d'implémentation.

**Astuce de mémorisation :**
- Encapsulation = protéger l'état.
- Héritage = réutiliser et spécialiser.
- Polymorphisme = même interface, comportements différents.
- Abstraction = cacher les détails inutiles.

### 8.2 Visibilité

En Java :
- `public` : accessible partout où la classe est accessible.
- `private` : accessible uniquement dans la classe déclaratrice.
- `protected` : accessible dans le même package et dans certaines classes dérivées.
- Sans modificateur : accès au package.

En Python :
- `_attribut` indique par convention un usage interne.
- `__attribut` déclenche le *name mangling*, sans garantir une confidentialité absolue.

### 8.3 Surcharge et redéfinition

- **Surcharge (*overloading*)** : méthodes de même nom avec des signatures différentes. En Java, elles peuvent différer par le nombre, le type ou l'ordre des paramètres.
- **Redéfinition (*overriding*)** : une sous-classe fournit une nouvelle implémentation d'une méthode héritée avec une signature compatible.

En Java, le type de retour seul ne permet pas de surcharger une méthode.

### 8.4 Composition versus héritage

- Héritage : relation « est un » — une voiture électrique est une voiture.
- Composition : relation « possède un » — une voiture possède un moteur.

La composition permet souvent de réutiliser un comportement sans créer une hiérarchie rigide.

## 9. Classes abstraites, interfaces et exceptions

### 9.1 Classe abstraite

Une classe abstraite représente un concept général qui n'est pas destiné à être instancié directement. Elle peut contenir des attributs, des méthodes concrètes et des méthodes abstraites à implémenter dans les classes concrètes.

### 9.2 Interface

Une interface définit principalement un contrat : les opérations qu'une classe doit proposer. En Java moderne, une interface peut aussi contenir des méthodes `default` et `static`.

| Classe abstraite | Interface |
|---|---|
| Peut contenir un état d'instance | Ne sert pas à partager un état d'instance ordinaire |
| Peut définir méthodes concrètes et abstraites | Définit un contrat et peut inclure certaines implémentations |
| Une classe Java ne peut étendre qu'une seule classe | Une classe peut implémenter plusieurs interfaces |
| Utile pour partager une base commune | Utile pour définir une capacité commune |

```java
interface Exportable {
    void exporter();
}

abstract class Document {
    protected String titre;

    public Document(String titre) {
        this.titre = titre;
    }
}

class Rapport extends Document implements Exportable {
    public Rapport(String titre) {
        super(titre);
    }

    @Override
    public void exporter() {
        System.out.println("Export du rapport");
    }
}
```

`Rapport` hérite de `Document` et implémente le contrat `Exportable`.

### 9.3 Exceptions

Une exception signale qu'une opération ne peut pas se poursuivre normalement.

```python
try:
    valeur = int("abc")
except ValueError:
    print("La valeur n'est pas un entier valide")
finally:
    print("Fin du traitement")
```

- `try` : instructions susceptibles de provoquer une exception.
- `except` : traitement de l'exception.
- `else` : exécuté si aucune exception n'a été levée dans le `try`.
- `finally` : exécuté normalement que l'exception survienne ou non ; utile pour le nettoyage.

En Java :
- **Checked exceptions** : doivent être capturées ou déclarées selon les règles du langage, par exemple `IOException`.
- **Unchecked exceptions** : sous-classes de `RuntimeException`, par exemple `NullPointerException`.
- **Error** : problèmes graves de la JVM ou de l'environnement, généralement non destinés à être gérés comme une erreur métier ordinaire.
- `throw` déclenche une exception ; `throws` déclare les exceptions qu'une méthode peut propager.

**Bonnes pratiques :** capturer les erreurs attendues, donner un message utile, ne pas masquer une erreur avec un bloc vide et libérer les ressources correctement.

## 10. Compilation et interprétation

**Compilation :** traduction du code source en code machine ou en format intermédiaire avant son exécution.

**Interprétation :** exécution du programme ou du code intermédiaire par un environnement d'exécution.

| Critère | Compilation | Interprétation |
|---|---|---|
| Traduction | En amont de l'exécution | Par l'environnement d'exécution |
| Erreurs | Certaines détectées à la compilation | Certaines apparaissent à l'exécution |
| Performance | Peut permettre une exécution rapide du code généré | Dépend de l'interpréteur et de ses optimisations |
| Exemple | C/C++, Java compilé en bytecode | Exécution Python avec CPython |

**Nuance importante :** Java compile les fichiers `.java` en bytecode `.class`, exécuté par la JVM, qui peut compiler du bytecode en code machine avec un compilateur JIT. CPython compile également le code source en bytecode avant son exécution. Compilation et interprétation ne sont donc pas toujours deux catégories exclusives.

---

# Partie III — Technologies Web et frameworks

## 11. Architecture client-serveur et couches

Une application Web comporte généralement un client, un backend et une base de données.

Flux typique :

`Navigateur / Frontend → Requête HTTP(S) → Backend / API → Base de données`

La réponse revient ensuite au client, souvent au format JSON.

Exemple : le frontend demande les détails d'un bien. Le backend valide la requête et les droits d'accès, applique les règles métier, interroge la base et renvoie une réponse.

### 11.1 Frontend versus backend

| Frontend | Backend |
|---|---|
| Interface visible | Logique exécutée côté serveur |
| HTML, CSS, JavaScript, Angular | Java, Spring Boot, Python, etc. |
| Formulaires, affichage, interactions | Règles métier, API, accès aux données |
| Validation utile à l'ergonomie | Validation nécessaire à la sécurité |

Une validation frontend ne remplace jamais celle du backend : le client peut être modifié ou contourné.

### 11.2 Architecture en couches

- **Controller / présentation** : reçoit la requête HTTP et construit la réponse.
- **Service / métier** : applique les règles métier.
- **Repository / DAO** : accède aux données.
- **Base de données** : conserve les données.

Flux Spring courant :

`Requête HTTP → Controller → Service → Repository → Base de données`

La séparation des responsabilités améliore la maintenabilité, la testabilité et la réutilisation du code. Le contrôleur ne devrait pas contenir toute la logique métier ; le repository ne devrait pas décider des règles fonctionnelles.

## 12. HTTP, HTTPS et codes de statut

HTTP est un protocole de communication entre clients et serveurs Web. Une requête comprend généralement une méthode, une cible, des en-têtes et éventuellement un corps. Une réponse comprend un statut, des en-têtes et éventuellement un corps.

### 12.1 Méthodes HTTP

| Méthode | Usage habituel | Sémantique |
|---|---|---|
| `GET` | Lire une ressource | Ne devrait pas modifier l'état métier |
| `POST` | Créer ou déclencher un traitement | Pas idempotent en général |
| `PUT` | Remplacer une ressource, ou la créer à une URI connue selon l'API | Idempotent |
| `PATCH` | Modifier partiellement une ressource | Pas nécessairement idempotent |
| `DELETE` | Supprimer une ressource | Idempotent |
| `HEAD` | Obtenir les en-têtes sans le corps | Semblable à GET pour les métadonnées |
| `OPTIONS` | Connaître les options de communication | Utilisé notamment par certains échanges CORS |

Une opération est **idempotente** si la répéter produit le même effet final sur l'état du serveur que l'effectuer une seule fois. Une seconde suppression peut renvoyer un statut différent de la première tout en laissant la ressource supprimée.

### 12.2 Codes de statut

| Code | Signification |
|---|---|
| `200 OK` | Requête réussie |
| `201 Created` | Ressource créée |
| `202 Accepted` | Traitement accepté, pas forcément terminé |
| `204 No Content` | Succès sans corps |
| `301 Moved Permanently` | Redirection permanente |
| `302 Found` | Redirection temporaire |
| `304 Not Modified` | Ressource non modifiée selon les conditions de cache |
| `400 Bad Request` | Requête invalide |
| `401 Unauthorized` | Authentification manquante ou invalide |
| `403 Forbidden` | Accès refusé |
| `404 Not Found` | Ressource introuvable |
| `405 Method Not Allowed` | Méthode non autorisée pour la ressource |
| `409 Conflict` | Conflit avec l'état de la ressource |
| `422 Unprocessable Content` | Contenu compris mais non traitable |
| `429 Too Many Requests` | Trop de requêtes |
| `500 Internal Server Error` | Erreur interne générique |
| `502 Bad Gateway` | Réponse invalide d'un serveur en amont |
| `503 Service Unavailable` | Service temporairement indisponible |
| `504 Gateway Timeout` | Délai d'attente dépassé auprès d'un serveur en amont |

**Piège :**
- `401` : authentification manquante ou invalide.
- `403` : le serveur refuse l'accès ; l'identité peut être connue, mais les droits ne suffisent pas.

### 12.3 HTTPS et en-têtes

HTTPS est HTTP protégé par TLS. TLS assure notamment la confidentialité et l'intégrité des échanges, ainsi que l'authentification du serveur selon la validation de son certificat.

En-têtes courants :
- `Content-Type: application/json` : format du corps envoyé.
- `Accept: application/json` : format de réponse souhaité.
- `Authorization: Bearer ...` : transmission d'un jeton d'accès.
- `Cache-Control` : directives de cache.

HTTPS protège la communication, mais ne garantit pas à lui seul que l'utilisateur a le droit d'accéder à une ressource.

## 13. API REST et JSON

### 13.1 REST

Une API (*Application Programming Interface*) permet à des logiciels de communiquer. REST est un style architectural qui s'appuie notamment sur les ressources, leurs représentations, une interface uniforme et des interactions sans état de session applicatif implicite entre les requêtes.

REST ne signifie pas simplement « API qui renvoie du JSON ».

Exemples d'endpoints :

| Endpoint | Usage |
|---|---|
| `GET /api/biens` | Lister les biens |
| `GET /api/biens/42` | Consulter le bien 42 |
| `POST /api/biens` | Créer un bien |
| `PUT /api/biens/42` | Remplacer le bien 42 |
| `PATCH /api/biens/42` | Modifier certains champs |
| `DELETE /api/biens/42` | Supprimer le bien 42 |

Le chemin identifie généralement une ressource ; la méthode HTTP exprime l'opération demandée.

### 13.2 JSON

JSON est un format textuel d'échange de données.

```json
{
  "id": 42,
  "nom": "Terrain A",
  "surface": 1250.5,
  "disponible": true,
  "proprietaire": null
}
```

Types JSON :
- objet : `{ ... }`
- tableau : `[ ... ]`
- chaîne : `"texte"`
- nombre : `42`, `12.5`
- booléen : `true`, `false`
- valeur nulle : `null`

JSON ne prend pas en charge directement les commentaires, `undefined`, les fonctions ou les dates comme types distincts.

En JavaScript/TypeScript :
```typescript
const texte = JSON.stringify({ id: 42 });
const objet = JSON.parse(texte);
```

`JSON.stringify()` transforme une valeur compatible en texte JSON ; `JSON.parse()` analyse un texte JSON.

## 14. Authentification, autorisation et gestion des erreurs

### 14.1 Authentification versus autorisation

- **Authentification** : vérifier qui est l'utilisateur.
- **Autorisation** : vérifier ce que cet utilisateur a le droit de faire.

Un agent peut s'authentifier correctement, mais ne consulter que les dossiers autorisés par son rôle.

### 14.2 Sessions et jetons

- **Session côté serveur** : le serveur conserve l'état de session et le client transmet généralement un identifiant de session.
- **Jeton Bearer** : celui qui possède le jeton peut l'utiliser ; il doit être protégé.
- **JWT** : format de jeton contenant des claims, souvent signé. Une signature ne signifie pas que son contenu est chiffré.

Bonnes pratiques :
- Utiliser HTTPS.
- Vérifier signature, émetteur, audience et expiration d'un JWT selon le protocole utilisé.
- Appliquer l'autorisation côté serveur à chaque ressource sensible.
- Ne pas placer de secrets dans le frontend.
- Prévoir expiration, révocation ou rotation des jetons selon les besoins.
- Pour les cookies de session, considérer `Secure`, `HttpOnly` et `SameSite`, ainsi que la protection CSRF lorsque nécessaire.

### 14.3 Réponses d'erreur

Une API devrait valider les données reçues, choisir un statut HTTP adapté, renvoyer un message structuré, journaliser suffisamment les erreurs et ne pas exposer les mots de passe, secrets ou traces internes.

Exemple illustratif :

```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Le champ surface doit être positif"
}
```

Ce format n'est pas imposé par HTTP. Une API peut adopter un format standard comme Problem Details (`application/problem+json`).

## 15. Spring et Spring Boot

### 15.1 Spring

Spring est un écosystème Java qui propose notamment :
- inversion de contrôle (*IoC*) ;
- injection de dépendances (*DI*) ;
- programmation orientée aspect (*AOP*) ;
- transactions ;
- intégration avec des outils de persistance ;
- modules Web, dont Spring MVC.

### 15.2 Spring Boot

Spring Boot s'appuie sur Spring pour réduire la configuration nécessaire.

Fonctionnalités :
- **Auto-configuration** selon les dépendances et la configuration.
- **Starters** regroupant des dépendances courantes.
- Serveur Web embarqué, par exemple Tomcat avec Spring MVC.
- Configuration externalisée dans des fichiers ou variables d'environnement.
- Spring Boot Actuator pour des fonctions de supervision.

| Spring | Spring Boot |
|---|---|
| Écosystème et modules fondamentaux | Simplifie la configuration et le lancement d'applications Spring |
| Peut nécessiter plus de configuration explicite | Auto-configuration et conventions |
| Peut être utilisé sans Spring Boot | S'appuie sur Spring |

**À retenir :** Spring Boot ne remplace pas Spring ; il simplifie la création et la configuration des applications Spring.

### 15.3 Injection de dépendances

Une dépendance est un objet dont une classe a besoin. L'injection de dépendances consiste à fournir cet objet depuis l'extérieur plutôt que de le construire directement dans la classe qui l'utilise.

```java
@Service
public class BienService {
    private final BienRepository repository;

    public BienService(BienRepository repository) {
        this.repository = repository;
    }
}
```

Spring peut injecter un bean `BienRepository` dans le constructeur si un bean compatible est disponible.

Notions et annotations :
- **Bean** : objet géré par le conteneur Spring.
- `@Component` : composant détectable par Spring.
- `@Service` : composant de couche métier.
- `@Repository` : composant d'accès aux données ; participe à la traduction de certaines exceptions de persistance.
- `@Controller` : contrôleur Web, notamment pour les vues.
- `@RestController` : contrôleur dont les résultats sont écrits dans le corps HTTP.
- `@Autowired` : injection explicite ; l'injection par constructeur est souvent préférable.

`@Service` et `@Repository` sont des spécialisations de `@Component`.

### 15.4 Spring MVC et REST

```java
@RestController
@RequestMapping("/api/biens")
public class BienController {

    @GetMapping("/{id}")
    public String consulter(@PathVariable Long id) {
        return "Bien " + id;
    }
}
```

Annotations :
- `@RestController` : écrit les résultats dans le corps de la réponse.
- `@RequestMapping` : chemin ou conditions communes.
- `@GetMapping`, `@PostMapping` : associent une méthode HTTP.
- `@PathVariable` : récupère une valeur du chemin, comme `42` dans `/biens/42`.
- `@RequestParam` : récupère un paramètre de requête, comme `?page=2`.
- `@RequestBody` : convertit le corps HTTP en objet Java.
- `@ResponseStatus` : associe un statut HTTP.

Un contrôleur délègue la logique métier à un service, qui peut appeler un repository.

### 15.5 Transactions et persistance

Une transaction regroupe des opérations qui doivent respecter notamment l'atomicité et la cohérence.

- `@Transactional` : définit une frontière transactionnelle, selon la configuration et les règles de rollback.
- `@Entity` : classe persistée via JPA.
- `@Id` : identifiant de l'entité.
- `JpaRepository` : fournit des opérations de persistance courantes.

Hibernate est un fournisseur ORM couramment utilisé avec JPA ; Spring peut s'intégrer à différents fournisseurs.

## 16. Angular

Angular est un framework frontend fondé sur TypeScript. Il structure les applications autour de composants, services, templates, routage et injection de dépendances.

### 16.1 Composants

Un composant associe généralement :
- une classe TypeScript ;
- un template HTML ;
- des styles CSS ;
- des métadonnées `@Component`.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-bien',
  standalone: true,
  template: `
    <h2>{{ nom }}</h2>
    <button (click)="modifierNom()">Modifier</button>
  `
})
export class BienComponent {
  nom = 'Terrain A';

  modifierNom() {
    this.nom = 'Terrain B';
  }
}
```

### 16.2 Data binding

**Interpolation — `{{ valeur }}`** : affiche une valeur.

```html
<p>{{ nom }}</p>
```

**Property binding — `[propriete]`** : transmet une valeur vers un élément ou composant enfant.

```html
<button [disabled]="estCharge">Envoyer</button>
```

**Event binding — `(evenement)`** : réagit à un événement.

```html
<button (click)="enregistrer()">Enregistrer</button>
```

**Two-way binding — `[(ngModel)]`** : synchronise une valeur entre le champ et le composant, avec la configuration nécessaire.

```html
<input [(ngModel)]="nom">
```

Pour `ngModel`, importer notamment `FormsModule`.

**Astuce :**
- `{{ }}` = afficher.
- `[ ]` = transmettre une valeur.
- `( )` = écouter un événement.
- `[( )]` = liaison bidirectionnelle.

### 16.3 Services et HttpClient

Un service contient une logique réutilisable : appels API, données partagées ou opérations communes.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BienService {
  private apiUrl = '/api/biens';

  constructor(private http: HttpClient) {}

  getBiens() {
    return this.http.get(this.apiUrl);
  }
}
```

Dans une application Angular moderne, `HttpClient` doit être configuré, par exemple avec `provideHttpClient()`. Le résultat d'un appel HTTP est un `Observable` de RxJS ; la requête est généralement déclenchée lors de la souscription.

### 16.4 Modules et composants standalone

Historiquement, Angular utilise des **NgModules** déclarés avec `@NgModule` pour regrouper composants, directives, pipes et dépendances.

Les composants **standalone**, pris en charge par Angular moderne, peuvent déclarer directement leurs dépendances dans `imports`. Il n'est donc pas obligatoire d'avoir un NgModule pour chaque composant.

### 16.5 Directives, pipes et formulaires

- **Directive** : modifie le comportement ou la présentation d'un élément.
- `*ngIf` et `*ngFor` : syntaxe historique pour le rendu conditionnel et les listes ; Angular moderne propose aussi `@if` et `@for`.
- **Pipe** : transforme une valeur pour l'affichage, par exemple `date`, `currency`, `uppercase`.
- **Formulaires template-driven** : notamment `FormsModule` et `ngModel`.
- **Formulaires réactifs** : `ReactiveFormsModule`, `FormControl`, `FormGroup`.

### 16.6 Routage et communication backend

Le routeur Angular associe une URL à un composant :
- `/biens` : liste.
- `/biens/42` : détail du bien 42.

Le service Angular appelle l'API ; Spring Boot reçoit la requête, applique les règles métier et renvoie une réponse HTTP.

Angular gère principalement l'interface ; Spring Boot gère principalement le backend Java.

---

## 17. Tableaux comparatifs et pièges fréquents

### Programmation et algorithmique

- `=` affecte une valeur ; `==` compare.
- Les indices commencent généralement à zéro.
- `return` renvoie une valeur ; `print` affiche une valeur.
- Une récursion doit avoir un cas de base atteignable.
- Une chaîne Python est immuable.
- Une pile est LIFO ; une file est FIFO.
- La recherche dichotomique exige une séquence triée.
- Une boucle imbriquée n'est pas automatiquement quadratique : compter ses itérations.
- (O(n+n)=O(n)), mais deux boucles complètes imbriquées donnent généralement (O(n^2)).

### POO

- Classe = modèle ; objet = instance.
- Héritage = spécialisation ; composition = relation « possède un ».
- Polymorphisme = comportements différents derrière une interface commune.
- Surcharge = signatures différentes ; redéfinition = nouvelle implémentation héritée.
- Interface = contrat ; classe abstraite = base partielle possible.

### Web et frameworks

- `401` = authentification manquante ou invalide ; `403` = accès refusé.
- `POST` n'est généralement pas idempotent ; `PUT` l'est en sémantique HTTP.
- HTTPS protège les échanges, mais ne remplace pas l'autorisation.
- Frontend = interface ; backend = logique côté serveur.
- Spring Boot simplifie la configuration de Spring.
- L'injection de dépendances fournit des objets depuis l'extérieur.
- Angular utilise des composants et des services ; un service convient notamment à la communication avec une API.
- Une validation frontend ne remplace jamais la validation côté serveur.

## 18. Checklist d'auto-évaluation

- [ ] Je distingue les types, opérateurs, conditions et boucles.
- [ ] Je sais écrire une fonction avec paramètres et valeur de retour.
- [ ] Je sais reconnaître une récursion correcte et son cas de base.
- [ ] Je maîtrise listes, chaînes, piles et files.
- [ ] Je sais calculer la complexité d'une ou deux boucles imbriquées.
- [ ] Je distingue recherche linéaire et recherche dichotomique.
- [ ] Je sais expliquer les quatre piliers de la POO.
- [ ] Je distingue classe abstraite, interface, surcharge et redéfinition.
- [ ] Je sais expliquer les exceptions et compilation versus interprétation.
- [ ] Je distingue frontend, backend, contrôleur, service et repository.
- [ ] Je connais les méthodes HTTP et les principaux codes de statut.
- [ ] Je sais expliquer REST, JSON, authentification et autorisation.
- [ ] Je distingue Spring, Spring Boot, IoC et injection de dépendances.
- [ ] Je sais expliquer composants, services et data binding dans Angular.

## Méthode de travail

Pour chaque chapitre, alterner :
1. **Compréhension** : expliquer la notion avec ses propres mots.
2. **Application** : écrire ou analyser un petit exemple.
3. **Vérification** : résoudre des QCM et expliquer pourquoi les autres propositions sont fausses.
4. **Rappel actif** : revenir sur les erreurs après un délai.

Connaître une définition ne garantit pas de reconnaître le comportement réel d'un extrait de code : il faut pratiquer les deux.
