import { ConfigSchema } from '../../types';
import { festivalFields, festivalSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const festivalGurpurabSchema: ConfigSchema = [...festivalFields];
export const festivalGurpurabSectionedSchema: SectionedConfigSchema = festivalSectionedSchema;
