# 04 — Threats and Application Security

## 1. Social engineering and phishing
**Social engineering** manipulates people through trust, urgency, fear, authority, or curiosity. **Phishing** uses deceptive messages or sites to obtain secrets, install malware, or trigger unsafe actions.

- **Spear phishing:** targeted attack.
- **Whaling:** targets senior leaders or other high-value individuals.
- **Smishing:** SMS phishing.
- **Vishing:** voice-call phishing.
- **BEC:** compromise or impersonation of business email to redirect payments or obtain information.

Defenses include awareness training, independent verification of unusual requests, phishing-resistant MFA, email filtering, domain protections, and procedures for payment or account changes.

## 2. Malware categories

| Type | Typical behavior |
|---|---|
| Virus | Attaches to a file/program and spreads when the host is executed |
| Worm | Spreads autonomously, often over networks |
| Trojan | Appears legitimate but carries malicious functionality |
| Ransomware | Encrypts or blocks data to extort victims |
| Spyware | Secretly collects information |
| Keylogger | Captures keystrokes |
| Rootkit | Hides malicious activity or maintains privileged access |
| Botnet | Collection of compromised devices controlled by an operator |
| Adware | Displays advertising; some variants are intrusive or malicious |

These terms are not interchangeable; malware can combine behaviors.

### Ransomware prevention and response
An incident may begin with phishing, exposed remote access, stolen credentials, or an unpatched weakness. Attackers may move laterally, steal data, and then encrypt systems.

Controls include MFA, patching, least privilege, endpoint protection, segmentation, email security, and offline or immutable backups. Test restoration regularly.

During an incident, follow response procedures, isolate affected systems where appropriate, preserve evidence, determine scope and entry path, protect backups, remove persistence, remediate compromised credentials, and restore from known-good sources. Paying a ransom does not guarantee recovery or deletion of stolen data.

## 3. Web application vulnerabilities

### SQL injection
Occurs when untrusted input is interpreted as SQL syntax. The primary defense is **parameterized queries/prepared statements**, which separate SQL instructions from supplied values. Also apply least privilege to database accounts, validate against business rules, and avoid leaking database errors. Input filtering alone is not a replacement for parameterization.

### Cross-Site Scripting (XSS)
Attacker-controlled script or active content executes in a victim's browser in the context of a vulnerable site.
- **Stored XSS:** malicious content is stored and later rendered.
- **Reflected XSS:** request content is reflected in a response.
- **DOM-based XSS:** client-side code processes untrusted data unsafely.

Defenses include context-aware output encoding, safe DOM APIs, careful sanitization of permitted HTML, and CSP as an additional layer.

### Cross-Site Request Forgery (CSRF)
Tricks a browser with an authenticated session into submitting an unwanted request. Defenses include anti-CSRF tokens, appropriate SameSite cookie settings, origin checks, and suitable protections for sensitive actions.

**Difference:** XSS executes attacker-controlled content in a site's browser context; CSRF abuses the browser's existing authentication context to trigger an unwanted request.

### Broken object-level authorization (BOLA / IDOR)
A user changes an object identifier in a URL or API request and accesses another person's record because the server does not check authorization for that specific object. Check permissions for every requested resource and action. Hard-to-guess identifiers do not replace authorization.

### Other weaknesses
- Broken authentication or session management.
- Security misconfiguration and default credentials.
- Vulnerable or outdated dependencies.
- Unsafe file uploads.
- Path traversal to files outside the intended directory.
- SSRF: tricks a server into making requests to unintended destinations.
- Unsafe deserialization.
- Excessive data exposure or overly broad API permissions.
- Missing rate limits and weak abuse controls.

## 4. API security
A secure API should implement:
- Authentication suitable for the client and use case.
- Function-level and object-level authorization.
- Input validation and safe output handling.
- TLS and secure secret storage.
- Rate limits and abuse detection.
- Minimal data responses.
- Error messages that do not expose secrets or internal stack traces.
- Secure session/token handling and expiration.
- Dependency updates, logging, monitoring, and version management.

A **JWT may be signed but not encrypted**; its payload is often readable by anyone holding the token. A signature detects certain modifications but does not provide confidentiality. Validate signature, algorithm, issuer, audience, expiration, and relevant claims. Authorization must still be enforced.

## 5. Secure software development
Integrate security through the software development life cycle:
1. Requirements: identify sensitive data, users, trust boundaries, and objectives.
2. Design: model threats and define authorization rules.
3. Implementation: use secure libraries and coding patterns.
4. Testing: verify permissions, input handling, and dependencies.
5. Deployment: protect secrets and harden configuration.
6. Maintenance: patch, monitor, respond, and retire obsolete components.

Testing approaches:
- **SAST:** static analysis without running the application.
- **DAST:** tests a running application.
- **SCA:** examines third-party components, known vulnerabilities, and sometimes license risks.
- **Penetration test:** authorized, scoped simulation of attack techniques.

No single tool proves that a system is completely secure.

## 6. Secrets management
Do not commit API keys, database passwords, signing keys, or tokens to source control. Use protected deployment configuration or a secrets manager, restrict access, rotate exposed credentials, avoid logging secrets, and separate development/test/production environments. Environment variables are useful but are not automatically a secure vault.

## Quick recall
- Parameterized SQL queries defend against SQL injection.
- XSS = attacker-controlled content executes in browser context; CSRF = unwanted request using an existing session.
- BOLA/IDOR = missing authorization for a specific object.
- A signed JWT is not necessarily encrypted.
- Secure development includes design, testing, deployment controls, and maintenance.
