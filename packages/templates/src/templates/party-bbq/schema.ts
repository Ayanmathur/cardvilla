import { ConfigSchema } from '../../types';
import { partyFields, invitationCTAFields } from '../../invitation-fields';

export const partyBbqSchema: ConfigSchema = [
  ...partyFields,
  ...invitationCTAFields,
];
