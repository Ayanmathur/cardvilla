import { ConfigSchema } from '../../types';

export const woodGrainSchema: ConfigSchema = [
  // Content fields (per-instance, client-editable)
  { key: 'full_name', label: 'Full Name', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Ethan Woodcraft' },
  { key: 'company_name', label: 'Craft Studio / Business', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Timber & Grain Co.' },
  { key: 'title', label: 'Title / Craft', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Master Artisan & Carpenter' },
  { key: 'phone', label: 'Phone Number', type: 'phone', editableBy: 'client', required: true, fieldScope: 'instance' },
  { key: 'whatsapp', label: 'WhatsApp', type: 'whatsapp', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'email', label: 'Email Address', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'address', label: 'Workshop Address', type: 'address', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'website', label: 'Website / Portfolio', type: 'url', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'logo', label: 'Brand Emblem / Stamp', type: 'image', editableBy: 'client', required: false, fieldScope: 'instance' },
  
  // Copy fields (template-level, admin-editable)
  { key: 'cta_save_contact', label: 'Save Contact Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Save Contact' },
  { key: 'cta_call', label: 'Call Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Call Workshop' },
  { key: 'cta_directions', label: 'Directions Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Visit Workshop' },
  { key: 'cta_share', label: 'Share Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Share Card' },
];
