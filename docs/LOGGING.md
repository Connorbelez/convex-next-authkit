# Logging in this project

This project uses a single centralized logging abstraction so you can change the underlying
logging/telemetry provider in one place.

Files of interest
- `lib/logger.ts` — public logger surface (`trace`, `debug`, `info`, `warn`, `error`, `child`). Import this everywhere.
- `lib/pinoAdapter.ts` — server adapter using `pino` (structured JSON). In development it uses `pino-pretty` with emoji + colored output.
- `lib/clientAdapter.ts` — client-side adapter that batches browser logs and posts to `/api/logs`.
- `app/api/logs/route.ts` — ingestion endpoint that forwards browser logs to the server logger.
- `convex/logger.ts` — lightweight shim used by Convex server functions; writes to stdout but preserves the same API.

Environment variables
- `LOG_LEVEL` — log level (trace|debug|info|warn|error|fatal). Default: `info`.
- `LOG_PRETTY` — when `true` (or when `NODE_ENV !== 'production'`) the server uses `pino-pretty` for colored, emoji-prefixed console output. Default: `true` in dev.
- `LOG_SERVICE_NAME` — optional service name included in structured logs. Default: `convex-next-authkit`.
- `REMOTE_LOGGING_URL` — placeholder for future remote log shipping.

Design notes
- The project favors structured JSON logs on the server in production and a developer-friendly pretty output locally (color + emoji per level).
- All application code should import `logger` from `lib/logger.ts`. This keeps call sites unaware of the underlying provider.
- Client logs are best-effort; they are batched and POSTed to `/api/logs`. The server route rewrites them into server logs so shipping and enrichment happens in one place.

Usage examples

Server (Node / Next.js server components / API routes / Convex functions)

```ts
import { logger } from '@/lib/logger';

const log = logger.child({ requestId });
log.info('User signed in', { userId: 'user_123' });
try {
  // something that might throw
} catch (err) {
  log.error(err as Error, { userId: 'user_123' });
}
```

Client (browser)

```ts
import { logger } from '@/lib/logger';

logger.info('Clicked checkout', { cartSize: 3 });
// Logs are batched and sent to /api/logs by the client adapter.
```

Convex functions

Convex server functions should import `convex/logger.ts` (the shim) or `lib/logger.ts` when/if you share code across runtimes. For now the Convex shim writes to stdout so Convex's logs appear in Convex's dashboard.

Migration to remote logging / telemetry (future)

1. Add a shipping adapter in `lib/pinoAdapter.ts` or create a new adapter that forwards logs to your provider (Logflare/Honeycomb/Datadog).
2. For traces and spans, initialize an OpenTelemetry or provider SDK in a single `lib/telemetry.ts` and call it early (server-only).
3. If you want to centralize Convex logs, replace the `convex/logger.ts` shim with a tiny forwarder that calls your ingestion endpoint or provider SDK.

Best practices
- Do not throw from logger calls — the adapters are designed to be best-effort and non-blocking.
- Use `logger.child({ requestId, userId })` to attach context and make logs easy to query.
- Keep log levels conservative in production to avoid high-volume charges when shipping to remote providers.

Questions / next steps
- I can add `lib/telemetry.ts` to initialize OTLP or Sentry when you're ready.
- I can also add quick examples showing how to wire Datadog/Honeycomb if you pick a provider.
# Logging + Telemetry (notes)

This project uses a single centralized logging abstraction (`lib/logger.ts`) so that logging and later telemetry can be enabled from one place.

Goals
- Keep local developer logs pretty and colorful (with emojis).
- Emit structured JSON in production.
- Keep a single integration point for future remote logging/telemetry.

Files added
- `lib/logger.ts` — public logger export. Use `import { logger } from '@/lib/logger'`.
- `lib/pinoAdapter.ts` — server adapter (pino + pino-pretty in dev).
- `lib/clientAdapter.ts` — client-side batching adapter that POSTs to `/api/logs`.
- `app/api/logs/route.ts` — ingestion endpoint for browser logs (for now forwards to server logger).
- `convex/logger.ts` — lightweight Convex shim that writes to stdout but keeps same API.

