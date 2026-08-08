import { ConfigSchema } from '../../types';

export const dentalBrightSchema: ConfigSchema = [
  // Content fields (per-instance, client-editable)
  { key: 'full_name', label: 'Full Name', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', defaultValue: 'Dr. Michael Chen' },
  { key: 'company_name', label: 'Dental Practice Name', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Bright Smile Dental Clinic' },
  { key: 'title', label: 'Title / Designation', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Lead Orthodontist' },
  { key: 'specialization', label: 'Specialization', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Cosmetic Dentistry & Orthodontics' },
  { key: 'phone', label: 'Phone Number', type: 'phone', editableBy: 'client', required: true, fieldScope: 'instance', defaultValue: '+1 555 345 6789' },
  { key: 'whatsapp', label: 'WhatsApp Number', type: 'whatsapp', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: '+1 555 345 6789' },
  { key: 'email', label: 'Email Address', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'care@brightsmiledental.com' },
  { key: 'address', label: 'Clinic Address', type: 'address', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: '780 Wellness Boulevard, Suite 102, Chicago, IL' },
  { key: 'website', label: 'Website', type: 'url', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'www.brightsmiledental.com' },
  { key: 'logo', label: 'Logo or Doctor Photo', type: 'image', editableBy: 'client', required: false, fieldScope: 'instance' },

  // Copy fields (template-level, admin-editable)
  { key: 'cta_save_contact', label: 'Save Contact Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Save Contact' },
  { key: 'cta_call', label: 'Call Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Call Clinic' },
  { key: 'cta_directions', label: 'Directions Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Get Directions' },
  { key: 'cta_share', label: 'Share Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Share Card' },
];
