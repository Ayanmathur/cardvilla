import { ConfigSchema } from '../../types';
import { festivalFields, festivalSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const festivalValentinesSchema: ConfigSchema = [...festivalFields];
export const festivalValentinesSectionedSchema: SectionedConfigSchema = festivalSectionedSchema;
