import { ConfigSchema } from '../../types';
import { weddingFields, weddingSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const weddingMuslimNikahSchema: ConfigSchema = [...weddingFields];
export const weddingMuslimNikahSectionedSchema: SectionedConfigSchema = weddingSectionedSchema;
