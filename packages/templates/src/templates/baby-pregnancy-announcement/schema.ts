import { ConfigSchema } from '../../types';
import { babyKidsFields, babyKidsSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const babyPregnancyAnnouncementSchema: ConfigSchema = [...babyKidsFields];
export const babyPregnancyAnnouncementSectionedSchema: SectionedConfigSchema = babyKidsSectionedSchema;
