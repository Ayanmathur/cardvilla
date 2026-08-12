import { ConfigSchema } from '../../types';
import { festivalFields, festivalSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const festivalBhaiDoojSchema: ConfigSchema = [...festivalFields];
export const festivalBhaiDoojSectionedSchema: SectionedConfigSchema = festivalSectionedSchema;
