import { ConfigSchema } from '../../types';

export const goldRadianceSchema: ConfigSchema = [
  // Content fields (per-instance, client-editable)
  { key: 'full_name', label: 'Full Name', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', defaultValue: 'Alexander Vance' },
  { key: 'company_name', label: 'Brand / Business Name', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Vance & Co. Luxury Jewelers' },
  { key: 'title', label: 'Title / Designation', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Master Artisan & Director' },
  { key: 'tagline', label: 'Tagline / Subtitle', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Certified Gemologists • Est. 1985' },
  { key: 'phone', label: 'Phone Number', type: 'phone', editableBy: 'client', required: true, fieldScope: 'instance', defaultValue: '+1 800 555 7788' },
  { key: 'whatsapp', label: 'WhatsApp Number', type: 'whatsapp', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: '+1 800 555 7788' },
  { key: 'email', label: 'Email Address', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'alexander@vancejewelers.com' },
  { key: 'address', label: 'Showroom Address', type: 'address', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: '5th Avenue Mansion, Suite 900, New York, NY' },
  { key: 'website', label: 'Website', type: 'url', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'www.vancejewelers.com' },
  { key: 'logo', label: 'Logo or Emblem', type: 'image', editableBy: 'client', required: false, fieldScope: 'instance' },

  // Copy fields (template-level, admin-editable)
  { key: 'cta_save_contact', label: 'Save Contact Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Save VIP Contact' },
  { key: 'cta_call', label: 'Call Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Call Direct' },
  { key: 'cta_directions', label: 'Directions Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Visit Showroom' },
  { key: 'cta_share', label: 'Share Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Share Card' },
];
