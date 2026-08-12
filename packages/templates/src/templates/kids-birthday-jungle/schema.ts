import { ConfigSchema } from '../../types';
import { babyKidsFields, babyKidsSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const kidsBirthdayJungleSchema: ConfigSchema = [...babyKidsFields];
export const kidsBirthdayJungleSectionedSchema: SectionedConfigSchema = babyKidsSectionedSchema;
