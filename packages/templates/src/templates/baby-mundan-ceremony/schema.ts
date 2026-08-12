import { ConfigSchema } from '../../types';
import { babyKidsFields, babyKidsSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const babyMundanCeremonySchema: ConfigSchema = [...babyKidsFields];
export const babyMundanCeremonySectionedSchema: SectionedConfigSchema = babyKidsSectionedSchema;
