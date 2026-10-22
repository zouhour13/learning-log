> **Auteur :** Zouhour Bellamine

# 04 — Menaces et sécurité applicative

## 1. Ingénierie sociale et hameçonnage

L’**ingénierie sociale** manipule les personnes en jouant sur la confiance, l’urgence, la peur, l’autorité ou la curiosité. L’**hameçonnage (phishing)** utilise des messages ou sites trompeurs pour obtenir des secrets, installer un logiciel malveillant ou déclencher une action dangereuse.

- **Spear phishing :** attaque ciblée.
- **Whaling :** attaque visant des dirigeants ou d’autres personnes à forte valeur.
- **Smishing :** hameçonnage par SMS.
- **Vishing :** hameçonnage par appel vocal.
- **BEC :** compromission ou usurpation de messagerie professionnelle pour détourner des paiements ou obtenir des informations.

Les défenses comprennent la sensibilisation, la vérification indépendante des demandes inhabituelles, une MFA résistante au phishing, le filtrage des courriels, les protections de domaine et des procédures de validation pour les paiements ou changements de compte.

## 2. Catégories de logiciels malveillants

| Type | Comportement typique |
|---|---|
| Virus | S’attache à un fichier ou programme et se propage lorsque l’hôte est exécuté |
| Ver (worm) | Se propage de manière autonome, souvent sur les réseaux |
| Cheval de Troie | Semble légitime mais contient une fonction malveillante |
| Rançongiciel (ransomware) | Chiffre ou bloque les données pour extorquer la victime |
| Logiciel espion (spyware) | Collecte secrètement des informations |
| Enregistreur de frappe (keylogger) | Capture les frappes au clavier |
| Rootkit | Dissimule une activité malveillante ou maintient un accès privilégié |
| Botnet | Ensemble d’appareils compromis contrôlés par un opérateur |
| Adware | Affiche de la publicité ; certaines variantes sont intrusives ou malveillantes |

Ces termes ne sont pas interchangeables ; un logiciel malveillant peut combiner plusieurs comportements.

### Prévention et réponse aux rançongiciels

Un incident peut commencer par un hameçonnage, un accès distant exposé, des identifiants volés ou une vulnérabilité non corrigée. Les attaquants peuvent se déplacer latéralement, voler des données puis chiffrer les systèmes.

Les mesures comprennent la MFA, l’application des correctifs, le moindre privilège, la protection des terminaux, la segmentation, la sécurité des courriels et des sauvegardes hors ligne ou immuables. Tester régulièrement la restauration.

Pendant un incident, suivre les procédures, isoler les systèmes touchés lorsque cela est approprié, préserver les preuves, déterminer l’étendue et le point d’entrée, protéger les sauvegardes, supprimer les mécanismes de persistance, corriger les identifiants compromis et restaurer à partir de sources fiables. Le paiement d’une rançon ne garantit ni la récupération ni la suppression des données volées.

## 3. Vulnérabilités des applications Web

### Injection SQL

Elle se produit lorsqu’une entrée non fiable est interprétée comme de la syntaxe SQL. La défense principale est l’utilisation de **requêtes paramétrées / instructions préparées**, qui séparent les instructions SQL des valeurs fournies. Appliquer aussi le moindre privilège aux comptes de base de données, valider les règles métier et éviter de révéler les erreurs de base de données. Le filtrage des entrées seul ne remplace pas la paramétrisation.

### Cross-Site Scripting (XSS)

Un script ou contenu actif contrôlé par l’attaquant s’exécute dans le navigateur de la victime, dans le contexte d’un site vulnérable.

- **XSS stocké :** le contenu malveillant est enregistré puis affiché ultérieurement.
- **XSS réfléchi :** le contenu de la requête est réinjecté dans une réponse.
- **XSS basé sur le DOM :** le code côté client traite dangereusement des données non fiables.

Les défenses comprennent l’encodage de sortie adapté au contexte, des API DOM sûres, l’assainissement prudent du HTML autorisé et une CSP comme couche supplémentaire.

### Cross-Site Request Forgery (CSRF)

Cette attaque pousse un navigateur possédant une session authentifiée à envoyer une requête non souhaitée. Les défenses comprennent les jetons anti-CSRF, des paramètres de cookies SameSite appropriés, la vérification de l’origine et des protections adaptées aux actions sensibles.

