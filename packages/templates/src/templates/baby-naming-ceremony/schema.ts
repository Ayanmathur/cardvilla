import { ConfigSchema } from '../../types';
import { babyKidsFields, invitationCTAFields } from '../../invitation-fields';

export const babyNamingCeremonySchema: ConfigSchema = [
  ...babyKidsFields,
  ...invitationCTAFields,
];
