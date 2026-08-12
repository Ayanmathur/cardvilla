import { ConfigSchema } from '../../types';
import { babyKidsFields, babyKidsSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const babyNamingCeremonySchema: ConfigSchema = [...babyKidsFields];
export const babyNamingCeremonySectionedSchema: SectionedConfigSchema = babyKidsSectionedSchema;
