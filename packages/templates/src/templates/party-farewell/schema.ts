import { ConfigSchema } from '../../types';
import { partyFields, partySectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const partyFarewellSchema: ConfigSchema = [...partyFields];
export const partyFarewellSectionedSchema: SectionedConfigSchema = partySectionedSchema;
