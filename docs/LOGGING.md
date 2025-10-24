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
