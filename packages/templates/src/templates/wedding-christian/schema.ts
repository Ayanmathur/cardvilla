import { ConfigSchema } from '../../types';
import { weddingFields, weddingSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const weddingChristianSchema: ConfigSchema = [...weddingFields];
export const weddingChristianSectionedSchema: SectionedConfigSchema = weddingSectionedSchema;
