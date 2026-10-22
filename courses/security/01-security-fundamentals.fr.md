> **Auteur :** Zouhour Bellamine

# 01 — Fondamentaux de la sécurité informatique

## 1. La triade CIA : confidentialité, intégrité, disponibilité

### Confidentialité
L’information n’est divulguée qu’aux personnes, services ou systèmes autorisés. Les mesures possibles comprennent l’authentification, l’autorisation, le chiffrement, la classification des données et le moindre privilège.

### Intégrité
L’information reste exacte et complète et est protégée contre les modifications ou destructions non autorisées. Les mesures comprennent les restrictions d’accès, les contraintes de base de données, les transactions, les journaux d’audit, les empreintes utilisées dans un processus de vérification fiable, les MAC et les signatures numériques.

### Disponibilité
Les informations et services restent utilisables par les utilisateurs autorisés lorsqu’ils en ont besoin. Les mesures comprennent la redondance, les sauvegardes testées, la supervision, la planification de capacité, le basculement, la reprise après sinistre et la protection contre les attaques DDoS.

| Situation | Propriété principalement touchée |
|---|---|
| Une personne non autorisée lit un dossier confidentiel | Confidentialité |
| Un dossier est modifié sans autorisation | Intégrité |
| Une attaque rend un service inaccessible | Disponibilité |

Un incident peut toucher plusieurs propriétés. Un rançongiciel peut compromettre la disponibilité en chiffrant des fichiers et la confidentialité si les données sont également volées.

## 2. Autres propriétés de sécurité

- **Authenticité :** confiance dans le fait qu’une identité, un message ou un objet est bien ce qu’il prétend être.
- **Imputabilité :** possibilité d’attribuer une action à un utilisateur, un service ou un processus.
- **Traçabilité / auditabilité :** possibilité de reconstituer les actions à partir de traces fiables.
- **Non-répudiation :** éléments permettant d’étayer l’origine ou la réalisation d’une action. Sa force dépend de la vérification de l’identité, de la protection des clés, des procédures et du droit applicable.
- **Résilience :** capacité à résister à une perturbation et à rétablir les fonctions essentielles.

Les journaux facilitent la traçabilité, mais constituent des preuves faibles si des utilisateurs privilégiés peuvent les modifier discrètement. La collecte centralisée, les accès restreints, des horodatages fiables et des mécanismes d’intégrité renforcent leur fiabilité.

## 3. Identification, authentification, autorisation et audit

1. **Identification :** « Quelle identité déclarez-vous ? » Exemple : saisir un nom de compte.
2. **Authentification :** « Pouvez-vous le prouver ? » Exemple : vérifier un mot de passe ou une clé de sécurité.
3. **Autorisation :** « Qu’avez-vous le droit de faire ? » Exemple : autoriser la lecture, mais interdire la suppression.
4. **Audit :** « Que s’est-il passé ? » Exemple : enregistrer l’acteur, l’heure, la ressource, l’action et le résultat.

Une authentification réussie ne donne pas automatiquement un accès illimité. L’autorisation doit être vérifiée côté serveur pour chaque ressource et chaque action demandée.

## 4. Facteurs d’authentification

| Facteur | Signification | Exemples |
|---|---|---|
| Connaissance | Quelque chose que l’on connaît | Mot de passe, code PIN |
| Possession | Quelque chose que l’on détient | Clé matérielle, carte à puce |
| Inhérence | Une caractéristique de la personne | Empreinte digitale, caractéristique du visage |

L’authentification multifacteur (MFA) combine au moins deux catégories différentes. Un mot de passe et un code PIN appartiennent normalement à la même catégorie. Un mot de passe associé à une clé matérielle combine connaissance et possession. Les clés FIDO2/WebAuthn et les passkeys correctement déployées résistent mieux à l’hameçonnage que les mots de passe et de nombreux codes à usage unique.

