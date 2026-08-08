/**
 * Static template metadata — safe to import in server-only contexts.
 * Does NOT import React components, so it can be used in Next.js API routes.
 */

import type { ConfigSchema, TemplateMeta } from './types';

// Import schemas directly (no React component dependencies)
import { shutterMomentSchema } from './templates/shutter-moment/schema';
import { modernMinimalSchema } from './templates/modern_minimal/schema';
import { classicLocalSchema } from './templates/classic_local/schema';
import { woodGrainSchema } from './templates/wood_grain/schema';
import { ropeKnotSchema } from './templates/rope_knot/schema';
import { receiptStyleSchema } from './templates/receipt_style/schema';
import { restaurantElegantSchema } from './templates/restaurant_elegant/schema';
import { clinicCareSchema } from './templates/clinic-care/schema';
import { dentalBrightSchema } from './templates/dental-bright/schema';
import { goldRadianceSchema } from './templates/gold-radiance/schema';
import { silverEleganceSchema } from './templates/silver-elegance/schema';
import { coffeeSteamSchema } from './templates/coffee-steam/schema';
import { paperDioramaSchema } from './templates/paper-diorama/schema';
import { salonSnipSchema } from './templates/salon-snip/schema';

export interface RegistryMetaEntry {
  meta: TemplateMeta;
  schema: ConfigSchema;
}

export const registryMeta: Record<string, RegistryMetaEntry> = {
  modern_minimal: {
    meta: { name: 'Modern Minimal', componentKey: 'modern_minimal', description: 'Clean modern card with thin accent line and geometric marks', category: 'business-card', motionTier: 0, styleTone: 'Modern/Elegant, Minimal' },
    schema: modernMinimalSchema,
  },
  classic_local: {
    meta: { name: 'Classic Local', componentKey: 'classic_local', description: 'Traditional bordered card with serif script and corner flourishes', category: 'business-card', motionTier: 0, styleTone: 'Classic/Local, Moderate ornamentation' },
    schema: classicLocalSchema,
  },
  wood_grain: {
    meta: { name: 'Wood Grain Craft', componentKey: 'wood_grain', description: 'CSS wood-grain texture with laser-engraved typography effect', category: 'business-card', motionTier: 0, styleTone: 'Classic/Local, Minimal-to-moderate' },
    schema: woodGrainSchema,
  },
  paper_diorama: {
    meta: { name: 'Paper Diorama', componentKey: 'paper_diorama', description: 'Layered cut-paper 2.5D effect with staggered depth animation', category: 'business-card', motionTier: 1, styleTone: 'Modern/Elegant, Graphic-rich' },
    schema: paperDioramaSchema,
  },
  rope_knot: {
    meta: { name: 'Rope & Knot', componentKey: 'rope_knot', description: 'Rope-bordered card with nautical knots and canvas texture', category: 'business-card', motionTier: 0, styleTone: 'Classic/Local' },
    schema: ropeKnotSchema,
  },
  salon_snip: {
    meta: { name: 'Salon Snip', componentKey: 'salon_snip', description: 'Animated scissors snip with line cut reveal — for salons/barbers', category: 'business-card', motionTier: 2, styleTone: 'Modern/Elegant, Black & Gold' },
    schema: salonSnipSchema,
  },
  clinic_care: {
    meta: { name: 'Clinic Care', componentKey: 'clinic_care', description: 'Clean clinical card with pulsing heart and ECG line draw', category: 'business-card', motionTier: 1, styleTone: 'Modern/Elegant, Clinical' },
    schema: clinicCareSchema,
  },
  dental_bright: {
    meta: { name: 'Dental Bright', componentKey: 'dental_bright', description: 'Bright mint card with sparkling tooth glint animation', category: 'business-card', motionTier: 1, styleTone: 'Modern/Elegant, Bright' },
    schema: dentalBrightSchema,
  },
  shutter_moment: {
    meta: { name: 'Shutter Moment', componentKey: 'shutter_moment', description: 'Camera shutter flash + photo reveal — for photographers', category: 'business-card', motionTier: 2, styleTone: 'Modern/Elegant, Photographer' },
    schema: shutterMomentSchema,
  },
  gold_radiance: {
    meta: { name: 'Gold Radiance', componentKey: 'gold_radiance', description: 'Luxurious gold-foil card with diagonal shine sweep', category: 'business-card', motionTier: 1, styleTone: 'Modern/Elegant, Ornate' },
    schema: goldRadianceSchema,
  },
  silver_elegance: {
    meta: { name: 'Silver Elegance', componentKey: 'silver_elegance', description: 'Platinum metallic card with cool-toned shine sweep', category: 'business-card', motionTier: 1, styleTone: 'Modern/Elegant, Moderate ornamentation' },
    schema: silverEleganceSchema,
  },
  receipt_style: {
    meta: { name: 'Receipt Style', componentKey: 'receipt_style', description: 'Thermal receipt look with monospace font and torn edges', category: 'business-card', motionTier: 0, styleTone: 'Classic/Local, Receipt variant' },
    schema: receiptStyleSchema,
  },
  coffee_steam: {
    meta: { name: 'Coffee Steam', componentKey: 'coffee_steam', description: 'Warm café card with continuous rising steam wisps', category: 'business-card', motionTier: 1, styleTone: 'Classic/Local, Warm brown/cream' },
    schema: coffeeSteamSchema,
  },
  restaurant_elegant: {
    meta: { name: 'Restaurant Elegant', componentKey: 'restaurant_elegant', description: 'Fine dining card with gold accent line and culinary motif', category: 'business-card', motionTier: 0, styleTone: 'Modern/Elegant, Minimal-to-moderate' },
    schema: restaurantElegantSchema,
  },
};

// Get all available template metadata (no React components)
export function getRegistryMeta(): Record<string, RegistryMetaEntry> {
  return { ...registryMeta };
}