Environment variables
- `LOG_LEVEL` — default: `info`. Controls pino log level (trace|debug|info|warn|error|fatal).
- `LOG_PRETTY` — default: `true` for local/dev. If `true`, logs are pretty-printed with colors and emojis. In production set to `false` to emit structured JSON.
- `LOG_SERVICE_NAME` — optional, default `convex-next-authkit`.
- `REMOTE_LOGGING_URL` — placeholder for future remote HTTP log ingestion.

Usage examples

Server / API / Convex functions

Import the central logger and use it:

```ts
import { logger } from '@/lib/logger';

const log = logger.child({ requestId: 'abc' });
log.info('User signed in', { userId });
log.error(new Error('payment failed'), { orderId });
```

Client-side

Import the same API from `lib/logger.ts` in client code. The client adapter batches logs and sends them to `/api/logs` (best-effort using `navigator.sendBeacon`).

```ts
import { logger } from '@/lib/logger';

logger.debug('clicked button', { button: 'signup' });
```

Request correlation
- `middleware.ts` injects an `x-request-id` header into responses. Use `logger.child({ requestId })` in server code to include it automatically in logs.

Convex functions
- Convex functions currently import `convex/logger.ts` which writes to stdout (so logs appear in Convex logs). To unify, change the Convex shim to forward logs to the Next.js ingestion endpoint or a remote collector later.

Migration path to remote logging / telemetry
1. Keep `LOG_PRETTY=false` in production so logs are structured JSON.
2. Add a `REMOTE_LOGGING_URL` and configure `lib/pinoAdapter.ts` to stream logs to that endpoint or to an agent.
3. Add `lib/telemetry.ts` to initialize OTLP or Sentry, and import it server-side early (single-file enablement).

Notes & tips
- The logger abstraction never throws — logging is best-effort.
- Avoid importing heavy telemetry SDKs directly in business logic. Initialize them in one place (`lib/telemetry.ts`).
- If you use container logging or log collectors, keep JSON output in production and use the pretty mode only in development.

Questions
- If you prefer logs to go to a specific provider (Datadog/Honeycomb/Logflare), I can add a small transport that POSTs logs to that provider in one file.
# Logging & Telemetry (centralized)

This project uses a centralized logging abstraction to keep logging and future telemetry changes in a single place.

Files of interest
- `lib/logger.ts` — public logging surface (methods: `trace`, `debug`, `info`, `warn`, `error`, `child`). Import this from any code (server, client, or Convex functions).
- `lib/pinoAdapter.ts` — server adapter using `pino` and `pino-pretty` for developer-friendly console output.
- `lib/clientAdapter.ts` — browser adapter that batches and POSTs logs to `/api/logs`.
- `app/api/logs/route.ts` — ingestion endpoint that forwards client logs to the server logger.
- `convex/logger.ts` — lightweight shim for Convex server functions that writes to stdout but matches the same API.

Why a single adapter?
- One import point (`lib/logger.ts`) means you can enable remote logging, telemetry, or structured tracing by changing one file.
- Server logs are structured JSON by default in production and pretty-printed locally for readability.

Environment variables
- `LOG_LEVEL` — default: `info`. Controls the minimum level emitted by the server logger.
- `LOG_PRETTY` — default: `true` in local dev (or when `NODE_ENV !== 'production'`). When `true`, `pino-pretty` is used to print colorful, emoji-prefixed logs for easy scanning.
- `LOG_SERVICE_NAME` — default: `convex-next-authkit`. Added as `service` field in structured logs.
- `REMOTE_LOGGING_URL` — optional future endpoint to forward logs to a remote collector (not enabled by default).

Emoji / color mapping (pretty mode)
- trace → 🔍
- debug → 🐞
- info → ℹ️
- warn → ⚠️
- error → 🔥
- fatal → 💀

Usage examples

Server (Node / Next.js server components / API routes):
```ts
import { logger } from '@/lib/logger';

const log = logger.child({ requestId: 'r_123' });
log.info('Starting job', { jobId: 'job_1' });
try {
  // ...
} catch (err) {
  log.error(err as Error, { detail: 'failed to run job' });
}
```

Client (browser): the client adapter mirrors the same API. It batches logs and POSTs them to `/api/logs`.

