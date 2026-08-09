const fs = require('fs');
const path = require('path');

const templates = [
  // ── 0. Baby & Kids (12) ──
  {
    dir: 'baby-shower',
    key: 'baby_shower',
    name: 'Baby Shower',
    category: 'baby-kids',
    pascal: 'BabyShower',
    schemaConst: 'babyShowerSchema',
    schemaImport: 'babyKidsFields',
    motionTier: 1,
    styleTone: 'Soft/Playful',
    bg: '#EFF6FF',
    text: '#1E3A8A',
    accent: '#3B82F6',
    animImports: ['floatBobVariants', 'slideUpVariants'],
    headline: '{data.child_name || "Baby Shower"}',
    subline: 'Celebrating New Life & Joy',
    svgIcon: `<svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="50" r="30" />
        <path d="M40 30 Q50 20 60 30" />
      </svg>`
  },
  {
    dir: 'baby-naming-ceremony',
    key: 'baby_naming_ceremony',
    name: 'Naming Ceremony (Namkaran)',
    category: 'baby-kids',
    pascal: 'BabyNamingCeremony',
    schemaConst: 'babyNamingCeremonySchema',
    schemaImport: 'babyKidsFields',
    motionTier: 1,
    styleTone: 'Traditional/Soft',
    bg: '#FFF8E7',
    text: '#2D3748',
    accent: '#FFB347',
    animImports: ['flameFlickerVariants', 'slideUpVariants'],
    headline: '{data.child_name || "Namkaran Sanskar"}',
    subline: 'Grand Naming Ceremony Blessing',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="20" />
      </svg>`
  },
  {
    dir: 'baby-cradle-ceremony',
    key: 'baby_cradle_ceremony',
    name: 'Cradle Ceremony (Jhula)',
    category: 'baby-kids',
    pascal: 'BabyCradleCeremony',
    schemaConst: 'babyCradleCeremonySchema',
    schemaImport: 'babyKidsFields',
    motionTier: 1,
    styleTone: 'Pastel/Sweet',
    bg: '#FFFACD',
    text: '#333333',
    accent: '#48BB78',
    animImports: ['swayVariants', 'slideUpVariants'],
    headline: '{data.child_name || "Cradle Ceremony"}',
    subline: 'Welcome Little Prince / Princess',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 30 Q50 60 80 30 M30 30 L30 10 M70 30 L70 10" />
      </svg>`
  },
  {
    dir: 'baby-birth-announcement',
    key: 'baby_birth_announcement',
    name: 'Birth Announcement',
    category: 'baby-kids',
    pascal: 'BabyBirthAnnouncement',
    schemaConst: 'babyBirthAnnouncementSchema',
    schemaImport: 'babyKidsFields',
    motionTier: 1,
    styleTone: 'Joyful/Pastel',
    bg: '#FEF3C7',
    text: '#78350F',
    accent: '#F59E0B',
    animImports: ['floatUpVariants', 'slideUpVariants'],
    headline: '{data.child_name || "Welcome Little One"}',
    subline: 'Our Precious Miracle Has Arrived',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="18" />
        <path d="M30 60 Q50 40 70 60" />
      </svg>`
  },
  {
    dir: 'baby-krishna-birthday',
    key: 'baby_krishna_birthday',
    name: '1st Birthday — Krishna Theme',
    category: 'baby-kids',
    pascal: 'BabyKrishnaBirthday',
    schemaConst: 'babyKrishnaBirthdaySchema',
    schemaImport: 'babyKidsFields',
    motionTier: 1,
    styleTone: 'Devotional/Cute',
    bg: '#005F73',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['swayVariants', 'slideUpVariants'],
    headline: '{data.child_name || "Little Kanha\'s 1st Birthday"}',
    subline: 'Turning 1 — Blessings & Celebration',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 40 Q50 10 80 40 M40 50 Q50 60 60 50" />
      </svg>`
  },
  {
    dir: 'kids-birthday-superhero',
    key: 'kids_birthday_superhero',
    name: 'Kids Birthday — Superhero',
    category: 'baby-kids',
    pascal: 'KidsBirthdaySuperhero',
    schemaConst: 'kidsBirthdaySuperheroSchema',
    schemaImport: 'babyKidsFields',
    motionTier: 1,
    styleTone: 'Action/Bold',
    bg: '#1E88E5',
    text: '#FFFFFF',
    accent: '#E53935',
    animImports: ['swayVariants', 'slideUpVariants'],
    headline: '{data.child_name || "Superhero Birthday Party"}',
    subline: 'Calling All Heroes to Celebrate!',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 L80 30 L70 70 L50 90 L30 70 L20 30 Z" />
      </svg>`
  },
  {
    dir: 'kids-birthday-princess',
    key: 'kids_birthday_princess',
    name: 'Kids Birthday — Princess',
    category: 'baby-kids',
    pascal: 'KidsBirthdayPrincess',
    schemaConst: 'kidsBirthdayPrincessSchema',
    schemaImport: 'babyKidsFields',
    motionTier: 1,
    styleTone: 'Magical/Pink',
    bg: '#FFF0F5',
    text: '#2D3748',
    accent: '#E91E63',
    animImports: ['sparkleVariants', 'slideUpVariants'],
    headline: '{data.child_name || "Royal Princess Party"}',
    subline: 'A Magical Birthday Kingdom',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 45 L30 20 L50 35 L70 20 L80 45 Z" />
      </svg>`
  },
  {
    dir: 'kids-birthday-jungle',
    key: 'kids_birthday_jungle',
    name: 'Kids Birthday — Jungle Safari',
    category: 'baby-kids',
    pascal: 'KidsBirthdayJungle',
    schemaConst: 'kidsBirthdayJungleSchema',
    schemaImport: 'babyKidsFields',
    motionTier: 2,
    styleTone: 'Wild/Fun',
    bg: '#2E7D32',
    text: '#FFFFFF',
    accent: '#FFC107',
    animImports: ['slideUpVariants', 'fadeInVariants'],
    headline: '{data.child_name || "Jungle Safari Party"}',
    subline: 'Get Ready for a Wild Adventure!',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 70 C20 40 50 20 80 70" />
      </svg>`
  },
  {
    dir: 'baby-mundan-ceremony',
    key: 'baby_mundan_ceremony',
    name: 'Mundan Ceremony (Choolakarana)',
    category: 'baby-kids',
    pascal: 'BabyMundanCeremony',
    schemaConst: 'babyMundanCeremonySchema',
    schemaImport: 'babyKidsFields',
    motionTier: 1,
    styleTone: 'Traditional/Blessing',
    bg: '#FFF8E7',
    text: '#2D3748',
    accent: '#D4AF37',
    animImports: ['petalDriftVariants', 'slideUpVariants'],
    headline: '{data.child_name || "Mundan Sanskar"}',
    subline: 'First Haircut & Divine Blessings',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="20" />
      </svg>`
  },
  {
    dir: 'baby-annaprashan',
    key: 'baby_annaprashan',
    name: 'Annaprashan (Rice Feeding Ceremony)',
    category: 'baby-kids',
    pascal: 'BabyAnnaprashan',
    schemaConst: 'babyAnnaprashanSchema',
    schemaImport: 'babyKidsFields',
    motionTier: 1,
    styleTone: 'Warm/Traditional',
    bg: '#FFF8E7',
    text: '#2D3748',
    accent: '#FF9933',
    animImports: ['confettiPieceVariants', 'slideUpVariants'],
    headline: '{data.child_name || "Annaprashan Ceremony"}',
    subline: 'First Solid Food & Blessing Ceremony',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <ellipse cx="50" cy="35" rx="30" ry="15" />
      </svg>`
  },
  {
    dir: 'baby-pregnancy-announcement',
    key: 'baby_pregnancy_announcement',
    name: 'Pregnancy Announcement',
    category: 'baby-kids',
    pascal: 'BabyPregnancyAnnouncement',
    schemaConst: 'babyPregnancyAnnouncementSchema',
    schemaImport: 'babyKidsFields',
    motionTier: 1,
    styleTone: 'Soft/GenderNeutral',
    bg: '#F3F4F6',
    text: '#1F2937',
    accent: '#9CA3AF',
    animImports: ['fadeInVariants', 'slideUpVariants'],
    headline: '{data.child_name || "We Are Expecting!"}',
    subline: 'Our Family is Growing by Two Feet',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M30 40 Q40 20 50 40 Q60 20 70 40" />
      </svg>`
  },
  {
    dir: 'kids-birthday-space',
    key: 'kids_birthday_space',
    name: 'Kids Birthday — Space Explorer',
    category: 'baby-kids',
    pascal: 'KidsBirthdaySpace',
    schemaConst: 'kidsBirthdaySpaceSchema',
    schemaImport: 'babyKidsFields',
    motionTier: 2,
    styleTone: 'Futuristic/Dark',
    bg: '#0D1B2A',
    text: '#F8FAFC',
    accent: '#00BCD4',
    animImports: ['sparkleVariants', 'slideUpVariants'],
    headline: '{data.child_name || "Blast Off Birthday Party!"}',
    subline: 'Exploring 3.. 2.. 1.. Liftoff!',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 Q70 40 50 80 Q30 40 50 10 Z" />
      </svg>`
  },

  // ── 1. Wedding & Pre-Wedding (13) ──
  {
    dir: 'wedding-hindu-mandap',
    key: 'wedding_hindu_mandap',
    name: 'Hindu Wedding — Mandap',
    category: 'wedding',
    pascal: 'WeddingHinduMandap',
    schemaConst: 'weddingHinduMandapSchema',
    schemaImport: 'weddingFields',
    motionTier: 1,
    styleTone: 'Traditional/Ornate',
    bg: '#8B1A1A',
    text: '#FFF8E7',
    accent: '#C9A84C',
    extra: '#5A0E0E',
    animImports: ['flameFlickerVariants', 'petalDriftVariants', 'slideUpVariants'],
    headline: '{data.partner1_name || "Partner 1"} & {data.partner2_name || "Partner 2"}',
    subline: '{data.partner1_family} {data.partner1_family && data.partner2_family && "&"} {data.partner2_family}',
    svgIcon: `<svg viewBox="0 0 100 50" width="80" height="40">
        <path d="M10 25 Q50 50 90 25" stroke="var(--color-accent)" fill="none" strokeWidth="2" />
        <motion.path d="M45 20 Q50 5 55 20 Q50 25 45 20" fill="var(--color-accent)" variants={flameFlickerVariants} initial="idle" animate="idle" />
      </svg>`
  },
  {
    dir: 'wedding-sikh-anand-karaj',
    key: 'wedding_sikh_anand_karaj',
    name: 'Sikh Wedding — Anand Karaj',
    category: 'wedding',
    pascal: 'WeddingSikhAnandKaraj',
    schemaConst: 'weddingSikhAnandKarajSchema',
    schemaImport: 'weddingFields',
    motionTier: 1,
    styleTone: 'Sacred/Elegant',
    bg: '#FF6B00',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['flameGlowVariants', 'slideUpVariants'],
    headline: '{data.partner1_name || "Groom"} & {data.partner2_name || "Bride"}',
    subline: 'Anand Karaj Ceremony',
    svgIcon: `<svg viewBox="0 0 100 100" width="70" height="70">
        <circle cx="50" cy="50" r="30" stroke="var(--color-accent)" fill="none" strokeWidth="2" />
        <path d="M50 10 L50 90 M20 50 L80 50" stroke="var(--color-accent)" strokeWidth="2" />
      </svg>`
  },
  {
    dir: 'wedding-muslim-nikah',
    key: 'wedding_muslim_nikah',
    name: 'Muslim Wedding — Nikah',
    category: 'wedding',
    pascal: 'WeddingMuslimNikah',
    schemaConst: 'weddingMuslimNikahSchema',
    schemaImport: 'weddingFields',
    motionTier: 1,
    styleTone: 'Geometric/Royal',
    bg: '#006400',
    text: '#FFFFF0',
    accent: '#FFD700',
    animImports: ['strokeDrawVariants', 'slideUpVariants'],
    headline: '{data.partner1_name || "Groom"} & {data.partner2_name || "Bride"}',
    subline: 'Nikah Ceremony',
    svgIcon: `<motion.svg viewBox="0 0 100 100" width="70" height="70" custom={1} variants={strokeDrawVariants} initial="hidden" animate="visible" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M60 20 A40 40 0 1 0 60 80 A30 30 0 1 1 60 20" />
      </motion.svg>`
  },
  {
    dir: 'wedding-christian',
    key: 'wedding_christian',
    name: 'Christian Wedding',
    category: 'wedding',
    pascal: 'WeddingChristian',
    schemaConst: 'weddingChristianSchema',
    schemaImport: 'weddingFields',
    motionTier: 1,
    styleTone: 'Classic/Minimal',
    bg: '#FFFFFF',
    text: '#1F2937',
    accent: '#D4AF37',
    animImports: ['slideUpVariants', 'fadeInVariants'],
    headline: '{data.partner1_name || "Bride"} & {data.partner2_name || "Groom"}',
    subline: 'Holy Matrimony',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="35" cy="30" r="20" />
        <circle cx="65" cy="30" r="20" />
      </svg>`
  },
  {
    dir: 'wedding-south-indian',
    key: 'wedding_south_indian',
    name: 'South Indian Wedding',
    category: 'wedding',
    pascal: 'WeddingSouthIndian',
    schemaConst: 'weddingSouthIndianSchema',
    schemaImport: 'weddingFields',
    motionTier: 1,
    styleTone: 'Traditional/Vibrant',
    bg: '#800020',
    text: '#FFFFFF',
    accent: '#FFD700',
    extra: '#2E5A1C',
    animImports: ['strokeDrawVariants', 'slideUpVariants'],
    headline: '{data.partner1_name || "Groom"} & {data.partner2_name || "Bride"}',
    subline: 'Kalyanam Celebration',
    svgIcon: `<motion.svg viewBox="0 0 100 100" width="70" height="70" custom={1} variants={strokeDrawVariants} initial="hidden" animate="visible" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
      </motion.svg>`
  },
  {
    dir: 'wedding-punjabi-bhangra',
    key: 'wedding_punjabi_bhangra',
    name: 'Punjabi / Bhangra Wedding',
    category: 'wedding',
    pascal: 'WeddingPunjabiBhangra',
    schemaConst: 'weddingPunjabiBhangraSchema',
    schemaImport: 'weddingFields',
    motionTier: 2,
    styleTone: 'Vibrant/Festive',
    bg: '#E91E63',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['confettiPieceVariants', 'slideUpVariants'],
    headline: '{data.partner1_name || "Groom"} & {data.partner2_name || "Bride"}',
    subline: 'Grand Punjabi Wedding & Sangeet',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <ellipse cx="50" cy="30" rx="40" ry="20" />
        <path d="M20 30 Q50 50 80 30" />
      </svg>`
  },
  {
    dir: 'wedding-rajasthani-royal',
    key: 'wedding_rajasthani_royal',
    name: 'Rajasthani Royal Wedding',
    category: 'wedding',
    pascal: 'WeddingRajasthaniRoyal',
    schemaConst: 'weddingRajasthaniRoyalSchema',
    schemaImport: 'weddingFields',
    motionTier: 1,
    styleTone: 'Royal/Ornate',
    bg: '#1A237E',
    text: '#FFFFFF',
    accent: '#D4AF37',
    animImports: ['sparkleVariants', 'slideUpVariants'],
    headline: '{data.partner1_name || "Groom"} & {data.partner2_name || "Bride"}',
    subline: 'Royal Wedding Celebration',
    svgIcon: `<svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 100 L20 50 Q50 10 80 50 L80 100" />
      </svg>`
  },
  {
    dir: 'wedding-bengali',
    key: 'wedding_bengali',
    name: 'Bengali Wedding',
    category: 'wedding',
    pascal: 'WeddingBengali',
    schemaConst: 'weddingBengaliSchema',
    schemaImport: 'weddingFields',
    motionTier: 1,
    styleTone: 'Traditional/Elegant',
    bg: '#CC0000',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['strokeDrawVariants', 'slideUpVariants'],
    headline: '{data.partner1_name || "Groom"} & {data.partner2_name || "Bride"}',
    subline: 'Biye Celebration',
    svgIcon: `<motion.svg viewBox="0 0 100 100" width="70" height="70" custom={1} variants={strokeDrawVariants} initial="hidden" animate="visible" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="50" r="30" />
        <path d="M50 20 L50 10 M50 80 L50 90 M20 50 L10 50 M80 50 L90 50" />
      </motion.svg>`
  },
  {
    dir: 'wedding-floral-romantic',
    key: 'wedding_floral_romantic',
    name: 'Floral Romantic Wedding',
    category: 'wedding',
    pascal: 'WeddingFloralRomantic',
    schemaConst: 'weddingFloralRomanticSchema',
    schemaImport: 'weddingFields',
    motionTier: 1,
    styleTone: 'Soft/Romantic',
    bg: '#FFF0F5',
    text: '#2D3748',
    accent: '#9CAF88',
    animImports: ['bloomVariants', 'slideUpVariants'],
    headline: '{data.partner1_name || "Bride"} & {data.partner2_name || "Groom"}',
    subline: 'Together Forever',
    svgIcon: `<motion.svg custom={1} variants={bloomVariants} initial="hidden" animate="visible" viewBox="0 0 100 100" width="70" height="70" fill="var(--color-accent)">
        <circle cx="50" cy="50" r="18" />
        <circle cx="50" cy="22" r="12" />
        <circle cx="50" cy="78" r="12" />
        <circle cx="22" cy="50" r="12" />
        <circle cx="78" cy="50" r="12" />
      </motion.svg>`
  },
  {
    dir: 'wedding-modern-minimal',
    key: 'wedding_modern_minimal',
    name: 'Modern Minimalist Wedding',
    category: 'wedding',
    pascal: 'WeddingModernMinimal',
    schemaConst: 'weddingModernMinimalSchema',
    schemaImport: 'weddingFields',
    motionTier: 0,
    styleTone: 'Modern/Clean',
    bg: '#FAFAF8',
    text: '#1A1A2E',
    accent: '#B76E79',
    animImports: ['slideUpVariants', 'fadeInVariants'],
    headline: '{data.partner1_name || "Bride"} & {data.partner2_name || "Groom"}',
    subline: 'Wedding Ceremony & Reception',
    svgIcon: `<svg viewBox="0 0 100 100" width="60" height="60" stroke="var(--color-accent)" fill="none" strokeWidth="1">
        <path d="M10 10 L40 10 L40 40" />
        <path d="M90 90 L60 90 L60 60" />
      </svg>`
  },
  {
    dir: 'wedding-beach-destination',
    key: 'wedding_beach_destination',
    name: 'Destination / Beach Wedding',
    category: 'wedding',
    pascal: 'WeddingBeachDestination',
    schemaConst: 'weddingBeachDestinationSchema',
    schemaImport: 'weddingFields',
    motionTier: 1,
    styleTone: 'Relaxed/Scenic',
    bg: '#005F73',
    text: '#FFFFFF',
    accent: '#E9D8A6',
    animImports: ['waveVariants', 'slideUpVariants'],
    headline: '{data.partner1_name || "Bride"} & {data.partner2_name || "Groom"}',
    subline: 'Destination Wedding by the Ocean',
    svgIcon: `<motion.svg custom={1} variants={waveVariants} initial="hidden" animate="animate" viewBox="0 0 100 40" width="80" height="32" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M0 20 Q12.5 10 25 20 T50 20 T75 20 T100 20" />
      </motion.svg>`
  },
  {
    dir: 'wedding-engagement-ring',
    key: 'wedding_engagement_ring',
    name: 'Engagement / Ring Ceremony',
    category: 'wedding',
    pascal: 'WeddingEngagementRing',
    schemaConst: 'weddingEngagementRingSchema',
    schemaImport: 'weddingFields',
    motionTier: 1,
    styleTone: 'Elegant/Sparkly',
    bg: '#FFF0F5',
    text: '#2D3748',
    accent: '#B76E79',
    animImports: ['glintVariants', 'sparkleVariants', 'slideUpVariants'],
    headline: '{data.partner1_name || "Bride"} & {data.partner2_name || "Groom"}',
    subline: 'Ring Ceremony & Engagement',
    svgIcon: `<svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="60" r="28" />
        <path d="M40 32 L60 32 L50 16 Z" />
      </svg>`
  },
  {
    dir: 'wedding-save-the-date',
    key: 'wedding_save_the_date',
    name: 'Save-the-Date / Countdown',
    category: 'wedding',
    pascal: 'WeddingSaveTheDate',
    schemaConst: 'weddingSaveTheDateSchema',
    schemaImport: 'weddingFields',
    motionTier: 1,
    styleTone: 'Neutral/Elegant',
    bg: '#0F1C2E',
    text: '#F8F7F4',
    accent: '#C9A84C',
    animImports: ['slideUpVariants'],
    headline: '{data.partner1_name || "Bride"} & {data.partner2_name || "Groom"}',
    subline: 'Save The Date',
    svgIcon: `<svg viewBox="0 0 100 100" width="60" height="60" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <rect x="20" y="25" width="60" height="60" rx="5" />
        <path d="M20 45 L80 45 M35 15 L35 35 M65 15 L65 35" />
      </svg>`
  },

  // ── 2. Party & Celebration (12) ──
  {
    dir: 'party-anniversary',
    key: 'party_anniversary',
    name: 'Anniversary Celebration',
    category: 'party',
    pascal: 'PartyAnniversary',
    schemaConst: 'partyAnniversarySchema',
    schemaImport: 'partyFields',
    motionTier: 1,
    styleTone: 'Warm/Romantic',
    bg: '#3A0007',
    text: '#FFF8E7',
    accent: '#B76E79',
    animImports: ['fadeInVariants', 'slideUpVariants'],
    headline: '{data.event_title || "Anniversary Celebration"}',
    subline: '{data.celebrant_name || "Together in Love"}',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M30 40 C10 20 40 10 50 30 C60 10 90 20 70 40 L50 60 Z" fill="var(--color-accent)" opacity="0.3"/>
      </svg>`
  },
  {
    dir: 'party-housewarming',
    key: 'party_housewarming',
    name: 'Housewarming (Griha Pravesh)',
    category: 'party',
    pascal: 'PartyHousewarming',
    schemaConst: 'partyHousewarmingSchema',
    schemaImport: 'partyFields',
    motionTier: 1,
    styleTone: 'Warm/Inviting',
    bg: '#CC5500',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['flameFlickerVariants', 'slideUpVariants'],
    headline: '{data.event_title || "Griha Pravesh & Housewarming"}',
    subline: 'Welcome to Our New Home',
    svgIcon: `<svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M10 50 L50 15 L90 50 L80 50 L80 85 L20 85 L20 50 Z" />
        <rect x="40" y="60" width="20" height="25" fill="var(--color-accent)" opacity="0.4"/>
      </svg>`
  },
  {
    dir: 'party-retirement',
    key: 'party_retirement',
    name: 'Retirement Party',
    category: 'party',
    pascal: 'PartyRetirement',
    schemaConst: 'partyRetirementSchema',
    schemaImport: 'partyFields',
    motionTier: 1,
    styleTone: 'Dignified/Festive',
    bg: '#1B2838',
    text: '#FFFFFF',
    accent: '#C9A84C',
    animImports: ['confettiPieceVariants', 'slideUpVariants'],
    headline: '{data.event_title || "Retirement Celebration"}',
    subline: 'Honoring {data.celebrant_name || "a Remarkable Career"}',
    svgIcon: `<svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="50" r="35" />
        <path d="M50 20 L50 50 L70 50" />
      </svg>`
  },
  {
    dir: 'party-cocktail',
    key: 'party_cocktail',
    name: 'Cocktail & Glam Party',
    category: 'party',
    pascal: 'PartyCocktail',
    schemaConst: 'partyCocktailSchema',
    schemaImport: 'partyFields',
    motionTier: 1,
    styleTone: 'Glamorous/Dark',
    bg: '#121212',
    text: '#F8FAF9',
    accent: '#E91E63',
    animImports: ['steamWispVariants', 'slideUpVariants'],
    headline: '{data.event_title || "Cocktails & Celebration"}',
    subline: 'Join Us for Drinks & Music',
    svgIcon: `<svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 20 L80 20 L50 60 L50 90 M30 90 L70 90" />
      </svg>`
  },
  {
    dir: 'party-pool',
    key: 'party_pool',
    name: 'Pool Party',
    category: 'party',
    pascal: 'PartyPool',
    schemaConst: 'partyPoolSchema',
    schemaImport: 'partyFields',
    motionTier: 1,
    styleTone: 'Cool/Vibrant',
    bg: '#00BCD4',
    text: '#FFFFFF',
    accent: '#FFF176',
    animImports: ['waveVariants', 'slideUpVariants'],
    headline: '{data.event_title || "Summer Pool Party"}',
    subline: 'Splash, Sun & Fun',
    svgIcon: `<motion.svg custom={1} variants={waveVariants} initial="hidden" animate="animate" viewBox="0 0 100 40" width="80" height="32" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M0 10 Q25 0 50 10 T100 10 M0 25 Q25 15 50 25 T100 25" />
      </motion.svg>`
  },
  {
    dir: 'party-grand-opening',
    key: 'party_grand_opening',
    name: 'Grand Opening',
    category: 'party',
    pascal: 'PartyGrandOpening',
    schemaConst: 'partyGrandOpeningSchema',
    schemaImport: 'partyFields',
    motionTier: 2,
    styleTone: 'Bold/Commercial',
    bg: '#B71C1C',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['confettiPieceVariants', 'slideUpVariants'],
    headline: '{data.event_title || "Grand Opening Ceremony"}',
    subline: 'You Are Cordially Invited',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M10 30 L90 30" strokeDasharray="4 4" />
        <circle cx="50" cy="30" r="10" />
      </svg>`
  },
  {
    dir: 'party-new-year',
    key: 'party_new_year',
    name: 'New Year Bash',
    category: 'party',
    pascal: 'PartyNewYear',
    schemaConst: 'partyNewYearSchema',
    schemaImport: 'partyFields',
    motionTier: 2,
    styleTone: 'Festive/Sparkling',
    bg: '#0D1B2A',
    text: '#FFFFFF',
    accent: '#E91E63',
    extra: '#FFD700',
    animImports: ['fireworkBurstVariants', 'confettiPieceVariants', 'slideUpVariants'],
    headline: '{data.event_title || "New Year Celebration"}',
    subline: 'Welcome the New Year in Style',
    svgIcon: `<svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 L50 90 M10 50 L90 50 M20 20 L80 80 M20 80 L80 20" />
      </svg>`
  },
  {
    dir: 'party-farewell',
    key: 'party_farewell',
    name: 'Farewell Party',
    category: 'party',
    pascal: 'PartyFarewell',
    schemaConst: 'partyFarewellSchema',
    schemaImport: 'partyFields',
    motionTier: 1,
    styleTone: 'Warm/Thoughtful',
    bg: '#1A237E',
    text: '#FFFFFF',
    accent: '#64B5F6',
    animImports: ['slideUpVariants', 'fadeInVariants'],
    headline: '{data.event_title || "Farewell & Bon Voyage"}',
    subline: 'Wishing You All the Best',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M10 70 L90 10 L50 50 Z" />
      </svg>`
  },
  {
    dir: 'party-kitty',
    key: 'party_kitty',
    name: "Kitty Party / Ladies' Gathering",
    category: 'party',
    pascal: 'PartyKitty',
    schemaConst: 'partyKittySchema',
    schemaImport: 'partyFields',
    motionTier: 1,
    styleTone: 'Playful/Social',
    bg: '#FFF0F5',
    text: '#2D3748',
    accent: '#E91E63',
    animImports: ['steamWispVariants', 'slideUpVariants'],
    headline: '{data.event_title || "Ladies Kitty Party"}',
    subline: 'Laughter, Tea & Good Times',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 20 L80 20 L75 50 Q50 65 25 50 Z M80 25 Q95 25 95 35 Q95 45 75 45" />
      </svg>`
  },
  {
    dir: 'party-dinner-elegant',
    key: 'party_dinner_elegant',
    name: 'Elegant Dinner Party',
    category: 'party',
    pascal: 'PartyDinnerElegant',
    schemaConst: 'partyDinnerElegantSchema',
    schemaImport: 'partyFields',
    motionTier: 0,
    styleTone: 'Minimal/Classy',
    bg: '#1C1917',
    text: '#F5F5F4',
    accent: '#D4AF37',
    animImports: ['flameGlowVariants', 'slideUpVariants'],
    headline: '{data.event_title || "An Evening of Fine Dining"}',
    subline: 'Dinner & Conversation',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="22" />
        <line x1="20" y1="10" x2="20" y2="50" />
        <line x1="80" y1="10" x2="80" y2="50" />
      </svg>`
  },
  {
    dir: 'party-bbq',
    key: 'party_bbq',
    name: 'BBQ & Outdoor Grill Party',
    category: 'party',
    pascal: 'PartyBbq',
    schemaConst: 'partyBbqSchema',
    schemaImport: 'partyFields',
    motionTier: 1,
    styleTone: 'Rustic/Fun',
    bg: '#7C2D12',
    text: '#FFEDD5',
    accent: '#FB923C',
    animImports: ['flameFlickerVariants', 'slideUpVariants'],
    headline: '{data.event_title || "BBQ & Grill Party"}',
    subline: 'Good Food & Great Friends',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 30 Q50 60 80 30 M30 30 L30 70 M70 30 L70 70 M50 30 L50 70" />
      </svg>`
  },
  {
    dir: 'party-reunion',
    key: 'party_reunion',
    name: 'Reunion / Get-Together',
    category: 'party',
    pascal: 'PartyReunion',
    schemaConst: 'partyReunionSchema',
    schemaImport: 'partyFields',
    motionTier: 1,
    styleTone: 'Nostalgic/Social',
    bg: '#0F172A',
    text: '#F8FAFC',
    accent: '#38BDF8',
    animImports: ['strokeDrawVariants', 'slideUpVariants'],
    headline: '{data.event_title || "Batch & Family Reunion"}',
    subline: 'Reconnecting Old Memories',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="30" cy="30" r="12" />
        <circle cx="70" cy="30" r="12" />
        <circle cx="50" cy="45" r="12" />
      </svg>`
  },

  // ── 3. Puja / Path & Devotional (12) ──
  {
    dir: 'devotional-griha-pravesh',
    key: 'devotional_griha_pravesh',
    name: 'Griha Pravesh & Vastu Puja',
    category: 'devotional',
    pascal: 'DevotionalGrihaPravesh',
    schemaConst: 'devotionalGrihaPraveshSchema',
    schemaImport: 'devotionalFields',
    motionTier: 1,
    styleTone: 'Sacred/Traditional',
    bg: '#8B1A1A',
    text: '#FFF8E7',
    accent: '#FFD700',
    animImports: ['flameFlickerVariants', 'flameGlowVariants', 'slideUpVariants'],
    headline: '{data.ceremony_title || "Griha Pravesh & Vastu Shanti Puja"}',
    subline: 'Seeking Divine Blessings for Our Home',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 45 L50 20 L80 45 M35 45 L35 55 L65 55 L65 45" />
      </svg>`
  },
  {
    dir: 'devotional-satsang',
    key: 'devotional_satsang',
    name: 'Satsang / Bhagwat Katha',
    category: 'devotional',
    pascal: 'DevotionalSatsang',
    schemaConst: 'devotionalSatsangSchema',
    schemaImport: 'devotionalFields',
    motionTier: 1,
    styleTone: 'Serene/Devotional',
    bg: '#FF6B00',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['bloomVariants', 'slideUpVariants'],
    headline: '{data.ceremony_title || "Shrimad Bhagwat Katha & Satsang"}',
    subline: 'Divine Discourse & Bhajan Sandhya',
    svgIcon: `<motion.svg custom={1} variants={bloomVariants} initial="hidden" animate="visible" viewBox="0 0 100 80" width="80" height="64" fill="var(--color-accent)">
        <ellipse cx="50" cy="50" rx="30" ry="15" />
        <ellipse cx="50" cy="50" rx="15" ry="30" />
      </motion.svg>`
  },
  {
    dir: 'devotional-mata-ki-chowki',
    key: 'devotional_mata_ki_chowki',
    name: 'Mata Ki Chowki',
    category: 'devotional',
    pascal: 'DevotionalMataKiChowki',
    schemaConst: 'devotionalMataKiChowkiSchema',
    schemaImport: 'devotionalFields',
    motionTier: 1,
    styleTone: 'Devotional/Vibrant',
    bg: '#800020',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['flameGlowVariants', 'slideUpVariants'],
    headline: '{data.ceremony_title || "Mata Ki Chowki & Jagran"}',
    subline: 'Jai Mata Di — Devotional Prayers',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 L50 70 M35 25 L65 25 M30 15 L50 25 L70 15" />
      </svg>`
  },
  {
    dir: 'devotional-akhand-path',
    key: 'devotional_akhand_path',
    name: 'Akhand Path Sahib',
    category: 'devotional',
    pascal: 'DevotionalAkhandPath',
    schemaConst: 'devotionalAkhandPathSchema',
    schemaImport: 'devotionalFields',
    motionTier: 1,
    styleTone: 'Sacred/Reverent',
    bg: '#FF6B00',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['flameGlowVariants', 'slideUpVariants'],
    headline: '{data.ceremony_title || "Sri Akhand Path Sahib"}',
    subline: 'Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh',
    svgIcon: `<svg viewBox="0 0 100 100" width="70" height="70" fill="var(--color-accent)">
        <text x="50" y="65" fontSize="45" textAnchor="middle" fontFamily="serif" fontWeight="bold">ੴ</text>
      </svg>`
  },
  {
    dir: 'devotional-ganesh-chaturthi',
    key: 'devotional_ganesh_chaturthi',
    name: 'Ganesh Sthapana & Puja',
    category: 'devotional',
    pascal: 'DevotionalGaneshChaturthi',
    schemaConst: 'devotionalGaneshChaturthiSchema',
    schemaImport: 'devotionalFields',
    motionTier: 1,
    styleTone: 'Auspicious/Traditional',
    bg: '#B71C1C',
    text: '#FFF8E7',
    accent: '#FFD700',
    animImports: ['fadeInVariants', 'slideUpVariants'],
    headline: '{data.ceremony_title || "Ganesh Sthapana & Puja"}',
    subline: 'Ganpati Bappa Morya',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M30 30 Q50 10 70 30 Q50 70 30 30 Z" />
      </svg>`
  },
  {
    dir: 'devotional-sunderkand',
    key: 'devotional_sunderkand',
    name: 'Sunderkand Path',
    category: 'devotional',
    pascal: 'DevotionalSunderkand',
    schemaConst: 'devotionalSunderkandSchema',
    schemaImport: 'devotionalFields',
    motionTier: 1,
    styleTone: 'Sacred/Orange',
    bg: '#C62828',
    text: '#FFFFFF',
    accent: '#FF9800',
    animImports: ['flameFlickerVariants', 'slideUpVariants'],
    headline: '{data.ceremony_title || "Sri Sunderkand Path"}',
    subline: 'Jai Sri Ram — Devotional Recitation',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M10 50 Q50 10 90 50" />
      </svg>`
  },
  {
    dir: 'devotional-khatu-shyam',
    key: 'devotional_khatu_shyam',
    name: 'Khatu Shyam Sandhya',
    category: 'devotional',
    pascal: 'DevotionalKhatuShyam',
    schemaConst: 'devotionalKhatuShyamSchema',
    schemaImport: 'devotionalFields',
    motionTier: 1,
    styleTone: 'Royal Devotional',
    bg: '#1A5276',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['swayVariants', 'slideUpVariants'],
    headline: '{data.ceremony_title || "Khatu Shyam Bhajan Sandhya"}',
    subline: 'Hare Ka Sahara — Baba Shyam Hamara',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 C30 30 70 50 50 80" />
      </svg>`
  },
  {
    dir: 'devotional-sai-sandhya',
    key: 'devotional_sai_sandhya',
    name: 'Sai Sandhya',
    category: 'devotional',
    pascal: 'DevotionalSaiSandhya',
    schemaConst: 'devotionalSaiSandhyaSchema',
    schemaImport: 'devotionalFields',
    motionTier: 1,
    styleTone: 'Peaceful/Orange',
    bg: '#E65100',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['flameGlowVariants', 'slideUpVariants'],
    headline: '{data.ceremony_title || "Sai Bhajan Sandhya"}',
    subline: 'Om Sai Ram — Sabka Malik Ek',
    svgIcon: `<svg viewBox="0 0 100 70" width="80" height="56" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <ellipse cx="50" cy="45" rx="35" ry="15" />
        <path d="M40 30 Q50 10 60 30" />
      </svg>`
  },
  {
    dir: 'devotional-shraddh',
    key: 'devotional_shraddh',
    name: 'Prayer Meet & Shraddh',
    category: 'devotional',
    pascal: 'DevotionalShraddh',
    schemaConst: 'devotionalShraddhSchema',
    schemaImport: 'devotionalFields',
    motionTier: 0,
    styleTone: 'Solemn/Restrained',
    bg: '#F5F5F5',
    text: '#2D3748',
    accent: '#718096',
    animImports: ['fadeInVariants', 'slideUpVariants'],
    headline: '{data.ceremony_title || "Prayer Meeting & Tribute"}',
    subline: 'In Loving Memory & Homage',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="1">
        <path d="M50 20 L50 60 M30 40 L70 40" />
      </svg>`
  },
  {
    dir: 'devotional-bhagwat-katha',
    key: 'devotional_bhagwat_katha',
    name: 'Bhagwat Katha Saptah',
    category: 'devotional',
    pascal: 'DevotionalBhagwatKatha',
    schemaConst: 'devotionalBhagwatKathaSchema',
    schemaImport: 'devotionalFields',
    motionTier: 1,
    styleTone: 'Sacred/Peacock',
    bg: '#005F73',
    text: '#FFFFFF',
    accent: '#E9D8A6',
    animImports: ['swayVariants', 'slideUpVariants'],
    headline: '{data.ceremony_title || "Shrimad Bhagwat Saptah Gyan Yajna"}',
    subline: 'Jai Sri Krishna',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 40 Q50 10 80 40 M40 50 Q50 60 60 50" />
      </svg>`
  },
  {
    dir: 'devotional-church-prayer',
    key: 'devotional_church_prayer',
    name: 'Church Prayer Service',
    category: 'devotional',
    pascal: 'DevotionalChurchPrayer',
    schemaConst: 'devotionalChurchPrayerSchema',
    schemaImport: 'devotionalFields',
    motionTier: 1,
    styleTone: 'Peaceful/Christian',
    bg: '#0F172A',
    text: '#F8FAFC',
    accent: '#E2E8F0',
    animImports: ['flameGlowVariants', 'slideUpVariants'],
    headline: '{data.ceremony_title || "Church Prayer & Worship Service"}',
    subline: 'Come Let Us Worship Together',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 L50 70 M30 30 L70 30" />
      </svg>`
  },
  {
    dir: 'devotional-general',
    key: 'devotional_general',
    name: 'Universal Devotional Invitation',
    category: 'devotional',
    pascal: 'DevotionalGeneral',
    schemaConst: 'devotionalGeneralSchema',
    schemaImport: 'devotionalFields',
    motionTier: 1,
    styleTone: 'Universal/Cream',
    bg: '#FFF8E7',
    text: '#2D3748',
    accent: '#C9A84C',
    animImports: ['flameFlickerVariants', 'slideUpVariants'],
    headline: '{data.ceremony_title || "Auspicious Devotional Ceremony"}',
    subline: 'Blessings & Warm Welcome',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="20" />
      </svg>`
  },

  // ── 4. Festival Wishes (13) ──
  {
    dir: 'festival-diwali',
    key: 'festival_diwali',
    name: 'Diwali Wishes',
    category: 'festival',
    pascal: 'FestivalDiwali',
    schemaConst: 'festivalDiwaliSchema',
    schemaImport: 'festivalFields',
    motionTier: 2,
    styleTone: 'Festive/Golden',
    bg: '#5A0E0E',
    text: '#FFF8E7',
    accent: '#FFD700',
    animImports: ['flameFlickerVariants', 'fireworkBurstVariants', 'slideUpVariants'],
    headline: '{data.greeting_line || "Happy & Prosperous Diwali!"}',
    subline: 'May Light & Joy Fill Your Life',
    svgIcon: `<svg viewBox="0 0 100 50" width="80" height="40">
        <path d="M10 25 Q50 50 90 25" stroke="var(--color-accent)" fill="none" strokeWidth="2" />
        <motion.path d="M45 20 Q50 5 55 20 Q50 25 45 20" fill="var(--color-accent)" variants={flameFlickerVariants} initial="idle" animate="idle" />
      </svg>`
  },
  {
    dir: 'festival-holi',
    key: 'festival_holi',
    name: 'Holi Festival Wishes',
    category: 'festival',
    pascal: 'FestivalHoli',
    schemaConst: 'festivalHoliSchema',
    schemaImport: 'festivalFields',
    motionTier: 2,
    styleTone: 'Vibrant/Rainbow',
    bg: '#E91E63',
    text: '#FFFFFF',
    accent: '#FFD700',
    extra: '#00BCD4',
    animImports: ['confettiPieceVariants', 'slideUpVariants'],
    headline: '{data.greeting_line || "Happy Holi!"}',
    subline: 'Wishing You Colors of Joy & Happiness',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" fill="var(--color-accent)">
        <circle cx="30" cy="40" r="20" fill="#00BCD4" opacity="0.8"/>
        <circle cx="70" cy="40" r="20" fill="#FFEB3B" opacity="0.8"/>
        <circle cx="50" cy="30" r="20" fill="#E91E63" opacity="0.8"/>
      </svg>`
  },
  {
    dir: 'festival-christmas',
    key: 'festival_christmas',
    name: 'Merry Christmas',
    category: 'festival',
    pascal: 'FestivalChristmas',
    schemaConst: 'festivalChristmasSchema',
    schemaImport: 'festivalFields',
    motionTier: 1,
    styleTone: 'Winter/Classic',
    bg: '#1B5E20',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['sparkleVariants', 'petalDriftVariants', 'slideUpVariants'],
    headline: '{data.greeting_line || "Merry Christmas & Happy New Year!"}',
    subline: 'Peace, Love & Joy',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 L25 40 L35 40 L15 65 L85 65 L65 40 L75 40 Z" fill="var(--color-accent)" opacity="0.3"/>
      </svg>`
  },
  {
    dir: 'festival-eid',
    key: 'festival_eid',
    name: 'Eid Mubarak',
    category: 'festival',
    pascal: 'FestivalEid',
    schemaConst: 'festivalEidSchema',
    schemaImport: 'festivalFields',
    motionTier: 1,
    styleTone: 'Emerald/Royal',
    bg: '#004D40',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['strokeDrawVariants', 'flameGlowVariants', 'slideUpVariants'],
    headline: '{data.greeting_line || "Eid Mubarak!"}',
    subline: 'May Allah Bless You With Happiness',
    svgIcon: `<svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M60 20 A40 40 0 1 0 60 80 A30 30 0 1 1 60 20" />
      </svg>`
  },
  {
    dir: 'festival-rakhi',
    key: 'festival_rakhi',
    name: 'Raksha Bandhan Wishes',
    category: 'festival',
    pascal: 'FestivalRakhi',
    schemaConst: 'festivalRakhiSchema',
    schemaImport: 'festivalFields',
    motionTier: 1,
    styleTone: 'Warm/Traditional',
    bg: '#B71C1C',
    text: '#FFF8E7',
    accent: '#FFD700',
    animImports: ['ribbonTieVariants', 'slideUpVariants'],
    headline: '{data.greeting_line || "Happy Raksha Bandhan!"}',
    subline: 'Celebrating the Sacred Bond of Siblings',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="15" />
        <line x1="0" y1="30" x2="35" y2="30" />
        <line x1="65" y1="30" x2="100" y2="30" />
      </svg>`
  },
  {
    dir: 'festival-navratri',
    key: 'festival_navratri',
    name: 'Navratri & Garba Wishes',
    category: 'festival',
    pascal: 'FestivalNavratri',
    schemaConst: 'festivalNavratriSchema',
    schemaImport: 'festivalFields',
    motionTier: 2,
    styleTone: 'Vibrant/Garba',
    bg: '#4A148C',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['sparkleVariants', 'slideUpVariants'],
    headline: '{data.greeting_line || "Shubh Navratri!"}',
    subline: 'Dance, Joy & Divine Blessings',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <line x1="20" y1="10" x2="80" y2="70" />
        <line x1="80" y1="10" x2="20" y2="70" />
      </svg>`
  },
  {
    dir: 'festival-new-year',
    key: 'festival_new_year',
    name: 'Happy New Year Wishes',
    category: 'festival',
    pascal: 'FestivalNewYear',
    schemaConst: 'festivalNewYearSchema',
    schemaImport: 'festivalFields',
    motionTier: 2,
    styleTone: 'Celebratory/Sparkling',
    bg: '#0F172A',
    text: '#F8FAFC',
    accent: '#F43F5E',
    extra: '#F59E0B',
    animImports: ['fireworkBurstVariants', 'confettiPieceVariants', 'slideUpVariants'],
    headline: '{data.greeting_line || "Happy New Year!"}',
    subline: 'Wishing You Health, Wealth & Happiness',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="40" r="5" />
        <path d="M50 15 L50 25 M50 55 L50 65 M25 40 L35 40 M65 40 L75 40" />
      </svg>`
  },
  {
    dir: 'festival-valentines',
    key: 'festival_valentines',
    name: "Happy Valentine's Day",
    category: 'festival',
    pascal: 'FestivalValentines',
    schemaConst: 'festivalValentinesSchema',
    schemaImport: 'festivalFields',
    motionTier: 1,
    styleTone: 'Romantic/Pink',
    bg: '#E91E63',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['floatUpVariants', 'slideUpVariants'],
    headline: '{data.greeting_line || "Happy Valentine\'s Day!"}',
    subline: 'Love & Warmth Always',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" fill="var(--color-accent)">
        <path d="M50 30 C30 10 10 30 30 50 L50 70 L70 50 C90 30 70 10 50 30 Z" />
      </svg>`
  },
  {
    dir: 'festival-gurpurab',
    key: 'festival_gurpurab',
    name: 'Guru Nanak Gurpurab',
    category: 'festival',
    pascal: 'FestivalGurpurab',
    schemaConst: 'festivalGurpurabSchema',
    schemaImport: 'festivalFields',
    motionTier: 1,
    styleTone: 'Sacred/Golden',
    bg: '#FF6B00',
    text: '#FFFFFF',
    accent: '#FFD700',
    animImports: ['flameGlowVariants', 'slideUpVariants'],
    headline: '{data.greeting_line || "Happy Gurpurab!"}',
    subline: 'May Guru Nanak Dev Ji Bless You',
    svgIcon: `<svg viewBox="0 0 100 100" width="70" height="70" fill="var(--color-accent)">
        <text x="50" y="65" fontSize="45" textAnchor="middle" fontFamily="serif" fontWeight="bold">ੴ</text>
      </svg>`
  },
  {
    dir: 'festival-bhai-dooj',
    key: 'festival_bhai_dooj',
    name: 'Bhai Dooj Wishes',
    category: 'festival',
    pascal: 'FestivalBhaiDooj',
    schemaConst: 'festivalBhaiDoojSchema',
    schemaImport: 'festivalFields',
    motionTier: 1,
    styleTone: 'Traditional/Family',
    bg: '#8B1A1A',
    text: '#FFF8E7',
    accent: '#FFD700',
    animImports: ['flameFlickerVariants', 'slideUpVariants'],
    headline: '{data.greeting_line || "Happy Bhai Dooj!"}',
    subline: 'Celebrating Sibling Love & Protection',
    svgIcon: `<svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="18" />
        <path d="M50 15 L50 45" />
      </svg>`
  },
  {
    dir: 'festival-buddha-purnima',
    key: 'festival_buddha_purnima',
    name: 'Buddha Purnima Wishes',
    category: 'festival',
    pascal: 'FestivalBuddhaPurnima',
    schemaConst: 'festivalBuddhaPurnimaSchema',
    schemaImport: 'festivalFields',
    motionTier: 1,
    styleTone: 'Serene/Peaceful',
    bg: '#F5F7F8',
    text: '#1E293B',
    accent: '#9CAF88',
    animImports: ['bloomVariants', 'slideUpVariants'],
    headline: '{data.greeting_line || "Happy Buddha Purnima!"}',
    subline: 'Peace, Compassion & Enlightenment',
    svgIcon: `<motion.svg custom={1} variants={bloomVariants} initial="hidden" animate="visible" viewBox="0 0 100 80" width="80" height="64" fill="var(--color-accent)">
        <circle cx="50" cy="40" r="15" />
        <circle cx="35" cy="40" r="10" />
        <circle cx="65" cy="40" r="10" />
      </motion.svg>`
  },
  {
    dir: 'festival-childrens-day',
    key: 'festival_childrens_day',
    name: "Happy Children's Day",
    category: 'festival',
    pascal: 'FestivalChildrensDay',
    schemaConst: 'festivalChildrensDaySchema',
    schemaImport: 'festivalFields',
    motionTier: 1,
    styleTone: 'Playful/Pastel',
    bg: '#FEF08A',
    text: '#1E293B',
    accent: '#06B6D4',
    animImports: ['floatUpVariants', 'slideUpVariants'],
    headline: '{data.greeting_line || "Happy Children\'s Day!"}',
    subline: 'Keep Smiling & Dreaming Big',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="18" />
        <path d="M50 48 L50 80 M50 80 L35 65 M50 80 L65 65" />
      </svg>`
  },
  {
    dir: 'festival-regional-new-year',
    key: 'festival_regional_new_year',
    name: 'Regional New Year (Gudi Padwa / Ugadi)',
    category: 'festival',
    pascal: 'FestivalRegionalNewYear',
    schemaConst: 'festivalRegionalNewYearSchema',
    schemaImport: 'festivalFields',
    motionTier: 2,
    styleTone: 'Traditional/Vibrant',
    bg: '#047857',
    text: '#FFFFFF',
    accent: '#F59E0B',
    animImports: ['fireworkBurstVariants', 'slideUpVariants'],
    headline: '{data.greeting_line || "Happy Ugadi & Gudi Padwa!"}',
    subline: 'Wishing You Joy, Health & New Beginnings',
    svgIcon: `<svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 L50 70 M50 10 L70 30 L50 50 Z" />
      </svg>`
  }
];

