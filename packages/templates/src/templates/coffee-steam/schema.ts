import { ConfigSchema } from '../../types';

export const coffeeSteamSchema: ConfigSchema = [
  // Content fields (per-instance, client-editable)
  { key: 'full_name', label: 'Full Name', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', defaultValue: 'Marco Rossi' },
  { key: 'company_name', label: 'Cafe / Roastery Name', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Artisan Coffee Roasters' },
  { key: 'title', label: 'Title / Role', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Head Barista & Founder' },
  { key: 'tagline', label: 'Tagline / Subtitle', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Single-Origin Roasts & Handcrafted Pastries • Est. 2019' },
  { key: 'phone', label: 'Phone Number', type: 'phone', editableBy: 'client', required: true, fieldScope: 'instance', defaultValue: '+1 555 789 0123' },
  { key: 'whatsapp', label: 'WhatsApp Number', type: 'whatsapp', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: '+1 555 789 0123' },
  { key: 'email', label: 'Email Address', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'hello@artisancoffeeroasters.com' },
  { key: 'address', label: 'Cafe Address', type: 'address', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: '215 Espresso Way, Little Italy, San Francisco, CA' },
  { key: 'website', label: 'Website', type: 'url', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'www.artisancoffeeroasters.com' },
  { key: 'logo', label: 'Logo or Cafe Emblem', type: 'image', editableBy: 'client', required: false, fieldScope: 'instance' },

  // Copy fields (template-level, admin-editable)
  { key: 'cta_save_contact', label: 'Save Contact Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Save Contact' },
  { key: 'cta_call', label: 'Call Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Call Cafe' },
  { key: 'cta_directions', label: 'Directions Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Find Cafe' },
  { key: 'cta_share', label: 'Share Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Share Card' },
];
