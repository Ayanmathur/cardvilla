import { ConfigSchema } from '../../types';
import { partyFields, partySectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const partyKittySchema: ConfigSchema = [...partyFields];
export const partyKittySectionedSchema: SectionedConfigSchema = partySectionedSchema;
