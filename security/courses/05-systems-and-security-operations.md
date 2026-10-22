> **Author:** Zouhour Bellamine

# 05 — Systems, Hardening, Logging, and Incident Response

## 1. Accounts and privileges
- Use individual accounts so actions can be attributed.
- Restrict administrative privileges and separate daily-use from privileged accounts where appropriate.
- Disable unused accounts and promptly revoke access when roles change.
- Protect service accounts and avoid interactive login where unnecessary.
- Require stronger controls for privileged and remote access.

Linux root has broad administrative power. The sudo mechanism lets authorized users run permitted commands with elevated privileges; it does not grant every user unrestricted access.

## 2. Linux permissions
Traditional Unix permissions use three classes: user/owner, group, and others.
- **r:** read.
- **w:** write.
- **x:** execute for a file; traversal/search for a directory.

Numeric values: read = 4, write = 2, execute = 1.

| Mode | Owner | Group | Others |
|---|---|---|---|
| 777 | rwx | rwx | rwx |
| 755 | rwx | r-x | r-x |
| 750 | rwx | r-x | --- |
| 640 | rw- | r-- | --- |
| 600 | rw- | --- | --- |

For mode **640**, the owner can read/write, the group can read, and others have no access. Avoid broad permissions on secrets, private keys, and configuration files.

## 3. System hardening
Hardening reduces attack surface and limits the consequences of compromise:
- Install security updates and track end-of-life software.
- Remove or disable unnecessary services and packages.
- Close unused ports and restrict management interfaces.
- Enforce least privilege and secure file permissions.
- Use secure remote administration.
- Configure host firewalls and endpoint protection.
- Protect physical access, boot, and firmware where appropriate.
- Enable useful logs and time synchronization.
- Protect backups and test restoration.
- Maintain baseline configurations and monitor drift.

## 4. Patch and vulnerability management
1. Inventory systems, software versions, and owners.
2. Identify weaknesses through advisories, scanners, and vendor information.
3. Assess severity, exploitability, exposure, and business impact.
4. Prioritize based on actual risk, not score alone.
5. Test and deploy patches within defined timelines.
6. Verify the fix and monitor for regressions.
7. Document exceptions, compensating controls, and remediation dates.

**CVSS** provides a standardized vulnerability severity score. It is an input to prioritization, not a complete risk decision. Exposure, active exploitation, and asset criticality also matter.

## 5. Logging and monitoring
Useful events include successful/failed authentication, privilege changes, administrative actions, access to sensitive resources, important record modifications, configuration changes, application errors, and security alerts.

Logs should have reliable timestamps, consistent fields, restricted access, defined retention, and protection against tampering. Clock synchronization helps correlate events across systems.

Do not log passwords, session tokens, private keys, or unnecessary sensitive data. Logs themselves may contain confidential information and must be protected.

## 6. SIEM, IOC, and forensic evidence
A **SIEM** collects and correlates events from endpoints, servers, identity systems, applications, and network controls.

- **IOC:** indicator of compromise, such as a suspicious file hash, domain, IP, or persistence artifact.
- **False positive:** benign activity incorrectly flagged.
- **False negative:** malicious activity not detected.
- **Digital forensics:** systematic collection and analysis of digital evidence.
- **Chain of custody:** documented handling and transfer of evidence to support its integrity and provenance.

An alert is not proof of compromise. Validate it, gather context, and document the investigation.

## 7. Incident response
A common lifecycle:
1. **Preparation:** define roles, contacts, procedures, tools, and recovery resources.
2. **Detection and analysis:** validate alerts, determine scope, and assess impact.
3. **Containment:** limit spread or harm, such as isolating a compromised endpoint.
4. **Eradication:** remove malicious artifacts and close the entry path.
5. **Recovery:** restore safely, validate integrity, and monitor for recurrence.
6. **Lessons learned:** document causes, gaps, and corrective actions.

The order varies by incident. Preserve useful evidence and coordinate before destructive actions that could erase traces. Limiting active harm remains a priority.

## 8. Endpoint hygiene
- Use suitable endpoint protection/EDR.
- Restrict software installation and risky scripting according to need.
- Encrypt portable devices and sensitive backups.
- Lock screens and secure physical access.
- Apply consistent secure configurations.
- Monitor privileged activity.
- Protect remote access with MFA and network restrictions.
- Encourage prompt reporting of suspicious activity.

## Quick recall
- Least privilege limits damage from compromised accounts.
- Mode 640 = owner read/write, group read, others none.
- Hardening reduces attack surface; patch management addresses known weaknesses.
- SIEM correlates events; EDR focuses on endpoint detection and response.
- Incident response includes preparation, detection, containment, eradication, recovery, and lessons learned.
