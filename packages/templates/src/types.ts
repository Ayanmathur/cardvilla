export type ConfigFieldType = 'text' | 'richtext' | 'image' | 'photo' | 'color' | 'toggle' | 'list' | 'phone' | 'whatsapp' | 'address' | 'url' | 'social' | 'date';

export type EditableBy = 'admin_only' | 'client';
export type FieldScope = 'instance' | 'template';

export interface ConfigField {
  key: string;
  label: string;
  type: ConfigFieldType;
  editableBy: EditableBy;
  required: boolean;
  defaultValue?: string;
  placeholder?: string;
  fieldScope?: FieldScope; // 'instance' for per-card content, 'template' for decorative copy
}

export type ConfigSchema = ConfigField[];

// ── Section 8.9: Multi-section scrollable website architecture ──
export type SectionType = 'hero' | 'story' | 'schedule' | 'venue' | 'gallery' | 'rsvp' | 'countdown' | 'closing';

export interface ConfigSection {
  section: SectionType;
  label: string;
  fields: ConfigField[];
  /** If true, this section can have multiple instances (e.g. SCHEDULE with haldi, mehndi, wedding, reception) */
  repeatable?: boolean;
}

export type SectionedConfigSchema = ConfigSection[];

/** Event sub-block for SCHEDULE sections with multiple ceremonies */
export interface ScheduleEvent {
  event_name: string;
  event_date: string;
  event_time?: string;
  venue_name?: string;
  venue_address?: string;
}

export interface TemplateProps {
  data: Record<string, any>;
  isPreview?: boolean; // true when rendering in admin/client editor
}

export interface TemplateMeta {
  name: string;
  componentKey: string;
  description: string;
  category: string;
  motionTier: 0 | 1 | 2;
  styleTone: string;
  thumbnailUrl?: string;
  /** Section composition for this template (Section 8.9) */
  sections?: SectionType[];
}

export interface TemplateRegistryEntry {
  component: React.ComponentType<TemplateProps>;
  /** Flat schema for business cards, or sectioned for invitations */
  schema: ConfigSchema;
  /** Sectioned schema for invitation templates (Section 8.9) */
  sectionedSchema?: SectionedConfigSchema;
  meta: TemplateMeta;
}
