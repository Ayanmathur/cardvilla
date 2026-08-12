import { ConfigSchema } from '../../types';
import { weddingFields, weddingSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const weddingModernMinimalSchema: ConfigSchema = [...weddingFields];
export const weddingModernMinimalSectionedSchema: SectionedConfigSchema = weddingSectionedSchema;
