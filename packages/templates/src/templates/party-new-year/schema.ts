import { ConfigSchema } from '../../types';
import { partyFields, partySectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const partyNewYearSchema: ConfigSchema = [...partyFields];
export const partyNewYearSectionedSchema: SectionedConfigSchema = partySectionedSchema;
