import { ConfigSchema, SectionedConfigSchema } from '../../types';
import { devotionalFields, devotionalSectionedSchema } from '../../invitation-fields';

export const devotionalGeneralSchema: ConfigSchema = [...devotionalFields];
export const devotionalGeneralSectionedSchema: SectionedConfigSchema = devotionalSectionedSchema;
