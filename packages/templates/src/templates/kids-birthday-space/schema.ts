import { ConfigSchema } from '../../types';
import { babyKidsFields, invitationCTAFields } from '../../invitation-fields';

export const kidsBirthdaySpaceSchema: ConfigSchema = [
  ...babyKidsFields,
  ...invitationCTAFields,
];
