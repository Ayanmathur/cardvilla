import { ConfigSchema, SectionedConfigSchema } from '../../types';
import { devotionalFields, devotionalSectionedSchema } from '../../invitation-fields';

export const devotionalAkhandPathSchema: ConfigSchema = [...devotionalFields];
export const devotionalAkhandPathSectionedSchema: SectionedConfigSchema = devotionalSectionedSchema;
