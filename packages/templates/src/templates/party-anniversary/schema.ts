import { ConfigSchema } from '../../types';
import { partyFields, invitationCTAFields } from '../../invitation-fields';

export const partyAnniversarySchema: ConfigSchema = [
  ...partyFields,
  ...invitationCTAFields,
];
