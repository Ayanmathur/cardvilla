import { ConfigSchema } from '../../types';
import { weddingFields, weddingSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const weddingEngagementRingSchema: ConfigSchema = [...weddingFields];
export const weddingEngagementRingSectionedSchema: SectionedConfigSchema = weddingSectionedSchema;
