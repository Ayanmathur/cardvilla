import { ConfigSchema } from '../../types';
import { babyKidsFields, babyKidsSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const kidsBirthdaySpaceSchema: ConfigSchema = [...babyKidsFields];
export const kidsBirthdaySpaceSectionedSchema: SectionedConfigSchema = babyKidsSectionedSchema;
