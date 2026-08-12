import { ConfigSchema } from '../../types';
import { festivalFields, festivalSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const festivalNavratriSchema: ConfigSchema = [...festivalFields];
export const festivalNavratriSectionedSchema: SectionedConfigSchema = festivalSectionedSchema;
