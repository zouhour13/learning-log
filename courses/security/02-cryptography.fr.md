> **Auteur :** Zouhour Bellamine

# 02 — Cryptographie, hachage, signatures numériques et TLS

## 1. Vocabulaire

- **Texte en clair (plaintext) :** données originales lisibles.
- **Texte chiffré (ciphertext) :** résultat du chiffrement.
- **Chiffrement :** transformation du texte en clair en texte chiffré afin de protéger la confidentialité.
- **Déchiffrement :** récupération du texte en clair à l’aide de la clé appropriée.
- **Clé :** valeur qui contrôle une opération cryptographique.

Utiliser des algorithmes établis et évalués. La sécurité ne doit pas dépendre du secret de l’algorithme.

## 2. Cryptographie symétrique et asymétrique

Le **chiffrement symétrique** utilise une clé secrète partagée pour chiffrer et déchiffrer. Il est efficace pour les grands volumes de données. Exemples : AES et ChaCha20.

La **cryptographie asymétrique** utilise une paire de clés liées : une clé publique qui peut être diffusée et une clé privée qui doit être protégée. Elle permet les signatures numériques et certains mécanismes d’établissement de clés ; certains schémas permettent également le chiffrement.

Les protocoles modernes combinent souvent les deux approches : les mécanismes asymétriques authentifient les parties ou établissent des clés de session, puis un chiffrement symétrique authentifié protège efficacement les données applicatives.

Une clé publique doit être authentifiée. Sinon, un attaquant peut la remplacer par sa propre clé.

## 3. Chiffrement, hachage et encodage

| Propriété | Chiffrement | Hachage | Encodage |
|---|---|---|---|
| Objectif | Confidentialité | Empreinte de taille fixe | Représentation des données |
| Clé | Oui pour le chiffrement à clé | Pas pour un hachage ordinaire | Généralement aucune |
| Opération inverse prévue | Oui, avec la bonne clé | Non | Généralement oui |
| Exemple | AES | SHA-256 | Base64 |

**Base64 n’est pas un chiffrement.** Il ne fournit aucune confidentialité.

## 4. Fonctions de hachage cryptographique

Une fonction de hachage transforme une entrée de longueur quelconque en une empreinte de longueur fixe. Exemples : SHA-256, SHA-512 et SHA-3.

- **Résistance à la préimage :** à partir d’une empreinte, il doit être impraticable de trouver une entrée qui la produit.
- **Résistance à la seconde préimage :** à partir d’une entrée, il doit être impraticable d’en trouver une autre ayant la même empreinte.
- **Résistance aux collisions :** il doit être impraticable de trouver deux entrées différentes ayant la même empreinte.

Des collisions existent nécessairement en théorie lorsque des entrées de longueur arbitraire sont mappées vers un espace fini. La sécurité signifie qu’il est impraticable de les trouver par calcul.

Une empreinte simple ne détecte les modifications que si l’empreinte de référence est fiable. Un attaquant capable de remplacer le fichier et son empreinte peut contourner cette vérification. Utiliser un MAC avec clé ou une signature numérique lorsque l’authenticité est nécessaire.

## 5. Stockage des mots de passe

Ne jamais stocker les mots de passe en clair ni utiliser un hachage général rapide, tel que SHA-256 seul, comme mécanisme de stockage des mots de passe.

Utiliser un algorithme dédié :
- **Argon2id :** choix moderne, exigeant en mémoire.
- **scrypt :** dérivation de mot de passe exigeante en mémoire.
- **bcrypt :** algorithme établi de hachage de mots de passe.
- **PBKDF2 :** dérivation fondée sur des itérations, utilisée par différents systèmes et standards.

Un **sel (salt)** est une valeur aléatoire unique enregistrée avec chaque empreinte de mot de passe. Il évite que des mots de passe identiques produisent automatiquement des empreintes identiques et réduit l’intérêt des tables précalculées. Le sel n’est pas secret.

Un **pepper** est un secret supplémentaire stocké séparément de la base des mots de passe. Il doit être protégé comme tout autre secret. Utiliser des bibliothèques reconnues et des paramètres appropriés ; ne pas inventer son propre mécanisme.

## 6. HMAC et signatures numériques

**HMAC** combine une fonction de hachage avec une clé secrète partagée. Il permet de vérifier l’intégrité et l’authenticité d’un message entre les parties qui connaissent cette clé. Il n’offre pas les mêmes propriétés de non-répudiation qu’une signature à clé publique.

