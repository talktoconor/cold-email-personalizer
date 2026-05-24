# SpearFisher — UX Bulletproofing & QA Agent

> **Purpose:** Systematically walk every user-facing workflow, identify what's broken / fake / missing, and produce a punch list that turns SpearFisher from a marketing site into a shippable product.

---

## 0. Current State Summary

| Layer | Status |
|---|---|
| **Frontend / Marketing pages** | Fully built. 247 static pages, blog index, pricing, landing variants, SEO infra. |
| **Core email generation** | Works. Calls Anthropic API, returns 3 variants, copy-to-clipboard functional. |
| **Authentication** | Does not exist. No login, no signup, no sessions, no middleware. |
| **Database** | Does not exist. No ORM, no schema, no migrations, no persistence of any kind. |
| **Payments (Stripe)** | Does not exist. Pricing page is cosmetic. All CTAs route to `/app`. |
| **Usage tracking / limits** | Does not exist. `isPro = true` is hardcoded. "5 free emails/month" is unenforced. |
| **Rate limiting** | Does not exist. API routes are wide open. |
| **Error handling** | Inline only. No error.tsx, no error boundaries, no not-found.tsx. |
| **Testing** | Does not exist. No test framework installed. |
| **Content** | Empty. 0 blog posts, 0 programmatic page content files. Scripts exist but haven't run. |

---

## 1. User Stories & Workflow Audit

### US-1: First-Time Visitor → Homepage → Try the App

**Flow:**
1. Land on `/` (homepage)
2. Read hero, scroll through value props, see live demo
3. Click "Try SpearFisher Free" or "Start Free" CTA
4. Arrive at `/app`
5. Paste prospect info → click Generate → see email variants
6. Copy an email → use it

**Test checklist:**

- [ ] Homepage loads without console errors
- [ ] All nav links resolve (Resources, Blog, Pricing, Book a Demo, Try Free)
- [ ] Hero mock email renders correctly (no broken characters, proper line breaks)
- [ ] Trust bar logos render (check grayscale/invert filter on all 5)
- [ ] Live demo component loads and shows placeholder state
- [ ] Live demo: enter prospect info → click Generate → see result (requires valid `ANTHROPIC_API_KEY`)
- [ ] Live demo: error state if API key missing or API fails
- [ ] "Try SpearFisher Free" CTA links to `/app`
- [ ] `/app` page loads, all form fields render
- [ ] Paste text into "Prospect Information" textarea
- [ ] Click "Generate Emails" → loading spinner appears
- [ ] 3 email variants render with subject lines + bodies
- [ ] "Copy Subject", "Copy Body", "Copy Full Email" all write to clipboard
- [ ] Visual feedback (checkmark / "Copied!") appears after copy
- [ ] Error message shows if generation fails

**Known breaks:**
- 🔴 **ANTHROPIC_API_KEY is empty in `.env.local`** — all generation will 500. Must set a real key.
- 🔴 **Live demo on homepage calls `/api/generate`** — same API key dependency.
- 🟡 **No loading.tsx** — if `/app` is slow to hydrate, user sees blank page.
- 🟡 **No error boundary** — an unhandled React error crashes the entire page with no recovery.

---

### US-2: Visitor Explores Pricing → Attempts Upgrade

**Flow:**
1. Click "Pricing" in nav
2. See 4 plans (Free, Pro $49, Team $99/seat, Agency $299)
3. Click a plan CTA (e.g., "Start Free Trial")
4. Expect: signup/checkout flow
5. Actual: redirected to `/app` with no checkout

**Test checklist:**

- [ ] `/pricing` page loads, all 4 plan cards render
- [ ] Feature lists are accurate to what's actually built
- [ ] CTA buttons have correct labels per plan
- [ ] All CTA buttons link somewhere functional
- [ ] FAQ accordion items expand/collapse
- [ ] Toggle between monthly/annual pricing (if toggle exists)

**Known breaks:**
- 🔴 **All plan CTAs link to `/app`** — no Stripe checkout, no signup, no trial activation.
- 🔴 **Features listed that don't exist:** Performance analytics, A/B subject testing, CRM integration (CSV), API access, white-label, dedicated account manager, custom AI training.
- 🔴 **"Start 14-Day Free Trial" implies trial logic** — none exists.
- 🔴 **"Cancel from your dashboard" in FAQ** — no dashboard exists.
- 🟡 **No monthly/annual toggle** — pricing page only shows monthly rates.

