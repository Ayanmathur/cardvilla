/**
 * Static template metadata — safe to import in server-only contexts.
 * Does NOT import React components, so it can be used in Next.js API routes.
 */

import type { ConfigSchema, TemplateMeta } from './types';

// Import schemas directly (no React component dependencies)
import { babyAnnaprashanSchema } from './templates/baby-annaprashan/schema';
import { babyBirthAnnouncementSchema } from './templates/baby-birth-announcement/schema';
import { babyCradleCeremonySchema } from './templates/baby-cradle-ceremony/schema';
import { babyKrishnaBirthdaySchema } from './templates/baby-krishna-birthday/schema';
import { babyMundanCeremonySchema } from './templates/baby-mundan-ceremony/schema';
import { babyNamingCeremonySchema } from './templates/baby-naming-ceremony/schema';
import { babyPregnancyAnnouncementSchema } from './templates/baby-pregnancy-announcement/schema';
import { babyShowerSchema } from './templates/baby-shower/schema';
import { classicLocalSchema } from './templates/classic_local/schema';
import { clinicCareSchema } from './templates/clinic-care/schema';
import { coffeeSteamSchema } from './templates/coffee-steam/schema';
import { dentalBrightSchema } from './templates/dental-bright/schema';
import { devotionalAkhandPathSchema } from './templates/devotional-akhand-path/schema';
import { devotionalBhagwatKathaSchema } from './templates/devotional-bhagwat-katha/schema';
import { devotionalChurchPrayerSchema } from './templates/devotional-church-prayer/schema';
import { devotionalGaneshChaturthiSchema } from './templates/devotional-ganesh-chaturthi/schema';
import { devotionalGeneralSchema } from './templates/devotional-general/schema';
import { devotionalGrihaPraveshSchema } from './templates/devotional-griha-pravesh/schema';
import { devotionalKhatuShyamSchema } from './templates/devotional-khatu-shyam/schema';
import { devotionalMataKiChowkiSchema } from './templates/devotional-mata-ki-chowki/schema';
import { devotionalSaiSandhyaSchema } from './templates/devotional-sai-sandhya/schema';
import { devotionalSatsangSchema } from './templates/devotional-satsang/schema';
import { devotionalShraddhSchema } from './templates/devotional-shraddh/schema';
import { devotionalSunderkandSchema } from './templates/devotional-sunderkand/schema';
import { festivalBhaiDoojSchema } from './templates/festival-bhai-dooj/schema';
import { festivalBuddhaPurnimaSchema } from './templates/festival-buddha-purnima/schema';
import { festivalChildrensDaySchema } from './templates/festival-childrens-day/schema';
import { festivalChristmasSchema } from './templates/festival-christmas/schema';
import { festivalDiwaliSchema } from './templates/festival-diwali/schema';
import { festivalEidSchema } from './templates/festival-eid/schema';
import { festivalGurpurabSchema } from './templates/festival-gurpurab/schema';
import { festivalHoliSchema } from './templates/festival-holi/schema';
import { festivalNavratriSchema } from './templates/festival-navratri/schema';
import { festivalNewYearSchema } from './templates/festival-new-year/schema';
import { festivalRakhiSchema } from './templates/festival-rakhi/schema';
import { festivalRegionalNewYearSchema } from './templates/festival-regional-new-year/schema';
import { festivalValentinesSchema } from './templates/festival-valentines/schema';
import { goldRadianceSchema } from './templates/gold-radiance/schema';
import { kidsBirthdayJungleSchema } from './templates/kids-birthday-jungle/schema';
import { kidsBirthdayPrincessSchema } from './templates/kids-birthday-princess/schema';
import { kidsBirthdaySpaceSchema } from './templates/kids-birthday-space/schema';
import { kidsBirthdaySuperheroSchema } from './templates/kids-birthday-superhero/schema';
import { modernMinimalSchema } from './templates/modern_minimal/schema';
import { paperDioramaSchema } from './templates/paper-diorama/schema';
import { partyAnniversarySchema } from './templates/party-anniversary/schema';
import { partyBbqSchema } from './templates/party-bbq/schema';
import { partyCocktailSchema } from './templates/party-cocktail/schema';
import { partyDinnerElegantSchema } from './templates/party-dinner-elegant/schema';
import { partyFarewellSchema } from './templates/party-farewell/schema';
import { partyGrandOpeningSchema } from './templates/party-grand-opening/schema';
import { partyHousewarmingSchema } from './templates/party-housewarming/schema';
import { partyKittySchema } from './templates/party-kitty/schema';
import { partyNewYearSchema } from './templates/party-new-year/schema';
import { partyPoolSchema } from './templates/party-pool/schema';
import { partyRetirementSchema } from './templates/party-retirement/schema';
import { partyReunionSchema } from './templates/party-reunion/schema';
import { receiptStyleSchema } from './templates/receipt_style/schema';
import { restaurantElegantSchema } from './templates/restaurant_elegant/schema';
import { ropeKnotSchema } from './templates/rope_knot/schema';
import { salonSnipSchema } from './templates/salon-snip/schema';
import { shutterMomentSchema } from './templates/shutter-moment/schema';
import { silverEleganceSchema } from './templates/silver-elegance/schema';
import { weddingBeachDestinationSchema } from './templates/wedding-beach-destination/schema';
import { weddingBengaliSchema } from './templates/wedding-bengali/schema';
import { weddingChristianSchema } from './templates/wedding-christian/schema';
import { weddingEngagementRingSchema } from './templates/wedding-engagement-ring/schema';
import { weddingFloralRomanticSchema } from './templates/wedding-floral-romantic/schema';
import { weddingHinduMandapSchema } from './templates/wedding-hindu-mandap/schema';
import { weddingModernMinimalSchema } from './templates/wedding-modern-minimal/schema';
import { weddingMuslimNikahSchema } from './templates/wedding-muslim-nikah/schema';
import { weddingPunjabiBhangraSchema } from './templates/wedding-punjabi-bhangra/schema';
import { weddingRajasthaniRoyalSchema } from './templates/wedding-rajasthani-royal/schema';
import { weddingSaveTheDateSchema } from './templates/wedding-save-the-date/schema';
import { weddingSikhAnandKarajSchema } from './templates/wedding-sikh-anand-karaj/schema';
import { weddingSouthIndianSchema } from './templates/wedding-south-indian/schema';
import { woodGrainSchema } from './templates/wood_grain/schema';

