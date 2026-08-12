import { ConfigSchema } from '../../types';
import { babyKidsFields, babyKidsSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const kidsBirthdaySuperheroSchema: ConfigSchema = [...babyKidsFields];
export const kidsBirthdaySuperheroSectionedSchema: SectionedConfigSchema = babyKidsSectionedSchema;