---

### US-3: Visitor → Blog

**Flow:**
1. Click "Blog" in nav
2. See list of blog posts
3. Click into a post → read it

**Test checklist:**

- [ ] `/blog` page loads
- [ ] Blog posts render (if any exist)
- [ ] "Blog posts coming soon" message shows when no posts exist
- [ ] Blog post detail pages render with TOC, Quick Answer, content, CTA
- [ ] Breadcrumbs work and link correctly
- [ ] JSON-LD article schema is valid

**Known breaks:**
- 🔴 **`content/blog/` directory is empty** — zero posts exist. Blog index shows placeholder.
- 🟡 **RSS feed at `/feed.xml` returns empty channel** — valid XML but no items.

---

### US-4: Visitor → Cold Email Guides (Programmatic SEO)

**Flow:**
1. Navigate to `/cold-email`
2. Browse categories (By Role, By Industry, By Use Case, By Persona)
3. Click into a specific guide (e.g., `/cold-email/roles/sdr`)
4. Read guide content, see before/after examples, FAQ

**Test checklist:**

- [ ] `/cold-email` index page loads with category cards
- [ ] Category links resolve to valid pages
- [ ] Individual guide pages render
- [ ] Before/after email comparison renders
- [ ] FAQ section renders with expand/collapse
- [ ] Breadcrumbs work
- [ ] CTA links to `/app`

**Known breaks:**
- 🔴 **`content/pages/` directories are all empty** — 244 programmatic pages exist as routes but have no content. They render a generic fallback template.
- 🟡 **`scripts/generate-content.ts` exists but has never run** — requires valid `ANTHROPIC_API_KEY` and significant API spend to generate all 244 pages.

---

### US-5: PDF Upload Workflow

**Flow:**
1. On `/app`, click "Upload PDF" or drag PDF into upload area
2. PDF is read and base64-encoded
3. Generate emails → PDF content is sent to Anthropic as multimodal context
4. Emails reference information from the PDF

**Test checklist:**

- [ ] Upload button/area is visible and clickable
- [ ] PDF file selection works
- [ ] Non-PDF files are rejected with error message
- [ ] Files > 5MB are rejected with error message
- [ ] PDF filename appears after upload
- [ ] "Remove" button clears the uploaded PDF
- [ ] Generated emails reference PDF content when PDF is provided
- [ ] Generation works without PDF (PDF is optional)

**Known breaks:**
- 🟡 **No progress indicator during PDF read** — large PDFs may feel like the app froze.
- 🟡 **Base64 encoding of large PDFs** — 5MB PDF → ~6.7MB base64 string in request body. No server-side size limit on the API route.

---

### US-6: Gmail Connect (OAuth)

**Flow:**
1. On `/app`, click "Connect Gmail"
2. Expect: OAuth popup → authorize → connected state
3. Actual: button toggles a boolean, shows green checkmark, does nothing

**Test checklist:**

- [ ] "Connect Gmail" button renders
- [ ] Button click shows visual state change
- [ ] Actually initiates Gmail OAuth flow (when built)

**Known breaks:**
- 🔴 **Entirely fake.** Toggles `gmailConnected` local state. No OAuth, no API, no email sending capability. User is deceived into thinking it's connected.

---

### US-7: LinkedIn Connect

**Flow:**
1. On `/app`, click "Connect LinkedIn"
2. Expect: OAuth popup → authorize → pull prospect data from LinkedIn
3. Actual: button toggles a boolean, does nothing

**Known breaks:**
- 🔴 **Entirely fake.** Same as Gmail — cosmetic toggle only.

---

### US-8: URL Enrichment (Company URL / LinkedIn URL fields)

**Flow:**
1. On `/app`, enter a company URL and/or LinkedIn URL
2. Expect: system scrapes/enriches these URLs for prospect context
3. Actual: URLs are passed as plain text to the Anthropic prompt. The model cannot fetch them.

**Test checklist:**

- [ ] URL input fields accept text
- [ ] URLs are included in the API request body
- [ ] Model incorporates URL context in generation (it will hallucinate/fabricate details)

