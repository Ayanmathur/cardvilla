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
- Render motifs as rich, hand-drawn/painterly flat-illustration artwork (Section 8.8.1 Rule) — vibrant colors and hand-drawn character framing a clean centered text block, rather than minimal outline icons.

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

1. **Zero Hardcoded Visible Text (Section 8.1.1 Rule)**:
   - **ALL visible text** in a component MUST be defined as a field in `config_schema`, NEVER hardcoded directly in JSX.
   - **Content Fields** (`editableBy: 'client'`, `fieldScope: 'instance'`): Dynamic per-card data (Name, Title, Date, Phone, Address, Venue).
   - **Copy Fields** (`editableBy: 'admin_only'`, `fieldScope: 'template'`): Fixed decorative copy ("You're Invited", "RSVP", "Save Contact", "Directions"). Ships with a default value that admin can edit once at template level to create regional script templates (e.g. Hindi "आपको सादर आमंत्रित है").
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
When building siblings (T7→T8, T10→T11, W1→W8), explicitly duplicate the parent's structure
(animation mechanism, config_schema shape) and re-theme — never build from scratch. However:
- **Reuse STRUCTURE, not VISUAL DRESSING**: Siblings must get genuinely distinct typography,
  border/frame treatments, and layout rhythms — never identical visual twins.

## Section 6.D — Creative Freedom & Animation Vocabulary

1. **Card Templates Are NOT Bound by Global Palette/Restraint Rules**:
   - Platform rules (max 2 accents, magenta-pink for CTAs only, no cross-family gradients)
     apply **ONLY to the product chrome** (Admin Panel, Client Portal, Marketing Site).
   - Card templates are bespoke creative works. A template may use ANY color palette suited
     to its occasion — single dominant color, multi-color (Holi, Diwali, Children's Day), or
     unexpected pairings (pink + red). No color count caps on card templates.

2. **Distinct Visual Signatures**:
   - No two templates should share identical font pairings, border/frame styles, or visual dressing.

3. **Rich Animation Vocabulary**:
   - Draw beyond fade-in/scale: staggered multi-element choreography, path-drawing/stroke reveals,
     particles (confetti, sparks, powder, petals), masked reveals, and parallax depth.

## Section 6.D.1 — Photography Support

1. **Curated-Photo Templates**:
   - Fixed stock/reference photography baked into the template's art direction (e.g. floral background photo, scenic backdrop).
   - Configured with `editableBy: 'admin_only'` and a high-quality default image asset.

2. **Custom-Photo-Upload Templates**:
   - Art-directed around the client's own photo as the centerpiece (couple photo for Save-the-Date W13, baby photo B2/B4/B11, host photo for party, headshot for business cards).
   - Uses `type: 'photo'` in `config_schema` (`editableBy: 'client'`).
   - Requires designed frame/mat treatment (gold foil arch, film slide, polaroid frame) with a smooth entrance animation (gentle scale/reveal).


