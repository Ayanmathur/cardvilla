import { ConfigSchema } from '../../types';
import { babyKidsFields, babyKidsSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const babyBirthAnnouncementSchema: ConfigSchema = [...babyKidsFields];
export const babyBirthAnnouncementSectionedSchema: SectionedConfigSchema = babyKidsSectionedSchema;
