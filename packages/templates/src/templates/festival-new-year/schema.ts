import { ConfigSchema } from '../../types';
import { festivalFields, festivalSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const festivalNewYearSchema: ConfigSchema = [...festivalFields];
export const festivalNewYearSectionedSchema: SectionedConfigSchema = festivalSectionedSchema;
