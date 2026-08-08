---
name: design-system
description: >
  Card Villa design system rules — color tokens, typography scale, spacing/radius/elevation,
  component behavior baseline. Invoke this skill on any UI-building task across admin, portal,
  marketing site, and default/neutral card templates.
---

# Card Villa Design System — Theme & Token Rules

This skill is the single source of truth for all visual decisions across Card Villa.
Every UI component — admin panel, client portal, marketing site, and neutral card
templates — must consume these tokens. No ad-hoc color or spacing values.

## Color Palette (exhaustive — nothing outside this set)

### Neutrals
| Token | Value | Usage |
|---|---|---|
| `--cv-white` | `#ffffff` | Backgrounds, card surfaces |
| `--cv-off-white` | `#f8fafc` | Subtle alternate backgrounds |
| `--cv-grey-50` through `--cv-grey-900` | See design-tokens.css | Text hierarchy, borders, disabled states |

### Brand — Dark
| Token | Value | Usage |
|---|---|---|
| `--cv-dark-blue` | `#0d0f1a` | Primary background (marketing site, admin) |
| `--cv-dark-blue-card` | `#14172a` | Card/panel surfaces on dark bg |
| `--cv-dark-blue-hover` | `#1a1d35` | Hover states on dark surfaces |

### Brand — Cool
| Token | Value | Usage |
|---|---|---|
| `--cv-light-blue` | `#38bdf8` | Links, secondary interactive elements |
| `--cv-aqua` | `#06b6d4` | Accent — badges, highlights, progress |
| `--cv-aqua-light` | `#22d3ee` | Hover/active state of aqua elements |

### Brand — Gold
| Token | Value | Usage |
|---|---|---|
| `--cv-gold` | `#c9a84c` | Primary accent — premium feel, headings, borders |
| `--cv-gold-light` | `#e5c158` | Hover state of gold elements |
| `--cv-gold-dark` | `#a68a3a` | Active/pressed state of gold elements |

### Brand — Pink
| Token | Value | Usage |
|---|---|---|
| `--cv-magenta-pink` | `#ec4899` | **PRIMARY ACTIONS ONLY** — CTA buttons, key interactive moments |
| `--cv-pink` | `#f472b6` | Secondary pink — tags, badges, soft highlights |
| `--cv-light-pink` | `#fce7f3` | Background tint for pink-themed sections |

### Semantic
| Token | Value | Usage |
|---|---|---|
| `--cv-success` | `#4ade80` | Success states, published badges |
| `--cv-error` | `#ef4444` | Error states, destructive actions |
| `--cv-warning` | `#f59e0b` | Warning states, draft badges |
| `--cv-info` | `#3b82f6` | Informational states |

## Hard Rules

1. **No more than 2 accent colors per screen.** Pick one primary accent (usually gold
   or aqua) and optionally one secondary. Never three or more competing accent hues
   on the same view.

2. **Magenta-pink (`--cv-magenta-pink`) is reserved for PRIMARY actions only.**
   CTA buttons ("Create Card," "Save," "Publish"), not decorative elements, not
   borders, not backgrounds. If it's not the single most important action on the
   screen, it doesn't get magenta-pink.

3. **Gold is the default brand accent.** Use `--cv-gold` for headings, borders,
   decorative lines, and premium-feeling elements. Gold + dark-blue is the signature
   pairing.

4. **Dark-blue backgrounds are the default**, not white. The product has a premium,
   dark-mode-first aesthetic. White/off-white is for card surfaces and content areas
   floating on top of dark backgrounds, not for page-level backgrounds.

## Typography

| Role | Font | Token |
|---|---|---|
| Primary (UI, body, labels) | Outfit | `--cv-font-primary` |
| Serif (elegant headings, template names) | Playfair Display | `--cv-font-secondary` |
| Monospace (receipt template, code, data) | JetBrains Mono | `--cv-font-mono` |

### Scale
```
xs:   0.75rem  (12px)  — captions, meta text
sm:   0.875rem (14px)  — body small, labels
base: 1rem     (16px)  — body default
lg:   1.125rem (18px)  — body large, subheads
xl:   1.25rem  (20px)  — section heads
2xl:  1.5rem   (24px)  — page subheads
3xl:  1.875rem (30px)  — page titles
4xl:  2.25rem  (36px)  — hero text
5xl:  3rem     (48px)  — marketing hero only
```

### Weights
- `400` normal (body)
- `500` medium (labels, nav items)
- `600` semibold (subheadings, buttons)
- `700` bold (headings)
- `800` extrabold (marketing hero only)

## Spacing

4px base unit. Use only these values:
```
1:  4px    2:  8px    3: 12px   4: 16px
5: 20px    6: 24px    8: 32px  10: 40px
12: 48px  16: 64px   20: 80px  24: 96px
```

## Border Radius
```
sm:   4px   — small elements (badges, chips)
md:   8px   — default (inputs, buttons, cards)
lg:  12px   — large cards, panels
xl:  16px   — feature cards, modals
2xl: 24px   — hero elements
full: 9999px — pills, avatars
```

## Shadows
```
sm:  0 1px 2px    — subtle lift (inputs, small cards)
md:  0 4px 6px    — default card elevation
lg:  0 10px 15px  — prominent panels, dropdowns
xl:  0 20px 25px  — modals, overlays
```

### Glow shadows (for dark backgrounds)
```
glow-gold: 0 0 20px rgba(201, 168, 76, 0.3)    — gold-accented elements
glow-pink: 0 0 20px rgba(236, 72, 153, 0.3)     — CTA buttons
glow-aqua: 0 0 20px rgba(6, 182, 212, 0.3)      — info/progress elements
```

## Motion

| Token | Duration | Usage |
|---|---|---|
| fast | 150ms | Micro-interactions (hover, focus) |
| normal | 300ms | Default transitions (expand, reveal) |
| slow | 600ms | Larger reveals (page transitions, panels) |
| slower | 1000ms | Template animations (Tier 1 motions) |
| slowest | 1500ms | Signature animations (Tier 2 sequences) |

### Easing curves
- `default`: `cubic-bezier(0.4, 0, 0.2, 1)` — general purpose
- `bounce`: `cubic-bezier(0.34, 1.56, 0.64, 1)` — playful interactions
- `spring`: `cubic-bezier(0.175, 0.885, 0.32, 1.275)` — natural motion

## Component Behavior Baseline

1. **Buttons**: `--cv-radius-md`, `--cv-font-semibold`, min-height 40px, padding 8px 16px.
   Primary button: magenta-pink bg + white text. Secondary: transparent + gold border.
2. **Inputs**: `--cv-radius-md`, border `--cv-grey-700`, focus ring `--cv-gold` on dark bg.
   Height 40px, padding 8px 12px.
3. **Cards/Panels**: `--cv-radius-lg`, `--cv-dark-blue-card` bg, `--cv-shadow-md`.
4. **Modals**: `--cv-radius-xl`, centered, overlay at `rgba(0,0,0,0.6)`, `--cv-shadow-xl`.
5. **Navigation**: sticky top, `--cv-dark-blue` bg, gold accent for active state.

## Template-Specific Deviation Rule

Card templates (T1–T14, W1–W13, B1–B12, etc.) may deliberately deviate from this
palette when the occasion demands it (e.g., Diwali needs deep red/gold, not aqua/pink).
However, the SURROUNDING UI (admin panel, client portal, marketing site) must ALWAYS
use this design system without deviation.
