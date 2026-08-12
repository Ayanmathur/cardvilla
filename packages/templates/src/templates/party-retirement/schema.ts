import { ConfigSchema } from '../../types';
import { partyFields, partySectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const partyRetirementSchema: ConfigSchema = [...partyFields];
export const partyRetirementSectionedSchema: SectionedConfigSchema = partySectionedSchema;
