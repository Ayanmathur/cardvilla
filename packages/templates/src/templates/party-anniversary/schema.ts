import { ConfigSchema } from '../../types';
import { partyFields, partySectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const partyAnniversarySchema: ConfigSchema = [...partyFields];
export const partyAnniversarySectionedSchema: SectionedConfigSchema = partySectionedSchema;
