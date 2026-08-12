import { ConfigSchema } from '../../types';
import { festivalFields, festivalSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const festivalEidSchema: ConfigSchema = [...festivalFields];
export const festivalEidSectionedSchema: SectionedConfigSchema = festivalSectionedSchema;
