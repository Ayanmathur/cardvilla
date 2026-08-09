import { ConfigSchema } from '../../types';
import { babyKidsFields, invitationCTAFields } from '../../invitation-fields';

export const babyShowerSchema: ConfigSchema = [
  ...babyKidsFields,
  ...invitationCTAFields,
];
