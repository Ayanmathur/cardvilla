import { ConfigSchema } from '../../types';
import { festivalFields, festivalSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const festivalHoliSchema: ConfigSchema = [...festivalFields];
export const festivalHoliSectionedSchema: SectionedConfigSchema = festivalSectionedSchema;
