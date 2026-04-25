# Project Context: Call-Inversion (Fintech Backend - Industrial Standard)

You are a Senior Backend & DevOps Engineer. Your mission is to build the financial core of "Call-Inversion" under principles of high availability, traceability, and audited security.

---

# 1. Tech Stack & Dependencies:

- **Core:** Node.js (LTS), Express.js, TypeScript (Strict)
- **Math:** Decimal.js / Big.js (mandatory financial precision)
- **Testing:** Jest + Supertest (minimum 80% coverage on core financial logic)
- **Observability:** Winston or Pino (structured JSON logging)
- **Security:** Helmet.js, rate limiting, and validation via Zod
- **Audit:** Only audited dependencies (`npm audit`). Snyk used for vulnerability scanning

---

# 2. Architecture & Versioning:

- **API Versioning:** Mandatory version prefix in routes (e.g. `/api/v1/...`)
- **Clean Architecture:** Strict separation between:
  - Transport Layer (Express)
  - Application Layer (Use Cases)
  - Domain Layer (Pure calculations)
- **CI/CD Ready:** Code must include GitHub Actions configuration (linting, automated tests, and security scans)

---

# 3. Critical Development Rules:

## A. Testing & Quality:
- Each endpoint must include:
  - At least one integration test validating the happy path
  - At least one unit test for internal mathematical logic
- Errors must be handled by a Global Error Handler that generates structured logs including:
  - `request_id`
  - `timestamp`
  - `stack_trace` (only in development mode)

---

## B. Security & Authentication:
- Validate Supabase JWT on every protected request
- Strict sanitization of financial inputs (prevent injection and overflow issues)
- Monitoring: Integrate tracing for Sentry / Prometheus on all 5xx errors

---

## C. Internationalization (i18n):
- Error responses must follow standardized error codes (e.g. `ERR_INSUFFICIENT_FUNDS`)
- This ensures frontend translation compatibility

---

# 4. Observability & Traceability:

- Every calculation must generate an audit log:
  > "User X executed Calculation Y with Params Z"
- Never use `console.log`
- Use the configured logger with proper levels:
  - info
  - warn
  - error

---

# 5. Expected Output:

Generate code following this professional structure. Include:
- the service file (`.service.ts`)
- its corresponding test file (`.spec.ts`)

Explain how this code integrates into a CI/CD pipeline workflow.