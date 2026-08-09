import { ConfigSchema } from '../../types';
import { babyKidsFields, invitationCTAFields } from '../../invitation-fields';

export const babyKrishnaBirthdaySchema: ConfigSchema = [
  ...babyKidsFields,
  ...invitationCTAFields,
];
