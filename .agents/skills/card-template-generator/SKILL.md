---
name: card-template-generator
description: >
  Six-parameter framework for specifying and building card template components.
  Invoke this skill whenever creating, specifying, or reviewing any new card/invitation template.
---

# Card Template Generator — Six-Parameter Framework

Every template in Card Villa (business card, invitation, festival wish, etc.) MUST be
defined against these six parameters before any code is written.

## The Six Parameters

### 1. INDUSTRY / PERSONA
Who is this template for? Be specific.
- Business cards: Salon, Clinic, Dentist, Photographer, Jeweler, Shopkeeper, Cafe, Restaurant, etc.
- Invitations: Hindu Wedding, Sikh Wedding, Baby Shower, Retirement Party, Diwali, etc.

### 2. CORE MOTIF OBJECT(S)
The physical object or symbol that signals the category at a glance.
- Scissors, stethoscope, camera, coffee cup, gemstone, receipt roll, marigold garlands, diyas, etc.
- Keep motifs as simple line-art or flat illustration — NOT photorealistic.

### 3. MATERIAL / TEXTURE THEME
What surface or substance defines the visual world.
- Wood grain, layered paper, woven rope, brushed metal, marble, linen, gold foil, etc.
- Implemented via CSS gradients, background patterns, or SVG textures — not images.

### 4. MOTION TIER
How much animation:
- **Tier 0 (Static)**: No motion. Clean layout, motif as flat icon/line-art.
- **Tier 1 (Micro-motion)**: One subtle looping detail (steam wisp, shine sweep, gentle pulse). CSS keyframes preferred.
- **Tier 2 (Signature animation)**: One clear animated moment tied to the motif (scissors snip, shutter click, photo slide). Plays once on load, settles to static. Framer Motion for orchestration.

### 5. STYLE-TONE AXIS
Two independent sliders:
- **Classic/Local ←→ Modern/Elegant**
- **Minimal ←→ Ornate/Graphic-rich**

Most templates should ship as **2 variants minimum** (e.g., one classic + one modern).

### 6. FIELD ADDITIONS
Does this template need fields beyond the standard set?
- Standard: name, title, company, phone, email, address→maps, logo
- Optional additions: specialization, tagline, services, cuisine type, etc.
- Keep additions OPTIONAL (never required), so the base config_schema stays consistent.

## Build Rules

1. **Every visible text string** must be a field in `config_schema`, never hardcoded in JSX.
   - Content fields: `editableBy: 'client'`, `fieldScope: 'instance'`
   - Copy/decorative fields: `editableBy: 'admin_only'`, `fieldScope: 'template'`, with sensible `defaultValue`
2. **Templates are coded React components** in `packages/templates/src/templates/{key}/`.
3. Each template folder contains: `index.tsx`, `schema.ts`, `{key}.module.css`.
4. Interactive elements: phone → `tel:` link, whatsapp → `wa.me/` link, address → Google Maps link.
5. Mobile-first: design and test at **375px viewport** FIRST.
6. CSS keyframes for Tier 0–1, Framer Motion only for Tier 2 sequences.
7. Bundle discipline: no unnecessary dependencies per template.

## Phase 2 Rule
Invitation templates are **content-only-editable** with locked theme/motif/palette.
Admin/client only edit content fields. Nobody customizes the design system of a template.

## Template Family Pattern
When building siblings (T7→T8, T10→T11), explicitly duplicate the parent's structure
and re-theme — never build from scratch. This prevents the generic look.
