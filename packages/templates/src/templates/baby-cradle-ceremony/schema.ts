import { ConfigSchema } from '../../types';
import { babyKidsFields, invitationCTAFields } from '../../invitation-fields';

export const babyCradleCeremonySchema: ConfigSchema = [
  ...babyKidsFields,
  ...invitationCTAFields,
];
