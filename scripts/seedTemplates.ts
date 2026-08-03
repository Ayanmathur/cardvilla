import { db } from '../packages/schema/src/db';

const STARTER_TEMPLATES = [
  {
    name: 'Modern Minimal — Base',
    categoryId: 'cat_business_card',
    status: 'published',
    createdById: 'admin_001',
    canvasJson: {
      version: '1.0',
      width: 360,
      height: 640,
      background: { type: 'gradient', gradient: 'linear-gradient(135deg, #14172a 0%, #0d0f1a 100%)' },
      elements: [
        {
          id: 'logo_1',
          type: 'logo',
          x: 30,
          y: 40,
          width: 80,
          height: 80,
          zIndex: 2,
          content: '/placeholder-logo.png',
          borderRadius: 12,
          fieldBinding: { fieldKey: 'logo', fieldType: 'logo', editableBy: 'client', required: false, label: 'Business Logo', sortOrder: 0 }
        },
        {
          id: 'company_1',
          type: 'text',
          x: 30,
          y: 135,
          width: 300,
          height: 36,
          zIndex: 2,
          content: 'Apex Digital Solutions',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 24,
          fontWeight: '700',
          color: '#c9a84c',
          fieldBinding: { fieldKey: 'company_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Company Name', sortOrder: 1 }
        },
        {
          id: 'name_1',
          type: 'text',
          x: 30,
          y: 230,
          width: 300,
          height: 30,
          zIndex: 2,
          content: 'Alex Morgan',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 20,
          fontWeight: '600',
          color: '#f8fafc',
          fieldBinding: { fieldKey: 'full_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Full Name', sortOrder: 2 }
        },
        {
          id: 'btn_call',
          type: 'button',
          x: 30,
          y: 330,
          width: 140,
          height: 48,
          zIndex: 3,
          content: 'Call Now',
          actionType: 'phone',
          backgroundColor: '#c9a84c',
          color: '#0d0f1a',
          fieldBinding: { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 3 }
        },
        {
          id: 'btn_wa',
          type: 'button',
          x: 190,
          y: 330,
          width: 140,
          height: 48,
          zIndex: 3,
          content: 'WhatsApp',
          actionType: 'whatsapp',
          backgroundColor: '#25d366',
          color: '#ffffff',
          fieldBinding: { fieldKey: 'whatsapp_number', fieldType: 'whatsapp', editableBy: 'client', required: false, label: 'WhatsApp Link', sortOrder: 4 }
        },
        {
          id: 'btn_maps',
          type: 'button',
          x: 30,
          y: 395,
          width: 300,
          height: 48,
          zIndex: 3,
          content: 'Open in Google Maps',
          actionType: 'maps',
          backgroundColor: 'rgba(255,255,255,0.08)',
          color: '#f8fafc',
          fieldBinding: { fieldKey: 'address', fieldType: 'address', editableBy: 'client', required: false, label: 'Google Maps Address', sortOrder: 5 }
        }
      ]
    },
    fieldSchemas: [
      { fieldKey: 'logo', fieldType: 'logo', editableBy: 'client', required: false, label: 'Business Logo', sortOrder: 0 },
      { fieldKey: 'company_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Company Name', sortOrder: 1 },
      { fieldKey: 'full_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Full Name', sortOrder: 2 },
      { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 3 },
      { fieldKey: 'whatsapp_number', fieldType: 'whatsapp', editableBy: 'client', required: false, label: 'WhatsApp Link', sortOrder: 4 },
      { fieldKey: 'address', fieldType: 'address', editableBy: 'client', required: false, label: 'Google Maps Address', sortOrder: 5 }
    ]
  },
  {
    name: 'Salon Snip (Scissors Motion)',
    categoryId: 'cat_business_card',
    status: 'published',
    createdById: 'admin_001',
    canvasJson: {
      version: '1.0',
      width: 360,
      height: 640,
      background: { type: 'solid', color: '#18141d' },
      elements: [
        {
          id: 'motif_scissors',
          type: 'motif',
          x: 156,
          y: 40,
          width: 48,
          height: 48,
          zIndex: 4,
          motifType: 'scissors',
          animationType: 'snip',
          animationTier: 2
        },
        {
          id: 'company_salon',
          type: 'text',
          x: 20,
          y: 105,
          width: 320,
          height: 36,
          zIndex: 2,
          content: 'Luxe Hair & Beauty Studio',
          fontSize: 22,
          fontWeight: '700',
          textAlign: 'center',
          color: '#f472b6',
          fieldBinding: { fieldKey: 'company_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Salon Name', sortOrder: 0 }
        },
        {
          id: 'name_salon',
          type: 'text',
          x: 20,
          y: 160,
          width: 320,
          height: 28,
          zIndex: 2,
          content: 'Sophia Rey',
          fontSize: 18,
          fontWeight: '600',
          textAlign: 'center',
          color: '#ffffff',
          fieldBinding: { fieldKey: 'full_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Stylist Name', sortOrder: 1 }
        },
        {
          id: 'btn_call',
          type: 'button',
          x: 30,
          y: 240,
          width: 140,
          height: 46,
          zIndex: 3,
          content: 'Call Stylist',
          actionType: 'phone',
          backgroundColor: '#ec4899',
          color: '#ffffff',
          fieldBinding: { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 2 }
        },
        {
          id: 'btn_wa',
          type: 'button',
          x: 190,
          y: 240,
          width: 140,
          height: 46,
          zIndex: 3,
          content: 'WhatsApp Chat',
          actionType: 'whatsapp',
          backgroundColor: '#25d366',
          color: '#ffffff',
          fieldBinding: { fieldKey: 'whatsapp_number', fieldType: 'whatsapp', editableBy: 'client', required: false, label: 'WhatsApp', sortOrder: 3 }
        },
        {
          id: 'btn_appointment',
          type: 'button',
          x: 30,
          y: 305,
          width: 300,
          height: 46,
          zIndex: 3,
          content: '📅 Book Appointment Online',
          actionType: 'url',
          backgroundColor: 'rgba(236,72,153,0.2)',
          color: '#f472b6',
          fieldBinding: { fieldKey: 'appointment_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Appointment Link', sortOrder: 4 }
        }
      ]
    },
    fieldSchemas: [
      { fieldKey: 'company_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Salon Name', sortOrder: 0 },
      { fieldKey: 'full_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Stylist Name', sortOrder: 1 },
      { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 2 },
      { fieldKey: 'whatsapp_number', fieldType: 'whatsapp', editableBy: 'client', required: false, label: 'WhatsApp', sortOrder: 3 },
      { fieldKey: 'appointment_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Appointment Link', sortOrder: 4 }
    ]
  },
  {
    name: 'Shutter Moment Photographer',
    categoryId: 'cat_business_card',
    status: 'published',
    createdById: 'admin_001',
    canvasJson: {
      version: '1.0',
      width: 360,
      height: 640,
      background: { type: 'solid', color: '#09090b' },
      elements: [
        {
          id: 'motif_camera',
          type: 'motif',
          x: 156,
          y: 40,
          width: 48,
          height: 48,
          zIndex: 4,
          motifType: 'camera',
          animationType: 'shutter',
          animationTier: 2
        },
        {
          id: 'company_photo',
          type: 'text',
          x: 20,
          y: 110,
          width: 320,
          height: 36,
          zIndex: 2,
          content: 'Frame-By-Frame Moments',
          fontSize: 22,
          fontWeight: '700',
          textAlign: 'center',
          color: '#38bdf8',
          fieldBinding: { fieldKey: 'company_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Studio Name', sortOrder: 0 }
        },
        {
          id: 'name_photo',
          type: 'text',
          x: 20,
          y: 160,
          width: 320,
          height: 28,
          zIndex: 2,
          content: 'Rohan Sharma',
          fontSize: 18,
          fontWeight: '600',
          textAlign: 'center',
          color: '#f8fafc',
          fieldBinding: { fieldKey: 'full_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Photographer Name', sortOrder: 1 }
        },
        {
          id: 'btn_call',
          type: 'button',
          x: 30,
          y: 240,
          width: 140,
          height: 46,
          zIndex: 3,
          content: 'Call Photographer',
          actionType: 'phone',
          backgroundColor: '#0284c7',
          color: '#ffffff',
          fieldBinding: { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 2 }
        },
        {
          id: 'btn_catalog',
          type: 'button',
          x: 30,
          y: 305,
          width: 300,
          height: 46,
          zIndex: 3,
          content: '📸 View Portfolio / Gallery',
          actionType: 'url',
          backgroundColor: 'rgba(56,189,248,0.15)',
          color: '#38bdf8',
          fieldBinding: { fieldKey: 'catalog_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Portfolio Link', sortOrder: 3 }
        }
      ]
    },
    fieldSchemas: [
      { fieldKey: 'company_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Studio Name', sortOrder: 0 },
      { fieldKey: 'full_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Photographer Name', sortOrder: 1 },
      { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 2 },
      { fieldKey: 'catalog_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Portfolio Link', sortOrder: 3 }
    ]
  },
  {
    name: 'Gold Radiance Jeweler',
    categoryId: 'cat_business_card',
    status: 'published',
    createdById: 'admin_001',
    canvasJson: {
      version: '1.0',
      width: 360,
      height: 640,
      background: { type: 'gold_foil' },
      elements: [
        {
          id: 'company_gold',
          type: 'text',
          x: 20,
          y: 60,
          width: 320,
          height: 40,
          zIndex: 2,
          content: 'Royal Heritage Jewelers',
          fontSize: 24,
          fontWeight: '700',
          textAlign: 'center',
          color: '#d4af37',
          fieldBinding: { fieldKey: 'company_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Jeweler Name', sortOrder: 0 }
        },
        {
          id: 'btn_call',
          type: 'button',
          x: 30,
          y: 160,
          width: 140,
          height: 46,
          zIndex: 3,
          content: 'Call Store',
          actionType: 'phone',
          backgroundColor: '#d4af37',
          color: '#1a1005',
          fieldBinding: { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 1 }
        },
        {
          id: 'btn_catalog',
          type: 'button',
          x: 30,
          y: 225,
          width: 300,
          height: 46,
          zIndex: 3,
          content: '💎 View Gold & Diamond Catalog',
          actionType: 'url',
          backgroundColor: 'rgba(212,175,55,0.2)',
          color: '#d4af37',
          fieldBinding: { fieldKey: 'catalog_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Jewelry Catalog Link', sortOrder: 2 }
        }
      ]
    },
    fieldSchemas: [
      { fieldKey: 'company_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Jeweler Name', sortOrder: 0 },
      { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 1 },
      { fieldKey: 'catalog_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Jewelry Catalog Link', sortOrder: 2 }
    ]
  }
];

async function seed() {
  console.log('🌱 Seeding initial Business Card templates into Supabase...');

  for (const tmpl of STARTER_TEMPLATES) {
    try {
      const created = await db.templates.create(tmpl as any);
      console.log(`✅ Seeded Template: "${created.name}" (ID: ${created.id}, Status: ${created.status})`);
    } catch (e: any) {
      console.error(`❌ Failed to seed template ${tmpl.name}:`, e.message);
    }
  }

  console.log('🎉 Template seed complete!');
}

seed();