**Known breaks:**
- 🔴 **No web scraping or enrichment.** The AI model cannot access URLs. It uses the URL string as a hint and fabricates company details. This is actively misleading — the "Instant Research" value prop on the homepage implies real-time web research.
- 🟡 **No URL validation** — accepts any string, not just valid URLs.

---

### US-9: Landing Page Variants (Ad Traffic)

**Flow:**
1. Paid ad directs user to `/lp/sdr`, `/lp/recruiter`, `/lp/agency`, etc.
2. Persona-specific headline, stats, CTA
3. Live demo embedded
4. CTA → `/app`

**Test checklist:**

- [ ] All 5 variants load: `cold-email`, `sdr`, `recruiter`, `agency`, `sales-team`
- [ ] Each variant shows unique headline, subheadline, stats, CTA text
- [ ] Live demo works on each variant
- [ ] CTA links to `/app`
- [ ] Invalid variant → 404

**Known breaks:**
- 🟡 **`robots: { index: false }` on all LP variants** — intentionally noindex, but verify this is desired.
- 🟡 **Social proof section claims "Trusted by 2,500+ sales teams"** — unverifiable.

---

### US-10: Mobile Responsiveness

**Test checklist:**

- [ ] Homepage hero section responsive (stacks vertically on mobile)
- [ ] Nav collapses or adapts on mobile (hamburger menu?)
- [ ] `/app` form fields usable on mobile
- [ ] Email variants readable on mobile
- [ ] Pricing cards stack on mobile
- [ ] Blog posts readable on mobile
- [ ] Cold email guides readable on mobile
- [ ] Trust bar logos don't overflow
- [ ] Live demo usable on mobile

**Known breaks:**
- 🟡 **No mobile nav menu** — nav links may overflow on small screens. Check for hamburger/drawer.
- 🟡 **Hero section uses `lg:grid-cols-2`** — stacks on mobile, but verify mock email doesn't get cut off.

---

## 2. Infrastructure That Must Be Built

### 2A. Authentication (Priority: P0)

**Recommended:** Clerk or NextAuth.js v5 (Auth.js)

**Requirements:**
- Email/password signup + Google OAuth + magic link
- Session management (JWT or database sessions)
- Middleware to protect `/app` route
- User profile with plan tier stored
- `/login` and `/signup` pages
- Redirect unauthenticated users from `/app` to `/login`

**Files to create:**
```
src/middleware.ts                    — auth guard for /app, /api/generate, /api/research
src/app/login/page.tsx               — login page
src/app/signup/page.tsx              — signup page
src/app/api/auth/[...nextauth]/route.ts  — (if using NextAuth)
src/lib/auth.ts                      — auth config/helpers
```

### 2B. Database (Priority: P0)

**Recommended:** Neon Postgres + Drizzle ORM (Neon MCP is already connected)

**Schema design:**

```sql
-- Users (synced from auth provider)
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  name          TEXT,
  avatar_url    TEXT,
  plan          TEXT NOT NULL DEFAULT 'free',  -- free | pro | team | agency
  stripe_customer_id   TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  team_id       UUID REFERENCES teams(id),
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Teams (for Team and Agency plans)
CREATE TABLE teams (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  plan          TEXT NOT NULL DEFAULT 'team',
  owner_id      UUID NOT NULL,
  seat_limit    INT NOT NULL DEFAULT 5,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Email generations (usage tracking + history)
CREATE TABLE generations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id),
  prospect_info TEXT NOT NULL,
  sender_context TEXT,
  company_url   TEXT,
  linkedin_url  TEXT,
  pdf_filename  TEXT,
  emails_json   JSONB NOT NULL,          -- the 3 variants returned
  model         TEXT NOT NULL DEFAULT 'claude-sonnet-4-6',
  tokens_used   INT,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Usage tracking (per billing period)
CREATE TABLE usage (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id),
  period_start  DATE NOT NULL,
  period_end    DATE NOT NULL,
  emails_generated INT NOT NULL DEFAULT 0,
  emails_limit  INT NOT NULL,            -- 5 for free, 200 for pro, unlimited for team/agency
  UNIQUE(user_id, period_start)
);

-- Analytics events (replaces console.log in /api/track)
CREATE TABLE events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id),  -- nullable for anonymous
  session_id    TEXT,
  event_type    TEXT NOT NULL,
  page          TEXT,
  utm_source    TEXT,
  utm_medium    TEXT,
  utm_campaign  TEXT,
  utm_content   TEXT,
  utm_term      TEXT,
  metadata      JSONB,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- API keys (for Agency plan)
CREATE TABLE api_keys (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id),
  key_hash      TEXT NOT NULL UNIQUE,     -- SHA-256 of the actual key
  key_prefix    TEXT NOT NULL,            -- first 8 chars for display (sf_live_abc...)
  name          TEXT,
  last_used_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now(),
  revoked_at    TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_generations_user_id ON generations(user_id);
CREATE INDEX idx_generations_created_at ON generations(created_at);
CREATE INDEX idx_usage_user_period ON usage(user_id, period_start);
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_created_at ON events(created_at);
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);
```