export interface RegistryMetaEntry {
  meta: TemplateMeta;
  schema: ConfigSchema;
}

export const registryMeta: Record<string, RegistryMetaEntry> = {
  "baby_annaprashan": {
    meta: {
      "name": "Annaprashan (Rice Feeding Ceremony)",
      "componentKey": "baby_annaprashan",
      "description": "Annaprashan (Rice Feeding Ceremony) template for baby-kids",
      "category": "baby-kids",
      "motionTier": 1,
      "styleTone": "Warm/Traditional"
},
    schema: babyAnnaprashanSchema,
  },
  "baby_birth_announcement": {
    meta: {
      "name": "Birth Announcement",
      "componentKey": "baby_birth_announcement",
      "description": "Birth Announcement template for baby-kids",
      "category": "baby-kids",
      "motionTier": 1,
      "styleTone": "Joyful/Pastel"
},
    schema: babyBirthAnnouncementSchema,
  },
  "baby_cradle_ceremony": {
    meta: {
      "name": "Cradle Ceremony (Jhula)",
      "componentKey": "baby_cradle_ceremony",
      "description": "Cradle Ceremony (Jhula) template for baby-kids",
      "category": "baby-kids",
      "motionTier": 1,
      "styleTone": "Pastel/Sweet"
},
    schema: babyCradleCeremonySchema,
  },
  "baby_krishna_birthday": {
    meta: {
      "name": "1st Birthday — Krishna Theme",
      "componentKey": "baby_krishna_birthday",
      "description": "1st Birthday — Krishna Theme template for baby-kids",
      "category": "baby-kids",
      "motionTier": 1,
      "styleTone": "Devotional/Cute"
},
    schema: babyKrishnaBirthdaySchema,
  },
  "baby_mundan_ceremony": {
    meta: {
      "name": "Mundan Ceremony (Choolakarana)",
      "componentKey": "baby_mundan_ceremony",
      "description": "Mundan Ceremony (Choolakarana) template for baby-kids",
      "category": "baby-kids",
      "motionTier": 1,
      "styleTone": "Traditional/Blessing"
},
    schema: babyMundanCeremonySchema,
  },
  "baby_naming_ceremony": {
    meta: {
      "name": "Naming Ceremony (Namkaran)",
      "componentKey": "baby_naming_ceremony",
      "description": "Naming Ceremony (Namkaran) template for baby-kids",
      "category": "baby-kids",
      "motionTier": 1,
      "styleTone": "Traditional/Soft"
},
    schema: babyNamingCeremonySchema,
  },
  "baby_pregnancy_announcement": {
    meta: {
      "name": "Pregnancy Announcement",
      "componentKey": "baby_pregnancy_announcement",
      "description": "Pregnancy Announcement template for baby-kids",
      "category": "baby-kids",
      "motionTier": 1,
      "styleTone": "Soft/GenderNeutral"
},
    schema: babyPregnancyAnnouncementSchema,
  },
  "baby_shower": {
    meta: {
      "name": "Baby Shower",
      "componentKey": "baby_shower",
      "description": "Baby Shower template for baby-kids",
      "category": "baby-kids",
      "motionTier": 1,
      "styleTone": "Soft/Playful"
},
    schema: babyShowerSchema,
  },
  "classic_local": {
    meta: {
      "name": "Classic Local Base",
      "componentKey": "classic_local",
      "description": "Traditional bordered business card with ornate serif typography, cream background, and maroon accents.",
      "category": "Traditional",
      "motionTier": 0,
      "styleTone": "Classic & Local"
},
    schema: classicLocalSchema,
  },
  "clinic_care": {
    meta: {
      "name": "Clinic Care",
      "componentKey": "clinic_care",
      "description": "A clean, modern medical and clinical business card featuring heartbeat pulse animation.",
      "category": "Healthcare & Wellness",
      "motionTier": 1,
      "styleTone": "Modern & Clinical"
},
    schema: clinicCareSchema,
  },
  "coffee_steam": {
    meta: {
      "name": "Coffee Steam",
      "componentKey": "coffee_steam",
      "description": "A warm, cozy cafe business card with continuous rising steam ambient motion.",
      "category": "Food & Hospitality",
      "motionTier": 1,
      "styleTone": "Warm & Classic"
},
    schema: coffeeSteamSchema,
  },
  "dental_bright": {
    meta: {
      "name": "Dental Bright",
      "componentKey": "dental_bright",
      "description": "A clean, bright dental card featuring sparkling animation effects.",
      "category": "Healthcare & Dental",
      "motionTier": 1,
      "styleTone": "Modern & Clean"
},
    schema: dentalBrightSchema,
  },
  "devotional_akhand_path": {
    meta: {
      "name": "Akhand Path Sahib",
      "componentKey": "devotional_akhand_path",
      "description": "Akhand Path Sahib template for devotional",
      "category": "devotional",
      "motionTier": 1,
      "styleTone": "Sacred/Reverent"
},
    schema: devotionalAkhandPathSchema,
  },
  "devotional_bhagwat_katha": {
    meta: {
      "name": "Bhagwat Katha Saptah",
      "componentKey": "devotional_bhagwat_katha",
      "description": "Bhagwat Katha Saptah template for devotional",
      "category": "devotional",
      "motionTier": 1,
      "styleTone": "Sacred/Peacock"
},
    schema: devotionalBhagwatKathaSchema,
  },
  "devotional_church_prayer": {
    meta: {
      "name": "Church Prayer Service",
      "componentKey": "devotional_church_prayer",
      "description": "Church Prayer Service template for devotional",
      "category": "devotional",
      "motionTier": 1,
      "styleTone": "Peaceful/Christian"
},
    schema: devotionalChurchPrayerSchema,
  },
  "devotional_ganesh_chaturthi": {
    meta: {
      "name": "Ganesh Sthapana & Puja",
      "componentKey": "devotional_ganesh_chaturthi",
      "description": "Ganesh Sthapana & Puja template for devotional",
      "category": "devotional",
      "motionTier": 1,
      "styleTone": "Auspicious/Traditional"
},
    schema: devotionalGaneshChaturthiSchema,
  },
  "devotional_general": {
    meta: {
      "name": "Universal Devotional Invitation",
      "componentKey": "devotional_general",
      "description": "Universal Devotional Invitation template for devotional",
      "category": "devotional",
      "motionTier": 1,
      "styleTone": "Universal/Cream"
},
    schema: devotionalGeneralSchema,
  },
  "devotional_griha_pravesh": {
    meta: {
      "name": "Griha Pravesh & Vastu Puja",
      "componentKey": "devotional_griha_pravesh",
      "description": "Griha Pravesh & Vastu Puja template for devotional",
      "category": "devotional",
      "motionTier": 1,
      "styleTone": "Sacred/Traditional"
},
    schema: devotionalGrihaPraveshSchema,
  },
  "devotional_khatu_shyam": {
    meta: {
      "name": "Khatu Shyam Sandhya",
      "componentKey": "devotional_khatu_shyam",
      "description": "Khatu Shyam Sandhya template for devotional",
      "category": "devotional",
      "motionTier": 1,
      "styleTone": "Royal Devotional"
},
    schema: devotionalKhatuShyamSchema,
  },
  "devotional_mata_ki_chowki": {
    meta: {
      "name": "Mata Ki Chowki",
      "componentKey": "devotional_mata_ki_chowki",
      "description": "Mata Ki Chowki template for devotional",
      "category": "devotional",
      "motionTier": 1,
      "styleTone": "Devotional/Vibrant"
},
    schema: devotionalMataKiChowkiSchema,
  },
  "devotional_sai_sandhya": {
    meta: {
      "name": "Sai Sandhya",
      "componentKey": "devotional_sai_sandhya",
      "description": "Sai Sandhya template for devotional",
      "category": "devotional",
      "motionTier": 1,
      "styleTone": "Peaceful/Orange"
},
    schema: devotionalSaiSandhyaSchema,
  },
  "devotional_satsang": {
    meta: {
      "name": "Satsang / Bhagwat Katha",
      "componentKey": "devotional_satsang",
      "description": "Satsang / Bhagwat Katha template for devotional",
      "category": "devotional",
      "motionTier": 1,
      "styleTone": "Serene/Devotional"
},
    schema: devotionalSatsangSchema,
  },
  "devotional_shraddh": {
    meta: {
      "name": "Prayer Meet & Shraddh",
      "componentKey": "devotional_shraddh",
      "description": "Prayer Meet & Shraddh template for devotional",
      "category": "devotional",
      "motionTier": 0,
      "styleTone": "Solemn/Restrained"
},
    schema: devotionalShraddhSchema,
  },
  "devotional_sunderkand": {
    meta: {
      "name": "Sunderkand Path",
      "componentKey": "devotional_sunderkand",
      "description": "Sunderkand Path template for devotional",
      "category": "devotional",
      "motionTier": 1,
      "styleTone": "Sacred/Orange"
},
    schema: devotionalSunderkandSchema,
  },
  "festival_bhai_dooj": {
    meta: {
      "name": "Bhai Dooj Wishes",
      "componentKey": "festival_bhai_dooj",
      "description": "Bhai Dooj Wishes template for festival",
      "category": "festival",
      "motionTier": 1,
      "styleTone": "Traditional/Family"
},
    schema: festivalBhaiDoojSchema,
  },
  "festival_buddha_purnima": {
    meta: {
      "name": "Buddha Purnima Wishes",
      "componentKey": "festival_buddha_purnima",
      "description": "Buddha Purnima Wishes template for festival",
      "category": "festival",
      "motionTier": 1,
      "styleTone": "Serene/Peaceful"
},
    schema: festivalBuddhaPurnimaSchema,
  },
  "festival_childrens_day": {
    meta: {
      "name": "Happy Children's Day",
      "componentKey": "festival_childrens_day",
      "description": "Happy Children's Day template for festival",
      "category": "festival",
      "motionTier": 1,
      "styleTone": "Playful/Pastel"
},
    schema: festivalChildrensDaySchema,
  },
  "festival_christmas": {
    meta: {
      "name": "Merry Christmas",
      "componentKey": "festival_christmas",
      "description": "Merry Christmas template for festival",
      "category": "festival",
      "motionTier": 1,
      "styleTone": "Winter/Classic"
},
    schema: festivalChristmasSchema,
  },
  "festival_diwali": {
    meta: {
      "name": "Diwali Wishes",
      "componentKey": "festival_diwali",
      "description": "Diwali Wishes template for festival",
      "category": "festival",
      "motionTier": 2,
      "styleTone": "Festive/Golden"
},
    schema: festivalDiwaliSchema,
  },
  "festival_eid": {
    meta: {
      "name": "Eid Mubarak",
      "componentKey": "festival_eid",
      "description": "Eid Mubarak template for festival",
      "category": "festival",
      "motionTier": 1,
      "styleTone": "Emerald/Royal"
},
    schema: festivalEidSchema,
  },
  "festival_gurpurab": {
    meta: {
      "name": "Guru Nanak Gurpurab",
      "componentKey": "festival_gurpurab",
      "description": "Guru Nanak Gurpurab template for festival",
      "category": "festival",
      "motionTier": 1,
      "styleTone": "Sacred/Golden"
},
    schema: festivalGurpurabSchema,
  },
  "festival_holi": {
    meta: {
      "name": "Holi Festival Wishes",
      "componentKey": "festival_holi",
      "description": "Holi Festival Wishes template for festival",
      "category": "festival",
      "motionTier": 2,
      "styleTone": "Vibrant/Rainbow"
},
    schema: festivalHoliSchema,
  },
  "festival_navratri": {
    meta: {
      "name": "Navratri & Garba Wishes",
      "componentKey": "festival_navratri",
      "description": "Navratri & Garba Wishes template for festival",
      "category": "festival",
      "motionTier": 2,
      "styleTone": "Vibrant/Garba"
},
    schema: festivalNavratriSchema,
  },
  "festival_new_year": {
    meta: {
      "name": "Happy New Year Wishes",
      "componentKey": "festival_new_year",
      "description": "Happy New Year Wishes template for festival",
      "category": "festival",
      "motionTier": 2,
      "styleTone": "Celebratory/Sparkling"
},
    schema: festivalNewYearSchema,
  },
  "festival_rakhi": {
    meta: {
      "name": "Raksha Bandhan Wishes",
      "componentKey": "festival_rakhi",
      "description": "Raksha Bandhan Wishes template for festival",
      "category": "festival",
      "motionTier": 1,
      "styleTone": "Warm/Traditional"
},
    schema: festivalRakhiSchema,
  },
  "festival_regional_new_year": {
    meta: {
      "name": "Regional New Year (Gudi Padwa / Ugadi)",
      "componentKey": "festival_regional_new_year",
      "description": "Regional New Year (Gudi Padwa / Ugadi) template for festival",
      "category": "festival",
      "motionTier": 2,
      "styleTone": "Traditional/Vibrant"
},
    schema: festivalRegionalNewYearSchema,
  },
  "festival_valentines": {
    meta: {
      "name": "Happy Valentine's Day",
      "componentKey": "festival_valentines",
      "description": "Happy Valentine's Day template for festival",
      "category": "festival",
      "motionTier": 1,
      "styleTone": "Romantic/Pink"
},
    schema: festivalValentinesSchema,
  },
  "gold_radiance": {
    meta: {
      "name": "Gold Radiance",
      "componentKey": "gold_radiance",
      "description": "An ornate, luxurious black-and-gold business card with diagonal shine sweep animation.",
      "category": "Luxury & Jewelry",
      "motionTier": 1,
      "styleTone": "Ornate & Luxurious"
},
    schema: goldRadianceSchema,
  },
  "kids_birthday_jungle": {
    meta: {
      "name": "Kids Birthday — Jungle Safari",
      "componentKey": "kids_birthday_jungle",
      "description": "Kids Birthday — Jungle Safari template for baby-kids",
      "category": "baby-kids",
      "motionTier": 2,
      "styleTone": "Wild/Fun"
},
    schema: kidsBirthdayJungleSchema,
  },
  "kids_birthday_princess": {
    meta: {
      "name": "Kids Birthday — Princess",
      "componentKey": "kids_birthday_princess",
      "description": "Kids Birthday — Princess template for baby-kids",
      "category": "baby-kids",
      "motionTier": 1,
      "styleTone": "Magical/Pink"
},
    schema: kidsBirthdayPrincessSchema,
  },
  "kids_birthday_space": {
    meta: {
      "name": "Kids Birthday — Space Explorer",
      "componentKey": "kids_birthday_space",
      "description": "Kids Birthday — Space Explorer template for baby-kids",
      "category": "baby-kids",
      "motionTier": 2,
      "styleTone": "Futuristic/Dark"
},
    schema: kidsBirthdaySpaceSchema,
  },
  "kids_birthday_superhero": {
    meta: {
      "name": "Kids Birthday — Superhero",
      "componentKey": "kids_birthday_superhero",
      "description": "Kids Birthday — Superhero template for baby-kids",
      "category": "baby-kids",
      "motionTier": 1,
      "styleTone": "Action/Bold"
},
    schema: kidsBirthdaySuperheroSchema,
  },
  "modern_minimal": {
    meta: {
      "name": "Modern Minimal Base",
      "componentKey": "modern_minimal",
      "description": "Clean sans-serif business card with generous whitespace, dark background, and gold accent line.",
      "category": "Business",
      "motionTier": 0,
      "styleTone": "Modern & Minimal"
},
    schema: modernMinimalSchema,
  },
  "paper_diorama": {
    meta: {
      "name": "Paper Diorama",
      "componentKey": "paper_diorama",
      "description": "A creative, modern card featuring 2.5D paper cutout layers with smooth animations.",
      "category": "Creative & Design",
      "motionTier": 1,
      "styleTone": "Modern & Graphic"
},
    schema: paperDioramaSchema,
  },
  "party_anniversary": {
    meta: {
      "name": "Anniversary Celebration",
      "componentKey": "party_anniversary",
      "description": "Anniversary Celebration template for party",
      "category": "party",
      "motionTier": 1,
      "styleTone": "Warm/Romantic"
},
    schema: partyAnniversarySchema,
  },
  "party_bbq": {
    meta: {
      "name": "BBQ & Outdoor Grill Party",
      "componentKey": "party_bbq",
      "description": "BBQ & Outdoor Grill Party template for party",
      "category": "party",
      "motionTier": 1,
      "styleTone": "Rustic/Fun"
},
    schema: partyBbqSchema,
  },
  "party_cocktail": {
    meta: {
      "name": "Cocktail & Glam Party",
      "componentKey": "party_cocktail",
      "description": "Cocktail & Glam Party template for party",
      "category": "party",
      "motionTier": 1,
      "styleTone": "Glamorous/Dark"
},
    schema: partyCocktailSchema,
  },
  "party_dinner_elegant": {
    meta: {
      "name": "Elegant Dinner Party",
      "componentKey": "party_dinner_elegant",
      "description": "Elegant Dinner Party template for party",
      "category": "party",
      "motionTier": 0,
      "styleTone": "Minimal/Classy"
},
    schema: partyDinnerElegantSchema,
  },
  "party_farewell": {
    meta: {
      "name": "Farewell Party",
      "componentKey": "party_farewell",
      "description": "Farewell Party template for party",
      "category": "party",
      "motionTier": 1,
      "styleTone": "Warm/Thoughtful"
},
    schema: partyFarewellSchema,
  },
  "party_grand_opening": {
    meta: {
      "name": "Grand Opening",
      "componentKey": "party_grand_opening",
      "description": "Grand Opening template for party",
      "category": "party",
      "motionTier": 2,
      "styleTone": "Bold/Commercial"
},
    schema: partyGrandOpeningSchema,
  },
  "party_housewarming": {
    meta: {
      "name": "Housewarming (Griha Pravesh)",
      "componentKey": "party_housewarming",
      "description": "Housewarming (Griha Pravesh) template for party",
      "category": "party",
      "motionTier": 1,
      "styleTone": "Warm/Inviting"
},
    schema: partyHousewarmingSchema,
  },
  "party_kitty": {
    meta: {
      "name": "Kitty Party / Ladies' Gathering",
      "componentKey": "party_kitty",
      "description": "Kitty Party / Ladies' Gathering template for party",
      "category": "party",
      "motionTier": 1,
      "styleTone": "Playful/Social"
},
    schema: partyKittySchema,
  },
  "party_new_year": {
    meta: {
      "name": "New Year Bash",
      "componentKey": "party_new_year",
      "description": "New Year Bash template for party",
      "category": "party",
      "motionTier": 2,
      "styleTone": "Festive/Sparkling"
},
    schema: partyNewYearSchema,
  },
  "party_pool": {
    meta: {
      "name": "Pool Party",
      "componentKey": "party_pool",
      "description": "Pool Party template for party",
      "category": "party",
      "motionTier": 1,
      "styleTone": "Cool/Vibrant"
},
    schema: partyPoolSchema,
  },
  "party_retirement": {
    meta: {
      "name": "Retirement Party",
      "componentKey": "party_retirement",
      "description": "Retirement Party template for party",
      "category": "party",
      "motionTier": 1,
      "styleTone": "Dignified/Festive"
},
    schema: partyRetirementSchema,
  },
  "party_reunion": {
    meta: {
      "name": "Reunion / Get-Together",
      "componentKey": "party_reunion",
      "description": "Reunion / Get-Together template for party",
      "category": "party",
      "motionTier": 1,
      "styleTone": "Nostalgic/Social"
},
    schema: partyReunionSchema,
  },
  "receipt_style": {
    meta: {
      "name": "Receipt Style",
      "componentKey": "receipt_style",
      "description": "Thermal receipt business card with monospace font, itemized field divider lines, serrated edges, and barcode.",
      "category": "Novelty & Local",
      "motionTier": 0,
      "styleTone": "Novelty & Monospace"
},
    schema: receiptStyleSchema,
  },
  "restaurant_elegant": {
    meta: {
      "name": "Restaurant Modern Elegant",
      "componentKey": "restaurant_elegant",
      "description": "Sophisticated fine dining business card with dark palette, gold accent line rule, serif typography, and culinary motif.",
      "category": "Hospitality",
      "motionTier": 0,
      "styleTone": "Modern & Elegant"
},
    schema: restaurantElegantSchema,
  },
  "rope_knot": {
    meta: {
      "name": "Rope & Knot",
      "componentKey": "rope_knot",
      "description": "Nautical classic business card with linen background texture, rope-bordered frame, and corner knot motifs.",
      "category": "Traditional",
      "motionTier": 0,
      "styleTone": "Classic & Maritime"
},
    schema: ropeKnotSchema,
  },
  "salon_snip": {
    meta: {
      "name": "Salon Snip",
      "componentKey": "salon_snip",
      "description": "A premium, modern card for stylists and salons featuring a scissor snip animation.",
      "category": "Beauty & Wellness",
      "motionTier": 2,
      "styleTone": "Modern & Elegant"
},
    schema: salonSnipSchema,
  },
  "shutter_moment": {
    meta: {
      "name": "Shutter Moment",
      "componentKey": "shutter_moment",
      "description": "A premium, animated business card for photographers and videographers.",
      "category": "Professional Services",
      "motionTier": 2,
      "styleTone": "Elegant & Modern"
},
    schema: shutterMomentSchema,
  },
  "silver_elegance": {
    meta: {
      "name": "Silver Elegance",
      "componentKey": "silver_elegance",
      "description": "A modern, metallic silver card with icy blue accents and diagonal shine sweep animation.",
      "category": "Luxury & Professional",
      "motionTier": 1,
      "styleTone": "Modern & Metallic"
},
    schema: silverEleganceSchema,
  },
  "wedding_beach_destination": {
    meta: {
      "name": "Destination / Beach Wedding",
      "componentKey": "wedding_beach_destination",
      "description": "Destination / Beach Wedding template for wedding",
      "category": "wedding",
      "motionTier": 1,
      "styleTone": "Relaxed/Scenic"
},
    schema: weddingBeachDestinationSchema,
  },
  "wedding_bengali": {
    meta: {
      "name": "Bengali Wedding",
      "componentKey": "wedding_bengali",
      "description": "Bengali Wedding template for wedding",
      "category": "wedding",
      "motionTier": 1,
      "styleTone": "Traditional/Elegant"
},
    schema: weddingBengaliSchema,
  },
  "wedding_christian": {
    meta: {
      "name": "Christian Wedding",
      "componentKey": "wedding_christian",
      "description": "Christian Wedding template for wedding",
      "category": "wedding",
      "motionTier": 1,
      "styleTone": "Classic/Minimal"
},
    schema: weddingChristianSchema,
  },
  "wedding_engagement_ring": {
    meta: {
      "name": "Engagement / Ring Ceremony",
      "componentKey": "wedding_engagement_ring",
      "description": "Engagement / Ring Ceremony template for wedding",
      "category": "wedding",
      "motionTier": 1,
      "styleTone": "Elegant/Sparkly"
},
    schema: weddingEngagementRingSchema,
  },
  "wedding_floral_romantic": {
    meta: {
      "name": "Floral Romantic Wedding",
      "componentKey": "wedding_floral_romantic",
      "description": "Floral Romantic Wedding template for wedding",
      "category": "wedding",
      "motionTier": 1,
      "styleTone": "Soft/Romantic"
},
    schema: weddingFloralRomanticSchema,
  },
  "wedding_hindu_mandap": {
    meta: {
      "name": "Hindu Wedding — Mandap",
      "componentKey": "wedding_hindu_mandap",
      "description": "Hindu Wedding — Mandap template for wedding",
      "category": "wedding",
      "motionTier": 1,
      "styleTone": "Traditional/Ornate"
},
    schema: weddingHinduMandapSchema,
  },
  "wedding_modern_minimal": {
    meta: {
      "name": "Modern Minimalist Wedding",
      "componentKey": "wedding_modern_minimal",
      "description": "Modern Minimalist Wedding template for wedding",
      "category": "wedding",
      "motionTier": 0,
      "styleTone": "Modern/Clean"
},
    schema: weddingModernMinimalSchema,
  },
  "wedding_muslim_nikah": {
    meta: {
      "name": "Muslim Wedding — Nikah",
      "componentKey": "wedding_muslim_nikah",
      "description": "Muslim Wedding — Nikah template for wedding",
      "category": "wedding",
      "motionTier": 1,
      "styleTone": "Geometric/Royal"
},
    schema: weddingMuslimNikahSchema,
  },
  "wedding_punjabi_bhangra": {
    meta: {
      "name": "Punjabi / Bhangra Wedding",
      "componentKey": "wedding_punjabi_bhangra",
      "description": "Punjabi / Bhangra Wedding template for wedding",
      "category": "wedding",
      "motionTier": 2,
      "styleTone": "Vibrant/Festive"
},
    schema: weddingPunjabiBhangraSchema,
  },
  "wedding_rajasthani_royal": {
    meta: {
      "name": "Rajasthani Royal Wedding",
      "componentKey": "wedding_rajasthani_royal",
      "description": "Rajasthani Royal Wedding template for wedding",
      "category": "wedding",
      "motionTier": 1,
      "styleTone": "Royal/Ornate"
},
    schema: weddingRajasthaniRoyalSchema,
  },
  "wedding_save_the_date": {
    meta: {
      "name": "Save-the-Date / Countdown",
      "componentKey": "wedding_save_the_date",
      "description": "Save-the-Date / Countdown template for wedding",
      "category": "wedding",
      "motionTier": 1,
      "styleTone": "Neutral/Elegant"
},
    schema: weddingSaveTheDateSchema,
  },
  "wedding_sikh_anand_karaj": {
    meta: {
      "name": "Sikh Wedding — Anand Karaj",
      "componentKey": "wedding_sikh_anand_karaj",
      "description": "Sikh Wedding — Anand Karaj template for wedding",
      "category": "wedding",
      "motionTier": 1,
      "styleTone": "Sacred/Elegant"
},
    schema: weddingSikhAnandKarajSchema,
  },
  "wedding_south_indian": {
    meta: {
      "name": "South Indian Wedding",
      "componentKey": "wedding_south_indian",
      "description": "South Indian Wedding template for wedding",
      "category": "wedding",
      "motionTier": 1,
      "styleTone": "Traditional/Vibrant"
},
    schema: weddingSouthIndianSchema,
  },
  "wood_grain": {
    meta: {
      "name": "Wood Grain Craft",
      "componentKey": "wood_grain",
      "description": "Artisanal wooden plaque business card featuring CSS wood-grain gradients and laser-engraved typography.",
      "category": "Artisan",
      "motionTier": 0,
      "styleTone": "Classic & Rustic"
},
    schema: woodGrainSchema,
  },
};

export default registryMeta;
