/**
 * Shared Invitation Schema Fields
 * 
 * Per Section 13.1: "Every template above exposes the same admin/client-editable field set:
 * names, date, venue/address→maps, phone, optional short message/tagline, and a photo/logo upload."
 */

import { ConfigField } from './types';

// ── Base invitation fields (shared across all invitation categories) ──
export const invitationBaseFields: ConfigField[] = [
  { key: 'host_names', label: 'Host Name(s)', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Rajesh & Sunita Sharma' },
  { key: 'event_date', label: 'Event Date', type: 'date', editableBy: 'client', required: true, fieldScope: 'instance' },
  { key: 'event_time', label: 'Event Time', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: '7:00 PM onwards' },
  { key: 'venue_name', label: 'Venue Name', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Grand Palace Banquet Hall' },
  { key: 'venue_address', label: 'Venue Address', type: 'address', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: '123 MG Road, Delhi' },
  { key: 'phone', label: 'Contact Phone', type: 'phone', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'whatsapp', label: 'WhatsApp', type: 'whatsapp', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'message', label: 'Personal Message', type: 'richtext', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Your warm message to guests...' },
  { key: 'photo', label: 'Photo / Logo', type: 'image', editableBy: 'client', required: false, fieldScope: 'instance' },
];

// ── Wedding-specific fields ──
export const weddingFields: ConfigField[] = [
  { key: 'partner1_name', label: 'Partner 1 (Bride/Groom)', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Priya' },
  { key: 'partner2_name', label: 'Partner 2 (Bride/Groom)', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Rahul' },
  { key: 'partner1_family', label: 'Partner 1 Family', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Daughter of Mr. & Mrs. Sharma' },
  { key: 'partner2_family', label: 'Partner 2 Family', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Son of Mr. & Mrs. Verma' },
  ...invitationBaseFields.filter(f => f.key !== 'host_names'), // Use partner names instead
];

// ── Baby & Kids-specific fields ──
export const babyKidsFields: ConfigField[] = [
  { key: 'child_name', label: 'Child Name', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Baby Aryan' },
  { key: 'age_or_milestone', label: 'Age / Milestone', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: '1st Birthday / Naming Ceremony' },
  ...invitationBaseFields,
];

// ── Party & Celebration fields ──
export const partyFields: ConfigField[] = [
  { key: 'event_title', label: 'Event Title', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Housewarming Celebration' },
  { key: 'celebrant_name', label: 'Celebrant Name', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Guest of Honor' },
  ...invitationBaseFields,
];

// ── Devotional fields ──
export const devotionalFields: ConfigField[] = [
  { key: 'ceremony_title', label: 'Ceremony Title', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Satyanarayan Puja' },
  { key: 'priest_name', label: 'Pandit / Priest Name', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance' },
  ...invitationBaseFields,
];

// ── Festival Wishes fields ──
export const festivalFields: ConfigField[] = [
  { key: 'greeting_line', label: 'Greeting / Headline', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Wishing You a Happy Diwali!' },
  { key: 'from_name', label: 'From (Name/Family)', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'The Sharma Family' },
  { key: 'from_business', label: 'From (Business, optional)', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Sharma Jewellers' },
  { key: 'message', label: 'Wish Message', type: 'richtext', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'May this festival bring joy and prosperity...' },
  { key: 'phone', label: 'Contact Phone', type: 'phone', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'photo', label: 'Photo / Logo', type: 'image', editableBy: 'client', required: false, fieldScope: 'instance' },
];

// ── Admin CTA fields (shared across all invitation templates) ──
export const invitationCTAFields: ConfigField[] = [
  { key: 'cta_rsvp', label: 'RSVP Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'RSVP' },
  { key: 'cta_directions', label: 'Directions Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Get Directions' },
  { key: 'cta_calendar', label: 'Add to Calendar Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Add to Calendar' },
  { key: 'cta_call', label: 'Call Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Call' },
];
