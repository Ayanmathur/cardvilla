import { ConfigSchema } from '../../types';
import { weddingFields, weddingSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const weddingRajasthaniRoyalSchema: ConfigSchema = [...weddingFields];
export const weddingRajasthaniRoyalSectionedSchema: SectionedConfigSchema = weddingSectionedSchema;
