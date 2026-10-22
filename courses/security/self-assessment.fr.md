> **Auteur :** Zouhour Bellamine

# Cybersécurité — Auto-évaluation

Répondez à chaque question avant de consulter le corrigé. Concentrez-vous sur la raison pour laquelle la bonne réponse se distingue des autres choix.

## Questions

1. Un utilisateur non autorisé modifie la superficie enregistrée d’un bien. Quelle propriété est directement compromise ?  
   A. Confidentialité · B. Intégrité · C. Disponibilité · D. Authentification

2. Un mot de passe est accepté, mais l’utilisateur ne peut pas ouvrir un dossier qui ne relève pas de ses responsabilités. Quel contrôle a pris cette décision ?  
   A. Identification · B. Authentification · C. Autorisation · D. Hachage

3. Quelle combinaison utilise deux catégories de facteurs différentes ?  
   A. Mot de passe + code PIN · B. Deux mots de passe · C. Mot de passe + clé de sécurité matérielle · D. Nom d’utilisateur + mot de passe

4. Les permissions sont attribuées aux rôles Lecteur, Éditeur et Administrateur. Quel modèle est utilisé ?  
   A. DAC · B. MAC · C. RBAC · D. ABAC

5. Quelle affirmation décrit le chiffrement symétrique ?  
   A. Il utilise toujours une paire publique/privée · B. Il utilise une clé secrète partagée · C. Il est identique au hachage · D. Il ne peut pas protéger des fichiers

6. Quelle affirmation est vraie à propos de SHA-256 ?  
   A. Chiffrement symétrique · B. Encodage · C. Produit une empreinte de 256 bits · D. Déchiffre avec une clé privée

7. Quelle méthode convient au stockage des mots de passe ?  
   A. Texte en clair · B. Base64 · C. SHA-256 rapide sans sel · D. Argon2id avec un sel unique

8. Quel est l’objectif principal d’une signature numérique ?  
   A. Garantir le secret · B. Contribuer à l’intégrité et à l’authenticité liée à la clé de signature · C. Compresser un fichier · D. Remplacer l’autorisation

9. Que fournit HTTPS lorsqu’il est correctement configuré et validé ?  
   A. La preuve que le propriétaire du site est honnête · B. Une protection TLS du canal de communication · C. Une protection contre tous les logiciels malveillants · D. La preuve que l’appareil est sûr

10. Quel outil détecte principalement les activités réseau suspectes et alerte les opérateurs ?  
    A. IDS · B. IPS · C. Serveur de sauvegarde · D. Répartiteur de charge

11. De nombreuses machines compromises saturent un service public. Il s’agit de :  
    A. Injection SQL · B. DDoS · C. Hachage · D. Minimisation des données

12. Quelle est la principale défense contre l’injection SQL ?  
    A. Masquer un bouton · B. Requêtes paramétrées · C. Encoder un mot de passe en Base64 · D. Validation côté client uniquement

13. Un utilisateur change l’identifiant d’un dossier dans une requête API et consulte le dossier d’un autre utilisateur car le serveur ne vérifie pas les droits. Il s’agit de :  
    A. BOLA/IDOR · B. Authentification forte · C. Chiffrement au repos · D. Limitation de débit

14. Une sauvegarde incrémentielle contient :  
    A. Toutes les données à chaque fois · B. Les changements depuis la sauvegarde la plus récente · C. Les changements depuis la dernière complète uniquement · D. La même chose qu’une réplication

15. Quelle mesure correspond au délai cible de restauration d’un service ?  
    A. RPO · B. RTO · C. SHA · D. CVSS

16. Que signifie le mode de permission Unix 640 ?  
    A. Tout le monde peut lire et écrire · B. Propriétaire lecture/écriture, groupe lecture, autres aucun droit · C. Propriétaire exécution seulement · D. Propriétaire sans permission

17. Quel système collecte et corrèle les événements de sécurité provenant de plusieurs sources ?  
    A. SIEM · B. Base64 · C. DHCP · D. Compilateur

18. Une faiblesse logicielle qui n’a pas été corrigée est une :  
    A. Menace · B. Vulnérabilité · C. Objectif de reprise · D. Signature

19. Un poste communique activement avec une infrastructure suspecte de commande et contrôle. Quelle action peut limiter la propagation ?  
    A. Publier les identifiants · B. Ignorer l’alerte · C. Isoler le poste selon les procédures d’incident · D. Supprimer tous les journaux

20. Pourquoi placer un serveur exposé au public dans une DMZ ?  
    A. Il ne peut jamais être compromis · B. Pour isoler son exposition et restreindre l’accès aux systèmes internes · C. Pour remplacer l’authentification · D. Pour exposer la base de données

## Corrigé

1. **B — Intégrité.** Le dossier a été modifié sans autorisation.
2. **C — Autorisation.** L’authentification vérifie l’identité ; l’autorisation décide des ressources et actions permises.
3. **C — Mot de passe et clé matérielle.** Connaissance et possession.
4. **C — RBAC.** Les permissions sont associées à des rôles.
5. **B — Clé secrète partagée.** Le chiffrement symétrique exige une gestion sûre des clés.
6. **C — Empreinte de 256 bits.** SHA-256 est une fonction de hachage, pas un chiffrement.
7. **D — Hachage de mot de passe avec sel.** Utiliser un algorithme et des paramètres adaptés.
8. **B — Intégrité et authenticité liée à la clé.** Une signature ne chiffre pas automatiquement un document.
9. **B — Canal protégé par TLS.** HTTPS ne prouve pas que le site est honnête ou inoffensif.
10. **A — IDS.** Un IPS peut bloquer ; l’IDS sert principalement à détecter et alerter.
11. **B — DDoS.** Attaque distribuée visant principalement la disponibilité.
12. **B — Requêtes paramétrées.** Elles séparent les instructions SQL des valeurs utilisateur.
13. **A — BOLA/IDOR.** Le serveur n’autorise pas l’accès à l’objet précis.
14. **B — Changements depuis la sauvegarde la plus récente.** La restauration nécessite généralement la sauvegarde complète et les incréments requis.
15. **B — RTO.** Le RPO concerne la fenêtre de perte de données tolérable.
16. **B — Propriétaire rw-, groupe r--, autres ---.** 6 = 4+2, 4 = 4 et 0 = aucun droit.
17. **A — SIEM.** Il agrège et corrèle les événements.
18. **B — Vulnérabilité.** Une menace peut exploiter une vulnérabilité ; un exploit est la technique utilisée.
19. **C — Isoler le poste.** Suivre le plan de réponse et préserver les preuves.
20. **B — Isolation et flux restreints.** Une DMZ réduit l’exposition mais ne garantit pas l’immunité.

## Méthode de révision

- Refaire les questions incorrectes sans regarder le corrigé.
- Expliquer la différence entre la bonne réponse et le distracteur le plus proche.
- Pour chaque menace, identifier la propriété ciblée, le vecteur d’entrée, l’impact et les mesures préventives/détectives.
- Relire le module correspondant avant de refaire le questionnaire.

[Version anglaise](self-assessment.md)
