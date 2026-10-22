> **Auteur :** Zouhour Bellamine

# 05 — Systèmes, durcissement, journaux et réponse aux incidents

## 1. Comptes et privilèges

- Utiliser des comptes individuels pour pouvoir attribuer les actions.
- Limiter les privilèges administratifs et, si nécessaire, séparer les comptes quotidiens des comptes privilégiés.
- Désactiver les comptes inutilisés et révoquer rapidement les accès lorsque les rôles changent.
- Protéger les comptes de service et éviter la connexion interactive lorsqu’elle n’est pas nécessaire.
- Renforcer les contrôles pour les accès privilégiés et distants.

L’utilisateur root sous Linux dispose de larges pouvoirs administratifs. Le mécanisme **sudo** permet aux utilisateurs autorisés d’exécuter des commandes permises avec des privilèges élevés ; il ne donne pas automatiquement un accès illimité à tout utilisateur.

## 2. Permissions Linux

Les permissions Unix traditionnelles distinguent trois catégories : propriétaire, groupe et autres.

- **r :** lecture.
- **w :** écriture.
- **x :** exécution pour un fichier ; traversée/recherche pour un répertoire.

Valeurs numériques : lecture = 4, écriture = 2, exécution = 1.

| Mode | Propriétaire | Groupe | Autres |
|---|---|---|---|
| 777 | rwx | rwx | rwx |
| 755 | rwx | r-x | r-x |
| 750 | rwx | r-x | --- |
| 640 | rw- | r-- | --- |
| 600 | rw- | --- | --- |

Le mode **640** signifie que le propriétaire peut lire et écrire, le groupe peut lire et les autres n’ont aucun accès. Éviter les permissions trop larges pour les secrets, clés privées et fichiers de configuration.

## 3. Durcissement des systèmes

Le durcissement réduit la surface d’attaque et limite les conséquences d’une compromission :

- Installer les mises à jour de sécurité et suivre les logiciels en fin de support.
- Supprimer ou désactiver les services et paquets inutiles.
- Fermer les ports inutilisés et restreindre les interfaces d’administration.
- Appliquer le moindre privilège et des permissions de fichiers sûres.
- Utiliser une administration distante sécurisée.
- Configurer les pare-feu des hôtes et la protection des terminaux.
- Protéger, lorsque c’est pertinent, l’accès physique, le démarrage et le micrologiciel.
- Activer des journaux utiles et synchroniser l’heure.
- Protéger les sauvegardes et tester leur restauration.
- Maintenir des configurations de référence et surveiller les écarts.

## 4. Gestion des correctifs et des vulnérabilités

1. Inventorier les systèmes, versions logicielles et responsables.
2. Identifier les faiblesses à partir d’avis de sécurité, de scanners et des informations des fournisseurs.
3. Évaluer la gravité, l’exploitabilité, l’exposition et l’impact métier.
4. Prioriser selon le risque réel, pas uniquement selon un score.
5. Tester et déployer les correctifs dans des délais définis.
6. Vérifier la correction et surveiller les régressions.
7. Documenter les exceptions, mesures compensatoires et dates de correction.

**CVSS** fournit un score normalisé de gravité d’une vulnérabilité. Il aide à prioriser mais ne constitue pas, à lui seul, une évaluation complète du risque. L’exposition, l’exploitation active et la criticité de l’actif comptent également.

## 5. Journalisation et supervision

Les événements utiles comprennent les authentifications réussies ou échouées, changements de privilèges, actions administratives, accès aux ressources sensibles, modifications importantes de dossiers, changements de configuration, erreurs applicatives et alertes de sécurité.

Les journaux doivent avoir des horodatages fiables, des champs cohérents, des accès restreints, une durée de conservation définie et une protection contre l’altération. La synchronisation des horloges facilite la corrélation entre systèmes.

Ne pas journaliser les mots de passe, jetons de session, clés privées ou données sensibles inutiles. Les journaux peuvent eux-mêmes contenir des informations confidentielles et doivent être protégés.

## 6. SIEM, IOC et preuves numériques

Un **SIEM** collecte et corrèle les événements issus des terminaux, serveurs, systèmes d’identité, applications et contrôles réseau.

- **IOC :** indicateur de compromission, par exemple empreinte de fichier suspect, domaine, adresse IP ou artefact de persistance.
- **Faux positif :** activité légitime signalée à tort.
- **Faux négatif :** activité malveillante non détectée.
- **Informatique légale / analyse forensique :** collecte et analyse méthodiques des preuves numériques.
- **Chaîne de conservation (chain of custody) :** documentation de la manipulation et du transfert des preuves pour étayer leur intégrité et leur provenance.

Une alerte ne prouve pas à elle seule une compromission. Il faut la valider, recueillir le contexte et documenter l’enquête.

## 7. Réponse aux incidents

Cycle courant :

1. **Préparation :** définir les rôles, contacts, procédures, outils et ressources de reprise.
2. **Détection et analyse :** valider les alertes, déterminer l’étendue et évaluer l’impact.
3. **Confinement :** limiter la propagation ou les dommages, par exemple en isolant un terminal compromis.
4. **Éradication :** supprimer les artefacts malveillants et fermer le vecteur d’entrée.
5. **Rétablissement :** restaurer de manière sûre, valider l’intégrité et surveiller les récidives.
6. **Retour d’expérience :** documenter les causes, lacunes et actions correctives.

L’ordre peut varier selon l’incident. Préserver les preuves utiles et coordonner les actions avant toute opération destructive susceptible d’effacer des traces. La réduction du dommage actif reste prioritaire.

## 8. Hygiène des terminaux

- Utiliser une protection des terminaux/EDR adaptée.
- Restreindre l’installation de logiciels et les scripts risqués selon les besoins.
- Chiffrer les appareils portables et les sauvegardes sensibles.
- Verrouiller les écrans et sécuriser les accès physiques.
- Appliquer des configurations sécurisées cohérentes.
- Surveiller les activités privilégiées.
- Protéger l’accès distant avec MFA et restrictions réseau.
- Encourager le signalement rapide des activités suspectes.

## À retenir

- Le moindre privilège limite les dégâts d’un compte compromis.
- Le mode 640 = propriétaire lecture/écriture, groupe lecture, autres aucun droit.
- Le durcissement réduit la surface d’attaque ; la gestion des correctifs traite les faiblesses connues.
- Le SIEM corrèle des événements ; l’EDR se concentre sur la détection et la réponse au niveau des terminaux.
- La réponse aux incidents inclut préparation, détection, confinement, éradication, rétablissement et retour d’expérience.

[Version anglaise](05-systems-and-security-operations.md)