**Files to create:**
```
src/lib/db.ts                        — Drizzle client + connection
src/lib/schema.ts                    — Drizzle schema definitions
drizzle.config.ts                    — Drizzle Kit config
drizzle/                             — migration directory
```

**Env vars to add:**
```
DATABASE_URL=postgresql://...        — Neon connection string
```

### 2C. Stripe Integration (Priority: P1)

**Requirements:**
- 4 products in Stripe: Free, Pro ($49/mo), Team ($99/seat/mo), Agency ($299/mo)
- Checkout session creation from pricing page
- Webhook handler for subscription events (created, updated, canceled, payment_failed)
- Customer portal for self-service management
- Sync plan tier to `users.plan` in database

**Files to create:**
```
src/lib/stripe.ts                    — Stripe client + helpers
src/app/api/stripe/checkout/route.ts — create checkout session
src/app/api/stripe/webhook/route.ts  — handle Stripe webhooks
src/app/api/stripe/portal/route.ts   — create customer portal session
```

**Env vars to add:**
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_TEAM=price_...
STRIPE_PRICE_AGENCY=price_...
```

**Test credentials (Stripe test mode):**
- Use `sk_test_...` keys from Stripe dashboard
- Test card: `4242 4242 4242 4242`, any future exp, any CVC
- Test card (decline): `4000 0000 0000 0002`
- Test card (requires auth): `4000 0025 0000 3155`
- Webhook testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### 2D. Rate Limiting (Priority: P1)

**Recommended:** Upstash Redis + `@upstash/ratelimit`

**Limits to enforce:**

| Plan | Emails/month | Requests/min |
|---|---|---|
| Anonymous (no auth) | 0 | 0 (must sign up) |
| Free | 5 | 2 |
| Pro | 200 | 10 |
| Team | Unlimited | 30 |
| Agency | Unlimited | 60 |

**Files to create:**
```
src/lib/rate-limit.ts                — rate limiter config
src/middleware.ts                     — (extend with rate limiting)
```

**Env vars to add:**
```
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

### 2E. Error Handling (Priority: P1)

**Files to create:**
```
src/app/error.tsx                    — global error boundary
src/app/not-found.tsx                — custom 404 page
src/app/app/error.tsx                — app-specific error boundary
src/app/app/loading.tsx              — app loading skeleton
src/app/blog/[slug]/not-found.tsx    — blog post 404
```

---

## 3. Test Credential & Environment Setup

### 3A. Environment Variables Required

Create `.env.local` with:

```bash
# === AI ===
ANTHROPIC_API_KEY=sk-ant-...           # Required. Get from console.anthropic.com

# === Database (Neon) ===
DATABASE_URL=postgresql://...          # Neon connection string
# Can create via Neon MCP: create_project → get_connection_string

# === Auth (Clerk example) ===
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/app
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/app

# === Stripe ===
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_TEAM=price_...
STRIPE_PRICE_AGENCY=price_...

# === Rate Limiting (Upstash) ===
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# === Analytics (when ready) ===
# NEXT_PUBLIC_GA_ID=G-...
# NEXT_PUBLIC_META_PIXEL_ID=...
# NEXT_PUBLIC_LINKEDIN_PARTNER_ID=...
```

### 3B. Test User Accounts

Once auth is built, create these test accounts:

