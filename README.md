# decktype — learn languages by typing

**Live:** https://decktype.vercel.app

decktype turns any text — song lyrics, `.srt` subtitles, pasted articles, or an Anki `.apkg` deck — into typing practice. The OpenAI API extracts vocabulary and builds fill-in-the-blank exercises; a spaced-repetition scheduler (FSRS) decides what you practice next. Supports Japanese, Korean, Spanish, French, Chinese and more. Free tier + Stripe-billed Pro plan.

Solo project: product, design, code, and operations by [Jungmin Oh](https://github.com/five9123).

## Stack

| Layer | Choice |
|---|---|
| App | Next.js 15 (App Router, TypeScript), React 19, Tailwind 4 |
| Data / auth | Supabase (Postgres, RLS, SSR auth) — migrations in `supabase/migrations/` |
| AI | OpenAI API — `gpt-4o-mini`, chat completions in JSON mode |
| Billing | Stripe Checkout + Customer Portal, idempotent webhooks |
| Observability | Sentry (client / server / edge), Vercel Analytics |
| Tests | Vitest + Testing Library (`npm test`) |
| Hosting | Vercel |

## How the AI features work

Three server routes call OpenAI. All of them go through one shared client, `lib/openai-client.ts`, so the failure handling is identical everywhere:

| Route | What it does |
|---|---|
| `POST /api/process-media` | Text/subtitles → vocabulary cards + cloze exercises |
| `POST /api/deck-generate` | Topic + level → a starter deck |
| `POST /api/coaching-tip` | Session stats → 3 coaching tips |

### Request lifecycle

```
client ──► per-IP rate limit (in-memory sliding window, 5 req/min)
       ──► Supabase auth (401 if anonymous — AI calls cost money)
       ──► reserve a daily-quota slot BEFORE calling OpenAI
             (insert-then-count, so two concurrent requests can't both slip under the cap;
              the slot is rolled back if the AI call fails, so failures aren't charged)
       ──► OpenAI chat completion, JSON mode
             · per-attempt timeout (20–55 s depending on route)
             · retry on 429 / 5xx / timeout / connection errors
               — exponential backoff with full jitter (500 ms → 8 s cap),
                 honours `Retry-After` when OpenAI sends it,
                 never retries 4xx we caused, stops at an overall deadline
             · every retry is a Sentry breadcrumb; final failures are captured with `ai_error_code`
       ──► parse + validate the JSON
             · truncated output (`finish_reason: "length"`) is repaired when possible
       ──► response (or a classified error)
```

### Error contract

Every AI route returns `{ error, code }` with a stable `code` and an appropriate HTTP status, so the UI (`lib/api-errors.ts`) can show the right guidance instead of a generic failure:

| `code` | Status | Cause | What the user sees |
|---|---|---|---|
| `AUTH_REQUIRED` | 401 | not signed in | sign-in prompt |
| `QUOTA_EXCEEDED` | 429 | daily plan quota used (5 free / 50 pro) | upgrade / reset-time message |
| `RATE_LIMITED` | 429 + `Retry-After` | OpenAI 429 still failing after retries | "busy, try again in a moment" |
| `TIMEOUT` | 504 | per-attempt / overall deadline exceeded | "reduce text or max words" |
| `UPSTREAM_ERROR` | 502 | OpenAI 5xx or unreachable after retries | "AI service error, retry" |
| `BAD_REQUEST` | 400 | 4xx we caused (e.g. prompt too long) | "try shorter text" |
| `EMPTY_RESPONSE` / `MALFORMED_JSON` | 502 | model returned nothing / unparseable JSON | "try again / reduce max words" |
| `NOT_CONFIGURED` | 503 | missing/invalid API key | "AI not configured on server" |

The retry/backoff and classification logic is unit-tested in `__tests__/lib/openai-client.test.ts`.

## Other notable pieces

- `lib/fsrs.ts` — spaced repetition on top of `ts-fsrs`; `lib/confidence.ts` — per-card mastery score from recent accuracy/WPM.
- `lib/apkg-parser.ts` — reads Anki `.apkg` files in the browser (`sql.js` + `jszip`), with field mapping for Basic/Cloze note types.
- `lib/media-parser.ts` — `.srt` / lyrics parsing; `lib/lang-detect.ts` — script-based language detection.
- `app/api/stripe/webhook` — Stripe webhooks with idempotency keys stored in Postgres (`008_webhook_idempotency.sql`).
- Multi-language UI (EN / KO / JA / ES / ZH / FR) via `lib/translations.ts`.

## Running locally

```bash
npm install
cp .env.local.example .env.local   # see that file for the full list
npm run dev                  # http://localhost:3000
npm test                     # vitest
```

Key environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_MONTHLY`, `STRIPE_PRICE_YEARLY`, `NEXT_PUBLIC_SENTRY_DSN` (optional).

Apply the SQL in `supabase/migrations/` in order against a fresh Supabase project.

## Known limitations

- The per-IP rate limiter is in-memory, so it is per-serverless-instance. Good enough as a first line of defense; the per-user quota in Postgres is the real cap. Redis/Upstash would make it global.
- Long inputs are truncated to 8,000 characters before they reach the model.
