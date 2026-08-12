import { ConfigSchema } from '../../types';
import { partyFields, partySectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const partyHousewarmingSchema: ConfigSchema = [...partyFields];
export const partyHousewarmingSectionedSchema: SectionedConfigSchema = partySectionedSchema;
