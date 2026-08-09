import { ConfigSchema } from '../../types';
import { babyKidsFields, invitationCTAFields } from '../../invitation-fields';

export const kidsBirthdayPrincessSchema: ConfigSchema = [
  ...babyKidsFields,
  ...invitationCTAFields,
];
