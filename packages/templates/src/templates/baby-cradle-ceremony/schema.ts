import { ConfigSchema } from '../../types';
import { babyKidsFields, babyKidsSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const babyCradleCeremonySchema: ConfigSchema = [...babyKidsFields];
export const babyCradleCeremonySectionedSchema: SectionedConfigSchema = babyKidsSectionedSchema;