| Email | Password | Plan | Purpose |
|---|---|---|---|
| `free@test.spearfisher.app` | `Test1234!` | Free | Test free tier limits (5 emails/mo) |
| `pro@test.spearfisher.app` | `Test1234!` | Pro | Test Pro features + 200 email limit |
| `team-owner@test.spearfisher.app` | `Test1234!` | Team (owner) | Test team management, seat limits |
| `team-member@test.spearfisher.app` | `Test1234!` | Team (member) | Test team member permissions |
| `agency@test.spearfisher.app` | `Test1234!` | Agency | Test API keys, white-label, unlimited |
| `expired@test.spearfisher.app` | `Test1234!` | Pro (expired) | Test expired subscription handling |
| `overlimit@test.spearfisher.app` | `Test1234!` | Free (at limit) | Test limit enforcement (5/5 used) |

### 3C. Stripe Test Products

Create in Stripe test mode dashboard:

| Product | Price ID | Amount | Interval |
|---|---|---|---|
| SpearFisher Pro | `price_pro_monthly` | $49.00 | monthly |
| SpearFisher Pro (Annual) | `price_pro_annual` | $470.00 | yearly |
| SpearFisher Team | `price_team_monthly` | $99.00 | monthly per seat |
| SpearFisher Team (Annual) | `price_team_annual` | $950.00 | yearly per seat |
| SpearFisher Agency | `price_agency_monthly` | $299.00 | monthly |
| SpearFisher Agency (Annual) | `price_agency_annual` | $2,870.00 | yearly |

---

## 4. Automated QA Test Plan

### Phase 1: Smoke Tests (run first, catch fatal issues)

```
SMOKE-01  Homepage loads without JS errors
SMOKE-02  /app page loads and renders form
SMOKE-03  /pricing page loads with all plan cards
SMOKE-04  /blog page loads (even if empty)
SMOKE-05  /cold-email page loads
SMOKE-06  /api/generate returns 200 with valid input + API key
SMOKE-07  /api/generate returns 400 with empty input
SMOKE-08  /api/generate returns 500 with missing API key
SMOKE-09  All nav links resolve (no 404s from nav)
SMOKE-10  All footer links resolve
```

### Phase 2: Core Workflow Tests

```
CORE-01   Generate email with prospect info only → 3 variants returned
CORE-02   Generate email with all fields filled → 3 variants returned
CORE-03   Generate email with PDF upload → emails reference PDF content
CORE-04   Copy subject line → clipboard contains subject text
CORE-05   Copy body → clipboard contains body text
CORE-06   Copy full email → clipboard contains "Subject: ...\n\n..."
CORE-07   Generate with empty prospect info → error shown
CORE-08   Generate while already loading → button disabled, no double-submit
CORE-09   API returns malformed JSON → user sees error, not crash
CORE-10   Network error during generation → user sees error message
CORE-11   Live demo on homepage generates an email
CORE-12   Live demo shows only 1 of 3 variants with upsell
```

### Phase 3: Auth Workflow Tests (once auth is built)

```
AUTH-01   Unauthenticated user on /app → redirected to /login
AUTH-02   Signup with email/password → account created, redirected to /app
AUTH-03   Signup with Google OAuth → account created
AUTH-04   Login with valid credentials → session created
AUTH-05   Login with invalid credentials → error message
AUTH-06   Logout → session destroyed, redirected to /
AUTH-07   Password reset flow → email sent, link works
AUTH-08   Protected API routes reject unauthenticated requests
AUTH-09   Session persists across page refreshes
AUTH-10   Session expires after configured timeout
```

### Phase 4: Payment Workflow Tests (once Stripe is built)

```
PAY-01    Free user on /pricing clicks "Upgrade to Pro" → Stripe checkout opens
PAY-02    Complete checkout with test card 4242... → subscription active, plan updated
PAY-03    Checkout with decline card 4000...0002 → error shown, plan unchanged
PAY-04    Pro user on /pricing sees "Current Plan" badge, not upgrade button
PAY-05    Pro user clicks "Manage Subscription" → Stripe portal opens
PAY-06    Cancel subscription in portal → plan downgrades to Free at period end
PAY-07    Stripe webhook: subscription.created → user.plan updated in DB
PAY-08    Stripe webhook: subscription.updated → user.plan updated in DB
PAY-09    Stripe webhook: subscription.deleted → user.plan set to 'free'
PAY-10    Stripe webhook: invoice.payment_failed → user notified (email? banner?)
PAY-11    Team plan checkout with seat quantity selector
PAY-12    Agency plan checkout
```

