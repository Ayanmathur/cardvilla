import { ConfigSchema } from '../../types';
import { weddingFields, weddingSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const weddingSaveTheDateSchema: ConfigSchema = [...weddingFields];
export const weddingSaveTheDateSectionedSchema: SectionedConfigSchema = weddingSectionedSchema;
