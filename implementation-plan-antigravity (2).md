# Digital Card Platform — Implementation Plan for Antigravity
### Phase 1: Business Card + Client/Admin Portal (built with Phase 2 roots in place)
### Phase 2: Full Invitation Suite (joins onto Phase 1 without rework)

---

## Start Here — Guidance, Skills & MCP Setup (do this before Prompt 1)

Two things get set up before any code is written: (1) this plan's two recurring
frameworks get turned into actual reusable **Skills** so Antigravity applies them
consistently across dozens of templates instead of re-reading this whole document
every time, and (2) a small set of **MCP servers** get connected so the generated UI
doesn't default to the generic "Inter font, purple gradient, rounded card" look every
LLM produces out of the box.

### A. Create two project Skills

**Skill 1 — `/skills/card-template-generator/SKILL.md`**
Encode Section 6.A's six-parameter framework (Industry/Persona, Motif Object, Material/
Texture, Motion Tier 0/1/2, Style-Tone axis, Field Additions) plus Section 12's rule
that Phase 2 templates are content-only-editable with locked theme/motif/palette. This
skill should trigger whenever Antigravity is asked to build or spec a new card template,
so every future template (beyond the ~76 already specced across Phase 1 + Phase 2) gets
built to the same discipline without re-explaining it each time.

**Skill 2 — `/skills/design-system/SKILL.md`**
Encode the full contents of `design-system-theme-upgrade.md` — the color tokens,
typography scale, spacing/radius/elevation values, component behavior baseline, and the
"no more than 2 accents per screen, magenta-pink reserved for primary actions only"
rules. This skill should trigger on any UI-building task across admin, portal, marketing
site, and default/neutral card templates, so color and spacing decisions stay consistent
without re-pasting the theme doc into every prompt.

Building these as Skills (not just referencing the markdown files ad hoc) means later
Phase 2 prompts can be much shorter — "build W6 per the card-template-generator skill
and design-system skill" — instead of restating constraints every time.

### B. Connect MCP servers and tools for genuinely good UI (not generic AI output)

Generic-looking AI UI (the exact problem flagged earlier in this conversation) is a
known, named failure mode — and there are specific tools built to fix it. Set these up
before building any template component:

1. **shadcn/ui MCP server + skill** — gives Antigravity live access to a real,
   professional component registry (current prop signatures, current patterns) instead
   of guessing from stale training data.
   ```
   claude mcp add shadcn -- npx shadcn@latest mcp
   npx skills add shadcn/ui
   ```
   Use shadcn components as the base building blocks for admin panel, client portal,
   and marketing site UI (buttons, inputs, dialogs, cards) — NOT for the animated card
   templates themselves, which are bespoke per Section 8/12, but shadcn is exactly
   right for the surrounding product UI.

2. **A frontend-design skill/plugin** (Anthropic's built-in `frontend-design` skill, or
   equivalent — e.g. AIDesigner MCP) — this is specifically built to counter the
   "default LLM look" (generic Inter font, purple gradient, predictable card-grid hero)
   by generating with real visual taste: deliberate type pairing, single dominant
   accent color, asymmetric layout, atmospheric depth. Pair this with Skill 2 above so
   its output is constrained to your actual palette (white/off-white/grey/dark-blue/
   light-blue/aqua/pink/magenta-pink/light-pink) rather than inventing its own.

3. **Figma MCP server** (optional, only if you or a designer will produce reference
   mockups in Figma at any point) — lets Antigravity read actual design files, layout
   structure, and design tokens directly rather than working from screenshots or
   descriptions. Worth connecting even just for the eventual mockups of the Tier-2
   signature-animation templates (T9 Photographer, etc.) where getting the timing/
   composition right benefits from a real visual reference first.
   ```
   claude mcp add --transport http figma https://mcp.figma.com/mcp
   ```

