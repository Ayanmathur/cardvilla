import { ConfigSchema } from '../../types';
import { babyKidsFields, invitationCTAFields } from '../../invitation-fields';

export const babyAnnaprashanSchema: ConfigSchema = [
  ...babyKidsFields,
  ...invitationCTAFields,
];
