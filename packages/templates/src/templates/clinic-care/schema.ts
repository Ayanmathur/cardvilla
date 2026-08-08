import { ConfigSchema } from '../../types';

export const clinicCareSchema: ConfigSchema = [
  // Content fields (per-instance, client-editable)
  { key: 'full_name', label: 'Full Name', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', defaultValue: 'Dr. Sarah Jenkins' },
  { key: 'company_name', label: 'Clinic / Hospital Name', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Apex Healthcare & Heart Clinic' },
  { key: 'title', label: 'Title / Designation', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Senior Cardiologist' },
  { key: 'specialization', label: 'Specialization / Department', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Interventional Cardiology & Preventive Care' },
  { key: 'phone', label: 'Phone Number', type: 'phone', editableBy: 'client', required: true, fieldScope: 'instance', defaultValue: '+1 555 234 5678' },
  { key: 'whatsapp', label: 'WhatsApp Number', type: 'whatsapp', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: '+1 555 234 5678' },
  { key: 'email', label: 'Email Address', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'dr.jenkins@apexcare.com' },
  { key: 'address', label: 'Clinic Address', type: 'address', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: '450 Medical Arts Building, Suite 300, New York, NY' },
  { key: 'website', label: 'Website', type: 'url', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'www.apexcareclinic.com' },
  { key: 'logo', label: 'Logo or Doctor Photo', type: 'image', editableBy: 'client', required: false, fieldScope: 'instance' },

  // Copy fields (template-level, admin-editable)
  { key: 'cta_save_contact', label: 'Save Contact Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Save Contact' },
  { key: 'cta_call', label: 'Call Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Call Clinic' },
  { key: 'cta_directions', label: 'Directions Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Get Directions' },
  { key: 'cta_share', label: 'Share Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'Share Card' },
];