4. **Playwright MCP** — use this for the mobile-viewport verification called for
   throughout Section 8 and Section 11 ("test at 375px on a real mid-range device or
   throttled emulator before marking it done"). Playwright MCP lets Antigravity take
   its own screenshots and verify layout/animation behavior at target viewports as part
   of finishing each template, rather than that check being a manual afterthought.

### C. Adjusted prompt discipline going forward

With Skills and MCP servers in place, every subsequent template-build prompt (Section
6.B, Section 12) should be run with this framing added at the top:

```
Use the card-template-generator skill and the design-system skill for this build.
Use shadcn/ui components for any surrounding UI chrome (not the card's own
animated content). Use the frontend-design skill/tooling to avoid generic/default
AI UI patterns — this template needs to feel bespoke to its industry/occasion, not
like a stock template. Verify the result at a 375px mobile viewport using Playwright
before marking this template done.
```

---

## Execution Rules — Model Assignment & Guardrails (Claude Opus 4.6 / Gemini 3.6 Flash)

Antigravity can run different prompts on different models. This plan's prompts split
cleanly into "needs judgment/taste" vs "needs speed/volume" — assign accordingly rather
than running everything on one model by default.

### A. Model assignment

**Run on the reasoning-tier model (Claude Opus 4.6):**
- Prompt 2 (schema design) — this is the one place a wrong call is expensive to unwind
  later; get it right once, deliberately.
- Prompt 3 (auth/role system) — security-relevant, needs careful judgment, not speed.
- The FIRST build of any Tier-2 signature animation (T9 Photographer in Phase 1; the
  first Tier-2 template in each Phase 2 category) — this is where animation timing,
  easing, and sequencing decisions get made that every later "template family" member
  will copy. Get the proof-of-concept right with the more capable model.
- Section 8's revised Prompt 4/6/7 architecture prompts — structural decisions about
  how the config-form + live-preview + component registry fit together.
- Any prompt touching the Devotional category (12.4) — the "restraint over spectacle"
  judgment calls there benefit from a more careful model, not a fast one.
- The design-system and card-template-generator Skills themselves (Start Here, Section
  A) — these are the constraints every other prompt inherits, so get them precise.

**Run on the fast-tier model (Gemini 3.6 Flash):**
- Template FAMILY members — once a Tier-2 animation mechanism is proven (T9, or a
  category's first signature template), building its siblings (T6, T8, T10/T11, and
  most of Section 12's 60+ specs that explicitly reuse an animation family) is
  asset-swapping against a known-good pattern, not new judgment. This is exactly
  the volume/speed workload Flash-tier models are suited for.
- Tier-0 static templates (T1, T2, T3, T5, T12, T14, and their Section 12
  counterparts) — no animation timing risk, mostly layout + content.
- CRUD/admin screens once the pattern is established (e.g. Prompt 9's admin oversight
  screens, once Prompt 6/8's shared config-form component already exists to reuse).
- Content/copy variants (e.g. the regional wedding template family in W1–W8, or
  festival calendar variants like F13) — swapping motif/palette assets per the
  cross-cutting rule in Section 13.2, once the base component is Opus-approved.
- Routine hardening tasks in Prompt 10 (input validation, rate limiting, upload
  size/type checks) — mechanical, well-specified work.

**Rule of thumb:** if a prompt is establishing a NEW pattern (schema shape, animation
mechanism, architecture decision), use the reasoning-tier model. If a prompt is
REPLICATING an already-approved pattern with swapped assets/content, use the fast-tier
model. When in doubt, default to the reasoning-tier model — the cost of a bad pattern
propagated across 12+ template-family members is much higher than the cost of running
one extra prompt on a slower model.

### B. Cross-model consistency guardrails

Since two different models will touch this codebase, these rules exist so neither
model drifts from what the other established:

1. **Skills are the source of truth, not memory.** Every prompt — regardless of which
   model runs it — must explicitly invoke the `card-template-generator` and
   `design-system` skills (per Section C above) rather than relying on the model's own
   recollection of earlier conversation turns. This is what keeps output consistent
   across a model switch.
2. **No model may modify the Prisma schema (Section 1) without a human-reviewed
   checkpoint**, regardless of tier. Schema drift introduced by a fast/cheap pass is
   the single most expensive mistake to make in this plan.
3. **No model may alter `design-system-theme-upgrade.md`'s token values.** Both models
   consume the design-system skill; neither is authorized to redefine it mid-project.
   Palette changes are a human decision, made once, updated deliberately.
4. **Every template, regardless of which model built it, must pass the same
   Playwright 375px mobile-viewport check (Section B.4) before being marked done.**
   Speed-tier output does not get a lower verification bar.
5. **Family-based templates must cite their parent.** When a fast-tier model builds a
   template-family member (e.g. T11 Silver Elegance from T10 Gold Radiance), the
   prompt should explicitly say "duplicate T10's structure, re-theme per T11's spec" —
   never "build Silver Elegance from scratch," even though it's faster to specify
   loosely. Loose specs are exactly where a fast model reintroduces the generic look
   this whole plan is trying to avoid.
6. **Checkpoint discipline (Section on "Notes for whoever runs these prompts")
   applies regardless of model** — sequential order, manual review after Prompt 4/6,
   mobile testing per template — these are process rules, not model capabilities, and
   hold regardless of which tier executed the work.
7. **If either model proposes deviating from this plan's architecture** (e.g.
   reintroducing a canvas-based editor, adding a new top-level domain/subdomain not
   in Section 0.1, or changing the config-only editing model in Section 12's rule 1),
   treat that as a stop-and-ask-the-human moment, not an autonomous decision — this
   applies equally to both models.

---

## 0. Core Principle Before Any Code

Phase 1 must be built on the **final data model**, even though only a fraction of it is used.
That means: templates, categories, tags, and field-schemas are designed for the full system
(business cards + all invitation types) from day one — but Phase 1 only *populates and exposes*
the business-card slice of it. Phase 2 becomes "add templates + add UI screens," not "rebuild schema."

The rule for every prompt below: **build generic, ship narrow.**

### 0.1 Two-domain architecture (locked in from Prompt 1)

Based on the competitor teardown and your own requirements, the site splits into two
distinct surfaces from day one:

1. **Main site** (`yourbrand.com`) — marketing/storefront. Front page, full category
   pages (Wedding, Baby & Kids, Party, Puja/Path, Festival Wishes — built out fully in
   Phase 2, but the *routing structure* is reserved now), admin login, client login.
   Visitors reach the template gallery **only via a small footer link**, scrolled to
   the very bottom — never promoted in the main nav, never the primary CTA. This
   matches the competitor's mega-nav pattern being available to us as reference
   taxonomy, but our funnel intentionally does NOT put template-browsing front and
   center the way theirs does, since our product is the finished card, not the
   shopping cart.
2. **Card-serving subdomain** (`cards.yourbrand.com`, or similar — pick once and lock
   it) — this is where every live client card actually resolves
   (`cards.yourbrand.com/{slug}`), separate from the marketing domain. This keeps:
   - QR codes and printed material pointing at a stable, lightweight, fast-loading
     surface that never gets weighed down by marketing site changes
   - A clean separation for caching/CDN rules (card pages are public, high-traffic-
     per-card, and simple; the marketing site is not)
   - Room to eventually put the client portal itself on a third subdomain
     (`app.yourbrand.com`) later without disturbing either of the above — not required
     now, just noting the pattern holds

Both the client portal and the admin panel can generate/preview links using the
subdomain from Prompt 1 onward, even though Phase 1 only has one card type.

---

## 1. Data Model (design once, use partially)

Give Antigravity this schema description before Prompt 1 as a system-level constraint.

```
User (auth)
  - id, phone, password_hash, role [admin | client], created_at

Category
  - id, name, slug, parent_id (nullable, self-referencing)
  - examples now: "Business Card"
  - examples later: "Wedding", "Baby & Kids", "Party", "Puja/Path", "Festival Wishes"

Tag
  - id, name, slug, type [format | design | style | religion | occasion]
  - Phase 1 uses none of these yet, but the table exists

Template
  - id, name, category_id, thumbnail_url, canvas_json (layout/design data)
  - status [draft | published]
  - created_by (admin user)

TemplateTag (join table)
  - template_id, tag_id

FieldSchema  (defines what's editable per template)
  - id, template_id, field_key, field_type [text | image | date | address | logo]
  - editable_by [admin_only | client]
  - required [bool]

CardInstance  (a client's actual card, cloned from a template)
  - id, template_id, owner_user_id, slug (public URL), status [active | archived]
  - data (JSON — actual field values keyed by field_key)
  - created_at, updated_at

QRCode
  - id, card_instance_id, target_url (stable — points to /c/{slug})

AuditLog (optional but cheap to add now)
  - id, card_instance_id, changed_by, field_key, old_value, new_value, timestamp
```

Why this matters for Phase 2: a wedding invitation template just uses more `FieldSchema` rows
(date, venue, RSVP) and gets tagged with `occasion: wedding`. No new tables required.

---

## 2. Prompt-by-Prompt Sequence

Each prompt below is meant to be pasted to Antigravity **one at a time**, in order. Wait for each
to complete and verify before moving to the next. Where noted, review manually before proceeding.

---

### PROMPT 1 — Project scaffold

```
Set up a new full-stack web project with the following stack:
- Frontend: React + TypeScript
- Backend: Node.js + Express (or Next.js API routes if using Next.js — decide and stay consistent)
- Database: PostgreSQL with Prisma ORM
- Auth: JWT-based, phone number + password
- File storage: local /uploads folder for now, structured so it can be swapped for S3 later

Create the folder structure:
/apps/web        -> main marketing site + admin panel + client portal (yourbrand.com)
/apps/cards      -> lightweight card-serving app, deployed to a separate subdomain
                     (cards.yourbrand.com) — minimal dependencies, fast cold-start,
                     no admin/marketing code in this bundle
/packages/schema -> shared Prisma schema + generated types (imported by both apps)

Set up local subdomain routing for dev (e.g. yourbrand.local and
cards.yourbrand.local via hosts file or a dev proxy) so the two-domain split is
real from the first commit, not bolted on later.

IMPORTANT AMENDMENT: unlike the earlier draft of this plan, animated/motion
templates (scissors snipping, steam rising, shutter click, shine sweep, etc.)
are now in scope for Phase 1 — see Section 6. This means the canvas engine
(built in Prompt 4) and the public card renderer (built in Prompt 7) must
support a lightweight animation layer from the start, not defer it to Phase 2.
Scaffold both apps with this in mind: include an animation-capable rendering
approach (SVG + CSS keyframes for simple loops/triggers, with Lottie-JSON
support as a drop-in element type for anything more complex) rather than a
purely static canvas library assumption.

Do not build any UI yet. Just scaffold both apps, set up the dev environment,
and confirm each boots with a placeholder "Hello World" page and a working
health-check API endpoint (GET /api/health) on both.
```

**Checkpoint:** confirm project boots locally before continuing.

---

### PROMPT 2 — Database schema (full future-proof model)

```
Implement the following Prisma schema exactly as specified [paste the schema from
Section 1 above, converted to Prisma syntax]. Run the migration. Seed the database
with:
- One admin user (phone: <your test number>, password: <test password>)
- One Category row: name "Business Card", slug "business-card"

Do not seed any Template, Tag, or CardInstance rows yet — that comes later.

Confirm the migration runs cleanly and the seed data is visible via a simple
Prisma Studio or DB query.
```

**Checkpoint:** verify tables exist and seed data is correct.

---

### PROMPT 3 — Auth system (admin + client roles)

```
Build the authentication system:
1. POST /api/auth/register — creates a client user (phone + password). Role
   defaults to "client". Admins are never created through this endpoint —
   only seeded directly in the DB for now.
2. POST /api/auth/login — accepts phone + password, returns a JWT.
3. Middleware: requireAuth (any logged-in user) and requireAdmin
   (role === 'admin' only).
4. Frontend: simple login page and register page (client-facing only —
   no public admin registration UI). Store JWT in memory/httpOnly cookie,
   redirect to a placeholder dashboard on success.

Do not build the dashboard UI yet beyond a blank authenticated page that
shows "Logged in as {phone} ({role})".
```

**Checkpoint:** test login as admin and as a newly registered client. Confirm role-based
route protection works (client cannot hit admin-only endpoints).

---

### PROMPT 4 — Admin: Template Builder (business-card templates only, but generic engine)

```
Build the admin template builder. This must be a GENERIC canvas-based editor,
not hardcoded to business cards — but for now it will only be used to create
business card templates.

Requirements:
1. Admin-only route /admin/templates
2. List view: shows all templates with thumbnail, name, category, status
   (draft/published)
3. "New Template" flow:
   - Admin picks a Category (dropdown — will only show "Business Card" for now)
   - Admin names the template
   - Canvas editor opens: use Fabric.js or Konva.js for drag/drop of:
     text blocks, image/logo blocks, shape/background elements
   - Admin can mark any element as a "field" — this creates a row in
     FieldSchema. When marking a field, admin sets:
       - field_key (e.g. "full_name", "phone_number", "address", "logo")
       - field_type (text | image | date | address | logo)
       - editable_by (admin_only | client) — for business cards, default
         name/title/company/phone/email/address/logo all to "client"
   - Save button stores canvas_json + generates a thumbnail + writes
     FieldSchema rows
4. Admin can toggle template status: draft -> published

Do NOT build tag filtering UI yet (Tag table exists in DB but is unused
in this prompt). Do NOT build multi-category navigation yet — category
dropdown will just have one option.
```

**Checkpoint:** create 3–5 real business card templates through this UI. Confirm
canvas_json + FieldSchema save/load correctly.

---

### PROMPT 5 — Public Template Gallery (footer-linked, read-only) + reserved category routes

```
Build a public, no-login-required template gallery at /gallery on the MAIN site
(yourbrand.com), on apps/web — not on the cards subdomain.

Requirements:
1. Shows all templates where status = "published", filtered to
   category = "Business Card" only for now (write the filter generically
   by category_id so it's ready to show more categories later — just don't
   expose category switching UI yet).
2. Grid of thumbnails + template name.
3. Clicking a template shows a larger preview (read-only render of
   canvas_json — no editing).
4. Add a small "View Templates" link ONLY in the site footer, placed low,
   after scrolling — this must NOT appear in the main navigation, header,
   or any primary CTA anywhere on the site. It is a secondary, low-emphasis
   entry point by design.
5. Add a "Contact us to get this design" CTA button on each template detail
   page — for now this can just be a mailto: or WhatsApp link using the
   business's contact number.
6. Reserve (but do not build out) the route pattern /category/{category-slug}
   — for now this can redirect straight to /gallery filtered by that
   category, since only "business-card" exists. This route pattern is what
   Phase 2 will expand into full category landing pages (Wedding, Baby &
   Kids, Party, Puja/Path, Festival Wishes) without changing the URL
   structure or breaking any links already shared/indexed.

This gallery must NOT be the main experience — it is secondary content.
Keep it visually minimal. The logged-in client portal (built in Prompt 8)
will ALSO be able to browse this same gallery/category data via an internal
authenticated view when choosing/switching a card design — build the data-
fetching logic so it's reusable between the public gallery and the future
client-facing template picker, not duplicated.
```

**Checkpoint:** confirm gallery loads only published templates, unpublished ones stay hidden.

---

### PROMPT 6 — Card Instance creation (admin creates a card for a client)

```
Build the flow for an admin to create a business card instance for a client.

Requirements:
1. Admin-only route /admin/clients
2. Admin can search/create a client user by phone number (if the client
   doesn't have an account yet, admin creates one here — this reuses the
   POST /api/auth/register logic but admin-triggered, and admin sets an
   initial password the client can later change)
3. Admin selects a client, clicks "New Card", picks a published Business
   Card template
4. This creates a CardInstance row: clones the template's FieldSchema keys
   into an empty `data` JSON object, generates a unique slug (e.g. random
   8-char string), and sets owner_user_id to the client
5. Admin is taken to a card-editing screen: same canvas as the template
   builder, but now only fields marked editable_by = "admin_only" OR
   "client" are shown as fillable inputs (not raw canvas manipulation) —
   admin fills in initial values (name, phone, address, logo, etc.)
6. Save updates CardInstance.data
7. A QRCode row is auto-created pointing to /c/{slug}

This "fill in the fields" editing screen (step 5) is the SAME component
you will later expose to clients directly — build it as a reusable
component now, not admin-specific code.
```

**Checkpoint:** admin creates a client, creates a card, fills in fields, saves. Confirm QR
code slug and stable URL are generated.

---

### PROMPT 7 — Public Card View (what a QR scan shows)

```
Build the public card view at cards.yourbrand.com/{slug} — this lives in
apps/cards (the separate subdomain app scaffolded in Prompt 1), NOT in
apps/web. No login required.

This app should stay deliberately thin: it needs read access to CardInstance,
Template, and FieldSchema data (via the shared Prisma client from
packages/schema) but should not import any admin, auth-management, or
marketing-site UI code. Its only job is to render one card fast.

Requirements:
1. Renders the CardInstance using canvas_json as the layout and `data`
   as the field values — this is the live, current version of the card.
2. If the field type is "address", render it as a tappable link to
   Google Maps using the stored address text (use a maps search URL,
   no API key needed yet: https://www.google.com/maps/search/?api=1&query={encoded_address}).
3. Add a small "Save Contact" button that generates a downloadable .vcf
   (vCard) file from the card's name/phone/email/company — standard
   business card behavior.
4. Add a "Download as Image" button (render canvas to PNG).
5. Page must be mobile-first and fast-loading — this is what people see
   after scanning a printed QR code.
6. QRCode.target_url (created back in Prompt 6) must point to
   https://cards.yourbrand.com/{slug} — update Prompt 6's QR generation
   if it was scaffolded against the wrong domain.
```

**Checkpoint:** scan-test with an actual QR code generator pointed at a real slug on a phone.

---

### PROMPT 8 — Client Portal (self-service editing)

```
Build the client-facing portal at /dashboard on the MAIN site (apps/web),
requireAuth, role=client. Login stays simple: phone number + password only
(no OTP, no email, no social login) — this matches the auth system already
built in Prompt 3, reused as-is.

Requirements:
1. Lists all CardInstances owned by the logged-in client (most clients
   will have exactly one, but support multiple from day one).
2. Clicking a card opens the SAME field-editing component built in
   Prompt 6, but now scoped so the client can only edit fields marked
   editable_by = "client" (never "admin_only").
3. Card detail view shows: live preview, the QR code (downloadable as
   PNG/SVG), the public share link (/c/{slug}), and a "Download Image"
   button.
4. Add a basic "Change Password" screen.
5. Every field save should write an AuditLog row (already in schema)
   for basic traceability.
```

**Checkpoint:** log in as a client, edit name/logo/address, confirm the public /c/{slug} page
reflects changes immediately (same QR, updated content — this is the core "living card" behavior).

---

### PROMPT 9 — Admin oversight + polish

```
Add the following to the admin panel:
1. /admin/cards — list ALL card instances across all clients, with
   search by client phone/name, filter by category, and the ability
   for admin to open and edit ANY client's card directly (admin override,
   using the same shared field-editing component).
2. Basic dashboard stats: total templates, total published templates,
   total clients, total active cards.
3. Confirm role checks are airtight: a client hitting any /admin/* route
   or API endpoint must get a 403, not a silent failure.
```

**Checkpoint:** full manual QA pass — try to break role boundaries as a client user.

---

### PROMPT 10 — Phase 1 hardening (do this before considering Phase 1 "done")

```
Perform a hardening pass:
1. Input validation on every field type (especially phone/email/address
   fields) on both frontend and backend.
2. Rate limiting on /api/auth/login and /api/auth/register.
3. Ensure canvas_json rendering on the public /c/{slug} page has no
   ability to execute arbitrary script (sanitize any user-input text
   fields rendered into the canvas).
4. Add basic error boundaries and loading states across all screens
   built so far.
5. Confirm all image uploads (logo, etc.) are size-limited and type-
   validated (jpg/png/webp only).
6. Write a short README documenting: the FieldSchema field_type enum,
   the editable_by enum, and how a new Category + Template gets added —
   this becomes the onboarding doc for whoever starts Phase 2.
```

**Checkpoint:** Phase 1 is feature-complete and hardened. Ship it.

---

## 3. Phase 2 — What "joins on" without touching Phase 1

Once Phase 1 is live, Phase 2 prompts (to be written in detail later, once Phase 1 usage
data/feedback comes in) will only need to:

1. **Add new Category rows** (Wedding, Baby & Kids, Party, Puja/Path, Festival Wishes) —
   no schema change.
2. **Add Tag rows and TemplateTag associations** for the format/design/style/religion axes
   discussed earlier — table already exists, just start populating it.
3. **Extend the admin template builder's category dropdown** to show the new categories —
   the builder itself is already generic (built in Prompt 4).
4. **Add new FieldSchema field_types as needed** (e.g., "rsvp_toggle", "event_datetime_multi"
   for multi-ceremony invites) — additive enum values, not structural changes.
5. **Build filter UI on the public gallery** (Prompt 5's gallery already reads by category_id
   generically — Phase 2 adds a category switcher + tag filters on top of the same query
   pattern).
6. **Add video/animated template support** (Lottie) as a new canvas element type in the
   template builder — additive, not a rewrite.
7. **Add occasion-specific public card behaviors** (RSVP counter, event countdown, "add to
   calendar" button) as new render components triggered by field_type — same pattern as the
   "Save Contact" vCard button and Maps link built in Prompt 7.

Nothing in Phase 1's data model, auth system, or core editing component needs to change.
Phase 2 is additive rows and additive UI, not a migration.

---

## 4. Appendix — Competitor Reference for Phase 2 (do not action in Phase 1)

Pulled from a full teardown of a live competitor (VideoGiri). This is reference material
for when Phase 2 category/taxonomy/pricing/UI-polish prompts get written — nothing here
should influence Phase 1 scope or sequencing above.

### 4.1 Category taxonomy to reuse (maps directly onto the Category + Tag tables)
- **Formats** (Tag type `format`): eCard, PDF (multi-page), Video (landscape + vertical),
  GIF, Website Invitation
- **Event types** (Category, top-level): Wedding & Pre-Wedding, Baby & Kids, Parties &
  Gatherings, Festivals & Devotional
- **Religion/culture** (Tag type `religion`): Hindu, Muslim, Sikh, Christian, Jain,
  Buddhist — plus regional: Punjabi, Rajasthani/Marwari, Bengali, South Indian, Marathi,
  Gujarati
- **Design style** (Tag type `style`): Caricature/Portrait, Traditional/Floral/Elegant,
  Customized Story/Timeline/Itinerary, Destination/Beach/Skyline

This confirms the four-axis tagging approach already designed into the schema (Section 1)
is the right shape — no schema change needed when this gets populated in Phase 2.

### 4.2 Pricing benchmark (for Phase 2 commercial model — not relevant while cards are
account-based/editable rather than one-off purchases, but useful context if you ever
introduce a "buy this specific design outright" option)
| Product type | Sale price (INR) | Anchor price | Discount shown |
|---|---|---|---|
| Static eCard/PDF | ₹599–799 | ₹800–1,100 | ~25–27% |
| Standard video invite | ₹999–1,499 | ₹2,000–2,500 | ~40–50% |
| Premium/caricature video | ₹1,799–3,999 | ₹2,800–5,000 | ~20–36% |

Note this is a one-off-purchase pricing model (anchor pricing, cart-based). Your product
is account-based and editable over time, so this maps more naturally to a future
"one-time design fee" or "starting from ₹X" framing on the public gallery than to a literal
cart/checkout flow — decide this deliberately in Phase 2 rather than copying their commerce
mechanics wholesale.

### 4.3 UI/UX polish backlog (explicitly Phase 2+, several are "nice to have, not urgent")
- Product card hover-swap (secondary image on hover)
- Discount badges on thumbnails (only relevant if a purchase-pricing model is adopted)
- Predictive/autocomplete search across templates
- Voice search (low priority — nice-to-have, not a differentiator worth early effort)
- Filter sidebar: price range, format, color theme, style — only worth building once
  template count justifies it (see Section 3, point 5 — 50+ templates)
- Rotating announcement bar for site-wide messaging
- Multi-currency selector — only relevant if/when expanding beyond India
- AI chat widget for support/FAQ — evaluate as a Phase 2+ addition, not core

None of Section 4 should be pulled into Phase 1 prompts. It exists so that when Phase 2
prompts are written, category names, tag values, and the general shape of the "full
category pages" mentioned in Section 0.1 don't need to be re-researched from scratch.

---

---

## 6. Phase 1 Template Library — Business Card Starter Set

This is the actual content to create through the admin template builder (Prompt 4)
once it's working. It's split into (A) a reusable **template-generation skill** — a
fill-in-the-blanks framework so you (or Antigravity) can spec any future industry the
same way — and (B) the specific templates you listed, filled out against that
framework.

### 6.A The Template-Generation Skill (reusable framework)

Every business card template gets defined against these six parameters. Fill this out
BEFORE writing the build prompt for any template — this is the "skill":

```
1. INDUSTRY / PERSONA — who is this for?
2. CORE MOTIF OBJECT(S) — the physical thing that signals the trade at a glance
   (scissors, stethoscope, camera, coffee cup, gemstone, receipt roll...)
3. MATERIAL / TEXTURE THEME — what surface or substance defines the visual world
   (wood grain, layered paper, woven rope, brushed metal, marble, linen...)
4. MOTION TIER — how much animation:
   - Tier 0 (Static/Minimalist): no motion, clean layout, motif as a flat icon/line-art
   - Tier 1 (Micro-motion): one subtle looping detail (e.g. gentle steam wisp, soft
     shine sweep) — low cost, high polish
   - Tier 2 (Signature animation): one clear, on-brand animated moment tied to the
     motif (scissors snip, shutter click + photo slide, tooth polish sparkle) —
     triggered on page load, loops once or twice, then settles to a static state
5. STYLE-TONE AXIS — pick a position on each of two independent sliders:
   - Classic/Local <-----> Modern/Elegant
   - Minimal <-----> Ornate/Graphic-rich
   (This means most industries below should ship as 2 variants minimum: one
   classic/local + one modern/elegant, so a barbershop in a small town and a
   high-end salon in a metro both find something that fits.)
6. FIELD ADDITIONS — does this trade need any field beyond the standard business
   card set (name, title, company, phone, email, address→maps, logo)? e.g. a clinic
   card might want "specialization" as an extra text field; a jeweler might want a
   tagline field for "Since 1985" etc. Keep these OPTIONAL fields, never required,
   so the base FieldSchema stays consistent across all templates.
```

Every prompt in Section 6.B below is this framework, pre-filled, ready to hand to
Antigravity as a template-build task once the canvas engine (Prompt 4) supports
layered motifs + the animation tier described in Prompt 1's amendment.

**Sequencing note:** build ONE Tier 2 (signature animation) template fully first —
recommend Photographer (camera shutter) — end to end, including how the animation
element type gets stored in canvas_json and replayed on the public card page. That
proves the animation pipeline once. Every other Tier 1/Tier 2 template after that is
mostly asset-swapping against a proven pattern, not new engineering.

---

### 6.B Prompt-by-Prompt: The Requested Template Set

Each of these is a template-content prompt, meant to run AFTER Prompt 4 (admin
template builder) is working. Build them roughly in the order below — animation
complexity increases, so early ones bank confidence and reusable patterns.

---

**T1 — Minimalist/Modern base template (build first, before anything themed)**

```
Create a business card template called "Modern Minimal — Base."
Motion tier: 0 (static).
Style-tone: Modern/Elegant, Minimal.
Motif: none — this is the neutral template every other template's layout
borrows structure from.
Elements: clean sans-serif type, generous whitespace, a single thin accent
line or geometric corner mark, logo zone top-left, contact block bottom-right,
2–3 color-palette variants (monochrome, navy+gold accent, charcoal+white).
Fields: standard set only (name, title, company, phone, email, address, logo).
Purpose: this becomes the fallback recommendation for any client who wants
"just clean and professional," and the layout skeleton other templates deviate
from — build this first and use it to sanity-check the field-editing component
still works correctly across every subsequent template.
```

---

**T2 — Classic/Local base template**

```
Create a business card template called "Classic Local — Base."
Motion tier: 0.
Style-tone: Classic/Local, moderate ornamentation.
Motif: none.
Elements: a bordered card frame (thin double-rule border), a serif or classic
script for the business name, a small decorative corner flourish (simple line
art, not photographic), warm color palette (cream/maroon, cream/forest-green).
Fields: standard set.
Purpose: the counterpart to T1 — this is what a neighborhood shop, family-run
clinic, or local salon reaches for when "modern minimal" feels too cold for
their brand.
```

---

**T3 — Wooden Business Card**

```
Template: "Wood Grain Craft."
Motion tier: 0 (texture does the work, no animation needed).
Style-tone: Classic/Local leaning, Minimal-to-moderate.
Material/texture: photographed or high-quality illustrated wood-grain
background (light oak and dark walnut color variants), subtle laser-engraved
look for the business name (embossed/etched text effect using shadow +
highlight layering, not a literal 3D render).
Motif objects: none required, optional small engraved icon zone (leaf, tools,
or a custom logo carved-look) admin can swap per client trade.
Fields: standard set.
Elements checklist: wood texture background asset (2 tone variants), engraved-
text CSS effect (inner shadow + subtle highlight to fake a carved look),
optional small corner "grain knot" detail for realism.
```

---

**T4 — Paper Diorama Business Card**

```
Template: "Paper Diorama."
Motion tier: 2 (signature animation) OR 1 (micro-motion) — build the Tier 1
version first, upgrade to Tier 2 later if the effect proves worth the cost.
Style-tone: Modern/Elegant, Graphic-rich.
Concept: the card looks like layered cut-paper (2.5D) — background layer,
midground shapes (soft shadow between layers to sell depth), foreground motif
cut-out. On load, layers fade/slide into place with a slight stagger (back
layer first, then mid, then front) — this IS the Tier 1 micro-motion; Tier 2
would add a subtle continuous parallax on mouse-move/scroll, which is a later
polish pass, not required for launch.
Elements: 3 flat SVG layers minimum (background scene, midground silhouette,
foreground motif — motif swappable per industry later), drop-shadow between
layers to sell the "paper" depth, soft paper-texture grain overlay.
Fields: standard set.
```

---

**T5 — Rope-Styled Business Card**

```
Template: "Rope & Knot."
Motion tier: 0.
Style-tone: Classic/Local, Minimal-to-moderate — good fit for outdoors/trade/
craft businesses (carpentry, fishing charters, adventure guides, nautical
themes) as well as a "rustic craft" option for any trade.
Elements: rope-textured border framing the card (illustrated, not photo-
realistic, so it stays crisp at small sizes), one corner detail as a small
tied knot illustration, canvas or linen-texture background option, warm
earthy palette (tan/navy, tan/rust).
Fields: standard set.
```

---

**T6 — Salon (Scissors Animation)**

```
Template: "Salon Snip."
Motion tier: 2 (signature animation).
Style-tone: build 2 variants — Modern/Elegant (black/gold, sleek line-art
scissors) and Classic/Local (warm pastel, friendly rounded scissors icon).
Motif: a pair of scissors icon/illustration positioned near the business name.
Animation: on page load, the scissors "snip" once (blades close together,
tiny motion, ~0.4s), optionally with a thin decorative line being "cut" to
reveal the business name (line splits in two and slides apart as the name
fades in). Loops are NOT continuous — plays once on load, settles static.
Build as: SVG with 2 blade paths animated via CSS keyframe rotation around a
pivot point, or a small Lottie file if using Lottie for this — pick whichever
your Prompt 1 animation approach standardized on and stay consistent for all
Tier 2 templates.
Fields: standard set + optional "services" tagline field (e.g. "Hair · Color ·
Styling").
```

---

**T7 — Clinic (Heart + Stethoscope Animation)**

```
Template: "Clinic Care."
Motion tier: 1 (micro-motion) — recommend a gentle heartbeat pulse rather than
a complex scene, keeps it tasteful for a medical context (avoid anything that
reads as gimmicky in healthcare).
Style-tone: Modern/Elegant only for this one initially (clean, trustworthy,
clinical feel reads better than "local/rustic" for medical trust signals) —
optionally add a softer/warmer pediatric-friendly palette variant later.
Motif: a simple line-art heart icon with a subtle pulse-line (ECG-style
squiggle) running through/behind it, OR a stethoscope icon as an alternate
motif — offer both as selectable icon options within this one template rather
than building two separate templates.
Animation: heart icon has a slow, subtle scale pulse (1.0 -> 1.05 -> 1.0,
looping continuously but slowly and gently — this is calming, not attention-
grabbing) OR the ECG line "draws" once on load (stroke-dashoffset animation)
and then stays static.
Fields: standard set + optional "specialization" text field (e.g.
"Cardiologist," "General Physician").
```

---

**T8 — Dental Clinic (Tooth Animation)**

```
Template: "Dental Bright."
Motion tier: 1.
Style-tone: Modern/Elegant, clean and bright (white/mint/light-blue palette).
Motif: a simple line-art tooth icon.
Animation: on load, a small "sparkle/shine" (2–3 small star/glint shapes)
animates briefly near the tooth (appear + fade, staggered, ~0.6s total) to
suggest "polished/bright" — then settles static. Keep it subtle, not
cartoonish.
Fields: standard set + optional "specialization" field (e.g. "Orthodontics,"
"Pediatric Dentistry").
Note: this is intentionally a near-sibling of T7 (Clinic) — same layout
skeleton, swapped motif and palette — build it by duplicating T7's structure
rather than starting fresh, to prove the "template family" pattern (shared
skeleton, swapped motif/animation) that will save huge time as more industries
get added later.
```

---

**T9 — Photographer (Camera Shutter + Photo Slide-Out)**

```
Template: "Shutter Moment." — BUILD THIS FIRST among the Tier 2 templates
(see sequencing note in 6.A) since it proves the full animation pipeline.
Motion tier: 2 (signature animation).
Style-tone: build both variants — Modern/Elegant (black/white, sleek camera
line-art) and a warmer Classic/Local variant (vintage camera illustration,
sepia-leaning palette) for portrait/event photographers with a nostalgic
brand.
Motif: a camera icon/illustration, with a small rectangle representing a
"photo" positioned at the lens.
Animation sequence (on load, plays once):
  1. Camera icon appears static
  2. A brief "shutter flash" (quick white flash overlay, ~150ms) fires
  3. A small photo rectangle (can show the client's own logo or a generic
     placeholder photo icon) slides/ejects out from the camera body
     (translate + slight fade-in, ~0.5s, easing out)
  4. Settles static with the photo resting beside/below the camera
Build as: layered SVG or Lottie — the shutter-flash + slide-out sequence is
the most complex animation in this set, so this is the one to prototype the
timing/easing on first and reuse the technical pattern (trigger-on-load,
sequenced multi-step animation, settle-to-static) for every other Tier 2
template above and below.
Fields: standard set + optional "specialty" field (e.g. "Wedding
Photography," "Portraits & Events").
```

---

**T10 — Jeweler, Gold Plating**

```
Template: "Gold Radiance."
Motion tier: 1.
Style-tone: Modern/Elegant, Ornate (this trade generally wants richness, not
minimalism — lean into it).
Material/texture: gold-foil-look background panel or accent border (achieved
via a gold-toned gradient + subtle diagonal shine texture, not a literal
metallic render), deep jewel-tone background option (black, deep maroon,
emerald) behind the gold accents for contrast.
Motif: a small gemstone/diamond line-icon or an ornamental flourish frame.
Animation: a diagonal "shine sweep" — a soft light-colored gradient band
animates once across the gold-accented area (background-position or
transform translate across a masked gradient), ~1s duration, on load only.
Fields: standard set + optional tagline field (e.g. "Since 1985," "Certified
Gemologist").
```

---

**T11 — Jeweler, Silver Plating**

```
Template: "Silver Elegance."
Motion tier: 1.
Style-tone: Modern/Elegant, Ornate-to-moderate (slightly more restrained than
gold — silver often reads as more contemporary/minimal in jewelry branding).
Material/texture: cool-toned metallic gradient (silver/platinum), can pair
with a cooler background (charcoal, soft grey, or icy blue) instead of
jewel-tones.
Motif + animation: same shine-sweep pattern as T10 (Gold Radiance) — build by
duplicating T10's structure and re-theming the palette, same "template
family" logic as T7/T8.
Fields: standard set + optional tagline field.
```

---

**T12 — Shopkeeper (Bill/Receipt Styled)**

```
Template: "Receipt Style."
Motion tier: 0.
Style-tone: build both — Classic/Local (looks like an actual printed thermal
receipt: monospace font, dashed perforation edges top/bottom, small barcode-
style decorative line) and a Modern variant (cleaner take on the same idea —
receipt-shaped card outline but with regular sans-serif type and a QR-code-
styled decorative element instead of a barcode, since the card DOES have a
real QR code — nice thematic tie-in).
Elements: card shape/border mimics a receipt strip (straight sides, small
triangular/zigzag "torn edge" detail at top and bottom), monospace or
receipt-style font for at least the business name, thin horizontal divider
lines between contact fields (mimicking itemized receipt lines).
Fields: standard set.
```

---

**T13 — Cafe Owner (Coffee Steam Animation)**

```
Template: "Coffee Steam."
Motion tier: 1.
Style-tone: build both — Classic/Local (warm brown/cream, hand-drawn-style
coffee cup illustration) and Modern (flat minimal line-art cup, muted sage/
terracotta palette).
Motif: a coffee cup icon/illustration.
Animation: 2–3 thin curved "steam wisp" lines above the cup, animated with a
gentle continuous rise-and-fade loop (translateY upward while opacity fades
out, then resets — staggered timing per wisp so they don't move in unison).
This is a CONTINUOUS loop (unlike the Tier 2 templates which play once) since
steam is meant to read as ambient/alive, not a one-time reveal — keep the
motion slow and subtle so it doesn't distract from reading the card.
Fields: standard set + optional tagline field (e.g. "Est. 2019," "Specialty
Roast").
```

---

**T14 — Restaurant (Modern, Elegant)**

```
Template: "Restaurant Modern Elegant."
Motion tier: 0 or 1 (keep restrained — fine dining branding usually wants
confidence, not busy motion).
Style-tone: Modern/Elegant, Minimal-to-moderate.
Elements: sophisticated typography pairing (elegant serif for restaurant
name, clean sans for contact details), generous negative space, a single
refined accent element (a thin gold or monochrome line rule, or a minimal
line-art fork/knife/plate icon used sparingly, not as a dominant graphic),
dark palette option (black/gold) and light palette option (cream/charcoal).
Optional Tier 1 motion: if any animation is added at all, keep it to a
subtle fade-in of the accent line on load — nothing more.
Fields: standard set + optional tagline field (e.g. "Fine Dining," "Est.
2015," a cuisine type).
```

---

### 6.C What this means for admin template count going into launch

That's 14 templates across the requested industries plus 2 neutral base templates —
comfortably past the "3–5 templates to prove the editing flow" guidance in the
original Prompt 6 checkpoint, but each one after T9 (Photographer) is genuinely fast
to produce because it reuses either a base layout (T1/T2), a motion pattern already
proven (T9's animation pipeline, T7's pulse pattern), or both. Recommended build
order: T1, T2 (base skeletons) → T3, T5, T12, T14 (Tier 0, no animation risk) → T9
(prove the animation pipeline) → T6, T7, T8, T10, T11, T13 (apply the proven pattern,
swap motifs/palettes per the "template family" approach called out in T8 and T11).

---

## 8. ARCHITECTURE UPGRADE — Cards as Motion-Graphic Micro-Sites (supersedes canvas-based sections above)

**Why this change:** a drag-drop canvas engine (Fabric.js/Konva) generating flat card
"images" is exactly what makes output look generic and AI-templated — it's the same
mechanism every cheap card-maker uses, and it caps quality at "graphic design," never
reaching "real product." What you actually want is closer to Webflow/Squarespace: each
card is a genuine small **mobile-first website** — a scrollable page with real UI,
scroll-triggered reveals, tap/hover interactions, and actual motion-graphic sequences
(Framer Motion / GSAP / Lottie), served live at `cards.yourbrand.com/{slug}`. The
"template" is no longer a JSON layout an admin assembles by dragging shapes — it's a
**coded component**, built once by a developer (or by Antigravity, prompt by prompt),
that exposes a small config surface (text, images, colors, a couple of toggles) for
admin/client to fill in.

This also directly satisfies "sublinks domain, website usable as business card, birthday,
and all listed cards" — the component library is generic across card TYPE from day one;
Phase 1 just ships business-card-flavored components, Phase 2 adds invitation-flavored
ones to the same registry. No architecture change between phases, only more components.

### 8.1 What changes in the data model

```
Template  (revised)
  - id, name, category_id
  - component_key   <- replaces canvas_json. Points to a registered React
                        component in a Template Component Registry (a code
                        module, not DB-stored layout data)
  - config_schema    <- JSON describing the component's editable props:
                        [{ key, label, type [text|richtext|image|color|toggle|list],
                           editable_by [admin_only|client], required }]
  - thumbnail_url (a short looping preview GIF/MP4 is strongly preferred over
    a static thumbnail, since motion IS the product)
  - status [draft|published]

CardInstance  (unchanged in shape, meaning shifts)
  - data JSON now holds prop VALUES matched against the template's
    config_schema (e.g. { "heroName": "Studio Snip", "accentColor": "#111",
    "logoUrl": "...", "tagline": "Hair · Color · Styling" }), rather than
    raw canvas field values. Rendering = component_key's React component
    rendered with `data` as props.
```

`FieldSchema` as a separate table is now folded into `Template.config_schema`
(simpler — one JSON blob per template instead of a join table), since config shape is
inherently per-template and doesn't need cross-template querying the way tags do.

### 8.1.1 Rule: ALL visible text is a config field, none of it is hardcoded

This is a hard rule, not a suggestion — it fixes a real gap: without it, only the
"obvious" dynamic fields (name, date) end up editable, while decorative/fixed copy
baked into a template's code ("You're Invited," "RSVP," "With Love," a ritual name
label, a button's text) stays permanently hardcoded, unreachable by admin, and
untranslatable. For a market where most clients will want the ENTIRE card — not just
their own name — in Hindi or a regional script, that gap defeats the purpose.

```
Every string of visible text in a template component — whether it's client-
supplied content (name, date, venue) or fixed decorative copy the template
author wrote ("You're Invited", "RSVP", section labels, button text) — MUST
be defined as a field in that template's config_schema, never hardcoded
directly in JSX/component code.

Distinguish the two kinds by `editable_by` and `field_scope`:
  - Content fields: editable_by: "client" (or "admin_only" for fields like
    admin-set pricing/internal notes), field_scope: "instance" — these vary
    per CardInstance, exactly as already specced.
  - Copy fields (the decorative/fixed text): editable_by: "admin_only",
    field_scope: "template" — these have a sensible DEFAULT value written by
    whoever builds the template, are NOT re-entered per client/instance, but
    ARE editable by admin at the template level (change it once, every
    instance of that template picks up the change) — critically, this is
    what makes them translatable: admin can set a Hindi-language default for
    "आपको सादर आमंत्रित है" instead of "You're Invited" on a per-template
    basis, or maintain two published template rows (English copy + Hindi
    copy) sharing the same component_key/animation but different copy-field
    defaults, if a client wants that choice.

When any new template is built (Section 6.B, Section 12), the build prompt
must explicitly list its copy fields alongside its content fields — treat
"what decorative text does this template display, and what regional-language
default(s) should it have" as a required design question, not an afterthought
bolted on later.
```

This connects directly to Section 14.2's multi-language toggle: that feature handles
per-instance CONTENT translation (a specific client's name/venue in two scripts); this
rule handles TEMPLATE-level copy translation (the fixed decorative text every instance
of that template shares). Both are needed — a fully Hindi-language wedding card needs
both its host's name AND its "You're Invited" label in Hindi.

### 8.2 Revised Prompt 1 — Project scaffold (replaces original Prompt 1)

```
Set up a new full-stack web project with the following stack:
- Frontend: React + TypeScript using Next.js (App Router) — needed for good
  mobile performance, image optimization, and clean subdomain routing
- Animation: Framer Motion as the primary animation library (scroll-triggered
  reveals, tap/hover micro-interactions, layout transitions); Lottie-react as
  a secondary tool for any complex pre-authored animation sequences (e.g. a
  shutter-click + photo-eject sequence authored in After Effects/LottieFiles
  rather than hand-coded)
- Backend: Node.js + Express OR Next.js API routes (stay consistent)
- Database: PostgreSQL with Prisma ORM
- Auth: JWT-based, phone number + password
- File storage: local /uploads for now, S3-swappable later

Create the folder structure:
/apps/web              -> main marketing site + admin panel + client portal
/apps/cards            -> card-serving Next.js app on cards.yourbrand.com —
                           this is where the actual animated micro-sites render
/packages/templates    -> the Template Component Registry: one folder per
                           template, each exporting a React component + its
                           config_schema definition, imported by apps/cards
/packages/schema       -> shared Prisma schema + generated types

Mobile-first is not optional polish here — build and test every screen at a
375px viewport FIRST, then scale up. Most traffic to cards.yourbrand.com/{slug}
will be someone opening a link on their phone from WhatsApp.

Confirm both apps boot, and confirm /packages/templates can export a trivial
placeholder component that apps/cards can import and render — this import
path is the core mechanism the rest of the build depends on.
```

### 8.3 Revised Prompt 4 — Template Component Registry (replaces the old canvas-based "Admin Template Builder" prompt)

```
There is no drag-drop canvas editor. Templates are coded components. Build
the Template Component Registry and the first real template end to end:

1. In /packages/templates, establish the pattern: each template is a folder
   (e.g. /shutter-moment) containing:
   - index.tsx — the React component, built with Framer Motion (and Lottie
     if needed), accepting a strongly-typed `props` object matching its
     config_schema
   - schema.ts — exports the config_schema array (key, label, type,
     editable_by, required) for this template
2. Build template T9 "Shutter Moment" (Photographer) FIRST, fully coded,
   as the proof template — see Section 6.B's T9 spec for the animation
   sequence (shutter flash -> photo slide-out -> settle). This must be a
   real, smooth, mobile-tested animation, not a placeholder.
3. Build a small internal registry file (/packages/templates/registry.ts)
   that maps component_key strings to the actual component imports, so
   apps/cards can do `registry['shutter-moment'].component` and
   `registry['shutter-moment'].schema` dynamically.
4. In apps/web, build an admin-only /admin/templates screen that:
   - Reads the registry (via an API endpoint that lists available
     component_keys and their schemas — NOT a canvas editor)
   - Lets admin create a Template DB row by picking a component_key,
     naming it, assigning a category, and setting status draft/published
   - Shows a live embedded preview (iframe pointing at a preview route in
     apps/cards) so admin can see the actual animated component while
     naming/publishing it — this preview should accept placeholder/default
     prop values until a real CardInstance exists
5. Do NOT build a generic drag-drop layout editor. The "creativity" lives in
   the coded components (built via Section 6.B's prompts, one at a time);
   the admin's job is selecting, configuring, and publishing them.
```

### 8.4 Revised Prompt 6 — Card Instance creation (replaces old canvas-based version)

```
Rebuild the admin "create a card for a client" flow against the new model:

1. Admin picks a client (same client-creation logic as before).
2. Admin selects a published Template (now: picking a component_key-backed
   Template row, not a canvas template).
3. This creates a CardInstance with `data` initialized from the template's
   config_schema defaults (empty strings/placeholders per field).
4. Admin is taken to a CONFIG FORM (not a canvas) — dynamically rendered
   from the template's config_schema: text inputs for text/richtext fields,
   an image uploader for image fields, a color picker for color fields, a
   toggle switch for toggle fields. Next to the form, show a LIVE PREVIEW
   (the actual component, rendered client-side or via the apps/cards preview
   route) that updates as admin types/uploads — this live preview is
   important: it's how you avoid the "looks AI-made" problem, by letting
   admin see and feel the real animated result while filling it in, not
   guessing from an abstract form.
5. Save writes to CardInstance.data. A QRCode row is created pointing to
   cards.yourbrand.com/{slug}, same as before.

Build this config-form + live-preview component as a REUSABLE component —
it is the same UI the client will use in their own portal later (Prompt 8).
```

### 8.5 Revised Prompt 7 — Public Card micro-site (replaces old canvas-based version)

```
In apps/cards, build the route /{slug} (this app IS cards.yourbrand.com, so
no /c/ prefix needed — root-level slug routing).

1. Look up the CardInstance by slug, resolve its Template's component_key
   via the registry, render that component with CardInstance.data as props.
   This is now rendering a REAL animated webpage, not a static image/canvas
   export.
2. This must behave like an actual small website: smooth scroll if the
   template has multiple sections (e.g. hero + contact block), real tap/
   hover states (not just autoplay-once animations), and correct behavior
   on both first paint (initial animation sequence, e.g. T9's shutter
   sequence) and on return visits (settle to a clean static state after
   first play, don't re-trigger the full sequence every scroll).
3. Standard card utilities carry over: address field renders as a tappable
   Google Maps link, a "Save Contact" vCard download button, and a native
   mobile share button (Web Share API) — replacing the old "Download as
   Image" button, since the product is now a live page, not an image asset
   (still allow a "download as image" as a secondary/fallback option using
   a screenshot library, for anyone who insists on a printable static
   version).
4. Performance budget: this must load fast on mid-range Android phones over
   average mobile data — lazy-load any Lottie/heavy assets, keep initial
   bundle lean, test on throttled network conditions before calling this
   prompt done.
```

### 8.6 Revised Prompt 8 — Client Portal editing (update, not full replace)

```
Update the client dashboard (built against the old model) to use the new
config-form + live-preview component from revised Prompt 6, scoped so the
client only sees/edits config_schema fields marked editable_by: "client".
Everything else from the original Prompt 8 (card list, QR download, share
link, password change, audit log on save) stays the same — only the editing
surface itself changes from "canvas field editor" to "config form + live
animated preview."
```

### 8.7 Impact on Section 6's template list

Every template spec in Section 6.B stays conceptually correct (motif, motion tier,
style-tone, animation sequence) — what changes is HOW it gets built: instead of
"assemble shapes on a canvas," each one becomes a real coded component per Section
6.A's framework, with the config_schema replacing the "Fields" line in each spec
(e.g. T9's fields become: heroName [text], tagline [text], logoOrPhoto [image],
accentColor [color], variant [toggle: modern/vintage]). Build order stays the same
(T1/T2 → static ones → T9 to prove the motion pipeline → the rest).

---

## 10. Coverage Check — Confirming the 12+ Templates Requirement Is Met

Every template you listed is already speced in Section 6.B, and Section 8.7 confirms
each one gets built as a real animated website component (not a canvas graphic) under
the architecture upgrade — so the request "make a prompt for each of them" and "at
least 12 sample templates" are both already satisfied by what's above. Laid out
explicitly against the requested industries:

| # | Template | Industry match | Motion tier | Style-tone variant(s) built |
|---|---|---|---|---|
| T1 | Modern Minimal — Base | (neutral fallback, any trade) | 0 | Modern/Elegant, Minimal |
| T2 | Classic Local — Base | (neutral fallback, any trade) | 0 | Classic/Local, moderate |
| T3 | Wood Grain Craft | Wooden business card | 0 | Classic/Local |
| T4 | Paper Diorama | Paper diorama business card | 1 (upgradeable to 2) | Modern/Elegant |
| T5 | Rope & Knot | Rope-styled business card | 0 | Classic/Local |
| T6 | Salon Snip | Salon with scissors | 2 | 2 variants: Modern/Elegant + Classic/Local |
| T7 | Clinic Care | Clinic with heart / stethoscope | 1 | Modern/Elegant |
| T8 | Dental Bright | Clinic with tooth animation | 1 | Modern/Elegant |
| T9 | Shutter Moment | Photographer, camera + photo motion | 2 | 2 variants: Modern/Elegant + Classic/Local (vintage) |
| T10 | Gold Radiance | Jeweler, gold plating shine | 1 | Modern/Elegant, Ornate |
| T11 | Silver Elegance | Jeweler, silver plating shine | 1 | Modern/Elegant, moderate |
| T12 | Receipt Style | Shopkeeper, bill-styled | 0 | 2 variants: Classic/Local (thermal receipt) + Modern |
| T13 | Coffee Steam | Cafe, coffee + steam animation | 1 | 2 variants: Classic/Local + Modern |
| T14 | Restaurant Modern Elegant | Restaurant, modern/elegant | 0–1 | Modern/Elegant |

**14 base templates, several shipping 2 style-tone variants each** — so the actual
number of selectable designs in the Phase 1 gallery is **18+** once T6, T9, T12, and T13's
variant pairs are counted individually, comfortably past the "at least 12" bar. Nothing
new needs to be written — Section 6.B's prompts, run through Section 8's component-based
build process, deliver this as-is.

### 10.1 Standing rule for every future category (Phase 2 and beyond)

Lock this in now as a production quota, not a one-off for business cards: **every
category (Wedding, Baby & Kids, Party, Puja/Path, Festival Wishes, and any added later)
ships with a minimum of 12 distinct selectable templates before that category is
considered launch-ready**, following the same 6.A framework (motif, material/texture,
motion tier, style-tone axis, optional fields) and the same "prove one Tier-2 animation
first, then build the rest as a template family" sequencing used for T9 in Phase 1. When
Phase 2 prompts get written, budget for roughly a dozen 6.B-style specs per category from
the start, rather than discovering the gap late.

---

## 11. Notes for whoever runs these prompts

**Read Section 8 before running Prompts 4, 6, or 7 from Section 2** — those are
superseded by the architecture upgrade (canvas-based template building is replaced by
coded components). Prompts 1, 2, 3, 5, and 9 from Section 2 still apply as written
(auth, DB shell, gallery routing, admin oversight) — only Prompt 1 gets the stack
amendment in 8.2, and only the template mechanism itself changed.

- Run prompts strictly in order — later ones assume earlier components exist and are
  named consistently (reuse the exact config-form + live-preview component, don't
  rebuild it per screen).
- After building each new template component (Section 6.B), test it at a 375px mobile
  viewport on a real mid-range device or throttled emulator before marking it done —
  motion that feels smooth on a dev laptop can stutter badly on the phones most clients
  will actually view these on.
- Keep template count small (T1, T2, T9 first) until the config-form + live-preview
  editing flow (revised Prompt 6) is confirmed solid end to end — only then move through
  the rest of Section 6.B's list.

---

## 12. Phase 2 Template Library — Invitation Micro-Sites (reference for when Phase 2 is built)

Same rule as Phase 1: these are coded, animated micro-site components (per Section 8),
never a generic drag-drop canvas. **The theme, motifs, colors, and animation are locked
per template — admin/client only edit CONTENT fields** (name, partner/celebrant name,
date, venue, address→maps, phone, optional message/tagline, photo/logo upload). Nobody
customizes the design system of a template itself; they select the right template for
their occasion/religion/style and fill in their details.

Each entry below: **Motif/Decor** (the visual world), **Signature Animation** (the one
thing that makes it feel alive, not static), **Palette** (drawn from the global theme in
`design-system-theme-upgrade.md` where sensible, deviating deliberately where the
occasion demands it — e.g. Diwali needs warm gold/red, not aqua/pink).

### 12.1 Wedding & Pre-Wedding (target: 12+)

| # | Template | Motif/Decor | Signature Animation | Palette |
|---|---|---|---|---|
| W1 | Hindu Wedding — Mandap | Marigold garlands, mandap silhouette, small Ganesh motif | Diyas along the border flicker gently; marigold petals drift down slowly on load | Deep red, gold, cream |
| W2 | Sikh Wedding — Anand Karaj | Gurdwara dome silhouette, Khanda motif (subtle, respectful placement) | Soft golden glow pulse behind the dome; saffron ribbon accent gently waves | Saffron/orange, white, gold |
| W3 | Muslim Wedding — Nikah | Geometric Islamic lattice pattern border, crescent + star motif | Lattice pattern subtly "draws in" (stroke animation) on load, then settles static | Emerald green, gold, ivory |
| W4 | Christian Wedding | Floral arch, dove silhouette, elegant script | Two doves cross gently on load; a thin gold ring/vow-line animates once | White, ivory, soft gold |
| W5 | South Indian Wedding | Temple gopuram silhouette, banana leaf border accents, kolam pattern | Kolam/rangoli pattern "draws" once (line animation), like being sketched | Deep maroon, gold, temple-green |
| W6 | Punjabi/Bhangra Wedding | Phulkari embroidery-pattern background, dhol motif | Confetti-like colorful dot burst on load (energetic, matches bhangra spirit) | Vibrant pink, yellow, orange, teal |
| W7 | Rajasthani Royal Wedding | Palace arch silhouette, peacock feather motif | Peacock feather "eye" subtly shimmers/glints once | Royal blue, gold, magenta |
| W8 | Bengali Wedding | Conch shell + shankha-pola bangle motif, alpana pattern border | Alpana pattern draws in once, similar to W5's kolam but distinct pattern | Red, white, gold |
| W9 | Floral Romantic (any-religion) | Soft blooming flower illustrations framing the card | Flowers gently "bloom" (scale + fade in) staggered on load | Blush pink, sage green, cream |
| W10 | Modern Minimalist Wedding | Thin line-art floral or geometric corner accents only | Subtle fade/slide-in of the accent line, nothing more — for couples wanting restraint | Off-white, dark-blue, light-pink accent |
| W11 | Destination/Beach Wedding | Wave line-art, sunset gradient background | Waves gently animate (subtle horizontal motion loop), sun glow pulses softly | Coral, sand, deep teal |
| W12 | Engagement / Ring Ceremony | Ring illustration, soft sparkle accents | Ring sparkle animates once (2–3 glint shapes appear/fade near the ring) | Rose gold, blush, white |
| W13 | Save-the-Date / Countdown | Calendar icon or simple date-block layout | A day-count number subtly ticks/updates if a target date is set (live countdown, not just decorative) | Matches whichever companion wedding template it pairs with |

### 12.2 Baby & Kids (target: 12+)

| # | Template | Motif/Decor | Signature Animation | Palette |
|---|---|---|---|---|
| B1 | Baby Shower | Floating baby items (bottle, booties, rattle) | Items gently float/bob in a slow loop | Soft blue/pink duo-tone, cream |
| B2 | Naming Ceremony (Hindu) | Om symbol, small diya, marigold accents | Diya flame flicker (subtle, continuous) | Cream, gold, soft orange |
| B3 | Cradle Ceremony | Illustrated cradle/jhula | Cradle gently swings on a slow loop | Pastel yellow, mint |
| B4 | Birth Announcement | Stork + bundle, or simple balloon cluster | Balloons/stork drift upward gently on load, then settle | Soft pastel palette (parent-selectable tint) |
| B5 | 1st Birthday — Krishna Theme | Peacock feather, flute, small Krishna silhouette (respectful, simple line-art) | Peacock feather sways gently; a few "flute notes" (small musical note shapes) float up | Peacock blue, gold, yellow |
| B6 | Kids Birthday — Superhero | Cape silhouette, city skyline line-art | Cape flutters gently in a loop; a small "burst" star shape pulses once | Bold red/blue, or client-selectable hero-color variant |
| B7 | Kids Birthday — Princess | Tiara/crown line-art, soft sparkle border | Sparkles twinkle (opacity pulse, staggered) continuously but subtly | Blush pink, lavender, gold |
| B8 | Kids Birthday — Jungle/Animal | Simple line-art animals (elephant, lion) peeking from foliage | One animal "peeks" in from the side on load (slide + settle), foliage sways gently | Leaf green, warm yellow, brown |
| B9 | Mundan Ceremony | Simple traditional motif, soft floral border | Gentle petal drift, same pattern-family as W1's marigold but lighter | Cream, soft gold |
| B10 | Annaprashan (Rice Ceremony) | Rice grain illustration, small bowl motif | A few illustrated rice grains gently fall and settle on load | Warm cream, saffron |
| B11 | Pregnancy Announcement | Soft cloud/moon illustration, tiny footprints | Footprints "appear" one at a time (staggered fade-in), like little steps | Soft neutral pastel (gender-neutral by default) |
| B12 | Kids Birthday — Space/Astronaut | Rocket, stars, planet line-art | Rocket subtly "launches" a short distance on load, stars twinkle continuously | Deep navy, aqua, white — ties in well with global aqua accent |

### 12.3 Party & Celebration (target: 12+)

| # | Template | Motif/Decor | Signature Animation | Palette |
|---|---|---|---|---|
| P1 | Anniversary | Two interlocking rings or hearts | Rings/hearts gently interlock/settle on load | Rose gold, deep red, cream |
| P2 | Housewarming (Griha Pravesh) | House line-art, small diya at the doorway | Diya flame flickers; a soft "welcome glow" pulses behind the house outline | Warm terracotta, gold |
| P3 | Retirement Party | Clock/hourglass motif, subtle confetti | Confetti pieces drift down gently on load, clock hands sweep once | Navy, gold, cream |
| P4 | Cocktail Party | Glass silhouette, subtle bubble/fizz detail | Small bubbles rise continuously from the glass (slow, subtle loop) | Deep charcoal, magenta-pink accent, gold rim detail |
| P5 | Pool Party | Water ripple pattern background | Ripple animates outward gently in a loop | Aqua, light-blue, white — direct match to the global theme's cool tones |
| P6 | Grand Opening | Ribbon + scissors motif (shares animation family with T6 Salon Snip from Phase 1) | Ribbon "cuts" once on load, similar snip mechanic reused | Gold, deep red, white |
| P7 | New Year Party | Fireworks burst line-art | Firework burst animates once (radiating lines + small spark dots), settles | Deep navy, gold, magenta-pink |
| P8 | Farewell Party | Suitcase/paper-plane motif | Paper plane glides once across the card on load | Soft blue, cream, coral accent |
| P9 | Kitty Party / Ladies' Gathering | Teacup + soft floral motif | Steam rises from teacup gently (shares animation family with T13 Cafe Steam) | Blush pink, sage, cream |
| P10 | Dinner Party (elegant) | Minimal place-setting line-art | Subtle candle-flicker glow if a candle motif is used, otherwise static | Charcoal, gold, off-white |
| P11 | BBQ/Outdoor Party | Flame/grill line-art | Flame flicker loop, warm glow pulse | Terracotta, warm orange, cream |
| P12 | Reunion / Get-together | Simple line-art of connected dots/people icons | Dots "connect" via animated lines on load, forming a network shape once | Light-blue, dark-blue, white — clean and neutral |

### 12.4 Puja / Path & Devotional (target: 12+)

*Handle this category with extra care — devotional content should favor restraint over
spectacle; animation should read as reverent (gentle glow, soft flicker), never
playful/gimmicky.*

| # | Template | Motif/Decor | Signature Animation | Palette |
|---|---|---|---|---|
| D1 | Griha Pravesh / Vastu Shanti | Havan kund (fire altar) line-art | Flame flicker, subtle continuous glow | Deep red, gold, cream |
| D2 | Satsang / Bhagwat Katha | Lotus flower motif, open book/scripture line-art | Lotus petals gently unfurl once on load, then settle | Saffron, gold, cream |
| D3 | Mata Ki Chowki | Trishul (trident) + diya motif | Diya flame flicker, soft radiant glow behind the trishul | Deep red, gold |
| D4 | Akhand Path (Sikh) | Ik Onkar symbol, simple respectful line-art | Gentle glow pulse behind the symbol — no literal animation of the symbol itself (respect the sanctity of the icon) | Saffron, white, gold |
| D5 | Ganesh Sthapana / Chaturthi | Modak (sweet) + simple Ganesh silhouette (line-art, respectful) | A few modak illustrations gently "appear" staggered, like an offering being laid out | Red, gold, green |
| D6 | Sunderkand Path | Simple diya + scripture line motif | Flame flicker, same family as D1/D3 | Deep orange, gold |
| D7 | Khatu Shyam / Balaji Chowki | Peacock feather + diya motif | Feather sway + flame flicker combined, restrained | Blue, gold, cream |
| D8 | Sai Sandhya | Simple lamp/aarti thali motif | Gentle flame flicker, soft radiating glow ring | Warm orange, gold, white |
| D9 | Death Ceremony / Shraddh | Deliberately minimal — no animation at all (Tier 0), soft neutral tones, simple lotus or diya line-art only | None — static, respectful | Muted grey, white, soft gold — explicitly NOT the vibrant festival palette |
| D10 | Bhagwat Katha (variant) | Krishna flute silhouette line-art, peacock feather | Very subtle feather sway only | Peacock blue, gold |
| D11 | Church Prayer Service / Christian Devotional | Cross line-art, soft light-ray motif | Gentle light-ray glow pulse behind the cross | White, soft gold, pale blue |
| D12 | General/Neutral Devotional | Simple candle or diya, no specific deity/symbol | Flame flicker only — usable across faiths when a family wants something universal | Cream, soft gold |

### 12.5 Festival Wishes (target: 12+) — the category you called out specifically

*This category leans hardest into signature, unmistakable animation per festival — this
is where the platform should feel most "alive," since festival cards are shared widely
and get judged fast.*

| # | Template | Motif/Decor | Signature Animation | Palette |
|---|---|---|---|---|
| F1 | Diwali | Diya row, rangoli pattern, subtle firework silhouettes | Diya flames flicker continuously; a few illustrated sparks/fireworks burst softly in the background on a slow loop; rangoli pattern option draws in once on load | Deep red, gold, warm orange |
| F2 | Holi | Color-powder cloud shapes, splash marks | Bursts of colored "powder" (soft circular gradient blobs in 4–5 hues) animate outward from a few points on load, like a gentle color-throw — then settle as a colorful splattered border | Magenta-pink, yellow, teal, orange, purple (multi-color, the one template that fully embraces a rainbow palette) |
| F3 | Christmas | Snow-dusted tree silhouette, subtle Santa silhouette (tasteful, not cartoonish), string lights | Snow falls continuously (light, slow-drifting flakes); string lights twinkle in a soft staggered pulse | Deep green, red, gold, white/snow |
| F4 | Eid | Crescent moon + star, lantern (fanoos) motif, geometric border | Lantern glows softly (pulse), crescent moon has a subtle shimmer; geometric border pattern draws in once | Emerald green, gold, deep navy |
| F5 | Raksha Bandhan | Rakhi thread illustration | Thread "ties" into a bow once on load (a simple path-draw animation) | Red, gold, cream |
| F6 | Navratri / Garba | Dandiya sticks crossed motif, mirror-work pattern border | Dandiya sticks gently "clash" once (rotate toward each other, small spark/sparkle burst at contact) | Vibrant multi-color (mirrors Holi's energy but with a distinct motif) |
| F7 | New Year | Firework bursts, champagne/confetti | Fireworks burst on load (shares animation family with P7), confetti drifts down | Deep navy, gold, magenta-pink |
| F8 | Valentine's Day | Floating heart shapes, soft ribbon accent | Hearts gently float upward, staggered, continuous slow loop | Magenta-pink, light-pink, cream — direct hero moment for the global palette's pink family |
| F9 | Guru Nanak Gurpurab | Ik Onkar (same respectful treatment as D4), simple lotus/candle accent | Gentle glow pulse only, no literal icon animation | Saffron, white, gold |
| F10 | Bhai Dooj | Tilak/diya motif, simple thali illustration | Diya flicker, same family as F1/D-series flame templates | Red, gold, cream |
| F11 | Buddha Purnima | Lotus + Bodhi leaf motif | Lotus petals gently unfurl once (shares animation family with D2) | Soft white, gold, sage green |
| F12 | Children's Day | Simple balloon/kite motif, playful line-art | Balloons drift upward gently, playful and light | Bright multi-color, but softer/pastel-leaning than Holi's intensity |
| F13 | Happy New Year (regional/multi-calendar variant, e.g. Gudi Padwa/Ugadi/Baisakhi) | Regional-specific motif (e.g. Gudi flag, mango leaves) — build as a template FAMILY off F7's base, swapping motif per regional calendar | Same firework/confetti base animation as F7, re-themed motif | Regional-appropriate — bright, festive base |

---

## 13. Cross-cutting rules for the Phase 2 library

1. **Content-only editing, always.** Every template above exposes the same admin/client-
   editable field set: names (couple/celebrant/host), date, venue/address→maps, phone,
   optional short message/tagline, and a photo/logo upload slot. The motif, animation,
   and color palette are part of the template's code — never exposed as user-editable
   theme controls. This mirrors the "config_schema, not canvas" architecture from Section
   8, just with a fixed/non-swappable palette per template instead of a color-picker field.
2. **Animation families get reused across categories**, same discipline as Phase 1's T7/
   T8 and T10/T11 pairs: flame-flicker (Diwali, Griha Pravesh, most Devotional templates,
   Bhai Dooj), petal/flower-bloom (Wedding florals, Buddha Purnima, Satsang), confetti/
   firework-burst (New Year, Grand Opening's ribbon-snip cousin, Retirement), steam-rise
   (Kitty Party reusing Phase 1's Cafe Steam mechanic). Build each animation MECHANISM
   once, then re-skin it per template — this is what makes a 40+ template library
   achievable without 40+ from-scratch animation builds.
3. **Devotional (12.4) is the one category where restraint overrides "more motion is
   better."** Default to Tier 0–1 only, never Tier 2 spectacle, and treat sacred symbols
   (Ik Onkar, crosses, deity silhouettes) as respectfully static even when everything
   else on the card has gentle motion.
4. **Regional/sub-community variants** (the many wedding religion/region templates, or
   festival calendar variants like F13) should be built as template families sharing one
   base component + swapped motif/palette assets, not fully separate code — same pattern
   already proven in Phase 1's T7/T8 and T10/T11.

---

## 14. Differentiation Backlog — Add-Ons Beyond Core Phase 1/2

These are not required for either phase to ship, but each is cheap relative to its
impact given the pipeline already being built (animation engine, subdomain, config-
schema, client portal). Phase-tagged below so they don't get lost or accidentally
treated as blocking.

### 14.1 Phase 1-adjacent (small lift, do once core Phase 1 is stable)

**Dynamic OG image per card (link-preview polish)**
```
When a CardInstance is created/updated, generate a static Open Graph preview
image (1200x630) capturing the card's hero moment — e.g. the settled state of
its signature motif/animation, with the client's name overlaid. Serve this at
cards.yourbrand.com/{slug}/og.png and reference it in the page's <meta
property="og:image"> tag. Regenerate on every content save. This is what
renders when the link is shared in WhatsApp/iMessage/etc. — it should look
premium, not like a generic favicon-sized thumbnail.
```

**Reveal vs settled two-state load behavior**
```
Add a `first_viewed_at` timestamp to CardInstance. On the public card page:
if first_viewed_at is null, play the template's full signature animation
sequence at normal/slightly elongated timing (the "unveiling"), then set
first_viewed_at on the backend. On every subsequent load, skip straight to
the settled/static state (or a much quicker, subtler version of the
animation) rather than replaying the full sequence. This makes the very
first open — the actual recipient's moment — feel special without punishing
repeat visits (family checking the card again next week) with a slow replay
every time.
```

**Muted-by-default sound design, opt-in**
```
For templates where a signature sound cue makes sense (flute note on Krishna-
themed baby/birthday cards, temple bell on devotional templates, a soft "snip"
sound on Salon Snip, camera shutter click on Shutter Moment), add an optional
audio_url field to that template's config_schema. Audio NEVER autoplays —
render a small, unobtrusive "tap to hear" affordance (a speaker icon) that
plays the sound only on explicit tap. Skip this entirely for templates where a
sound doesn't add anything (Wooden Craft, Rope & Knot, Receipt Style, etc.) —
this is additive per-template, not a blanket requirement.
```

**Branded loading state**
```
Replace any generic spinner on cards.yourbrand.com with a lightweight, on-
brand loading treatment — e.g. a subtle pulsing shape using the design-
system's aqua/magenta-pink tokens, or a tiny animated version of the brand
mark. This is the first thing a recipient sees on a slow mobile connection —
it should not look like default framework boilerplate.
```

**Print-ready static export**
```
Add a "Download for Print" option on both the client portal card view and
the public card page. This renders the card's settled/static state (no
animation) to a high-resolution PNG or PDF at print-appropriate dimensions
(standard business card size, 300dpi) for anyone who still wants a physical
printed card. Reuse the same component render, just captured in its static
state via a headless screenshot (Playwright can do this — same tool already
in use for mobile-viewport QA) rather than maintaining a second design system.
```

### 14.2 Phase 2-adjacent (build once invitation categories exist)

**Seasonal auto-scheduling for recurring templates**
```
Add scheduled_publish_at and scheduled_unpublish_at (nullable) to Template.
Admin can set a festival template (Diwali, Christmas, Eid, etc.) to auto-
activate and auto-deactivate around its seasonal window each year, rather
than manually toggling status. A background job flips status based on these
dates. This matters most for Section 12.5's Festival Wishes category, where
the same templates get reused annually.
```

**"Which template fits me" guided picker**
```
On the public gallery (and the client-facing template picker inside the
portal), add an optional 3-question quick-filter ahead of the full grid:
(1) Occasion/category, (2) Tone: Minimal vs Ornate, (3) Color leaning
(pick from 4-5 swatches drawn from across the template set's actual
palettes). Answering filters the grid down to a handful of relevant
templates instead of presenting the full 12-60+ item catalog at once. This
is a filter UI over existing Tag/category data (Section 1's Tag table) —
no new template-building work required, purely a discovery UX improvement.
```

**View/scan analytics on the client dashboard**
```
Add a lightweight PageView table (card_instance_id, viewed_at, is_first_view
bool — reuses the first_viewed_at logic from 14.1). Show a simple "Viewed X
times" counter on the client's card detail screen in the portal. Keep this
intentionally minimal — a count only, no IP/location tracking, no creepy
surveillance framing — this is a light engagement signal for the client, not
an analytics platform.
```

**Guest-list personalized greetings for invitation cards**
```
For invitation categories only (Phase 2), add an optional layer on top of
CardInstance: a GuestList table (card_instance_id, guest_name, guest_slug,
phone [optional], rsvp_status [invited | confirmed | declined | pending —
default "invited"], notes [optional], added_at) so a host can generate
personalized links (cards.yourbrand.com/{slug}/g/{guest_slug}) that render
the same card with a personalized greeting line ("Dear {guest_name}, you're
warmly invited...") inserted into the template's config, without duplicating
the whole card design per guest.

Client portal guest-list management screen:
  - Table view of all guests on a given CardInstance: name, phone (if
    added), rsvp_status, with a simple checkmark/toggle control to mark a
    guest confirmed (or a small status dropdown if more than a binary
    check is wanted — invited/confirmed/declined/pending covers the common
    case).
  - Manual "Add guest" (name + optional phone) for one-off additions.
  - CSV IMPORT: client uploads a CSV (name, phone columns at minimum) to
    bulk-add guests in one action — generates guest_slug values
    automatically for each row. Validate for duplicate names/phones before
    committing, surface a simple "N added, N skipped as duplicates" summary.
  - CSV EXPORT: client can download the current guest list (name, phone,
    rsvp_status, guest_slug/personalized link) as a CSV at any time — useful
    for offline reference, printing a physical guest checklist, or sharing
    with event staff who don't have portal access.
  - Optional: a simple count summary at the top of the screen ("42 invited
    · 18 confirmed · 3 declined · 21 pending") — cheap to compute from the
    same table, gives the host an at-a-glance status.

This stays a Phase 2+ add-on — do not build it into the base CardInstance
model, keep it a clean optional extension so cards without guest lists
(business cards, and any invitation client who doesn't need this) are
unaffected. The checkmark/RSVP toggle should be reachable in one tap from
the guest-list table, not buried behind an edit-guest modal — this is a
screen the host will use repeatedly in the days before an event, so it
needs to be fast to update, not just possible to update.
```

**Multi-language toggle**
```
For invitation templates, add an optional secondary-language text variant
per relevant config_schema field (e.g. name/date/venue fields get an
optional Hindi/regional-script counterpart). Render a small language toggle
on the public card page if a secondary language variant exists; default to
the primary language. Keep this optional per-field, not a mandatory
translation requirement on every template.
```

**Add-to-calendar button**
```
For any template with a date field (weddings, ceremonies, festivals with a
specific event time), add a "Add to Calendar" button on the public card page
that generates a downloadable .ics file from the stored date/time/venue
data. Simple, standard, cheap once a date field exists in config_schema.
```

**Living card update notifications**
```
Add an optional "Notify me if this card changes" affordance on the public
card page (visible to visitors, not just the client). Capture the visitor's
phone number, store it against the CardInstance (a simple NotifySubscriber
table: card_instance_id, phone, subscribed_at). On any content save to that
CardInstance, send a lightweight WhatsApp/SMS notification to subscribers
("[Name]'s contact details were just updated — view the latest card:
{link}"), reusing whatever messaging integration the phone-auth system
already touches. This is the strongest argument for a living card over a
printed one — make it visible, not buried.
```

**Referral loop on the public card page**
```
Add a small, low-emphasis line on the public card page footer — e.g. "Want
a card like this? Get yours" — linking back to the public gallery (/gallery
on the main site). Keep it visually minimal, consistent with the footer-only
visitor-access philosophy already established (Section 8.3's gallery
guidance) — this is a quiet distribution channel, not a promotional banner.
```

**Admin "Duplicate & Re-theme" shortcut**
```
In the admin template list (built in revised Prompt 4 / Section 8.3), add a
"Duplicate" action on any existing Template row. This clones the
component_key reference and config_schema into a new draft Template row,
pre-filled and ready for the admin to rename, re-theme (palette/motif swap),
and publish — turning the "template family" convention used throughout
Section 6 and Section 12 (T7→T8, T10→T11, W-series, F-series) into an actual
one-click workflow rather than something a builder has to remember to do
manually each time.
```

**Expiry/archival for date-based event cards**
```
For any CardInstance whose template has a date field (weddings, ceremonies,
festival events with a specific date), add an optional auto_archive_after
setting (defaults to N days post-event-date, admin-configurable). Once
passed, the public card page still resolves at its slug but renders a
simple "This event has passed" state instead of the full animated
experience — avoids an old wedding invite link feeling awkward if reopened
long after the fact. Business-card-type templates (no date field) are
unaffected — this only applies where a date field exists in config_schema.
```

**"Preview as recipient" toggle for the client**
```
On the client portal's card detail view, add a "Preview as Recipient"
button that opens the public card page's full experience — including the
first-view reveal animation from 14.1 — WITHOUT marking first_viewed_at as
set and WITHOUT counting toward the PageView analytics in 14.2. This lets a
non-technical client confirm exactly what a real visitor will see and feel,
including the one-time reveal moment, without "using up" that reveal or
polluting their own view-count stats.
```
