> **Auteur :** Zouhour Bellamine

# 06 — Résilience, sauvegardes, vie privée et gouvernance

## 1. Types de sauvegarde

| Type | Contenu | Restauration |
|---|---|---|
| Complète | Toutes les données sélectionnées au moment de la sauvegarde | Restauration simple ; plus de stockage/temps en général |
| Incrémentielle | Changements depuis la sauvegarde la plus récente | Nécessite la sauvegarde complète et la chaîne d’incréments requise |
| Différentielle | Changements depuis la dernière sauvegarde complète | Nécessite la sauvegarde complète et la dernière différentielle |

Une sauvegarde n’est utile que si elle est récupérable. Vérifier sa réussite, protéger les identifiants, tester la restauration et documenter les étapes. La réplication ne remplace pas la sauvegarde : une corruption ou une suppression peut aussi être répliquée.

## 2. Règle du 3-2-1

Recommandation courante :

- Conserver **3 copies** des données importantes.
- Utiliser **2 types de supports ou de stockage** différents.
- Garder **1 copie hors site**.

Pour mieux résister aux rançongiciels, envisager des copies hors ligne ou immuables, une administration des sauvegardes isolée, des identifiants séparés, la surveillance des tentatives de suppression et des exercices de restauration.

## 3. RPO et RTO

**RPO — Recovery Point Objective (objectif de point de reprise) :** durée maximale de perte de données tolérable, exprimée en temps. Un RPO de quatre heures signifie que l’architecture vise, dans le scénario défini, à limiter la perte aux modifications des quatre dernières heures environ.

**RTO — Recovery Time Objective (objectif de délai de reprise) :** durée cible maximale pour rétablir un service. Un RTO de deux heures signifie que le service doit viser une reprise en deux heures.

Aide-mémoire :
- **RPO :** quelle quantité de données récentes peut-on perdre ?
- **RTO :** combien de temps le service peut-il rester indisponible ?

Ce sont des objectifs, pas des garanties. Ils nécessitent une architecture adaptée, du personnel, des sauvegardes, une infrastructure et des procédures testées.

## 4. Continuité d’activité et reprise après sinistre

- **PCA / BCP :** maintient les activités essentielles pendant une perturbation, éventuellement au moyen de solutions de contournement ou d’un fonctionnement dégradé.
- **PRA / DRP :** rétablit les services technologiques, l’infrastructure, les applications et les données après une interruption majeure.

La continuité vise à maintenir les activités essentielles ; la reprise après sinistre vise à restaurer les capacités informatiques. Les plans doivent être coordonnés et testés.

Termes associés :
- **Redondance :** duplication de composants ou de capacité pour réduire les points uniques de défaillance.
- **Basculement (failover) :** passage à un composant ou site de secours.
- **Haute disponibilité :** conception visant à minimiser les interruptions.
- **Analyse d’impact métier :** identification des activités critiques et des conséquences d’une interruption.

## 5. Planification de la reprise

Les plans doivent préciser les services critiques et leurs dépendances, les responsables et contacts, les emplacements des sauvegardes, l’ordre de restauration, les dépendances d’identité/réseau/application, les communications, les critères de validation, les objectifs de reprise et les résultats des tests.

Réaliser des exercices et consigner les lacunes. Un plan non testé peut ne pas refléter les délais réels ou les dépendances.

## 6. Sécurité physique

Les mesures comprennent le contrôle d’accès aux salles serveurs et baies réseau, l’enregistrement des visiteurs, la protection contre le vol et les supports amovibles non autorisés, la destruction sécurisée des disques et documents papier, l’utilisation d’un onduleur lorsque nécessaire, la surveillance environnementale, la protection contre le feu et l’eau, le verrouillage des écrans et le rangement des documents.

## 7. Sécurité organisationnelle

La sécurité repose sur les personnes, les processus et la technologie. Les mesures utiles comprennent :

- Politiques de sécurité de l’information et règles d’usage acceptable.
- Inventaires des actifs et des données.
- Classification des données et règles de manipulation.
- Procédures d’arrivée, de changement de poste et de départ pour les comptes.
- Sensibilisation et signalement des hameçonnages.
- Gestion des risques fournisseurs et tiers.
- Gestion des changements et configurations de référence.
- Revues périodiques des accès et audits.
- Plans de réponse aux incidents, de continuité et de reprise.

## 8. Vie privée et protection des données

- **Limitation des finalités :** utiliser les données pour des objectifs définis et autorisés.
- **Minimisation des données :** ne collecter et exposer que ce qui est nécessaire.
- **Limitation de conservation :** conserver les données uniquement pendant la durée justifiée et permise.
- **Contrôle d’accès :** restreindre les accès selon le rôle et le besoin.
- **Responsabilisation :** documenter les décisions et traitements pertinents.
- **Protection dès la conception :** intégrer la vie privée dès la conception du système.
- **Mesures de sécurité :** protéger contre la perte, la divulgation, l’altération et les accès non autorisés.

Des données pseudonymisées peuvent toujours être personnelles si une réidentification reste possible. Le chiffrement réduit le risque, mais ne remplace ni un traitement licite, ni la gouvernance des accès, ni les règles de conservation, ni des opérations sécurisées. Les obligations juridiques précises dépendent de la juridiction et de la législation en vigueur.

## 9. Application à un système d’information

Pour un système contenant des dossiers administratifs sensibles :

- Classifier les données et définir les finalités autorisées.
- Exiger des identités individuelles et une authentification forte.
- Autoriser chaque opération au niveau de la ressource.
- Protéger les données en transit et au repos lorsque cela est pertinent.
- Journaliser les accès et modifications sensibles sans enregistrer les secrets.
- Séparer les services publics des couches applicatives et des bases de données.
- Maintenir des sauvegardes protégées et testées.
- Définir les procédures d’escalade des incidents et de restauration.
- Réviser les droits et supprimer les accès obsolètes.
- Tester les contrôles de sécurité ainsi que la reprise opérationnelle.

## À retenir

- Complète = toutes les données sélectionnées ; incrémentielle = changements depuis la sauvegarde précédente ; différentielle = changements depuis la dernière complète.
- RPO concerne la perte de données tolérable ; RTO concerne le délai de restauration.
- PCA/BCP maintient les activités essentielles ; PRA/DRP restaure les services informatiques.
- La réplication améliore la disponibilité mais ne remplace pas les sauvegardes protégées.
- Vie privée, sécurité physique, personnes et procédures font partie de la cybersécurité.

[Version anglaise](06-resilience-and-governance.md)
