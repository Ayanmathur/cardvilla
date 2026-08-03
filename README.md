# 🏰 Card Villa — Digital Card Platform

> A full-stack, multi-domain digital card platform built with **Next.js 15, TypeScript, Supabase PostgreSQL, Prisma ORM, and Turborepo**.

---

## 📐 1. System Architecture & Two-Domain Model

Card Villa splits into two dedicated application surfaces from day one:

1. **Main Site (`apps/web` — Port 3000)**:
   - Client Portal (`/dashboard`) — self-service field editing, QR code download, vCard save.
   - Admin Panel (`/admin`) — Template Builder canvas editor, client user management, card instance oversight.
   - Public Storefront (`/`) & Template Gallery (`/gallery`).

2. **Card-Serving Subdomain (`apps/cards` — Port 3001)**:
   - High-performance, fast cold-start card view (`http://localhost:3001/{slug}`).
   - Renders live card content, motion layer keyframe animations (scissors snip, heartbeat, tooth sparkle, shutter flash, rising steam, gold foil shine sweep).
   - Generates downloadable `.vcf` vCard contact files and Google Maps action links.

---

## 🗄️ 2. Data Model & FieldSchema Specification

### `FieldType` Enum
Specifies how a field value is rendered and interacted with across the platform:

| `FieldType` | Purpose / Rendering Behavior |
|---|---|
| `text` | Plain text (full name, job title, company name, tagline, services) |
| `phone` | Phone number (renders as tap-to-call link `tel:...`) |
| `whatsapp` | WhatsApp phone number (renders as chat link `https://wa.me/...`) |
| `address` | Business address (renders as tappable Google Maps link `https://google.com/maps/search/?query=...`) |
| `url` | Generic URL link (catalog, booking appointment, google review) |
| `logo` | Image asset path for business logo (rendered in logo zone) |
| `image` | Decorative or background image element |
| `social` | Social media link collection (JSON object) |
| `date` | Date / DateTime field (reserved for Phase 2 event invites & RSVP deadlines) |

### `EditableBy` Enum
Controls field-level permissions:

| `EditableBy` | Permission Scope |
|---|---|
| `client` | Client can edit this field directly from their `/dashboard` client portal. |
| `admin_only` | Admin restricted — client cannot edit this field. Only admin can modify via `/admin/cards/[id]/edit`. |

---

## 🚀 3. Onboarding Guide: Adding New Categories & Templates (Phase 2)

Phase 1 was built on the **final data model**. Adding new categories (Wedding, Baby & Kids, Party, Puja/Path, Festival Wishes) requires **zero schema migrations**.

### Step 1: Add a New Category Row
Add a row to the `categories` table via SQL or Prisma:
```sql
INSERT INTO "categories" ("id", "name", "slug", "created_at")
VALUES ('cat_wedding', 'Wedding Invitation', 'wedding', CURRENT_TIMESTAMP);
```

### Step 2: Create a Template in Admin Builder
1. Log in as admin (`9999999999` / `Password@12345`).
2. Go to `/admin/templates/builder`.
3. Select the new Category from the dropdown (e.g. "Wedding Invitation").
4. Add text elements, images, and motif animations.
5. Bind elements to `fieldKey`s (e.g. `groom_name`, `bride_name`, `wedding_date`, `venue_address`, `rsvp_phone`).
6. Set `status` to `published` and click **Save Template**.

### Step 3: Enable Public Category Filter UI
The public endpoints (`/api/public/templates?category=wedding`) and reserved route (`/category/wedding`) already read categories generically by `slug`. To expose category tabs in `/gallery`, simply enable the category switcher in `apps/web/src/app/gallery/page.tsx`.

---

## 🛠️ 4. Local Development

```powershell
# Install workspace dependencies
npm install

# Start both apps simultaneously (Port 3000 & 3001)
npx turbo dev
```

### Testing Health Checks
- Web App: `http://localhost:3000/api/health`
- Cards App: `http://localhost:3001/api/health`

### Admin Credentials (Seeded)
- **Phone:** `9999999999`
- **Password:** `Password@12345`
