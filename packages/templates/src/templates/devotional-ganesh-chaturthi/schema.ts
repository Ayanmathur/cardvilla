import { ConfigSchema, SectionedConfigSchema } from '../../types';
import { devotionalFields, devotionalSectionedSchema } from '../../invitation-fields';

export const devotionalGaneshChaturthiSchema: ConfigSchema = [...devotionalFields];
export const devotionalGaneshChaturthiSectionedSchema: SectionedConfigSchema = devotionalSectionedSchema;
