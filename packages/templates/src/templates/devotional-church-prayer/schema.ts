import { ConfigSchema, SectionedConfigSchema } from '../../types';
import { devotionalFields, devotionalSectionedSchema } from '../../invitation-fields';

export const devotionalChurchPrayerSchema: ConfigSchema = [...devotionalFields];
export const devotionalChurchPrayerSectionedSchema: SectionedConfigSchema = devotionalSectionedSchema;
