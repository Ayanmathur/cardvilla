import { ConfigSchema, SectionedConfigSchema } from '../../types';
import { devotionalFields, devotionalSectionedSchema } from '../../invitation-fields';

export const devotionalShraddhSchema: ConfigSchema = [...devotionalFields];
export const devotionalShraddhSectionedSchema: SectionedConfigSchema = devotionalSectionedSchema;