const targetDir = path.join(__dirname, '..', 'src', 'templates');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

let generatedCount = 0;
const registeredExports = [];

templates.forEach((t) => {
  const templatePath = path.join(targetDir, t.dir);
  if (!fs.existsSync(templatePath)) {
    fs.mkdirSync(templatePath, { recursive: true });
  }

  // 1. schema.ts
  const schemaTs = `import { ConfigSchema } from '../../types';
import { ${t.schemaImport}, invitationCTAFields } from '../../invitation-fields';

export const ${t.schemaConst}: ConfigSchema = [
  ...${t.schemaImport},
  ...invitationCTAFields,
];
`;
  fs.writeFileSync(path.join(templatePath, 'schema.ts'), schemaTs);

  // 2. index.tsx
  const isWish = t.category === 'festival';
  const isParty = t.category === 'party' || t.category === 'devotional';
  
  const contentJsx = isWish 
    ? `<h1 className={styles.headline}>${t.headline}</h1>
        <p className={styles.fromName}>{data.from_name || 'With Best Compliments'}</p>
        {data.from_business && <p className={styles.fromBiz}>{data.from_business}</p>}
        <div className={styles.details}>
          {data.message && <p className={styles.message} dangerouslySetInnerHTML={{ __html: data.message }}></p>}
        </div>`
    : isParty
    ? `<h1 className={styles.headline}>${t.headline}</h1>
        <p className={styles.subline}>${t.subline}</p>
        <div className={styles.details}>
          <p className={styles.date}>{formatEventDate(data.event_date || '2027-12-31')}</p>
          {data.event_time && <p className={styles.time}>{data.event_time}</p>}
          <p className={styles.venue}>{data.venue_name || 'Grand Event Hall'}</p>
          {data.message && <p className={styles.message} dangerouslySetInnerHTML={{ __html: data.message }}></p>}
        </div>`
    : `<h1 className={styles.headline}>${t.headline}</h1>
        <p className={styles.subline}>${t.subline}</p>
        <div className={styles.details}>
          <p className={styles.date}>{formatEventDate(data.event_date || '2027-12-31')}</p>
          {data.event_time && <p className={styles.time}>{data.event_time}</p>}
          <p className={styles.venue}>{data.venue_name || 'Grand Event Venue'}</p>
          {data.message && <p className={styles.message} dangerouslySetInnerHTML={{ __html: data.message }}></p>}
        </div>`;

  const indexTsx = `import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ${t.animImports.join(', ')} } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { ${t.schemaConst} } from './schema';
import styles from './${t.dir}.module.css';

const ${t.pascal}: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          ${t.svgIcon}
        </motion.div>
        
        ${contentJsx}
      </div>
    </InvitationLayout>
  );
};

export const meta: TemplateMeta = {
  name: ${JSON.stringify(t.name)},
  componentKey: ${JSON.stringify(t.key)},
  description: ${JSON.stringify(t.name + ' template for ' + t.category)},
  category: ${JSON.stringify(t.category)},
  motionTier: ${t.motionTier},
  styleTone: ${JSON.stringify(t.styleTone)},
};

registerTemplate({
  component: ${t.pascal},
  schema: ${t.schemaConst},
  meta,
});

export default ${t.pascal};
`;
  fs.writeFileSync(path.join(templatePath, 'index.tsx'), indexTsx);

  // 3. module.css
  const moduleCss = `.container {
  --color-bg: ${t.bg};
  --color-text: ${t.text};
  --color-accent: ${t.accent};
  ${t.extra ? `--color-extra: ${t.extra};` : ''}

  background-color: var(--color-bg);
  color: var(--color-text);
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.iconBox {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.headline {
  font-size: 2.1rem;
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.subline, .fromName {
  font-size: 1rem;
  opacity: 0.85;
  margin-bottom: 1.5rem;
}

.fromBiz {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 1rem;
}

.date {
  font-size: 1.15rem;
  font-weight: 600;
}

.time, .venue {
  font-size: 0.95rem;
  opacity: 0.9;
}

.message {
  margin-top: 1rem;
  font-size: 0.9rem;
  font-style: italic;
  opacity: 0.85;
}
`;
  fs.writeFileSync(path.join(templatePath, `${t.dir}.module.css`), moduleCss);

  registeredExports.push({ key: t.key, dir: t.dir, pascal: t.pascal, schemaConst: t.schemaConst, meta: {
    name: t.name,
    componentKey: t.key,
    description: t.name + ' template for ' + t.category,
    category: t.category,
    motionTier: t.motionTier,
    styleTone: t.styleTone,
  }});

  generatedCount++;
});

console.log(`✅ Successfully generated ${generatedCount} template component folders!`);
