> **Author:** Zouhour Bellamine

# 01 — Security Fundamentals

## 1. The CIA triad

### Confidentiality
Information is disclosed only to authorized people, services, or systems. Controls include authentication, authorization, encryption, data classification, and least privilege.

### Integrity
Information remains accurate and complete and is protected against unauthorized modification or destruction. Controls include access restrictions, database constraints, transactions, audit logs, hashes in a trusted verification process, MACs, and digital signatures.

### Availability
Information and services are usable by authorized users when required. Controls include redundancy, tested backups, monitoring, capacity planning, failover, disaster recovery, and DDoS protection.

| Scenario | Main property |
|---|---|
| An unauthorized person reads a confidential record | Confidentiality |
| A record is changed without permission | Integrity |
| An attack makes a service inaccessible | Availability |

One incident can affect several properties. Ransomware can affect availability by encrypting files and confidentiality if data is also stolen.

## 2. Other security properties
- **Authenticity:** confidence that an identity, message, or object is genuine.
- **Accountability:** actions can be attributed to a user, service, or process.
- **Traceability/auditability:** actions can be reconstructed from reliable records.
- **Non-repudiation:** evidence supports the origin or occurrence of an action; strength depends on identity proofing, key custody, procedures, and applicable law.
- **Resilience:** ability to withstand disruption and recover essential functions.

Logs support traceability, but are weak evidence if privileged users can silently alter them. Central collection, restricted access, reliable timestamps, and integrity controls improve trustworthiness.

## 3. Identification, authentication, authorization, auditing
1. **Identification:** “Who are you claiming to be?” Example: entering an account name.
2. **Authentication:** “Can you prove it?” Example: validating a password or security key.
3. **Authorization:** “What may you do?” Example: allowing reads but denying deletion.
4. **Auditing:** “What happened?” Example: recording actor, time, resource, action, and outcome.

Authentication does not automatically grant unrestricted access. Authorization must be checked for the requested resource and action, on the server side.

## 4. Authentication factors

| Factor | Meaning | Examples |
|---|---|---|
| Knowledge | Something known | Password, PIN |
| Possession | Something held | Hardware key, smart card |
| Inherence | Something about the person | Fingerprint, face characteristic |

MFA uses at least two different factor categories. Password plus PIN normally remains one category. A password plus hardware security key combines knowledge and possession. Phishing-resistant methods such as properly deployed FIDO2/WebAuthn keys or passkeys provide stronger protection against credential phishing than passwords and many one-time codes.

Credential attacks:
- **Brute force:** tries many possible passwords.
- **Dictionary attack:** tries likely passwords from a list.
- **Credential stuffing:** reuses stolen username/password pairs on other services.
- **Password spraying:** tries a small set of common passwords across many accounts.
- **Session hijacking:** steals or abuses a valid session token.
- **Impersonation:** pretends to be a legitimate person or service.

Defenses include MFA, unique passwords, password managers, rate limiting, breached-password checks, anomaly detection, and secure session handling.

## 5. Access-control models

| Model | Principle | Example |
|---|---|---|
| DAC — Discretionary Access Control | Owner can generally grant access | File owner shares read access |
| MAC — Mandatory Access Control | Central policy enforces labels/classification | Classified record requires clearance |
| RBAC — Role-Based Access Control | Permissions are assigned to roles | Editor role can update records |
| ABAC — Attribute-Based Access Control | Policy evaluates subject, object, action, and context attributes | Access depends on department and record sensitivity |

RBAC means **Role-Based**, not Rule-Based, Access Control.

### Core principles
- **Least privilege:** only permissions necessary, for only as long as necessary.
- **Need to know:** access depends on legitimate work requirements.
- **Separation of duties:** divide sensitive actions so one person cannot complete and approve every stage.
- **Default deny:** deny unless a valid rule permits access.
- **Periodic review:** remove obsolete permissions.
- **Server-side enforcement:** hiding a user-interface button is not a security boundary.

## 6. Threat, vulnerability, exploit, risk, incident

| Term | Definition | Example |
|---|---|---|
| Threat | Potential cause of harm | Attacker seeks to steal records |
| Vulnerability | Weakness that could be exploited | Unpatched server |
| Exploit | Method that uses a weakness | Crafted request triggers a flaw |
| Risk | Potential likelihood and impact of harm | Data may be exposed through the server |
| Incident | Event compromising or threatening security | Unauthorized access is confirmed |
| Control | Measure reducing risk | Patch, MFA, monitoring |

A simplified model is **Risk ≈ Likelihood × Impact**. Real assessments also consider exposure, exploitability, asset criticality, controls, and uncertainty.

## 7. Defense in depth and Zero Trust
**Defense in depth** combines complementary layers: MFA, access control, TLS, segmentation, secure coding, patching, monitoring, and tested backups.

**Zero Trust** rejects automatic trust based only on network location. It emphasizes explicit verification, least privilege, and ongoing evaluation. An internal-network user should not automatically access every system.

## Quick recall
- Confidentiality = prevent disclosure; integrity = prevent/detect unauthorized changes; availability = keep services accessible.
- Authentication verifies identity; authorization decides permitted actions.
- RBAC uses roles; ABAC evaluates attributes.
- A vulnerability is a weakness; an exploit uses it.
- Least privilege limits damage from a compromised account.
