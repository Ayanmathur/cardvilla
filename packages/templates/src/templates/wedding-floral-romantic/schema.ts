import { ConfigSchema } from '../../types';
import { weddingFields, weddingSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const weddingFloralRomanticSchema: ConfigSchema = [...weddingFields];
export const weddingFloralRomanticSectionedSchema: SectionedConfigSchema = weddingSectionedSchema;
