# Sorsogon Province Transparency Portal

Independent civic initiative, not an official provincial government service.

## Scope
The intended coverage is Sorsogon Province, including Sorsogon City, municipalities, and barangays where the originating dataset supplies geographic detail.

## Data integrity
- Do not claim complete project coverage without source verification.
- Never infer a barangay from an absent field.
- Display unknown locations as "Location not specified".
- Keep source date, original project identifiers, and provenance.
- Verify live project counts and implementing-office identifiers against authoritative sources before publishing totals.
- Compare source and candidate exports using `node scripts/reconcile-sorsogon.mjs source.json candidate.json`.
- Run local tests with `node --test scripts/reconcile-sorsogon.test.mjs`.

## Security and deployment gates
- Do not expose MeiliSearch master or admin keys via `VITE_*` variables.
- Use only a restricted search-only key if client-side MeiliSearch access is retained.
- Production, Preview, and Development credentials must be assessed separately.
- Do not reuse Production secrets in Preview.
- Verify Vercel Hobby eligibility and hosting/resource requirements before deploying.
- No public deployment until source verification, functional tests, and security review pass.

## Status
Configuration and offline reconciliation utility prepared. Live source counts and office IDs are not yet verified. No production changes.
