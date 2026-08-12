import { ConfigSchema, SectionedConfigSchema } from '../../types';
import { devotionalFields, devotionalSectionedSchema } from '../../invitation-fields';

export const devotionalKhatuShyamSchema: ConfigSchema = [...devotionalFields];
export const devotionalKhatuShyamSectionedSchema: SectionedConfigSchema = devotionalSectionedSchema;
