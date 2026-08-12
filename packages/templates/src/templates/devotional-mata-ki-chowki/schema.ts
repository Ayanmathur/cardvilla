import { ConfigSchema, SectionedConfigSchema } from '../../types';
import { devotionalFields, devotionalSectionedSchema } from '../../invitation-fields';

export const devotionalMataKiChowkiSchema: ConfigSchema = [...devotionalFields];
export const devotionalMataKiChowkiSectionedSchema: SectionedConfigSchema = devotionalSectionedSchema;
