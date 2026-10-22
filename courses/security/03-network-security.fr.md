> **Auteur :** Zouhour Bellamine

# 03 — Sécurité des réseaux

## 1. Contrôles de sécurité réseau

Un **pare-feu (firewall)** applique des règles de trafic à partir des adresses, ports, protocoles, états de connexion ou informations applicatives.

- **Filtrage sans état (stateless) :** évalue chaque paquet indépendamment.
- **Filtrage avec état (stateful) :** suit l’état des connexions.
- **WAF (pare-feu applicatif Web) :** se concentre sur HTTP(S) et atténue certaines attaques visant les applications Web.

Un **IDS** (système de détection d’intrusion) surveille l’activité et génère des alertes. Un **IPS** (système de prévention d’intrusion) peut bloquer le trafic suspect, souvent lorsqu’il est placé en ligne sur le chemin du trafic. La détection peut utiliser des signatures, l’analyse des anomalies ou l’analyse des protocoles. Des faux positifs et des faux négatifs sont possibles.

| Outil | Objectif principal |
|---|---|
| Antivirus | Détecter et traiter les logiciels malveillants |
| EDR | Surveiller les terminaux, enquêter et répondre aux incidents |
| Proxy | Intermédiaire pour les requêtes client/serveur |
| VPN | Tunnel protégé entre terminaux ou réseaux |
| SIEM | Collecter et corréler les événements de sécurité |
| WAF | Appliquer des contrôles au trafic des applications Web |

Le **NAT** traduit les adresses ; le pare-feu applique une politique de trafic. Un équipement peut faire les deux, mais le NAT seul ne constitue pas un pare-feu complet.

## 2. Segmentation, VLAN et DMZ

La **segmentation réseau** sépare les systèmes en zones et limite les déplacements latéraux d’un attaquant. Un **VLAN** fournit une séparation logique au niveau 2, mais ne constitue pas à lui seul une frontière de sécurité complète sans routage adapté, règles de pare-feu et configuration correcte des commutateurs.

Une **DMZ** est une zone contrôlée séparément, destinée aux services exposés, par exemple un serveur Web public. La compromission d’un serveur public ne doit pas donner automatiquement accès aux serveurs applicatifs internes ou aux bases de données.

Les zones peuvent inclure les services publics, serveurs applicatifs, bases de données, postes utilisateurs, systèmes d’administration privilégiée et infrastructures de sauvegarde. N’autoriser que les flux nécessaires entre ces zones.

## 3. VPN et Wi-Fi

Un VPN protège le trafic au moyen d’un tunnel jusqu’au point de terminaison du VPN. Il ne protège pas un terminal compromis et ne rend pas toutes les destinations fiables. Après le point de terminaison VPN, le trafic reste soumis aux autres réseaux et contrôles.

Pour le Wi-Fi, utiliser WPA2-AES ou WPA3, des identifiants forts et uniques, des micrologiciels à jour et un réseau invité séparé. Des points d’accès pirates ou des réseaux « evil twin » peuvent inciter les clients à se connecter à une infrastructure contrôlée par un attaquant.

## 4. Ports courants

| Service | Port courant | Remarque |
|---|---:|---|
| HTTP | TCP 80 | Web sans TLS |
| HTTPS | TCP 443 | Transport HTTPS courant ; HTTP/3 utilise QUIC sur UDP |
| SSH | TCP 22 | Administration distante sécurisée |
| Telnet | TCP 23 | Terminal distant en clair |
| Contrôle FTP | TCP 21 | FTP classique n’est pas chiffré par défaut |
| DNS | UDP/TCP 53 | Résolution de noms |
| Relais SMTP | TCP 25 | Transfert de courriels entre serveurs |
| Submission | TCP 587 | Soumission de courriels, souvent avec STARTTLS |
| IMAP | TCP 143 | Accès aux boîtes mail ; STARTTLS possible |
| IMAPS | TCP 993 | IMAP sur TLS |
| POP3 | TCP 110 | Récupération de courriels ; STARTTLS possible |
| POP3S | TCP 995 | POP3 sur TLS |
| DHCPv4 | UDP 67/68 | Configuration IPv4 dynamique |
| NTP | UDP 123 | Synchronisation de l’heure |
| SNMP | UDP 161/162 | Supervision et notifications |
| LDAP | TCP/UDP 389 | Accès à un annuaire, selon le déploiement |
| LDAPS | TCP 636 | LDAP sur TLS |
| RDP | TCP/UDP 3389 | Bureau à distance, selon la configuration |

Les ports indiqués sont des valeurs par défaut ; ils ne prouvent ni la présence d’un service ni sa sécurité. Restreindre les protocoles d’administration à des chemins administratifs de confiance.

## 5. Attaques réseau

- **MITM (homme du milieu) :** l’attaquant intercepte ou relaie les communications et peut observer ou modifier le trafic. Les protections comprennent TLS correctement validé et une configuration réseau sécurisée.
- **Usurpation IP :** falsification de l’adresse IP source.
- **Usurpation ARP :** envoi de fausses informations ARP sur un réseau IPv4 local pour rediriger le trafic.
- **Usurpation/empoisonnement DNS :** manipulation des réponses DNS ou des caches.
- **Usurpation d’e-mail :** falsification des informations de l’expéditeur.
- **DoS :** tentative d’épuisement des ressources pour rendre un service indisponible.
- **DDoS :** déni de service distribué depuis de nombreux systèmes ou sources.
- **Serveur DHCP pirate :** fournit des paramètres réseau malveillants, comme une passerelle ou un serveur DNS.

Les protections contre les DDoS peuvent comprendre la protection en amont, le filtrage, la limitation du débit, la mise en cache, la répartition de charge, la planification de capacité et la coordination avec les fournisseurs. Un pare-feu seul ne résout pas tous les problèmes de capacité au niveau applicatif.

## 6. Principes de défense réseau

- N’exposer que les services nécessaires.
- Séparer les réseaux publics, utilisateurs, applications, bases de données et administration.
- Restreindre le trafic entrant et sortant.
- Préférer SSH à Telnet et des protocoles de transfert sécurisés au FTP classique.
- Surveiller les flux réseau et les événements de sécurité.
- Mettre à jour les équipements réseau et supprimer les identifiants par défaut.
- Protéger les interfaces DNS, DHCP et d’administration réseau.
- Ne pas considérer une adresse IP ou une connexion TCP réussie comme une preuve d’identité.
- Utiliser TLS pour les données applicatives sensibles, y compris entre systèmes internes lorsque cela est approprié.

## À retenir

- Pare-feu = appliquer une politique de trafic ; IDS = détecter et alerter ; IPS = détecter et éventuellement bloquer.
- La DMZ isole les services exposés ; la segmentation limite les déplacements latéraux.
- NAT n’est pas synonyme de filtrage par pare-feu.
- DoS/DDoS visent principalement la disponibilité.
- SSH 22 ; Telnet 23 ; HTTP 80 ; HTTPS 443 ; DNS 53 en UDP/TCP.

[Version anglaise](03-network-security.md)
