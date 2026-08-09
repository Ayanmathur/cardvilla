import { ConfigSchema } from '../../types';
import { babyKidsFields, invitationCTAFields } from '../../invitation-fields';

export const babyPregnancyAnnouncementSchema: ConfigSchema = [
  ...babyKidsFields,
  ...invitationCTAFields,
];
