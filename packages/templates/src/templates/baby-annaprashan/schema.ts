import { ConfigSchema } from '../../types';
import { babyKidsFields, babyKidsSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const babyAnnaprashanSchema: ConfigSchema = [...babyKidsFields];
export const babyAnnaprashanSectionedSchema: SectionedConfigSchema = babyKidsSectionedSchema;