Attaques contre les identifiants :
- **Force brute :** essayer un grand nombre de mots de passe possibles.
- **Attaque par dictionnaire :** essayer une liste de mots de passe probables.
- **Credential stuffing :** réutiliser des couples identifiant/mot de passe volés sur d’autres services.
- **Password spraying :** tester quelques mots de passe courants sur de nombreux comptes.
- **Détournement de session :** voler ou exploiter un jeton de session valide.
- **Usurpation d’identité :** se faire passer pour une personne ou un service légitime.

Les défenses comprennent la MFA, des mots de passe uniques, un gestionnaire de mots de passe, la limitation des tentatives, la vérification des mots de passe compromis, la détection d’anomalies et une gestion sécurisée des sessions.

## 5. Modèles de contrôle d’accès

| Modèle | Principe | Exemple |
|---|---|---|
| DAC — contrôle d’accès discrétionnaire | Le propriétaire peut généralement accorder l’accès | Le propriétaire d’un fichier autorise la lecture |
| MAC — contrôle d’accès obligatoire | Une politique centrale applique des niveaux de classification | Un dossier classifié exige une habilitation |
| RBAC — contrôle d’accès fondé sur les rôles | Les permissions sont attribuées à des rôles | Le rôle Éditeur peut modifier des dossiers |
| ABAC — contrôle d’accès fondé sur les attributs | La politique évalue les attributs du sujet, de l’objet, de l’action et du contexte | L’accès dépend du service et de la sensibilité du dossier |

RBAC signifie **Role-Based Access Control** (contrôle d’accès fondé sur les rôles), et non « Rule-Based ».

### Principes essentiels

- **Moindre privilège :** n’accorder que les droits nécessaires et uniquement pendant la durée nécessaire.
- **Besoin d’en connaître :** l’accès dépend des exigences réelles du travail.
- **Séparation des tâches :** répartir les actions sensibles afin qu’une seule personne ne puisse pas tout exécuter et tout approuver.
- **Refus par défaut :** refuser l’accès sauf si une règle valide l’autorise.
- **Révision périodique :** supprimer les droits devenus inutiles.
- **Application côté serveur :** masquer un bouton dans l’interface ne constitue pas une barrière de sécurité.

## 6. Menace, vulnérabilité, exploit, risque et incident

| Terme | Définition | Exemple |
|---|---|---|
| Menace | Cause potentielle de dommage | Un attaquant cherche à voler des dossiers |
| Vulnérabilité | Faiblesse susceptible d’être exploitée | Serveur non corrigé |
| Exploit | Méthode utilisant une faiblesse | Requête spécialement conçue qui déclenche une faille |
| Risque | Probabilité et impact potentiels d’un dommage | Des données pourraient être exposées par le serveur |
| Incident | Événement compromettant ou menaçant la sécurité | Un accès non autorisé est confirmé |
| Mesure de sécurité | Action qui réduit le risque | Correctif, MFA, supervision |

Un modèle simplifié est **Risque ≈ Probabilité × Impact**. Une évaluation réelle tient aussi compte de l’exposition, de la facilité d’exploitation, de la criticité des actifs, des contrôles existants et de l’incertitude.

## 7. Défense en profondeur et Zero Trust

La **défense en profondeur** combine plusieurs couches complémentaires : MFA, contrôle d’accès, TLS, segmentation, développement sécurisé, correctifs, supervision et sauvegardes testées.

Le modèle **Zero Trust** rejette la confiance automatique fondée uniquement sur la localisation réseau. Il privilégie la vérification explicite, le moindre privilège et l’évaluation continue. Un utilisateur du réseau interne ne doit pas automatiquement accéder à tous les systèmes.

## À retenir

- Confidentialité = empêcher la divulgation ; intégrité = empêcher ou détecter les changements non autorisés ; disponibilité = maintenir l’accès aux services.
- L’authentification vérifie l’identité ; l’autorisation détermine les actions permises.
- RBAC utilise des rôles ; ABAC évalue des attributs.
- Une vulnérabilité est une faiblesse ; un exploit l’utilise.
- Le moindre privilège limite les dégâts lorsqu’un compte est compromis.

[Version anglaise](01-security-fundamentals.md)
