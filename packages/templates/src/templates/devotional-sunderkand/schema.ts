import { ConfigSchema, SectionedConfigSchema } from '../../types';
import { devotionalFields, devotionalSectionedSchema } from '../../invitation-fields';

export const devotionalSunderkandSchema: ConfigSchema = [...devotionalFields];
export const devotionalSunderkandSectionedSchema: SectionedConfigSchema = devotionalSectionedSchema;
