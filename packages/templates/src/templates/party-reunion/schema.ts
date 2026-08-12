import { ConfigSchema } from '../../types';
import { partyFields, partySectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const partyReunionSchema: ConfigSchema = [...partyFields];
export const partyReunionSectionedSchema: SectionedConfigSchema = partySectionedSchema;
