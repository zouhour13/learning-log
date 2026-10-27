# DevOps et Déploiement

> **Auteur :** Zouhour Bellamine  
> **Langue :** Français  
> **Objectif :** comprendre les pratiques et outils qui automatisent la construction, les tests, la livraison, le déploiement et l'exploitation des logiciels.

## Sommaire

1. [Définition et culture DevOps](#1-définition-et-culture-devops)
2. [Git et collaboration](#2-git-et-collaboration)
3. [CI, livraison continue et déploiement continu](#3-ci-livraison-continue-et-déploiement-continu)
4. [Pipeline d'automatisation](#4-pipeline-dautomatisation)
5. [Tests, qualité et artefacts](#5-tests-qualité-et-artefacts)
6. [Virtualisation et conteneurs](#6-virtualisation-et-conteneurs)
7. [Docker : notions essentielles](#7-docker--notions-essentielles)
8. [Configuration, secrets et environnements](#8-configuration-secrets-et-environnements)
9. [Linux et exploitation](#9-linux-et-exploitation)
10. [Déploiement et infrastructure](#10-déploiement-et-infrastructure)
11. [Monitoring, logs et fiabilité](#11-monitoring-logs-et-fiabilité)
12. [Sauvegardes, reprise et sécurité](#12-sauvegardes-reprise-et-sécurité)
13. [Confusions fréquentes](#13-confusions-fréquentes)
14. [Auto-évaluation QCM](#14-auto-évaluation-qcm)

## 1. Définition et culture DevOps

**DevOps** combine pratiques, collaboration et automatisation pour rapprocher le développement logiciel (Dev) et les opérations/exploitation (Ops). Le but est de livrer des changements fiables plus rapidement, de réduire les erreurs manuelles et d'améliorer le retour d'information.

Principes :
- Automatiser les tâches répétitives.
- Intégrer et tester les changements fréquemment.
- Livrer des versions petites et traçables.
- Surveiller le système en production.
- Partager la responsabilité de la qualité et de la fiabilité.
- Préparer le retour arrière et la reprise après incident.

DevOps n'est pas simplement un outil, une équipe, Docker ou un pipeline CI/CD. C'est une combinaison de pratiques techniques et organisationnelles.

## 2. Git et collaboration

Git est un système de gestion de versions distribué.

Commandes courantes :
- `git status` : état du répertoire de travail et de l'index.
- `git add` : place des modifications dans la zone de staging.
- `git commit` : crée un commit local.
- `git branch` : liste ou gère les branches.
- `git switch` : change de branche.
- `git merge` : intègre une branche dans une autre.
- `git pull` : récupère des changements distants et les intègre selon la configuration.
- `git fetch` : récupère les références et objets distants sans intégrer automatiquement les changements dans la branche courante.
- `git push` : envoie des commits vers le dépôt distant.
- `git log` : affiche l'historique des commits.

Cycle simplifié : répertoire de travail → staging/index → commit local → dépôt distant après push.

- **Commit :** snapshot identifié par un hash, avec auteur, message et parent(s).
- **Branche :** référence mobile vers un commit.
- **Merge :** fusionne des historiques ; des conflits peuvent nécessiter une résolution manuelle.
- **Pull request / merge request :** proposition de changement soumise à revue et contrôles.
- **Tag :** référence souvent utilisée pour marquer une version.
- **.gitignore :** empêche certains fichiers non suivis d'être ajoutés ; ne supprime pas du dépôt un fichier déjà suivi.

Ne jamais committer des clés API, mots de passe, certificats privés ou fichiers contenant des données sensibles.

## 3. CI, livraison continue et déploiement continu

- **Intégration continue (CI)** : intégrer régulièrement les changements et exécuter automatiquement des contrôles, tels que compilation, linting et tests.
- **Livraison continue (Continuous Delivery)** : maintenir le logiciel dans un état déployable ; la mise en production peut nécessiter une approbation.
- **Déploiement continu (Continuous Deployment)** : déployer automatiquement en production chaque changement qui passe les contrôles prévus.
- **Build** : étape qui construit ou prépare un artefact livrable.
- **Artefact** : résultat versionné d'un build, par exemple un paquet, un binaire ou une image de conteneur.
- **Release** : version rendue disponible selon le processus de publication.

La CI n'est pas à elle seule le déploiement en production. La livraison continue n'implique pas nécessairement une mise en production automatique.

## 4. Pipeline d'automatisation

Un pipeline typique :

`Commit → lint/analyse statique → tests → build → scan sécurité → artefact → déploiement en staging → validation → production`

Les étapes exactes dépendent du projet.

- **Runner/agent :** machine ou environnement qui exécute les étapes du pipeline.
- **Job :** unité de travail exécutée par le système CI.
- **Stage :** groupe logique d'étapes ; les stages peuvent être séquentiels ou parallèles.
- **Cache :** réutilise des données calculées pour accélérer les exécutions ; il ne doit pas être confondu avec un artefact livrable.
- **Secret de pipeline :** donnée sensible injectée de façon contrôlée.
- **Gate/approval :** contrôle ou approbation conditionnant la poursuite du déploiement.

Le pipeline doit échouer clairement quand un contrôle obligatoire échoue. Il faut conserver les logs utiles, limiter les permissions du runner et éviter d'exposer des secrets dans les sorties.

## 5. Tests, qualité et artefacts

Les contrôles automatisés peuvent comprendre :
- Tests unitaires, d'intégration et de bout en bout.
- Linting et formatage.
- Analyse statique de code.
- Audit des dépendances.
- Analyse de vulnérabilités d'images.
- Tests de performance ciblés.
- Vérification des migrations de base de données.

**Reproductibilité :** obtenir un résultat cohérent à partir du même code, des mêmes dépendances et d'une configuration contrôlée.

**Versionnement des artefacts :** associer chaque artefact à un commit ou à une version identifiable. Idéalement, promouvoir le même artefact validé entre staging et production plutôt que reconstruire un contenu potentiellement différent.

## 6. Virtualisation et conteneurs

### Machine virtuelle (VM)

Une machine virtuelle virtualise un ordinateur complet et exécute son propre système d'exploitation invité. Un hyperviseur gère les machines virtuelles.

### Conteneur

Un conteneur isole des processus au niveau du système d'exploitation. Il partage généralement le noyau de l'hôte, tout en utilisant des mécanismes d'isolation tels que namespaces et cgroups sous Linux.

| Machine virtuelle | Conteneur |
|---|---|
| Inclut généralement un OS invité complet | Partage généralement le noyau de l'hôte |
| Isolation au niveau machine virtuelle | Isolation au niveau processus/OS |
| Plus lourde en ressources en général | Démarrage et empreinte souvent plus légers |
| Peut exécuter un noyau différent de l'hôte selon l'hyperviseur | Ne peut généralement pas exécuter directement un noyau différent de celui de l'hôte |

Les conteneurs ne sont pas automatiquement sécurisés : images, privilèges, réseau, secrets et mises à jour doivent être maîtrisés.

## 7. Docker : notions essentielles

- **Image :** modèle immuable en couches utilisé pour créer des conteneurs.
- **Conteneur :** instance créée à partir d'une image, avec un état d'exécution.
- **Dockerfile :** instructions de construction d'une image.
- **Registry :** service qui stocke et distribue des images.
- **Volume :** mécanisme de persistance des données au-delà du cycle de vie du conteneur.
- **Réseau Docker :** permet la communication entre conteneurs et/ou l'hôte selon la configuration.
- **Port publishing :** expose un port du conteneur via un port de l'hôte.
- **Compose :** décrit et exécute une application multi-conteneurs à l'aide d'un fichier de configuration.

Commandes :
- `docker build` : construire une image.
- `docker pull` : télécharger une image.
- `docker run` : créer et lancer un conteneur.
- `docker ps` : afficher les conteneurs en cours d'exécution.
- `docker logs` : consulter les logs d'un conteneur.
- `docker exec` : exécuter une commande dans un conteneur en cours d'exécution.
- `docker stop` : demander l'arrêt d'un conteneur.
- `docker images` : lister les images locales.

Bonnes pratiques : utiliser des images de base fiables et versionnées, réduire les couches inutiles, ne pas incorporer de secrets dans l'image, exécuter avec le moins de privilèges possible et définir des contrôles de santé adaptés.

## 8. Configuration, secrets et environnements

Les environnements courants sont développement, test, staging/préproduction et production.

- **Configuration :** paramètres pouvant varier selon l'environnement, comme URL de service, niveau de logs ou taille de pool.
- **Secret :** mot de passe, clé API, jeton ou clé privée nécessitant une protection.
- **Variable d'environnement :** mécanisme courant pour transmettre une configuration à un processus ; elle n'est pas automatiquement un coffre-fort sécurisé.
- **Secret manager :** service de stockage, distribution et rotation contrôlée des secrets.

Ne pas placer de secret dans le code, l'historique Git, les images de conteneurs ou les logs. Limiter l'accès, prévoir la rotation et séparer les secrets par environnement.

## 9. Linux et exploitation

Commandes utiles :
- `pwd` : répertoire courant.
- `ls -la` : liste les fichiers, y compris cachés.
- `cd` : changer de répertoire.
- `cat`, `less`, `tail -f` : lire des fichiers et suivre des logs.
- `grep` : rechercher du texte.
- `find` : rechercher des fichiers.
- `ps`, `top` : observer les processus et ressources.
- `kill` : envoyer un signal à un processus.
- `chmod` : modifier les permissions.
- `chown` : modifier propriétaire et groupe.
- `df -h` : espace disque des systèmes de fichiers.
- `du -sh` : taille d'un répertoire.
- `systemctl status` : consulter l'état d'un service géré par systemd.
- `journalctl` : consulter les journaux systemd.

Permissions Unix : lecture (r), écriture (w), exécution (x), définies pour propriétaire, groupe et autres. Le compte exécutant un service doit disposer des seuls droits nécessaires.

Un processus en cours d'exécution peut échouer à cause d'un manque de mémoire, d'un disque plein, d'une permission insuffisante, d'un port déjà occupé, d'une mauvaise configuration ou d'une dépendance inaccessible.

## 10. Déploiement et infrastructure

- **Déploiement :** installation/mise à disposition d'une version dans un environnement.
- **Reverse proxy :** reçoit les requêtes et les transmet au serveur approprié ; peut gérer TLS, routage et équilibrage.
- **Load balancer :** distribue le trafic entre plusieurs instances.
- **Infrastructure as Code (IaC) :** décrire et gérer l'infrastructure à l'aide de fichiers versionnés.
- **Configuration management :** maintenir des systèmes dans un état souhaité.
- **Blue-green deployment :** deux environnements, l'un actif et l'autre préparé ; bascule vers la nouvelle version après validation.
- **Canary deployment :** exposer progressivement une nouvelle version à une fraction du trafic.
- **Rolling deployment :** remplacer les instances progressivement.
- **Rollback :** revenir à une version antérieure connue comme fonctionnelle.

Une stratégie de déploiement doit prendre en compte les migrations de base de données, la compatibilité des versions, la santé des instances et le retour arrière.

## 11. Monitoring, logs et fiabilité

- **Logs :** événements horodatés, par exemple erreurs et changements d'état.
- **Métriques :** valeurs numériques suivies dans le temps, comme CPU, mémoire, latence ou taux d'erreur.
- **Traces distribuées :** parcours d'une requête à travers plusieurs composants.
- **Alerting :** notification lorsqu'une condition significative est atteinte.
- **Health check :** contrôle de l'état d'un service.
- **SLO (Service Level Objective) :** objectif mesurable de niveau de service.
- **SLA (Service Level Agreement) :** engagement contractuel de service.
- **SLI (Service Level Indicator) :** indicateur mesurant un aspect du service.

Indicateurs fréquents : disponibilité, latence (souvent p95/p99), débit, taux d'erreur et saturation des ressources.

- **MTTR** : temps moyen de réparation/rétablissement, selon la définition retenue.
- **RTO (Recovery Time Objective)** : durée maximale visée pour rétablir un service.
- **RPO (Recovery Point Objective)** : perte de données maximale visée, exprimée en temps.

## 12. Sauvegardes, reprise et sécurité

Une sauvegarde n'est utile que si sa restauration est possible et testée.

- **Sauvegarde complète :** copie de l'ensemble défini des données.
- **Incrémentale :** copie les changements depuis la sauvegarde précédente.
- **Différentielle :** copie les changements depuis la dernière sauvegarde complète.
- **Plan de reprise après sinistre (DRP) :** procédures de restauration des systèmes après incident majeur.
- **Haute disponibilité :** architecture visant à limiter l'interruption de service.
- **Redondance :** composants ou données répliqués pour éviter un point de défaillance unique.

Sécurité DevOps :
- appliquer le moindre privilège aux comptes, runners et conteneurs ;
- mettre à jour les dépendances et images de base ;
- scanner les dépendances et images ;
- protéger les branches et exiger des revues lorsque pertinent ;
- signer ou vérifier les artefacts selon les exigences ;
- garder les secrets hors du dépôt et des logs ;
- tester régulièrement la restauration et les procédures d'incident.

La réplication n'est pas équivalente à une sauvegarde : une suppression ou corruption peut être répliquée.

## 13. Confusions fréquentes

| Notion A | Notion B | Différence |
|---|---|---|
| CI | CD | Intégrer/tester fréquemment vs livrer ou déployer |
| Continuous Delivery | Continuous Deployment | Version déployable avec éventuelle approbation vs déploiement automatique en production |
| Image Docker | Conteneur | Modèle de création vs instance en exécution |
| VM | Conteneur | OS invité généralement complet vs isolation de processus partageant le noyau |
| Volume | Couche éphémère du conteneur | Persistance dédiée vs données liées au cycle de vie du conteneur |
| Git fetch | Git pull | Récupération sans intégration automatique vs récupération et intégration |
| Cache | Artefact | Accélère un calcul vs résultat livrable/versionné |
| Logs | Métriques | Événements détaillés vs mesures numériques agrégées |
| RTO | RPO | Délai de rétablissement visé vs perte de données temporelle acceptable |
| Réplication | Sauvegarde | Copie synchronisée vs copie destinée à la restauration |

## 14. Auto-évaluation QCM

**Q1. Quel est l'objectif principal de l'intégration continue ?**

A. Supprimer tous les tests manuels et automatiques.  
B. Intégrer fréquemment les changements et automatiser les vérifications.  
C. Remplacer Git par Docker.  
D. Déployer obligatoirement chaque commit en production.

**Q2. Quelle affirmation décrit correctement une image Docker ?**

A. C'est toujours une machine virtuelle complète.  
B. C'est un modèle utilisé pour créer des conteneurs.  
C. C'est une base de données.  
D. C'est un processus Linux.

**Q3. Quelle commande permet de consulter les logs d'un conteneur Docker ?**

A. `docker logs`  
B. `docker build`  
C. `docker pull`  
D. `docker commit`

**Q4. Quelle affirmation sur les conteneurs Linux est généralement vraie ?**

A. Chaque conteneur possède toujours son propre noyau.  
B. Ils partagent généralement le noyau de l'hôte.  
C. Ils ne peuvent jamais communiquer par réseau.  
D. Ils remplacent obligatoirement Git.

**Q5. Quelle différence est correcte entre RTO et RPO ?**

A. RTO mesure la latence HTTP ; RPO mesure le débit réseau.  
B. RTO est le délai de rétablissement visé ; RPO est la perte de données temporelle acceptable.  
C. Ils désignent deux types de conteneurs.  
D. RTO est une sauvegarde complète.

**Corrigé :** 1-B, 2-B, 3-A, 4-B, 5-B.

## Références

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [The Twelve-Factor App](https://12factor.net/)
- [Linux man-pages](https://man7.org/linux/man-pages/)
- [Google SRE Books](https://sre.google/books/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
