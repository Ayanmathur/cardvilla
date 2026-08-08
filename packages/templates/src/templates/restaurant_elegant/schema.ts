import { ConfigSchema } from '../../types';

export const restaurantElegantSchema: ConfigSchema = [
  // Content fields (per-instance, client-editable)
  { key: 'full_name', label: 'Chef / Manager Name', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Chef Antoine Laurent' },
  { key: 'company_name', label: 'Restaurant / Dining Name', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'L’Étoile Bistro' },
  { key: 'title', label: 'Title / Role', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Executive Head Chef' },
  { key: 'tagline', label: 'Cuisine / Tagline', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'French Contemporary Fine Dining' },
  { key: 'phone', label: 'Phone Number', type: 'phone', editableBy: 'client', required: true, fieldScope: 'instance' },
  { key: 'whatsapp', label: 'WhatsApp', type: 'whatsapp', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'email', label: 'Email Address', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'address', label: 'Restaurant Address', type: 'address', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'website', label: 'Website / Reservations', type: 'url', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'logo', label: 'Restaurant Emblem / Logo', type: 'image', editableBy: 'client', required: false, fieldScope: 'instance' },
  
  // Copy fields (template-level, admin-editable)
  { key: 'cta_save_contact', label: 'Save Contact Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Save Contact' },
  { key: 'cta_call', label: 'Reserve / Call Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Reserve Table' },
  { key: 'cta_directions', label: 'Directions Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Find Us' },
  { key: 'cta_share', label: 'Share Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Share' },
];
