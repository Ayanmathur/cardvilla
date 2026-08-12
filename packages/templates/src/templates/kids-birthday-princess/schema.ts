import { ConfigSchema } from '../../types';
import { babyKidsFields, babyKidsSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const kidsBirthdayPrincessSchema: ConfigSchema = [...babyKidsFields];
export const kidsBirthdayPrincessSectionedSchema: SectionedConfigSchema = babyKidsSectionedSchema;
