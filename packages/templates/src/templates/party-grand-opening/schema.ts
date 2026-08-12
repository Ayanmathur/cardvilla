import { ConfigSchema } from '../../types';
import { partyFields, partySectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const partyGrandOpeningSchema: ConfigSchema = [...partyFields];
export const partyGrandOpeningSectionedSchema: SectionedConfigSchema = partySectionedSchema;
