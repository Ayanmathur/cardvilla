import { ConfigSchema } from '../../types';

export const receiptStyleSchema: ConfigSchema = [
  // Content fields (per-instance, client-editable)
  { key: 'full_name', label: 'Full Name', type: 'text', editableBy: 'client', required: true, fieldScope: 'instance', placeholder: 'Sam Cashier' },
  { key: 'company_name', label: 'Store / Business Name', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', placeholder: 'Corner Store Co.' },
  { key: 'title', label: 'Role / Designation', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance', defaultValue: 'Store Manager' },
  { key: 'phone', label: 'Phone Number', type: 'phone', editableBy: 'client', required: true, fieldScope: 'instance' },
  { key: 'whatsapp', label: 'WhatsApp', type: 'whatsapp', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'email', label: 'Email Address', type: 'text', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'address', label: 'Store Address', type: 'address', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'website', label: 'Website', type: 'url', editableBy: 'client', required: false, fieldScope: 'instance' },
  { key: 'logo', label: 'Store Logo', type: 'image', editableBy: 'client', required: false, fieldScope: 'instance' },
  
  // Copy fields (template-level, admin-editable)
  { key: 'receipt_header', label: 'Receipt Top Header', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: '*** OFFICIAL RECEIPT ***' },
  { key: 'cta_save_contact', label: 'Save Contact Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: '[ SAVE CONTACT ]' },
  { key: 'cta_call', label: 'Call Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: '[ CALL ]' },
  { key: 'cta_directions', label: 'Directions Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: '[ MAP ]' },
  { key: 'cta_share', label: 'Share Button Text', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: '[ SHARE ]' },
  { key: 'thank_you_note', label: 'Footer Note', type: 'text', editableBy: 'admin_only', required: false, fieldScope: 'template', defaultValue: 'THANK YOU FOR YOUR BUSINESS!' },
];
