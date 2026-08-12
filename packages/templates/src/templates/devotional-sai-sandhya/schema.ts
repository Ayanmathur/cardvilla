import { ConfigSchema, SectionedConfigSchema } from '../../types';
import { devotionalFields, devotionalSectionedSchema } from '../../invitation-fields';

export const devotionalSaiSandhyaSchema: ConfigSchema = [...devotionalFields];
export const devotionalSaiSandhyaSectionedSchema: SectionedConfigSchema = devotionalSectionedSchema;
