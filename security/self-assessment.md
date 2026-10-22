# Cybersecurity — Self-Assessment

Answer each question before reading the key. Focus on why the correct option differs from the distractors.

## Questions

1. An unauthorized user changes the recorded area of a property. Which property is directly compromised?  
   A. Confidentiality · B. Integrity · C. Availability · D. Authentication

2. A password is accepted, but the user cannot open a record outside their responsibilities. Which control decided this?  
   A. Identification · B. Authentication · C. Authorization · D. Hashing

3. Which combination uses two different factor categories?  
   A. Password + PIN · B. Two passwords · C. Password + hardware security key · D. Username + password

4. Permissions are assigned to Reader, Editor, and Administrator roles. Which model?  
   A. DAC · B. MAC · C. RBAC · D. ABAC

5. Which statement describes symmetric encryption?  
   A. Always uses a public/private pair · B. Uses a shared secret key · C. Is the same as hashing · D. Cannot protect files

6. What is true about SHA-256?  
   A. Symmetric encryption · B. Encoding · C. Produces a 256-bit digest · D. Decrypts with a private key

7. What is appropriate for password storage?  
   A. Plaintext · B. Base64 · C. Fast SHA-256 without salt · D. Argon2id with a unique salt

8. What is a primary purpose of a digital signature?  
   A. Guarantee secrecy · B. Support integrity and authentication of the signing key · C. Compress a file · D. Replace authorization

9. What does HTTPS provide when correctly configured and validated?  
   A. Proof the website owner is honest · B. TLS protection for the communication channel · C. Protection against all malware · D. Proof the device is safe

10. Which tool primarily detects suspicious network activity and alerts operators?  
    A. IDS · B. IPS · C. Backup server · D. Load balancer

11. Many compromised machines overwhelm a public service. This is:  
    A. SQL injection · B. DDoS · C. Hashing · D. Data minimization

12. Primary defense against SQL injection?  
    A. Hide a button · B. Parameterized queries · C. Base64-encode a password · D. Client-side validation only

13. A user changes an API record ID and sees another user's record because server permissions are not checked. This is:  
    A. BOLA/IDOR · B. Strong authentication · C. Encryption at rest · D. Rate limiting

14. An incremental backup contains:  
    A. All data every time · B. Changes since the most recent backup · C. Changes since the last full only · D. The same thing as replication

15. Which metric is the target time to restore a service?  
    A. RPO · B. RTO · C. SHA · D. CVSS

16. What does Unix permission mode 640 mean?  
    A. Everyone can read/write · B. Owner read/write, group read, others none · C. Owner execute only · D. Owner has no permissions

17. Which system collects and correlates security events from multiple sources?  
    A. SIEM · B. Base64 · C. DHCP · D. Compiler

18. An unpatched software weakness is a:  
    A. Threat · B. Vulnerability · C. Recovery objective · D. Signature

19. A workstation is actively communicating with suspected command-and-control infrastructure. What may limit spread?  
    A. Publish credentials · B. Ignore the alert · C. Isolate it according to incident procedures · D. Delete all logs

20. Why place a public-facing server in a DMZ?  
    A. It can never be compromised · B. To isolate exposure and restrict access to internal systems · C. To replace authentication · D. To expose the database

## Answer key

1. **B — Integrity.** The record changed without authorization.
2. **C — Authorization.** Authentication verifies identity; authorization decides permitted resources/actions.
3. **C — Password and hardware key.** Knowledge plus possession.
4. **C — RBAC.** Permissions are associated with roles.
5. **B — Shared secret key.** Symmetric encryption requires secure key handling.
6. **C — 256-bit digest.** SHA-256 is a hash, not encryption.
7. **D — Password hashing with salt.** Use a suitable password-hashing algorithm and parameters.
8. **B — Integrity and key-based authenticity.** A signature does not automatically encrypt a document.
9. **B — TLS-protected channel.** HTTPS does not prove the site is honest or harmless.
10. **A — IDS.** An IPS can be configured to block; IDS is primarily detection and alerting.
11. **B — DDoS.** Distributed attack primarily targeting availability.
12. **B — Parameterized queries.** They separate SQL instructions from user values.
13. **A — BOLA/IDOR.** The server fails to authorize access to the specific object.
14. **B — Changes since the most recent backup.** Restoration usually needs the full backup and required increments.
15. **B — RTO.** RPO concerns the tolerable data-loss window.
16. **B — Owner rw-, group r--, others ---.** The digits are 6 = 4+2, 4 = 4, and 0 = none.
17. **A — SIEM.** It aggregates and correlates events.
18. **B — Vulnerability.** A threat may exploit a vulnerability; an exploit is the technique.
19. **C — Isolate the workstation.** Follow the response plan and preserve evidence.
20. **B — Isolation and restricted flows.** A DMZ reduces exposure but does not guarantee immunity.

## Review method
- Re-answer missed questions without looking at the key.
- Explain the difference between the correct answer and the closest distractor.
- For each threat, identify the target property, entry path, impact, and preventive/detective controls.
- Revisit the relevant module before repeating the quiz.
