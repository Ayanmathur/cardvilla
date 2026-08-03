import { CanvasJson } from './types';

export interface StarterPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  canvasJson: CanvasJson;
  fieldSchemas: Array<{
    fieldKey: string;
    fieldType: 'text' | 'image' | 'date' | 'address' | 'logo' | 'phone' | 'whatsapp' | 'url' | 'social';
    editableBy: 'admin_only' | 'client';
    required: boolean;
    label: string;
    sortOrder: number;
  }>;
}

export const STARTER_PRESETS: StarterPreset[] = [
  {
    id: 't1_modern_minimal',
    name: 'Modern Minimal — Base',
    category: 'Business Card',
    description: 'Clean sans-serif type, generous whitespace, gold accent line, dark navy theme.',
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
          id: 'tagline_1',
          type: 'text',
          x: 30,
          y: 175,
          width: 300,
          height: 24,
          zIndex: 2,
          content: 'Innovating Digital Experiences',
          fontFamily: 'Inter, sans-serif',
          fontSize: 13,
          color: '#8b8fa3',
          fieldBinding: { fieldKey: 'tagline', fieldType: 'text', editableBy: 'client', required: false, label: 'Tagline', sortOrder: 2 }
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
          fieldBinding: { fieldKey: 'full_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Full Name', sortOrder: 3 }
        },
        {
          id: 'title_1',
          type: 'text',
          x: 30,
          y: 265,
          width: 300,
          height: 24,
          zIndex: 2,
          content: 'Chief Executive Officer',
          fontSize: 13,
          color: '#c9a84c',
          fieldBinding: { fieldKey: 'job_title', fieldType: 'text', editableBy: 'client', required: false, label: 'Job Title', sortOrder: 4 }
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
          fieldBinding: { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 5 }
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
          fieldBinding: { fieldKey: 'whatsapp_number', fieldType: 'whatsapp', editableBy: 'client', required: false, label: 'WhatsApp Link', sortOrder: 6 }
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
          fieldBinding: { fieldKey: 'address', fieldType: 'address', editableBy: 'client', required: false, label: 'Google Maps Address', sortOrder: 7 }
        },
        {
          id: 'btn_catalog',
          type: 'button',
          x: 30,
          y: 460,
          width: 300,
          height: 44,
          zIndex: 3,
          content: 'View Catalog / Portfolio',
          actionType: 'url',
          backgroundColor: 'rgba(201,168,76,0.15)',
          color: '#c9a84c',
          borderColor: '#c9a84c',
          borderWidth: 1,
          fieldBinding: { fieldKey: 'catalog_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Catalog Link (Optional)', sortOrder: 8 }
        },
        {
          id: 'btn_review',
          type: 'button',
          x: 30,
          y: 515,
          width: 300,
          height: 44,
          zIndex: 3,
          content: '⭐ Leave a Google Review',
          actionType: 'url',
          backgroundColor: 'rgba(255,255,255,0.05)',
          color: '#e2e8f0',
          fieldBinding: { fieldKey: 'review_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Review Link (Optional)', sortOrder: 9 }
        }
      ]
    },
    fieldSchemas: [
      { fieldKey: 'logo', fieldType: 'logo', editableBy: 'client', required: false, label: 'Business Logo', sortOrder: 0 },
      { fieldKey: 'company_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Company Name', sortOrder: 1 },
      { fieldKey: 'tagline', fieldType: 'text', editableBy: 'client', required: false, label: 'Tagline', sortOrder: 2 },
      { fieldKey: 'full_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Full Name', sortOrder: 3 },
      { fieldKey: 'job_title', fieldType: 'text', editableBy: 'client', required: false, label: 'Job Title', sortOrder: 4 },
      { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 5 },
      { fieldKey: 'whatsapp_number', fieldType: 'whatsapp', editableBy: 'client', required: false, label: 'WhatsApp Link', sortOrder: 6 },
      { fieldKey: 'address', fieldType: 'address', editableBy: 'client', required: false, label: 'Google Maps Address', sortOrder: 7 },
      { fieldKey: 'catalog_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Catalog Link (Optional)', sortOrder: 8 },
      { fieldKey: 'review_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Review Link (Optional)', sortOrder: 9 }
    ]
  },
  {
    id: 't6_salon_snip',
    name: 'Salon Snip (Scissors Animation)',
    category: 'Business Card',
    description: 'Tier 2 signature animation with snipping scissors motif, pastel gold accent, hair & beauty styling.',
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
          fontFamily: 'Playfair Display, serif',
          fontSize: 22,
          fontWeight: '700',
          textAlign: 'center',
          color: '#f472b6',
          fieldBinding: { fieldKey: 'company_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Salon Name', sortOrder: 0 }
        },
        {
          id: 'services_salon',
          type: 'text',
          x: 20,
          y: 145,
          width: 320,
          height: 24,
          zIndex: 2,
          content: 'Hair · Coloring · Bridal · Styling',
          fontSize: 12,
          textAlign: 'center',
          color: '#fbcfe8',
          fieldBinding: { fieldKey: 'services_tagline', fieldType: 'text', editableBy: 'client', required: false, label: 'Services List', sortOrder: 1 }
        },
        {
          id: 'name_salon',
          type: 'text',
          x: 20,
          y: 200,
          width: 320,
          height: 28,
          zIndex: 2,
          content: 'Sophia Rey',
          fontSize: 18,
          fontWeight: '600',
          textAlign: 'center',
          color: '#ffffff',
          fieldBinding: { fieldKey: 'full_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Stylist Name', sortOrder: 2 }
        },
        {
          id: 'btn_call',
          type: 'button',
          x: 30,
          y: 280,
          width: 140,
          height: 46,
          zIndex: 3,
          content: 'Call Stylist',
          actionType: 'phone',
          backgroundColor: '#ec4899',
          color: '#ffffff',
          fieldBinding: { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 3 }
        },
        {
          id: 'btn_wa',
          type: 'button',
          x: 190,
          y: 280,
          width: 140,
          height: 46,
          zIndex: 3,
          content: 'Book WhatsApp',
          actionType: 'whatsapp',
          backgroundColor: '#25d366',
          color: '#ffffff',
          fieldBinding: { fieldKey: 'whatsapp_number', fieldType: 'whatsapp', editableBy: 'client', required: false, label: 'WhatsApp', sortOrder: 4 }
        },
        {
          id: 'btn_appointment',
          type: 'button',
          x: 30,
          y: 345,
          width: 300,
          height: 46,
          zIndex: 3,
          content: '📅 Book Appointment Online',
          actionType: 'url',
          backgroundColor: 'rgba(236,72,153,0.2)',
          color: '#f472b6',
          borderColor: '#ec4899',
          borderWidth: 1,
          fieldBinding: { fieldKey: 'appointment_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Appointment Link', sortOrder: 5 }
        },
        {
          id: 'btn_maps',
          type: 'button',
          x: 30,
          y: 405,
          width: 300,
          height: 46,
          zIndex: 3,
          content: '📍 Salon Location (Maps)',
          actionType: 'maps',
          backgroundColor: 'rgba(255,255,255,0.08)',
          color: '#ffffff',
          fieldBinding: { fieldKey: 'address', fieldType: 'address', editableBy: 'client', required: false, label: 'Google Maps Address', sortOrder: 6 }
        }
      ]
    },
    fieldSchemas: [
      { fieldKey: 'company_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Salon Name', sortOrder: 0 },
      { fieldKey: 'services_tagline', fieldType: 'text', editableBy: 'client', required: false, label: 'Services List', sortOrder: 1 },
      { fieldKey: 'full_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Stylist Name', sortOrder: 2 },
      { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 3 },
      { fieldKey: 'whatsapp_number', fieldType: 'whatsapp', editableBy: 'client', required: false, label: 'WhatsApp', sortOrder: 4 },
      { fieldKey: 'appointment_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Appointment Link', sortOrder: 5 },
      { fieldKey: 'address', fieldType: 'address', editableBy: 'client', required: false, label: 'Google Maps Address', sortOrder: 6 }
    ]
  },
  {
    id: 't9_photographer_shutter',
    name: 'Shutter Moment Photographer',
    category: 'Business Card',
    description: 'Tier 2 signature animation with camera shutter flash & photo slide-out, sleek dark theme.',
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
          fontFamily: 'Outfit, sans-serif',
          fontSize: 22,
          fontWeight: '700',
          textAlign: 'center',
          color: '#38bdf8',
          fieldBinding: { fieldKey: 'company_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Studio Name', sortOrder: 0 }
        },
        {
          id: 'spec_photo',
          type: 'text',
          x: 20,
          y: 150,
          width: 320,
          height: 24,
          zIndex: 2,
          content: 'Weddings · Portraits · Destination',
          fontSize: 13,
          textAlign: 'center',
          color: '#94a3b8',
          fieldBinding: { fieldKey: 'specialization', fieldType: 'text', editableBy: 'client', required: false, label: 'Specialty', sortOrder: 1 }
        },
        {
          id: 'name_photo',
          type: 'text',
          x: 20,
          y: 200,
          width: 320,
          height: 28,
          zIndex: 2,
          content: 'Rohan Sharma',
          fontSize: 18,
          fontWeight: '600',
          textAlign: 'center',
          color: '#f8fafc',
          fieldBinding: { fieldKey: 'full_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Photographer Name', sortOrder: 2 }
        },
        {
          id: 'btn_call',
          type: 'button',
          x: 30,
          y: 275,
          width: 140,
          height: 46,
          zIndex: 3,
          content: 'Call Photographer',
          actionType: 'phone',
          backgroundColor: '#0284c7',
          color: '#ffffff',
          fieldBinding: { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 3 }
        },
        {
          id: 'btn_wa',
          type: 'button',
          x: 190,
          y: 275,
          width: 140,
          height: 46,
          zIndex: 3,
          content: 'WhatsApp Chat',
          actionType: 'whatsapp',
          backgroundColor: '#25d366',
          color: '#ffffff',
          fieldBinding: { fieldKey: 'whatsapp_number', fieldType: 'whatsapp', editableBy: 'client', required: false, label: 'WhatsApp', sortOrder: 4 }
        },
        {
          id: 'btn_catalog',
          type: 'button',
          x: 30,
          y: 340,
          width: 300,
          height: 46,
          zIndex: 3,
          content: '📸 View Portfolio / Gallery',
          actionType: 'url',
          backgroundColor: 'rgba(56,189,248,0.15)',
          color: '#38bdf8',
          borderColor: '#0284c7',
          borderWidth: 1,
          fieldBinding: { fieldKey: 'catalog_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Portfolio Link', sortOrder: 5 }
        }
      ]
    },
    fieldSchemas: [
      { fieldKey: 'company_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Studio Name', sortOrder: 0 },
      { fieldKey: 'specialization', fieldType: 'text', editableBy: 'client', required: false, label: 'Specialty', sortOrder: 1 },
      { fieldKey: 'full_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Photographer Name', sortOrder: 2 },
      { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 3 },
      { fieldKey: 'whatsapp_number', fieldType: 'whatsapp', editableBy: 'client', required: false, label: 'WhatsApp', sortOrder: 4 },
      { fieldKey: 'catalog_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Portfolio Link', sortOrder: 5 }
    ]
  },
  {
    id: 't10_gold_radiance',
    name: 'Gold Radiance Jeweler',
    category: 'Business Card',
    description: 'Tier 1 micro-motion gold foil shine sweep, opulent dark maroon theme, luxury jewelry.',
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
          fontFamily: 'Playfair Display, serif',
          fontSize: 24,
          fontWeight: '700',
          textAlign: 'center',
          color: '#d4af37',
          fieldBinding: { fieldKey: 'company_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Jeweler Name', sortOrder: 0 }
        },
        {
          id: 'tagline_gold',
          type: 'text',
          x: 20,
          y: 105,
          width: 320,
          height: 24,
          zIndex: 2,
          content: 'Crafting Elegance Since 1985',
          fontSize: 13,
          textAlign: 'center',
          color: '#fef08a',
          fieldBinding: { fieldKey: 'tagline', fieldType: 'text', editableBy: 'client', required: false, label: 'Tagline (Since Year)', sortOrder: 1 }
        },
        {
          id: 'btn_call',
          type: 'button',
          x: 30,
          y: 200,
          width: 140,
          height: 46,
          zIndex: 3,
          content: 'Call Store',
          actionType: 'phone',
          backgroundColor: '#d4af37',
          color: '#1a1005',
          fieldBinding: { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 2 }
        },
        {
          id: 'btn_wa',
          type: 'button',
          x: 190,
          y: 200,
          width: 140,
          height: 46,
          zIndex: 3,
          content: 'WhatsApp Store',
          actionType: 'whatsapp',
          backgroundColor: '#25d366',
          color: '#ffffff',
          fieldBinding: { fieldKey: 'whatsapp_number', fieldType: 'whatsapp', editableBy: 'client', required: false, label: 'WhatsApp', sortOrder: 3 }
        },
        {
          id: 'btn_catalog',
          type: 'button',
          x: 30,
          y: 265,
          width: 300,
          height: 46,
          zIndex: 3,
          content: '💎 View Gold & Diamond Catalog',
          actionType: 'url',
          backgroundColor: 'rgba(212,175,55,0.2)',
          color: '#d4af37',
          borderColor: '#d4af37',
          borderWidth: 1,
          fieldBinding: { fieldKey: 'catalog_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Jewelry Catalog Link', sortOrder: 4 }
        },
        {
          id: 'btn_maps',
          type: 'button',
          x: 30,
          y: 330,
          width: 300,
          height: 46,
          zIndex: 3,
          content: '📍 Visit Showroom (Google Maps)',
          actionType: 'maps',
          backgroundColor: 'rgba(255,255,255,0.08)',
          color: '#ffffff',
          fieldBinding: { fieldKey: 'address', fieldType: 'address', editableBy: 'client', required: false, label: 'Showroom Address', sortOrder: 5 }
        }
      ]
    },
    fieldSchemas: [
      { fieldKey: 'company_name', fieldType: 'text', editableBy: 'client', required: true, label: 'Jeweler Name', sortOrder: 0 },
      { fieldKey: 'tagline', fieldType: 'text', editableBy: 'client', required: false, label: 'Tagline (Since Year)', sortOrder: 1 },
      { fieldKey: 'phone_number', fieldType: 'phone', editableBy: 'client', required: true, label: 'Phone Number', sortOrder: 2 },
      { fieldKey: 'whatsapp_number', fieldType: 'whatsapp', editableBy: 'client', required: false, label: 'WhatsApp', sortOrder: 3 },
      { fieldKey: 'catalog_url', fieldType: 'url', editableBy: 'client', required: false, label: 'Jewelry Catalog Link', sortOrder: 4 },
      { fieldKey: 'address', fieldType: 'address', editableBy: 'client', required: false, label: 'Showroom Address', sortOrder: 5 }
    ]
  }
];
