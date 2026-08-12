import { ConfigSchema } from '../../types';
import { festivalFields, festivalSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const festivalChildrensDaySchema: ConfigSchema = [...festivalFields];
export const festivalChildrensDaySectionedSchema: SectionedConfigSchema = festivalSectionedSchema;