Une **signature numérique** est créée avec une clé privée de signature et vérifiée avec la clé publique correspondante. Elle permet de vérifier l’intégrité et relie la signature à la clé utilisée. L’attribution à une personne et la non-répudiation dépendent également de la vérification d’identité, de la gestion des clés, des procédures et du contexte juridique.

Une signature **ne chiffre pas automatiquement** le document.

## 7. Certificats et PKI

Un certificat numérique associe une identité ou un identifiant, par exemple un nom DNS, à une clé publique. Les certificats X.509 comprennent couramment le sujet, l’émetteur, la clé publique, la période de validité, le numéro de série, les usages et la signature de l’émetteur.

La **PKI (Public Key Infrastructure, infrastructure à clés publiques)** permet d’émettre, de valider, de gérer et de révoquer des certificats.

- **CA / AC :** autorité de certification qui émet ou signe les certificats.
- **RA / AR :** autorité d’enregistrement qui vérifie l’identité ou les demandes.
- **CRL / LCR :** liste de révocation des certificats.
- **OCSP :** protocole de vérification du statut d’un certificat.

La validation examine notamment la chaîne de confiance, les dates de validité, le nom d’hôte, l’usage prévu et, lorsque cela s’applique, le statut de révocation. Un certificat n’est pas une clé privée.

## 8. TLS et HTTPS

HTTP seul ne fournit pas de chiffrement du transport. **HTTPS est HTTP transporté au moyen de TLS.**

TLS peut fournir la confidentialité, l’intégrité et l’authentification du serveur ; l’authentification du client est également possible. Les certificats contribuent à établir la confiance dans la clé publique du serveur. L’établissement de clés crée des clés de session ; le chiffrement symétrique authentifié protège ensuite le trafic applicatif.

HTTPS ne prouve pas qu’un site est honnête ou inoffensif. Un site malveillant peut posséder un certificat valide. Ne pas contourner à la légère les avertissements de certificat : ils peuvent signaler une expiration, une discordance de nom d’hôte, un émetteur non fiable, une mauvaise configuration ou une interception possible.

## 9. Algorithmes à reconnaître

| Algorithme | Catégorie | Point essentiel |
|---|---|---|
| AES | Chiffrement symétrique | Chiffrement moderne largement utilisé |
| ChaCha20 | Chiffrement symétrique | Chiffrement par flot moderne |
| AES-GCM | Chiffrement authentifié | Confidentialité et intégrité si correctement utilisé |
| RSA | Cryptographie à clé publique | Signatures et schémas de chiffrement adaptés |
| ECC | Cryptographie à clé publique | Famille de techniques à courbes elliptiques |
| SHA-256 | Hachage | Empreinte de 256 bits, famille SHA-2 |
| SHA-3 | Famille de hachage | Conception distincte de SHA-2 |
| HMAC | Authentification de message | MAC fondé sur un hachage et un secret partagé |
| Argon2id | Hachage de mots de passe | Exigeant en mémoire |
| MD5 | Hachage | Inadapté lorsque la résistance aux collisions est nécessaire |
| SHA-1 | Hachage | Inadapté aux signatures exigeant la résistance aux collisions |
| DES | Chiffrement symétrique | Obsolète, clé effective de 56 bits |
| 3DES | Chiffrement symétrique | Ancien et déprécié ou retiré des usages modernes |

## 10. Gestion des clés

- Générer les clés avec un générateur cryptographiquement sûr.
- Limiter l’accès aux clés privées et aux clés de chiffrement des données.
- Stocker les secrets dans un gestionnaire adapté ou, lorsque nécessaire, dans un dispositif matériel sécurisé.
- Définir les procédures de rotation, révocation, récupération, sauvegarde et destruction.
- Ne jamais placer les secrets dans le code source, les dépôts publics, les journaux ou le code côté client.
- Utiliser des protocoles et bibliothèques reconnus.

Le chiffrement authentifié, comme AES-GCM, exige une gestion correcte des nonces. Une réutilisation incorrecte d’un nonce peut gravement compromettre la sécurité.

## À retenir

- AES = chiffrement symétrique ; SHA-256 = hachage ; Base64 = encodage.
- HMAC utilise un secret partagé ; une signature utilise une clé privée pour signer et une clé publique pour vérifier.
- Un certificat associe une identité à une clé publique.
- HTTPS est HTTP sur TLS ; ce n’est pas une garantie que le site est digne de confiance.
- Les mots de passe nécessitent un algorithme dédié, un sel et des paramètres adaptés.

[Version anglaise](02-cryptography.md)
