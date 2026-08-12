import { ConfigSchema } from '../../types';
import { partyFields, partySectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const partyPoolSchema: ConfigSchema = [...partyFields];
export const partyPoolSectionedSchema: SectionedConfigSchema = partySectionedSchema;