### Phase 5: Usage Limit Tests (once limits are built)

```
LIMIT-01  Free user: generate 5 emails → success
LIMIT-02  Free user: generate 6th email → limit error shown with upgrade CTA
LIMIT-03  Pro user: generate 200 emails → success
LIMIT-04  Pro user: generate 201st email → limit error shown
LIMIT-05  Team/Agency user: no generation limit
LIMIT-06  Usage counter resets at billing period start
LIMIT-07  Usage count displayed in app UI (e.g., "3 of 5 emails used")
LIMIT-08  Rate limit: rapid-fire requests → 429 response after threshold
```

### Phase 6: Content & SEO Tests

```
SEO-01    Every page has unique <title> and <meta description>
SEO-02    JSON-LD on homepage is valid (test with Google Rich Results)
SEO-03    JSON-LD aggregateRating removed or reflects real data
SEO-04    Sitemap at /sitemap.xml lists all public pages
SEO-05    robots.txt allows crawling of public pages
SEO-06    Canonical URLs are correct on all pages
SEO-07    OpenGraph tags present on all pages
SEO-08    Blog posts render with proper heading hierarchy (h1 > h2 > h3)
SEO-09    Cold email guide pages render content (not generic fallback)
SEO-10    RSS feed contains valid entries (once blog has content)
```

### Phase 7: Mobile & Cross-Browser Tests

```
MOBILE-01  Homepage responsive at 375px width (iPhone SE)
MOBILE-02  /app form usable at 375px width
MOBILE-03  Email variants readable at 375px
MOBILE-04  Nav doesn't overflow at 375px
MOBILE-05  Pricing cards stack properly at 375px
MOBILE-06  Tablet layout at 768px (iPad)
MOBILE-07  Large desktop at 1920px
MOBILE-08  Chrome, Firefox, Safari — no layout breaks
MOBILE-09  Touch targets are at least 44x44px on mobile
MOBILE-10  No horizontal scroll on any page at any breakpoint
```

### Phase 8: Security Tests

```
SEC-01    API routes reject requests without valid auth token (once auth built)
SEC-02    ANTHROPIC_API_KEY is not exposed to client-side code
SEC-03    No sensitive data in client-side JavaScript bundle
SEC-04    CORS headers appropriate on API routes
SEC-05    XSS: prospect info with <script> tags doesn't execute
SEC-06    XSS: generated email content is sanitized before rendering
SEC-07    CSRF protection on mutation endpoints
SEC-08    Rate limiting prevents API abuse
SEC-09    Stripe webhook signature verified before processing
SEC-10    SQL injection: malicious input in form fields (once DB exists)
SEC-11    File upload: non-PDF files rejected server-side (not just client)
SEC-12    File upload: oversized files rejected server-side
```

---

## 5. Known Fake / Misleading Content to Fix

These items claim functionality or data that doesn't exist. Each must be either built or removed before public launch.

| Item | Location | Issue | Resolution |
|---|---|---|---|
| "Trusted by 2,500+ sales teams" | Homepage, LP variants | Unverifiable claim | Remove or replace with real count once tracked |
| "4.8/5 average rating (127 reviews)" | JSON-LD structured data in `src/lib/structured-data.ts` | Fabricated rating | Remove `aggregateRating` until real reviews exist |
| 4 testimonials with names/titles | Homepage | No evidence these are real | Remove or replace with real testimonials |
| "Performance analytics" | Pricing page (Pro feature) | Doesn't exist | Remove until built |
| "A/B subject line testing" | Pricing page (Team feature) | Doesn't exist | Remove until built |
| "CRM integration (CSV)" | Pricing page (Team feature) | Doesn't exist | Remove until built |
| "API access" | Pricing page (Agency feature) | No API keys/docs exist | Remove until built |
| "White-label option" | Pricing page (Agency feature) | Doesn't exist | Remove until built |
| "Custom AI training" | Pricing page (Agency feature) | Doesn't exist | Remove until built |
| "Dedicated account manager" | Pricing page (Agency feature) | No support system | Remove until built |
| "Cancel from your dashboard" | Pricing FAQ | No dashboard exists | Update copy |
| "Book a Demo" nav link | Nav component | Links to /app, no booking flow | Link to Calendly or remove |
| "Start 14-Day Free Trial" | Pricing page | No trial logic | Change to "Get Started Free" or build trials |
| Gmail Connect button | /app page | Cosmetic toggle only | Remove button or build OAuth |
| LinkedIn Connect button | /app page | Cosmetic toggle only | Remove button or build OAuth |
| "Tech stack detection" | Homepage features | Model fabricates this | Clarify or remove |
| "Hiring signal analysis" | Homepage features | Model fabricates this | Clarify or remove |
| "Company news & funding data" | Homepage features | No real data fetch | Clarify or remove |
| Benchmark data ("10M+ emails analyzed") | /benchmarks page | No source/methodology | Add disclaimer or remove |