Convex functions:
- Use `import { logger } from './logger'` inside `convex/` functions. Currently this writes to stdout (Convex console) but the API is identical so you can later route these logs elsewhere.

How to enable remote shipping later
1. Add the remote provider SDK or HTTP transport (e.g. Datadog/Logflare/Honeycomb) to `lib/pinoAdapter.ts` or create a dedicated transport module.
2. Update `lib/logger.ts` to set the adapter to the remote-capable adapter (via `setLoggerAdapter`) or modify `createPinoAdapter()` to forward to the remote endpoint based on `REMOTE_LOGGING_URL`.
3. (Optional) Add sampling and filters for high-volume logs. For traces and metrics, add a `lib/telemetry.ts` initializer that sets up OpenTelemetry/OTLP — import it once at server startup.

Notes & best practices
- Do not throw inside the logger. Logging should be best-effort and non-blocking.
- Use `logger.child({ ... })` to attach request-level context (`requestId`, `userId`) so logs can be correlated across services.
- Keep logs structured (use metadata object) — e.g. `logger.info('User signed in', { userId })`.

If you need help wiring a specific provider (Datadog/Honeycomb/Logflare), open an issue or ask and I can add a tested integration.
# Logging in this repo

This project uses a single, centralized logging abstraction so you can change logging/telemetry in one place.

Files of interest
- `lib/logger.ts` — public API used throughout the app. Import `logger` from here in server and client code.
- `lib/pinoAdapter.ts` — server adapter using `pino`. In development `pino-pretty` is used to print colorized, emoji-prefixed logs.
- `lib/clientAdapter.ts` — client-side adapter that batches logs and posts to `/api/logs`.
- `app/api/logs/route.ts` — server ingestion endpoint that accepts client logs and forwards them to the server logger.
- `convex/logger.ts` — lightweight shim for Convex server functions that writes to stdout but keeps the same logger API.

Design goals
- Single import site (`lib/logger.ts`) so switching providers (Sentry, OTLP, Datadog) is one-file change.
- Dev-first pretty printing with colors and emojis for quick, pleasant local debugging.
- Structured JSON output in production (LOG_PRETTY=false) so logs are easy to ingest by agents/collectors later.

Environment variables
- `LOG_LEVEL` — default `info`. Controls the minimum log level (trace, debug, info, warn, error, fatal).
- `LOG_PRETTY` — set to `true` to enable pretty, colored console output (default `true` in non-production). Set to `false` in production to emit JSON.
- `LOG_SERVICE_NAME` — optional service name included in structured logs. Default: `convex-next-authkit`.
- `REMOTE_LOGGING_URL` — (placeholder) URL for an HTTP log ingestion endpoint if you later want to ship logs remotely.

How to use

Server-side (Node / Next.js server components / API routes / Convex server functions):

1. Import and use the logger:

```ts
import { logger } from '@/lib/logger';

logger.info('Starting job', { jobId: 'abc' });
const child = logger.child({ requestId: 'r1' });
child.debug('handling step', { step: 1 });
```

2. In Convex server functions, use the `convex/logger.ts` shim which mirrors the same API. When you later centralize shipping for Convex, update this shim only.

Client-side (browser):

1. Import `logger` in client code. The client adapter batches logs and sends them to `/api/logs`.

```ts
import { logger } from '@/lib/logger';
logger.info('User clicked sign-in', { button: 'primary' });
```

2. The server route `/api/logs` forwards entries to the server logger, so remote shipping configuration is still centralized.

Enabling remote shipping later (migration path)

1. Add a remote transport in `lib/pinoAdapter.ts` or implement a new adapter that sends logs to your chosen provider.
   - For HTTP-based ingestion, you can open a persistent HTTP stream or use an async background worker to forward logs to `REMOTE_LOGGING_URL`.
   - For vendor SDKs (Datadog, Logflare, etc) you can create an adapter that calls the vendor SDK API.
2. Update `lib/logger.ts` to `setLoggerAdapter()` with your new adapter or modify `createPinoAdapter()` to pipe to the remote transport.
3. Optionally add correlation IDs / trace IDs to logs (we already set `x-request-id` in `middleware.ts`). Add trace IDs to logs by creating child loggers with `{ requestId, traceId }`.

