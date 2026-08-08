import { ConfigSchema } from '../../types';

export const silverEleganceSchema: ConfigSchema = [
  // Content fields (per-instance, client-editable)
  { key: 'full_name', label: 'Full Name', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', defaultValue: 'Victoria Sterling' },
  { key: 'company_name', label: 'Brand / Business Name', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Sterling & Co. Fine Timepieces' },
  { key: 'title', label: 'Title / Designation', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Principal Consultant' },
  { key: 'tagline', label: 'Tagline / Subtitle', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Precision Engineering & Design • Est. 2010' },
  { key: 'phone', label: 'Phone Number', type: 'phone', editableBy: 'client', required: true, fieldScope: 'instance', defaultValue: '+1 888 444 3322' },
  { key: 'whatsapp', label: 'WhatsApp Number', type: 'whatsapp', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: '+1 888 444 3322' },
  { key: 'email', label: 'Email Address', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'victoria@sterlingtime.com' },
  { key: 'address', label: 'Office Address', type: 'address', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: '100 Financial Center Plaza, Suite 4000, New York, NY' },
  { key: 'website', label: 'Website', type: 'url', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'www.sterlingtime.com' },
  { key: 'logo', label: 'Logo or Emblem', type: 'image', editableBy: 'client', required: false, fieldScope: 'instance' },

  // Copy fields (template-level, admin-editable)
  { key: 'cta_save_contact', label: 'Save Contact Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Save Contact' },
  { key: 'cta_call', label: 'Call Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Call Office' },
  { key: 'cta_directions', label: 'Directions Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Get Directions' },
  { key: 'cta_share', label: 'Share Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Share Card' },
];
