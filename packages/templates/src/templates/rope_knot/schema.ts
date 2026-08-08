import { ConfigSchema } from '../../types';

export const ropeKnotSchema: ConfigSchema = [
  // Content fields (per-instance, client-editable)
  { key: 'full_name', label: 'Full Name', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Captain James Morgan' },
  { key: 'company_name', label: 'Business / Enterprise', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Nautical Craft Co.' },
  { key: 'title', label: 'Title / Designation', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Maritime Consultant' },
  { key: 'phone', label: 'Phone Number', type: 'phone', editableBy: 'client', required: true, fieldScope: 'instance' },
  { key: 'whatsapp', label: 'WhatsApp', type: 'whatsapp', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'email', label: 'Email Address', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'address', label: 'Harbor Address', type: 'address', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'website', label: 'Website', type: 'url', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'logo', label: 'Emblem / Crest', type: 'image', editableBy: 'client', required: false, fieldScope: 'instance' },
  
  // Copy fields (template-level, admin-editable)
  { key: 'cta_save_contact', label: 'Save Contact Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Save Contact' },
  { key: 'cta_call', label: 'Call Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Call' },
  { key: 'cta_directions', label: 'Directions Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Directions' },
  { key: 'cta_share', label: 'Share Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Share' },
];
