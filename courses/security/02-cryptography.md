> **Author:** Zouhour Bellamine

# 02 — Cryptography, Hashing, Digital Signatures, and TLS

## 1. Vocabulary
- **Plaintext:** original readable data.
- **Ciphertext:** output of encryption.
- **Encryption:** transforms plaintext to ciphertext to protect confidentiality.
- **Decryption:** recovers plaintext using the appropriate key.
- **Key:** value controlling a cryptographic operation.

Use established, reviewed algorithms. Security should not depend on keeping the algorithm secret.

## 2. Symmetric and asymmetric cryptography

**Symmetric encryption** uses a shared secret key for encryption and decryption. It is efficient for large data volumes. Examples: AES and ChaCha20.

**Asymmetric cryptography** uses a related public/private key pair. The public key may be shared; the private key must be protected. It supports digital signatures and key-establishment mechanisms, and certain schemes support encryption.

Modern protocols often combine both: asymmetric techniques authenticate parties or establish session keys; symmetric authenticated encryption then protects application data efficiently.

A public key must be authenticated. Otherwise an attacker may substitute their own key.

## 3. Encryption vs hashing vs encoding

| Property | Encryption | Hash | Encoding |
|---|---|---|---|
| Purpose | Confidentiality | Fixed-size digest | Data representation |
| Key | Yes for key-based encryption | Not for ordinary hash | Usually none |
| Intended inverse | Yes, with correct key | No | Usually yes |
| Example | AES | SHA-256 | Base64 |

**Base64 is not encryption.** It offers no confidentiality.

## 4. Cryptographic hash functions
A hash maps arbitrary-length input to a fixed-length digest. Examples include SHA-256, SHA-512, and SHA-3.

- **Preimage resistance:** given a digest, it should be infeasible to find an input producing it.
- **Second-preimage resistance:** given one input, it should be infeasible to find a different input with the same digest.
- **Collision resistance:** it should be infeasible to find any two different inputs with the same digest.

Collisions must exist in principle for arbitrary-length inputs mapped to a finite space. Security means finding them is computationally impractical.

A plain hash detects changes only if the expected digest is trusted. An attacker who can replace both file and digest may evade detection. Use a keyed MAC or digital signature when authenticity is required.

## 5. Password storage
Never store passwords in plaintext or use a fast general-purpose hash such as plain SHA-256 as a password-storage scheme.

Use a dedicated password-hashing algorithm:
- **Argon2id:** modern, memory-hard choice.
- **scrypt:** memory-hard password-based derivation.
- **bcrypt:** established password-hashing algorithm.
- **PBKDF2:** iteration-based derivation used in various systems and standards.

A **salt** is a unique random value stored with each password hash. It prevents identical passwords from automatically producing identical hashes and reduces the value of precomputed tables. A salt is not secret.

A **pepper** is an additional secret stored separately from the password database. Protect it as a secret. Use established libraries and suitable parameters; do not invent a custom scheme.

## 6. HMAC and digital signatures
**HMAC** combines a hash function with a shared secret key. It can verify message integrity and authenticity to parties that know the key. It does not provide the same non-repudiation properties as a public-key signature.

A **digital signature** is created with a private signing key and verified with the corresponding public key. It supports integrity verification and ties the signature to the key. Attribution and non-repudiation also depend on identity verification, key custody, process, and legal context.

A signature does **not** automatically encrypt the document.

## 7. Certificates and PKI
A digital certificate binds an identity or identifier, such as a DNS name, to a public key. X.509 certificates commonly include subject, issuer, public key, validity period, serial number, usages, and issuer signature.

**PKI (Public Key Infrastructure)** supports issuing, validating, managing, and revoking certificates.
- **CA:** Certification Authority, issues or signs certificates.
- **RA:** Registration Authority, checks identity or requests.
- **CRL:** Certificate Revocation List.
- **OCSP:** protocol for checking certificate status.

Validation includes checking trust chain, validity dates, hostname, intended usage, and revocation status where applicable. A certificate is not a private key.

## 8. TLS and HTTPS
HTTP by itself does not provide transport encryption. HTTPS is HTTP carried over TLS.

TLS can provide confidentiality, integrity, and server authentication; client authentication is also possible. Certificates help establish trust in a server's public key. Key establishment creates session keys; symmetric authenticated encryption protects application traffic.

HTTPS does not prove a website is honest or harmless. A malicious website can have a valid certificate. Do not casually bypass certificate warnings: they may indicate expiration, hostname mismatch, untrusted issuer, misconfiguration, or possible interception.

## 9. Algorithms to recognize

| Algorithm | Category | Key point |
|---|---|---|
| AES | Symmetric encryption | Widely used modern cipher |
| ChaCha20 | Symmetric encryption | Modern stream cipher |
| AES-GCM | Authenticated encryption | Confidentiality and integrity when correctly used |
| RSA | Public-key cryptography | Signatures and suitable encryption schemes |
| ECC | Public-key cryptography | Family of elliptic-curve techniques |
| SHA-256 | Hash | 256-bit digest, SHA-2 family |
| SHA-3 | Hash family | Design distinct from SHA-2 |
| HMAC | Message authentication | Hash-based MAC with shared secret |
| Argon2id | Password hashing | Memory-hard |
| MD5 | Hash | Unsuitable where collision resistance is required |
| SHA-1 | Hash | Unsuitable for collision-resistant signatures |
| DES | Symmetric encryption | Obsolete, 56-bit effective key |
| 3DES | Symmetric encryption | Legacy and deprecated/retired in modern use |

## 10. Key management
- Generate keys using cryptographically secure randomness.
- Restrict access to private keys and data-encryption keys.
- Store secrets in an appropriate secrets manager or hardware-backed protection where warranted.
- Define rotation, revocation, recovery, backup, and destruction.
- Keep secrets out of source control, public repositories, logs, and client-side code.
- Use established protocols and libraries.

Authenticated encryption such as AES-GCM requires correct nonce handling. Reusing a nonce incorrectly can seriously compromise security.

## Quick recall
- AES = symmetric encryption; SHA-256 = hash; Base64 = encoding.
- HMAC uses a shared secret; signatures use private signing and public verification keys.
- A certificate binds an identity to a public key.
- HTTPS is HTTP over TLS, not a guarantee of website trustworthiness.
- Passwords need dedicated password hashing, salts, and suitable work factors.
