import { ConfigSchema, SectionedConfigSchema } from '../../types';
import { devotionalFields, devotionalSectionedSchema } from '../../invitation-fields';

export const devotionalBhagwatKathaSchema: ConfigSchema = [...devotionalFields];
export const devotionalBhagwatKathaSectionedSchema: SectionedConfigSchema = devotionalSectionedSchema;
