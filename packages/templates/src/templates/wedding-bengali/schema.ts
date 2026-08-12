import { ConfigSchema } from '../../types';
import { weddingFields, weddingSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const weddingBengaliSchema: ConfigSchema = [...weddingFields];
export const weddingBengaliSectionedSchema: SectionedConfigSchema = weddingSectionedSchema;
