export type FieldType = 'text' | 'image' | 'date' | 'address' | 'logo' | 'phone' | 'whatsapp' | 'url' | 'social';
export type EditableBy = 'admin_only' | 'client';

export interface FieldSchemaConfig {
  fieldKey: string;
  fieldType: FieldType;
  editableBy: EditableBy;
  required: boolean;
  label: string;
  sortOrder: number;
}

export type ElementType = 'text' | 'image' | 'logo' | 'shape' | 'motif' | 'button';

export interface CanvasElement {
  id: string;
  type: ElementType;
  x: number; // percentage or pixels
  y: number;
  width: number;
  height: number;
  zIndex: number;

  // Visual Properties
  content?: string; // Text content, SVG markup, or Image URL
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  textAlign?: 'left' | 'center' | 'right';
  opacity?: number;
  shadow?: string;

  // Animation / Motion Spec
  animationType?: 'none' | 'snip' | 'pulse' | 'sparkle' | 'shutter' | 'shine_sweep' | 'steam_rise' | 'slide_in';
  animationTier?: 0 | 1 | 2; // 0=static, 1=micro-motion, 2=signature
  motifType?: 'scissors' | 'heartbeat' | 'tooth' | 'camera' | 'gold_gem' | 'silver_gem' | 'coffee_cup' | 'none';

  // Action / Clickable attributes
  actionType?: 'none' | 'phone' | 'whatsapp' | 'maps' | 'url' | 'vcard';
  actionUrl?: string;

  // Field Binding
  fieldBinding?: FieldSchemaConfig;
}

export interface CanvasBackground {
  type: 'solid' | 'gradient' | 'wood_dark' | 'wood_light' | 'paper_diorama' | 'rope_border' | 'gold_foil' | 'silver_foil' | 'receipt';
  color?: string;
  gradient?: string;
  textureUrl?: string;
}

export interface CanvasJson {
  version: '1.0';
  width: number; // e.g. 360
  height: number; // e.g. 640
  background: CanvasBackground;
  elements: CanvasElement[];
}
