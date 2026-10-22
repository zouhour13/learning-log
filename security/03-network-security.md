# 03 — Network Security

## 1. Network security controls

**Firewall:** enforces traffic rules using addresses, ports, protocols, connection state, or application information.
- **Stateless filtering:** evaluates packets independently.
- **Stateful filtering:** tracks connection state.
- **WAF:** focuses on HTTP(S) and mitigates some web-application attacks.

**IDS:** Intrusion Detection System; monitors activity and raises alerts.
**IPS:** Intrusion Prevention System; can block suspicious traffic, commonly inline.
Detection may use signatures, anomaly detection, or protocol analysis. False positives and false negatives are possible.

Related tools:
| Tool | Main purpose |
|---|---|
| Antivirus | Detect and remediate malware |
| EDR | Endpoint monitoring, investigation, and response |
| Proxy | Intermediary for client/server requests |
| VPN | Protected tunnel between endpoints or networks |
| SIEM | Collect and correlate security events |
| WAF | Apply controls to web application traffic |

NAT translates addresses; a firewall enforces traffic policy. A device may perform both, but NAT alone is not a complete firewall.

## 2. Segmentation, VLANs, and DMZ
**Network segmentation** separates systems into zones and limits lateral movement. A **VLAN** provides logical Layer 2 separation, but is not a complete security boundary without appropriate routing, firewall rules, and switch configuration.

A **DMZ** is a separately controlled zone for exposed services, such as a public web server. A compromised public server should not automatically provide access to internal application servers or databases.

Possible zones include public services, application servers, databases, user workstations, privileged administration systems, and backup infrastructure. Allow only required flows between zones.

## 3. VPN and Wi-Fi
A VPN protects traffic through a tunnel to the VPN endpoint. It does not protect a compromised endpoint or make every destination trustworthy. Traffic after the VPN endpoint remains subject to other networks and controls.

For Wi-Fi, use WPA2-AES or WPA3, strong unique credentials, firmware updates, and a separate guest network. Rogue access points and evil-twin networks may trick clients into connecting to attacker-controlled infrastructure.

## 4. Common ports

| Service | Common port | Note |
|---|---:|---|
| HTTP | TCP 80 | Web without TLS |
| HTTPS | TCP 443 | Common HTTPS transport; HTTP/3 uses QUIC over UDP |
| SSH | TCP 22 | Secure remote administration |
| Telnet | TCP 23 | Plaintext remote terminal |
| FTP control | TCP 21 | Classic FTP is not encrypted by default |
| DNS | UDP/TCP 53 | Name resolution |
| SMTP relay | TCP 25 | Mail transfer between servers |
| Submission | TCP 587 | Client mail submission, commonly STARTTLS |
| IMAP | TCP 143 | Mailbox access; STARTTLS may be used |
| IMAPS | TCP 993 | IMAP over TLS |
| POP3 | TCP 110 | Mail retrieval; STARTTLS may be used |
| POP3S | TCP 995 | POP3 over TLS |
| DHCPv4 | UDP 67/68 | Dynamic IPv4 configuration |
| NTP | UDP 123 | Time synchronization |
| SNMP | UDP 161/162 | Monitoring and notifications |
| LDAP | TCP/UDP 389 | Directory access; deployment-dependent |
| LDAPS | TCP 636 | LDAP over TLS |
| RDP | TCP/UDP 3389 | Remote desktop, configuration-dependent |

Ports are defaults, not proof a service is present or secure. Restrict management protocols to trusted administrative paths.

## 5. Network attacks

- **MITM:** attacker intercepts or relays communication and may observe or alter traffic. Mitigations include correctly validated TLS and secure network configuration.
- **IP spoofing:** falsifies source IP information.
- **ARP spoofing:** sends forged ARP information on a local IPv4 network to redirect traffic.
- **DNS spoofing/poisoning:** manipulates DNS answers or caches.
- **Email spoofing:** falsifies sender information.
- **DoS:** attempts to exhaust resources and make a service unavailable.
- **DDoS:** distributed denial of service using many systems or sources.
- **Rogue DHCP:** supplies malicious network settings, such as gateway or DNS information.

DDoS mitigations may include upstream protection, filtering, rate limiting, caching, load balancing, capacity planning, and coordination with providers. A firewall alone will not solve every application-layer capacity problem.

## 6. Network defense principles
- Expose only required services.
- Separate public, user, application, database, and management networks.
- Restrict inbound and outbound traffic.
- Prefer SSH over Telnet and secure transfer protocols over classic FTP.
- Monitor network flows and security events.
- Patch network equipment and remove default credentials.
- Protect DNS, DHCP, and network-management interfaces.
- Do not treat an IP address or successful TCP connection as proof of user identity.
- Use TLS for sensitive application traffic, including internal traffic where appropriate.

## Quick recall
- Firewall = enforce traffic policy; IDS = detect and alert; IPS = detect and potentially block.
- DMZ isolates exposed services; segmentation limits lateral movement.
- NAT is not synonymous with firewalling.
- DoS/DDoS primarily targets availability.
- SSH 22; Telnet 23; HTTP 80; HTTPS 443; DNS 53 UDP/TCP.
