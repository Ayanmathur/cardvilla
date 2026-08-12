import { ConfigSchema, SectionedConfigSchema } from '../../types';
import { devotionalFields, devotionalSectionedSchema } from '../../invitation-fields';

export const devotionalSatsangSchema: ConfigSchema = [...devotionalFields];
export const devotionalSatsangSectionedSchema: SectionedConfigSchema = devotionalSectionedSchema;