Notes & best practices
- Keep logging calls cheap: do not perform expensive synchronous work to compute log messages.
- Avoid logging secrets. Sanitize any sensitive fields before logging.
- When enabling remote shipping, consider sample rates and backpressure so you don't overload the collector.

Questions? Open an issue and I can help wire a specific provider (Datadog, Honeycomb, Logflare, etc.).
# Logging in this project

This repository uses a single, centralized logging abstraction so you can change
how logs are shipped and instrumented in one place.

Files of interest
- `lib/logger.ts` — public logging API used across the app. Import from here:
  `import { logger } from '@/lib/logger'` or `import logger from '@/lib/logger'`.
- `lib/pinoAdapter.ts` — pino-based server adapter. Uses `pino-pretty` in
  pretty mode and emits structured JSON in production.
- `lib/clientAdapter.ts` — browser-side adapter that batches logs and posts to
  `/api/logs` (implemented at `app/api/logs/route.ts`).
- `convex/logger.ts` — a lightweight shim for Convex server functions that
  writes to stdout but exposes the same API. Swap it later to forward Convex
  logs to a centralized backend if desired.

Logger contract
- Methods: `trace/debug/info/warn/error(message: string | Error, meta?: Record<string, any>)`
- `child(ctx)` returns a logger with context attached (useful for `requestId`, `userId`).
- Non-blocking: logging should never throw; adapters swallow internal errors.

Environment variables
- `LOG_LEVEL` — default: `info`. Controls minimum level emitted by the server adapter.
- `LOG_PRETTY` — `true` for pretty, human-friendly console printing (colors + emojis),
  `false` for structured JSON. Default: `true` in development (when `NODE_ENV !== 'production'`).
- `LOG_SERVICE_NAME` — optional service name included in logs (default: `convex-next-authkit`).
- `REMOTE_LOGGING_URL` — placeholder for a future remote ingest endpoint; the adapters
  are designed so a remote transport can be added in one place.

Emoji & colors
- The pretty output uses emojis per level:
  - trace → 🔍
  - debug → 🐞
  - info → ℹ️
  - warn → ⚠️
  - error → 🔥
  - fatal → 💀

How it works (short)
1. On server (`typeof window === 'undefined'`) `lib/logger` lazily loads
   `lib/pinoAdapter.ts`. That adapter uses `pino` to produce structured logs.
2. In development (or when `LOG_PRETTY=true`) pino runs `pino-pretty` with
   a custom message formatter that prefixes emojis and colors for readability.
3. On the browser, `lib/logger` uses `lib/clientAdapter.ts` which batches log
   entries and POSTs them to `POST /api/logs` (`app/api/logs/route.ts`). The
   server route forwards these to the server logger so shipping logic remains
   in one place.

Guidance for dev & production
- Local dev: set `LOG_PRETTY=true` in `.env.local` (already the default
  behavior when `NODE_ENV !== 'production'`). You get colorful emoji logs.
- Production: set `LOG_PRETTY=false` so logs are emitted as structured JSON
  (suitable for log aggregators).

How to enable remote shipping later (outline)
1. Add a remote transport in `lib/pinoAdapter.ts` — either using `pino.transport`
   to forward to an HTTP endpoint or wire in a provider SDK (Datadog, Logflare,
   etc.).
2. For client logs, change `lib/clientAdapter.ts` to post directly to your
   remote ingest (or keep posting to `/api/logs` and have the server forward
   them).
3. Optionally, replace `convex/logger.ts` to forward Convex runtime logs to the
   same backend (Convex may have its own stdout collector in production).

Examples
```ts
import { logger } from '@/lib/logger'

const reqLogger = logger.child({ requestId: 'abc123' })
reqLogger.info('Handling signup', { email: 'user@example.com' })
try {
  // ... risky operation
} catch (err) {
  reqLogger.error(err as Error, { route: '/signup' })
}
```

Notes
- Avoid importing heavy SDKs directly in UI code; keep the shipping logic in the
  adapters so the rest of your codebase stays lightweight and swap-friendly.
