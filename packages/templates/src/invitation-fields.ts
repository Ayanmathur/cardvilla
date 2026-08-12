/**
 * Shared Invitation Schema Fields — Section 8.9 Multi-Section Architecture
 * 
 * Fields are now organized by SECTION for invitation templates.
 * Business card templates continue using flat ConfigSchema.
 * 
 * Per Section 13.1: "Every template above exposes the same admin/client-editable field set:
 * names, date, venue/address→maps, phone, optional short message/tagline, and a photo/logo upload."
 * 
 * Per Section 8.1.1: ALL visible text is a config field, none is hardcoded.
 */

import { ConfigField, ConfigSection, SectionedConfigSchema } from './types';

// ════════════════════════════════════════════════════════════════════
// HERO SECTION FIELDS (per category)
// ════════════════════════════════════════════════════════════════════

export const weddingHeroFields: ConfigField[] = [
  { key: 'section_hero_eyebrow', label: 'Hero Eyebrow Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Together With Their Families' },
  { key: 'partner1_name', label: 'Partner 1 (Bride/Groom)', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Priya' },
  { key: 'partner2_name', label: 'Partner 2 (Bride/Groom)', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Rahul' },
  { key: 'partner1_family', label: 'Partner 1 Family', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Daughter of Mr. & Mrs. Sharma' },
  { key: 'partner2_family', label: 'Partner 2 Family', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Son of Mr. & Mrs. Verma' },
  { key: 'section_hero_tagline', label: 'Hero Tagline', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Request the honour of your presence' },
  { key: 'event_date', label: 'Wedding Date', type: 'date', editableBy: 'client', required: true, fieldScope: 'instance' },
  { key: 'venue_name', label: 'Main Venue', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'The Grand Palace Hotel' },
];

export const babyKidsHeroFields: ConfigField[] = [
  { key: 'section_hero_eyebrow', label: 'Hero Eyebrow Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'You Are Invited' },
  { key: 'child_name', label: 'Child Name', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Baby Aryan' },
  { key: 'age_or_milestone', label: 'Age / Milestone', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: '1st Birthday' },
  { key: 'host_names', label: 'Host Name(s)', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Rajesh & Sunita Sharma' },
  { key: 'section_hero_tagline', label: 'Hero Tagline', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Celebrating New Life & Joy' },
  { key: 'event_date', label: 'Event Date', type: 'date', editableBy: 'client', required: true, fieldScope: 'instance' },
  { key: 'venue_name', label: 'Venue Name', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Grand Event Venue' },
];

export const partyHeroFields: ConfigField[] = [
  { key: 'section_hero_eyebrow', label: 'Hero Eyebrow Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'You Are Invited' },
  { key: 'event_title', label: 'Event Title', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Housewarming Celebration' },
  { key: 'host_names', label: 'Host Name(s)', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'The Sharma Family' },
  { key: 'celebrant_name', label: 'Celebrant/Guest of Honor', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'section_hero_tagline', label: 'Hero Tagline', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Join Us for a Special Evening' },
  { key: 'event_date', label: 'Event Date', type: 'date', editableBy: 'client', required: true, fieldScope: 'instance' },
  { key: 'venue_name', label: 'Venue Name', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Grand Event Hall' },
];

export const devotionalHeroFields: ConfigField[] = [
  { key: 'section_hero_eyebrow', label: 'Hero Eyebrow Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'With Divine Blessings' },
  { key: 'ceremony_title', label: 'Ceremony Title', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Satyanarayan Puja' },
  { key: 'host_names', label: 'Host Name(s)', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'The Sharma Family' },
  { key: 'priest_name', label: 'Pandit / Priest', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'section_hero_tagline', label: 'Hero Tagline', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Seeking Divine Blessings' },
  { key: 'event_date', label: 'Event Date', type: 'date', editableBy: 'client', required: true, fieldScope: 'instance' },
  { key: 'venue_name', label: 'Venue Name', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Residence / Temple' },
];

export const festivalHeroFields: ConfigField[] = [
  { key: 'greeting_line', label: 'Greeting Headline', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Wishing You a Happy Diwali!' },
  { key: 'from_name', label: 'From (Name/Family)', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'The Sharma Family' },
  { key: 'from_business', label: 'From (Business)', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Sharma Jewellers' },
];

// ════════════════════════════════════════════════════════════════════
// STORY SECTION FIELDS
// ════════════════════════════════════════════════════════════════════
export const storyFields: ConfigField[] = [
  { key: 'section_story_label', label: 'Story Section Label', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Our Story' },
  { key: 'story_text', label: 'Story / Message', type: 'richtext', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Share your story, a message from the family, or a note to guests...' },
  { key: 'story_photo', label: 'Story Photo', type: 'photo', editableBy: 'client', required: false, fieldScope: 'instance' },
];

// ════════════════════════════════════════════════════════════════════
// SCHEDULE SECTION FIELDS
// ════════════════════════════════════════════════════════════════════
export const scheduleFields: ConfigField[] = [
  { key: 'section_schedule_label', label: 'Schedule Section Label', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Schedule of Events' },
  { key: 'event_date', label: 'Event Date', type: 'date', editableBy: 'client', required: true, fieldScope: 'instance' },
  { key: 'event_time', label: 'Event Time', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: '7:00 PM onwards' },
  { key: 'venue_name', label: 'Venue Name', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Grand Palace Banquet Hall' },
  { key: 'venue_address', label: 'Venue Address', type: 'address', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: '123 MG Road, Delhi' },
];

/** For multi-event templates (weddings), events are stored as JSON array in data.events */
export const multiEventScheduleFields: ConfigField[] = [
  { key: 'section_schedule_label', label: 'Schedule Section Label', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Wedding Events' },
  { key: 'events', label: 'Events (Ceremonies)', type: 'list', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Add ceremonies: Haldi, Mehndi, Wedding, Reception' },
];

// ════════════════════════════════════════════════════════════════════
// VENUE SECTION FIELDS
// ════════════════════════════════════════════════════════════════════
export const venueFields: ConfigField[] = [
  { key: 'section_venue_label', label: 'Venue Section Label', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Venue' },
  { key: 'venue_name', label: 'Venue Name', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Grand Palace Banquet Hall' },
  { key: 'venue_address', label: 'Venue Address', type: 'address', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: '123 MG Road, Delhi' },
];

// ════════════════════════════════════════════════════════════════════
// GALLERY SECTION FIELDS
// ════════════════════════════════════════════════════════════════════
export const galleryFields: ConfigField[] = [
  { key: 'section_gallery_label', label: 'Gallery Section Label', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Gallery' },
  { key: 'gallery_photos', label: 'Gallery Photos', type: 'list', editableBy: 'client', required: false, fieldScope: 'instance' },
];

// ════════════════════════════════════════════════════════════════════
// RSVP SECTION FIELDS
// ════════════════════════════════════════════════════════════════════
export const rsvpFields: ConfigField[] = [
  { key: 'section_rsvp_label', label: 'RSVP Section Label', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'RSVP' },
  { key: 'section_rsvp_headline', label: 'RSVP Headline', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Will You Join Us?' },
  { key: 'section_rsvp_message', label: 'RSVP Note', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Kindly respond by December 15th' },
];

// ════════════════════════════════════════════════════════════════════
// COUNTDOWN SECTION FIELDS
// ════════════════════════════════════════════════════════════════════
export const countdownFields: ConfigField[] = [
  { key: 'section_countdown_label', label: 'Countdown Section Label', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Counting Down' },
];

// ════════════════════════════════════════════════════════════════════
// CLOSING SECTION FIELDS
// ════════════════════════════════════════════════════════════════════
export const closingFields: ConfigField[] = [
  { key: 'closing_message', label: 'Closing Message', type: 'richtext', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'We look forward to celebrating with you...' },
  { key: 'closing_family_names', label: 'Closing Family Names', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'The Sharma & Verma Families' },
  { key: 'closing_signoff', label: 'Sign-off Line', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'With Love & Blessings' },
];

// ════════════════════════════════════════════════════════════════════
// SHARED CONTACT & CTA FIELDS
// ════════════════════════════════════════════════════════════════════
export const contactFields: ConfigField[] = [
  { key: 'phone', label: 'Contact Phone', type: 'phone', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'whatsapp', label: 'WhatsApp', type: 'whatsapp', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'photo', label: 'Photo / Logo', type: 'image', editableBy: 'client', required: false, fieldScope: 'instance' },
];

export const invitationCTAFields: ConfigField[] = [
  { key: 'cta_rsvp', label: 'RSVP Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'RSVP' },
  { key: 'cta_directions', label: 'Directions Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Get Directions' },
  { key: 'cta_calendar', label: 'Calendar Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Add to Calendar' },
  { key: 'cta_call', label: 'Call Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Call' },
];

// ════════════════════════════════════════════════════════════════════
// PRE-BUILT SECTIONED SCHEMAS PER CATEGORY (Section 8.9.2)
// ════════════════════════════════════════════════════════════════════

/** Wedding: HERO → STORY → SCHEDULE (multi) → VENUE → GALLERY → RSVP → COUNTDOWN → CLOSING */
export const weddingSectionedSchema: SectionedConfigSchema = [
  { section: 'hero', label: 'Hero', fields: [...weddingHeroFields] },
  { section: 'story', label: 'Our Story', fields: [...storyFields] },
  { section: 'schedule', label: 'Events', fields: [...multiEventScheduleFields], repeatable: true },
  { section: 'venue', label: 'Venue', fields: [...venueFields] },
  { section: 'gallery', label: 'Gallery', fields: [...galleryFields] },
  { section: 'rsvp', label: 'RSVP', fields: [...rsvpFields] },
  { section: 'countdown', label: 'Countdown', fields: [...countdownFields] },
  { section: 'closing', label: 'Closing', fields: [...closingFields, ...contactFields, ...invitationCTAFields] },
];

/** Baby & Kids: HERO → STORY (short) → SCHEDULE (single) → VENUE → GALLERY → CLOSING */
export const babyKidsSectionedSchema: SectionedConfigSchema = [
  { section: 'hero', label: 'Hero', fields: [...babyKidsHeroFields] },
  { section: 'story', label: 'A Note', fields: [...storyFields] },
  { section: 'schedule', label: 'Event Details', fields: [...scheduleFields] },
  { section: 'venue', label: 'Venue', fields: [...venueFields] },
  { section: 'gallery', label: 'Gallery', fields: [...galleryFields] },
  { section: 'closing', label: 'Closing', fields: [...closingFields, ...contactFields, ...invitationCTAFields] },
];

/** Party: HERO → SCHEDULE (single) → VENUE → RSVP → CLOSING */
export const partySectionedSchema: SectionedConfigSchema = [
  { section: 'hero', label: 'Hero', fields: [...partyHeroFields] },
  { section: 'schedule', label: 'Event Details', fields: [...scheduleFields] },
  { section: 'venue', label: 'Venue', fields: [...venueFields] },
  { section: 'rsvp', label: 'RSVP', fields: [...rsvpFields] },
  { section: 'closing', label: 'Closing', fields: [...closingFields, ...contactFields, ...invitationCTAFields] },
];

/** Devotional: HERO → SCHEDULE → VENUE → CLOSING (leanest, deliberate restraint) */
export const devotionalSectionedSchema: SectionedConfigSchema = [
  { section: 'hero', label: 'Hero', fields: [...devotionalHeroFields] },
  { section: 'schedule', label: 'Event Details', fields: [...scheduleFields] },
  { section: 'venue', label: 'Venue', fields: [...venueFields] },
  { section: 'closing', label: 'Closing', fields: [...closingFields, ...contactFields, ...invitationCTAFields] },
];

/** Festival: HERO → CLOSING (minimal scroll, sometimes SCHEDULE) */
export const festivalSectionedSchema: SectionedConfigSchema = [
  { section: 'hero', label: 'Greeting', fields: [...festivalHeroFields] },
  { section: 'closing', label: 'Closing', fields: [...closingFields, ...contactFields, ...invitationCTAFields] },
];

// ════════════════════════════════════════════════════════════════════
// BACKWARD COMPAT: Flat field arrays for templates that haven't
// migrated yet or for business cards that remain single-view
// ════════════════════════════════════════════════════════════════════

/** @deprecated Use weddingSectionedSchema for new templates */
export const weddingFields: ConfigField[] = [
  ...weddingHeroFields, ...storyFields, ...scheduleFields, ...venueFields,
  ...galleryFields, ...rsvpFields, ...countdownFields, ...closingFields,
  ...contactFields, ...invitationCTAFields,
];

/** @deprecated Use babyKidsSectionedSchema for new templates */
export const babyKidsFields: ConfigField[] = [
  ...babyKidsHeroFields, ...storyFields, ...scheduleFields, ...venueFields,
  ...galleryFields, ...closingFields, ...contactFields, ...invitationCTAFields,
];

/** @deprecated Use partySectionedSchema for new templates */
export const partyFields: ConfigField[] = [
  ...partyHeroFields, ...scheduleFields, ...venueFields,
  ...rsvpFields, ...closingFields, ...contactFields, ...invitationCTAFields,
];

/** @deprecated Use devotionalSectionedSchema for new templates */
export const devotionalFields: ConfigField[] = [
  ...devotionalHeroFields, ...scheduleFields, ...venueFields,
  ...closingFields, ...contactFields, ...invitationCTAFields,
];

/** @deprecated Use festivalSectionedSchema for new templates */
export const festivalFields: ConfigField[] = [
  ...festivalHeroFields, ...closingFields, ...contactFields, ...invitationCTAFields,
];

// Base fields kept for any edge-case usage
export const invitationBaseFields = [...contactFields, ...invitationCTAFields];
