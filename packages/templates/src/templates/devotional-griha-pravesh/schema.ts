import { ConfigSchema, SectionedConfigSchema } from '../../types';
import { devotionalFields, devotionalSectionedSchema } from '../../invitation-fields';

export const devotionalGrihaPraveshSchema: ConfigSchema = [...devotionalFields];
export const devotionalGrihaPraveshSectionedSchema: SectionedConfigSchema = devotionalSectionedSchema;
