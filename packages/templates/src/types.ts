export type ConfigFieldType = 'text' | 'richtext' | 'image' | 'color' | 'toggle' | 'list' | 'phone' | 'whatsapp' | 'address' | 'url' | 'social' | 'date';

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
}

export interface TemplateRegistryEntry {
  component: React.ComponentType<TemplateProps>;
  schema: ConfigSchema;
  meta: TemplateMeta;
}
