import { ConfigSchema } from '../../types';
import { babyKidsFields, invitationCTAFields } from '../../invitation-fields';

export const kidsBirthdayJungleSchema: ConfigSchema = [
  ...babyKidsFields,
  ...invitationCTAFields,
];
