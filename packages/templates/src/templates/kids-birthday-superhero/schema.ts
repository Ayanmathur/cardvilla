import { ConfigSchema } from '../../types';
import { babyKidsFields, invitationCTAFields } from '../../invitation-fields';

export const kidsBirthdaySuperheroSchema: ConfigSchema = [
  ...babyKidsFields,
  ...invitationCTAFields,
];
