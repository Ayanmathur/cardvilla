import { ConfigSchema } from '../../types';
import { partyFields, invitationCTAFields } from '../../invitation-fields';

export const partyPoolSchema: ConfigSchema = [
  ...partyFields,
  ...invitationCTAFields,
];
