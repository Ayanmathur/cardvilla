# Card Villa — Developer Documentation

## Architecture Overview

Card Villa is a digital card platform built as a monorepo:

```
/apps/web           → Main site: marketing, admin panel, client portal (yourbrand.com)
/apps/cards          → Card-serving micro-site (cards.yourbrand.com/{slug})
/packages/templates  → Template Component Registry (React + Framer Motion)
/packages/schema     → Shared Prisma schema + DB utilities
```

### Two-Domain Architecture
- **Main site** (`cardvilla.com`) — storefront, admin panel, client portal
- **Card subdomain** (`cards.cardvilla.com`) — public card rendering only

---

## Data Model

### Template
| Field | Type | Description |
|---|---|---|
| `id` | string | Primary key |
| `name` | string | Display name |
| `category_id` | string | FK to categories |
| `component_key` | string | Maps to a coded React component in the registry |
| `config_schema` | JSONB | Array of ConfigField definitions |
| `canvas_json` | JSON (nullable) | Legacy canvas data (deprecated) |
| `status` | enum | `draft` \| `published` |
| `created_by` | string | Admin user ID |

### CardInstance
| Field | Type | Description |
|---|---|---|
| `id` | string | Primary key |
| `template_id` | string | FK to templates |
| `owner_user_id` | string | FK to users (client) |
| `slug` | string | Unique URL slug |
| `data` | JSON | Field values keyed by config_schema field keys |
| `status` | enum | `active` \| `archived` |

### ConfigField (stored in `Template.config_schema`)
```typescript
interface ConfigField {
  key: string;           // Unique field identifier
  label: string;         // Display label
  type: ConfigFieldType; // See enum below
  editableBy: 'admin_only' | 'client';
  required: boolean;
  defaultValue?: string;
  placeholder?: string;
  fieldScope?: 'instance' | 'template';
}
```

### ConfigFieldType Enum
| Type | Description | UI Component |
|---|---|---|
| `text` | Single-line text | Text input |
| `richtext` | Multi-line text | Textarea |
| `image` | Image URL | File uploader |
| `color` | Hex color | Color picker |
| `toggle` | Boolean | Toggle switch |
| `list` | Comma-separated values | Tag input |
| `phone` | Phone number | Phone input (renders as `tel:` link) |
| `whatsapp` | WhatsApp number | Phone input (renders as `wa.me` link) |
| `address` | Street address | Text input (renders as Google Maps link) |
| `url` | Website URL | URL input (renders as clickable link) |
| `social` | Social media handle | Text input |
| `date` | Date/datetime | Date picker |

### editableBy Enum
| Value | Description |
|---|---|
| `admin_only` | Only admin can edit (e.g., template-level decorative copy) |
| `client` | Client can edit in their portal (e.g., name, phone, logo) |

---

## Template Component Registry

Each template is a folder in `packages/templates/src/templates/{name}/`:

```
shutter-moment/
  ├── index.tsx          # React component (Framer Motion animations)
  ├── schema.ts          # Exports config_schema array
  └── shutter-moment.module.css  # CSS Modules styles
```

### Adding a New Template

1. **Create the folder** in `packages/templates/src/templates/{component-key}/`
2. **Build `schema.ts`** — export your `ConfigSchema` array:
   ```typescript
   import { ConfigSchema } from '../../types';
   export const myTemplateSchema: ConfigSchema = [
     { key: 'full_name', label: 'Full Name', type: 'text', editableBy: 'client', required: true },
     // ... more fields
   ];
   ```
3. **Build `index.tsx`** — export a React component and register it:
   ```typescript
   import { registerTemplate } from '../../registry';
   import { myTemplateSchema } from './schema';
   // ... component code ...
   registerTemplate({ component: MyTemplate, schema: myTemplateSchema, meta: { ... } });
   export default MyTemplate;
   ```
4. **Add import** to `packages/templates/src/index.ts`:
   ```typescript
   import './templates/my-template';
   ```
5. **Add to registry-meta.ts** for server-safe metadata access
6. **Seed in database** via admin panel or seed script

### Motion Tiers
| Tier | Description | Examples |
|---|---|---|
| 0 | Static, no animation | Modern Minimal, Classic Local, Wood Grain |
| 1 | Micro-motion (one subtle loop) | Clinic Care heartbeat, Coffee Steam wisps |
| 2 | Signature animation (plays once) | Shutter Moment camera flash, Salon Snip scissors |

---

## Adding a New Category

1. Insert a row in the `categories` table:
   ```sql
   INSERT INTO categories (id, name, slug) VALUES ('cat_wedding', 'Wedding', 'wedding');
   ```
2. Build templates for that category using the template-generation skill
3. Assign templates to the category via `category_id`
4. Templates appear automatically in the gallery filtered by category

---

## Auth System
- Phone number + password only (no OTP, no email, no social)
- JWT stored in httpOnly cookies
- Roles: `admin` | `client`
- Admin accounts are seeded, never created through registration

## API Endpoints

### Auth
- `POST /api/auth/register` — Client registration
- `POST /api/auth/login` — Login (returns JWT)
- `POST /api/auth/logout` — Logout
- `GET /api/auth/me` — Current user info

### Admin
- `GET/POST /api/admin/templates` — Template CRUD
- `GET /api/admin/templates/registry` — List available component registry entries
- `GET/PUT /api/admin/templates/[id]` — Single template
- `PUT /api/admin/templates/[id]/status` — Toggle draft/published
- `GET/POST /api/admin/cards` — Card instance management
- `GET/PUT /api/admin/cards/[id]` — Single card instance
- `GET/POST /api/admin/clients` — Client management
- `GET /api/admin/categories` — Categories

### Client
- `GET /api/client/cards` — Client's own cards
- `GET/PUT /api/client/cards/[id]` — Edit own card
- `PUT /api/client/change-password` — Password change

### Public
- `GET /api/public/templates` — Published templates for gallery
- `POST /api/upload` — File upload (rate-limited, type-validated)