**Différence :** XSS exécute du contenu contrôlé par l’attaquant dans le contexte du navigateur sur un site ; CSRF exploite le contexte d’authentification existant du navigateur pour déclencher une requête indésirable.

### Autorisation défaillante au niveau objet (BOLA / IDOR)

Un utilisateur modifie l’identifiant d’un objet dans une URL ou une requête API et accède au dossier d’une autre personne parce que le serveur ne vérifie pas l’autorisation sur cet objet précis. Vérifier les droits pour chaque ressource et chaque action demandée. Des identifiants difficiles à deviner ne remplacent pas l’autorisation.

### Autres faiblesses

- Authentification ou gestion de session défaillante.
- Mauvaise configuration de sécurité et identifiants par défaut.
- Dépendances vulnérables ou obsolètes.
- Téléversement de fichiers non sécurisé.
- Traversée de répertoires (path traversal) vers des fichiers hors du répertoire prévu.
- **SSRF :** pousse le serveur à effectuer des requêtes vers des destinations non prévues.
- Désérialisation non sécurisée.
- Exposition excessive de données ou permissions API trop larges.
- Absence de limitation de débit et contrôles anti-abus insuffisants.

## 4. Sécurité des API

Une API sécurisée devrait mettre en œuvre :

- Une authentification adaptée au client et au cas d’usage.
- Une autorisation au niveau des fonctions et des objets.
- La validation des entrées et un traitement sûr des sorties.
- TLS et un stockage sécurisé des secrets.
- Des limites de débit et la détection des abus.
- Des réponses contenant uniquement les données nécessaires.
- Des erreurs qui ne révèlent ni secrets ni traces internes de pile.
- Une gestion sécurisée des sessions et jetons, avec expiration.
- La mise à jour des dépendances, les journaux, la supervision et la gestion des versions.

Un **JWT peut être signé sans être chiffré** ; son contenu est souvent lisible par toute personne qui détient le jeton. Une signature détecte certaines modifications, mais ne fournit pas la confidentialité. Vérifier la signature, l’algorithme, l’émetteur, l’audience, l’expiration et les revendications pertinentes. L’autorisation reste obligatoire.

## 5. Développement logiciel sécurisé

Intégrer la sécurité dans tout le cycle de vie logiciel :

1. **Exigences :** identifier les données sensibles, les utilisateurs, les frontières de confiance et les objectifs.
2. **Conception :** modéliser les menaces et définir les règles d’autorisation.
3. **Implémentation :** utiliser des bibliothèques et pratiques de codage sûres.
4. **Tests :** vérifier les permissions, le traitement des entrées et les dépendances.
5. **Déploiement :** protéger les secrets et durcir la configuration.
6. **Maintenance :** appliquer les correctifs, superviser, répondre aux incidents et retirer les composants obsolètes.

Approches de test :

- **SAST :** analyse statique sans exécuter l’application.
- **DAST :** teste une application en fonctionnement.
- **SCA :** examine les composants tiers, les vulnérabilités connues et parfois les risques liés aux licences.
- **Test d’intrusion :** simulation autorisée et délimitée de techniques d’attaque.

Aucun outil unique ne prouve qu’un système est totalement sécurisé.

## 6. Gestion des secrets

Ne jamais versionner de clés API, mots de passe de base de données, clés de signature ou jetons. Utiliser une configuration de déploiement protégée ou un gestionnaire de secrets, limiter les accès, renouveler les identifiants exposés, éviter de journaliser les secrets et séparer les environnements de développement, test et production. Les variables d’environnement sont utiles, mais ne constituent pas automatiquement un coffre-fort sécurisé.

## À retenir

- Les requêtes SQL paramétrées protègent contre l’injection SQL.
- XSS = contenu contrôlé par l’attaquant exécuté dans le navigateur ; CSRF = requête indésirable utilisant une session existante.
- BOLA/IDOR = autorisation manquante pour un objet précis.
- Un JWT signé n’est pas nécessairement chiffré.
- Le développement sécurisé couvre la conception, les tests, le déploiement et la maintenance.

[Version anglaise](04-threats-and-application-security.md)
