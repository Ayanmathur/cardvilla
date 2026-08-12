import { ConfigSchema } from '../../types';
import { festivalFields, festivalSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const festivalDiwaliSchema: ConfigSchema = [...festivalFields];
export const festivalDiwaliSectionedSchema: SectionedConfigSchema = festivalSectionedSchema;
