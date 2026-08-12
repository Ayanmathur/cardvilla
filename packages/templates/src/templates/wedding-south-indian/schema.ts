import { ConfigSchema } from '../../types';
import { weddingFields, weddingSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const weddingSouthIndianSchema: ConfigSchema = [...weddingFields];
export const weddingSouthIndianSectionedSchema: SectionedConfigSchema = weddingSectionedSchema;
