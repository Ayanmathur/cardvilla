import { ConfigSchema } from '../../types';
import { festivalFields, festivalSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const festivalBuddhaPurnimaSchema: ConfigSchema = [...festivalFields];
export const festivalBuddhaPurnimaSectionedSchema: SectionedConfigSchema = festivalSectionedSchema;
