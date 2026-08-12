import { ConfigSchema } from '../../types';
import { babyKidsFields, babyKidsSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const babyShowerSchema: ConfigSchema = [...babyKidsFields];
export const babyShowerSectionedSchema: SectionedConfigSchema = babyKidsSectionedSchema;