---

## 6. Orphaned / Dead Code

| Item | Location | Issue |
|---|---|---|
| `/api/research` route | `src/app/api/research/route.ts` | Fully functional API route, but nothing in the UI calls it. Either wire it up (e.g., as a "Research" tab in /app) or remove it. |
| Tracking pixel components | `src/components/tracking.tsx` | Google Ads, Meta Pixel, LinkedIn tags are all commented out. Either activate with real IDs or remove dead code. |
| Content generation scripts | `scripts/generate-content.ts`, `scripts/generate-blog.ts` | Exist but have never been run. Need valid `ANTHROPIC_API_KEY` to execute. |

---

## 7. Execution Priority

### Sprint 1: Make it real (Week 1-2)
1. **Set ANTHROPIC_API_KEY** — app literally doesn't work without it
2. **Add auth** (Clerk or NextAuth) — protect /app, create login/signup
3. **Add database** (Neon + Drizzle) — persist users, track usage
4. **Add usage limits** — enforce free tier (5/mo), track generation counts
5. **Remove fake content** — testimonials, ratings, unbuilt features from pricing
6. **Add error.tsx + not-found.tsx** — graceful error handling

### Sprint 2: Monetize (Week 3-4)
1. **Stripe integration** — checkout, webhooks, portal
2. **Pricing page CTAs → Stripe checkout**
3. **Plan-gated features** in /app
4. **Rate limiting** (Upstash)
5. **Usage dashboard** in /app (emails used / limit)

### Sprint 3: Content & Polish (Week 5-6)
1. **Run content generation scripts** — populate 244 programmatic pages + blog
2. **Mobile nav** (hamburger menu)
3. **Loading states** (loading.tsx, Suspense boundaries)
4. **Real "Book a Demo"** (Calendly embed or Cal.com)
5. **Wire up /api/research** as prospect research feature in /app

### Sprint 4: Growth & Analytics (Week 7-8)
1. **Activate tracking pixels** (GA4, Meta, LinkedIn)
2. **Event persistence** to database (replace console.log in /api/track)
3. **Gmail OAuth** (if building send-from-app)
4. **A/B testing framework**
5. **Playwright E2E tests** for critical workflows

---

## 8. Running This QA Agent

### Prerequisites
```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Edit .env.local with real values (at minimum: ANTHROPIC_API_KEY)

# Start dev server
npm run dev
```

### Manual QA Walkthrough
1. Open http://localhost:3000
2. Walk through each User Story (US-1 through US-10) above
3. Check every item in the test checklists
4. Log failures with: page, action taken, expected result, actual result, screenshot

### Automated Testing (once installed)
```bash
# Install Playwright
npm install -D @playwright/test
npx playwright install

# Run tests
npx playwright test

# Run with UI
npx playwright test --ui
```

---

## 9. Definition of "Ship-Ready"

SpearFisher is ship-ready when ALL of the following are true:

- [ ] Auth system functional (signup, login, logout, session persistence)
- [ ] Database operational (users, generations, usage tracking)
- [ ] Free tier enforced (5 emails/month, hard limit)
- [ ] Stripe checkout works for Pro plan (minimum viable)
- [ ] Stripe webhooks update user plan in database
- [ ] Rate limiting active on all API routes
- [ ] All fake content removed or replaced with real data
- [ ] Error boundaries on all pages
- [ ] 404 page exists and renders correctly
- [ ] No console errors on any page
- [ ] Mobile responsive on all pages (375px+)
- [ ] ANTHROPIC_API_KEY is set and generation works end-to-end
- [ ] Core workflow (signup → generate → copy) takes < 60 seconds
- [ ] Pricing page accurately reflects only features that exist
