import { ConfigSchema } from '../../types';
import { partyFields, partySectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const partyDinnerElegantSchema: ConfigSchema = [...partyFields];
export const partyDinnerElegantSectionedSchema: SectionedConfigSchema = partySectionedSchema;
