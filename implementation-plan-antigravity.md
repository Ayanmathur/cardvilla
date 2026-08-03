# Digital Card Platform — Implementation Plan for Antigravity
### Phase 1: Business Card + Client/Admin Portal (built with Phase 2 roots in place)
### Phase 2: Full Invitation Suite (joins onto Phase 1 without rework)

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

## 7. Notes for whoever runs these prompts

- Run prompts strictly in order — later ones assume earlier components exist and are named
  consistently (reuse the exact field-editing component, don't rebuild it per screen).
- After Prompt 4 and Prompt 6, do a **manual review** of the canvas_json structure Antigravity
  generates — this is the piece most likely to need a human design decision (which canvas
  library, how nested the JSON is) before you're 10 templates deep and locked in.
- Keep template count small (3–5) through Prompt 8 — don't let Antigravity or the admin user
  mass-produce templates until the editing flow is confirmed solid end to end.
