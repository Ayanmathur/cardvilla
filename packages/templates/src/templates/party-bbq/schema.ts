import { ConfigSchema } from '../../types';
import { partyFields, partySectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const partyBbqSchema: ConfigSchema = [...partyFields];
export const partyBbqSectionedSchema: SectionedConfigSchema = partySectionedSchema;
