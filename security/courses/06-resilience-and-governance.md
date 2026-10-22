> **Author:** Zouhour Bellamine

# 06 — Resilience, Backup, Privacy, and Governance

## 1. Backup types

| Type | Contents | Restoration |
|---|---|---|
| Full | All selected data at backup time | Simple restore path; usually more storage/time |
| Incremental | Changes since the most recent backup | Requires full backup plus the required increment chain |
| Differential | Changes since the last full backup | Requires full backup plus latest differential |

A backup is useful only if recoverable. Verify completion, protect credentials, test restoration, and document recovery steps. Replication is not a substitute for backup: corruption and deletion may replicate too.

## 2. The 3-2-1 rule
A common guideline:
- Maintain **3 copies** of important data.
- Use **2 different storage types/media**.
- Keep **1 copy off-site**.

For stronger ransomware resilience, consider offline or immutable copies, isolated backup administration, separate credentials, monitoring of deletion attempts, and restoration exercises.

## 3. RPO and RTO
**RPO — Recovery Point Objective:** maximum tolerable data-loss window, expressed as time. An RPO of four hours means the design aims to limit lost changes to approximately the latest four hours under the defined scenario.

**RTO — Recovery Time Objective:** target maximum time to restore a service. An RTO of two hours means the service has a two-hour recovery target.

Memory aid:
- RPO = how much recent data can be lost?
- RTO = how long can the service be unavailable?

These are objectives, not guarantees. They require suitable architecture, staff, backups, infrastructure, and tested procedures.

## 4. Business continuity and disaster recovery
- **BCP / PCA:** keeps critical activities operating during disruption, potentially through workarounds or degraded operation.
- **DRP / PRA:** restores technology services, infrastructure, applications, and data after a major interruption.

Continuity focuses on sustaining essential activities; disaster recovery focuses on restoring IT capabilities. Plans should be coordinated and tested.

Related terms:
- **Redundancy:** duplicate components/capacity to reduce single points of failure.
- **Failover:** switching to a standby component or site.
- **High availability:** design intended to minimize service interruption.
- **Business impact analysis:** identifies critical activities and consequences of interruption.

## 5. Recovery planning
Plans should specify critical services and dependencies, owners and contacts, backup locations, restoration order, identity/network/application dependencies, communications, validation criteria, recovery objectives, and test results.

Run exercises and record gaps. An untested plan may not reflect real recovery times or dependencies.

## 6. Physical security
Controls include restricted access to server rooms and network cabinets, visitor registration, protection against theft and unauthorized removable media, secure drive and paper disposal, UPS where appropriate, environmental monitoring, fire/water protection, screen locks, and clean-desk practices.

## 7. Organizational security
Security requires people, processes, and technology. Useful controls include:
- Information-security policies and acceptable-use rules.
- Asset and data inventories.
- Data classification and handling requirements.
- Joiner/mover/leaver processes for accounts.
- Awareness training and phishing reporting.
- Vendor and third-party risk management.
- Change management and configuration baselines.
- Periodic access reviews and audits.
- Incident response, continuity, and recovery plans.

## 8. Privacy and data protection
- **Purpose limitation:** use data for defined, authorized purposes.
- **Data minimization:** collect and expose only what is necessary.
- **Storage limitation:** retain data only as long as justified and permitted.
- **Access control:** restrict access according to role and need.
- **Accountability:** document relevant decisions and processing.
- **Privacy by design:** include privacy controls from system design.
- **Security safeguards:** protect against loss, disclosure, alteration, and unauthorized access.

Pseudonymized data may still be personal data if re-identification remains possible. Encryption reduces risk but does not replace lawful processing, access governance, retention rules, or secure operations. Specific legal duties depend on jurisdiction and current legislation.

## 9. Applying the concepts to an information system
For a system containing sensitive administrative records:
- Classify data and define permitted purposes.
- Require individual identities and strong authentication.
- Authorize each operation at the resource level.
- Protect data in transit and at rest where appropriate.
- Log sensitive access and changes without logging secrets.
- Segment public services from application and database tiers.
- Maintain protected, tested backups.
- Define incident escalation and restoration procedures.
- Review permissions and revoke obsolete access.
- Test both security controls and operational recovery.

## Quick recall
- Full = all selected data; incremental = changes since last backup; differential = changes since last full.
- RPO concerns tolerable data loss; RTO concerns restoration time.
- PCA/BCP sustains essential operations; PRA/DRP restores IT services.
- Replication improves availability but does not replace protected backups.
- Privacy, physical security, people, and procedures are part of cybersecurity.
