import { ConfigSchema } from '../../types';
import { weddingFields, weddingSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const weddingHinduMandapSchema: ConfigSchema = [...weddingFields];
export const weddingHinduMandapSectionedSchema: SectionedConfigSchema = weddingSectionedSchema;
